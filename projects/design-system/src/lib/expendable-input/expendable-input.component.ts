import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-expandable-input',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule,
    TextFieldModule,
  ],
  templateUrl:"./expandable-input.template.html",
  styleUrls: ['./expandable-input.styles.scss'],
})
export class ExpandableInputComponent implements OnInit {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() errorMessage?: string;
  @Input() autoresize: boolean = false;
  @Input() floatingLabel: 'auto' | 'always' = 'auto';
  @Input() forceMarkAsTouched: boolean = false;
  @Input() alwaysShowError: boolean = false;
  @Input() type: 'text' | 'date' = 'text';

  ngOnInit() {
    if (this.forceMarkAsTouched) {
      this.control.markAsTouched();
    }
  }

  get showError(): boolean {
    return (
      this.control.invalid &&
      (this.alwaysShowError || this.control.touched || this.control.dirty)
    );
  }

  getDefaultErrorMessage(): string {
    if (this.control.errors) {
      if (this.control.errors['matDatepickerParse']) {
        return `Invalid date format`;
      }

      if (this.control.errors['required']) {
        return `${this.label} is required`;
      }
    }
    return '';
  }
}
