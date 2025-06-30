import { ElementType, ComponentPropsWithoutRef, ReactNode } from 'react';
import styled from 'styled-components';
import { typographyStyles } from '@/styles/components';
import { truncate, lineClamp } from '@/styles/utils/helpers';

// Polymorphic component props
type PolymorphicTextProps<C extends ElementType> = {
  as?: C;
  variant?: 
    | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6'
    | 'bodyLarge' | 'body' | 'bodySmall'
    | 'lead' | 'caption' | 'code' | 'codeBlock'
    | 'linkPrimary' | 'linkSubtle';
  align?: 'left' | 'center' | 'right';
  truncate?: boolean;
  lineClamp?: number;
  uppercase?: boolean;
  noWrap?: boolean;
  children: ReactNode;
} & ComponentPropsWithoutRef<C>;

export type TextProps<C extends ElementType = 'div'> = PolymorphicTextProps<C>;

const variantStyleMap = {
  h1: typographyStyles.headings.h1,
  h2: typographyStyles.headings.h2,
  h3: typographyStyles.headings.h3,
  h4: typographyStyles.headings.h4,
  h5: typographyStyles.headings.h5,
  h6: typographyStyles.headings.h6,
  bodyLarge: typographyStyles.body.large,
  body: typographyStyles.body.base,
  bodySmall: typographyStyles.body.small,
  lead: typographyStyles.special.lead,
  caption: typographyStyles.special.caption,
  code: typographyStyles.special.code,
  codeBlock: typographyStyles.special.codeBlock,
  linkPrimary: typographyStyles.links.primary,
  linkSubtle: typographyStyles.links.subtle
};

type VariantKey = keyof typeof variantStyleMap;

// Styled text component using the complete typography system
const StyledText = styled.div.withConfig({
  shouldForwardProp: (prop) => !['variant', 'align', 'shouldTruncate', 'clampLines', 'uppercase', 'noWrap'].includes(prop)
})<{
  variant: TextProps['variant'];
  align: TextProps['align'];
  shouldTruncate?: boolean;
  clampLines?: number;
  uppercase?: boolean;
  noWrap?: boolean;
}>`
  /* Apply typography variant styles */
  ${({ variant = 'body' }: { variant?: VariantKey }) => variantStyleMap[variant as VariantKey] ?? typographyStyles.body.base}
  
  /* Apply text alignment */
  ${({ align }) => align && `text-align: ${align};`}
  
  /* Apply text utilities */
  ${({ shouldTruncate }) => shouldTruncate && truncate}
  ${({ clampLines }) => clampLines && lineClamp(clampLines)}
  ${({ uppercase }) => uppercase && typographyStyles.utilities.uppercase}
  ${({ noWrap }) => noWrap && typographyStyles.utilities.noWrap}
`;

/**
 * Text Component
 * 
 * A comprehensive text component using the AFP design system typography.
 * 
 * Features:
 * - Complete typography scale (h1-h6, body variants, special styles)
 * - Dark mode support (automatic)
 * - Text utilities (truncation, line clamping, alignment)
 * - Semantic HTML elements with design system styling
 * - Accessibility considerations
 * 
 * @example
 * ```tsx
 * <Text as="h1" variant="h1">
 *   AFP Pension Calculator
 * </Text>
 * 
 * <Text as="p" variant="lead" align="center">
 *   Calculate your retirement savings with our advanced pension calculator.
 * </Text>
 * 
 * <Text as="span" variant="caption" truncate>
 *   This is a very long caption that will be truncated with an ellipsis
 * </Text>
 * 
 * <Text as="p" variant="body" lineClamp={3}>
 *   This is body text that will be clamped to exactly 3 lines regardless of content length.
 * </Text>
 * 
 * <Text as="code" variant="code">
 *   const pension = calculatePension(salary, years);
 * </Text>
 * ```
 */
export const Text = <C extends ElementType = 'div'>({
  as,
  variant = 'body',
  align,
  truncate: shouldTruncate = false,
  lineClamp: clampLines,
  uppercase = false,
  noWrap = false,
  children,
  ...props
}: TextProps<C>) => {
  const Component = as || 'div';
  
  return (
    <StyledText
      as={Component}
      variant={variant}
      align={align}
      shouldTruncate={shouldTruncate}
      clampLines={clampLines}
      uppercase={uppercase}
      noWrap={noWrap}
      {...props}
    >
      {children}
    </StyledText>
  );
};

export default Text;