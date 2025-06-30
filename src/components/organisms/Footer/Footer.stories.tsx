import type { Meta, StoryObj } from '@storybook/react';
import { Footer } from './Footer';

const meta = {
  title: 'Organisms/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive footer component with links, branding, social media, and contact information. Features responsive grid layout, multiple variants, and dark mode support.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'minimal', 'extended'],
      description: 'Visual variant of the footer',
    },
    showSocialLinks: {
      control: { type: 'boolean' },
      description: 'Show or hide social media links',
    },
    className: {
      control: 'text',
      description: 'Additional CSS classes',
    },
  },
} satisfies Meta<typeof Footer>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    variant: 'default',
    showSocialLinks: true,
  },
};

// Variant examples
export const DefaultVariant: Story = {
  args: {
    variant: 'default',
    showSocialLinks: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Standard footer with full content sections including services, resources, company info, and social links.',
      },
    },
  },
};

export const MinimalVariant: Story = {
  args: {
    variant: 'minimal',
    showSocialLinks: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Minimal footer with only copyright information, ideal for focused experiences or legal pages.',
      },
    },
  },
};

export const ExtendedVariant: Story = {
  args: {
    variant: 'extended',
    showSocialLinks: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Extended footer with additional spacing and comprehensive content sections.',
      },
    },
  },
};

// Configuration examples
export const WithoutSocialLinks: Story = {
  args: {
    variant: 'default',
    showSocialLinks: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer without social media links for privacy-focused or internal applications.',
      },
    },
  },
};

export const WithSocialLinks: Story = {
  args: {
    variant: 'default',
    showSocialLinks: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'Footer with social media links for public-facing websites and marketing pages.',
      },
    },
  },
};