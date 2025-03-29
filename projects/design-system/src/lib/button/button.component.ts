import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-button',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatIconModule, RouterModule],
  templateUrl: './button.component.html',
  styles: `
    .neutral-button {
      background-color: white;
      color: black;
    }
  `,
})
export class ButtonComponent {
  @Input() label: string = 'Button';
  @Input() color: 'primary' | 'accent' | 'warn' | 'neutral' = 'primary';
  @Input() variant:
    | 'Basic'
    | 'Link'
    | 'Raised'
    | 'Stroked'
    | 'Flat'
    | 'Icon'
    | 'IconWithText'
    | 'IconWithLink' = 'Basic';
  @Input() disabled: boolean = false;
  @Input() icon: string = '';
  @Input() customClasses: string[] = [];
  @Input() routerLink?: string | any[]; // Supports both string and array
  @Input() routerLinkActive: string = 'active';

  get buttonClasses(): string {
    return this.customClasses.join(' ');
  }
}
