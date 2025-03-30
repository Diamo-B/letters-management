// button.stories.ts
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { provideRouter, RouterModule  } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { provideLocationMocks } from '@angular/common/testing';

const meta: Meta<ButtonComponent> = {
  title: 'Design System/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      imports: [
        CommonModule,
        MatButtonModule,
        MatIconModule,
        RouterModule
      ]
    }),
    applicationConfig({
      providers: [
        provideRouter([]), // Provide empty routes array
        provideLocationMocks() // Provide location mocks for the router
      ]
    })
  ],
  argTypes: {
    label: { control: 'text' },
    color: {
      control: 'select',
      options: ['primary', 'accent', 'warn', 'neutral']
    },
    variant: {
      control: 'select',
      options: ['Basic', 'Link', 'Raised', 'Stroked', 'Flat', 'Icon', 'IconWithText', 'IconWithLink']
    },
    disabled: { control: 'boolean' },
    icon: { control: 'text' },
    // Fix for the TypeScript error - using 'object' instead of 'array'
    customClasses: { control: 'object' },
    routerLink: { control: 'text' }
  }
};

export default meta;

// Define the Story type
type Story = StoryObj<ButtonComponent>;

export const Basic: Story = {
  args: {
    label: 'Basic Button',
    color: 'primary',
    variant: 'Basic',
    disabled: false
  }
};

export const Raised: Story = {
  args: {
    label: 'Raised Button',
    color: 'primary',
    variant: 'Raised',
    disabled: false
  }
};

export const Stroked: Story = {
  args: {
    label: 'Stroked Button',
    color: 'primary',
    variant: 'Stroked',
    disabled: false
  }
};

export const Flat: Story = {
  args: {
    label: 'Flat Button',
    color: 'primary',
    variant: 'Flat',
    disabled: false
  }
};

export const Icon: Story = {
  args: {
    icon: 'star',
    color: 'primary',
    variant: 'Icon',
    disabled: false
  }
};

export const IconWithText: Story = {
  args: {
    label: 'Icon With Text',
    icon: 'favorite',
    color: 'primary',
    variant: 'IconWithText',
    disabled: false
  }
};

export const IconWithLink: Story = {
  args: {
    label: 'Icon With Link',
    icon: 'link',
    color: 'primary',
    variant: 'IconWithLink',
    disabled: false,
    routerLink: '/example'
  }
};

export const PrimaryColor: Story = {
  args: {
    label: 'Primary Button',
    color: 'primary',
    variant: 'Basic'
  }
};

export const AccentColor: Story = {
  args: {
    label: 'Accent Button',
    color: 'accent',
    variant: 'Basic'
  }
};

export const WarnColor: Story = {
  args: {
    label: 'Warning Button',
    color: 'warn',
    variant: 'Basic'
  }
};

export const NeutralColor: Story = {
  args: {
    label: 'Neutral Button',
    color: 'neutral',
    variant: 'Basic'
  }
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Button',
    color: 'primary',
    variant: 'Basic',
    disabled: true
  }
};

export const WithCustomClasses: Story = {
  args: {
    label: 'Custom Classes',
    color: 'primary',
    variant: 'Basic',
    customClasses: ['custom-class-1', 'custom-class-2']
  }
};