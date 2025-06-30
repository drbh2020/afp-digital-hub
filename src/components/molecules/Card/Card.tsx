import { FC, HTMLAttributes, ReactNode } from 'react';
import styled from 'styled-components';
import { cardStyles } from '@/styles/components';

// Card component props
export interface CardProps extends HTMLAttributes<HTMLDivElement> {
  variant?: 'base' | 'elevated' | 'compact' | 'interactive' | 'bordered';
  semantic?: 'success' | 'warning' | 'error' | 'info';
  performance?: 'critical' | 'lazy'; // Performance optimization hint
  children?: ReactNode;
}

// Styled card component using the complete style system
const StyledCard = styled.div<Pick<CardProps, 'variant' | 'semantic' | 'performance'>>`
  ${cardStyles.base}
  
  /* Apply variant styles */
  ${({ variant = 'base' }) => {
    switch (variant) {
      case 'elevated':
        return cardStyles.elevated;
      case 'compact':
        return cardStyles.compact;
      case 'interactive':
        return cardStyles.interactive;
      case 'bordered':
        return cardStyles.bordered;
      default:
        return '';
    }
  }}
  
  /* Apply semantic color variants */
  ${({ semantic }) => {
    if (semantic && cardStyles.variants[semantic]) {
      return cardStyles.variants[semantic];
    }
    return '';
  }}
  
  /* Apply performance optimizations */
  ${({ performance }) => {
    switch (performance) {
      case 'critical':
        return cardStyles.critical;
      case 'lazy':
        return cardStyles.lazy;
      default:
        return '';
    }
  }}
`;

/**
 * Card Component
 * 
 * A flexible card molecule using the AFP design system.
 * 
 * Features:
 * - Multiple visual variants (base, elevated, compact, interactive, bordered)
 * - Semantic color variants (success, warning, error, info)
 * - Performance optimizations (critical for above-fold, lazy for below-fold)
 * - Dark mode support (automatic)
 * - Interactive states (hover, focus) when using interactive variant
 * - CSS containment for performance
 * 
 * @example
 * ```tsx
 * <Card variant="elevated" performance="critical">
 *   <h3>Calculate Your Pension</h3>
 *   <p>Enter your details to get a personalized pension calculation.</p>
 * </Card>
 * 
 * <Card variant="interactive" onClick={handleClick}>
 *   <h4>Pension Plan Option A</h4>
 *   <p>Conservative plan with guaranteed returns</p>
 * </Card>
 * 
 * <Card semantic="success" variant="bordered">
 *   <h4>Calculation Complete!</h4>
 *   <p>Your estimated pension: $2,450 per month</p>
 * </Card>
 * 
 * <Card variant="compact" performance="lazy">
 *   <p>This card uses lazy rendering for better performance</p>
 * </Card>
 * ```
 */
export const Card: FC<CardProps> = ({
  variant = 'base',
  semantic,
  performance,
  children,
  ...props
}) => {
  return (
    <StyledCard
      variant={variant}
      semantic={semantic}
      performance={performance}
      {...props}
    >
      {children}
    </StyledCard>
  );
};

export default Card;