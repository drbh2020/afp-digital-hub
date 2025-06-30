import { forwardRef } from 'react';
import styled from 'styled-components';
import { layoutStyles } from '@/styles/components';
import { Input, InputProps } from '@/components/atoms/Input/Input';
import { Text } from '@/components/atoms/Text/Text';

// FormField component props
export interface FormFieldProps extends Omit<InputProps, 'label'> {
  label: string;
  description?: string;
  required?: boolean;
  containerClassName?: string;
}

// Styled container using layout utilities
const FieldContainer = styled.div`
  ${layoutStyles.flex.stack}
  gap: ${({ theme }) => theme.tokens.spacing[2]};
  width: 100%;
`;

const LabelContainer = styled.div`
  ${layoutStyles.flex.between}
  align-items: baseline;
`;

const RequiredIndicator = styled.span`
  color: ${({ theme }) => theme.tokens.colors.error[500]};
  font-weight: ${({ theme }) => theme.tokens.fontWeights.medium};
  margin-left: ${({ theme }) => theme.tokens.spacing[1]};
  
  @media (prefers-color-scheme: dark) {
    color: ${({ theme }) => theme.tokens.colors.error[400]};
  }
`;

const DescriptionText = styled(Text)`
  margin-top: ${({ theme }) => theme.tokens.spacing[0]};
  margin-bottom: ${({ theme }) => theme.tokens.spacing[0]};
`;

/**
 * FormField Component
 * 
 * A complete form field molecule that combines Input with proper labeling,
 * descriptions, and validation states.
 * 
 * Features:
 * - Combines atomic components (Input, Text)
 * - Proper form accessibility (labels, descriptions, validation)
 * - Dark mode support (inherited from atoms)
 * - Flexible layout using design system utilities
 * - Required field indication
 * - Support for all Input variants and states
 * 
 * @example
 * ```tsx
 * <FormField
 *   label="Monthly Salary"
 *   description="Enter your gross monthly salary in PEN"
 *   type="number"
 *   placeholder="2,500"
 *   required
 *   state="default"
 * />
 * 
 * <FormField
 *   label="Search Pension Plans"
 *   description="Find the best pension plan for your needs"
 *   variant="search"
 *   placeholder="Search plans..."
 * />
 * 
 * <FormField
 *   label="Additional Notes"
 *   description="Any additional information about your retirement goals"
 *   variant="textarea"
 *   state="error"
 *   errorMessage="Please provide more specific details"
 * />
 * ```
 */
export const FormField = forwardRef<HTMLInputElement | HTMLTextAreaElement, FormFieldProps>(({
  label,
  description,
  required = false,
  containerClassName,
  ...inputProps
}, ref) => {
  return (
    <FieldContainer className={containerClassName}>
      <LabelContainer>
        <Text 
          as="label" 
          variant="bodySmall"
        >
          {label}
          {required && (
            <RequiredIndicator aria-label="required">
              *
            </RequiredIndicator>
          )}
        </Text>
      </LabelContainer>
      
      {description && (
        <DescriptionText
          as="p"
          variant="caption"
        >
          {description}
        </DescriptionText>
      )}
      
      <Input
        ref={ref}
        hideLabel // Use our custom label above
        aria-describedby={description ? `${inputProps.id}-description` : undefined}
        {...inputProps}
      />
    </FieldContainer>
  );
});

FormField.displayName = 'FormField';

export default FormField;