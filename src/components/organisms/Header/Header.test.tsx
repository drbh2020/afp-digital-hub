import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { composeStories } from '@storybook/react';
import { Header } from './Header';
import { theme } from '@/context/ui/ThemeContext';
import * as stories from './Header.stories';

// Compose stories for testing
const {
  Default,
  DefaultVariant,
  TransparentVariant,
  CompactVariant,
  WithoutNavigation,
  WithoutAuthButtons,
  MinimalHeader,
} = composeStories(stories);

// Test wrapper with theme
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

describe('Header Component', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      renderWithTheme(<Header />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByLabelText('AFP Digital Hub')).toBeInTheDocument();
      expect(screen.getByText('AFP Digital Hub')).toBeInTheDocument();
    });

    it('renders navigation when showNavigation is true', () => {
      renderWithTheme(<Header showNavigation={true} />);
      
      expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
      expect(screen.getByText('Inicio')).toBeInTheDocument();
      expect(screen.getByText('Calculadora')).toBeInTheDocument();
      expect(screen.getByText('Fondos')).toBeInTheDocument();
      expect(screen.getByText('Educación')).toBeInTheDocument();
      expect(screen.getByText('Acerca de')).toBeInTheDocument();
    });

    it('renders auth buttons when showAuthButtons is true', () => {
      renderWithTheme(<Header showAuthButtons={true} />);
      
      expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
      expect(screen.getByText('Registrarse')).toBeInTheDocument();
    });

    it('renders mobile menu button when navigation is enabled', () => {
      renderWithTheme(<Header showNavigation={true} />);
      
      const menuButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      expect(menuButton).toBeInTheDocument();
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });
  });

  describe('Variants', () => {
    it('applies default variant styling', () => {
      renderWithTheme(<Header variant="default" />);
      
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('applies transparent variant styling', () => {
      renderWithTheme(<Header variant="transparent" />);
      
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });

    it('applies compact variant styling', () => {
      renderWithTheme(<Header variant="compact" />);
      
      const header = screen.getByRole('banner');
      expect(header).toBeInTheDocument();
    });
  });

  describe('Configuration Options', () => {
    it('hides navigation when showNavigation is false', () => {
      renderWithTheme(<Header showNavigation={false} />);
      
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
      expect(screen.queryByText('Inicio')).not.toBeInTheDocument();
      expect(screen.queryByRole('button', { name: 'Toggle navigation menu' })).not.toBeInTheDocument();
    });

    it('hides auth buttons when showAuthButtons is false', () => {
      renderWithTheme(<Header showAuthButtons={false} />);
      
      expect(screen.queryByText('Iniciar Sesión')).not.toBeInTheDocument();
      expect(screen.queryByText('Registrarse')).not.toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderWithTheme(<Header className="custom-header" />);
      
      const header = screen.getByRole('banner');
      expect(header).toHaveClass('custom-header');
    });
  });

  describe('Mobile Menu Interaction', () => {
    it('toggles mobile menu when button is clicked', () => {
      renderWithTheme(<Header showNavigation={true} />);
      
      const menuButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      const mobileMenu = screen.getByRole('generic', { hidden: true }); // Mobile menu is hidden by default
      
      // Initially closed
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
      
      // Click to open
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'true');
      
      // Click to close
      fireEvent.click(menuButton);
      expect(menuButton).toHaveAttribute('aria-expanded', 'false');
    });

    it('shows mobile navigation links when menu is open', () => {
      renderWithTheme(<Header showNavigation={true} />);
      
      const menuButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      fireEvent.click(menuButton);
      
      // Mobile navigation links should be visible (they exist in DOM but hidden by CSS)
      const mobileLinks = screen.getAllByText('Inicio');
      expect(mobileLinks.length).toBeGreaterThan(1); // Desktop + mobile versions
    });

    it('shows mobile auth buttons when menu is open and showAuthButtons is true', () => {
      renderWithTheme(<Header showNavigation={true} showAuthButtons={true} />);
      
      const menuButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      fireEvent.click(menuButton);
      
      // Mobile auth buttons should be visible (they exist in DOM but hidden by CSS)
      const loginButtons = screen.getAllByText('Iniciar Sesión');
      expect(loginButtons.length).toBeGreaterThan(1); // Desktop + mobile versions
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      renderWithTheme(<Header showNavigation={true} />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('navigation', { name: 'Main navigation' })).toBeInTheDocument();
      expect(screen.getByLabelText('AFP Digital Hub')).toBeInTheDocument();
      
      const menuButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      expect(menuButton).toHaveAttribute('aria-expanded');
      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    it('has keyboard navigation support', () => {
      renderWithTheme(<Header showNavigation={true} showAuthButtons={true} />);
      
      const navLinks = screen.getAllByRole('link');
      const buttons = screen.getAllByRole('button');
      
      // All interactive elements should be focusable
      [...navLinks, ...buttons].forEach(element => {
        expect(element).not.toHaveAttribute('tabindex', '-1');
      });
    });

    it('has proper current page indication', () => {
      renderWithTheme(<Header showNavigation={true} />);
      
      const homeLink = screen.getByText('Inicio').closest('a');
      expect(homeLink).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Content and Links', () => {
    it('displays correct navigation links', () => {
      renderWithTheme(<Header showNavigation={true} />);
      
      expect(screen.getByText('Inicio')).toHaveAttribute('href', '/');
      expect(screen.getByText('Calculadora')).toHaveAttribute('href', '/calculator');
      expect(screen.getByText('Fondos')).toHaveAttribute('href', '/funds');
      expect(screen.getByText('Educación')).toHaveAttribute('href', '/education');
      expect(screen.getByText('Acerca de')).toHaveAttribute('href', '/about');
    });

    it('displays AFP branding correctly', () => {
      renderWithTheme(<Header />);
      
      expect(screen.getByLabelText('AFP Digital Hub')).toBeInTheDocument();
      expect(screen.getByText('AFP Digital Hub')).toBeInTheDocument();
      expect(screen.getByText('AFP')).toBeInTheDocument(); // Logo text
    });
  });

  describe('Storybook Integration', () => {
    it('renders Default story correctly', () => {
      render(<Default />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByText('AFP Digital Hub')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders DefaultVariant story correctly', () => {
      render(<DefaultVariant />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
      expect(screen.getByText('Registrarse')).toBeInTheDocument();
    });

    it('renders TransparentVariant story correctly', () => {
      render(<TransparentVariant />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
    });

    it('renders CompactVariant story correctly', () => {
      render(<CompactVariant />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByText('AFP Digital Hub')).toBeInTheDocument();
    });

    it('renders WithoutNavigation story correctly', () => {
      render(<WithoutNavigation />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
      expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    });

    it('renders WithoutAuthButtons story correctly', () => {
      render(<WithoutAuthButtons />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByRole('navigation')).toBeInTheDocument();
      expect(screen.queryByText('Iniciar Sesión')).not.toBeInTheDocument();
    });

    it('renders MinimalHeader story correctly', () => {
      render(<MinimalHeader />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByText('AFP Digital Hub')).toBeInTheDocument();
      expect(screen.queryByRole('navigation')).not.toBeInTheDocument();
      expect(screen.queryByText('Iniciar Sesión')).not.toBeInTheDocument();
    });
  });

  describe('Real-world Usage', () => {
    it('handles pension-focused navigation properly', () => {
      renderWithTheme(<Header showNavigation={true} />);
      
      // Check for AFP-specific navigation items
      expect(screen.getByText('Calculadora')).toBeInTheDocument();
      expect(screen.getByText('Fondos')).toBeInTheDocument();
      expect(screen.getByText('Educación')).toBeInTheDocument();
      
      // Verify links point to expected pension-related routes
      expect(screen.getByText('Calculadora')).toHaveAttribute('href', '/calculator');
      expect(screen.getByText('Fondos')).toHaveAttribute('href', '/funds');
      expect(screen.getByText('Educación')).toHaveAttribute('href', '/education');
    });

    it('supports typical AFP user authentication flow', () => {
      renderWithTheme(<Header showAuthButtons={true} />);
      
      const loginButton = screen.getByText('Iniciar Sesión');
      const registerButton = screen.getByText('Registrarse');
      
      expect(loginButton).toBeInTheDocument();
      expect(registerButton).toBeInTheDocument();
      
      // Login should be ghost variant (secondary action)
      expect(loginButton.closest('button')).toBeInTheDocument();
      // Register should be primary variant (main CTA)
      expect(registerButton.closest('button')).toBeInTheDocument();
    });
  });

  describe('Icon Rendering', () => {
    it('renders mobile menu icons correctly', () => {
      renderWithTheme(<Header showNavigation={true} />);
      
      const menuButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      
      // Should contain SVG elements for hamburger/close icons
      const svgElements = menuButton.querySelectorAll('svg');
      expect(svgElements.length).toBeGreaterThan(0);
    });

    it('changes icon when mobile menu is toggled', () => {
      renderWithTheme(<Header showNavigation={true} />);
      
      const menuButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      
      // Initial state (hamburger icon)
      expect(menuButton.querySelector('line[x1="3"][y1="6"]')).toBeInTheDocument();
      
      // Toggle menu
      fireEvent.click(menuButton);
      
      // Should show close icon (X)
      expect(menuButton.querySelector('line[x1="18"][y1="6"]')).toBeInTheDocument();
    });
  });
});