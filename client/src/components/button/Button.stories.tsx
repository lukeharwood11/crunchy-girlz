import type { Meta, StoryObj } from '@storybook/react';
import { MdPerson, MdAdd } from 'react-icons/md';
import Button from './Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: [
        'primary',
        'primary-subtle',
        'secondary',
        'secondary-subtle',
        'alternate',
        'alternate-subtle',
        'danger',
        'danger-subtle'
      ],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    fullWidth: {
      control: 'boolean',
    },
    isLoading: {
      control: 'boolean',
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
    size: 'medium',
  },
};

export const PrimarySubtle: Story = {
  args: {
    children: 'Primary Subtle Button',
    variant: 'primary-subtle',
    size: 'medium',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
    size: 'medium',
  },
};

export const SecondarySubtle: Story = {
  args: {
    children: 'Secondary Subtle Button',
    variant: 'secondary-subtle',
    size: 'medium',
  },
};

export const Alternate: Story = {
  args: {
    children: 'Alternate Button',
    variant: 'alternate',
    size: 'medium',
  },
};

export const AlternateSubtle: Story = {
  args: {
    children: 'Alternate Subtle Button',
    variant: 'alternate-subtle',
    size: 'medium',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Button',
    variant: 'danger',
    size: 'medium',
  },
};

export const DangerSubtle: Story = {
  args: {
    children: 'Danger Subtle Button',
    variant: 'danger-subtle',
    size: 'medium',
  },
};

export const Small: Story = {
  args: {
    children: 'Button',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    children: 'Button',
    size: 'large',
  },
};

export const WithIcons: Story = {
  args: {
    children: 'Button with Icons',
    variant: 'primary',
    size: 'medium',
    leftIcon: <MdPerson size={20} />,
    rightIcon: <MdAdd size={20} />,
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Button',
    variant: 'primary',
    size: 'medium',
    isLoading: true,
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    variant: 'primary',
    size: 'medium',
    disabled: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Button',
    variant: 'primary',
    size: 'medium',
    fullWidth: true,
  },
}; 