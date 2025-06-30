import { css } from 'styled-components';
import { tokens } from '../tokens';

export const typographyStyles = {
  // Heading styles
  headings: {
    h1: css`
      font-family: ${tokens.fontFamilies.sans};
      font-size: ${tokens.textSizes['4xl'].fontSize};
      line-height: ${tokens.textSizes['4xl'].lineHeight};
      font-weight: ${tokens.fontWeights.bold};
      letter-spacing: ${tokens.letterSpacings.tight};
      color: ${tokens.colors.neutral[900]};
      margin: 0;
      
      @media (prefers-color-scheme: dark) {
        color: ${tokens.colors.neutral[100]};
      }
    `,
    
    h2: css`
      font-family: ${tokens.fontFamilies.sans};
      font-size: ${tokens.textSizes['3xl'].fontSize};
      line-height: ${tokens.textSizes['3xl'].lineHeight};
      font-weight: ${tokens.fontWeights.bold};
      letter-spacing: ${tokens.letterSpacings.tight};
      color: ${tokens.colors.neutral[900]};
      margin: 0;
      
      @media (prefers-color-scheme: dark) {
        color: ${tokens.colors.neutral[100]};
      }
    `,
    
    h3: css`
      font-family: ${tokens.fontFamilies.sans};
      font-size: ${tokens.textSizes['2xl'].fontSize};
      line-height: ${tokens.textSizes['2xl'].lineHeight};
      font-weight: ${tokens.fontWeights.semibold};
      letter-spacing: ${tokens.letterSpacings.tight};
      color: ${tokens.colors.neutral[900]};
      margin: 0;
      
      @media (prefers-color-scheme: dark) {
        color: ${tokens.colors.neutral[100]};
      }
    `,
    
    h4: css`
      font-family: ${tokens.fontFamilies.sans};
      font-size: ${tokens.textSizes.xl.fontSize};
      line-height: ${tokens.textSizes.xl.lineHeight};
      font-weight: ${tokens.fontWeights.semibold};
      color: ${tokens.colors.neutral[900]};
      margin: 0;
      
      @media (prefers-color-scheme: dark) {
        color: ${tokens.colors.neutral[100]};
      }
    `,
    
    h5: css`
      font-family: ${tokens.fontFamilies.sans};
      font-size: ${tokens.textSizes.lg.fontSize};
      line-height: ${tokens.textSizes.lg.lineHeight};
      font-weight: ${tokens.fontWeights.medium};
      color: ${tokens.colors.neutral[900]};
      margin: 0;
      
      @media (prefers-color-scheme: dark) {
        color: ${tokens.colors.neutral[100]};
      }
    `,
    
    h6: css`
      font-family: ${tokens.fontFamilies.sans};
      font-size: ${tokens.textSizes.base.fontSize};
      line-height: ${tokens.textSizes.base.lineHeight};
      font-weight: ${tokens.fontWeights.medium};
      color: ${tokens.colors.neutral[900]};
      margin: 0;
      
      @media (prefers-color-scheme: dark) {
        color: ${tokens.colors.neutral[100]};
      }
    `,
  },

  // Body text styles
  body: {
    large: css`
      font-family: ${tokens.fontFamilies.sans};
      font-size: ${tokens.textSizes.lg.fontSize};
      line-height: ${tokens.textSizes.lg.lineHeight};
      font-weight: ${tokens.fontWeights.normal};
      color: ${tokens.colors.neutral[700]};
      
      @media (prefers-color-scheme: dark) {
        color: ${tokens.colors.neutral[300]};
      }
    `,
    
    base: css`
      font-family: ${tokens.fontFamilies.sans};
      font-size: ${tokens.textSizes.base.fontSize};
      line-height: ${tokens.textSizes.base.lineHeight};
      font-weight: ${tokens.fontWeights.normal};
      color: ${tokens.colors.neutral[700]};
      
      @media (prefers-color-scheme: dark) {
        color: ${tokens.colors.neutral[300]};
      }
    `,
    
    small: css`
      font-family: ${tokens.fontFamilies.sans};
      font-size: ${tokens.textSizes.sm.fontSize};
      line-height: ${tokens.textSizes.sm.lineHeight};
      font-weight: ${tokens.fontWeights.normal};
      color: ${tokens.colors.neutral[600]};
      
      @media (prefers-color-scheme: dark) {
        color: ${tokens.colors.neutral[400]};
      }
    `,
  },

  // Special text styles
  special: {
    lead: css`
      font-family: ${tokens.fontFamilies.sans};
      font-size: ${tokens.textSizes.xl.fontSize};
      line-height: ${tokens.textSizes.xl.lineHeight};
      font-weight: ${tokens.fontWeights.normal};
      color: ${tokens.colors.neutral[600]};
      
      @media (prefers-color-scheme: dark) {
        color: ${tokens.colors.neutral[400]};
      }
    `,
    
    caption: css`
      font-family: ${tokens.fontFamilies.sans};
      font-size: ${tokens.textSizes.xs.fontSize};
      line-height: ${tokens.textSizes.xs.lineHeight};
      font-weight: ${tokens.fontWeights.normal};
      color: ${tokens.colors.neutral[500]};
      
      @media (prefers-color-scheme: dark) {
        color: ${tokens.colors.neutral[500]};
      }
    `,
    
    code: css`
      font-family: ${tokens.fontFamilies.mono};
      font-size: ${tokens.textSizes.sm.fontSize};
      line-height: ${tokens.textSizes.sm.lineHeight};
      background: ${tokens.colors.neutral[100]};
      color: ${tokens.colors.neutral[800]};
      padding: ${tokens.spacing[1]} ${tokens.spacing[2]};
      border-radius: ${tokens.borderRadius.sm};
      
      @media (prefers-color-scheme: dark) {
        background: ${tokens.colors.neutral[800]};
        color: ${tokens.colors.neutral[200]};
      }
    `,
    
    codeBlock: css`
      font-family: ${tokens.fontFamilies.mono};
      font-size: ${tokens.textSizes.sm.fontSize};
      line-height: ${tokens.textSizes.sm.lineHeight};
      background: ${tokens.colors.neutral[900]};
      color: ${tokens.colors.neutral[100]};
      padding: ${tokens.spacing[4]};
      border-radius: ${tokens.borderRadius.md};
      overflow-x: auto;
      white-space: pre;
    `,
  },

  // Link styles
  links: {
    primary: css`
      color: ${tokens.colors.primary[600]};
      text-decoration: underline;
      text-decoration-color: transparent;
      transition: text-decoration-color 0.2s ease-in-out, color 0.2s ease-in-out;
      
      &:hover {
        color: ${tokens.colors.primary[700]};
        text-decoration-color: currentColor;
      }
      
      &:focus-visible {
        outline: 2px solid ${tokens.colors.primary[500]};
        outline-offset: 2px;
        border-radius: ${tokens.borderRadius.sm};
      }
      
      @media (prefers-color-scheme: dark) {
        color: ${tokens.colors.primary[400]};
        
        &:hover {
          color: ${tokens.colors.primary[300]};
        }
      }
    `,
    
    subtle: css`
      color: ${tokens.colors.neutral[600]};
      text-decoration: none;
      transition: color 0.2s ease-in-out;
      
      &:hover {
        color: ${tokens.colors.primary[600]};
        text-decoration: underline;
      }
      
      @media (prefers-color-scheme: dark) {
        color: ${tokens.colors.neutral[400]};
        
        &:hover {
          color: ${tokens.colors.primary[400]};
        }
      }
    `,
  },

  // Utility styles
  utilities: {
    truncate: css`
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
    `,
    
    lineClamp: (lines: number) => css`
      display: -webkit-box;
      -webkit-line-clamp: ${lines};
      -webkit-box-orient: vertical;
      overflow: hidden;
    `,
    
    uppercase: css`
      text-transform: uppercase;
      letter-spacing: ${tokens.letterSpacings.wide};
    `,
    
    noWrap: css`
      white-space: nowrap;
    `,
  },
};