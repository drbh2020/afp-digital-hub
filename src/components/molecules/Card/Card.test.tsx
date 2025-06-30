import React from 'react';
import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from '@/context/ui/ThemeContext';
import { composeStories } from '@storybook/react';
import * as CardStories from './Card.stories';
import { Card } from './Card';

// Compose all stories for testing
const { 
  Default,
  Base,
  Elevated,
  Compact,
  Interactive,
  Bordered,
  Success,
  Warning,
  Error,
  Info,
  Critical,
  Lazy
} = composeStories(CardStories);

// Test wrapper component with theme provider
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider>{children}</ThemeProvider>
);

describe('Card Component', () => {
  describe('Basic Rendering', () => {
    it('renders card with children', () => {
      render(
        <TestWrapper>
          <Card>Test Card Content</Card>
        </TestWrapper>
      );
      
      expect(screen.getByText('Test Card Content')).toBeInTheDocument();
    });

    it('renders with default props', () => {
      render(
        <TestWrapper>
          <Default />
        </TestWrapper>
      );
      
      expect(screen.getByText('This is a default card with basic styling and layout.')).toBeInTheDocument();
    });
  });

  describe('Variant Styles', () => {
    it('renders base variant', () => {
      render(
        <TestWrapper>
          <Base />
        </TestWrapper>
      );
      
      expect(screen.getByText('Base card variant with standard styling and subtle shadow.')).toBeInTheDocument();
    });

    it('renders elevated variant', () => {
      render(
        <TestWrapper>
          <Elevated />
        </TestWrapper>
      );
      
      expect(screen.getByText('Elevated card with enhanced shadow and hover effects for interactive content.')).toBeInTheDocument();
    });

    it('renders compact variant', () => {
      render(
        <TestWrapper>
          <Compact />
        </TestWrapper>
      );
      
      expect(screen.getByText('Compact card with reduced padding for space-efficient layouts.')).toBeInTheDocument();
    });

    it('renders interactive variant', () => {
      render(
        <TestWrapper>
          <Interactive />
        </TestWrapper>
      );
      
      expect(screen.getByText('Interactive card with hover states and cursor pointer for clickable content.')).toBeInTheDocument();
    });

    it('renders bordered variant', () => {
      render(
        <TestWrapper>
          <Bordered />
        </TestWrapper>
      );
      
      expect(screen.getByText('Bordered card with prominent border and subtle background.')).toBeInTheDocument();
    });
  });

  describe('Semantic Variants', () => {
    it('renders success semantic variant', () => {
      render(
        <TestWrapper>
          <Success />
        </TestWrapper>
      );
      
      expect(screen.getByText(/Success! Your pension calculation has been completed successfully/)).toBeInTheDocument();
    });

    it('renders warning semantic variant', () => {
      render(
        <TestWrapper>
          <Warning />
        </TestWrapper>
      );
      
      expect(screen.getByText(/Warning: Your current contributions may not meet/)).toBeInTheDocument();
    });

    it('renders error semantic variant', () => {
      render(
        <TestWrapper>
          <Error />
        </TestWrapper>
      );
      
      expect(screen.getByText(/Error: Unable to process your pension calculation/)).toBeInTheDocument();
    });

    it('renders info semantic variant', () => {
      render(
        <TestWrapper>
          <Info />
        </TestWrapper>
      );
      
      expect(screen.getByText(/Information: Pension calculations are estimates/)).toBeInTheDocument();
    });
  });

  describe('Performance Variants', () => {
    it('renders critical performance variant', () => {
      render(
        <TestWrapper>
          <Critical />
        </TestWrapper>
      );
      
      expect(screen.getByText(/Critical performance card - optimized for above-the-fold/)).toBeInTheDocument();
    });

    it('renders lazy performance variant', () => {
      render(
        <TestWrapper>
          <Lazy />
        </TestWrapper>
      );
      
      expect(screen.getByText(/Lazy performance card - optimized for below-the-fold/)).toBeInTheDocument();
    });
  });

  describe('Combined Variants', () => {
    it('supports combining variant and semantic props', () => {
      render(
        <TestWrapper>
          <Card variant="elevated" semantic="success">
            Combined variant and semantic styling
          </Card>
        </TestWrapper>
      );
      
      expect(screen.getByText('Combined variant and semantic styling')).toBeInTheDocument();
    });

    it('supports all prop combinations', () => {
      render(
        <TestWrapper>
          <Card 
            variant="bordered" 
            semantic="warning" 
            performance="critical"
          >
            All props combined
          </Card>
        </TestWrapper>
      );
      
      expect(screen.getByText('All props combined')).toBeInTheDocument();
    });
  });

  describe('Props and Attributes', () => {
    it('forwards HTML attributes', () => {
      render(
        <TestWrapper>
          <Card
            data-testid="custom-card"
            className="custom-class"
            role="article"
            aria-label="Custom card"
          >
            Card with attributes
          </Card>
        </TestWrapper>
      );
      
      const card = screen.getByTestId('custom-card');
      expect(card).toHaveClass('custom-class');
      expect(card).toHaveAttribute('role', 'article');
      expect(card).toHaveAttribute('aria-label', 'Custom card');
    });

    it('supports click handlers', () => {
      const handleClick = vi.fn();
      
      render(
        <TestWrapper>
          <Card onClick={handleClick}>
            Clickable Card
          </Card>
        </TestWrapper>
      );
      
      const card = screen.getByText('Clickable Card');
      card.click();
      
      expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('supports custom styling props', () => {
      render(
        <TestWrapper>
          <Card style={{ backgroundColor: 'red', border: '2px solid blue' }}>
            Custom styled card
          </Card>
        </TestWrapper>
      );
      
      const card = screen.getByText('Custom styled card');
      expect(card).toHaveStyle('background-color: rgb(255, 0, 0)');
      expect(card).toHaveStyle('border: 2px solid blue');
    });
  });

  describe('Content Handling', () => {
    it('renders text content', () => {
      render(
        <TestWrapper>
          <Card>Simple text content</Card>
        </TestWrapper>
      );
      
      expect(screen.getByText('Simple text content')).toBeInTheDocument();
    });

    it('renders complex JSX content', () => {
      render(
        <TestWrapper>
          <Card>
            <h3>Card Title</h3>
            <p>Card description with multiple elements</p>
            <button>Action Button</button>
          </Card>
        </TestWrapper>
      );
      
      expect(screen.getByText('Card Title')).toBeInTheDocument();
      expect(screen.getByText('Card description with multiple elements')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: 'Action Button' })).toBeInTheDocument();
    });

    it('handles empty content gracefully', () => {
      render(
        <TestWrapper>
          <Card />
        </TestWrapper>
      );
      
      // Card should render even without content
      const card = document.querySelector('div');
      expect(card).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('supports semantic roles', () => {
      render(
        <TestWrapper>
          <Card role="article" aria-labelledby="card-title">
            <h3 id="card-title">Accessible Card</h3>
            <p>Content with proper labeling</p>
          </Card>
        </TestWrapper>
      );
      
      const card = screen.getByRole('article');
      expect(card).toHaveAttribute('aria-labelledby', 'card-title');
    });

    it('supports keyboard navigation when interactive', () => {
      render(
        <TestWrapper>
          <Card tabIndex={0} variant="interactive">
            Keyboard navigable card
          </Card>
        </TestWrapper>
      );
      
      const card = screen.getByText('Keyboard navigable card');
      expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('supports ARIA live regions for dynamic content', () => {
      render(
        <TestWrapper>
          <Card 
            role="alert" 
            aria-live="polite"
            semantic="error"
          >
            Error message for screen readers
          </Card>
        </TestWrapper>
      );
      
      const card = screen.getByRole('alert');
      expect(card).toHaveAttribute('aria-live', 'polite');
    });
  });

  describe('Story Integration', () => {
    it('renders all story variants without errors', () => {
      const stories = [
        Default, Base, Elevated, Compact, Interactive, Bordered,
        Success, Warning, Error, Info, Critical, Lazy
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
    it('works as a pension summary display', () => {
      render(
        <TestWrapper>
          <Card variant="elevated">
            <h3>Pension Summary</h3>
            <div>Current Balance: S/. 125,450</div>
            <div>Monthly Contribution: S/. 850</div>
            <div>Projected Monthly Pension: S/. 2,100</div>
          </Card>
        </TestWrapper>
      );
      
      expect(screen.getByText('Pension Summary')).toBeInTheDocument();
      expect(screen.getByText('Current Balance: S/. 125,450')).toBeInTheDocument();
      expect(screen.getByText('Monthly Contribution: S/. 850')).toBeInTheDocument();
      expect(screen.getByText('Projected Monthly Pension: S/. 2,100')).toBeInTheDocument();
    });

    it('handles notification cards', () => {
      const notifications = [
        { type: 'success', message: 'Payment processed successfully' },
        { type: 'warning', message: 'Contribution deadline approaching' },
        { type: 'error', message: 'Payment failed - please try again' },
        { type: 'info', message: 'New investment options available' }
      ];
      
      render(
        <TestWrapper>
          <div>
            {notifications.map((notification, index) => (
              <Card 
                key={index}
                semantic={notification.type as any}
                variant="bordered"
                role={notification.type === 'error' ? 'alert' : undefined}
              >
                {notification.message}
              </Card>
            ))}
          </div>
        </TestWrapper>
      );
      
      expect(screen.getByText('Payment processed successfully')).toBeInTheDocument();
      expect(screen.getByText('Contribution deadline approaching')).toBeInTheDocument();
      expect(screen.getByText('Payment failed - please try again')).toBeInTheDocument();
      expect(screen.getByText('New investment options available')).toBeInTheDocument();
      
      // Error notification should have alert role
      expect(screen.getByRole('alert')).toHaveTextContent('Payment failed - please try again');
    });

    it('supports interactive cards for navigation', () => {
      const handleCardClick = vi.fn();
      
      render(
        <TestWrapper>
          <div style={{ display: 'grid', gap: '1rem' }}>
            <Card 
              variant="interactive" 
              onClick={() => handleCardClick('calculator')}
              tabIndex={0}
            >
              <h4>Pension Calculator</h4>
              <p>Calculate your retirement savings</p>
            </Card>
            
            <Card 
              variant="interactive" 
              onClick={() => handleCardClick('investment')}
              tabIndex={0}
            >
              <h4>Investment Options</h4>
              <p>Explore different fund types</p>
            </Card>
          </div>
        </TestWrapper>
      );
      
      const calculatorCard = screen.getByText('Pension Calculator').closest('div');
      const investmentCard = screen.getByText('Investment Options').closest('div');
      
      calculatorCard?.click();
      expect(handleCardClick).toHaveBeenCalledWith('calculator');
      
      investmentCard?.click();
      expect(handleCardClick).toHaveBeenCalledWith('investment');
    });

    it('handles loading and empty states', () => {
      const LoadingCard = () => (
        <Card variant="bordered">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div>⏳ Loading pension data...</div>
          </div>
        </Card>
      );
      
      const EmptyCard = () => (
        <Card variant="bordered" semantic="info">
          <div style={{ textAlign: 'center', padding: '2rem' }}>
            <div>📊 No data available</div>
            <div>Start contributing to see your pension growth!</div>
          </div>
        </Card>
      );
      
      const { rerender } = render(
        <TestWrapper>
          <LoadingCard />
        </TestWrapper>
      );
      
      expect(screen.getByText('⏳ Loading pension data...')).toBeInTheDocument();
      
      rerender(
        <TestWrapper>
          <EmptyCard />
        </TestWrapper>
      );
      
      expect(screen.getByText('📊 No data available')).toBeInTheDocument();
      expect(screen.getByText('Start contributing to see your pension growth!')).toBeInTheDocument();
    });

    it('supports responsive card layouts', () => {
      render(
        <TestWrapper>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '1rem'
          }}>
            <Card variant="base">
              <h4>Fund Performance</h4>
              <div>Conservative: +4.2%</div>
            </Card>
            
            <Card variant="base">
              <h4>Recent Activity</h4>
              <div>Last contribution: S/. 850</div>
            </Card>
            
            <Card variant="base">
              <h4>Next Steps</h4>
              <div>Review investment options</div>
            </Card>
          </div>
        </TestWrapper>
      );
      
      expect(screen.getByText('Fund Performance')).toBeInTheDocument();
      expect(screen.getByText('Recent Activity')).toBeInTheDocument();
      expect(screen.getByText('Next Steps')).toBeInTheDocument();
    });
  });
  
  describe('Performance Optimizations', () => {
    it('applies performance hints correctly', () => {
      render(
        <TestWrapper>
          <div>
            <Card performance="critical">
              Critical content that loads immediately
            </Card>
            <Card performance="lazy">
              Lazy content that can be deferred
            </Card>
          </div>
        </TestWrapper>
      );
      
      expect(screen.getByText('Critical content that loads immediately')).toBeInTheDocument();
      expect(screen.getByText('Lazy content that can be deferred')).toBeInTheDocument();
    });
  });
});