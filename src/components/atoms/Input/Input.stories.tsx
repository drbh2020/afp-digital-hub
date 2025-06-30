import type { Meta, StoryObj } from '@storybook/react';
import { Input } from './Input';

// Simple action logger for demos
const action = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
  console.log(`Action: ${name}`, e.target.value);

const meta = {
  title: 'Atoms/Input',
  component: Input,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A comprehensive input component using the AFP design system with dark mode support, multiple variants, validation states, and accessibility features.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['default', 'search', 'textarea'],
      description: 'Visual variant of the input',
    },
    state: {
      control: { type: 'select' },
      options: ['default', 'error', 'success'],
      description: 'Validation state of the input',
    },
    inputSize: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
      description: 'Size of the input',
    },
    label: {
      control: 'text',
      description: 'Label text for the input',
    },
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    successMessage: {
      control: 'text',
      description: 'Success message to display',
    },
    hideLabel: {
      control: 'boolean',
      description: 'Visually hide label (keeps for screen readers)',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
    required: {
      control: 'boolean',
      description: 'Mark input as required',
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: 'Default Input',
    placeholder: 'Enter text...',
    onChange: action('default-change'),
  },
};

// Variants
export const TextInput: Story = {
  args: {
    variant: 'default',
    label: 'Text Input',
    type: 'text',
    placeholder: 'Enter your name',
    onChange: action('text-change'),
  },
};

export const SearchInput: Story = {
  args: {
    variant: 'search',
    label: 'Search',
    placeholder: 'Search pension plans...',
    onChange: action('search-change'),
  },
};

export const TextareaInput: Story = {
  args: {
    variant: 'textarea',
    label: 'Comments',
    placeholder: 'Enter your comments...',
    onChange: action('textarea-change'),
  },
};

// Input types
export const EmailInput: Story = {
  args: {
    label: 'Email Address',
    type: 'email',
    placeholder: 'user@example.com',
    onChange: action('email-change'),
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    type: 'password',
    placeholder: 'Enter password',
    onChange: action('password-change'),
  },
};

export const NumberInput: Story = {
  args: {
    label: 'Monthly Salary',
    type: 'number',
    placeholder: '2500',
    onChange: action('number-change'),
  },
};

export const DateInput: Story = {
  args: {
    label: 'Date of Birth',
    type: 'date',
    onChange: action('date-change'),
  },
};

// Sizes
export const SmallInput: Story = {
  args: {
    inputSize: 'sm',
    label: 'Small Input',
    placeholder: 'Small size',
    onChange: action('small-change'),
  },
};

export const MediumInput: Story = {
  args: {
    inputSize: 'md',
    label: 'Medium Input',
    placeholder: 'Medium size (default)',
    onChange: action('medium-change'),
  },
};

export const LargeInput: Story = {
  args: {
    inputSize: 'lg',
    label: 'Large Input',
    placeholder: 'Large size',
    onChange: action('large-change'),
  },
};

// States
export const DefaultState: Story = {
  args: {
    state: 'default',
    label: 'Default State',
    placeholder: 'Normal input state',
    onChange: action('default-state-change'),
  },
};

export const ErrorState: Story = {
  args: {
    state: 'error',
    label: 'Error State',
    placeholder: 'This input has an error',
    errorMessage: 'This field is required',
    onChange: action('error-state-change'),
  },
};

export const SuccessState: Story = {
  args: {
    state: 'success',
    label: 'Success State',
    placeholder: 'This input is valid',
    successMessage: 'Valid input',
    value: 'Valid content',
    onChange: action('success-state-change'),
  },
};

// Label variations
export const WithLabel: Story = {
  args: {
    label: 'Visible Label',
    placeholder: 'Input with visible label',
    onChange: action('label-change'),
  },
};

export const HiddenLabel: Story = {
  args: {
    label: 'Hidden Label',
    hideLabel: true,
    placeholder: 'Input with hidden label (still accessible)',
    onChange: action('hidden-label-change'),
  },
};

// Special states
export const RequiredInput: Story = {
  args: {
    label: 'Required Field',
    required: true,
    placeholder: 'This field is required',
    onChange: action('required-change'),
  },
};

export const DisabledInput: Story = {
  args: {
    label: 'Disabled Input',
    disabled: true,
    placeholder: 'This input is disabled',
    value: 'Cannot edit this',
    onChange: action('disabled-change'),
  },
};

// Real-world examples
export const PensionCalculatorForm: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input
        label="Full Name"
        type="text"
        placeholder="Juan Pérez"
        required
        onChange={action('name-change')}
      />
      
      <Input
        label="Monthly Salary (PEN)"
        type="number"
        placeholder="2500"
        required
        onChange={action('salary-change')}
      />
      
      <Input
        label="Age"
        type="number"
        placeholder="35"
        min="18"
        max="65"
        required
        onChange={action('age-change')}
      />
      
      <Input
        variant="search"
        label="Search Pension Plans"
        placeholder="Type to search..."
        onChange={action('search-change')}
      />
      
      <Input
        variant="textarea"
        label="Additional Notes"
        placeholder="Any additional information..."
        onChange={action('notes-change')}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Real-world usage example showing inputs in a pension calculator form.',
      },
    },
  },
};

// Validation examples
export const ValidationStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input
        label="Valid Email"
        type="email"
        value="user@example.com"
        state="success"
        successMessage="Valid email format"
        onChange={action('valid-email')}
      />
      
      <Input
        label="Invalid Email"
        type="email"
        value="invalid-email"
        state="error"
        errorMessage="Please enter a valid email address"
        onChange={action('invalid-email')}
      />
      
      <Input
        label="Salary Amount"
        type="number"
        value="2500"
        state="success"
        successMessage="Valid salary amount"
        onChange={action('valid-salary')}
      />
      
      <Input
        label="Required Field"
        type="text"
        state="error"
        errorMessage="This field is required"
        onChange={action('required-field')}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Examples of different validation states with success and error messages.',
      },
    },
  },
};

// Size comparison
export const SizeComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input
        inputSize="sm"
        label="Small Input"
        placeholder="Small size"
        onChange={action('small')}
      />
      
      <Input
        inputSize="md"
        label="Medium Input"
        placeholder="Medium size (default)"
        onChange={action('medium')}
      />
      
      <Input
        inputSize="lg"
        label="Large Input"
        placeholder="Large size"
        onChange={action('large')}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Comparison of all available input sizes.',
      },
    },
  },
};

// Variant comparison
export const VariantComparison: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input
        variant="default"
        label="Default Input"
        placeholder="Standard text input"
        onChange={action('default')}
      />
      
      <Input
        variant="search"
        label="Search Input"
        placeholder="Search functionality"
        onChange={action('search')}
      />
      
      <Input
        variant="textarea"
        label="Textarea Input"
        placeholder="Multi-line text input"
        onChange={action('textarea')}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Comparison of all available input variants.',
      },
    },
  },
};

// Accessibility example
export const AccessibilityFeatures: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '300px' }}>
      <Input
        label="Accessible Input"
        placeholder="Fully accessible input"
        aria-describedby="help-text"
        required
        onChange={action('accessible')}
      />
      <div id="help-text" style={{ fontSize: '0.875rem', color: '#666' }}>
        This input demonstrates accessibility features including proper labeling and ARIA attributes.
      </div>
      
      <Input
        label="Screen Reader Only Label"
        hideLabel
        placeholder="Label hidden visually but available to screen readers"
        onChange={action('sr-only')}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Examples demonstrating accessibility features including hidden labels and ARIA attributes.',
      },
    },
  },
};