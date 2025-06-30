import { ButtonHTMLAttributes, FC } from 'react';
import styled from 'styled-components';
import { buttonStyles } from '@/styles/components';

// Button component props
export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  enhanced?: boolean; // GPU-optimized hover effects
}

// Styled button component using the complete style system
const StyledButton = styled.button.withConfig({
  shouldForwardProp: (prop) => !['enhanced'].includes(prop)
})<ButtonProps>`
  ${buttonStyles.base}
  
  /* Apply variant styles */
  ${({ variant = 'primary' }) => {
    switch (variant) {
      case 'primary':
        return buttonStyles.primary;
      case 'secondary':
        return buttonStyles.secondary;
      case 'ghost':
        return buttonStyles.ghost;
      default:
        return buttonStyles.primary;
    }
  }}
  
  /* Apply size styles */
  ${({ size = 'md' }) => buttonStyles.sizes[size]}
  
  /* Apply enhanced GPU optimizations if requested */
  ${({ enhanced }) => enhanced && buttonStyles.enhanced}
`;

/**
 * Button Component
 * 
 * A fully-featured button component using the AFP design system.
 * 
 * Features:
 * - Dark mode support (automatic)
 * - Performance optimizations (CSS containment, GPU acceleration)
 * - Accessibility (focus-visible, reduced motion respect)
 * - Multiple variants and sizes
 * - Optional GPU-enhanced hover effects
 * 
 * @example
 * ```tsx
 * <Button variant="primary" size="lg" enhanced>
 *   Calculate Pension
 * </Button>
 * 
 * <Button variant="ghost" size="sm" onClick={handleCancel}>
 *   Cancel
 * </Button>
 * ```
 */
export const Button: FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  enhanced = false,
  children,
  ...props
}) => {
  return (
    <StyledButton
      variant={variant}
      size={size}
      enhanced={enhanced}
      {...props}
    >
      {children}
    </StyledButton>
  );
};

export default Button;