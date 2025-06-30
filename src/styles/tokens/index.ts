// Re-exports for individual token access
export * from './colors';
export * from './spacing';
export * from './breakpoints';
export * from './typography';
export * from './shadows';
export * from './borders';
export * from './z-index';

// Lazy imports for better tree-shaking
import { colors } from './colors';
import { spacing, containerSizes } from './spacing';
import { breakpoints, mediaQueries } from './breakpoints';
import { fontFamilies, fontSizes, fontWeights, lineHeights, letterSpacings, textSizes } from './typography';
import { shadows, dropShadows } from './shadows';
import { borderWidths, borderRadius, borderStyles } from './borders';
import { zIndex } from './z-index';

// Optimized tokens object - frozen for immutability and performance
export const tokens = {
  colors,
  spacing,
  containerSizes,
  breakpoints,
  mediaQueries,
  fontFamilies,
  fontSizes,
  fontWeights,
  lineHeights,
  letterSpacings,
  textSizes,
  shadows,
  dropShadows,
  borderWidths,
  borderRadius,
  borderStyles,
  zIndex,
} as const;

export type Tokens = typeof tokens;

// Complete component styles with dark mode support - Single source of truth
export const commonStyles = {
  // Pre-built button styles with performance optimizations
  buttonBase: `
    font-family: ${tokens.fontFamilies.sans};
    font-weight: ${tokens.fontWeights.medium};
    border-radius: ${tokens.borderRadius.md};
    transition: transform 0.2s ease-out, opacity 0.2s ease-out, background-color 0.2s ease-out;
    cursor: pointer;
    border: none;
    
    &:disabled {
      opacity: 0.6;
      cursor: not-allowed;
    }
    
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  `,
  
  // Pre-built input styles with dark mode support
  inputBase: `
    font-family: ${tokens.fontFamilies.sans};
    font-size: ${tokens.fontSizes.base};
    border: ${tokens.borderWidths[1]} solid ${tokens.colors.neutral[300]};
    border-radius: ${tokens.borderRadius.md};
    padding: ${tokens.spacing[3]} ${tokens.spacing[4]};
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;
    background: ${tokens.colors.white};
    color: ${tokens.colors.neutral[900]};
    
    &:focus {
      outline: none;
      border-color: ${tokens.colors.primary[500]};
      box-shadow: 0 0 0 3px ${tokens.colors.primary[500]}20;
    }
    
    &::placeholder {
      color: ${tokens.colors.neutral[400]};
    }
    
    @media (prefers-color-scheme: dark) {
      background: ${tokens.colors.neutral[800]};
      color: ${tokens.colors.neutral[100]};
      border-color: ${tokens.colors.neutral[600]};
      
      &::placeholder {
        color: ${tokens.colors.neutral[500]};
      }
      
      &:focus {
        border-color: ${tokens.colors.primary[400]};
        box-shadow: 0 0 0 3px ${tokens.colors.primary[400]}20;
      }
    }
  `,
  
  // Pre-built card styles with dark mode support and performance optimizations
  cardBase: `
    background: ${tokens.colors.white};
    color: ${tokens.colors.neutral[900]};
    border-radius: ${tokens.borderRadius.lg};
    box-shadow: ${tokens.shadows.sm};
    border: ${tokens.borderWidths[1]} solid ${tokens.colors.neutral[200]};
    transition: box-shadow 0.2s ease-out, transform 0.2s ease-out;
    contain: layout;
    
    @media (prefers-color-scheme: dark) {
      background: ${tokens.colors.neutral[800]};
      color: ${tokens.colors.neutral[100]};
      border-color: ${tokens.colors.neutral[700]};
    }
    
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  `,
  
  // Enhanced card with hover effects
  cardElevated: `
    background: ${tokens.colors.white};
    color: ${tokens.colors.neutral[900]};
    border-radius: ${tokens.borderRadius.lg};
    box-shadow: ${tokens.shadows.sm};
    border: ${tokens.borderWidths[1]} solid ${tokens.colors.neutral[200]};
    transition: box-shadow 0.2s ease-out, transform 0.2s ease-out;
    contain: layout;
    transform: translateZ(0);
    
    &:hover {
      box-shadow: ${tokens.shadows.lg};
      transform: translateY(-2px);
    }
    
    @media (prefers-color-scheme: dark) {
      background: ${tokens.colors.neutral[800]};
      color: ${tokens.colors.neutral[100]};
      border-color: ${tokens.colors.neutral[700]};
    }
    
    @media (prefers-reduced-motion: reduce) {
      transition: none;
      
      &:hover {
        transform: none;
      }
    }
  `,
} as const;