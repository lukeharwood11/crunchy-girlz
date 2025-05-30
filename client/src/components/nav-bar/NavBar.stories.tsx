import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import NavBar from './NavBar';

const meta: Meta<typeof NavBar> = {
  title: 'Components/NavBar',
  component: NavBar,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
  },
  decorators: [
    (Story) => (
      <MemoryRouter>
        <Story />
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof NavBar>;

export const Default: Story = {
  args: {},
}; 