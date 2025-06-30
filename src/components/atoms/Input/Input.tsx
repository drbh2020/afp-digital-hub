import { forwardRef, InputHTMLAttributes, TextareaHTMLAttributes } from 'react';
import styled from 'styled-components';
import { inputStyles } from '@/styles/components';
import { visuallyHidden } from '@/styles/utils/helpers';

// Input component props
export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  variant?: 'default' | 'search' | 'textarea';
  state?: 'default' | 'error' | 'success';
  inputSize?: 'sm' | 'md' | 'lg';
  label?: string;
  errorMessage?: string;
  successMessage?: string;
  hideLabel?: boolean; // Visually hide label but keep for screen readers
}

// Styled input component using the complete style system
const StyledInput = styled.input.withConfig({
  shouldForwardProp: (prop) => !['variant', 'state', 'inputSize'].includes(prop)
})<Pick<InputProps, 'variant' | 'state' | 'inputSize'>>`
  ${inputStyles.base}
  
  /* Apply state styles */
  ${({ state = 'default' }) => inputStyles.states[state]}
  
  /* Apply size styles */
  ${({ inputSize = 'md' }) => inputStyles.sizes[inputSize]}
  
  /* Apply variant styles */
  ${({ variant }) => {
    if (variant === 'search') return inputStyles.variants.search;
    return '';
  }}
`;

const StyledTextarea = styled.textarea.withConfig({
  shouldForwardProp: (prop) => !['state', 'inputSize'].includes(prop)
})<Pick<InputProps, 'state' | 'inputSize'>>`
  ${inputStyles.base}
  ${inputStyles.variants.textarea}
  
  /* Apply state styles */
  ${({ state = 'default' }) => inputStyles.states[state]}
  
  /* Apply size styles */
  ${({ inputSize = 'md' }) => inputStyles.sizes[inputSize]}
`;

const InputContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.tokens.spacing[2]};
  width: 100%;
`;

const Label = styled.label<{ hidden?: boolean }>`
  font-family: ${({ theme }) => theme.tokens.fontFamilies.sans};
  font-size: ${({ theme }) => theme.tokens.textSizes.sm.fontSize};
  font-weight: ${({ theme }) => theme.tokens.fontWeights.medium};
  color: ${({ theme }) => theme.tokens.colors.neutral[700]};
  
  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.tokens.colors.neutral[300]};
  }
  
  ${({ hidden }) => hidden && visuallyHidden}
`;

const MessageText = styled.span<{ type: 'error' | 'success' }>`
  font-family: ${({ theme }) => theme.tokens.fontFamilies.sans};
  font-size: ${({ theme }) => theme.tokens.textSizes.xs.fontSize};
  font-weight: ${({ theme }) => theme.tokens.fontWeights.medium};
  
  color: ${({ theme, type }) => 
    type === 'error' 
      ? theme.tokens.colors.error[600]
      : theme.tokens.colors.success[600]
  };
  
  @media (prefers-color-scheme: dark) {
    color: ${({ theme, type }) => 
      type === 'error' 
        ? theme.tokens.colors.error[400]
        : theme.tokens.colors.success[400]
    };
  }
`;

/**
 * Input Component
 * 
 * A comprehensive input component using the AFP design system.
 * 
 * Features:
 * - Dark mode support (automatic)
 * - Multiple variants (default, search, textarea)
 * - Validation states (default, error, success)
 * - Multiple sizes (sm, md, lg)
 * - Accessibility (proper labeling, screen reader support)
 * - Performance optimizations
 * 
 * @example
 * ```tsx
 * <Input
 *   label="Salary Amount"
 *   type="number"
 *   state="default"
 *   placeholder="Enter your monthly salary"
 * />
 * 
 * <Input
 *   label="Search"
 *   variant="search"
 *   hideLabel
 *   placeholder="Search pension plans..."
 * />
 * 
 * <Input
 *   label="Comments"
 *   variant="textarea"
 *   state="error"
 *   errorMessage="Please provide more details"
 * />
 * ```
 */
export const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(({
  variant = 'default',
  state = 'default',
  inputSize = 'md',
  label,
  errorMessage,
  successMessage,
  hideLabel = false,
  id,
  ...props
}, ref) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 11)}`;
  const isTextarea = variant === 'textarea';
  
  // Determine actual state based on presence of messages
  const actualState = errorMessage ? 'error' : successMessage ? 'success' : state;
  
  const inputElement = isTextarea ? (
    <StyledTextarea
      ref={ref as React.Ref<HTMLTextAreaElement>}
      id={inputId}
      state={actualState}
      inputSize={inputSize}
      {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
    />
  ) : (
    <StyledInput
      ref={ref as React.Ref<HTMLInputElement>}
      id={inputId}
      variant={variant}
      state={actualState}
      inputSize={inputSize}
      {...props}
    />
  );

  return (
    <InputContainer>
      {label && (
        <Label htmlFor={inputId} hidden={hideLabel}>
          {label}
        </Label>
      )}
      
      {inputElement}
      
      {errorMessage && (
        <MessageText type="error" role="alert">
          {errorMessage}
        </MessageText>
      )}
      
      {successMessage && !errorMessage && (
        <MessageText type="success">
          {successMessage}
        </MessageText>
      )}
    </InputContainer>
  );
});

Input.displayName = 'Input';

export default Input;