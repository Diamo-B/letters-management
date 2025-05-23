import { FormArray, FormControl } from '@angular/forms';
import { BlockAItem } from '../blockA-dialog/BlockA.interfaces';

export interface Letter {
  id: string;
  senderAddress: string;
  receiverAddresses: string[];
  blockA: BlockAItem;
  subject: string | null;
  body: string;
  footnote: string | null;
}

export interface FormModel {
  id: FormControl<string>;
  senderAddress: FormControl<string>;
  receiverAddresses: FormArray<FormControl<string>>;
  blockA: FormControl<BlockAItem>;
  subject: FormControl<string | null>;
  body: FormControl<string>;
  footnote: FormControl<string | null>;
}
