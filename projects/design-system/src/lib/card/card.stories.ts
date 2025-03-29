import { Meta, StoryObj } from '@storybook/angular';
import { CardComponent } from './card.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { moduleMetadata } from '@storybook/angular';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

const meta: Meta<CardComponent> = {
    title: 'Design System/Card',
    component: CardComponent,
    tags: ['autodocs'],
    argTypes: {
      title: { control: 'text' },
      subtitle: { control: 'text' },
      footnote: { control: 'text' },
      appearance: { control: 'select', options: ['outlined', 'raised'] },
      customClasses: { control: 'object' },
      cardClick: { action: 'clicked' },
    },
    decorators: [
      moduleMetadata({
        imports: [MatCardModule, MatButtonModule, MatIconModule, BrowserAnimationsModule],
      }),
    ],
};

export default meta;
type Story = StoryObj<CardComponent>;

export const Default: Story = {
  args: {
    title: 'Card Title',
    subtitle: 'Card Subtitle',
    footnote: 'Footnote Text',
    appearance: "raised",
  },
};

export const Raised: Story = {
  args: {
    title: 'Raised Card',
    subtitle: 'This card has a raised appearance',
    footnote: 'Raised card style',
    appearance: 'raised',
  },
};

export const Outlined: Story = {
  args: {
    title: 'Outlined Card',
    subtitle: 'This card has an outlined appearance',
    footnote: 'Outlined card style',
    appearance: 'outlined',
  },
};

export const Clickable: Story = {
  args: {
    title: 'Clickable Card',
    subtitle: 'Click this card',
    footnote: 'Click event will trigger an action',
    appearance: 'outlined',
  },
  parameters: {
    actions: {
      handles: ['click'],
    },
  },
};