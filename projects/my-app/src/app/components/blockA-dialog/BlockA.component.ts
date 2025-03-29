import { Component, Inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialogRef,
  MatDialogModule,
} from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatDatepickerModule } from '@angular/material/datepicker';
import {
  MatNativeDateModule,
  provideNativeDateAdapter,
} from '@angular/material/core';
import { ButtonComponent, ExpandableInputComponent } from 'design-system';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BlockAService } from './BlockA.service';
import { BlockADialogData } from './BlockA.interfaces';

@Component({
  selector: 'app-block-a-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatDatepickerModule,
    MatNativeDateModule,
    ExpandableInputComponent,
    ButtonComponent,
    MatInputModule,
    MatFormFieldModule,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './BlockA.template.html',
  styleUrl:'./BlockA.styles.scss'
})
export class BlockADialogComponent {

  blockAForm: FormGroup = new FormGroup({
    date: new FormControl(new Date(), Validators.required),
    contact: new FormControl('', Validators.required),
  });

  constructor(
    private blockAService: BlockAService,
    public dialogRef: MatDialogRef<BlockADialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: BlockADialogData
  ) {
    const initialValue = this.blockAService.processInitialValues(data);
    this.blockAForm = this.blockAService.createForm(initialValue);
  }

  get ContactFormData() {
    return this.blockAForm.get('contact') as FormControl;
  }

  get DateFormData() {
    return this.blockAForm.get('date') as FormControl;
  }

  onSave() {
    if (this.blockAForm.valid) {
      const blockAItem = this.blockAService.createBlockAItem(this.blockAForm.value);
      this.dialogRef.close(blockAItem);
    }
  }

  onCancel() {
    this.dialogRef.close(null);
  }

  isFieldInvalid(key: string): boolean | undefined {
    return this.blockAService.isFieldInvalid(this.blockAForm, key);
  }
}
