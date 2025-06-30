import { css } from 'styled-components';

// Essential performance optimizations for CSS-in-JS

// Animation performance optimizations
export const animationOptimizations = {
  // Prefer transform and opacity for animations
  optimizedTransition: css`
    transition: transform 0.2s ease-out, opacity 0.2s ease-out;
  `,
  
  // Reduce animation janks
  smoothAnimation: css`
    animation-fill-mode: both;
    animation-timing-function: ease-out;
    will-change: transform, opacity;
  `,
  
  // Pause animations for users who prefer reduced motion
  respectMotionPreference: css`
    @media (prefers-reduced-motion: reduce) {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
    }
  `,
  
  // Clean transitions without motion
  respectMotionTransition: css`
    transition: transform 0.2s ease-out, opacity 0.2s ease-out;
    
    @media (prefers-reduced-motion: reduce) {
      transition: none;
    }
  `,
};

// GPU acceleration hints for heavy animations
export const gpuOptimizations = {
  // Promote to compositing layer
  promoteLayer: css`
    transform: translateZ(0);
    will-change: transform;
  `,
  
  // For smooth hover effects
  smoothHover: css`
    transform: translateZ(0);
    transition: transform 0.2s ease-out;
    
    @media (prefers-reduced-motion: reduce) {
      transition: none;
      transform: none;
    }
  `,
};

// CSS containment for layout performance
export const containment = {
  layout: css`
    contain: layout;
  `,
  
  strict: css`
    contain: strict;
  `,
};

// Memory optimization patterns
export const memoryOptimizations = {
  // Simple will-change cleanup
  cleanupWillChange: css`
    /* Use JS to set will-change: auto after animation */
    animation-fill-mode: forwards;
  `,
  
  // Optimize for repeated renders
  staticContent: css`
    contain: strict;
  `,
};