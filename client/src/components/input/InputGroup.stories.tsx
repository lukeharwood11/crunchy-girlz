import type { Meta, StoryObj } from '@storybook/react';
import { MdEmail, MdLock } from 'react-icons/md';
import InputGroup from './InputGroup';
import Input from './Input';

const meta: Meta<typeof InputGroup> = {
  title: 'Components/InputGroup',
  component: InputGroup,
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
    },
    error: {
      control: 'text',
    },
    required: {
      control: 'boolean',
    },
    htmlFor: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof InputGroup>;

export const Default: Story = {
  args: {
    label: 'Email Address',
    htmlFor: 'email',
    children: <Input id="email" type="email" placeholder="Enter your email" />,
  },
};

export const WithError: Story = {
  args: {
    label: 'Email Address',
    htmlFor: 'email-error',
    error: 'Please enter a valid email address',
    children: <Input id="email-error" type="email" placeholder="Enter your email" variant="error" value="invalid-email" />,
  },
};

export const Required: Story = {
  args: {
    label: 'Password',
    htmlFor: 'password',
    required: true,
    children: <Input id="password" type="password" placeholder="Enter your password" />,
  },
};

export const RequiredWithError: Story = {
  args: {
    label: 'Confirm Password',
    htmlFor: 'confirm-password',
    required: true,
    error: 'Passwords do not match',
    children: <Input id="confirm-password" type="password" placeholder="Confirm your password" variant="error" />,
  },
};

export const WithIcon: Story = {
  args: {
    label: 'Email Address',
    htmlFor: 'email-icon',
    children: <Input id="email-icon" type="email" placeholder="Enter your email" leftIcon={<MdEmail size={18} />} />,
  },
};

export const PasswordWithIcon: Story = {
  args: {
    label: 'Password',
    htmlFor: 'password-icon',
    required: true,
    children: <Input id="password-icon" type="password" placeholder="Enter your password" leftIcon={<MdLock size={18} />} />,
  },
};

export const NoLabel: Story = {
  args: {
    children: <Input placeholder="Input without label" />,
  },
};