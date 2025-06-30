import type { Meta, StoryObj } from '@storybook/react';
import { Header } from './Header';

const meta = {
  title: 'Organisms/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive header component with navigation, branding, and authentication features. Includes sticky positioning, responsive design, mobile menu, and dark mode support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'transparent', 'compact'],
      description: 'Visual variant of the header',
    },
    showNavigation: {
      control: { type: 'boolean' },
      description: 'Show or hide the navigation menu',
    },
    showAuthButtons: {
      control: { type: 'boolean' },
      description: 'Show or hide authentication buttons',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    variant: 'default',
    showNavigation: true,
    showAuthButtons: true,
  },
};

// Variant examples
export const DefaultVariant: Story = {
  args: {
    variant: 'default',
    showNavigation: true,
    showAuthButtons: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard header with full padding and solid background.',
      },
    },
  },
};

export const TransparentVariant: Story = {
  args: {
    variant: 'transparent',
    showNavigation: true,
    showAuthButtons: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with transparent background and backdrop blur effect, ideal for overlay scenarios.',
      },
    },
  },
};

export const CompactVariant: Story = {
  args: {
    variant: 'compact',
    showNavigation: true,
    showAuthButtons: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Compact header with reduced padding for space-efficient layouts.',
      },
    },
  },
};

// Configuration examples
export const WithoutNavigation: Story = {
  args: {
    variant: 'default',
    showNavigation: false,
    showAuthButtons: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with authentication buttons but no navigation menu.',
      },
    },
  },
};

export const WithoutAuthButtons: Story = {
  args: {
    variant: 'default',
    showNavigation: true,
    showAuthButtons: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Header with navigation menu but no authentication buttons.',
      },
    },
  },
};

export const MinimalHeader: Story = {
  args: {
    variant: 'compact',
    showNavigation: false,
    showAuthButtons: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal header with only branding, useful for focused experiences like forms or landing pages.',
      },
    },
  },
};


