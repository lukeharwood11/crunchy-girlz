import type { Meta, StoryObj } from '@storybook/react';
import Skeleton from './Skeleton';

const meta: Meta<typeof Skeleton> = {
  title: 'Components/Skeleton',
  component: Skeleton,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'rounded', 'circle', 'text'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
    animate: {
      control: 'boolean',
    },
    lines: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Skeleton>;

export const Default: Story = {
  args: {
    variant: 'default',
    size: 'medium',
  },
};

export const Circle: Story = {
  args: {
    variant: 'circle',
    size: 'medium',
  },
};

export const Rounded: Story = {
  args: {
    variant: 'rounded',
    size: 'medium',
  },
};

export const Text: Story = {
  args: {
    variant: 'text',
    size: 'medium',
    width: '200px',
  },
};

export const TextMultipleLines: Story = {
  args: {
    variant: 'text',
    size: 'medium',
    lines: 3,
    width: '300px',
  },
};

export const Small: Story = {
  args: {
    variant: 'default',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    variant: 'default',
    size: 'large',
  },
};

export const XLarge: Story = {
  args: {
    variant: 'default',
    size: 'xlarge',
  },
};

export const CustomDimensions: Story = {
  args: {
    variant: 'default',
    width: '300px',
    height: '150px',
  },
};

export const NoAnimation: Story = {
  args: {
    variant: 'default',
    size: 'medium',
    animate: false,
  },
};

export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Skeleton variant="default" size="small" />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Skeleton variant="default" size="medium" />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Skeleton variant="default" size="large" />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Large</p>
      </div>
    </div>
  ),
};

export const VariantComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '24px', alignItems: 'start' }}>
      <div style={{ textAlign: 'center' }}>
        <Skeleton variant="default" size="medium" />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Default</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Skeleton variant="rounded" size="medium" />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Rounded</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Skeleton variant="circle" size="medium" />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Circle</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Skeleton variant="text" width="100px" />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Text</p>
      </div>
    </div>
  ),
};

export const CardSkeleton: Story = {
  render: () => (
    <div style={{ 
      padding: '16px', 
      border: '1px solid var(--grey-200)', 
      borderRadius: 'var(--border-radius-standard)',
      maxWidth: '300px'
    }}>
      <Skeleton variant="default" width="100%" height="150px" />
      <div style={{ marginTop: '16px' }}>
        <Skeleton variant="text" width="80%" size="large" />
        <Skeleton variant="text" lines={2} size="medium" />
        <div style={{ marginTop: '12px' }}>
          <Skeleton variant="text" width="60%" size="small" />
        </div>
      </div>
    </div>
  ),
};

export const ProfileSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
      <Skeleton variant="circle" size="small" />
      <div style={{ flex: 1 }}>
        <Skeleton variant="text" width="120px" size="medium" />
        <Skeleton variant="text" width="200px" size="small" />
      </div>
    </div>
  ),
};

export const ListSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {Array.from({ length: 4 }, (_, index) => (
        <div key={index} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
          <Skeleton variant="circle" width="40px" height="40px" />
          <div style={{ flex: 1 }}>
            <Skeleton variant="text" width="60%" size="medium" />
            <Skeleton variant="text" width="80%" size="small" />
          </div>
          <Skeleton variant="default" width="80px" height="32px" />
        </div>
      ))}
    </div>
  ),
};