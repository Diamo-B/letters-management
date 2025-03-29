import { Meta, StoryObj } from '@storybook/angular';
import { ButtonComponent } from './button.component';
import { MatIconModule } from '@angular/material/icon';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { moduleMetadata } from '@storybook/angular'; // Import moduleMetadata
import { MatButtonModule } from '@angular/material/button';

const meta: Meta<ButtonComponent> = {
  title: 'Design System/Button',
  component: ButtonComponent,
  tags: ['autodocs'],
  argTypes: {
    color: { control: 'select', options: ['primary', 'accent', 'warn'] },
    variant: {
      control: 'select',
      options: ['Basic', 'Raised', 'Stroked', 'Flat', 'IconWithText'],
    },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    icon: { control: 'text' }, // Add control for the icon
  },
  decorators: [
    moduleMetadata({ // Use moduleMetadata
      imports: [MatIconModule, 
        MatButtonModule, 
        BrowserAnimationsModule],
    }),
  ],
};

export default meta;
type Story = StoryObj<ButtonComponent>;

export const Basic: Story = {
  args: {
    variant: 'Basic',
    label: 'Basic',
    color: "primary"
  },
};

export const Raised: Story = {
  args: {
    variant: 'Raised',
    label: 'Raised',
    color: 'primary',
  },
};

export const Stroked: Story = {
  args: {
    variant: 'Stroked',
    label: 'Stroked',
    color: 'accent',
  },
};

export const Flat: Story = {
  args: {
    variant: 'Flat',
    label: 'Flat',
    color: 'warn',
  },
};

export const Disabled: Story = {
  args: {
    label: 'Disabled',
    disabled: true,
  },
};

export const Icon: Story = {
  args: {
    variant: 'Icon',
    icon: 'arrow_back',
  },
};

export const IconWithText: Story = {
  args: {
    variant: 'IconWithText',
    label: 'BACK TO OVERVIEW', // More descriptive label
    icon: 'arrow_back',
  },
};
