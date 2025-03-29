import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormModel } from './letter-form.interfaces';
import { BlockAItem } from '../blockA-dialog/BlockA.interfaces';
import { clientNameValidator } from './letter-form.utils';

@Injectable({ providedIn: 'root' })
export class LetterFormService {
  constructor() {}

  form: FormGroup<FormModel> = new FormGroup<FormModel>({
    senderAddress: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    receiverAddresses: new FormArray<FormControl<string>>([], {
      validators: [Validators.required, Validators.minLength(1)],
    }),
    blockA: new FormControl<BlockAItem>({date:new Date(), contact:null}, {
      nonNullable: true,
      validators: [clientNameValidator()],
    }),
    subject: new FormControl(null),
    body: new FormControl('', {
      nonNullable: true,
      validators: [Validators.required],
    }),
    footnote: new FormControl(null),
  });

  submitForm() {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return { success: false, message: 'Form validation failed' };
    }

    const formData = this.form.value;
    
    console.log(formData);
    return
  }

  resetForm() {
    this.form.reset({
      senderAddress: '',
      subject: null,
      body: '',
      footnote: null,
      blockA: { date: new Date(), contact: null },
    });

    // Clear the receiverAddresses FormArray
    const receiverAddresses = this.form.get('receiverAddresses') as FormArray;
    receiverAddresses.clear();
  }


}
