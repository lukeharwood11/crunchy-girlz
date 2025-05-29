import type { Meta, StoryObj } from '@storybook/react';
import { MdPerson, MdAdd } from 'react-icons/md';
import ButtonLink from './ButtonLink';

const meta: Meta<typeof ButtonLink> = {
  title: 'Components/ButtonLink',
  component: ButtonLink,
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
  },
};

export default meta;
type Story = StoryObj<typeof ButtonLink>;

export const Primary: Story = {
  args: {
    children: 'Primary Link',
    variant: 'primary',
    size: 'medium',
    href: '#',
  },
};

export const PrimarySubtle: Story = {
  args: {
    children: 'Primary Subtle Link',
    variant: 'primary-subtle',
    size: 'medium',
    href: '#',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Link',
    variant: 'secondary',
    size: 'medium',
    href: '#',
  },
};

export const SecondarySubtle: Story = {
  args: {
    children: 'Secondary Subtle Link',
    variant: 'secondary-subtle',
    size: 'medium',
    href: '#',
  },
};

export const Alternate: Story = {
  args: {
    children: 'Alternate Link',
    variant: 'alternate',
    size: 'medium',
    href: '#',
  },
};

export const AlternateSubtle: Story = {
  args: {
    children: 'Alternate Subtle Link',
    variant: 'alternate-subtle',
    size: 'medium',
    href: '#',
  },
};

export const Danger: Story = {
  args: {
    children: 'Danger Link',
    variant: 'danger',
    size: 'medium',
    href: '#',
  },
};

export const DangerSubtle: Story = {
  args: {
    children: 'Danger Subtle Link',
    variant: 'danger-subtle',
    size: 'medium',
    href: '#',
  },
};

export const WithIcons: Story = {
  args: {
    children: 'Link with Icons',
    variant: 'primary',
    size: 'medium',
    href: '#',
    leftIcon: <MdPerson size={20} />,
    rightIcon: <MdAdd size={20} />,
  },
};

export const Loading: Story = {
  args: {
    children: 'Loading Link',
    variant: 'primary',
    size: 'medium',
    href: '#',
    isLoading: true,
  },
};

export const FullWidth: Story = {
  args: {
    children: 'Full Width Link',
    variant: 'primary',
    size: 'medium',
    href: '#',
    fullWidth: true,
  },
}; 