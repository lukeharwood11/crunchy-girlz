import type { Meta, StoryObj } from '@storybook/react';
import TextArea from './TextArea';

const meta: Meta<typeof TextArea> = {
  title: 'Components/TextArea',
  component: TextArea,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'error'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    resize: {
      control: 'select',
      options: ['none', 'vertical', 'horizontal', 'both'],
    },
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof TextArea>;

export const Default: Story = {
  args: {
    placeholder: 'Enter your message...',
    variant: 'default',
    size: 'medium',
  },
};

export const WithValue: Story = {
  args: {
    placeholder: 'Enter your message...',
    value: 'This is some example text that shows how the TextArea component looks with content.',
    variant: 'default',
    size: 'medium',
  },
};

export const ErrorState: Story = {
  args: {
    placeholder: 'Enter your message...',
    value: 'This text has an error',
    variant: 'error',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small textarea',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large textarea',
    size: 'large',
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: 'Full width textarea',
    fullWidth: true,
    size: 'medium',
  },
};

export const NoResize: Story = {
  args: {
    placeholder: 'Cannot be resized',
    resize: 'none',
    size: 'medium',
  },
};

export const HorizontalResize: Story = {
  args: {
    placeholder: 'Can be resized horizontally',
    resize: 'horizontal',
    size: 'medium',
  },
};

export const BothResize: Story = {
  args: {
    placeholder: 'Can be resized in both directions',
    resize: 'both',
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled textarea',
    value: 'This textarea is disabled',
    disabled: true,
    size: 'medium',
  },
};

export const LongContent: Story = {
  args: {
    value: `This is a longer piece of content that demonstrates how the TextArea component handles multiple lines of text. 

It can contain line breaks and will expand vertically to accommodate the content.

You can also resize it vertically to see more or less content at once.

This is useful for longer form inputs like descriptions, comments, or messages.`,
    size: 'medium',
  },
};