import { css } from 'styled-components';
import { commonStyles, tokens } from '../tokens';
import { animationOptimizations, gpuOptimizations } from '../utils/performance';
import { focusOutline, buttonReset } from '../utils/helpers';

export const buttonStyles = {
  // Base button styles - optimized for performance
  base: css`
    ${buttonReset}
    ${commonStyles.buttonBase}
    ${animationOptimizations.respectMotionTransition}
    border-radius: ${tokens.borderRadius.md};
    font-family: ${tokens.fontFamilies.sans};
    font-weight: ${tokens.fontWeights.medium};
    font-size: ${tokens.textSizes.base.fontSize};
    line-height: ${tokens.textSizes.base.lineHeight};
    padding: ${tokens.spacing[3]} ${tokens.spacing[6]};
    text-decoration: none;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: ${tokens.spacing[2]};
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }
    
    /* Enhanced focus accessibility */
    ${focusOutline(tokens.colors.primary[500])}
  `,

  // Primary button variant
  primary: css`
    background: ${tokens.colors.primary[500]};
    color: ${tokens.colors.white};
    
    &:hover:not(:disabled) {
      background: ${tokens.colors.primary[600]};
    }
    
    &:active:not(:disabled) {
      background: ${tokens.colors.primary[700]};
    }
    
    &:focus-visible {
      outline: 2px solid ${tokens.colors.primary[500]};
      outline-offset: 2px;
    }
    
    @media (prefers-color-scheme: dark) {
      background: ${tokens.colors.primary[600]};
      
      &:hover:not(:disabled) {
        background: ${tokens.colors.primary[500]};
      }
      
      &:active:not(:disabled) {
        background: ${tokens.colors.primary[400]};
      }
    }
  `,

  // Secondary button variant
  secondary: css`
    background: ${tokens.colors.neutral[100]};
    color: ${tokens.colors.neutral[900]};
    border: ${tokens.borderWidths[1]} solid ${tokens.colors.neutral[300]};
    
    &:hover:not(:disabled) {
      background: ${tokens.colors.neutral[200]};
    }
    
    &:active:not(:disabled) {
      background: ${tokens.colors.neutral[300]};
    }
    
    &:focus-visible {
      outline: 2px solid ${tokens.colors.neutral[500]};
      outline-offset: 2px;
    }
    
    @media (prefers-color-scheme: dark) {
      background: ${tokens.colors.neutral[700]};
      color: ${tokens.colors.neutral[100]};
      border-color: ${tokens.colors.neutral[600]};
      
      &:hover:not(:disabled) {
        background: ${tokens.colors.neutral[600]};
      }
      
      &:active:not(:disabled) {
        background: ${tokens.colors.neutral[500]};
      }
    }
  `,

  // Ghost button variant
  ghost: css`
    background: transparent;
    color: ${tokens.colors.primary[600]};
    border: ${tokens.borderWidths[1]} solid ${tokens.colors.primary[300]};
    
    &:hover:not(:disabled) {
      background: ${tokens.colors.primary[50]};
      border-color: ${tokens.colors.primary[400]};
    }
    
    &:active:not(:disabled) {
      background: ${tokens.colors.primary[100]};
      border-color: ${tokens.colors.primary[500]};
    }
    
    &:focus-visible {
      outline: 2px solid ${tokens.colors.primary[500]};
      outline-offset: 2px;
    }
    
    @media (prefers-color-scheme: dark) {
      color: ${tokens.colors.primary[400]};
      border-color: ${tokens.colors.primary[600]};
      
      &:hover:not(:disabled) {
        background: ${tokens.colors.primary[900]};
        border-color: ${tokens.colors.primary[500]};
      }
      
      &:active:not(:disabled) {
        background: ${tokens.colors.primary[800]};
        border-color: ${tokens.colors.primary[400]};
      }
    }
  `,

  // Enhanced button with GPU optimizations for hover effects
  enhanced: css`
    ${gpuOptimizations.smoothHover}
    
    &:hover:not(:disabled) {
      transform: translateY(-1px);
    }
    
    &:active:not(:disabled) {
      transform: translateY(0);
    }
  `,

  // Size variants
  sizes: {
    sm: css`
      padding: ${tokens.spacing[2]} ${tokens.spacing[4]};
      font-size: ${tokens.textSizes.sm.fontSize};
      line-height: ${tokens.textSizes.sm.lineHeight};
    `,
    
    md: css`
      padding: ${tokens.spacing[3]} ${tokens.spacing[6]};
      font-size: ${tokens.textSizes.base.fontSize};
      line-height: ${tokens.textSizes.base.lineHeight};
    `,
    
    lg: css`
      padding: ${tokens.spacing[4]} ${tokens.spacing[8]};
      font-size: ${tokens.textSizes.lg.fontSize};
      line-height: ${tokens.textSizes.lg.lineHeight};
    `,
  },
};