import type { Meta, StoryObj } from '@storybook/react';
import { MdSearch, MdVisibility, MdEmail } from 'react-icons/md';
import Input from './Input';

const meta: Meta<typeof Input> = {
  title: 'Components/Input',
  component: Input,
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
    fullWidth: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'number', 'search'],
    },
  },
};

export default meta;
type Story = StoryObj<typeof Input>;

export const Default: Story = {
  args: {
    placeholder: 'Enter text...',
    variant: 'default',
    size: 'medium',
  },
};

export const WithLeftIcon: Story = {
  args: {
    placeholder: 'Search...',
    leftIcon: <MdSearch size={18} />,
    variant: 'default',
    size: 'medium',
  },
};

export const WithRightIcon: Story = {
  args: {
    placeholder: 'Password',
    type: 'password',
    rightIcon: <MdVisibility size={18} />,
    variant: 'default',
    size: 'medium',
  },
};

export const WithBothIcons: Story = {
  args: {
    placeholder: 'Email address',
    type: 'email',
    leftIcon: <MdEmail size={18} />,
    rightIcon: <MdVisibility size={18} />,
    variant: 'default',
    size: 'medium',
  },
};

export const ErrorState: Story = {
  args: {
    placeholder: 'Enter text...',
    variant: 'error',
    size: 'medium',
    value: 'Invalid input',
  },
};

export const Small: Story = {
  args: {
    placeholder: 'Small input',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    placeholder: 'Large input',
    size: 'large',
  },
};

export const FullWidth: Story = {
  args: {
    placeholder: 'Full width input',
    fullWidth: true,
    size: 'medium',
  },
};

export const Disabled: Story = {
  args: {
    placeholder: 'Disabled input',
    disabled: true,
    size: 'medium',
  },
};