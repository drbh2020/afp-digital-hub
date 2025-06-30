import { css } from 'styled-components';
import { tokens } from '../tokens';
import { container, gridResponsive } from '../utils/helpers';
import { containment, animationOptimizations } from '../utils/performance';

export const layoutStyles = {
  // Container styles
  container: {
    base: css`
      ${container('lg')}
    `,
    
    sizes: {
      xs: css`${container('xs')}`,
      sm: css`${container('sm')}`,
      md: css`${container('md')}`,
      lg: css`${container('lg')}`,
      xl: css`${container('xl')}`,
      '2xl': css`${container('2xl')}`,
    },
  },

  // Grid layouts
  grid: {
    // Responsive grid
    responsive: css`
      ${gridResponsive(1, 2, 3)}
      gap: ${tokens.spacing[6]};
    `,
    
    // Auto-fit grid
    autoFit: css`
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: ${tokens.spacing[6]};
    `,
    
    // Auto-fill grid
    autoFill: css`
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: ${tokens.spacing[4]};
    `,
  },

  // Flexbox layouts
  flex: {
    // Center content
    center: css`
      display: flex;
      align-items: center;
      justify-content: center;
    `,
    
    // Space between
    between: css`
      display: flex;
      align-items: center;
      justify-content: space-between;
    `,
    
    // Column layout
    column: css`
      display: flex;
      flex-direction: column;
    `,
    
    // Stack with gap
    stack: css`
      display: flex;
      flex-direction: column;
      gap: ${tokens.spacing[4]};
    `,
    
    // Inline stack
    inlineStack: css`
      display: flex;
      align-items: center;
      gap: ${tokens.spacing[3]};
    `,
  },

  // Section layouts
  section: {
    base: css`
      ${containment.layout}
      margin-bottom: ${tokens.spacing[12]};
    `,
    
    hero: css`
      padding-top: ${tokens.spacing[16]};
      padding-bottom: ${tokens.spacing[16]};
      text-align: center;
      
      ${tokens.mediaQueries.lg} {
        padding-top: ${tokens.spacing[24]};
        padding-bottom: ${tokens.spacing[24]};
      }
    `,
    
    content: css`
      padding-top: ${tokens.spacing[12]};
      padding-bottom: ${tokens.spacing[12]};
      
      ${tokens.mediaQueries.lg} {
        padding-top: ${tokens.spacing[16]};
        padding-bottom: ${tokens.spacing[16]};
      }
    `,
  },

  // Spacing utilities
  spacing: {
    // Stack with custom spacing
    stack: (space: keyof typeof tokens.spacing) => css`
      display: flex;
      flex-direction: column;
      gap: ${tokens.spacing[space]};
    `,
    
    // Inline with custom spacing
    inline: (space: keyof typeof tokens.spacing) => css`
      display: flex;
      align-items: center;
      gap: ${tokens.spacing[space]};
    `,
  },

  // Text utilities
  text: {
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
    
    center: css`
      text-align: center;
    `,
    
    left: css`
      text-align: left;
    `,
    
    right: css`
      text-align: right;
    `,
  },

  // Performance optimized layouts
  performance: {
    // Critical content (above the fold)
    critical: css`
      ${containment.layout}
      content-visibility: visible;
      contain: layout style;
    `,
    
    // Lazy content (below the fold)
    lazy: css`
      ${containment.layout}
      content-visibility: auto;
      contain-intrinsic-size: 0 500px;
    `,
    
    // Optimized list container
    list: css`
      ${containment.layout}
      ${animationOptimizations.respectMotionTransition}
    `,
  },
};