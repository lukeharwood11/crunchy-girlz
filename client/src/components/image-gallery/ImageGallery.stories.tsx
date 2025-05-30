import type { Meta, StoryObj } from '@storybook/react';
import ImageGallery, { GalleryImage } from './ImageGallery';

const sampleImages: GalleryImage[] = [
  {
    src: 'https://picsum.photos/400/300?random=1',
    alt: 'Random image 1',
    caption: 'Beautiful landscape with mountains',
    thumbnail: 'https://picsum.photos/200/150?random=1'
  },
  {
    src: 'https://picsum.photos/400/500?random=2',
    alt: 'Random image 2',
    caption: 'Urban cityscape at sunset',
    thumbnail: 'https://picsum.photos/200/250?random=2'
  },
  {
    src: 'https://picsum.photos/400/400?random=3',
    alt: 'Random image 3',
    caption: 'Forest path in autumn',
    thumbnail: 'https://picsum.photos/200/200?random=3'
  },
  {
    src: 'https://picsum.photos/400/350?random=4',
    alt: 'Random image 4',
    caption: 'Ocean waves and rocky shore',
    thumbnail: 'https://picsum.photos/200/175?random=4'
  },
  {
    src: 'https://picsum.photos/400/450?random=5',
    alt: 'Random image 5',
    caption: 'Desert landscape with cacti',
    thumbnail: 'https://picsum.photos/200/225?random=5'
  },
  {
    src: 'https://picsum.photos/400/320?random=6',
    alt: 'Random image 6',
    caption: 'Snowy mountain peaks',
    thumbnail: 'https://picsum.photos/200/160?random=6'
  }
];

const meta: Meta<typeof ImageGallery> = {
  title: 'Components/ImageGallery',
  component: ImageGallery,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['grid', 'masonry', 'carousel', 'stack'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    columns: {
      control: { type: 'range', min: 1, max: 5, step: 1 },
    },
    spacing: {
      control: 'select',
      options: ['none', 'small', 'medium', 'large'],
    },
    showCaptions: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ImageGallery>;

export const GridDefault: Story = {
  args: {
    images: sampleImages,
    variant: 'grid',
    columns: 3,
    spacing: 'medium',
    showCaptions: false,
  },
};

export const GridWithCaptions: Story = {
  args: {
    images: sampleImages,
    variant: 'grid',
    columns: 3,
    spacing: 'medium',
    showCaptions: true,
  },
};

export const GridTwoColumns: Story = {
  args: {
    images: sampleImages,
    variant: 'grid',
    columns: 2,
    spacing: 'large',
    showCaptions: true,
  },
};

export const GridFourColumns: Story = {
  args: {
    images: sampleImages,
    variant: 'grid',
    columns: 4,
    spacing: 'small',
    showCaptions: false,
  },
};

export const MasonryLayout: Story = {
  args: {
    images: sampleImages,
    variant: 'masonry',
    columns: 3,
    spacing: 'medium',
    showCaptions: true,
  },
};

export const MasonryNoSpacing: Story = {
  args: {
    images: sampleImages,
    variant: 'masonry',
    columns: 4,
    spacing: 'none',
    showCaptions: false,
  },
};

export const CarouselDefault: Story = {
  args: {
    images: sampleImages,
    variant: 'carousel',
    size: 'medium',
    showCaptions: true,
  },
};

export const CarouselLarge: Story = {
  args: {
    images: sampleImages,
    variant: 'carousel',
    size: 'large',
    showCaptions: true,
  },
};

export const StackedImages: Story = {
  args: {
    images: sampleImages.slice(0, 4),
    variant: 'stack',
    size: 'medium',
    showCaptions: true,
  },
};

export const StackedSmall: Story = {
  args: {
    images: sampleImages.slice(0, 3),
    variant: 'stack',
    size: 'small',
    showCaptions: false,
  },
};

export const StackedLarge: Story = {
  args: {
    images: sampleImages.slice(0, 5),
    variant: 'stack',
    size: 'large',
    showCaptions: true,
  },
};

export const SmallImageGrid: Story = {
  args: {
    images: sampleImages,
    variant: 'grid',
    size: 'small',
    columns: 5,
    spacing: 'small',
    showCaptions: false,
  },
};

export const LargeImageGrid: Story = {
  args: {
    images: sampleImages.slice(0, 4),
    variant: 'grid',
    size: 'large',
    columns: 2,
    spacing: 'large',
    showCaptions: true,
  },
};

export const SingleImage: Story = {
  args: {
    images: [sampleImages[0]],
    variant: 'carousel',
    size: 'large',
    showCaptions: true,
  },
};

export const VariantComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '40px' }}>
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--grey-800)' }}>Grid Layout</h3>
        <ImageGallery
          images={sampleImages.slice(0, 4)}
          variant="grid"
          columns={2}
          spacing="medium"
          showCaptions={true}
        />
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--grey-800)' }}>Masonry Layout</h3>
        <ImageGallery
          images={sampleImages.slice(0, 4)}
          variant="masonry"
          columns={2}
          spacing="medium"
          showCaptions={true}
        />
      </div>
      
      <div>
        <h3 style={{ margin: '0 0 16px 0', color: 'var(--grey-800)' }}>Stack Layout</h3>
        <ImageGallery
          images={sampleImages.slice(0, 3)}
          variant="stack"
          size="small"
          showCaptions={true}
        />
      </div>
    </div>
  ),
};