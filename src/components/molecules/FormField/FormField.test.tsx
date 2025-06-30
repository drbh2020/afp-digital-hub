import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/context/ui/ThemeContext';
import { composeStories } from '@storybook/react';
import * as FormFieldStories from './FormField.stories';
import { FormField } from './FormField';

// Compose all stories for testing
const { 
  Default,
  TextInput,
  EmailInput,
  SearchField,
  TextareaField,
  SmallField,
  LargeField,
  ErrorState,
  SuccessState,
  RequiredField,
  DisabledField
} = composeStories(FormFieldStories);

// Test wrapper component with theme provider
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('FormField Component', () => {
  describe('Basic Rendering', () => {
    it('renders form field with label and input', () => {
      render(
        <TestWrapper>
          <FormField label="Test Field" />
        </TestWrapper>
      );
      
      expect(screen.getByText('Test Field', { selector: 'label:not([hidden])' })).toBeInTheDocument();
      expect(screen.getByLabelText('Test Field')).toBeInTheDocument();
    });

    it('renders with default props', () => {
      render(
        <TestWrapper>
          <Default />
        </TestWrapper>
      );
      
      expect(screen.getByText('Default Form Field', { selector: 'label:not([hidden])' })).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
    });
  });

  describe('Label and Description', () => {
    it('displays label text', () => {
      render(
        <TestWrapper>
          <FormField label="Custom Label" />
        </TestWrapper>
      );
      
      expect(screen.getByText('Custom Label', { selector: 'label:not([hidden])' })).toBeInTheDocument();
    });

    it('displays description when provided', () => {
      render(
        <TestWrapper>
          <FormField 
            label="Field with Description" 
            description="This is a helpful description" 
          />
        </TestWrapper>
      );
      
      expect(screen.getByText('This is a helpful description')).toBeInTheDocument();
    });

    it('does not render description when not provided', () => {
      render(
        <TestWrapper>
          <FormField label="Field without Description" />
        </TestWrapper>
      );
      
      // Should only have the label, no description
      expect(screen.getByText('Field without Description', { selector: 'label:not([hidden])' })).toBeInTheDocument();
      expect(screen.queryByRole('paragraph')).not.toBeInTheDocument();
    });
  });

  describe('Required Field Indication', () => {
    it('shows required indicator when required is true', () => {
      render(
        <TestWrapper>
          <RequiredField />
        </TestWrapper>
      );
      
      expect(screen.getByText('Required Field', { selector: 'label:not([hidden])' })).toBeInTheDocument();
      expect(screen.getByLabelText('required')).toBeInTheDocument();
      expect(screen.getByText('*')).toBeInTheDocument();
    });

    it('does not show required indicator when required is false', () => {
      render(
        <TestWrapper>
          <FormField label="Optional Field" required={false} />
        </TestWrapper>
      );
      
      expect(screen.getByText('Optional Field', { selector: 'label:not([hidden])' })).toBeInTheDocument();
      expect(screen.queryByText('*')).not.toBeInTheDocument();
    });

    it('passes required prop to input', () => {
      render(
        <TestWrapper>
          <FormField label="Required Input" required />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Required Input');
      expect(input).toBeRequired();
    });
  });

  describe('Input Variants', () => {
    it('renders text input variant', () => {
      render(
        <TestWrapper>
          <TextInput />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Full Name');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renders email input variant', () => {
      render(
        <TestWrapper>
          <EmailInput />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Email Address');
      expect(input).toHaveAttribute('type', 'email');
    });

    it('renders search variant', () => {
      render(
        <TestWrapper>
          <SearchField />
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Search Pension Plans')).toBeInTheDocument();
    });

    it('renders textarea variant', () => {
      render(
        <TestWrapper>
          <TextareaField />
        </TestWrapper>
      );
      
      const textarea = screen.getByLabelText('Additional Notes');
      expect(textarea.tagName.toLowerCase()).toBe('textarea');
    });
  });

  describe('Input Sizes', () => {
    it('renders small size field', () => {
      render(
        <TestWrapper>
          <SmallField />
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Small Field')).toBeInTheDocument();
    });

    it('renders large size field', () => {
      render(
        <TestWrapper>
          <LargeField />
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Large Field')).toBeInTheDocument();
    });
  });

  describe('Validation States', () => {
    it('displays error state with message', () => {
      render(
        <TestWrapper>
          <ErrorState />
        </TestWrapper>
      );
      
      expect(screen.getByText('Error State', { selector: 'label:not([hidden])' })).toBeInTheDocument();
      expect(screen.getByText('This field is required and cannot be empty')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveTextContent('This field is required and cannot be empty');
    });

    it('displays success state with message', () => {
      render(
        <TestWrapper>
          <SuccessState />
        </TestWrapper>
      );
      
      expect(screen.getByText('Success State', { selector: 'label:not([hidden])' })).toBeInTheDocument();
      expect(screen.getByText('Valid input - looks good!')).toBeInTheDocument();
    });

    it('passes validation props to input', () => {
      render(
        <TestWrapper>
          <FormField 
            label="Validation Test"
            state="error"
            errorMessage="Test error"
          />
        </TestWrapper>
      );
      
      expect(screen.getByRole('alert')).toHaveTextContent('Test error');
    });
  });

  describe('Disabled State', () => {
    it('renders disabled field', () => {
      render(
        <TestWrapper>
          <DisabledField />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Disabled Field');
      expect(input).toBeDisabled();
      expect(input).toHaveValue('Cannot edit this value');
    });

    it('passes disabled prop to input', () => {
      render(
        <TestWrapper>
          <FormField label="Test Disabled" disabled />
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Test Disabled')).toBeDisabled();
    });
  });

  describe('User Interactions', () => {
    it('calls onChange when user types', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <TestWrapper>
          <FormField label="Interactive Field" onChange={handleChange} />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Interactive Field');
      await user.type(input, 'test input');
      
      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue('test input');
    });

    it('handles textarea interactions', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <TestWrapper>
          <FormField 
            label="Textarea Field" 
            variant="textarea" 
            onChange={handleChange} 
          />
        </TestWrapper>
      );
      
      const textarea = screen.getByLabelText('Textarea Field');
      await user.type(textarea, 'Multi-line\ntext');
      
      expect(handleChange).toHaveBeenCalled();
      expect(textarea).toHaveValue('Multi-line\ntext');
    });

    it('supports controlled inputs', () => {
      const { rerender } = render(
        <TestWrapper>
          <FormField 
            label="Controlled Field" 
            value="initial" 
            onChange={() => {}} 
          />
        </TestWrapper>
      );
      
      expect(screen.getByDisplayValue('initial')).toBeInTheDocument();
      
      rerender(
        <TestWrapper>
          <FormField 
            label="Controlled Field" 
            value="updated" 
            onChange={() => {}} 
          />
        </TestWrapper>
      );
      
      expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
    });
  });

  describe('Props Forwarding', () => {
    it('forwards input props to underlying input', () => {
      render(
        <TestWrapper>
          <FormField
            label="Test Props"
            type="email"
            placeholder="Enter email"
            maxLength={50}
            data-testid="form-field-input"
          />
        </TestWrapper>
      );
      
      const input = screen.getByTestId('form-field-input');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('placeholder', 'Enter email');
      expect(input).toHaveAttribute('maxLength', '50');
    });

    it('applies container className', () => {
      render(
        <TestWrapper>
          <FormField
            label="Container Class Test"
            containerClassName="custom-container"
          />
        </TestWrapper>
      );
      
      // The container should have the custom class
      const visibleLabel = screen.getByText('Container Class Test', { selector: 'label:not([hidden])' });
      const container = visibleLabel.closest('.custom-container');
      expect(container).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('associates label with input correctly', () => {
      render(
        <TestWrapper>
          <FormField label="Accessible Field" />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Accessible Field');
      expect(input).toBeInTheDocument();
    });

    it('uses custom label but hides it from input', () => {
      render(
        <TestWrapper>
          <FormField label="Custom Label Field" />
        </TestWrapper>
      );
      
      // The FormField should show its own label
      expect(screen.getByText('Custom Label Field', { selector: 'label:not([hidden])' })).toBeInTheDocument();
      
      // The input should still be accessible by the label
      expect(screen.getByLabelText('Custom Label Field')).toBeInTheDocument();
    });

    it('provides proper error messaging', () => {
      render(
        <TestWrapper>
          <FormField 
            label="Error Field" 
            errorMessage="This is an error message" 
          />
        </TestWrapper>
      );
      
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toHaveTextContent('This is an error message');
    });

    it('supports aria-describedby for descriptions', () => {
      render(
        <TestWrapper>
          <FormField 
            label="Described Field" 
            description="Field description"
            id="test-input"
          />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Described Field');
      expect(input).toHaveAttribute('aria-describedby', 'test-input-description');
    });
  });

  describe('Component Integration', () => {
    it('integrates Input and Text components properly', () => {
      render(
        <TestWrapper>
          <FormField
            label="Integration Test"
            description="Testing component integration"
            required
            errorMessage="Integration error"
          />
        </TestWrapper>
      );
      
      // Should have label (Text component)
      expect(screen.getByText('Integration Test', { selector: 'label:not([hidden])' })).toBeInTheDocument();
      
      // Should have description (Text component)
      expect(screen.getByText('Testing component integration')).toBeInTheDocument();
      
      // Should have required indicator
      expect(screen.getByText('*')).toBeInTheDocument();
      
      // Should have input with error
      expect(screen.getByRole('alert')).toHaveTextContent('Integration error');
      
      // Input should be accessible
      expect(screen.getByLabelText('Integration Test')).toBeInTheDocument();
    });
  });

  describe('Story Integration', () => {
    it('renders all story variants without errors', () => {
      const stories = [
        Default, TextInput, EmailInput, SearchField, TextareaField,
        SmallField, LargeField, ErrorState, SuccessState, 
        RequiredField, DisabledField
      ];
      
      stories.forEach((Story) => {
        const { unmount } = render(
          <TestWrapper>
            <Story />
          </TestWrapper>
        );
        
        // Check that each story renders without throwing
        expect(document.body).toBeInTheDocument();
        
        // Clean up for next iteration
        unmount();
      });
    });
  });

  describe('Real-world Usage', () => {
    it('works in form context', async () => {
      const user = userEvent.setup();
      const handleSubmit = vi.fn((e) => e.preventDefault());
      
      render(
        <TestWrapper>
          <form onSubmit={handleSubmit}>
            <FormField
              label="Name"
              description="Enter your full name"
              required
            />
            <FormField
              label="Email"
              description="Your email address"
              type="email"
              required
            />
            <button type="submit">Submit</button>
          </form>
        </TestWrapper>
      );
      
      const nameInput = screen.getByLabelText('Name');
      const emailInput = screen.getByLabelText('Email');
      const submitButton = screen.getByRole('button', { name: 'Submit' });
      
      await user.type(nameInput, 'John Doe');
      await user.type(emailInput, 'john@example.com');
      await user.click(submitButton);
      
      expect(handleSubmit).toHaveBeenCalled();
    });

    it('handles complex validation scenarios', () => {
      const TestValidationForm = () => {
        const [salary, setSalary] = React.useState('');
        const [error, setError] = React.useState('');
        const [success, setSuccess] = React.useState('');
        
        const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const value = e.target.value;
          setSalary(value);
          
          const numValue = parseFloat(value);
          if (value && numValue < 930) {
            setError('Minimum salary in Peru is 930 PEN');
            setSuccess('');
          } else if (value && numValue >= 930) {
            setError('');
            setSuccess('Valid salary amount');
          } else {
            setError('');
            setSuccess('');
          }
        };
        
        return (
          <FormField
            label="Monthly Salary"
            description="Enter your gross monthly salary in PEN"
            type="number"
            value={salary}
            onChange={handleSalaryChange}
            required
            state={error ? 'error' : success ? 'success' : 'default'}
            errorMessage={error}
            successMessage={success}
          />
        );
      };
      
      render(
        <TestWrapper>
          <TestValidationForm />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Monthly Salary');
      
      // Test invalid salary
      fireEvent.change(input, { target: { value: '500' } });
      expect(screen.getByText('Minimum salary in Peru is 930 PEN')).toBeInTheDocument();
      
      // Test valid salary
      fireEvent.change(input, { target: { value: '2500' } });
      expect(screen.getByText('Valid salary amount')).toBeInTheDocument();
      expect(screen.queryByText('Minimum salary in Peru is 930 PEN')).not.toBeInTheDocument();
    });

    it('supports dynamic field configurations', () => {
      const DynamicFormField = ({ fieldType }: { fieldType: 'text' | 'search' | 'textarea' }) => {
        const configs = {
          text: {
            label: 'Text Input',
            description: 'Enter text information',
            placeholder: 'Type here...'
          },
          search: {
            label: 'Search Field',
            description: 'Search for items',
            placeholder: 'Search...',
            variant: 'search' as const
          },
          textarea: {
            label: 'Text Area',
            description: 'Enter detailed information',
            placeholder: 'Type detailed info...',
            variant: 'textarea' as const
          }
        };
        
        const config = configs[fieldType];
        return <FormField {...config} />;
      };
      
      const { rerender } = render(
        <TestWrapper>
          <DynamicFormField fieldType="text" />
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Text Input')).toBeInTheDocument();
      
      rerender(
        <TestWrapper>
          <DynamicFormField fieldType="search" />
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Search Field')).toBeInTheDocument();
      
      rerender(
        <TestWrapper>
          <DynamicFormField fieldType="textarea" />
        </TestWrapper>
      );
      
      const textarea = screen.getByLabelText('Text Area');
      expect(textarea.tagName.toLowerCase()).toBe('textarea');
    });
  });
});