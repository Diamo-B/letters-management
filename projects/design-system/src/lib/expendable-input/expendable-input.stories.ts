import type { Meta, StoryObj } from '@storybook/angular';
import { applicationConfig } from '@storybook/angular';
import { ReactiveFormsModule, FormControl, Validators } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { importProvidersFrom } from '@angular/core';
import { ExpandableInputComponent } from './expendable-input.component';

interface ExpandableInputStoryProps extends ExpandableInputComponent {
  isRequired?: boolean;
  customErrorMessage?: string;
}

const meta: Meta<ExpandableInputStoryProps> = {
  title: 'Design system/ExpandableInput',
  component: ExpandableInputComponent,
  tags: ['autodocs'],
  decorators: [
    applicationConfig({
      providers: [
        provideAnimations(),
        importProvidersFrom(
          ReactiveFormsModule, 
          MatInputModule, 
          MatDatepickerModule, 
          MatNativeDateModule
        )
      ],
    }),
  ],
  argTypes: {
    label: { control: 'text' },
    placeholder: { control: 'text' },
    control: { table: { disable: true } },
    errorMessage: { control: 'text' },
    isRequired: { control: 'boolean' },
    autoresize: { control: 'boolean' },
    floatingLabel: { control: { type: 'select' }, options: ['always', 'auto'] },
    type: { control: { type: 'select' }, options: ['text', 'date'] }  // Added type selector
  }
};

export default meta;
type Story = StoryObj<ExpandableInputStoryProps>;

const createControl = (isRequired: boolean, initialValue: string | Date = '') => {
  const validators = isRequired ? [Validators.required] : [];
  const control = new FormControl(initialValue, validators);
  
  if (isRequired) {
    control.markAsTouched();
    control.updateValueAndValidity();
  }
  
  return control;
};

const Args = {
  label: 'Example Label',
  placeholder: 'Enter text here',
  isRequired: false,
  errorMessage: undefined,
  autoresize: false,
};


export const Default: Story = {
  args: {
    ...Args
  },
  render: (args) => ({
    props: {
      ...args,
      control: createControl(!!args.isRequired, ''),
    }
  })
};

export const Expandable: Story = {
  args: {
    ...Args,
    autoresize: true
  },
  render: (args) => ({
    props: {
      ...args,
      control: createControl(!!args.isRequired, ''),
    }
  })
};

export const withFloatingLabel: Story = {
  args: {
    ...Args,
    floatingLabel: 'always'
  },
  render: (args) => ({
    props: {
      ...args,
      control: createControl(!!args.isRequired, 'Pre-filled message'),
    }
  })
};

export const RequiredInput: Story = {
  args: {
    ...Args,
    isRequired: true
  },
  render: (args) => ({
    props: {
      ...args,
      control: createControl(!!args.isRequired),
      errorMessage: args.errorMessage
    }
  })
};

export const CustomErrorMessage: Story = {
  args: {
    ...Args,
    isRequired: true,
    errorMessage: 'Please provide a valid field format'
  },
  render: (args) => ({
    props: {
      ...args,
      control: createControl(!!args.isRequired),
      errorMessage: args.errorMessage
    }
  })
};

export const PreFilled: Story = {
  args: {
    ...Args
  },
  render: (args) => ({
    props: {
      ...args,
      control: createControl(!!args.isRequired, 'Pre-filled message'),
      errorMessage: args.errorMessage
    }
  })
};

export const Disabled: Story = {
  args: {
    label: 'Disabled Field',
    placeholder: 'Cannot change value',
    isRequired: false,
    errorMessage: ''
  },
  render: (args) => ({
    props: {
      ...args,
      control: new FormControl({ value: 'Disabled text', disabled: true }),
      errorMessage: args.errorMessage
    }
  })
};

export const DateInput: Story = {
  args: {
    ...Args,
    label: 'Select a Date',
    placeholder: 'Pick a date',
    type: 'date',
    isRequired: true
  },
  render: (args) => ({
    props: {
      ...args,
      control: createControl(!!args.isRequired, new Date()),
    }
  })
};
