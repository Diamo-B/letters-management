import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { FormModel, Letter } from './letter-form.interfaces';
import { BlockAItem } from '../blockA-dialog/BlockA.interfaces';
import { clientNameValidator } from './letter-form.utils';
import { formMode } from '../navbar/navbar.component';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class LetterFormService {
  private apiUrl = environment.apiUrl+"/letters"
  constructor(private http: HttpClient) {}

  form: FormGroup<FormModel> = new FormGroup<FormModel>({
    id: new FormControl<string>('', { nonNullable: true }), 
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

  submitForm(formMode: formMode): Observable<Letter> | { success: false, message: string } {
    if (!this.form.valid) {
      this.form.markAllAsTouched();
      return { success: false, message: 'Form validation failed' };
    }

    const formData = this.form.getRawValue(); 

    if (formMode === 'create') {
      const { id, ...postData } = formData; // Omit id for create
      return this.http.post<Omit<Letter, 'id'>>(`${this.apiUrl}`, postData) as Observable<Letter>;
    } else if (formMode === 'edit' && formData.id) {
      return this.http.put<Letter>(`${this.apiUrl}/${formData.id}`, formData);
    } else {
      return { success: false, message: 'Invalid form mode or missing ID for edit' };
    }
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
