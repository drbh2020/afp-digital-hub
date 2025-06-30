import type { Meta, StoryObj } from '@storybook/react';
import { FormField } from './FormField';

// Simple action logger for demos
const action = (name: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => 
  console.log(`Action: ${name}`, e.target.value);

const meta = {
  title: 'Molecules/FormField',
  component: FormField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A complete form field molecule that combines Input with proper labeling, descriptions, and validation states. Perfect for building accessible forms with consistent styling.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    label: {
      control: 'text',
      description: 'Label text for the form field (required)',
    },
    description: {
      control: 'text',
      description: 'Helper text describing the field',
    },
    required: {
      control: 'boolean',
      description: 'Mark field as required with visual indicator',
    },
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
    errorMessage: {
      control: 'text',
      description: 'Error message to display',
    },
    successMessage: {
      control: 'text',
      description: 'Success message to display',
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable the input',
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    label: 'Default Form Field',
    placeholder: 'Enter text...',
    onChange: action('default-change'),
  },
};

// Basic form fields
export const TextInput: Story = {
  args: {
    label: 'Full Name',
    description: 'Enter your complete legal name',
    type: 'text',
    placeholder: 'Juan Pérez',
    onChange: action('text-change'),
  },
};

export const EmailInput: Story = {
  args: {
    label: 'Email Address',
    description: 'We\'ll use this to send you important updates',
    type: 'email',
    placeholder: 'user@example.com',
    onChange: action('email-change'),
  },
};

export const PasswordInput: Story = {
  args: {
    label: 'Password',
    description: 'Must be at least 8 characters long',
    type: 'password',
    placeholder: 'Enter secure password',
    onChange: action('password-change'),
  },
};

export const NumberInput: Story = {
  args: {
    label: 'Monthly Salary',
    description: 'Enter your gross monthly salary in PEN',
    type: 'number',
    placeholder: '2,500',
    min: '930',
    onChange: action('number-change'),
  },
};

// Variant examples
export const SearchField: Story = {
  args: {
    label: 'Search Pension Plans',
    description: 'Find the best pension plan for your needs',
    variant: 'search',
    placeholder: 'Type to search...',
    onChange: action('search-change'),
  },
};

export const TextareaField: Story = {
  args: {
    label: 'Additional Notes',
    description: 'Any additional information about your retirement goals',
    variant: 'textarea',
    placeholder: 'Tell us about your retirement plans...',
    onChange: action('textarea-change'),
  },
};

// Size variations
export const SmallField: Story = {
  args: {
    label: 'Small Field',
    description: 'This is a small-sized form field',
    inputSize: 'sm',
    placeholder: 'Small input',
    onChange: action('small-change'),
  },
};

export const MediumField: Story = {
  args: {
    label: 'Medium Field',
    description: 'This is a medium-sized form field (default)',
    inputSize: 'md',
    placeholder: 'Medium input',
    onChange: action('medium-change'),
  },
};

export const LargeField: Story = {
  args: {
    label: 'Large Field',
    description: 'This is a large-sized form field',
    inputSize: 'lg',
    placeholder: 'Large input',
    onChange: action('large-change'),
  },
};

// State examples
export const DefaultState: Story = {
  args: {
    label: 'Default State',
    description: 'Normal form field state',
    state: 'default',
    placeholder: 'Enter value',
    onChange: action('default-state-change'),
  },
};

export const ErrorState: Story = {
  args: {
    label: 'Error State',
    description: 'This field has validation errors',
    state: 'error',
    errorMessage: 'This field is required and cannot be empty',
    placeholder: 'Enter required value',
    onChange: action('error-state-change'),
  },
};

export const SuccessState: Story = {
  args: {
    label: 'Success State',
    description: 'This field has been validated successfully',
    state: 'success',
    successMessage: 'Valid input - looks good!',
    value: 'Valid content',
    onChange: action('success-state-change'),
  },
};

// Required field
export const RequiredField: Story = {
  args: {
    label: 'Required Field',
    description: 'This field must be filled out',
    required: true,
    placeholder: 'This field is required',
    onChange: action('required-change'),
  },
};

// Disabled field
export const DisabledField: Story = {
  args: {
    label: 'Disabled Field',
    description: 'This field is currently disabled',
    disabled: true,
    value: 'Cannot edit this value',
    onChange: action('disabled-change'),
  },
};

// Real-world examples
export const PensionCalculatorForm: Story = {
  args: { label: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px' }}>
      <FormField
        label="Full Name"
        description="Enter your complete legal name as it appears on official documents"
        type="text"
        placeholder="Juan Carlos Pérez García"
        required
        onChange={action('name-change')}
      />
      
      <FormField
        label="Date of Birth"
        description="Used to calculate your retirement age and contribution period"
        type="date"
        required
        onChange={action('birth-date-change')}
      />
      
      <FormField
        label="Monthly Salary (PEN)"
        description="Enter your gross monthly salary before taxes and deductions"
        type="number"
        placeholder="2,500"
        min="930"
        required
        state="success"
        successMessage="Valid salary amount"
        onChange={action('salary-change')}
      />
      
      <FormField
        label="Years Until Retirement"
        description="Number of years you plan to contribute to the pension fund"
        type="number"
        placeholder="30"
        min="1"
        max="47"
        required
        onChange={action('years-change')}
      />
      
      <FormField
        label="Search Pension Plans"
        description="Find pension plans that match your risk profile and goals"
        variant="search"
        placeholder="Search by fund type, risk level, or returns..."
        onChange={action('search-change')}
      />
      
      <FormField
        label="Additional Information"
        description="Any specific requirements or questions about your retirement planning"
        variant="textarea"
        placeholder="I'm interested in conservative investment options with steady returns..."
        onChange={action('additional-info-change')}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Complete pension calculator form showing various field types and states in a real-world context.',
      },
    },
  },
};

// Validation examples
export const ValidationStates: Story = {
  args: { label: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px' }}>
      <FormField
        label="Valid Email"
        description="Email format validation passed"
        type="email"
        value="user@example.com"
        state="success"
        successMessage="✓ Valid email format"
        onChange={action('valid-email')}
      />
      
      <FormField
        label="Invalid Email"
        description="Email format validation failed"
        type="email"
        value="invalid-email"
        state="error"
        errorMessage="Please enter a valid email address (e.g., user@example.com)"
        onChange={action('invalid-email')}
      />
      
      <FormField
        label="Minimum Salary Check"
        description="Salary must meet minimum requirements"
        type="number"
        value="500"
        state="error"
        errorMessage="Minimum salary in Peru is 930 PEN per month"
        onChange={action('min-salary')}
      />
      
      <FormField
        label="Valid Age Range"
        description="Age validation for pension contributions"
        type="number"
        value="35"
        state="success"
        successMessage="✓ Valid age for pension contributions (18-65)"
        onChange={action('valid-age')}
      />
      
      <FormField
        label="Required Field Empty"
        description="This field cannot be left empty"
        required
        state="error"
        errorMessage="This field is required and must be completed"
        onChange={action('required-empty')}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Examples of different validation states with appropriate error and success messages.',
      },
    },
  },
};

// Size comparison
export const SizeComparison: Story = {
  args: { label: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px' }}>
      <FormField
        label="Small Form Field"
        description="Compact size for limited space contexts"
        inputSize="sm"
        placeholder="Small input size"
        onChange={action('small-size')}
      />
      
      <FormField
        label="Medium Form Field"
        description="Standard size for most use cases (default)"
        inputSize="md"
        placeholder="Medium input size"
        onChange={action('medium-size')}
      />
      
      <FormField
        label="Large Form Field"
        description="Larger size for emphasis or touch interfaces"
        inputSize="lg"
        placeholder="Large input size"
        onChange={action('large-size')}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Comparison of all available form field sizes.',
      },
    },
  },
};

// Accessibility features
export const AccessibilityFeatures: Story = {
  args: { label: '' },
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', width: '400px' }}>
      <FormField
        label="Accessible Form Field"
        description="This field demonstrates proper accessibility features including labels, descriptions, and ARIA attributes"
        placeholder="Fully accessible input"
        required
        aria-describedby="help-text"
        onChange={action('accessible')}
      />
      <div id="help-text" style={{ fontSize: '0.875rem', color: '#666', marginTop: '-1rem' }}>
        Additional help text that provides more context about this field.
      </div>
      
      <FormField
        label="Error with Screen Reader Support"
        description="Errors are announced to screen readers using role='alert'"
        state="error"
        errorMessage="This error message will be announced to screen readers"
        onChange={action('error-sr')}
      />
      
      <FormField
        label="Success with Semantic Meaning"
        description="Success states provide positive feedback"
        state="success"
        successMessage="Success messages help users understand validation status"
        value="Valid input"
        onChange={action('success-sr')}
      />
    </div>
  ),
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        story: 'Examples demonstrating accessibility features including proper labeling, ARIA attributes, and screen reader support.',
      },
    },
  },
};

// Complex form example
export const ComplexFormExample: Story = {
  args: { label: '' },
  render: () => (
    <div style={{ maxWidth: '500px', padding: '2rem', border: '1px solid #e2e8f0', borderRadius: '8px' }}>
      <h2 style={{ marginBottom: '1.5rem', color: '#1a202c' }}>AFP Registration Form</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <FormField
            label="First Name"
            description="Legal first name"
            type="text"
            placeholder="Juan"
            required
            onChange={action('first-name')}
          />
          
          <FormField
            label="Last Name"
            description="Legal last name"
            type="text"
            placeholder="Pérez"
            required
            onChange={action('last-name')}
          />
        </div>
        
        <FormField
          label="National ID (DNI)"
          description="8-digit Peruvian national identification number"
          type="text"
          placeholder="12345678"
          maxLength={8}
          pattern="[0-9]{8}"
          required
          onChange={action('dni')}
        />
        
        <FormField
          label="Current Monthly Salary"
          description="Gross salary before taxes (minimum 930 PEN)"
          type="number"
          placeholder="2,500"
          min="930"
          step="50"
          required
          state="success"
          successMessage="Valid salary amount"
          onChange={action('current-salary')}
        />
        
        <FormField
          label="Preferred Contact Method"
          description="How would you like us to contact you?"
          variant="search"
          placeholder="Email, Phone, SMS..."
          onChange={action('contact-method')}
        />
        
        <FormField
          label="Investment Goals"
          description="Describe your retirement and investment objectives"
          variant="textarea"
          placeholder="I want to build a secure retirement fund with moderate risk..."
          required
          onChange={action('investment-goals')}
        />
        
        <FormField
          label="Marketing Emails"
          description="Receive updates about new pension products"
          type="checkbox"
          onChange={action('marketing-consent')}
        />
      </div>
    </div>
  ),
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        story: 'Complex form example showing multiple FormField components working together in a realistic AFP registration scenario.',
      },
    },
  },
};