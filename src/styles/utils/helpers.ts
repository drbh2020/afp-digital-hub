import { tokens } from '../tokens';

// Media query helper functions for styled-components
export const media = {
  xs: `@media ${tokens.mediaQueries.xs}`,
  sm: `@media ${tokens.mediaQueries.sm}`,
  md: `@media ${tokens.mediaQueries.md}`,
  lg: `@media ${tokens.mediaQueries.lg}`,
  xl: `@media ${tokens.mediaQueries.xl}`,
  '2xl': `@media ${tokens.mediaQueries['2xl']}`,
  
  maxXs: `@media ${tokens.mediaQueries.maxXs}`,
  maxSm: `@media ${tokens.mediaQueries.maxSm}`,
  maxMd: `@media ${tokens.mediaQueries.maxMd}`,
  maxLg: `@media ${tokens.mediaQueries.maxLg}`,
  maxXl: `@media ${tokens.mediaQueries.maxXl}`,
  max2xl: `@media ${tokens.mediaQueries.max2xl}`,
  
  smToMd: `@media ${tokens.mediaQueries.smToMd}`,
  mdToLg: `@media ${tokens.mediaQueries.mdToLg}`,
  lgToXl: `@media ${tokens.mediaQueries.lgToXl}`,
  xlTo2xl: `@media ${tokens.mediaQueries.xlTo2xl}`,
};

// Container helper function
export const container = (size: keyof typeof tokens.containerSizes = 'xl') => `
  max-width: ${tokens.containerSizes[size]};
  margin-left: auto;
  margin-right: auto;
  padding-left: ${tokens.spacing[4]};
  padding-right: ${tokens.spacing[4]};
  
  ${media.sm} {
    padding-left: ${tokens.spacing[6]};
    padding-right: ${tokens.spacing[6]};
  }
  
  ${media.lg} {
    padding-left: ${tokens.spacing[8]};
    padding-right: ${tokens.spacing[8]};
  }
`;

// Focus outline helper
export const focusOutline = (color = tokens.colors.primary[500]) => `
  &:focus {
    outline: 2px solid ${color};
    outline-offset: 2px;
  }
  
  &:focus:not(:focus-visible) {
    outline: none;
  }
`;

// Visually hidden helper (for screen readers)
export const visuallyHidden = `
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
  white-space: nowrap !important;
  border: 0 !important;
`;

// Truncate text helper
export const truncate = `
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

// Line clamp helper
export const lineClamp = (lines: number) => `
  display: -webkit-box;
  -webkit-line-clamp: ${lines};
  -webkit-box-orient: vertical;
  overflow: hidden;
`;

// Button reset helper
export const buttonReset = `
  background: none;
  border: none;
  padding: 0;
  margin: 0;
  font: inherit;
  color: inherit;
  text-decoration: none;
  cursor: pointer;
  
  &:disabled {
    cursor: not-allowed;
  }
`;

// Aspect ratio helper
export const aspectRatio = (ratio: string) => `
  aspect-ratio: ${ratio};
  
  @supports not (aspect-ratio: ${ratio}) {
    &::before {
      content: '';
      display: block;
      padding-bottom: ${ratio.split('/').reduce((a, b) => `${(parseFloat(b) / parseFloat(a)) * 100}%`)};
    }
  }
`;

// Grid helpers
export const gridColumns = (columns: number, gap = tokens.spacing[4]) => `
  display: grid;
  grid-template-columns: repeat(${columns}, 1fr);
  gap: ${gap};
`;

export const gridResponsive = (
  mobile = 1,
  tablet = 2,
  desktop = 3,
  gap = tokens.spacing[4]
) => `
  display: grid;
  grid-template-columns: repeat(${mobile}, 1fr);
  gap: ${gap};
  
  ${media.sm} {
    grid-template-columns: repeat(${tablet}, 1fr);
  }
  
  ${media.lg} {
    grid-template-columns: repeat(${desktop}, 1fr);
  }
`;

// Flex helpers
export const flexCenter = `
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const flexBetween = `
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const flexColumn = `
  display: flex;
  flex-direction: column;
`;

// Animation helpers
export const transition = (
  property = 'all',
  duration = '0.2s',
  easing = 'ease-in-out'
) => `
  transition: ${property} ${duration} ${easing};
`;

export const fadeIn = `
  @keyframes fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  
  animation: fadeIn 0.3s ease-in-out;
`;

export const slideIn = (direction: 'up' | 'down' | 'left' | 'right' = 'up') => {
  const transforms = {
    up: 'translateY(20px)',
    down: 'translateY(-20px)',
    left: 'translateX(20px)',
    right: 'translateX(-20px)',
  };
  
  return `
    @keyframes slideIn${direction.charAt(0).toUpperCase() + direction.slice(1)} {
      from {
        opacity: 0;
        transform: ${transforms[direction]};
      }
      to {
        opacity: 1;
        transform: translateX(0) translateY(0);
      }
    }
    
    animation: slideIn${direction.charAt(0).toUpperCase() + direction.slice(1)} 0.3s ease-out;
  `;
};