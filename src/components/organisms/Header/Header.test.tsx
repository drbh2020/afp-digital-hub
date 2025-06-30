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
      
      const nav = screen.getByLabelText('Main navigation');
      expect(nav).toBeInTheDocument();
      expect(screen.getAllByText('Inicio').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Calculadora').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Fondos').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Educación').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Acerca de').length).toBeGreaterThanOrEqual(1);
    });

    it('renders auth buttons when showAuthButtons is true', () => {
      renderWithTheme(<Header showAuthButtons={true} />);
      
      expect(screen.getAllByText('Iniciar Sesión').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Registrarse').length).toBeGreaterThanOrEqual(1);
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
      
      expect(screen.queryByLabelText('Main navigation')).not.toBeInTheDocument();
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
      expect(mobileLinks.length).toBe(2); // Desktop + mobile versions
    });

    it('shows mobile auth buttons when menu is open and showAuthButtons is true', () => {
      renderWithTheme(<Header showNavigation={true} showAuthButtons={true} />);
      
      const menuButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      fireEvent.click(menuButton);
      
      // Mobile auth buttons should be visible (they exist in DOM but hidden by CSS)
      const loginButtons = screen.getAllByText('Iniciar Sesión');
      expect(loginButtons.length).toBe(2); // Desktop + mobile versions
    });
  });

  describe('Accessibility', () => {
    it('has proper ARIA labels and roles', () => {
      renderWithTheme(<Header showNavigation={true} />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
      expect(screen.getByLabelText('AFP Digital Hub')).toBeInTheDocument();
      
      const menuButton = screen.getByRole('button', { name: 'Toggle navigation menu' });
      expect(menuButton).toHaveAttribute('aria-expanded');
      expect(menuButton).toHaveAttribute('aria-controls', 'mobile-menu');
    });

    it('has keyboard navigation support', () => {
      renderWithTheme(<Header showNavigation={true} showAuthButtons={true} />);
      
      const buttons = screen.getAllByRole('button');
      
      // All buttons should be focusable
      buttons.forEach(button => {
        expect(button).not.toHaveAttribute('tabindex', '-1');
      });
      
      // Check that navigation links exist and are focusable
      const inicioLinks = screen.getAllByText('Inicio');
      inicioLinks.forEach(link => {
        expect(link.closest('a')).not.toHaveAttribute('tabindex', '-1');
      });
    });

    it('has proper current page indication', () => {
      renderWithTheme(<Header showNavigation={true} />);
      
      const homeLinks = screen.getAllByText('Inicio');
      const homeLink = homeLinks[0].closest('a');
      expect(homeLink).toHaveAttribute('aria-current', 'page');
    });
  });

  describe('Content and Links', () => {
    it('displays correct navigation links', () => {
      renderWithTheme(<Header showNavigation={true} />);
      
      const inicioLinks = screen.getAllByText('Inicio');
      expect(inicioLinks[0]).toHaveAttribute('href', '/');
      
      const calculadoraLinks = screen.getAllByText('Calculadora');
      expect(calculadoraLinks[0]).toHaveAttribute('href', '/calculator');
      
      const fondosLinks = screen.getAllByText('Fondos');
      expect(fondosLinks[0]).toHaveAttribute('href', '/funds');
      
      const educacionLinks = screen.getAllByText('Educación');
      expect(educacionLinks[0]).toHaveAttribute('href', '/education');
      
      const acercaLinks = screen.getAllByText('Acerca de');
      expect(acercaLinks[0]).toHaveAttribute('href', '/about');
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
      renderWithTheme(<Default />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByText('AFP Digital Hub')).toBeInTheDocument();
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    });

    it('renders DefaultVariant story correctly', () => {
      renderWithTheme(<DefaultVariant />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getAllByText('Iniciar Sesión').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Registrarse').length).toBeGreaterThanOrEqual(1);
    });

    it('renders TransparentVariant story correctly', () => {
      renderWithTheme(<TransparentVariant />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
    });

    it('renders CompactVariant story correctly', () => {
      renderWithTheme(<CompactVariant />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByText('AFP Digital Hub')).toBeInTheDocument();
    });

    it('renders WithoutNavigation story correctly', () => {
      renderWithTheme(<WithoutNavigation />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.queryByLabelText('Main navigation')).not.toBeInTheDocument();
      expect(screen.getByText('Iniciar Sesión')).toBeInTheDocument();
    });

    it('renders WithoutAuthButtons story correctly', () => {
      renderWithTheme(<WithoutAuthButtons />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByLabelText('Main navigation')).toBeInTheDocument();
      expect(screen.queryByText('Iniciar Sesión')).not.toBeInTheDocument();
    });

    it('renders MinimalHeader story correctly', () => {
      renderWithTheme(<MinimalHeader />);
      
      expect(screen.getByRole('banner')).toBeInTheDocument();
      expect(screen.getByText('AFP Digital Hub')).toBeInTheDocument();
      expect(screen.queryByLabelText('Main navigation')).not.toBeInTheDocument();
      expect(screen.queryByText('Iniciar Sesión')).not.toBeInTheDocument();
    });
  });

  describe('Real-world Usage', () => {
    it('handles pension-focused navigation properly', () => {
      renderWithTheme(<Header showNavigation={true} />);
      
      // Check for AFP-specific navigation items
      expect(screen.getAllByText('Calculadora').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Fondos').length).toBeGreaterThanOrEqual(1);
      expect(screen.getAllByText('Educación').length).toBeGreaterThanOrEqual(1);
      
      // Verify links point to expected pension-related routes
      const calculadoraLinks = screen.getAllByText('Calculadora');
      expect(calculadoraLinks[0]).toHaveAttribute('href', '/calculator');
      
      const fondosLinks = screen.getAllByText('Fondos');
      expect(fondosLinks[0]).toHaveAttribute('href', '/funds');
      
      const educacionLinks = screen.getAllByText('Educación');
      expect(educacionLinks[0]).toHaveAttribute('href', '/education');
    });

    it('supports typical AFP user authentication flow', () => {
      renderWithTheme(<Header showAuthButtons={true} />);
      
      const loginButtons = screen.getAllByText('Iniciar Sesión');
      const registerButtons = screen.getAllByText('Registrarse');
      
      expect(loginButtons.length).toBeGreaterThanOrEqual(1);
      expect(registerButtons.length).toBeGreaterThanOrEqual(1);
      
      // Login should be ghost variant (secondary action)
      expect(loginButtons[0].closest('button')).toBeInTheDocument();
      // Register should be primary variant (main CTA)
      expect(registerButtons[0].closest('button')).toBeInTheDocument();
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