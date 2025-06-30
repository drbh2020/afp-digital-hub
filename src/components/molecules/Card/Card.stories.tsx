import type { Meta, StoryObj } from '@storybook/react';
import { Card } from './Card';
import { Text } from '@/components/atoms/Text/Text';

const meta = {
  title: 'Molecules/Card',
  component: Card,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive card component using the AFP design system with dark mode support, semantic variants, performance optimizations, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['base', 'elevated', 'compact', 'interactive', 'bordered'],
      description: 'Visual style variant of the card',
    },
    semantic: {
      control: { type: 'select' },
      options: ['success', 'warning', 'error', 'info'],
      description: 'Semantic meaning for the card content',
    },
    performance: {
      control: { type: 'select' },
      options: ['critical', 'lazy'],
      description: 'Performance optimization hint',
    },
    children: {
      control: 'text',
      description: 'Card content',
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'This is a default card with basic styling and layout.',
  },
};

// Variant examples
export const Base: Story = {
  args: {
    variant: 'base',
    children: 'Base card variant with standard styling and subtle shadow.',
  },
};

export const Elevated: Story = {
  args: {
    variant: 'elevated',
    children: 'Elevated card with enhanced shadow and hover effects for interactive content.',
  },
};

export const Compact: Story = {
  args: {
    variant: 'compact',
    children: 'Compact card with reduced padding for space-efficient layouts.',
  },
};

export const Interactive: Story = {
  args: {
    variant: 'interactive',
    children: 'Interactive card with hover states and cursor pointer for clickable content.',
  },
};

export const Bordered: Story = {
  args: {
    variant: 'bordered',
    children: 'Bordered card with prominent border and subtle background.',
  },
};

// Semantic variants
export const Success: Story = {
  args: {
    semantic: 'success',
    children: '✅ Success! Your pension calculation has been completed successfully.',
  },
};

export const Warning: Story = {
  args: {
    semantic: 'warning',
    children: '⚠️ Warning: Your current contributions may not meet your retirement goals.',
  },
};

export const Error: Story = {
  args: {
    semantic: 'error',
    children: '❌ Error: Unable to process your pension calculation. Please check your input data.',
  },
};

export const Info: Story = {
  args: {
    semantic: 'info',
    children: 'ℹ️ Information: Pension calculations are estimates and actual results may vary.',
  },
};

// Performance variants
export const Critical: Story = {
  args: {
    performance: 'critical',
    children: 'Critical performance card - optimized for above-the-fold content with immediate visibility.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card optimized for critical content that needs to be rendered immediately.',
      },
    },
  },
};

export const Lazy: Story = {
  args: {
    performance: 'lazy',
    children: 'Lazy performance card - optimized for below-the-fold content with deferred rendering.',
  },
  parameters: {
    docs: {
      description: {
        story: 'Card optimized for content that can be lazily rendered using content-visibility.',
      },
    },
  },
};

// Combined variants
export const ElevatedSuccess: Story = {
  args: {
    variant: 'elevated',
    semantic: 'success',
    children: '🎉 Congratulations! Your pension fund is performing excellently with a 12% annual return.',
  },
};

export const BorderedWarning: Story = {
  args: {
    variant: 'bordered',
    semantic: 'warning',
    children: '⚠️ Portfolio Review Needed: Consider rebalancing your investment allocation.',
  },
};

export const InteractiveInfo: Story = {
  args: {
    variant: 'interactive',
    semantic: 'info',
    children: '📊 Click to view detailed pension projections and investment breakdown.',
  },
};

// Rich content examples
export const PensionSummaryCard: Story = {
  args: {
    variant: 'elevated',
    children: (
      <div>
        <Text as="h3" variant="h3" style={{ marginBottom: '1rem' }}>Pension Summary</Text>
        <div style={{ marginBottom: '0.5rem' }}>
          <Text as="span" variant="body"><strong>Current Balance:</strong> S/. 125,450</Text>
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <Text as="span" variant="body"><strong>Monthly Contribution:</strong> S/. 850</Text>
        </div>
        <div style={{ marginBottom: '0.5rem' }}>
          <Text as="span" variant="body"><strong>Expected Retirement:</strong> 2054</Text>
        </div>
        <div style={{ marginBottom: '1rem' }}>
          <Text as="span" variant="body"><strong>Projected Monthly Pension:</strong> S/. 2,100</Text>
        </div>
        <Card semantic="success" variant="compact">
          <Text as="span" variant="body">✅ You're on track to meet your retirement goals!</Text>
        </Card>
      </div>
    ),
  },
};

export const InvestmentOptionsCard: Story = {
  args: {
    variant: 'bordered',
    children: (
      <div>
        <Text as="h3" variant="h3" style={{ marginBottom: '1rem' }}>Investment Options</Text>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          <Card variant="compact">
            <Text as="div" variant="body" style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Conservative Fund</Text>
            <Text as="div" variant="bodySmall">Low risk, stable returns</Text>
            <Text as="div" variant="bodySmall" style={{ color: '#10b981' }}>Average return: 4-6%</Text>
          </Card>
          
          <Card variant="compact">
            <Text as="div" variant="body" style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Balanced Fund</Text>
            <Text as="div" variant="bodySmall">Moderate risk, balanced growth</Text>
            <Text as="div" variant="bodySmall" style={{ color: '#3b82f6' }}>Average return: 7-9%</Text>
          </Card>
          
          <Card variant="compact">
            <Text as="div" variant="body" style={{ fontWeight: 'bold', marginBottom: '0.25rem' }}>Growth Fund</Text>
            <Text as="div" variant="bodySmall">Higher risk, maximum growth</Text>
            <Text as="div" variant="bodySmall" style={{ color: '#8b5cf6' }}>Average return: 10-14%</Text>
          </Card>
        </div>
      </div>
    ),
  },
};

export const CalculatorResultCard: Story = {
  args: {
    variant: 'elevated',
    semantic: 'success',
    children: (
      <div>
        <Text as="h3" variant="h3" style={{ marginBottom: '1rem' }}>Calculation Results</Text>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '1rem',
          marginBottom: '1rem' 
        }}>
          <div>
            <Text as="div" variant="bodySmall">Total Contributions</Text>
            <Text as="div" variant="h4" style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>S/. 306,000</Text>
          </div>
          <div>
            <Text as="div" variant="bodySmall">Investment Returns</Text>
            <Text as="div" variant="h4" style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#10b981' }}>S/. 189,450</Text>
          </div>
        </div>
        <Card semantic="info" variant="compact" style={{ textAlign: 'center' }}>
          <Text as="div" variant="bodySmall" style={{ marginBottom: '0.25rem' }}>
            Final Pension Fund Value
          </Text>
          <Text as="div" variant="h2" style={{ fontSize: '2rem', fontWeight: 'bold' }}>
            S/. 495,450
          </Text>
        </Card>
      </div>
    ),
  },
};

// Layout examples
export const CardGrid: Story = {
  args: { label: '' },
  render: () => (
    <div style={{ 
      display: 'grid', 
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
      gap: '1rem',
      width: '100%',
      maxWidth: '800px'
    }}>
      <Card variant="base">
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Base Card</h4>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#4a5568' }}>
          Standard card styling for general content.
        </p>
      </Card>
      
      <Card variant="elevated">
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Elevated Card</h4>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#4a5568' }}>
          Enhanced shadow for important content.
        </p>
      </Card>
      
      <Card variant="bordered">
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Bordered Card</h4>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#4a5568' }}>
          Clear boundaries with prominent borders.
        </p>
      </Card>
      
      <Card variant="compact">
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Compact Card</h4>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#4a5568' }}>
          Space-efficient layout.
        </p>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Grid layout showing different card variants working together.',
      },
    },
  },
};

export const SemanticStates: Story = {
  args: { label: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <Card semantic="success" variant="bordered">
        <strong>✅ Success:</strong> Your pension contribution has been processed successfully.
      </Card>
      
      <Card semantic="info" variant="bordered">
        <strong>ℹ️ Information:</strong> Your next contribution is due on March 15th.
      </Card>
      
      <Card semantic="warning" variant="bordered">
        <strong>⚠️ Warning:</strong> Consider increasing your contribution to meet retirement goals.
      </Card>
      
      <Card semantic="error" variant="bordered">
        <strong>❌ Error:</strong> Unable to process payment. Please check your account details.
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Semantic card variants for different types of messages and feedback.',
      },
    },
  },
};

// Performance comparison
export const PerformanceComparison: Story = {
  args: { label: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '500px' }}>
      <Card performance="critical" variant="elevated">
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Critical Performance Card</h4>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#4a5568' }}>
          This card uses critical performance optimizations for above-the-fold content. 
          It's rendered immediately and visible in the initial viewport.
        </p>
      </Card>
      
      <Card performance="lazy" variant="bordered">
        <h4 style={{ margin: '0 0 0.5rem 0' }}>Lazy Performance Card</h4>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#4a5568' }}>
          This card uses lazy performance optimizations for below-the-fold content.
          It uses content-visibility: auto for better rendering performance.
        </p>
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Comparison of performance optimization variants for different use cases.',
      },
    },
  },
};

// Accessibility example
export const AccessibilityFeatures: Story = {
  args: { label: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '400px' }}>
      <Card 
        variant="elevated" 
        role="article" 
        aria-labelledby="pension-title"
        tabIndex={0}
      >
        <h3 id="pension-title" style={{ margin: '0 0 0.5rem 0' }}>
          Accessible Pension Card
        </h3>
        <p style={{ margin: 0, fontSize: '0.875rem', color: '#4a5568' }}>
          This card demonstrates accessibility features including proper ARIA labeling,
          semantic roles, and keyboard navigation support.
        </p>
      </Card>
      
      <Card 
        semantic="warning" 
        variant="bordered"
        role="alert"
        aria-live="polite"
      >
        <strong>Accessibility Alert:</strong> This card uses role="alert" and aria-live
        to announce important changes to screen readers.
      </Card>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Examples demonstrating accessibility features including ARIA attributes and semantic roles.',
      },
    },
  },
};