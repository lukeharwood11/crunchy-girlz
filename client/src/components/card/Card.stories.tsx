import type { Meta, StoryObj } from '@storybook/react';
import Card from './Card';
import Button from '../button/Button';
import Image from '../image/Image';

const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'elevated', 'outlined', 'subtle'],
    },
    padding: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
    },
    hoverable: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Card Title</h3>
        <p style={{ margin: '0', color: 'var(--grey-600)' }}>
          This is the card content. It can contain any React elements.
        </p>
      </div>
    ),
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Elevated Card</h3>
        <p style={{ margin: '0', color: 'var(--grey-600)' }}>
          This card has more prominent shadow styling.
        </p>
      </div>
    ),
  },
};

export const Outlined: Story = {
  args: {
    variant: 'outlined',
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Outlined Card</h3>
        <p style={{ margin: '0', color: 'var(--grey-600)' }}>
          This card has a thicker border and no shadow.
        </p>
      </div>
    ),
  },
};

export const Subtle: Story = {
  args: {
    variant: 'subtle',
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Subtle Card</h3>
        <p style={{ margin: '0', color: 'var(--grey-600)' }}>
          This card has a subtle background color.
        </p>
      </div>
    ),
  },
};

export const WithHeader: Story = {
  args: {
    header: (
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: 'var(--grey-800)' }}>Card Header</h2>
        <span style={{ color: 'var(--grey-600)', fontSize: '14px' }}>Action</span>
      </div>
    ),
    children: (
      <p style={{ margin: '0', color: 'var(--grey-600)' }}>
        This card has a header section with a title and action area.
      </p>
    ),
  },
};

export const WithFooter: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Card with Footer</h3>
        <p style={{ margin: '0', color: 'var(--grey-600)' }}>
          This card has a footer section with actions.
        </p>
      </div>
    ),
    footer: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'flex-end' }}>
        <Button variant="secondary" size="small">Cancel</Button>
        <Button variant="primary" size="small">Save</Button>
      </div>
    ),
  },
};

export const WithHeaderAndFooter: Story = {
  args: {
    header: (
      <h2 style={{ margin: 0, color: 'var(--grey-800)' }}>Complete Card</h2>
    ),
    children: (
      <div>
        <p style={{ margin: '0 0 12px 0', color: 'var(--grey-600)' }}>
          This card demonstrates both header and footer sections.
        </p>
        <p style={{ margin: '0', color: 'var(--grey-600)' }}>
          The content area is flexible and can contain any components.
        </p>
      </div>
    ),
    footer: (
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ color: 'var(--grey-600)', fontSize: '14px' }}>Updated 2 hours ago</span>
        <Button variant="primary" size="small">View Details</Button>
      </div>
    ),
  },
};

export const Interactive: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Clickable Card</h3>
        <p style={{ margin: '0', color: 'var(--grey-600)' }}>
          This card is interactive and responds to clicks and hover.
        </p>
      </div>
    ),
    onClick: () => alert('Card clicked!'),
  },
};

export const Hoverable: Story = {
  args: {
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Hoverable Card</h3>
        <p style={{ margin: '0', color: 'var(--grey-600)' }}>
          This card has hover effects but no click handler.
        </p>
      </div>
    ),
    hoverable: true,
  },
};

export const SmallPadding: Story = {
  args: {
    padding: 'small',
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Small Padding</h3>
        <p style={{ margin: '0', color: 'var(--grey-600)' }}>
          This card has reduced padding.
        </p>
      </div>
    ),
  },
};

export const LargePadding: Story = {
  args: {
    padding: 'large',
    children: (
      <div>
        <h3 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Large Padding</h3>
        <p style={{ margin: '0', color: 'var(--grey-600)' }}>
          This card has increased padding for more spacious content.
        </p>
      </div>
    ),
  },
};

export const NoPadding: Story = {
  args: {
    padding: 'none',
    header: (
      <h2 style={{ margin: 0, color: 'var(--grey-800)' }}>No Padding Card</h2>
    ),
    children: (
      <div>
        <Image 
          src="https://picsum.photos/400/200" 
          alt="Card image" 
          width="100%" 
          height="200px"
          style={{ display: 'block', marginBottom: '12px' }}
        />
        <p style={{ margin: '0', color: 'var(--grey-600)' }}>
          This card has no padding, useful for image cards.
        </p>
      </div>
    ),
    footer: (
      <Button variant="primary" size="medium" fullWidth>
        View Image
      </Button>
    ),
  },
};

export const VariantComparison: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '16px' }}>
      <Card variant="default">
        <h4 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Default</h4>
        <p style={{ margin: '0', color: 'var(--grey-600)' }}>
          Standard card with subtle shadow.
        </p>
      </Card>
      
      <Card variant="elevated">
        <h4 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Elevated</h4>
        <p style={{ margin: '0', color: 'var(--grey-600)' }}>
          Prominent shadow for emphasis.
        </p>
      </Card>
      
      <Card variant="outlined">
        <h4 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Outlined</h4>
        <p style={{ margin: '0', color: 'var(--grey-600)' }}>
          Thick border, no shadow.
        </p>
      </Card>
      
      <Card variant="subtle">
        <h4 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Subtle</h4>
        <p style={{ margin: '0', color: 'var(--grey-600)' }}>
          Soft background color.
        </p>
      </Card>
    </div>
  ),
};

export const ProductCard: Story = {
  render: () => (
    <Card padding="none" hoverable style={{ maxWidth: '280px' }}>
      <Image 
        src="https://picsum.photos/400/250" 
        alt="Product image" 
        width="100%" 
        height="180px"
        style={{ display: 'block' }}
      />
      <div style={{ padding: '16px' }}>
        <h3 style={{ margin: '0 0 8px 0', color: 'var(--grey-800)' }}>Product Name</h3>
        <p style={{ margin: '0 0 12px 0', color: 'var(--grey-600)', fontSize: '14px' }}>
          Brief product description goes here.
        </p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: '18px', fontWeight: 'bold', color: 'var(--primary-green)' }}>
            $29.99
          </span>
          <Button variant="primary" size="small">
            Add to Cart
          </Button>
        </div>
      </div>
    </Card>
  ),
};

export const ProfileCard: Story = {
  render: () => (
    <Card variant="elevated" style={{ maxWidth: '300px' }}>
      <div style={{ display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
        <Image 
          src="https://picsum.photos/80/80" 
          alt="Profile" 
          variant="circle"
          width="60px"
          height="60px"
        />
        <div style={{ flex: 1 }}>
          <h3 style={{ margin: '0 0 4px 0', color: 'var(--grey-800)' }}>John Doe</h3>
          <p style={{ margin: '0 0 8px 0', color: 'var(--grey-600)', fontSize: '14px' }}>
            Software Developer
          </p>
          <p style={{ margin: '0', color: 'var(--grey-600)', fontSize: '12px' }}>
            Building amazing web experiences with React and TypeScript.
          </p>
        </div>
      </div>
    </Card>
  ),
};