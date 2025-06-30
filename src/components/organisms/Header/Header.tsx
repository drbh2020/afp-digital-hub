import { FC, useState } from 'react';
import styled from 'styled-components';
import { layoutStyles } from '@/styles/components';
import { Button } from '@/components/atoms/Button/Button';
import { Text } from '@/components/atoms/Text/Text';

// Header component props
export interface HeaderProps {
  variant?: 'default' | 'transparent' | 'compact';
  showNavigation?: boolean;
  showAuthButtons?: boolean;
  className?: string;
}

// Styled components
const HeaderContainer = styled.header<{ variant: NonNullable<HeaderProps['variant']> }>`
  ${layoutStyles.performance.critical}
  position: sticky;
  top: 0;
  z-index: ${({ theme }) => theme.tokens.zIndex.sticky};
  width: 100%;
  transition: all 0.3s ease;
  
  ${({ variant, theme }) => {
    switch (variant) {
      case 'transparent':
        return `
          background: rgba(255, 255, 255, 0.8);
          backdrop-filter: blur(8px);
          border-bottom: ${theme.tokens.borderWidths[1]} solid ${theme.tokens.colors.neutral[200]};
        `;
      case 'compact':
        return `
          background: ${theme.tokens.colors.white};
          border-bottom: ${theme.tokens.borderWidths[1]} solid ${theme.tokens.colors.neutral[200]};
          padding: ${theme.tokens.spacing[2]} 0;
        `;
      default:
        return `
          background: ${theme.tokens.colors.white};
          border-bottom: ${theme.tokens.borderWidths[1]} solid ${theme.tokens.colors.neutral[200]};
          padding: ${theme.tokens.spacing[4]} 0;
        `;
    }
  }}
  
  @media (prefers-color-scheme: dark) {
    ${({ variant, theme }) => {
      switch (variant) {
        case 'transparent':
          return `
            background: rgba(23, 23, 23, 0.8);
            backdrop-filter: blur(8px);
            border-bottom-color: ${theme.tokens.colors.neutral[800]};
          `;
        case 'compact':
        default:
          return `
            background: ${theme.tokens.colors.neutral[900]};
            border-bottom-color: ${theme.tokens.colors.neutral[800]};
          `;
      }
    }}
  }
`;

const HeaderContent = styled.div`
  ${layoutStyles.container.sizes.lg}
  ${layoutStyles.flex.between}
  align-items: center;
`;

const Brand = styled.div`
  ${layoutStyles.flex.inlineStack}
  gap: ${({ theme }) => theme.tokens.spacing[3]};
`;

const Logo = styled.div`
  width: 40px;
  height: 40px;
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
  font-size: ${({ theme }) => theme.tokens.textSizes.lg.fontSize};
`;

const Navigation = styled.nav`
  display: none;
  
  ${({ theme }) => theme.tokens.mediaQueries.md} {
    ${layoutStyles.flex.inlineStack}
    gap: ${({ theme }) => theme.tokens.spacing[6]};
  }
`;

const NavLink = styled.a`
  ${({ theme }) => `
    font-family: ${theme.tokens.fontFamilies.sans};
    font-size: ${theme.tokens.textSizes.sm.fontSize};
    font-weight: ${theme.tokens.fontWeights.medium};
    color: ${theme.tokens.colors.neutral[700]};
    text-decoration: none;
    padding: ${theme.tokens.spacing[2]} ${theme.tokens.spacing[3]};
    border-radius: ${theme.tokens.borderRadius.md};
    transition: all 0.2s ease;
    
    &:hover {
      color: ${theme.tokens.colors.primary[600]};
      background: ${theme.tokens.colors.primary[50]};
    }
    
    &:focus {
      outline: ${theme.tokens.borderWidths[2]} solid ${theme.tokens.colors.primary[500]};
      outline-offset: 2px;
    }
    
    &[aria-current="page"] {
      color: ${theme.tokens.colors.primary[600]};
      background: ${theme.tokens.colors.primary[50]};
    }
  `}
  
  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.tokens.colors.neutral[300]};
    
    &:hover {
      color: ${({ theme }) => theme.tokens.colors.primary[400]};
      background: ${({ theme }) => theme.tokens.colors.primary[900]};
    }
    
    &[aria-current="page"] {
      color: ${({ theme }) => theme.tokens.colors.primary[400]};
      background: ${({ theme }) => theme.tokens.colors.primary[900]};
    }
  }
`;

const AuthButtons = styled.div`
  ${layoutStyles.flex.inlineStack}
  gap: ${({ theme }) => theme.tokens.spacing[3]};
`;

const MobileMenuButton = styled.button`
  ${({ theme }) => theme.tokens.mediaQueries.md} {
    display: none;
  }
  
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  background: none;
  color: ${({ theme }) => theme.tokens.colors.neutral[700]};
  cursor: pointer;
  border-radius: ${({ theme }) => theme.tokens.borderRadius.md};
  transition: all 0.2s ease;
  
  &:hover {
    background: ${({ theme }) => theme.tokens.colors.neutral[100]};
  }
  
  &:focus {
    outline: ${({ theme }) => theme.tokens.borderWidths[2]} solid ${({ theme }) => theme.tokens.colors.primary[500]};
    outline-offset: 2px;
  }
  
  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.tokens.colors.neutral[300]};
    
    &:hover {
      background: ${({ theme }) => theme.tokens.colors.neutral[800]};
    }
  }
`;

const MobileMenu = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'isOpen',
})<{ isOpen: boolean }>`
  display: ${({ isOpen }) => isOpen ? 'block' : 'none'};
  position: absolute;
  top: 100%;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.tokens.colors.white};
  border-bottom: ${({ theme }) => theme.tokens.borderWidths[1]} solid ${({ theme }) => theme.tokens.colors.neutral[200]};
  padding: ${({ theme }) => theme.tokens.spacing[4]};
  
  ${({ theme }) => theme.tokens.mediaQueries.md} {
    display: none;
  }
  
  @media (prefers-color-scheme: dark) {
    background: ${({ theme }) => theme.tokens.colors.neutral[900]};
    border-bottom-color: ${({ theme }) => theme.tokens.colors.neutral[800]};
  }
`;

const MobileNavLinks = styled.div`
  ${layoutStyles.flex.stack}
  gap: ${({ theme }) => theme.tokens.spacing[2]};
  margin-bottom: ${({ theme }) => theme.tokens.spacing[4]};
`;

const MobileNavLink = styled.a`
  ${({ theme }) => `
    font-family: ${theme.tokens.fontFamilies.sans};
    font-size: ${theme.tokens.textSizes.base.fontSize};
    font-weight: ${theme.tokens.fontWeights.medium};
    color: ${theme.tokens.colors.neutral[700]};
    text-decoration: none;
    padding: ${theme.tokens.spacing[3]};
    border-radius: ${theme.tokens.borderRadius.md};
    transition: all 0.2s ease;
    
    &:hover {
      color: ${theme.tokens.colors.primary[600]};
      background: ${theme.tokens.colors.primary[50]};
    }
    
    &:focus {
      outline: ${theme.tokens.borderWidths[2]} solid ${theme.tokens.colors.primary[500]};
      outline-offset: 2px;
    }
    
    &[aria-current="page"] {
      color: ${theme.tokens.colors.primary[600]};
      background: ${theme.tokens.colors.primary[50]};
    }
  `}
  
  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.tokens.colors.neutral[300]};
    
    &:hover {
      color: ${({ theme }) => theme.tokens.colors.primary[400]};
      background: ${({ theme }) => theme.tokens.colors.primary[900]};
    }
    
    &[aria-current="page"] {
      color: ${({ theme }) => theme.tokens.colors.primary[400]};
      background: ${({ theme }) => theme.tokens.colors.primary[900]};
    }
  }
`;

const MobileAuthButtons = styled.div`
  ${layoutStyles.flex.stack}
  gap: ${({ theme }) => theme.tokens.spacing[2]};
`;

/**
 * Header Component
 * 
 * A comprehensive header component for the AFP application with navigation,
 * branding, and authentication features.
 * 
 * Features:
 * - Sticky positioning with backdrop blur
 * - Responsive navigation with mobile menu
 * - Multiple variants (default, transparent, compact)
 * - Dark mode support
 * - Accessibility features (ARIA labels, keyboard navigation)
 * - Performance optimizations
 * - AFP branding with pension-focused navigation
 * 
 * @example
 * ```tsx
 * <Header 
 *   variant="default" 
 *   showNavigation={true}
 *   showAuthButtons={true}
 * />
 * 
 * <Header 
 *   variant="transparent" 
 *   showNavigation={false}
 * />
 * 
 * <Header 
 *   variant="compact"
 *   showNavigation={true}
 *   showAuthButtons={false}
 * />
 * ```
 */
export const Header: FC<HeaderProps> = ({
  variant = 'default',
  showNavigation = true,
  showAuthButtons = true,
  className,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <HeaderContainer variant={variant} className={className}>
      <HeaderContent>
        {/* Brand */}
        <Brand>
          <Logo aria-label="AFP Digital Hub">
            AFP
          </Logo>
          <Text as="span" variant="h4">
            AFP Digital Hub
          </Text>
        </Brand>

        {/* Desktop Navigation */}
        {showNavigation && (
          <Navigation role="navigation" aria-label="Main navigation">
            <NavLink href="/" aria-current="page">
              Inicio
            </NavLink>
            <NavLink href="/calculator">
              Calculadora
            </NavLink>
            <NavLink href="/funds">
              Fondos
            </NavLink>
            <NavLink href="/education">
              Educación
            </NavLink>
            <NavLink href="/about">
              Acerca de
            </NavLink>
          </Navigation>
        )}

        {/* Desktop Auth Buttons */}
        {showAuthButtons && (
          <AuthButtons>
            <Button variant="ghost" size="sm">
              Iniciar Sesión
            </Button>
            <Button variant="primary" size="sm">
              Registrarse
            </Button>
          </AuthButtons>
        )}

        {/* Mobile Menu Button */}
        {showNavigation && (
          <MobileMenuButton
            onClick={toggleMobileMenu}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label="Toggle navigation menu"
          >
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {isMobileMenuOpen ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </>
              )}
            </svg>
          </MobileMenuButton>
        )}
      </HeaderContent>

      {/* Mobile Menu */}
      {showNavigation && (
        <MobileMenu id="mobile-menu" isOpen={isMobileMenuOpen}>
          <MobileNavLinks>
            <MobileNavLink href="/" aria-current="page">
              Inicio
            </MobileNavLink>
            <MobileNavLink href="/calculator">
              Calculadora
            </MobileNavLink>
            <MobileNavLink href="/funds">
              Fondos
            </MobileNavLink>
            <MobileNavLink href="/education">
              Educación
            </MobileNavLink>
            <MobileNavLink href="/about">
              Acerca de
            </MobileNavLink>
          </MobileNavLinks>

          {showAuthButtons && (
            <MobileAuthButtons>
              <Button variant="ghost" size="md" style={{ width: '100%' }}>
                Iniciar Sesión
              </Button>
              <Button variant="primary" size="md" style={{ width: '100%' }}>
                Registrarse
              </Button>
            </MobileAuthButtons>
          )}
        </MobileMenu>
      )}
    </HeaderContainer>
  );
};

export default Header;