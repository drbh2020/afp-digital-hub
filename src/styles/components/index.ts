// Component styles library
// Re-export all component styles for easy access

export { buttonStyles } from './Button';
export { cardStyles } from './Card';
export { inputStyles } from './Input';
export { layoutStyles } from './Layout';
export { typographyStyles } from './Typography';

// Convenience object for all styles
export const componentStyles = {
  button: () => import('./Button').then(m => m.buttonStyles),
  card: () => import('./Card').then(m => m.cardStyles),
  input: () => import('./Input').then(m => m.inputStyles),
  layout: () => import('./Layout').then(m => m.layoutStyles),
  typography: () => import('./Typography').then(m => m.typographyStyles),
} as const;

// Type exports for TypeScript support
export type ButtonStyles = typeof import('./Button').buttonStyles;
export type CardStyles = typeof import('./Card').cardStyles;
export type InputStyles = typeof import('./Input').inputStyles;
export type LayoutStyles = typeof import('./Layout').layoutStyles;
export type TypographyStyles = typeof import('./Typography').typographyStyles;