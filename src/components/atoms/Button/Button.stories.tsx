import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

// Simple action logger for demos
const action = (name: string) => () => console.log(`Action: ${name}`);

const meta = {
  title: 'Atoms/Button',
  component: Button,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A fully-featured button component using the AFP design system with dark mode support, performance optimizations, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['primary', 'secondary', 'ghost'],
      description: 'Visual style variant of the button',
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the button',
    },
    enhanced: {
      control: 'boolean',
      description: 'Enable GPU-optimized hover effects',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the button',
    },
    onClick: {
      description: 'Click event handler',
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'Default Button',
    onClick: action('button-click'),
  },
};

// Primary variant
export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Primary Button',
    onClick: action('primary-click'),
  },
};

// Secondary variant
export const Secondary: Story = {
  args: {
    variant: 'secondary',
    children: 'Secondary Button',
    onClick: action('secondary-click'),
  },
};

// Ghost variant
export const Ghost: Story = {
  args: {
    variant: 'ghost',
    children: 'Ghost Button',
    onClick: action('ghost-click'),
  },
};

// Size variations
export const Small: Story = {
  args: {
    size: 'sm',
    children: 'Small Button',
    onClick: action('small-click'),
  },
};

export const Medium: Story = {
  args: {
    size: 'md',
    children: 'Medium Button',
    onClick: action('medium-click'),
  },
};

export const Large: Story = {
  args: {
    size: 'lg',
    children: 'Large Button',
    onClick: action('large-click'),
  },
};

// Enhanced with GPU optimizations
export const Enhanced: Story = {
  args: {
    enhanced: true,
    children: 'Enhanced Button',
    onClick: action('enhanced-click'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Button with GPU-optimized hover effects for smooth animations.',
      },
    },
  },
};

// Disabled state
export const Disabled: Story = {
  args: {
    disabled: true,
    children: 'Disabled Button',
    onClick: action('disabled-click'),
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <Button variant="primary" onClick={action('primary')}>
        Primary
      </Button>
      <Button variant="secondary" onClick={action('secondary')}>
        Secondary
      </Button>
      <Button variant="ghost" onClick={action('ghost')}>
        Ghost
      </Button>
      <Button disabled onClick={action('disabled')}>
        Disabled
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all button variants in a single view.',
      },
    },
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
      <Button size="sm" onClick={action('small')}>
        Small
      </Button>
      <Button size="md" onClick={action('medium')}>
        Medium
      </Button>
      <Button size="lg" onClick={action('large')}>
        Large
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Showcase of all button sizes in a single view.',
      },
    },
  },
};

// Real-world usage examples
export const PensionCalculator: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexDirection: 'column', maxWidth: '300px' }}>
      <Button variant="primary" size="lg" enhanced onClick={action('calculate')}>
        Calculate Pension
      </Button>
      <Button variant="secondary" size="md" onClick={action('reset')}>
        Reset Form
      </Button>
      <Button variant="ghost" size="sm" onClick={action('help')}>
        Need Help?
      </Button>
    </div>
  ),
  parameters: {
    docs: {
      description: {
        story: 'Real-world usage example showing buttons in a pension calculator context.',
      },
    },
  },
};

// Loading state (using disabled + custom content)
export const Loading: Story = {
  args: {
    disabled: true,
    children: '⏳ Calculating...',
    onClick: action('loading-click'),
  },
  parameters: {
    docs: {
      description: {
        story: 'Button in loading state (disabled with loading indicator).',
      },
    },
  },
};