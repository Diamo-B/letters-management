import { FormArray, FormControl, FormGroup } from '@angular/forms';

export interface AddressFormGroup {
  addressLine: FormControl<string>;
}


export interface AddressFormModel {
  addresses: FormArray<FormGroup<AddressFormGroup>>;
}

export interface ReceiverAddressDialogData {
  initialValues?: string[];
}