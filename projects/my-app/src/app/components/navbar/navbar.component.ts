import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output, signal } from '@angular/core';
import { ButtonComponent } from 'design-system';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { NavbarService } from './navbar.service';
import { MatTooltipModule } from '@angular/material/tooltip';
import { LetterFormService } from '../letter-form/letter-form.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { filter, Subscription } from 'rxjs';
import { LetterListService } from '../../features/list/letter-list.service';
export type navbarVariant = 'full' | 'limited';
export type formMode =  'create' | 'edit';
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
  formMode = signal<formMode>('create');
  private submitSubscription?: Subscription;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private navbarService: NavbarService,
    private formService: LetterFormService,
    private listService: LetterListService
  ) {}
  
  ngOnInit(){
    this.listenToRouteChanges();
  }

  listenToRouteChanges() {
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.handlePassedRouteData();
    });
  }

  handlePassedRouteData() {
    const data = this.route.snapshot.firstChild?.data as { navbarVariant?: navbarVariant,mode: formMode } | undefined;
  
    if (data?.navbarVariant) {
      this.variant.set(data.navbarVariant);
    } else {
      this.variant.set('limited'); // Default fallback
    }
    if(data?.mode){
      this.formMode.set(data?.mode);
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
    const submissionResult = this.formService.submitForm(this.formMode());

    if (submissionResult && 'subscribe' in submissionResult) {
      
      this.submitSubscription = submissionResult.subscribe({
        next: (response) => {
          console.log('Form submitted successfully', response);

          this.backToOverview()
          this.router.navigate(['/list'],{
            state: { toast: { type: "success", message: "Operation completed successfuly" } }
          });

        },
        error: (error) => {
          console.error('Error submitting form', error);
          this.backToOverview();
          this.router.navigate(['/list'],{
            state: { toast: { type: "error", message: "Operation couldn't complete. Check devTools." } }
          });
        },
      });
    } else {
      // { success: false, message: string }
      console.error('Form submission failed due to:', submissionResult?.message);
      // display the error message to the user
      this.backToOverview();
      this.router.navigate(['/list'],{
        state: { toast: { type: "error", message: "Operation couldn't complete. Check devTools." } }
      });
    }
  }
}