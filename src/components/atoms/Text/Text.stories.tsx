import type { Meta, StoryObj } from '@storybook/react';
import { Text } from './Text';

const meta = {
  title: 'Atoms/Text',
  component: Text,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive text component using the AFP design system typography with dark mode support, text utilities, and semantic HTML elements.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    as: {
      control: { type: 'select' },
      options: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'code', 'pre', 'label', 'legend', 'strong', 'em', 'small', 'a'],
      description: 'HTML element to render as',
    },
    variant: {
      control: { type: 'select' },
      options: [
        'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
        'bodyLarge', 'body', 'bodySmall',
        'lead', 'caption', 'code', 'codeBlock',
        'linkPrimary', 'linkSubtle'
      ],
      description: 'Typography variant style',
    },
    align: {
      control: { type: 'select' },
      options: ['left', 'center', 'right'],
      description: 'Text alignment',
    },
    truncate: {
      control: 'boolean',
      description: 'Truncate text with ellipsis',
    },
    lineClamp: {
      control: { type: 'number', min: 1, max: 10 },
      description: 'Clamp text to specific number of lines',
    },
    uppercase: {
      control: 'boolean',
      description: 'Transform text to uppercase',
    },
    noWrap: {
      control: 'boolean',
      description: 'Prevent text wrapping',
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    children: 'This is default text using the body variant.',
  },
};

// Heading variants
export const Heading1: Story = {
  args: {
    as: 'h1',
    variant: 'h1',
    children: 'AFP Pension Calculator',
  },
};

export const Heading2: Story = {
  args: {
    as: 'h2',
    variant: 'h2',
    children: 'Calculate Your Retirement',
  },
};

export const Heading3: Story = {
  args: {
    as: 'h3',
    variant: 'h3',
    children: 'Investment Options',
  },
};

export const Heading4: Story = {
  args: {
    as: 'h4',
    variant: 'h4',
    children: 'Monthly Contributions',
  },
};

export const Heading5: Story = {
  args: {
    as: 'h5',
    variant: 'h5',
    children: 'Additional Benefits',
  },
};

export const Heading6: Story = {
  args: {
    as: 'h6',
    variant: 'h6',
    children: 'Fine Print Details',
  },
};

// Body text variants
export const BodyLarge: Story = {
  args: {
    as: 'p',
    variant: 'bodyLarge',
    children: 'This is large body text for important information that needs emphasis but is not a heading.',
  },
};

export const Body: Story = {
  args: {
    as: 'p',
    variant: 'body',
    children: 'This is regular body text for most content. It provides good readability and is the default for paragraphs.',
  },
};

export const BodySmall: Story = {
  args: {
    as: 'p',
    variant: 'bodySmall',
    children: 'This is small body text for secondary information, captions, or supporting details.',
  },
};

// Special variants
export const Lead: Story = {
  args: {
    as: 'p',
    variant: 'lead',
    children: 'This is lead text - perfect for article introductions or important summary text that should stand out.',
  },
};

export const Caption: Story = {
  args: {
    as: 'span',
    variant: 'caption',
    children: 'This is caption text for small labels, metadata, or fine print.',
  },
};

export const Code: Story = {
  args: {
    as: 'code',
    variant: 'code',
    children: 'const pension = calculatePension(salary, years);',
  },
};

export const CodeBlock: Story = {
  args: {
    as: 'pre',
    variant: 'codeBlock',
    children: `function calculatePension(salary, years) {
  const monthlyContribution = salary * 0.10;
  return monthlyContribution * years * 12;
}`,
  },
};

// Link variants
export const LinkPrimary: Story = {
  args: {
    as: 'a',
    variant: 'linkPrimary',
    children: 'Primary link style',
    href: '#',
  },
};

export const LinkSubtle: Story = {
  args: {
    as: 'a',
    variant: 'linkSubtle',
    children: 'Subtle link style',
    href: '#',
  },
};

// Text alignment
export const TextLeft: Story = {
  args: {
    align: 'left',
    children: 'This text is aligned to the left.',
  },
  parameters: {
    layout: 'padded',
  },
};

export const TextCenter: Story = {
  args: {
    align: 'center',
    children: 'This text is center aligned.',
  },
  parameters: {
    layout: 'padded',
  },
};

export const TextRight: Story = {
  args: {
    align: 'right',
    children: 'This text is aligned to the right.',
  },
  parameters: {
    layout: 'padded',
  },
};

// Text utilities
export const Truncated: Story = {
  args: {
    truncate: true,
    children: 'This is a very long text that will be truncated with an ellipsis when it exceeds the available width of its container.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '200px', border: '1px dashed #ccc', padding: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

export const LineClamp: Story = {
  args: {
    lineClamp: 3,
    children: 'This is a longer piece of text that will be clamped to exactly three lines. Any additional content beyond the third line will be hidden with an ellipsis. This is useful for creating consistent layouts with variable content lengths.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '300px', border: '1px dashed #ccc', padding: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

export const Uppercase: Story = {
  args: {
    uppercase: true,
    variant: 'bodySmall',
    children: 'This text will be transformed to uppercase',
  },
};

export const NoWrap: Story = {
  args: {
    noWrap: true,
    children: 'This text will not wrap even in a narrow container and will overflow instead.',
  },
  decorators: [
    (Story) => (
      <div style={{ width: '200px', border: '1px dashed #ccc', padding: '8px' }}>
        <Story />
      </div>
    ),
  ],
};

// Semantic HTML examples
export const Label: Story = {
  args: {
    as: 'label',
    variant: 'bodySmall',
    children: 'Form Field Label',
  },
};

export const Legend: Story = {
  args: {
    as: 'legend',
    variant: 'body',
    children: 'Fieldset Legend',
  },
};

export const Strong: Story = {
  args: {
    as: 'strong',
    variant: 'body',
    children: 'Important text that should be bold',
  },
};

export const Emphasis: Story = {
  args: {
    as: 'em',
    variant: 'body',
    children: 'Emphasized text that should be italic',
  },
};

export const Small: Story = {
  args: {
    as: 'small',
    variant: 'caption',
    children: 'Small print or legal text',
  },
};

// Typography scale showcase
export const TypographyScale: Story = {
  render: () => (
    <div style={{ maxWidth: '600px', lineHeight: 1.6 }}>
      <Text as="h1" variant="h1">Heading 1 - Main Page Title</Text>
      <Text as="h2" variant="h2">Heading 2 - Section Title</Text>
      <Text as="h3" variant="h3">Heading 3 - Subsection Title</Text>
      <Text as="h4" variant="h4">Heading 4 - Component Title</Text>
      <Text as="h5" variant="h5">Heading 5 - Small Section</Text>
      <Text as="h6" variant="h6">Heading 6 - Fine Details</Text>
      
      <Text as="p" variant="lead" style={{ marginTop: '2rem' }}>
        This is lead text for article introductions or important summaries.
      </Text>
      
      <Text as="p" variant="bodyLarge">
        This is large body text for important information.
      </Text>
      
      <Text as="p" variant="body">
        This is regular body text for most content.
      </Text>
      
      <Text as="p" variant="bodySmall">
        This is small body text for secondary information.
      </Text>
      
      <Text as="span" variant="caption">
        This is caption text for labels and metadata.
      </Text>
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Complete typography scale showing all heading and body text variants.',
      },
    },
  },
};

// Real-world usage example
export const PensionForm: Story = {
  render: () => (
    <div style={{ maxWidth: '400px', padding: '1rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
      <Text as="h2" variant="h2" align="center">
        AFP Calculator
      </Text>
      
      <Text as="p" variant="lead" align="center" style={{ marginBottom: '1.5rem' }}>
        Calculate your retirement pension
      </Text>
      
      <div style={{ marginBottom: '1rem' }}>
        <Text as="label" variant="bodySmall">
          Monthly Salary (PEN)
        </Text>
        <Text as="p" variant="caption">
          Enter your gross monthly salary
        </Text>
      </div>
      
      <div style={{ marginBottom: '1rem' }}>
        <Text as="label" variant="bodySmall">
          Years of Contribution
        </Text>
        <Text as="p" variant="caption">
          How many years will you contribute?
        </Text>
      </div>
      
      <Text as="p" variant="bodySmall">
        <Text as="strong" variant="bodySmall">Important:</Text> Results are estimates only.
      </Text>
      
      <Text as="small" variant="caption">
        * Terms and conditions apply. Consult with a financial advisor.
      </Text>
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Real-world usage example showing text components in a pension calculator form context.',
      },
    },
  },
};