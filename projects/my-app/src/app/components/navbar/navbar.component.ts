import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ButtonComponent } from 'design-system';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavbarService } from './navbar.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LetterFormService } from '../letter-form/letter-form.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';
import { LetterListService } from '../../features/list/letter-list.service';
export type navbarVariant = 'full' | 'limited';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, ButtonComponent, MatSlideToggleModule, MatTooltipModule ],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent {
  title = signal<string>('my letters');
  variant = signal<navbarVariant>('limited'); // Default variant
  
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navbarService: NavbarService,
    private formService: LetterFormService,
    private listService: LetterListService
  ) {
    this.listenToRouteChanges();
  }

  listenToRouteChanges() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.updateNavbarVariant();
    });
  }

  updateNavbarVariant() {
    const data = this.route.snapshot.firstChild?.data as { navbarVariant?: navbarVariant } | undefined;
  
    if (data?.navbarVariant) {
      this.variant.set(data.navbarVariant);
    } else {
      this.variant.set('limited'); // Default fallback
    }
  }
  
  // Get the preview mode from the service
  get previewMode() {
    return this.navbarService.getPreviewMode();
  }

  // Get form validity from the service
  get formValid() {
    return this.navbarService.getFormValid();
  }

  togglePreviewMode() {
    this.navbarService.togglePreviewMode();
    console.log(this.previewMode());
  }


  backToOverview() {
    this.navbarService.setPreviewMode(false);
    this.listService.resetLetterSelection();
    this.formService.resetForm();
    console.log(this.previewMode());
  }

  onSubmitClick() {
    this.formService.submitForm();
    
    /* if (submission.success === false) {
      // Handle validation error case, maybe show a toast
      console.log(submission.message);
      return;
    }
    
    // Handle observable returned from HTTP request
    submission.subscribe({
      next: (response) => {
        console.log('Form submitted successfully', response);
        // Handle success - redirect, show success message, etc.
      },
      error: (error) => {
        console.error('Error submitting form', error);
        // Handle error - show error message
      }
    }); */
  }
}