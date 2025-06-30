import { css } from 'styled-components';
import { commonStyles, tokens } from '../tokens';
import { animationOptimizations } from '../utils/performance';

export const inputStyles = {
  // Base input styles
  base: css`
    ${commonStyles.inputBase}
    ${animationOptimizations.respectMotionTransition}
    font-family: ${tokens.fontFamilies.sans};
    font-size: ${tokens.textSizes.base.fontSize};
    line-height: ${tokens.textSizes.base.lineHeight};
    
    &::placeholder {
      color: ${tokens.colors.neutral[500]};
    }
    
    &:disabled {
      opacity: 0.5;
      cursor: not-allowed;
      background: ${tokens.colors.neutral[100]};
      
      @media (prefers-color-scheme: dark) {
        background: ${tokens.colors.neutral[800]};
      }
    }
  `,

  // Input states
  states: {
    default: css`
      border-color: ${tokens.colors.neutral[300]};
      
      &:focus {
        border-color: ${tokens.colors.primary[500]};
        box-shadow: 0 0 0 3px ${tokens.colors.primary[500]}20;
        outline: none;
      }
      
      @media (prefers-color-scheme: dark) {
        border-color: ${tokens.colors.neutral[600]};
        
        &:focus {
          border-color: ${tokens.colors.primary[400]};
          box-shadow: 0 0 0 3px ${tokens.colors.primary[400]}20;
        }
      }
    `,
    
    error: css`
      border-color: ${tokens.colors.error[500]};
      
      &:focus {
        border-color: ${tokens.colors.error[600]};
        box-shadow: 0 0 0 3px ${tokens.colors.error[500]}20;
        outline: none;
      }
      
      @media (prefers-color-scheme: dark) {
        border-color: ${tokens.colors.error[400]};
        
        &:focus {
          border-color: ${tokens.colors.error[300]};
          box-shadow: 0 0 0 3px ${tokens.colors.error[400]}20;
        }
      }
    `,
    
    success: css`
      border-color: ${tokens.colors.success[500]};
      
      &:focus {
        border-color: ${tokens.colors.success[600]};
        box-shadow: 0 0 0 3px ${tokens.colors.success[500]}20;
        outline: none;
      }
      
      @media (prefers-color-scheme: dark) {
        border-color: ${tokens.colors.success[400]};
        
        &:focus {
          border-color: ${tokens.colors.success[300]};
          box-shadow: 0 0 0 3px ${tokens.colors.success[400]}20;
        }
      }
    `,
  },

  // Size variants
  sizes: {
    sm: css`
      padding: ${tokens.spacing[2]} ${tokens.spacing[3]};
      font-size: ${tokens.textSizes.sm.fontSize};
      line-height: ${tokens.textSizes.sm.lineHeight};
    `,
    
    md: css`
      padding: ${tokens.spacing[3]} ${tokens.spacing[4]};
      font-size: ${tokens.textSizes.base.fontSize};
      line-height: ${tokens.textSizes.base.lineHeight};
    `,
    
    lg: css`
      padding: ${tokens.spacing[4]} ${tokens.spacing[5]};
      font-size: ${tokens.textSizes.lg.fontSize};
      line-height: ${tokens.textSizes.lg.lineHeight};
    `,
  },

  // Input variants
  variants: {
    // Search input
    search: css`
      padding-left: ${tokens.spacing[10]};
      background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z'/%3e%3c/svg%3e");
      background-position: left ${tokens.spacing[3]} center;
      background-repeat: no-repeat;
      background-size: 16px 16px;
    `,
    
    // Textarea
    textarea: css`
      min-height: 120px;
      resize: vertical;
      line-height: 1.5;
    `,
  },
};