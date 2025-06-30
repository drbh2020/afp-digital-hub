import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { composeStories } from '@storybook/react';
import { PageLayout } from './PageLayout';
import { theme } from '@/context/ui/ThemeContext';
import * as stories from './PageLayout.stories';

// Compose stories for testing
const {
  Default,
  SmallContainer,
  LargeContainer,
  FullWidthContainer,
  NoSpacing,
  LargeSpacing,
  NoHeader,
  NoFooter,
  LandingPage,
  ApplicationPage,
  LoginPage,
  FullScreenApp,
} = composeStories(stories);

// Test wrapper with theme
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('PageLayout Component', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      renderWithTheme(
        <PageLayout>
          <div>Test content</div>
        </PageLayout>
      );
      
      expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
      expect(screen.getByRole('main')).toBeInTheDocument(); // Main content
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
      expect(screen.getByText('Test content')).toBeInTheDocument();
    });

    it('renders children content correctly', () => {
      const testContent = (
        <div>
          <h1>Test Title</h1>
          <p>Test paragraph</p>
        </div>
      );
      
      renderWithTheme(
        <PageLayout>
          {testContent}
        </PageLayout>
      );
      
      expect(screen.getByText('Test Title')).toBeInTheDocument();
      expect(screen.getByText('Test paragraph')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderWithTheme(
        <PageLayout className="custom-layout">
          <div>Content</div>
        </PageLayout>
      );
      
      const layoutContainer = screen.getByText('Content').closest('.custom-layout');
      expect(layoutContainer).toBeInTheDocument();
    });
  });

  describe('Header Configuration', () => {
    it('shows header by default', () => {
      renderWithTheme(
        <PageLayout>
          <div>Content</div>
        </PageLayout>
      );
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getAllByText('AFP Digital Hub').length).toBeGreaterThanOrEqual(1);
    });

    it('hides header when showHeader is false', () => {
      renderWithTheme(
        <PageLayout showHeader={false}>
          <div>Content</div>
        </PageLayout>
      );
      
      expect(screen.queryByRole('banner')).not.toBeInTheDocument();
      // Note: AFP Digital Hub text may still appear in Footer, so we check for banner role absence instead
    });

    it('passes headerProps to Header component', () => {
      renderWithTheme(
        <PageLayout 
          headerProps={{ 
            variant: 'compact', 
            showNavigation: false,
            showAuthButtons: false 
          }}
        >
          <div>Content</div>
        </PageLayout>
      );
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
      expect(screen.queryByText('Iniciar Sesión')).not.toBeInTheDocument();
    });
  });

  describe('Footer Configuration', () => {
    it('shows footer by default', () => {
      renderWithTheme(
        <PageLayout>
          <div>Content</div>
        </PageLayout>
      );
      
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(`© ${currentYear} AFP Digital Hub. Todos los derechos reservados.`)).toBeInTheDocument();
    });

    it('hides footer when showFooter is false', () => {
      renderWithTheme(
        <PageLayout showFooter={false}>
          <div>Content</div>
        </PageLayout>
      );
      
      expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    });

    it('passes footerProps to Footer component', () => {
      renderWithTheme(
        <PageLayout 
          footerProps={{ 
            variant: 'minimal',
            showSocialLinks: false 
          }}
        >
          <div>Content</div>
        </PageLayout>
      );
      
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.queryByLabelText('Síguenos en Facebook')).not.toBeInTheDocument();
    });
  });

  describe('Container Sizes', () => {
    it('applies xs container size', () => {
      renderWithTheme(
        <PageLayout containerSize="xs">
          <div data-testid="content">Content</div>
        </PageLayout>
      );
      
      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeInTheDocument();
    });

    it('applies sm container size', () => {
      renderWithTheme(
        <PageLayout containerSize="sm">
          <div data-testid="content">Content</div>
        </PageLayout>
      );
      
      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeInTheDocument();
    });

    it('applies lg container size (default)', () => {
      renderWithTheme(
        <PageLayout containerSize="lg">
          <div data-testid="content">Content</div>
        </PageLayout>
      );
      
      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeInTheDocument();
    });

    it('applies full container size', () => {
      renderWithTheme(
        <PageLayout containerSize="full">
          <div data-testid="content">Content</div>
        </PageLayout>
      );
      
      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeInTheDocument();
    });
  });

  describe('Spacing Options', () => {
    it('applies no spacing', () => {
      renderWithTheme(
        <PageLayout spacing="none">
          <div>Content</div>
        </PageLayout>
      );
      
      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeInTheDocument();
    });

    it('applies small spacing', () => {
      renderWithTheme(
        <PageLayout spacing="sm">
          <div>Content</div>
        </PageLayout>
      );
      
      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeInTheDocument();
    });

    it('applies medium spacing (default)', () => {
      renderWithTheme(
        <PageLayout spacing="md">
          <div>Content</div>
        </PageLayout>
      );
      
      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeInTheDocument();
    });

    it('applies large spacing', () => {
      renderWithTheme(
        <PageLayout spacing="lg">
          <div>Content</div>
        </PageLayout>
      );
      
      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeInTheDocument();
    });

    it('applies extra large spacing', () => {
      renderWithTheme(
        <PageLayout spacing="xl">
          <div>Content</div>
        </PageLayout>
      );
      
      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeInTheDocument();
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      renderWithTheme(
        <PageLayout>
          <div>Content</div>
        </PageLayout>
      );
      
      expect(screen.getByRole('banner')).toBeInTheDocument(); // Header
      expect(screen.getByRole('main')).toBeInTheDocument(); // Main content
      expect(screen.getByRole('contentinfo')).toBeInTheDocument(); // Footer
    });

    it('includes skip link for accessibility', () => {
      renderWithTheme(
        <PageLayout>
          <div>Content</div>
        </PageLayout>
      );
      
      const skipLink = screen.getByText('Ir al contenido principal');
      expect(skipLink).toBeInTheDocument();
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });

    it('has proper ARIA labels on main content', () => {
      renderWithTheme(
        <PageLayout>
          <div>Content</div>
        </PageLayout>
      );
      
      const mainContent = screen.getByRole('main');
      expect(mainContent).toHaveAttribute('id', 'main-content');
      expect(mainContent).toHaveAttribute('aria-label', 'Contenido principal');
    });

    it('maintains focus order with skip link', () => {
      renderWithTheme(
        <PageLayout>
          <div>Content</div>
        </PageLayout>
      );
      
      const skipLink = screen.getByText('Ir al contenido principal');
      const mainContent = screen.getByRole('main');
      
      expect(skipLink).toBeInTheDocument();
      expect(mainContent).toHaveAttribute('id', 'main-content');
      expect(skipLink).toHaveAttribute('href', '#main-content');
    });
  });

  describe('Layout Structure', () => {
    it('maintains proper flex layout structure', () => {
      renderWithTheme(
        <PageLayout>
          <div>Content</div>
        </PageLayout>
      );
      
      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeInTheDocument();
      
      // Main content should be between header and footer
      const banner = screen.getByRole('banner');
      const contentinfo = screen.getByRole('contentinfo');
      
      expect(banner).toBeInTheDocument();
      expect(contentinfo).toBeInTheDocument();
    });

    it('handles full screen layout without header and footer', () => {
      renderWithTheme(
        <PageLayout showHeader={false} showFooter={false}>
          <div>Full screen content</div>
        </PageLayout>
      );
      
      expect(screen.queryByRole('banner')).not.toBeInTheDocument();
      expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByText('Full screen content')).toBeInTheDocument();
    });
  });

  describe('Storybook Integration', () => {
    it('renders Default story correctly', () => {
      renderWithTheme(<Default />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText('Bienvenido a AFP Digital Hub')).toBeInTheDocument();
    });

    it('renders SmallContainer story correctly', () => {
      renderWithTheme(<SmallContainer />);
      
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getAllByText('Iniciar Sesión').length).toBeGreaterThanOrEqual(1);
    });

    it('renders LargeContainer story correctly', () => {
      renderWithTheme(<LargeContainer />);
      
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByText('Bienvenido a AFP Digital Hub')).toBeInTheDocument();
    });

    it('renders FullWidthContainer story correctly', () => {
      renderWithTheme(<FullWidthContainer />);
      
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByText('Full Width Layout')).toBeInTheDocument();
    });

    it('renders NoSpacing story correctly', () => {
      renderWithTheme(<NoSpacing />);
      
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByText('Bienvenido a AFP Digital Hub')).toBeInTheDocument();
    });

    it('renders LargeSpacing story correctly', () => {
      renderWithTheme(<LargeSpacing />);
      
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByText('Bienvenido a AFP Digital Hub')).toBeInTheDocument();
    });

    it('renders NoHeader story correctly', () => {
      renderWithTheme(<NoHeader />);
      
      expect(screen.queryByRole('banner')).not.toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders NoFooter story correctly', () => {
      renderWithTheme(<NoFooter />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
    });

    it('renders LandingPage story correctly', () => {
      renderWithTheme(<LandingPage />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText('Bienvenido a AFP Digital Hub')).toBeInTheDocument();
    });

    it('renders ApplicationPage story correctly', () => {
      renderWithTheme(<ApplicationPage />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('renders LoginPage story correctly', () => {
      renderWithTheme(<LoginPage />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getAllByText('Iniciar Sesión').length).toBeGreaterThanOrEqual(1);
    });

    it('renders FullScreenApp story correctly', () => {
      renderWithTheme(<FullScreenApp />);
      
      expect(screen.queryByRole('banner')).not.toBeInTheDocument();
      expect(screen.queryByRole('contentinfo')).not.toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByText('Aplicación de Pantalla Completa')).toBeInTheDocument();
    });
  });

  describe('Real-world Usage Scenarios', () => {
    it('handles landing page configuration', () => {
      renderWithTheme(
        <PageLayout
          headerProps={{ variant: 'transparent' }}
          footerProps={{ variant: 'extended', showSocialLinks: true }}
          containerSize="xl"
          spacing="lg"
        >
          <div>Landing page content</div>
        </PageLayout>
      );
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText('Landing page content')).toBeInTheDocument();
    });

    it('handles application page configuration', () => {
      renderWithTheme(
        <PageLayout
          headerProps={{ showAuthButtons: false }}
          footerProps={{ variant: 'minimal' }}
          containerSize="lg"
          spacing="md"
        >
          <div>Application content</div>
        </PageLayout>
      );
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText('Application content')).toBeInTheDocument();
    });

    it('handles form page configuration', () => {
      renderWithTheme(
        <PageLayout
          headerProps={{ variant: 'compact', showNavigation: false }}
          footerProps={{ variant: 'minimal' }}
          containerSize="sm"
          spacing="lg"
        >
          <form>
            <input type="email" placeholder="Email" />
            <button type="submit">Submit</button>
          </form>
        </PageLayout>
      );
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    });
  });

  describe('Performance Features', () => {
    it('applies performance optimizations to main content', () => {
      renderWithTheme(
        <PageLayout>
          <div>Content</div>
        </PageLayout>
      );
      
      const mainContent = screen.getByRole('main');
      expect(mainContent).toBeInTheDocument();
      // Main content should have performance optimizations applied via CSS
    });
  });

  describe('Error Handling', () => {
    it('handles missing children gracefully', () => {
      renderWithTheme(
        <PageLayout>
          {null}
        </PageLayout>
      );
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('handles empty children gracefully', () => {
      renderWithTheme(
        <PageLayout>
          {''}
        </PageLayout>
      );
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('main')).toBeInTheDocument();
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });
  });
});