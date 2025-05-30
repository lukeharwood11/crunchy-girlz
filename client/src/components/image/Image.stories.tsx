import type { Meta, StoryObj } from '@storybook/react';
import Image from './Image';

const meta: Meta<typeof Image> = {
  title: 'Components/Image',
  component: Image,
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: 'select',
      options: ['small', 'medium', 'large', 'xlarge'],
    },
    variant: {
      control: 'select',
      options: ['default', 'rounded', 'circle'],
    },
    objectFit: {
      control: 'select',
      options: ['cover', 'contain', 'fill', 'scale-down'],
    },
    loading: {
      control: 'select',
      options: ['lazy', 'eager'],
    },
    width: {
      control: 'text',
    },
    height: {
      control: 'text',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Image>;

export const Default: Story = {
  args: {
    src: 'https://picsum.photos/300/300',
    alt: 'Default image',
    size: 'medium',
    variant: 'default',
  },
};

export const Circle: Story = {
  args: {
    src: 'https://picsum.photos/300/300',
    alt: 'Circle image',
    size: 'medium',
    variant: 'circle',
  },
};

export const Rounded: Story = {
  args: {
    src: 'https://picsum.photos/300/300',
    alt: 'Rounded image',
    size: 'medium',
    variant: 'rounded',
  },
};

export const Small: Story = {
  args: {
    src: 'https://picsum.photos/300/300',
    alt: 'Small image',
    size: 'small',
  },
};

export const Large: Story = {
  args: {
    src: 'https://picsum.photos/300/300',
    alt: 'Large image',
    size: 'large',
  },
};

export const XLarge: Story = {
  args: {
    src: 'https://picsum.photos/300/300',
    alt: 'Extra large image',
    size: 'xlarge',
  },
};

export const WithFallback: Story = {
  args: {
    src: 'https://invalid-url.com/broken-image.jpg',
    fallbackSrc: 'https://picsum.photos/300/300',
    alt: 'Image with fallback',
    size: 'medium',
  },
};

export const WithLogoFallback: Story = {
  args: {
    src: 'https://invalid-url.com/broken-image.jpg',
    alt: 'Image with logo fallback',
    size: 'medium',
  },
};

export const CustomWidth: Story = {
  args: {
    src: 'https://picsum.photos/300/300',
    alt: 'Custom width image',
    width: '200px',
  },
};

export const CustomDimensions: Story = {
  args: {
    src: 'https://picsum.photos/800/400',
    alt: 'Custom dimensions image',
    width: '300px',
    height: '150px',
    objectFit: 'cover',
  },
};

export const ResponsiveWidth: Story = {
  args: {
    src: 'https://picsum.photos/300/300',
    alt: 'Responsive width image',
    width: '100%',
    style: { maxWidth: '400px' },
  },
};

export const LoadingSkeleton: Story = {
  args: {
    src: 'https://picsum.photos/300/300?random=1&' + Date.now(), // Force reload to show skeleton
    alt: 'Loading skeleton demo',
    size: 'large',
  },
  parameters: {
    docs: {
      description: {
        story: 'This story demonstrates the skeleton loading state. The skeleton will show briefly while the image loads.',
      },
    },
  },
};

export const ObjectFitContain: Story = {
  args: {
    src: 'https://picsum.photos/800/400',
    alt: 'Contain fit image',
    size: 'medium',
    objectFit: 'contain',
  },
};

export const ObjectFitCover: Story = {
  args: {
    src: 'https://picsum.photos/800/400',
    alt: 'Cover fit image',
    size: 'medium',
    objectFit: 'cover',
  },
};

export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <Image src="https://picsum.photos/300/300" alt="Small" size="small" />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Small</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Image src="https://picsum.photos/300/300" alt="Medium" size="medium" />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Medium</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Image src="https://picsum.photos/300/300" alt="Large" size="large" />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Large</p>
      </div>
    </div>
  ),
};

export const FeatureShowcase: Story = {
  render: () => (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '24px', alignItems: 'start' }}>
      <div style={{ textAlign: 'center' }}>
        <Image 
          src="https://picsum.photos/300/300" 
          alt="Standard size" 
          size="medium" 
        />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Standard Size</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Image 
          src="https://picsum.photos/300/300" 
          alt="Custom width" 
          width="150px"
          variant="rounded"
        />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Custom Width (150px)</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Image 
          src="https://invalid-url.com/broken.jpg" 
          alt="Logo fallback" 
          size="medium"
          variant="rounded"
        />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Logo Fallback</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Image 
          src="https://picsum.photos/400/200" 
          alt="Custom dimensions" 
          width="200px"
          height="100px"
          objectFit="cover"
          variant="rounded"
        />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Custom Dimensions</p>
      </div>
    </div>
  ),
};