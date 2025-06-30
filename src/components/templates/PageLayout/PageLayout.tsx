import { FC, ReactNode } from 'react';
import styled from 'styled-components';
import { layoutStyles } from '@/styles/components';
import { Header, HeaderProps } from '@/components/organisms/Header/Header';
import { Footer, FooterProps } from '@/components/organisms/Footer/Footer';

// PageLayout component props
export interface PageLayoutProps {
  children: ReactNode;
  headerProps?: HeaderProps;
  footerProps?: FooterProps;
  showHeader?: boolean;
  showFooter?: boolean;
  containerSize?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  spacing?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
}

// Styled components
const LayoutContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  min-height: 100dvh;
  position: relative;
`;

const MainContent = styled.main.withConfig({
  shouldForwardProp: (prop) => !['containerSize', 'spacing'].includes(prop),
})<{
  containerSize: NonNullable<PageLayoutProps['containerSize']>;
  spacing: NonNullable<PageLayoutProps['spacing']>;
}>`
  flex: 1;
  display: flex;
  flex-direction: column;
  
  ${({ containerSize }) => {
    if (containerSize === 'full') {
      return `
        width: 100%;
        max-width: none;
        padding-left: 0;
        padding-right: 0;
      `;
    }
    return layoutStyles.container.sizes[containerSize];
  }}
  
  ${({ spacing, theme }) => {
    switch (spacing) {
      case 'none':
        return `
          padding-top: 0;
          padding-bottom: 0;
        `;
      case 'sm':
        return `
          padding-top: ${theme.tokens.spacing[4]};
          padding-bottom: ${theme.tokens.spacing[4]};
        `;
      case 'md':
        return `
          padding-top: ${theme.tokens.spacing[8]};
          padding-bottom: ${theme.tokens.spacing[8]};
        `;
      case 'lg':
        return `
          padding-top: ${theme.tokens.spacing[12]};
          padding-bottom: ${theme.tokens.spacing[12]};
        `;
      case 'xl':
        return `
          padding-top: ${theme.tokens.spacing[16]};
          padding-bottom: ${theme.tokens.spacing[16]};
        `;
      default:
        return `
          padding-top: ${theme.tokens.spacing[8]};
          padding-bottom: ${theme.tokens.spacing[8]};
        `;
    }
  }}
`;

const ContentWrapper = styled.div.withConfig({
  shouldForwardProp: (prop) => prop !== 'containerSize',
})<{ 
  containerSize: NonNullable<PageLayoutProps['containerSize']>;
}>`
  ${({ containerSize }) => {
    if (containerSize === 'full') {
      return `
        width: 100%;
        max-width: none;
      `;
    }
    return `
      width: 100%;
      max-width: 100%;
    `;
  }}
  
  ${layoutStyles.performance.critical}
  position: relative;
`;

const SkipLink = styled.a`
  position: absolute;
  top: -40px;
  left: 6px;
  background: ${({ theme }) => theme.tokens.colors.primary[600]};
  color: ${({ theme }) => theme.tokens.colors.white};
  padding: ${({ theme }) => theme.tokens.spacing[2]} ${({ theme }) => theme.tokens.spacing[4]};
  text-decoration: none;
  border-radius: ${({ theme }) => theme.tokens.borderRadius.md};
  font-weight: ${({ theme }) => theme.tokens.fontWeights.medium};
  font-size: ${({ theme }) => theme.tokens.textSizes.sm.fontSize};
  z-index: ${({ theme }) => theme.tokens.zIndex.skipLink};
  transition: all 0.2s ease;
  
  &:focus {
    top: 6px;
  }
  
  &:hover {
    background: ${({ theme }) => theme.tokens.colors.primary[700]};
  }
`;

/**
 * PageLayout Template Component
 * 
 * A comprehensive page layout template that provides consistent structure
 * for all pages in the AFP application.
 * 
 * Features:
 * - Flexible header and footer configuration
 * - Multiple container sizes and spacing options
 * - Accessibility features (skip links, semantic structure)
 * - Performance optimizations
 * - Responsive design
 * - Dark mode support
 * - SEO-friendly structure
 * - Proper focus management
 * 
 * @example
 * ```tsx
 * // Basic layout
 * <PageLayout>
 *   <h1>Welcome to AFP Digital Hub</h1>
 *   <p>Your pension planning portal</p>
 * </PageLayout>
 * 
 * // Custom header and footer
 * <PageLayout
 *   headerProps={{ variant: 'transparent', showAuthButtons: false }}
 *   footerProps={{ variant: 'minimal' }}
 * >
 *   <LandingPageContent />
 * </PageLayout>
 * 
 * // Full width layout with no spacing
 * <PageLayout
 *   containerSize="full"
 *   spacing="none"
 *   showHeader={false}
 *   showFooter={false}
 * >
 *   <AppShellContent />
 * </PageLayout>
 * 
 * // Compact layout
 * <PageLayout
 *   containerSize="md"
 *   spacing="sm"
 *   headerProps={{ variant: 'compact' }}
 *   footerProps={{ variant: 'minimal' }}
 * >
 *   <FormContent />
 * </PageLayout>
 * ```
 */
export const PageLayout: FC<PageLayoutProps> = ({
  children,
  headerProps = {},
  footerProps = {},
  showHeader = true,
  showFooter = true,
  containerSize = 'lg',
  spacing = 'md',
  className,
}) => {
  return (
    <LayoutContainer className={className}>
      {/* Accessibility: Skip to main content link */}
      <SkipLink href="#main-content">
        Ir al contenido principal
      </SkipLink>

      {/* Header */}
      {showHeader && (
        <Header {...headerProps} />
      )}

      {/* Main Content */}
      <MainContent
        id="main-content"
        containerSize={containerSize}
        spacing={spacing}
        role="main"
        aria-label="Contenido principal"
      >
        <ContentWrapper containerSize={containerSize}>
          {children}
        </ContentWrapper>
      </MainContent>

      {/* Footer */}
      {showFooter && (
        <Footer {...footerProps} />
      )}
    </LayoutContainer>
  );
};

export default PageLayout;