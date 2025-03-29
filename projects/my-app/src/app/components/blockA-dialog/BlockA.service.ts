import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BlockAItem } from './BlockA.interfaces';

@Injectable({
  providedIn: 'root'
})
export class BlockAService {
  
  createForm(initialValues?: BlockAItem | null): FormGroup {
    const form = new FormGroup({
      date: new FormControl(new Date(), Validators.required),
      contact: new FormControl('', Validators.required),
    });
    
    if (initialValues) {
      form.patchValue({
        date: initialValues.date,
        contact: initialValues.contact,
      });
    }
    
    return form;
  }
  
  processInitialValues(data: any): BlockAItem | null {
    let initialValue: BlockAItem | null = null;
    
    if (data?.initialValues) {
      if (Array.isArray(data.initialValues)) {
        initialValue = data.initialValues[0];
      } else {
        initialValue = data.initialValues;
      }
    }
    
    return initialValue;
  }
  
  createBlockAItem(formValue: any): BlockAItem {
    return {
      date: formValue.date,
      contact: formValue.contact,
    };
  }
  
  isFieldInvalid(form: FormGroup, key: string): boolean | undefined {
    const control = form.get(key);
    return control?.touched && control?.invalid;
  }
}