import { FC } from 'react';
import styled from 'styled-components';
import { layoutStyles } from '@/styles/components';
import { Text } from '@/components/atoms/Text/Text';

// Footer component props
export interface FooterProps {
  variant?: 'default' | 'minimal' | 'extended';
  showSocialLinks?: boolean;
  className?: string;
}

// Styled components
const FooterContainer = styled.footer<{ variant: NonNullable<FooterProps['variant']> }>`
  ${layoutStyles.performance.lazy}
  background: ${({ theme }) => theme.tokens.colors.neutral[900]};
  color: ${({ theme }) => theme.tokens.colors.neutral[300]};
  margin-top: auto;
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'minimal':
        return `
          padding: ${theme.tokens.spacing[6]} 0;
        `;
      case 'extended':
        return `
          padding: ${theme.tokens.spacing[12]} 0 ${theme.tokens.spacing[6]} 0;
        `;
      default:
        return `
          padding: ${theme.tokens.spacing[8]} 0 ${theme.tokens.spacing[6]} 0;
        `;
    }
  }}
  
  @media (prefers-color-scheme: dark) {
    background: ${({ theme }) => theme.tokens.colors.black};
    color: ${({ theme }) => theme.tokens.colors.neutral[400]};
  }
`;

const FooterContent = styled.div`
  ${layoutStyles.container.sizes.lg}
`;

const FooterMain = styled.div<{ variant: NonNullable<FooterProps['variant']> }>`
  ${({ variant, theme }) => {
    if (variant === 'minimal') {
      return layoutStyles.flex.center;
    }
    return `
      display: grid;
      grid-template-columns: 1fr;
      gap: ${theme.tokens.spacing[8]};
      margin-bottom: ${theme.tokens.spacing[8]};
      
      @media ${theme.tokens.mediaQueries.md} {
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: auto auto;
        grid-auto-rows: auto;
        gap: ${theme.tokens.spacing[12]};
      }
    `;
  }}
`;

const FooterSection = styled.div`
  ${layoutStyles.flex.stack}
  gap: ${({ theme }) => theme.tokens.spacing[4]};
  
  @media ${({ theme }) => theme.tokens.mediaQueries.md} {
    grid-row-start: 2;
  }
`;

const FooterBrand = styled.div`
  ${layoutStyles.flex.stack}
  gap: ${({ theme }) => theme.tokens.spacing[4]};

  @media ${({ theme }) => theme.tokens.mediaQueries.md} {
    grid-column: 1 / -1;
    grid-row: 1;
  }
`;

const Logo = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.tokens.colors.primary[500]}, 
    ${({ theme }) => theme.tokens.colors.secondary[500]}
  );
  border-radius: ${({ theme }) => theme.tokens.borderRadius.lg};
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${({ theme }) => theme.tokens.colors.white};
  font-weight: ${({ theme }) => theme.tokens.fontWeights.bold};
  font-size: ${({ theme }) => theme.tokens.textSizes.xl.fontSize};
`;

const FooterLinkList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  ${layoutStyles.flex.stack}
  gap: ${({ theme }) => theme.tokens.spacing[3]};
`;

const FooterLink = styled.a`
  ${({ theme }) => `
    font-family: ${theme.tokens.fontFamilies.sans};
    font-size: ${theme.tokens.textSizes.sm.fontSize};
    color: ${theme.tokens.colors.neutral[300]};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${theme.tokens.colors.primary[400]};
    }
    
    &:focus {
      outline: ${theme.tokens.borderWidths[2]} solid ${theme.tokens.colors.primary[500]};
      outline-offset: 2px;
      border-radius: ${theme.tokens.borderRadius.sm};
    }
  `}
  
  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.tokens.colors.neutral[400]};
    
    &:hover {
      color: ${({ theme }) => theme.tokens.colors.primary[300]};
    }
  }
`;

const SocialLinks = styled.div`
  ${layoutStyles.flex.inlineStack}
  gap: ${({ theme }) => theme.tokens.spacing[4]};
`;

const SocialLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.tokens.borderRadius.full};
  background: ${({ theme }) => theme.tokens.colors.neutral[800]};
  color: ${({ theme }) => theme.tokens.colors.neutral[300]};
  text-decoration: none;
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.tokens.colors.primary[600]};
    color: ${({ theme }) => theme.tokens.colors.white};
    transform: translateY(-2px);
  }
  
  &:focus {
    outline: ${({ theme }) => theme.tokens.borderWidths[2]} solid ${({ theme }) => theme.tokens.colors.primary[500]};
    outline-offset: 2px;
  }
  
  @media (prefers-color-scheme: dark) {
    background: ${({ theme }) => theme.tokens.colors.neutral[700]};
    color: ${({ theme }) => theme.tokens.colors.neutral[400]};
    
    &:hover {
      background: ${({ theme }) => theme.tokens.colors.primary[500]};
      color: ${({ theme }) => theme.tokens.colors.white};
    }
  }
`;

const FooterBottom = styled.div`
  ${layoutStyles.flex.between}
  align-items: center;
  padding-top: ${({ theme }) => theme.tokens.spacing[6]};
  border-top: ${({ theme }) => theme.tokens.borderWidths[1]} solid ${({ theme }) => theme.tokens.colors.neutral[800]};
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.tokens.spacing[4]};
  
  @media (prefers-color-scheme: dark) {
    border-top-color: ${({ theme }) => theme.tokens.colors.neutral[700]};
  }
`;

const LegalLinks = styled.div`
  ${layoutStyles.flex.inlineStack}
  gap: ${({ theme }) => theme.tokens.spacing[4]};
  flex-wrap: wrap;
`;

const LegalLink = styled.a`
  ${({ theme }) => `
    font-family: ${theme.tokens.fontFamilies.sans};
    font-size: ${theme.tokens.textSizes.xs.fontSize};
    color: ${theme.tokens.colors.neutral[400]};
    text-decoration: none;
    transition: color 0.2s ease;
    
    &:hover {
      color: ${theme.tokens.colors.primary[400]};
    }
    
    &:focus {
      outline: ${theme.tokens.borderWidths[2]} solid ${theme.tokens.colors.primary[500]};
      outline-offset: 2px;
      border-radius: ${theme.tokens.borderRadius.sm};
    }
  `}
  
  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.tokens.colors.neutral[500]};
    
    &:hover {
      color: ${({ theme }) => theme.tokens.colors.primary[300]};
    }
  }
`;

/**
 * Footer Component
 * 
 * A comprehensive footer component for the AFP application with links,
 * branding, and contact information.
 * 
 * Features:
 * - Multiple variants (default, minimal, extended)
 * - Responsive grid layout
 * - Social media links
 * - Legal links and compliance information
 * - Dark mode support
 * - Accessibility features
 * - Performance optimizations (lazy loading)
 * - AFP-specific content and branding
 * 
 * @example
 * ```tsx
 * <Footer 
 *   variant="default" 
 *   showSocialLinks={true}
 * />
 * 
 * <Footer 
 *   variant="minimal" 
 *   showSocialLinks={false}
 * />
 * 
 * <Footer 
 *   variant="extended"
 *   showSocialLinks={true}
 * />
 * ```
 */
export const Footer: FC<FooterProps> = ({
  variant = 'default',
  showSocialLinks = true,
  className,
}) => {
  const currentYear = new Date().getFullYear();

  if (variant === 'minimal') {
    return (
      <FooterContainer variant={variant} className={className}>
        <FooterContent>
          <FooterMain variant={variant}>
            <Text as="p" variant="bodySmall">
              © {currentYear} AFP Digital Hub. Todos los derechos reservados.
            </Text>
          </FooterMain>
        </FooterContent>
      </FooterContainer>
    );
  }

  return (
    <FooterContainer variant={variant} className={className}>
      <FooterContent>
        <FooterMain variant={variant}>
          {/* Brand and Description */}
          <FooterBrand>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Logo aria-label="AFP Digital Hub">
                AFP
              </Logo>
              <Text as="span" variant="h4" style={{ color: 'inherit' }}>
                AFP Digital Hub
              </Text>
            </div>
            <Text as="p" variant="bodySmall" style={{ maxWidth: '280px' }}>
              Tu aliado confiable en la planificación financiera para el retiro. 
              Herramientas y recursos para asegurar tu futuro.
            </Text>
            {showSocialLinks && (
              <SocialLinks>
                <SocialLink 
                  href="https://facebook.com" 
                  aria-label="Síguenos en Facebook"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                  </svg>
                </SocialLink>
                <SocialLink 
                  href="https://twitter.com" 
                  aria-label="Síguenos en Twitter"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                  </svg>
                </SocialLink>
                <SocialLink 
                  href="https://linkedin.com" 
                  aria-label="Conéctate en LinkedIn"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </SocialLink>
                <SocialLink 
                  href="https://youtube.com" 
                  aria-label="Suscríbete a nuestro canal de YouTube"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                  </svg>
                </SocialLink>
              </SocialLinks>
            )}
          </FooterBrand>

          {/* Services */}
          <FooterSection>
            <Text as="h4" variant="h5" style={{ color: 'white' }}>
              Servicios
            </Text>
            <FooterLinkList>
              <li>
                <FooterLink href="/calculator">
                  Calculadora de Pensión
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/funds">
                  Administración de Fondos
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/investment">
                  Opciones de Inversión
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/advisory">
                  Asesoría Personalizada
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/reports">
                  Reportes y Estados
                </FooterLink>
              </li>
            </FooterLinkList>
          </FooterSection>

          {/* Resources */}
          <FooterSection>
            <Text as="h4" variant="h5" style={{ color: 'white' }}>
              Recursos
            </Text>
            <FooterLinkList>
              <li>
                <FooterLink href="/education">
                  Educación Financiera
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/articles">
                  Artículos y Guías
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/tools">
                  Herramientas
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/faq">
                  Preguntas Frecuentes
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/support">
                  Centro de Ayuda
                </FooterLink>
              </li>
            </FooterLinkList>
          </FooterSection>

          {/* Company */}
          <FooterSection>
            <Text as="h4" variant="h5" style={{ color: 'white' }}>
              Empresa
            </Text>
            <FooterLinkList>
              <li>
                <FooterLink href="/about">
                  Acerca de Nosotros
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/careers">
                  Trabaja con Nosotros
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/news">
                  Noticias
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/contact">
                  Contacto
                </FooterLink>
              </li>
              <li>
                <FooterLink href="/locations">
                  Sucursales
                </FooterLink>
              </li>
            </FooterLinkList>
          </FooterSection>
        </FooterMain>

        {/* Footer Bottom */}
        <FooterBottom>
          <Text as="p" variant="bodySmall">
            © {currentYear} AFP Digital Hub. Todos los derechos reservados.
          </Text>
          <LegalLinks>
            <LegalLink href="/privacy">
              Política de Privacidad
            </LegalLink>
            <LegalLink href="/terms">
              Términos de Uso
            </LegalLink>
            <LegalLink href="/cookies">
              Política de Cookies
            </LegalLink>
            <LegalLink href="/regulations">
              Marco Regulatorio
            </LegalLink>
          </LegalLinks>
        </FooterBottom>
      </FooterContent>
    </FooterContainer>
  );
};

export default Footer;