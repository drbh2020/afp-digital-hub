import { FC } from 'react';
import { useForm } from 'react-hook-form';
import styled from 'styled-components';
import { layoutStyles, typographyStyles } from '@/styles/components';
import { fadeIn } from '@/styles/utils/helpers';
import { Button } from '@/components/atoms/Button/Button';
import { Text } from '@/components/atoms/Text/Text';
import { FormField } from '@/components/molecules/FormField/FormField';
import { Card } from '@/components/molecules/Card/Card';

// Styled containers using the complete layout system
const Container = styled.div`
  ${layoutStyles.container.sizes.lg}
  ${layoutStyles.section.content}
  ${layoutStyles.performance.critical} /* Above-the-fold optimization */
`;

const Hero = styled.section`
  ${layoutStyles.section.hero}
  ${layoutStyles.flex.center}
  background: linear-gradient(135deg, 
    ${({ theme }) => theme.tokens.colors.primary[50]}, 
    ${({ theme }) => theme.tokens.colors.secondary[50]}
  );
  border-radius: ${({ theme }) => theme.tokens.borderRadius.xl};
  margin-bottom: ${({ theme }) => theme.tokens.spacing[12]};
  
  @media (prefers-color-scheme: dark) {
    background: linear-gradient(135deg, 
      ${({ theme }) => theme.tokens.colors.primary[900]}, 
      ${({ theme }) => theme.tokens.colors.secondary[900]}
    );
  }
`;

const Grid = styled.div`
  ${layoutStyles.grid.responsive}
  margin-bottom: ${({ theme }) => theme.tokens.spacing[12]};
`;

const FormContainer = styled.div`
  ${layoutStyles.flex.stack}
  gap: ${({ theme }) => theme.tokens.spacing[6]};
  max-width: 500px;
  margin: 0 auto;
`;

const ButtonGroup = styled.div`
  ${layoutStyles.flex.inlineStack}
  gap: ${({ theme }) => theme.tokens.spacing[3]};
  justify-content: center;
  flex-wrap: wrap;
`;

interface AnimatedCardProps {
  delay?: number;
}

const AnimatedCard = styled(Card)<AnimatedCardProps>`
  ${fadeIn}
  animation-delay: ${({ delay }) => delay || 0}ms;
  margin-bottom: ${({ theme }) => theme.tokens.spacing[8]};
`;

const CardSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.tokens.spacing[8]};
  margin-bottom: ${({ theme }) => theme.tokens.spacing[12]};
`;

const CodeExample = styled.pre`
  ${typographyStyles.special.codeBlock}
  margin: ${({ theme }) => theme.tokens.spacing[4]} 0;
  border: ${({ theme }) => theme.tokens.borderWidths[1]} solid ${({ theme }) => theme.tokens.colors.neutral[200]};
  
  @media (prefers-color-scheme: dark) {
    border-color: ${({ theme }) => theme.tokens.colors.neutral[700]};
  }
`;

const SpacedSection = styled.div`
  margin-bottom: ${({ theme }) => theme.tokens.spacing[4]};
`;

const FlexColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.tokens.spacing[2]};
`;

/**
 * Design System Showcase
 * 
 * Comprehensive example demonstrating how to use the complete AFP design system:
 * - All component styles from src/styles/components
 * - All utilities from src/styles/utils  
 * - Performance optimizations
 * - Dark mode support
 * - Accessibility features
 * - Atomic design pattern
 */
interface FormData {
  name: string;
  salary: string;
  age: string;
  notes: string;
  search: string;
}

export const DesignSystemShowcase: FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, touchedFields },
    watch,
    reset
  } = useForm<FormData>({
    defaultValues: {
      name: '',
      salary: '',
      age: '',
      notes: '',
      search: '',
    }
  });

  const watchedValues = watch();
  
  console.log('errors', errors)
  console.log('watchedValues', watchedValues)

  const onSubmit = (data: FormData) => {
    console.log('Form submitted:', data);
  };

  const handleReset = () => {
    reset();
  };

  return (
    <Container>
      {/* Hero Section - Typography + Layout */}
      <Hero>
        <div>
          <Text as="h1" variant="h1" align="center">
            AFP Design System
          </Text>
          <Text as="p" variant="lead" align="center">
            Complete component library with performance optimizations and dark mode support
          </Text>
        </div>
      </Hero>

      {/* Main Content with Proper Spacing */}
      <CardSection>
        {/* Typography Examples */}
        <AnimatedCard variant="elevated" performance="critical" delay={100}>
        <SpacedSection>
          <Text as="h2" variant="h2">
            Typography System
          </Text>
        </SpacedSection>
        
        <FlexColumn>
          <Text as="h3" variant="h3">Heading Level 3</Text>
          <Text as="h4" variant="h4">Heading Level 4</Text>
          <Text as="p" variant="body">
            This is body text using the typography system. It automatically supports dark mode 
            and uses the complete token system for consistent spacing and colors.
          </Text>
          <Text as="p" variant="bodySmall">
            Small body text with proper contrast ratios in both light and dark modes.
          </Text>
          <Text as="p" variant="caption" truncate>
            This caption text will be truncated with an ellipsis if it's too long to fit in the available space.
          </Text>
        </FlexColumn>
      </AnimatedCard>

      {/* Button Examples */}
      <AnimatedCard variant="bordered" delay={200}>
        <SpacedSection>
          <Text as="h3" variant="h3">
            Button Components
          </Text>
        </SpacedSection>
        
        <ButtonGroup>
          <Button variant="primary" size="lg" enhanced>
            Primary Enhanced
          </Button>
          <Button variant="secondary" size="md">
            Secondary
          </Button>
          <Button variant="ghost" size="sm">
            Ghost Button
          </Button>
          <Button variant="primary" disabled>
            Disabled
          </Button>
        </ButtonGroup>
        
        <CodeExample>
{`<Button variant="primary" size="lg" enhanced>
  Primary Enhanced
</Button>`}
        </CodeExample>
      </AnimatedCard>

      {/* Form Examples */}
      <AnimatedCard variant="elevated" delay={300}>
        <SpacedSection>
          <Text as="h3" variant="h3">
            Form Components
          </Text>
        </SpacedSection>
        
        <form onSubmit={handleSubmit(onSubmit)}>
          <FormContainer>
            <FormField
              label="Full Name"
              description="Enter your complete legal name"
              type="text"
              placeholder="Juan Pérez"
              required
              {...register('name', { 
                required: 'Name is required',
                minLength: { value: 3, message: 'Name must be at least 3 characters' }
              })}
              state={errors.name && touchedFields.name ? 'error' : (watchedValues.name && watchedValues.name.length > 3) ? 'success' : 'default'}
              errorMessage={touchedFields.name ? errors.name?.message : undefined}
              successMessage={(watchedValues.name && watchedValues.name.length > 3) ? 'Valid name' : undefined}
            />
            
            <FormField
              label="Monthly Salary"
              description="Enter your gross monthly salary in PEN"
              type="number"
              placeholder="2,500"
              required
              {...register('salary', { 
                required: 'Salary is required',
                min: { value: 1025, message: 'Minimum salary in Peru is 1025 PEN' }
              })}
              state={errors.salary && touchedFields.salary ? 'error' : (watchedValues.salary && Number(watchedValues.salary) >= 930) ? 'success' : 'default'}
              errorMessage={touchedFields.salary ? errors.salary?.message : undefined}
              successMessage={(watchedValues.salary && Number(watchedValues.salary) >= 1025) ? 'Valid salary amount' : undefined}
            />
            
            <FormField
              label="Search Plans"
              description="Find pension plans that match your needs"
              variant="search"
              placeholder="Search pension plans..."
              {...register('search')}
            />
            
            <FormField
              label="Additional Notes"
              description="Any additional information about your retirement goals"
              variant="textarea"
              placeholder="Tell us about your retirement plans..."
              {...register('notes')}
            />
            
            <ButtonGroup>
              <Button type="submit" variant="primary" enhanced>
                Calculate Pension
              </Button>
              <Button type="button" variant="ghost" onClick={handleReset}>
                Reset Form
              </Button>
            </ButtonGroup>
          </FormContainer>
        </form>
      </AnimatedCard>

      {/* Semantic Variants */}
      <Grid>
        <AnimatedCard semantic="success" variant="bordered" delay={400}>
          <Text as="h4" variant="h4">
            Success State
          </Text>
          <Text as="p" variant="body">
            Calculation completed successfully! Your estimated monthly pension is $2,450.
          </Text>
        </AnimatedCard>
        
        <AnimatedCard semantic="warning" variant="bordered" delay={500}>
          <Text as="h4" variant="h4">
            Warning State
          </Text>
          <Text as="p" variant="body">
            Your current contributions may not meet your retirement goals.
          </Text>
        </AnimatedCard>
        
        <AnimatedCard semantic="error" variant="bordered" delay={600}>
          <Text as="h4" variant="h4">
            Error State
          </Text>
          <Text as="p" variant="body">
            Unable to calculate pension. Please check your input data.
          </Text>
        </AnimatedCard>
      </Grid>

      {/* Performance Examples */}
      <AnimatedCard variant="compact" performance="lazy" delay={700}>
        <SpacedSection>
          <Text as="h4" variant="h4">
            Performance Features
          </Text>
        </SpacedSection>
        
        <FlexColumn>
          <Text as="p" variant="bodySmall">
            ✅ <Text as="code" variant="code">CSS Containment</Text> - Reduces layout thrashing
          </Text>
          <Text as="p" variant="bodySmall">
            ✅ <Text as="code" variant="code">GPU Acceleration</Text> - Smooth hover effects
          </Text>
          <Text as="p" variant="bodySmall">
            ✅ <Text as="code" variant="code">Dark Mode</Text> - Automatic color scheme adaptation
          </Text>
          <Text as="p" variant="bodySmall">
            ✅ <Text as="code" variant="code">Accessibility</Text> - Focus states and reduced motion
          </Text>
          <Text as="p" variant="bodySmall">
            ✅ <Text as="code" variant="code">Lazy Rendering</Text> - This card uses content-visibility
          </Text>
        </FlexColumn>
      </AnimatedCard>

      {/* Code Example */}
      <AnimatedCard variant="elevated" delay={800}>
        <SpacedSection>
          <Text as="h3" variant="h3">
            Usage Example
          </Text>
        </SpacedSection>
        
        <CodeExample>
{`import { Button, FormField, Card, Text } from '@/components';
import { layoutStyles } from '@/styles/components';

const MyComponent = () => (
  <Card variant="elevated" performance="critical">
    <Text as="h2" variant="h2">
      AFP Pension Calculator
    </Text>
    
    <FormField
      label="Monthly Salary"
      type="number"
      required
      state="success"
    />
    
    <Button variant="primary" enhanced>
      Calculate
    </Button>
  </Card>
);`}
        </CodeExample>
      </AnimatedCard>

        {isSubmitted && (
          <AnimatedCard semantic="success" variant="elevated">
            <Text as="h4" variant="h4" align="center">
              Form Submitted Successfully! 🎉
            </Text>
            <Text as="p" variant="body" align="center">
              Thank you for trying out the AFP Design System.
            </Text>
          </AnimatedCard>
        )}
      </CardSection>
    </Container>
  );
};

export default DesignSystemShowcase;