import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import { ThemeProvider } from '@/context/ui/ThemeContext';
import { composeStories } from '@storybook/react';
import * as ButtonStories from './Button.stories';
import { Button } from './Button';

// Compose all stories for testing
const { Default, Primary, Secondary, Ghost, Small, Medium, Large, Enhanced, Disabled } = composeStories(ButtonStories);

// Test wrapper component with theme provider
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Button Component', () => {
  describe('Basic Rendering', () => {
    it('renders button with children', () => {
      render(
        <TestWrapper>
          <Button>Test Button</Button>
        </TestWrapper>
      );
      
      expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
    });

    it('renders with default props', () => {
      render(
        <TestWrapper>
          <Default />
        </TestWrapper>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Default Button');
    });
  });

  describe('Variants', () => {
    it('renders primary variant', () => {
      render(
        <TestWrapper>
          <Primary />
        </TestWrapper>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Primary Button');
    });

    it('renders secondary variant', () => {
      render(
        <TestWrapper>
          <Secondary />
        </TestWrapper>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Secondary Button');
    });

    it('renders ghost variant', () => {
      render(
        <TestWrapper>
          <Ghost />
        </TestWrapper>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeInTheDocument();
      expect(button).toHaveTextContent('Ghost Button');
    });
  });

  describe('Sizes', () => {
    it('renders small size', () => {
      render(
        <TestWrapper>
          <Small />
        </TestWrapper>
      );
      
      expect(screen.getByRole('button')).toHaveTextContent('Small Button');
    });

    it('renders medium size', () => {
      render(
        <TestWrapper>
          <Medium />
        </TestWrapper>
      );
      
      expect(screen.getByRole('button')).toHaveTextContent('Medium Button');
    });

    it('renders large size', () => {
      render(
        <TestWrapper>
          <Large />
        </TestWrapper>
      );
      
      expect(screen.getByRole('button')).toHaveTextContent('Large Button');
    });
  });

  describe('States', () => {
    it('renders enhanced button', () => {
      render(
        <TestWrapper>
          <Enhanced />
        </TestWrapper>
      );
      
      expect(screen.getByRole('button')).toHaveTextContent('Enhanced Button');
    });

    it('renders disabled button', () => {
      render(
        <TestWrapper>
          <Disabled />
        </TestWrapper>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      expect(button).toHaveTextContent('Disabled Button');
    });
  });

  describe('Interactions', () => {
    it('calls onClick when clicked', () => {
      const handleClick = vi.fn();
      
      render(
        <TestWrapper>
          <Button onClick={handleClick}>Click Me</Button>
        </TestWrapper>
      );
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('does not call onClick when disabled', () => {
      const handleClick = vi.fn();
      
      render(
        <TestWrapper>
          <Button disabled onClick={handleClick}>Disabled Button</Button>
        </TestWrapper>
      );
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleClick).not.toHaveBeenCalled();
    });

    it('supports keyboard interaction', () => {
      render(
        <TestWrapper>
          <Button>Keyboard Button</Button>
        </TestWrapper>
      );
      
      const button = screen.getByRole('button');
      
      // Test that button is focusable
      button.focus();
      expect(button).toHaveFocus();
      
      // Test that it can receive keyboard events
      fireEvent.keyDown(button, { key: 'Enter' });
      expect(button).toBeInTheDocument();
    });
  });

  describe('Props', () => {
    it('forwards HTML button props', () => {
      render(
        <TestWrapper>
          <Button 
            type="submit" 
            form="test-form" 
            data-testid="custom-button"
            aria-label="Custom button"
          >
            Submit
          </Button>
        </TestWrapper>
      );
      
      const button = screen.getByTestId('custom-button');
      expect(button).toHaveAttribute('type', 'submit');
      expect(button).toHaveAttribute('form', 'test-form');
      expect(button).toHaveAttribute('aria-label', 'Custom button');
    });

    it('accepts custom className', () => {
      render(
        <TestWrapper>
          <Button className="custom-class">Custom Button</Button>
        </TestWrapper>
      );
      
      const button = screen.getByRole('button');
      expect(button).toHaveClass('custom-class');
    });
  });

  describe('Accessibility', () => {
    it('has proper role', () => {
      render(
        <TestWrapper>
          <Button>Accessible Button</Button>
        </TestWrapper>
      );
      
      expect(screen.getByRole('button')).toBeInTheDocument();
    });

    it('supports aria-label', () => {
      render(
        <TestWrapper>
          <Button aria-label="Close dialog">×</Button>
        </TestWrapper>
      );
      
      expect(screen.getByLabelText('Close dialog')).toBeInTheDocument();
    });

    it('is focusable when not disabled', () => {
      render(
        <TestWrapper>
          <Button>Focusable Button</Button>
        </TestWrapper>
      );
      
      const button = screen.getByRole('button');
      button.focus();
      expect(button).toHaveFocus();
    });

    it('is not focusable when disabled', () => {
      render(
        <TestWrapper>
          <Button disabled>Disabled Button</Button>
        </TestWrapper>
      );
      
      const button = screen.getByRole('button');
      expect(button).toBeDisabled();
      // Disabled buttons should not be focusable
      button.focus();
      expect(button).not.toHaveFocus();
    });
  });

  describe('Story Integration', () => {
    it('renders all story variants without errors', () => {
      const stories = [Default, Primary, Secondary, Ghost, Small, Medium, Large, Enhanced, Disabled];
      
      stories.forEach((Story) => {
        const { unmount } = render(
          <TestWrapper>
            <Story />
          </TestWrapper>
        );
        
        // Check that each story renders without throwing
        expect(screen.getByRole('button')).toBeInTheDocument();
        
        // Clean up for next iteration
        unmount();
      });
    });
  });

  describe('Real-world Usage', () => {
    it('works in form context', () => {
      const handleSubmit = vi.fn((e) => e.preventDefault());
      
      render(
        <TestWrapper>
          <form onSubmit={handleSubmit}>
            <Button type="submit">Submit Form</Button>
          </form>
        </TestWrapper>
      );
      
      const button = screen.getByRole('button');
      fireEvent.click(button);
      
      expect(handleSubmit).toHaveBeenCalledTimes(1);
    });

    it('handles loading state', () => {
      const { rerender } = render(
        <TestWrapper>
          <Button disabled>⏳ Loading...</Button>
        </TestWrapper>
      );
      
      expect(screen.getByRole('button')).toBeDisabled();
      expect(screen.getByText('⏳ Loading...')).toBeInTheDocument();
      
      // Simulate loading complete
      rerender(
        <TestWrapper>
          <Button>✅ Complete</Button>
        </TestWrapper>
      );
      
      expect(screen.getByRole('button')).not.toBeDisabled();
      expect(screen.getByText('✅ Complete')).toBeInTheDocument();
    });
  });
});