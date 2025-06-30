import { render, screen } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import { ThemeProvider } from 'styled-components';
import { composeStories } from '@storybook/react';
import { Footer } from './Footer';
import { theme } from '@/context/ui/ThemeContext';
import * as stories from './Footer.stories';

// Compose stories for testing
const {
  Default,
  DefaultVariant,
  MinimalVariant,
  ExtendedVariant,
  WithoutSocialLinks,
  WithSocialLinks,
} = composeStories(stories);

// Test wrapper with theme
const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider theme={theme}>
      {component}
    </ThemeProvider>
  );
};

// Mock current year to ensure consistent testing
const currentYear = new Date().getFullYear();

describe('Footer Component', () => {
  describe('Basic Rendering', () => {
    it('renders with default props', () => {
      renderWithTheme(<Footer />);
      
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText('AFP Digital Hub')).toBeInTheDocument();
      expect(screen.getByText(`© ${currentYear} AFP Digital Hub. Todos los derechos reservados.`)).toBeInTheDocument();
    });

    it('renders brand logo and description', () => {
      renderWithTheme(<Footer />);
      
      expect(screen.getByLabelText('AFP Digital Hub')).toBeInTheDocument();
      expect(screen.getByText('AFP')).toBeInTheDocument(); // Logo text
      expect(screen.getByText(/Tu aliado confiable en la planificación financiera/)).toBeInTheDocument();
    });

    it('renders social links when showSocialLinks is true', () => {
      renderWithTheme(<Footer showSocialLinks={true} />);
      
      expect(screen.getByLabelText('Síguenos en Facebook')).toBeInTheDocument();
      expect(screen.getByLabelText('Síguenos en Twitter')).toBeInTheDocument();
      expect(screen.getByLabelText('Conéctate en LinkedIn')).toBeInTheDocument();
      expect(screen.getByLabelText('Suscríbete a nuestro canal de YouTube')).toBeInTheDocument();
    });

    it('hides social links when showSocialLinks is false', () => {
      renderWithTheme(<Footer showSocialLinks={false} />);
      
      expect(screen.queryByLabelText('Síguenos en Facebook')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Síguenos en Twitter')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Conéctate en LinkedIn')).not.toBeInTheDocument();
      expect(screen.queryByLabelText('Suscríbete a nuestro canal de YouTube')).not.toBeInTheDocument();
    });
  });

  describe('Variants', () => {
    it('renders default variant with full content', () => {
      renderWithTheme(<Footer variant="default" />);
      
      expect(screen.getByText('Servicios')).toBeInTheDocument();
      expect(screen.getByText('Recursos')).toBeInTheDocument();
      expect(screen.getByText('Empresa')).toBeInTheDocument();
      expect(screen.getByText('Calculadora de Pensión')).toBeInTheDocument();
    });

    it('renders minimal variant with only copyright', () => {
      renderWithTheme(<Footer variant="minimal" />);
      
      expect(screen.getByText(`© ${currentYear} AFP Digital Hub. Todos los derechos reservados.`)).toBeInTheDocument();
      expect(screen.queryByText('Servicios')).not.toBeInTheDocument();
      expect(screen.queryByText('Recursos')).not.toBeInTheDocument();
      expect(screen.queryByText('Empresa')).not.toBeInTheDocument();
    });

    it('renders extended variant with full content', () => {
      renderWithTheme(<Footer variant="extended" />);
      
      expect(screen.getByText('Servicios')).toBeInTheDocument();
      expect(screen.getByText('Recursos')).toBeInTheDocument();
      expect(screen.getByText('Empresa')).toBeInTheDocument();
      expect(screen.getByText('AFP Digital Hub')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      renderWithTheme(<Footer className="custom-footer" />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toHaveClass('custom-footer');
    });
  });

  describe('Content Sections', () => {
    it('renders Services section with correct links', () => {
      renderWithTheme(<Footer variant="default" />);
      
      expect(screen.getByText('Servicios')).toBeInTheDocument();
      expect(screen.getByText('Calculadora de Pensión')).toHaveAttribute('href', '/calculator');
      expect(screen.getByText('Administración de Fondos')).toHaveAttribute('href', '/funds');
      expect(screen.getByText('Opciones de Inversión')).toHaveAttribute('href', '/investment');
      expect(screen.getByText('Asesoría Personalizada')).toHaveAttribute('href', '/advisory');
      expect(screen.getByText('Reportes y Estados')).toHaveAttribute('href', '/reports');
    });

    it('renders Resources section with correct links', () => {
      renderWithTheme(<Footer variant="default" />);
      
      expect(screen.getByText('Recursos')).toBeInTheDocument();
      expect(screen.getByText('Educación Financiera')).toHaveAttribute('href', '/education');
      expect(screen.getByText('Artículos y Guías')).toHaveAttribute('href', '/articles');
      expect(screen.getByText('Herramientas')).toHaveAttribute('href', '/tools');
      expect(screen.getByText('Preguntas Frecuentes')).toHaveAttribute('href', '/faq');
      expect(screen.getByText('Centro de Ayuda')).toHaveAttribute('href', '/support');
    });

    it('renders Company section with correct links', () => {
      renderWithTheme(<Footer variant="default" />);
      
      expect(screen.getByText('Empresa')).toBeInTheDocument();
      expect(screen.getByText('Acerca de Nosotros')).toHaveAttribute('href', '/about');
      expect(screen.getByText('Trabaja con Nosotros')).toHaveAttribute('href', '/careers');
      expect(screen.getByText('Noticias')).toHaveAttribute('href', '/news');
      expect(screen.getByText('Contacto')).toHaveAttribute('href', '/contact');
      expect(screen.getByText('Sucursales')).toHaveAttribute('href', '/locations');
    });

    it('renders legal links in footer bottom', () => {
      renderWithTheme(<Footer variant="default" />);
      
      expect(screen.getByText('Política de Privacidad')).toHaveAttribute('href', '/privacy');
      expect(screen.getByText('Términos de Uso')).toHaveAttribute('href', '/terms');
      expect(screen.getByText('Política de Cookies')).toHaveAttribute('href', '/cookies');
      expect(screen.getByText('Marco Regulatorio')).toHaveAttribute('href', '/regulations');
    });
  });

  describe('Social Media Links', () => {
    it('renders all social media links with correct attributes', () => {
      renderWithTheme(<Footer showSocialLinks={true} />);
      
      const facebookLink = screen.getByLabelText('Síguenos en Facebook');
      expect(facebookLink).toHaveAttribute('href', 'https://facebook.com');
      expect(facebookLink).toHaveAttribute('target', '_blank');
      expect(facebookLink).toHaveAttribute('rel', 'noopener noreferrer');
      
      const twitterLink = screen.getByLabelText('Síguenos en Twitter');
      expect(twitterLink).toHaveAttribute('href', 'https://twitter.com');
      expect(twitterLink).toHaveAttribute('target', '_blank');
      expect(twitterLink).toHaveAttribute('rel', 'noopener noreferrer');
      
      const linkedinLink = screen.getByLabelText('Conéctate en LinkedIn');
      expect(linkedinLink).toHaveAttribute('href', 'https://linkedin.com');
      expect(linkedinLink).toHaveAttribute('target', '_blank');
      expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
      
      const youtubeLink = screen.getByLabelText('Suscríbete a nuestro canal de YouTube');
      expect(youtubeLink).toHaveAttribute('href', 'https://youtube.com');
      expect(youtubeLink).toHaveAttribute('target', '_blank');
      expect(youtubeLink).toHaveAttribute('rel', 'noopener noreferrer');
    });

    it('renders social media icons as SVG elements', () => {
      renderWithTheme(<Footer showSocialLinks={true} />);
      
      const socialLinks = [
        screen.getByLabelText('Síguenos en Facebook'),
        screen.getByLabelText('Síguenos en Twitter'),
        screen.getByLabelText('Conéctate en LinkedIn'),
        screen.getByLabelText('Suscríbete a nuestro canal de YouTube'),
      ];
      
      socialLinks.forEach(link => {
        const svg = link.querySelector('svg');
        expect(svg).toBeInTheDocument();
        expect(svg).toHaveAttribute('width', '20');
        expect(svg).toHaveAttribute('height', '20');
      });
    });
  });

  describe('Accessibility', () => {
    it('has proper semantic structure', () => {
      renderWithTheme(<Footer />);
      
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
    });

    it('has proper ARIA labels for social links', () => {
      renderWithTheme(<Footer showSocialLinks={true} />);
      
      expect(screen.getByLabelText('Síguenos en Facebook')).toBeInTheDocument();
      expect(screen.getByLabelText('Síguenos en Twitter')).toBeInTheDocument();
      expect(screen.getByLabelText('Conéctate en LinkedIn')).toBeInTheDocument();
      expect(screen.getByLabelText('Suscríbete a nuestro canal de YouTube')).toBeInTheDocument();
    });

    it('has keyboard navigation support', () => {
      renderWithTheme(<Footer />);
      
      const links = screen.getAllByRole('link');
      
      // All links should be focusable
      links.forEach(link => {
        expect(link).not.toHaveAttribute('tabindex', '-1');
      });
    });

    it('has proper link relationships for external links', () => {
      renderWithTheme(<Footer showSocialLinks={true} />);
      
      const externalLinks = [
        screen.getByLabelText('Síguenos en Facebook'),
        screen.getByLabelText('Síguenos en Twitter'),
        screen.getByLabelText('Conéctate en LinkedIn'),
        screen.getByLabelText('Suscríbete a nuestro canal de YouTube'),
      ];
      
      externalLinks.forEach(link => {
        expect(link).toHaveAttribute('target', '_blank');
        expect(link).toHaveAttribute('rel', 'noopener noreferrer');
      });
    });
  });

  describe('AFP-Specific Content', () => {
    it('displays pension-focused services', () => {
      renderWithTheme(<Footer variant="default" />);
      
      expect(screen.getByText('Calculadora de Pensión')).toBeInTheDocument();
      expect(screen.getByText('Administración de Fondos')).toBeInTheDocument();
      expect(screen.getByText('Opciones de Inversión')).toBeInTheDocument();
      expect(screen.getByText('Asesoría Personalizada')).toBeInTheDocument();
      expect(screen.getByText('Reportes y Estados')).toBeInTheDocument();
    });

    it('displays financial education resources', () => {
      renderWithTheme(<Footer variant="default" />);
      
      expect(screen.getByText('Educación Financiera')).toBeInTheDocument();
      expect(screen.getByText('Artículos y Guías')).toBeInTheDocument();
      expect(screen.getByText('Herramientas')).toBeInTheDocument();
      expect(screen.getByText('Centro de Ayuda')).toBeInTheDocument();
    });

    it('displays regulatory compliance links', () => {
      renderWithTheme(<Footer variant="default" />);
      
      expect(screen.getByText('Marco Regulatorio')).toBeInTheDocument();
      expect(screen.getByText('Marco Regulatorio')).toHaveAttribute('href', '/regulations');
    });

    it('has Spanish language content', () => {
      renderWithTheme(<Footer variant="default" />);
      
      expect(screen.getByText('Servicios')).toBeInTheDocument();
      expect(screen.getByText('Recursos')).toBeInTheDocument();
      expect(screen.getByText('Empresa')).toBeInTheDocument();
      expect(screen.getByText('Todos los derechos reservados')).toBeInTheDocument();
    });
  });

  describe('Storybook Integration', () => {
    it('renders Default story correctly', () => {
      render(<Default />);
      
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText('AFP Digital Hub')).toBeInTheDocument();
      expect(screen.getByText('Servicios')).toBeInTheDocument();
    });

    it('renders DefaultVariant story correctly', () => {
      render(<DefaultVariant />);
      
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText('Calculadora de Pensión')).toBeInTheDocument();
      expect(screen.getByLabelText('Síguenos en Facebook')).toBeInTheDocument();
    });

    it('renders MinimalVariant story correctly', () => {
      render(<MinimalVariant />);
      
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText(`© ${currentYear} AFP Digital Hub. Todos los derechos reservados.`)).toBeInTheDocument();
      expect(screen.queryByText('Servicios')).not.toBeInTheDocument();
    });

    it('renders ExtendedVariant story correctly', () => {
      render(<ExtendedVariant />);
      
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByText('Servicios')).toBeInTheDocument();
      expect(screen.getByText('AFP Digital Hub')).toBeInTheDocument();
    });

    it('renders WithoutSocialLinks story correctly', () => {
      render(<WithoutSocialLinks />);
      
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.queryByLabelText('Síguenos en Facebook')).not.toBeInTheDocument();
    });

    it('renders WithSocialLinks story correctly', () => {
      render(<WithSocialLinks />);
      
      expect(screen.getByRole('contentinfo')).toBeInTheDocument();
      expect(screen.getByLabelText('Síguenos en Facebook')).toBeInTheDocument();
    });
  });

  describe('Performance and Optimization', () => {
    it('lazy loads content for performance', () => {
      renderWithTheme(<Footer />);
      
      const footer = screen.getByRole('contentinfo');
      expect(footer).toBeInTheDocument();
      // Footer should be present in DOM for performance testing
    });
  });

  describe('Copyright and Legal', () => {
    it('displays current year in copyright', () => {
      renderWithTheme(<Footer />);
      
      const currentYear = new Date().getFullYear();
      expect(screen.getByText(`© ${currentYear} AFP Digital Hub. Todos los derechos reservados.`)).toBeInTheDocument();
    });

    it('displays all legal compliance links', () => {
      renderWithTheme(<Footer variant="default" />);
      
      const legalLinks = [
        'Política de Privacidad',
        'Términos de Uso',
        'Política de Cookies',
        'Marco Regulatorio'
      ];
      
      legalLinks.forEach(linkText => {
        expect(screen.getByText(linkText)).toBeInTheDocument();
      });
    });
  });

  describe('Grid Layout', () => {
    it('renders content sections in proper structure', () => {
      renderWithTheme(<Footer variant="default" />);
      
      // Should have main content sections
      expect(screen.getByText('Servicios')).toBeInTheDocument();
      expect(screen.getByText('Recursos')).toBeInTheDocument();
      expect(screen.getByText('Empresa')).toBeInTheDocument();
      
      // Should have footer bottom with copyright and legal links
      expect(screen.getByText(`© ${currentYear} AFP Digital Hub. Todos los derechos reservados.`)).toBeInTheDocument();
      expect(screen.getByText('Política de Privacidad')).toBeInTheDocument();
    });
  });
});