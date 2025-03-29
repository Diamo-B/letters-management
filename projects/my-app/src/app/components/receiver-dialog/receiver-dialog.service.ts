import { Injectable } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AddressFormGroup, AddressFormModel } from './receiver-dialog.interfaces';


@Injectable({
  providedIn: 'root',
})
export class ReceiverAddressDialogService {

  // Creates form (empty if no initial vals).
  
  createForm(initialValues?: string[]): FormGroup<AddressFormModel> {
    const values =
      initialValues && initialValues.length ? initialValues : [''];
    const addressControls = values.map(
      (address) =>
        new FormGroup<AddressFormGroup>({
          addressLine: new FormControl(address || '', {
            nonNullable: true,
            validators: [Validators.required],
          }),
        })
    );
    return new FormGroup<AddressFormModel>({
      addresses: new FormArray(addressControls),
    });
  }

  // Add a new address.
   
  addAddressLine(form: FormGroup<AddressFormModel>): void {
    const addressArray = form.get('addresses') as FormArray;
    const newAddressGroup = new FormGroup({
      addressLine: new FormControl('', {
        nonNullable: true,
        validators: [Validators.required],
      }),
    });

    //newAddressGroup.get('addressLine')?.markAsTouched();
    addressArray.push(newAddressGroup);
  }

  // Remove an address (if there's more than one address).
  removeAddressLine(form: FormGroup<AddressFormModel>, index: number): void {
    const addressArray = form.get('addresses') as FormArray;
    if (addressArray.length > 1) {
      addressArray.removeAt(index);
    }
  }

  // extracts the values.
  extractAddresses(form: FormGroup<AddressFormModel>): string[] {
    const addressArray = form.get('addresses') as FormArray;
    return addressArray.value.map(
      (addr: { addressLine: string }) => addr.addressLine
    );
  }
}
