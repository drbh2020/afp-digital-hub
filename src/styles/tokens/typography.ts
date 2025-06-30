export const fontFamilies = {
  sans: [
    'Inter',
    '-apple-system',
    'BlinkMacSystemFont',
    'Segoe UI',
    'Roboto',
    'Oxygen',
    'Ubuntu',
    'Cantarell',
    'Fira Sans',
    'Droid Sans',
    'Helvetica Neue',
    'sans-serif',
  ].join(', '),
  serif: [
    'Merriweather',
    'Georgia',
    'Cambria',
    'Times New Roman',
    'Times',
    'serif',
  ].join(', '),
  mono: [
    'JetBrains Mono',
    'Fira Code',
    'Monaco',
    'Consolas',
    'Liberation Mono',
    'Courier New',
    'monospace',
  ].join(', '),
} as const;

export const fontSizes = {
  xs: '0.75rem',    // 12px
  sm: '0.875rem',   // 14px
  base: '1rem',     // 16px
  lg: '1.125rem',   // 18px
  xl: '1.25rem',    // 20px
  '2xl': '1.5rem',  // 24px
  '3xl': '1.875rem', // 30px
  '4xl': '2.25rem', // 36px
  '5xl': '3rem',    // 48px
  '6xl': '3.75rem', // 60px
  '7xl': '4.5rem',  // 72px
  '8xl': '6rem',    // 96px
  '9xl': '8rem',    // 128px
} as const;

export const fontWeights = {
  thin: 100,
  extralight: 200,
  light: 300,
  normal: 400,
  medium: 500,
  semibold: 600,
  bold: 700,
  extrabold: 800,
  black: 900,
} as const;

export const lineHeights = {
  none: '1',
  tight: '1.25',
  snug: '1.375',
  normal: '1.5',
  relaxed: '1.625',
  loose: '2',
  3: '0.75rem',
  4: '1rem',
  5: '1.25rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
} as const;

export const letterSpacings = {
  tighter: '-0.05em',
  tight: '-0.025em',
  normal: '0em',
  wide: '0.025em',
  wider: '0.05em',
  widest: '0.1em',
} as const;

export const textSizes = {
  xs: {
    fontSize: fontSizes.xs,
    lineHeight: lineHeights[4],
  },
  sm: {
    fontSize: fontSizes.sm,
    lineHeight: lineHeights[5],
  },
  base: {
    fontSize: fontSizes.base,
    lineHeight: lineHeights[6],
  },
  lg: {
    fontSize: fontSizes.lg,
    lineHeight: lineHeights[7],
  },
  xl: {
    fontSize: fontSizes.xl,
    lineHeight: lineHeights[7],
  },
  '2xl': {
    fontSize: fontSizes['2xl'],
    lineHeight: lineHeights[8],
  },
  '3xl': {
    fontSize: fontSizes['3xl'],
    lineHeight: lineHeights[9],
  },
  '4xl': {
    fontSize: fontSizes['4xl'],
    lineHeight: lineHeights[10],
  },
  '5xl': {
    fontSize: fontSizes['5xl'],
    lineHeight: lineHeights.none,
  },
  '6xl': {
    fontSize: fontSizes['6xl'],
    lineHeight: lineHeights.none,
  },
  '7xl': {
    fontSize: fontSizes['7xl'],
    lineHeight: lineHeights.none,
  },
  '8xl': {
    fontSize: fontSizes['8xl'],
    lineHeight: lineHeights.none,
  },
  '9xl': {
    fontSize: fontSizes['9xl'],
    lineHeight: lineHeights.none,
  },
} as const;

export type FontFamily = keyof typeof fontFamilies;
export type FontSize = keyof typeof fontSizes;
export type FontWeight = keyof typeof fontWeights;
export type LineHeight = keyof typeof lineHeights;
export type LetterSpacing = keyof typeof letterSpacings;
export type TextSize = keyof typeof textSizes;