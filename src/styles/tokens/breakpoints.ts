export const breakpoints = {
  xs: '480px',
  sm: '640px',
  md: '768px',
  lg: '1024px',
  xl: '1280px',
  '2xl': '1536px',
} as const;

export const breakpointValues = {
  xs: 480,
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  '2xl': 1536,
} as const;

// Media query helpers for styled-components
export const mediaQueries = {
  xs: `(min-width: ${breakpoints.xs})`,
  sm: `(min-width: ${breakpoints.sm})`,
  md: `(min-width: ${breakpoints.md})`,
  lg: `(min-width: ${breakpoints.lg})`,
  xl: `(min-width: ${breakpoints.xl})`,
  '2xl': `(min-width: ${breakpoints['2xl']})`,
  
  // Max-width queries
  maxXs: `(max-width: ${breakpointValues.xs - 1}px)`,
  maxSm: `(max-width: ${breakpointValues.sm - 1}px)`,
  maxMd: `(max-width: ${breakpointValues.md - 1}px)`,
  maxLg: `(max-width: ${breakpointValues.lg - 1}px)`,
  maxXl: `(max-width: ${breakpointValues.xl - 1}px)`,
  max2xl: `(max-width: ${breakpointValues['2xl'] - 1}px)`,
  
  // Between queries
  smToMd: `(min-width: ${breakpoints.sm}) and (max-width: ${breakpointValues.md - 1}px)`,
  mdToLg: `(min-width: ${breakpoints.md}) and (max-width: ${breakpointValues.lg - 1}px)`,
  lgToXl: `(min-width: ${breakpoints.lg}) and (max-width: ${breakpointValues.xl - 1}px)`,
  xlTo2xl: `(min-width: ${breakpoints.xl}) and (max-width: ${breakpointValues['2xl'] - 1}px)`,
} as const;

export type Breakpoint = keyof typeof breakpoints;
export type MediaQuery = keyof typeof mediaQueries;