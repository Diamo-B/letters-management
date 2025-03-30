import { Component, Input, Type, OnInit, ChangeDetectorRef, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { FormArray, FormControl, FormGroup, ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-generic-dialog-container',
  standalone: true,
  imports: [CommonModule, MatFormFieldModule],
  templateUrl: './dialog-container.template.html',
  styleUrls:['./dialog-container.styles.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => GenericDialogContainerComponent),
      multi: true
    }
  ]
})
export class GenericDialogContainerComponent implements OnInit, ControlValueAccessor {
  @Input() parentForm!: FormGroup;
  @Input() formControlName!: string;
  @Input() dialogComponent!: Type<any>;
  @Input() title: string = 'Dialog';
  @Input() errorMessage: string = 'Please add all the required items';
  @Input() dialogWidth: string = '600px';
  @Input() dialogMinHeight: string = '300px';
  @Input() dialogData?: any;
  @Input() formatItem?: (item: any) => string | string[];
  @Input() resultTransformer: (result: any) => any = (result) => result;

  isFormArray: boolean = false;
  value: any;
  disabled: boolean = false;
  onChange: any = () => {};
  onTouched: any = () => {};

  constructor(
    private dialog: MatDialog,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit() {
    // Check if the control is a FormArray or a FormControl
    const control = this.parentForm.get(this.formControlName);
    this.isFormArray = control instanceof FormArray;
    
    // Force change detection
    setTimeout(() => {
      this.cdr.detectChanges();
    });
  }

  // ControlValueAccessor Implementation
  writeValue(value: any): void {
    this.value = value;
    this.cdr.detectChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  getFormArrayValues(): any[] {
    if (!this.isFormArray) return [];
    const formArray = this.parentForm.get(this.formControlName) as FormArray;
    return formArray.controls.map(control => control.value);
  }

  // method to get value from a single FormControl
  getSingleControlValue(): any {
    if (this.isFormArray) return null;
    const control = this.parentForm.get(this.formControlName);
    return control ? control.value : null;
  }

  // this is to always return an array for *ngFor
  getFormattedItemAsArray(item: any): string[] {
    if (!this.formatItem) {
      return typeof item === 'object' && item !== null
        ? Object.values(item).map((value) => String(value))
        : [String(item)];
    }
  
    const formatted = this.formatItem(item);
    return Array.isArray(formatted) ? formatted : [formatted];
  }

  openDialog() {
    this.onTouched();
    
    // Get current value(s) based on control type
    let currentItems;
    if (this.isFormArray) {
      const formArray = this.parentForm.get(this.formControlName) as FormArray;
      currentItems = formArray.controls.map(control => control.value);
    } else {
      const control = this.parentForm.get(this.formControlName);
      currentItems = control ? [control.value] : [];
    }

    const dialogRef = this.dialog.open(this.dialogComponent, {
      width: this.dialogWidth,
      minHeight: this.dialogMinHeight,
      data: {
        ...this.dialogData,
        initialValues: currentItems.length ? currentItems : [''],
        isSingleValue: !this.isFormArray
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const transformedResult = this.resultTransformer(result);
        
        if (this.isFormArray) {
          // Handle FormArray
          const formArray = this.parentForm.get(this.formControlName) as FormArray;
          formArray.clear();
          
          // Ensure we have an array to iterate over
          const resultArray = Array.isArray(transformedResult) 
            ? transformedResult 
            : [transformedResult];
          
          // Add new form controls for each item
          resultArray.forEach((item: any) => {
            if (typeof item === 'object' && item !== null) {
              // For complex objects like BlockAItem
              formArray.push(new FormControl(item, { nonNullable: true }));
            } else {
              // For primitive values
              formArray.push(new FormControl(item, { nonNullable: true }));
            }
          });
        } else {
          // Handle FormControl - just set the value directly
          const control = this.parentForm.get(this.formControlName);
          if (control) {
            // For a single control, use the first item if it's an array, otherwise use as is
            const finalValue = Array.isArray(transformedResult) && transformedResult.length === 1
              ? transformedResult[0]
              : transformedResult;
            
            control.setValue(finalValue);
            this.writeValue(finalValue);
            this.onChange(finalValue);
          }
        }
        
        // Force change detection after dialog is closed
        this.cdr.detectChanges();
      }
    });
  }
}