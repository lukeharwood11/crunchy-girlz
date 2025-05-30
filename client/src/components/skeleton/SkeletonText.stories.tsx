import type { Meta, StoryObj } from '@storybook/react';
import SkeletonText from './SkeletonText';

const meta: Meta<typeof SkeletonText> = {
  title: 'Components/SkeletonText',
  component: SkeletonText,
  tags: ['autodocs'],
  argTypes: {
    lines: {
      control: { type: 'range', min: 1, max: 10, step: 1 },
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    width: {
      control: 'text',
    },
    lastLineWidth: {
      control: 'text',
    },
    animate: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof SkeletonText>;

export const SingleLine: Story = {
  args: {
    lines: 1,
    size: 'medium',
    width: '200px',
  },
};

export const MultipleLines: Story = {
  args: {
    lines: 3,
    size: 'medium',
    width: '300px',
  },
};

export const Paragraph: Story = {
  args: {
    lines: 4,
    size: 'medium',
    width: '100%',
    lastLineWidth: '60%',
  },
};

export const ShortText: Story = {
  args: {
    lines: 2,
    size: 'small',
    width: '150px',
    lastLineWidth: '80px',
  },
};

export const LongText: Story = {
  args: {
    lines: 5,
    size: 'medium',
    width: '400px',
    lastLineWidth: '250px',
  },
};

export const LargeText: Story = {
  args: {
    lines: 2,
    size: 'large',
    width: '300px',
  },
};

export const NoAnimation: Story = {
  args: {
    lines: 3,
    size: 'medium',
    width: '250px',
    animate: false,
  },
};

export const ArticlePreview: Story = {
  render: () => (
    <div style={{ maxWidth: '500px' }}>
      <SkeletonText lines={1} size="xlarge" width="80%" />
      <div style={{ marginTop: '16px' }}>
        <SkeletonText lines={4} size="medium" width="100%" lastLineWidth="75%" />
      </div>
      <div style={{ marginTop: '12px' }}>
        <SkeletonText lines={1} size="small" width="120px" />
      </div>
    </div>
  ),
};

export const CommentSkeleton: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
      {Array.from({ length: 3 }, (_, index) => (
        <div key={index} style={{ 
          padding: '12px', 
          border: '1px solid var(--grey-200)', 
          borderRadius: 'var(--border-radius-standard)' 
        }}>
          <SkeletonText lines={1} size="medium" width="120px" />
          <div style={{ marginTop: '8px' }}>
            <SkeletonText lines={2} size="small" width="100%" lastLineWidth="85%" />
          </div>
        </div>
      ))}
    </div>
  ),
};

export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Small</h4>
        <SkeletonText lines={2} size="small" width="200px" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Medium</h4>
        <SkeletonText lines={2} size="medium" width="200px" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Large</h4>
        <SkeletonText lines={2} size="large" width="200px" />
      </div>
      <div>
        <h4 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>XLarge</h4>
        <SkeletonText lines={2} size="xlarge" width="200px" />
      </div>
    </div>
  ),
};