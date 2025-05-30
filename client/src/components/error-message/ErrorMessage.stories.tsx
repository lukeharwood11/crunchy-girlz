import type { Meta, StoryObj } from '@storybook/react';
import ErrorMessage from './ErrorMessage';

const meta: Meta<typeof ErrorMessage> = {
  title: 'Components/ErrorMessage',
  component: ErrorMessage,
  tags: ['autodocs'],
  argTypes: {
    className: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ErrorMessage>;

export const Default: Story = {
  args: {
    children: 'This is an error message',
  },
};

export const LongMessage: Story = {
  args: {
    children: 'This is a much longer error message that demonstrates how the component handles extended text content. It might wrap to multiple lines depending on the container width.',
  },
};

export const WithCustomClass: Story = {
  args: {
    children: 'Error message with custom styling',
    className: 'custom-error-class',
  },
};

export const ValidationError: Story = {
  args: {
    children: 'Please enter a valid email address',
  },
};

export const NetworkError: Story = {
  args: {
    children: 'Unable to connect to server. Please check your internet connection and try again.',
  },
};