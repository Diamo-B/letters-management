// File: projects/design-system/src/lib/components/toast/toast.stories.ts
import {
  Meta,
  StoryObj,
  applicationConfig,
  moduleMetadata,
} from '@storybook/angular';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { action } from '@storybook/addon-actions';
import { ToastComponent } from './toast.component';
import { ToastService } from './toast.service';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { provideAnimations } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

// Create a demo component that will use the ToastService to show toasts
import { Component } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideLocationMocks } from '@angular/common/testing';

@Component({
  selector: 'toast-demo',
  standalone: true,
  imports: [FormsModule, MatButtonModule],
  template: `
    <div style="padding: 20px;">
      <h3>Toast Demo</h3>
      <div style="display: flex; gap: 10px; margin-bottom: 20px;">
        <button (click)="showSuccess()">Success Toast</button>
        <button (click)="showError()">Error Toast</button>
        <button (click)="showInfo()">Info Toast</button>
        <button (click)="showWarning()">Warning Toast</button>
      </div>
      <div>
        <label for="message">Custom Message: </label>
        <input id="message" [(ngModel)]="message" />
        <button (click)="showCustom()">Show Custom Toast</button>
      </div>
    </div>
  `,
})
class ToastDemoComponent {
  message = 'This is a custom toast message';

  constructor(private toastService: ToastService) {}

  showSuccess(): void {
    this.toastService.success('Operation completed successfully!');
    action('success toast shown')();
  }

  showError(): void {
    this.toastService.error('An error occurred. Please try again.');
    action('error toast shown')();
  }

  showInfo(): void {
    this.toastService.info('Here is some information for you.');
    action('info toast shown')();
  }

  showWarning(): void {
    this.toastService.warning('Warning: This action cannot be undone.');
    action('warning toast shown')();
  }

  showCustom(): void {
    this.toastService.show(this.message);
    action('custom toast shown')({ message: this.message });
  }
}

const meta: Meta<ToastComponent> = {
  title: 'Design System/Toast',
  component: ToastComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatSnackBarModule,
        MatIconModule,
        MatButtonModule,
        FormsModule,
        ToastComponent,
        ToastDemoComponent,
      ],
    }),
    applicationConfig({
      providers: [
        provideRouter([]), // Provide empty routes array
        provideLocationMocks(), // Provide location mocks for the router
        ToastService,
        provideAnimations(),
      ],
    }),
  ],
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['success', 'error', 'info', 'warning'],
    },
    duration: {
      control: {
        type: 'number',
        min: 1000,
        max: 10000,
        step: 1000,
      },
    },
    dismissible: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<ToastComponent>;

// Direct component stories
export const Success: Story = {
  args: {
    message: 'Operation completed successfully!',
    type: 'success',
    duration: 5000,
    dismissible: true,
  },
};

export const Error: Story = {
  args: {
    message: 'An error occurred. Please try again.',
    type: 'error',
    duration: 5000,
    dismissible: true,
  },
};

export const Info: Story = {
  args: {
    message: 'Here is some information for you.',
    type: 'info',
    duration: 5000,
    dismissible: true,
  },
};

export const Warning: Story = {
  args: {
    message: 'Warning: This action cannot be undone.',
    type: 'warning',
    duration: 5000,
    dismissible: true,
  },
};

// Story for the demo component
export const ToastDemo: Story = {
  render: () => ({
    template: '<toast-demo></toast-demo>',
    props: {},
  }),
};
