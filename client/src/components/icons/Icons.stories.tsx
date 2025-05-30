import type { Meta, StoryObj } from '@storybook/react';
import GoogleIcon from './GoogleIcon';
import LoadingIcon from './LoadingIcon';
import Logo from './Logo';
import SadIcon from './SadIcon';

const meta: Meta = {
  title: 'Components/Icons',
  tags: ['autodocs'],
};

export default meta;

export const GoogleIconStory: StoryObj<typeof GoogleIcon> = {
  name: 'Google Icon',
  render: (args) => <GoogleIcon {...args} />,
  args: {
    size: 18,
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 12, max: 48, step: 2 },
    },
    className: {
      control: 'text',
    },
  },
};

export const LoadingIconStory: StoryObj<typeof LoadingIcon> = {
  name: 'Loading Icon',
  render: (args) => <LoadingIcon {...args} />,
  args: {
    size: 24,
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 16, max: 64, step: 4 },
    },
    className: {
      control: 'text',
    },
  },
};

export const LogoStory: StoryObj<typeof Logo> = {
  name: 'Logo',
  render: (args) => <Logo {...args} />,
  args: {
    size: 32,
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 16, max: 128, step: 8 },
    },
    className: {
      control: 'text',
    },
  },
};

export const SadIconStory: StoryObj<typeof SadIcon> = {
  name: 'Sad Icon',
  render: (args) => <SadIcon {...args} />,
  args: {
    size: 48,
  },
  argTypes: {
    size: {
      control: { type: 'range', min: 24, max: 96, step: 8 },
    },
    className: {
      control: 'text',
    },
  },
};

export const AllIconsSizes: StoryObj = {
  name: 'All Icons - Size Comparison',
  render: () => (
    <div style={{ display: 'flex', gap: '20px', alignItems: 'center', flexWrap: 'wrap' }}>
      <div style={{ textAlign: 'center' }}>
        <GoogleIcon size={24} />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Google</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <LoadingIcon size={24} />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Loading</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <Logo size={24} />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Logo</p>
      </div>
      <div style={{ textAlign: 'center' }}>
        <SadIcon size={24} />
        <p style={{ margin: '8px 0 0 0', fontSize: '12px' }}>Sad</p>
      </div>
    </div>
  ),
};