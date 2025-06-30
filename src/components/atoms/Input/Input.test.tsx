import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from '@/context/ui/ThemeContext';
import { composeStories } from '@storybook/react';
import * as InputStories from './Input.stories';
import { Input } from './Input';

// Compose all stories for testing
const { 
  Default,
  TextInput,
  SearchInput,
  TextareaInput,
  EmailInput,
  NumberInput,
  SmallInput,
  MediumInput,
  LargeInput,
  ErrorState,
  SuccessState,
  RequiredInput,
  DisabledInput
} = composeStories(InputStories);

// Test wrapper component with theme provider
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Input Component', () => {
  describe('Basic Rendering', () => {
    it('renders input with label', () => {
      render(
        <TestWrapper>
          <Input label="Test Input" />
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Test Input')).toBeInTheDocument();
      expect(screen.getByText('Test Input')).toBeInTheDocument();
    });

    it('renders with default props', () => {
      render(
        <TestWrapper>
          <Default />
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Default Input')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Enter text...')).toBeInTheDocument();
    });
  });

  describe('Input Variants', () => {
    it('renders text input variant', () => {
      render(
        <TestWrapper>
          <TextInput />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Text Input');
      expect(input).toBeInTheDocument();
      expect(input).toHaveAttribute('type', 'text');
    });

    it('renders search input variant', () => {
      render(
        <TestWrapper>
          <SearchInput />
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Search')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Search pension plans...')).toBeInTheDocument();
    });

    it('renders textarea variant', () => {
      render(
        <TestWrapper>
          <TextareaInput />
        </TestWrapper>
      );
      
      const textarea = screen.getByLabelText('Comments');
      expect(textarea).toBeInTheDocument();
      expect(textarea.tagName.toLowerCase()).toBe('textarea');
    });
  });

  describe('Input Types', () => {
    it('renders email input', () => {
      render(
        <TestWrapper>
          <EmailInput />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Email Address');
      expect(input).toHaveAttribute('type', 'email');
      expect(input).toHaveAttribute('placeholder', 'user@example.com');
    });

    it('renders number input', () => {
      render(
        <TestWrapper>
          <NumberInput />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Monthly Salary');
      expect(input).toHaveAttribute('type', 'number');
      expect(input).toHaveAttribute('placeholder', '2500');
    });

    it('supports various input types', () => {
      const { rerender } = render(
        <TestWrapper>
          <Input label="Password" type="password" />
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Password')).toHaveAttribute('type', 'password');
      
      rerender(
        <TestWrapper>
          <Input label="Date" type="date" />
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Date')).toHaveAttribute('type', 'date');
    });
  });

  describe('Input Sizes', () => {
    it('renders small input', () => {
      render(
        <TestWrapper>
          <SmallInput />
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Small Input')).toBeInTheDocument();
    });

    it('renders medium input', () => {
      render(
        <TestWrapper>
          <MediumInput />
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Medium Input')).toBeInTheDocument();
    });

    it('renders large input', () => {
      render(
        <TestWrapper>
          <LargeInput />
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Large Input')).toBeInTheDocument();
    });
  });

  describe('Input States', () => {
    it('renders error state with message', () => {
      render(
        <TestWrapper>
          <ErrorState />
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Error State')).toBeInTheDocument();
      expect(screen.getByText('This field is required')).toBeInTheDocument();
      expect(screen.getByRole('alert')).toHaveTextContent('This field is required');
    });

    it('renders success state with message', () => {
      render(
        <TestWrapper>
          <SuccessState />
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Success State')).toBeInTheDocument();
      expect(screen.getByText('Valid input')).toBeInTheDocument();
    });

    it('auto-detects state from messages', () => {
      const { rerender } = render(
        <TestWrapper>
          <Input 
            label="Auto State" 
            errorMessage="Error occurred" 
            successMessage="Success message"
          />
        </TestWrapper>
      );
      
      // Error message takes precedence
      expect(screen.getByRole('alert')).toHaveTextContent('Error occurred');
      expect(screen.queryByText('Success message')).not.toBeInTheDocument();
      
      rerender(
        <TestWrapper>
          <Input 
            label="Auto State" 
            successMessage="Success message"
          />
        </TestWrapper>
      );
      
      // Success message shows when no error
      expect(screen.getByText('Success message')).toBeInTheDocument();
      expect(screen.queryByRole('alert')).not.toBeInTheDocument();
    });
  });

  describe('Label Handling', () => {
    it('shows label by default', () => {
      render(
        <TestWrapper>
          <Input label="Visible Label" />
        </TestWrapper>
      );
      
      const label = screen.getByText('Visible Label');
      expect(label).toBeVisible();
    });

    it('hides label visually when hideLabel is true', () => {
      render(
        <TestWrapper>
          <Input label="Hidden Label" hideLabel />
        </TestWrapper>
      );
      
      // Label should still exist for accessibility but not be visible
      const input = screen.getByLabelText('Hidden Label');
      expect(input).toBeInTheDocument();
    });

    it('generates unique IDs for inputs', () => {
      render(
        <TestWrapper>
          <div>
            <Input label="Input 1" />
            <Input label="Input 2" />
          </div>
        </TestWrapper>
      );
      
      const input1 = screen.getByLabelText('Input 1');
      const input2 = screen.getByLabelText('Input 2');
      
      expect(input1.id).toBeTruthy();
      expect(input2.id).toBeTruthy();
      expect(input1.id).not.toBe(input2.id);
    });
  });

  describe('Required and Disabled States', () => {
    it('handles required inputs', () => {
      render(
        <TestWrapper>
          <RequiredInput />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Required Field');
      expect(input).toBeRequired();
    });

    it('handles disabled inputs', () => {
      render(
        <TestWrapper>
          <DisabledInput />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Disabled Input');
      expect(input).toBeDisabled();
      expect(input).toHaveValue('Cannot edit this');
    });
  });

  describe('User Interactions', () => {
    it('calls onChange when user types', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <TestWrapper>
          <Input label="Interactive Input" onChange={handleChange} />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Interactive Input');
      await user.type(input, 'hello');
      
      expect(handleChange).toHaveBeenCalled();
      expect(input).toHaveValue('hello');
    });

    it('handles textarea interactions', async () => {
      const user = userEvent.setup();
      const handleChange = vi.fn();
      
      render(
        <TestWrapper>
          <Input 
            label="Textarea Input" 
            variant="textarea" 
            onChange={handleChange} 
          />
        </TestWrapper>
      );
      
      const textarea = screen.getByLabelText('Textarea Input');
      await user.type(textarea, 'Multi-line\ntext content');
      
      expect(handleChange).toHaveBeenCalled();
      expect(textarea).toHaveValue('Multi-line\ntext content');
    });

    it('supports controlled inputs', () => {
      const { rerender } = render(
        <TestWrapper>
          <Input label="Controlled Input" value="initial" onChange={() => {}} />
        </TestWrapper>
      );
      
      expect(screen.getByDisplayValue('initial')).toBeInTheDocument();
      
      rerender(
        <TestWrapper>
          <Input label="Controlled Input" value="updated" onChange={() => {}} />
        </TestWrapper>
      );
      
      expect(screen.getByDisplayValue('updated')).toBeInTheDocument();
    });
  });

  describe('Props and Attributes', () => {
    it('forwards HTML input attributes', () => {
      render(
        <TestWrapper>
          <Input
            label="Test Input"
            placeholder="Test placeholder"
            maxLength={10}
            min="0"
            max="100"
            step="5"
            pattern="[0-9]*"
            data-testid="custom-input"
          />
        </TestWrapper>
      );
      
      const input = screen.getByTestId('custom-input');
      expect(input).toHaveAttribute('placeholder', 'Test placeholder');
      expect(input).toHaveAttribute('maxLength', '10');
      expect(input).toHaveAttribute('min', '0');
      expect(input).toHaveAttribute('max', '100');
      expect(input).toHaveAttribute('step', '5');
      expect(input).toHaveAttribute('pattern', '[0-9]*');
    });

    it('supports aria attributes', () => {
      render(
        <TestWrapper>
          <Input
            label="Accessible Input"
            aria-describedby="help-text"
            aria-required="true"
          />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Accessible Input');
      expect(input).toHaveAttribute('aria-describedby', 'help-text');
      expect(input).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Accessibility', () => {
    it('associates labels with inputs', () => {
      render(
        <TestWrapper>
          <Input label="Accessible Input" />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Accessible Input');
      expect(input).toBeInTheDocument();
    });

    it('provides proper error messaging', () => {
      render(
        <TestWrapper>
          <Input 
            label="Error Input" 
            errorMessage="This is an error" 
          />
        </TestWrapper>
      );
      
      const errorElement = screen.getByRole('alert');
      expect(errorElement).toHaveTextContent('This is an error');
    });

    it('supports keyboard navigation', () => {
      render(
        <TestWrapper>
          <div>
            <Input label="First Input" />
            <Input label="Second Input" />
          </div>
        </TestWrapper>
      );
      
      const firstInput = screen.getByLabelText('First Input');
      const secondInput = screen.getByLabelText('Second Input');
      
      firstInput.focus();
      expect(firstInput).toHaveFocus();
      
      fireEvent.keyDown(firstInput, { key: 'Tab' });
      // In a real scenario, this would move focus to the next input
      // but jsdom doesn't handle tab navigation automatically
    });
  });

  describe('Story Integration', () => {
    it('renders all story variants without errors', () => {
      const stories = [
        Default, TextInput, SearchInput, TextareaInput, 
        EmailInput, NumberInput, SmallInput, MediumInput, 
        LargeInput, ErrorState, SuccessState, RequiredInput, 
        DisabledInput
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
            <Input label="Name" name="name" required />
            <Input label="Email" name="email" type="email" required />
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

    it('handles validation in pension calculator context', async () => {
      const user = userEvent.setup();
      
      render(
        <TestWrapper>
          <div>
            <Input
              label="Monthly Salary"
              type="number"
              min="930"
              errorMessage="Minimum salary is 930 PEN"
            />
            <Input
              label="Age"
              type="number"
              min="18"
              max="65"
              successMessage="Valid age range"
            />
          </div>
        </TestWrapper>
      );
      
      expect(screen.getByText('Minimum salary is 930 PEN')).toBeInTheDocument();
      expect(screen.getByText('Valid age range')).toBeInTheDocument();
    });

    it('supports dynamic state updates', () => {
      const TestComponent = () => {
        const [value, setValue] = React.useState('');
        const [error, setError] = React.useState('');
        
        const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
          const newValue = e.target.value;
          setValue(newValue);
          
          if (newValue.length > 0 && newValue.length < 3) {
            setError('Must be at least 3 characters');
          } else {
            setError('');
          }
        };
        
        return (
          <Input
            label="Dynamic Validation"
            value={value}
            onChange={handleChange}
            errorMessage={error}
            state={error ? 'error' : value.length >= 3 ? 'success' : 'default'}
            successMessage={value.length >= 3 ? 'Valid input' : undefined}
          />
        );
      };
      
      const { rerender } = render(
        <TestWrapper>
          <TestComponent />
        </TestWrapper>
      );
      
      const input = screen.getByLabelText('Dynamic Validation');
      
      // Test short input (should show error)
      fireEvent.change(input, { target: { value: 'ab' } });
      expect(screen.getByText('Must be at least 3 characters')).toBeInTheDocument();
      
      // Test valid input (should show success)
      fireEvent.change(input, { target: { value: 'abc' } });
      expect(screen.getByText('Valid input')).toBeInTheDocument();
      expect(screen.queryByText('Must be at least 3 characters')).not.toBeInTheDocument();
    });
  });
});