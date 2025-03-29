import { Injectable, signal } from '@angular/core';
import { navbarVariant } from './navbar.component';

@Injectable({
  providedIn: 'root'
})
export class NavbarService {


  private previewModeSignal = signal(false);

  private formValidSignal = signal(false);

  // Method to toggle preview mode
  togglePreviewMode() {
    if (this.formValidSignal() || this.previewModeSignal()) {
      this.previewModeSignal.update(current => !current);
    }
  }

  // Method to set preview mode directly
  setPreviewMode(value: boolean) {
    if (value && !this.formValidSignal()) {
      return;
    }
    this.previewModeSignal.set(value);
  }

  // Method to get current preview mode value
  getPreviewMode() {
    return this.previewModeSignal;
  }

  // Method to update form validity
  setFormValid(isValid: boolean) {
    this.formValidSignal.set(isValid);
    // If form becomes invalid and preview mode is on, turn off preview mode
    if (!isValid && this.previewModeSignal()) {
      this.previewModeSignal.set(false);
    }
  }

  // Method to get current form validity
  getFormValid() {
    return this.formValidSignal;
  }

}