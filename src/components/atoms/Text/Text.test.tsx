import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/context/ui/ThemeContext';
import { composeStories } from '@storybook/react';
import * as TextStories from './Text.stories';
import { Text } from './Text';

// Compose all stories for testing
const { 
  Default, 
  Heading1, 
  Heading2, 
  Body, 
  Lead, 
  Caption, 
  Code, 
  LinkPrimary,
  TextCenter,
  Truncated,
  LineClamp,
  Uppercase,
  NoWrap,
  Label,
  Strong
} = composeStories(TextStories);

// Test wrapper component with theme provider
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Text Component', () => {
  describe('Basic Rendering', () => {
    it('renders text with children', () => {
      render(
        <TestWrapper>
          <Text>Test Text</Text>
        </TestWrapper>
      );
      
      expect(screen.getByText('Test Text')).toBeInTheDocument();
    });

    it('renders with default props', () => {
      render(
        <TestWrapper>
          <Default />
        </TestWrapper>
      );
      
      expect(screen.getByText('This is default text using the body variant.')).toBeInTheDocument();
    });
  });

  describe('HTML Elements', () => {
    it('renders as different HTML elements', () => {
      const { rerender } = render(
        <TestWrapper>
          <Text as="h1">Heading</Text>
        </TestWrapper>
      );
      
      expect(screen.getByRole('heading', { level: 1 })).toBeInTheDocument();
      
      rerender(
        <TestWrapper>
          <Text as="p">Paragraph</Text>
        </TestWrapper>
      );
      
      expect(screen.getByText('Paragraph')).toBeInTheDocument();
      
      rerender(
        <TestWrapper>
          <Text as="label">Label</Text>
        </TestWrapper>
      );
      
      expect(screen.getByText('Label')).toBeInTheDocument();
    });

    it('renders semantic HTML elements correctly', () => {
      render(
        <TestWrapper>
          <Label />
        </TestWrapper>
      );
      
      const labelElement = screen.getByText('Form Field Label');
      expect(labelElement.tagName.toLowerCase()).toBe('label');
    });

    it('renders strong element correctly', () => {
      render(
        <TestWrapper>
          <Strong />
        </TestWrapper>
      );
      
      const strongElement = screen.getByText('Important text that should be bold');
      expect(strongElement.tagName.toLowerCase()).toBe('strong');
    });
  });

  describe('Typography Variants', () => {
    it('renders heading variants', () => {
      render(
        <TestWrapper>
          <Heading1 />
        </TestWrapper>
      );
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('AFP Pension Calculator');
    });

    it('renders body text variants', () => {
      render(
        <TestWrapper>
          <Body />
        </TestWrapper>
      );
      
      expect(screen.getByText(/This is regular body text/)).toBeInTheDocument();
    });

    it('renders lead text', () => {
      render(
        <TestWrapper>
          <Lead />
        </TestWrapper>
      );
      
      expect(screen.getByText(/This is lead text/)).toBeInTheDocument();
    });

    it('renders caption text', () => {
      render(
        <TestWrapper>
          <Caption />
        </TestWrapper>
      );
      
      expect(screen.getByText('This is caption text for small labels, metadata, or fine print.')).toBeInTheDocument();
    });

    it('renders code text', () => {
      render(
        <TestWrapper>
          <Code />
        </TestWrapper>
      );
      
      const codeElement = screen.getByText('const pension = calculatePension(salary, years);');
      expect(codeElement.tagName.toLowerCase()).toBe('code');
    });

    it('renders link variants', () => {
      render(
        <TestWrapper>
          <LinkPrimary />
        </TestWrapper>
      );
      
      const linkElement = screen.getByText('Primary link style');
      expect(linkElement.tagName.toLowerCase()).toBe('a');
      expect(linkElement).toHaveAttribute('href', '#');
    });
  });

  describe('Text Alignment', () => {
    it('applies text alignment', () => {
      render(
        <TestWrapper>
          <TextCenter />
        </TestWrapper>
      );
      
      expect(screen.getByText('This text is center aligned.')).toBeInTheDocument();
    });

    it('handles different alignments', () => {
      const { rerender } = render(
        <TestWrapper>
          <Text align="left">Left aligned</Text>
        </TestWrapper>
      );
      
      expect(screen.getByText('Left aligned')).toBeInTheDocument();
      
      rerender(
        <TestWrapper>
          <Text align="right">Right aligned</Text>
        </TestWrapper>
      );
      
      expect(screen.getByText('Right aligned')).toBeInTheDocument();
    });
  });

  describe('Text Utilities', () => {
    it('handles truncation', () => {
      render(
        <TestWrapper>
          <Truncated />
        </TestWrapper>
      );
      
      expect(screen.getByText(/This is a very long text that will be truncated/)).toBeInTheDocument();
    });

    it('handles line clamping', () => {
      render(
        <TestWrapper>
          <LineClamp />
        </TestWrapper>
      );
      
      expect(screen.getByText(/This is a longer piece of text that will be clamped/)).toBeInTheDocument();
    });

    it('handles uppercase transformation', () => {
      render(
        <TestWrapper>
          <Uppercase />
        </TestWrapper>
      );
      
      expect(screen.getByText('This text will be transformed to uppercase')).toBeInTheDocument();
    });

    it('handles no wrap', () => {
      render(
        <TestWrapper>
          <NoWrap />
        </TestWrapper>
      );
      
      expect(screen.getByText(/This text will not wrap even in a narrow container/)).toBeInTheDocument();
    });
  });

  describe('Polymorphic Props and Attributes', () => {
    it('forwards HTML attributes', () => {
      render(
        <TestWrapper>
          <Text 
            data-testid="custom-text"
            aria-label="Custom label"
            className="custom-class"
          >
            Custom Text
          </Text>
        </TestWrapper>
      );
      
      const textElement = screen.getByTestId('custom-text');
      expect(textElement).toHaveAttribute('aria-label', 'Custom label');
      expect(textElement).toHaveClass('custom-class');
    });

    it('supports form-related attributes for labels', () => {
      render(
        <TestWrapper>
          <Text as="label" htmlFor="test-input">
            Test Label
          </Text>
        </TestWrapper>
      );
      
      const labelElement = screen.getByText('Test Label');
      expect(labelElement).toHaveAttribute('for', 'test-input');
    });

    it('supports link attributes', () => {
      render(
        <TestWrapper>
          <Text 
            as="a" 
            href="https://example.com" 
            target="_blank"
            rel="noopener noreferrer"
          >
            External Link
          </Text>
        </TestWrapper>
      );
      
      const linkElement = screen.getByText('External Link');
      expect(linkElement).toHaveAttribute('href', 'https://example.com');
      expect(linkElement).toHaveAttribute('target', '_blank');
      expect(linkElement).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('supports button attributes', () => {
      render(
        <TestWrapper>
          <Text 
            as="button" 
            type="submit"
            disabled
          >
            Button Text
          </Text>
        </TestWrapper>
      );
      
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toHaveAttribute('type', 'submit');
      expect(buttonElement).toBeDisabled();
    });
  });

  describe('Accessibility', () => {
    it('renders headings with proper hierarchy', () => {
      render(
        <TestWrapper>
          <div>
            <Text as="h1" variant="h1">Main Title</Text>
            <Text as="h2" variant="h2">Section Title</Text>
            <Text as="h3" variant="h3">Subsection Title</Text>
          </div>
        </TestWrapper>
      );
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Main Title');
      expect(screen.getByRole('heading', { level: 2 })).toHaveTextContent('Section Title');
      expect(screen.getByRole('heading', { level: 3 })).toHaveTextContent('Subsection Title');
    });

    it('supports aria attributes', () => {
      render(
        <TestWrapper>
          <Text aria-describedby="help-text" aria-required="true">
            Required Field
          </Text>
        </TestWrapper>
      );
      
      const textElement = screen.getByText('Required Field');
      expect(textElement).toHaveAttribute('aria-describedby', 'help-text');
      expect(textElement).toHaveAttribute('aria-required', 'true');
    });
  });

  describe('Story Integration', () => {
    it('renders all story variants without errors', () => {
      const stories = [
        Default, Heading1, Heading2, Body, Lead, Caption, Code, 
        LinkPrimary, TextCenter, Truncated, LineClamp, Uppercase, 
        NoWrap, Label, Strong
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
    it('works in form context', () => {
      render(
        <TestWrapper>
          <form>
            <Text as="label" htmlFor="email">Email Address</Text>
            <input id="email" type="email" />
            <Text as="small" variant="caption">We'll never share your email</Text>
          </form>
        </TestWrapper>
      );
      
      expect(screen.getByText('Email Address')).toBeInTheDocument();
      expect(screen.getByText("We'll never share your email")).toBeInTheDocument();
    });

    it('works in content hierarchy', () => {
      render(
        <TestWrapper>
          <article>
            <Text as="h1" variant="h1">Article Title</Text>
            <Text as="p" variant="lead">Article introduction paragraph</Text>
            <Text as="p" variant="body">Regular content paragraph</Text>
            <Text as="p" variant="bodySmall">Secondary information</Text>
          </article>
        </TestWrapper>
      );
      
      expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent('Article Title');
      expect(screen.getByText('Article introduction paragraph')).toBeInTheDocument();
      expect(screen.getByText('Regular content paragraph')).toBeInTheDocument();
      expect(screen.getByText('Secondary information')).toBeInTheDocument();
    });

    it('handles mixed content', () => {
      render(
        <TestWrapper>
          <Text as="p" variant="body">
            This paragraph contains{' '}
            <Text as="strong" variant="body">bold text</Text>
            {' '}and{' '}
            <Text as="em" variant="body">italic text</Text>
            {' '}as well as{' '}
            <Text as="code" variant="code">inline code</Text>.
          </Text>
        </TestWrapper>
      );
      
      expect(screen.getByText('bold text')).toBeInTheDocument();
      expect(screen.getByText('italic text')).toBeInTheDocument();
      expect(screen.getByText('inline code')).toBeInTheDocument();
    });

    it('works as interactive elements', () => {
      const handleClick = vi.fn();
      
      render(
        <TestWrapper>
          <Text as="button" onClick={handleClick}>
            Clickable Text
          </Text>
        </TestWrapper>
      );
      
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeInTheDocument();
      
      buttonElement.click();
      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });
});