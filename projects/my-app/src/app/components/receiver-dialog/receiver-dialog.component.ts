import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { ButtonComponent, ExpandableInputComponent } from 'design-system';
import { AddressFormGroup, AddressFormModel, ReceiverAddressDialogData } from './receiver-dialog.interfaces';
import { ReceiverAddressDialogService } from './receiver-dialog.service';

@Component({
  selector: 'app-receiver-address-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    ExpandableInputComponent,
    ButtonComponent,
  ],
  templateUrl: './receiver-dialog.template.html',
  styleUrls: ['./receiver-dialog.styles.scss'],
})
export class ReceiverAddressDialogComponent {
  receiverAddressForm: FormGroup<AddressFormModel>;

  constructor(
    public dialogRef: MatDialogRef<ReceiverAddressDialogComponent>,
    private addressService: ReceiverAddressDialogService,
    @Inject(MAT_DIALOG_DATA) private data?: ReceiverAddressDialogData,
  ) {
    // Initialize the form using the service
    this.receiverAddressForm = this.addressService.createForm(
      this.data?.initialValues
    );
  }

  // Getter for the addresses FormArray
  get addressLines(): FormArray<FormGroup<AddressFormGroup>> {
    return this.receiverAddressForm.controls.addresses;
  }
  

  // Helper to get the FormControl for addressLine from a FormGroup
  getAddressLineControl(group: FormGroup<AddressFormGroup>): FormControl<string> {
    return group.controls.addressLine;
  }

  // Delegate adding a new address to the service
  addAddressLine() {
    this.addressService.addAddressLine(this.receiverAddressForm);
  }

  // Delegate removal of an address to the service
  removeAddressLine(index: number) {
    this.addressService.removeAddressLine(this.receiverAddressForm, index);
  }

  onSave() {
    if (this.receiverAddressForm.valid) {
      // Extract just the address lines as an array of strings using the service
      const addresses = this.addressService.extractAddresses(this.receiverAddressForm);
      this.dialogRef.close(addresses);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  // Utility method to determine if an address is invalid
  isAddressInvalid(index: number): boolean | undefined {
    const control = (this.receiverAddressForm.get('addresses') as any).at(index).get('addressLine');
    return control?.touched && control?.invalid;
  }
}
