import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonComponent } from '../button/button.component';

export type ToastType = 'success' | 'error' | 'info' | 'warning';

@Component({
  selector: 'app-toast',
  standalone: true,
  imports: [
    CommonModule,
    MatSnackBarModule,
    MatIconModule,
    MatButtonModule,
    ButtonComponent,
  ],
  template: `
    <div class="toast-container" [ngClass]="type">
      <mat-icon inline *ngIf="icon">{{ icon }}</mat-icon>
      <span class="message">{{ message }}</span>
      <app-button
        variant="Icon"
        icon="close"
        color="neutral"
        [customClasses]="['colors']"
        (click)="dismiss.emit()"
      ></app-button>
    </div>
  `,
  styles: [
    `
      ::ng-deep .mat-mdc-icon-button {
        width: 1.5em !important;
        height: 1.5em !important;
        display: flex !important;
        justify-content: justify-center;
        align-items: center;
        & .mat-icon {
          font-size: 0.7em !important;
          font-weight: 700;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }

      .toast-container {
        display: flex;
        align-items: center;
        gap: 8px;
        padding-block: 8px;
        padding-inline: 1em;
        border: 1px solid black;
        border-radius: 100px;
      }

      .close {
        height: 1em;
        width: 1em;
      }

      .success {
        color: #2e7d32;
        background-color: #e8f5e9;
        border-color: #2e7d32;
      }

      .error {
        color: #c62828;
        background-color: #ffebee;
        border-color: #c62828;
      }

      .info {
        color: #0277bd;
        background-color: #e1f5fe;
        border-color: #0277bd;
      }

      .warning {
        color: #ef6c00;
        background-color: #fff8e1;
        border-color: #ef6c00;
      }

      .message {
        flex: 1;
      }
    `,
  ],
})
export class ToastComponent implements OnInit {
  @Input() message = '';
  @Input() type: ToastType = 'info';
  @Input() duration = 5000;
  @Input() dismissible = true;
  @Output() dismiss = new EventEmitter<void>();

  icon: string | null = null;

  ngOnInit(): void {
    this.setIcon();
  }

  private setIcon(): void {
    switch (this.type) {
      case 'success':
        this.icon = 'check_circle';
        break;
      case 'error':
        this.icon = 'error';
        break;
      case 'info':
        this.icon = 'info';
        break;
      case 'warning':
        this.icon = 'warning';
        break;
      default:
        this.icon = null;
    }
  }
}
