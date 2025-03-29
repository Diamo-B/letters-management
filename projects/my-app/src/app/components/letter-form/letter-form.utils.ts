import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

// Custom validator to check if clientName is provided
export function clientNameValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    
    if (value && value.contact && value.contact.trim() !== '') {
      return null; // No validation error
    }
    return { 'contact': true }; // Custom validation error
  };
}