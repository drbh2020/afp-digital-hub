import { css } from 'styled-components';
import { commonStyles, tokens } from '../tokens';
import { containment, animationOptimizations } from '../utils/performance';

export const cardStyles = {
  // Base card styles - using commonStyles for consistency
  base: css`
    ${commonStyles.cardBase}
    ${containment.layout}
    ${animationOptimizations.respectMotionTransition}
  `,

  // Elevated card with shadow and hover effects
  elevated: css`
    ${commonStyles.cardElevated}
    ${containment.layout}
    ${animationOptimizations.respectMotionTransition}
    
    &:hover {
      box-shadow: ${tokens.shadows.xl};
    }
  `,

  // Compact card variant
  compact: css`
    ${commonStyles.cardBase}
    padding: ${tokens.spacing[4]};
  `,

  // Interactive card with hover states
  interactive: css`
    cursor: pointer;
    
    &:hover {
      box-shadow: ${tokens.shadows.lg};
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
      box-shadow: ${tokens.shadows.md};
    }
    
    &:focus-visible {
      outline: 2px solid ${tokens.colors.primary[500]};
      outline-offset: 2px;
    }
  `,

  // Card with border variants
  bordered: css`
    border: ${tokens.borderWidths[1]} solid ${tokens.colors.neutral[200]};
    
    @media (prefers-color-scheme: dark) {
      border-color: ${tokens.colors.neutral[700]};
    }
  `,

  // Critical path optimized card (above-the-fold)
  critical: css`
    content-visibility: visible;
    contain: layout style;
  `,

  // Lazy-loaded card (below-the-fold)
  lazy: css`
    content-visibility: auto;
    contain-intrinsic-size: 0 200px;
  `,

  // Semantic color variants
  variants: {
    success: css`
      background: ${tokens.colors.success[50]};
      border: 2px solid ${tokens.colors.success[200]};
      color: ${tokens.colors.success[900]};
      
      @media (prefers-color-scheme: dark) {
        background: ${tokens.colors.success[900]};
        border-color: ${tokens.colors.success[700]};
        color: ${tokens.colors.success[100]};
      }
    `,
    
    warning: css`
      background: ${tokens.colors.warning[50]};
      border: 2px solid ${tokens.colors.warning[200]};
      color: ${tokens.colors.warning[900]};
      
      @media (prefers-color-scheme: dark) {
        background: ${tokens.colors.warning[900]};
        border-color: ${tokens.colors.warning[700]};
        color: ${tokens.colors.warning[100]};
      }
    `,
    
    error: css`
      background: ${tokens.colors.error[50]};
      border: 2px solid ${tokens.colors.error[200]};
      color: ${tokens.colors.error[900]};
      
      @media (prefers-color-scheme: dark) {
        background: ${tokens.colors.error[900]};
        border-color: ${tokens.colors.error[700]};
        color: ${tokens.colors.error[100]};
      }
    `,
    
    info: css`
      background: ${tokens.colors.info[50]};
      border: 2px solid ${tokens.colors.info[200]};
      color: ${tokens.colors.info[900]};
      
      @media (prefers-color-scheme: dark) {
        background: ${tokens.colors.info[900]};
        border-color: ${tokens.colors.info[700]};
        color: ${tokens.colors.info[100]};
      }
    `,
  },
};