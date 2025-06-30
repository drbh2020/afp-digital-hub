export const borderWidths = {
  0: '0px',
  1: '1px',
  2: '2px',
  4: '4px',
  8: '8px',
} as const;

export const borderRadius = {
  none: '0px',
  xs: '0.125rem',   // 2px
  sm: '0.25rem',    // 4px
  base: '0.375rem', // 6px
  md: '0.375rem',   // 6px
  lg: '0.5rem',     // 8px
  xl: '0.75rem',    // 12px
  '2xl': '1rem',    // 16px
  '3xl': '1.5rem',  // 24px
  full: '9999px',
} as const;

export const borderStyles = {
  solid: 'solid',
  dashed: 'dashed',
  dotted: 'dotted',
  double: 'double',
  none: 'none',
} as const;

export type BorderWidth = keyof typeof borderWidths;
export type BorderRadius = keyof typeof borderRadius;
export type BorderStyle = keyof typeof borderStyles;