import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { tokens, commonStyles } from '../styles/tokens';
import { media, container, gridResponsive } from '../styles/utils/helpers';

const Container = styled.div`
  padding: ${tokens.spacing[6]};
  font-family: ${tokens.fontFamilies.sans};
  background: ${tokens.colors.neutral[50]};
  color: ${tokens.colors.neutral[900]};
  min-height: 100vh;
  
  @media (prefers-color-scheme: dark) {
    background: ${tokens.colors.neutral[900]};
    color: ${tokens.colors.neutral[100]};
  }
`;

const Section = styled.section`
  margin-bottom: ${tokens.spacing[12]};
`;

const Title = styled.h2`
  font-size: ${tokens.textSizes['3xl'].fontSize};
  line-height: ${tokens.textSizes['3xl'].lineHeight};
  font-weight: ${tokens.fontWeights.bold};
  color: ${tokens.colors.neutral[900]};
  margin-bottom: ${tokens.spacing[6]};
  border-bottom: 2px solid ${tokens.colors.primary[500]};
  padding-bottom: ${tokens.spacing[4]};
  
  @media (prefers-color-scheme: dark) {
    color: ${tokens.colors.neutral[100]};
  }
`;

const Paragraph = styled.p`
  margin-bottom: ${tokens.spacing[6]};
`;

const DemoCard = styled.div`
  ${commonStyles.cardBase}
  padding: ${tokens.spacing[4]};
  margin-bottom: ${tokens.spacing[6]};
`;

const CodeBlock = styled.pre`
  background: ${tokens.colors.neutral[900]};
  color: ${tokens.colors.neutral[100]};
  padding: ${tokens.spacing[3]};
  border-radius: ${tokens.borderRadius.md};
  font-family: ${tokens.fontFamilies.mono};
  font-size: ${tokens.textSizes.sm.fontSize};
  overflow-x: auto;
  margin-top: ${tokens.spacing[3]};
`;

// Responsive Examples
const ResponsiveBox = styled.div`
  background: ${tokens.colors.primary[200]};
  color: ${tokens.colors.neutral[900]};
  border-radius: ${tokens.borderRadius.md};
  padding: ${tokens.spacing[4]};
  text-align: center;
  font-weight: ${tokens.fontWeights.semibold};
  font-size: 1rem;
  
  @media ${media.sm} {
    font-size: 1.25rem;
    background: ${tokens.colors.secondary[200]};
  }
  
  @media ${media.md} {
    font-size: 1.5rem;
    background: ${tokens.colors.success[200]};
  }
  
  @media ${media.lg} {
    font-size: 1.75rem;
    background: ${tokens.colors.warning[200]};
  }
  
  @media (prefers-color-scheme: dark) {
    background: ${tokens.colors.primary[800]};
    color: ${tokens.colors.neutral[100]};
    
    @media ${media.sm} {
      background: ${tokens.colors.secondary[800]};
    }
    
    @media ${media.md} {
      background: ${tokens.colors.success[800]};
    }
    
    @media ${media.lg} {
      background: ${tokens.colors.warning[800]};
    }
  }
`;

// Container Example
const ContainerExample = styled.div`
  ${container('lg')}
  background: ${tokens.colors.neutral[100]};
  color: ${tokens.colors.neutral[900]};
  border: 2px dashed ${tokens.colors.neutral[400]};
  min-height: 100px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: ${tokens.fontWeights.medium};
  
  @media (prefers-color-scheme: dark) {
    background: ${tokens.colors.neutral[800]};
    color: ${tokens.colors.neutral[100]};
    border-color: ${tokens.colors.neutral[600]};
  }
`;

// Grid Examples
const ResponsiveGrid = styled.div`
  ${gridResponsive(1, 2, 3)}
  margin-bottom: ${tokens.spacing[4]};
`;

const GridItem = styled.div`
  background: ${tokens.colors.primary[100]};
  color: ${tokens.colors.neutral[900]};
  border: ${tokens.borderWidths[1]} solid ${tokens.colors.primary[300]};
  border-radius: ${tokens.borderRadius.md};
  padding: ${tokens.spacing[4]};
  text-align: center;
  font-weight: ${tokens.fontWeights.medium};
  
  @media (prefers-color-scheme: dark) {
    background: ${tokens.colors.primary[900]};
    color: ${tokens.colors.neutral[100]};
    border-color: ${tokens.colors.primary[700]};
  }
`;

// Spacing Examples
const SpacingDemo = styled.div`
  padding: ${tokens.spacing[6]};
  margin-left: auto;
  margin-right: auto;
  max-width: 400px;
  background: ${tokens.colors.secondary[100]};
  color: ${tokens.colors.neutral[900]};
  border-radius: ${tokens.borderRadius.md};
  text-align: center;
  
  @media (prefers-color-scheme: dark) {
    background: ${tokens.colors.secondary[900]};
    color: ${tokens.colors.neutral[100]};
  }
`;

const MarginExample = styled.div`
  margin-top: ${tokens.spacing[4]};
  margin-bottom: ${tokens.spacing[4]};
  padding-left: ${tokens.spacing[6]};
  padding-right: ${tokens.spacing[6]};
  background: ${tokens.colors.info[100]};
  color: ${tokens.colors.neutral[900]};
  border-radius: ${tokens.borderRadius.sm};
  padding-top: ${tokens.spacing[3]};
  padding-bottom: ${tokens.spacing[3]};
  
  @media (prefers-color-scheme: dark) {
    background: ${tokens.colors.info[900]};
    color: ${tokens.colors.neutral[100]};
  }
`;

const UtilityHelpersShowcase = () => {
  return (
    <Container>
      <Section>
        <Title>Responsive Utilities</Title>
        <Paragraph>
          Utilities for creating responsive designs with breakpoint-based styling.
        </Paragraph>
        
        <DemoCard>
          <h4 style={{ marginBottom: tokens.spacing[3] }}>Responsive Text & Colors</h4>
          <ResponsiveBox>
            Resize window to see responsive changes
          </ResponsiveBox>
          <CodeBlock>{`const ResponsiveBox = styled.div\`
  font-size: 1rem;
  background: \${tokens.colors.primary[200]};
  
  \${media.sm} {
    font-size: 1.25rem;
    background: \${tokens.colors.secondary[200]};
  }
  
  \${media.md} {
    font-size: 1.5rem;
    background: \${tokens.colors.success[200]};
  }
  
  \${media.lg} {
    font-size: 1.75rem;
    background: \${tokens.colors.warning[200]};
  }
\`;`}</CodeBlock>
        </DemoCard>

        <DemoCard>
          <h4 style={{ marginBottom: tokens.spacing[3] }}>Media Query Breakpoints</h4>
          <CodeBlock>{`// Available media queries:
\${media.xs}    // 480px+
\${media.sm}    // 640px+
\${media.md}    // 768px+
\${media.lg}    // 1024px+
\${media.xl}    // 1280px+
\${media['2xl']} // 1536px+

// Max-width queries:
\${media.maxSm} // up to 639px
\${media.maxMd} // up to 767px
// ... and more

// Between queries:
\${media.smToMd} // 640px to 767px
\${media.mdToLg} // 768px to 1023px`}</CodeBlock>
        </DemoCard>
      </Section>

      <Section>
        <Title>Container Utility</Title>
        <Paragraph>
          Responsive container with max-width and automatic centering.
        </Paragraph>
        
        <DemoCard>
          <h4 style={{ marginBottom: tokens.spacing[3] }}>Container Example</h4>
          <ContainerExample>
            Container with responsive padding
          </ContainerExample>
          <CodeBlock>{`const Container = styled.div\`
  \${container('lg')} // max-width: 1024px
\`;

// Available sizes:
// xs: 480px, sm: 640px, md: 768px
// lg: 1024px, xl: 1280px, 2xl: 1536px`}</CodeBlock>
        </DemoCard>
      </Section>

      <Section>
        <Title>Grid Utilities</Title>
        <Paragraph>
          Responsive grid layouts with automatic column adjustments.
        </Paragraph>
        
        <DemoCard>
          <h4 style={{ marginBottom: tokens.spacing[3] }}>Responsive Grid</h4>
          <ResponsiveGrid>
            <GridItem>Item 1</GridItem>
            <GridItem>Item 2</GridItem>
            <GridItem>Item 3</GridItem>
            <GridItem>Item 4</GridItem>
            <GridItem>Item 5</GridItem>
            <GridItem>Item 6</GridItem>
          </ResponsiveGrid>
          <CodeBlock>{`const Grid = styled.div\`
  \${gridResponsive(1, 2, 3)} // mobile: 1col, tablet: 2col, desktop: 3col
\`;

// Custom grid:
\${gridColumns(4)} // Always 4 columns
\${gridColumns(3, tokens.spacing[6])} // 3 columns with custom gap`}</CodeBlock>
        </DemoCard>
      </Section>

      <Section>
        <Title>Spacing Utilities</Title>
        <Paragraph>
          Type-safe spacing utilities using design tokens.
        </Paragraph>
        
        <DemoCard>
          <h4 style={{ marginBottom: tokens.spacing[3] }}>Padding & Margin</h4>
          <SpacingDemo>
            Padding: 24px (tokens.spacing[6])
          </SpacingDemo>
          <MarginExample>
            Vertical margin + horizontal padding
          </MarginExample>
          <CodeBlock>{`// Spacing with design tokens:
padding: \${tokens.spacing[6]};    // 24px
margin: \${tokens.spacing[4]};     // 16px
padding-left: \${tokens.spacing[6]};
padding-right: \${tokens.spacing[6]};
margin-left: auto;
margin-right: auto;

// Available spacing scale:
// spacing[1] = 4px, spacing[2] = 8px, spacing[3] = 12px
// spacing[4] = 16px, spacing[6] = 24px, spacing[8] = 32px
// ... up to spacing[96] = 384px`}</CodeBlock>
        </DemoCard>
      </Section>

      <Section>
        <Title>Layout Helpers</Title>
        <Paragraph>
          Common layout patterns and positioning utilities.
        </Paragraph>
        
        <CodeBlock>{`// Available utility functions:

// Media queries (from helpers):
\${media.sm}     // @media (min-width: 640px)
\${media.md}     // @media (min-width: 768px)
\${media.lg}     // @media (min-width: 1024px)

// Container utility:
\${container('lg')}  // Responsive container with max-width

// Grid utility:
\${gridResponsive(1, 2, 3)}  // 1 col mobile, 2 tablet, 3 desktop

// Common styles (from tokens):
\${commonStyles.cardBase}    // Pre-built card styles
\${commonStyles.buttonBase}  // Pre-built button styles
\${commonStyles.inputBase}   // Pre-built input styles`}</CodeBlock>
      </Section>

      <Section>
        <Title>Usage Examples</Title>
        <Paragraph>
          Real-world examples combining multiple utilities.
        </Paragraph>
        
        <CodeBlock>{`// Responsive card component:
const Card = styled.div\`
  \${commonStyles.cardBase}
  padding: \${tokens.spacing[4]};
  margin: \${tokens.spacing[4]};
  
  \${media.md} {
    padding: \${tokens.spacing[6]};
  }
  
  transition: box-shadow 0.2s ease-out;
  
  &:hover {
    box-shadow: \${tokens.shadows.lg};
  }
\`;

// Responsive hero section:
const Hero = styled.section\`
  \${container('xl')}
  padding-top: \${tokens.spacing[12]};
  padding-bottom: \${tokens.spacing[12]};
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 50vh;
  text-align: center;
  
  \${media.lg} {
    padding-top: \${tokens.spacing[20]};
    padding-bottom: \${tokens.spacing[20]};
  }
\`;`}</CodeBlock>
      </Section>
    </Container>
  );
};

const meta: Meta<typeof UtilityHelpersShowcase> = {
  title: 'Design System/Utility Helpers',
  component: UtilityHelpersShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Utility functions and helpers for responsive design, spacing, layout, and common styling patterns.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};