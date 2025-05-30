import type { Meta, StoryObj } from '@storybook/react';
import { MemoryRouter } from 'react-router-dom';
import Layout from './Layout';

const meta: Meta<typeof Layout> = {
  title: 'Components/Layout',
  component: Layout,
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ height: '100vh' }}>
          <Story />
        </div>
      </MemoryRouter>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof Layout>;

export const Default: Story = {};

export const WithContent: Story = {
  decorators: [
    (Story) => (
      <MemoryRouter>
        <div style={{ height: '100vh' }}>
          <Layout />
          <div style={{ padding: '20px' }}>
            <h1>Page Content</h1>
            <p>This is example content that would be rendered in the main area of the layout.</p>
            <p>The layout includes the navigation bar at the top and this content area below it.</p>
          </div>
        </div>
      </MemoryRouter>
    ),
  ],
};