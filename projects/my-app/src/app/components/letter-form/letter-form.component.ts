import { Component } from '@angular/core';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { FormArray, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import {
  ExpandableInputComponent,
  GenericDialogContainerComponent,
} from 'design-system';
import { BlockADialogComponent } from '../blockA-dialog/BlockA.component';
import { ReceiverAddressDialogComponent } from '../receiver-dialog/receiver-dialog.component';
import { NavbarService } from '../navbar/navbar.service';
import { LetterFormService } from './letter-form.service';
import { BlockAItem } from '../blockA-dialog/BlockA.interfaces';
import { Letter } from './letter-form.interfaces';
import { CreateLetterComponent } from '../../features/create/create.component';

@Component({
  selector: 'app-letter-create',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    ExpandableInputComponent,
    GenericDialogContainerComponent,
  ],
  templateUrl: './letter-form.component.html',
  styleUrl: './letter-form.component.scss',
})
export class LetterComponent {
  BlockADialogComponent = BlockADialogComponent;
  ReceiverAddressDialogComponent = ReceiverAddressDialogComponent; // Define the input property with a default value

  constructor(
    private navbarService: NavbarService,
    private formService: LetterFormService,
    private createLetterComponent: CreateLetterComponent
  ) {}

  ngOnInit() {
    // Initial form validity check
    this.navbarService.setFormValid(this.formService.form.valid);

    // watches form; activates/disables the nav toggle
    this.formService.form.statusChanges.subscribe((status) => {
      this.navbarService.setFormValid(status === 'VALID');
    });

    // Load data for an edit if available
    if (this.createLetterComponent.receivedData) {
      this.loadFormData(this.createLetterComponent.receivedData);
    }
  }

  // Get the preview mode from the nav
  get isPreviewMode() {
    return this.navbarService.getPreviewMode()();
  }

  get form() {
    return this.formService.form;
  }

  // Format receiver addresses (returned from dialog as string array)
  formatReceiverAddress(addressLines: string | string[]): string[] {
    // If it's already an array, just return it
    if (Array.isArray(addressLines)) {
      return addressLines.filter((line: string) => line.trim() !== '');
    }

    if (typeof addressLines === 'string') {
      if (addressLines.includes('\n')) {
        return addressLines
          .split('\n')
          .filter((line: string) => line.trim() !== '');
      }
      return [addressLines];
    }
    return [];
  }

  // Block A formatting (container)
  formatBlockAItem(item: BlockAItem): string[] {
    const day = item.date.getDate().toString().padStart(2, '0');
    const month = (item.date.getMonth() + 1).toString().padStart(2, '0');
    const year = item.date.getFullYear();

    return [`Date: ${day}.${month}.${year}`, `Contact Person: ${item.contact}`];
  }

  loadFormData(letter: Letter): void {
    this.formService.form.patchValue({
      id: letter.id,
      senderAddress: letter.senderAddress,
      subject: letter.subject,
      body: letter.body,
      footnote: letter.footnote,
      blockA: letter.blockA,
    });

    // Set receiver addresses
    const receiverAddressesFormArray = this.formService.form.get(
      'receiverAddresses'
    ) as FormArray;
    receiverAddressesFormArray.clear(); // Clear existing addresses

    letter.receiverAddresses.forEach((address) => {
      receiverAddressesFormArray.push(new FormControl(address)); // Add new addresses
    });
  }
}
