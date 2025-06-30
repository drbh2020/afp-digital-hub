import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { tokens, commonStyles, flexCenter, flexBetween } from '../styles';

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
  margin-bottom: ${tokens.spacing[6]};
  border-bottom: 2px solid ${tokens.colors.primary[500]};
  padding-bottom: ${tokens.spacing[4]};
`;

const Paragraph = styled.p`
  margin-bottom: ${tokens.spacing[4]};
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${tokens.spacing[6]};
  margin-bottom: ${tokens.spacing[8]};
`;

const DemoCard = styled.div`
  ${commonStyles.cardBase}
  padding: ${tokens.spacing[4]};
`;

const DemoCardTitle = styled.h4`
  margin-bottom: ${tokens.spacing[3]};
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

// Button Examples
const PrimaryButton = styled.button`
  ${commonStyles.buttonBase}
  background: ${tokens.colors.primary[500]};
  color: ${tokens.colors.white};
  padding: ${tokens.spacing[3]} ${tokens.spacing[6]};
  
  &:hover {
    background: ${tokens.colors.primary[600]};
  }
  
  &:active {
    background: ${tokens.colors.primary[700]};
  }
`;

const SecondaryButton = styled.button`
  ${commonStyles.buttonBase}
  background: ${tokens.colors.neutral[100]};
  color: ${tokens.colors.neutral[900]};
  border: ${tokens.borderWidths[1]} solid ${tokens.colors.neutral[300]};
  padding: ${tokens.spacing[3]} ${tokens.spacing[6]};
  
  &:hover {
    background: ${tokens.colors.neutral[200]};
  }
  
  &:active {
    background: ${tokens.colors.neutral[300]};
  }
  
  @media (prefers-color-scheme: dark) {
    background: ${tokens.colors.neutral[700]};
    color: ${tokens.colors.neutral[100]};
    border-color: ${tokens.colors.neutral[600]};
    
    &:hover {
      background: ${tokens.colors.neutral[600]};
    }
    
    &:active {
      background: ${tokens.colors.neutral[500]};
    }
  }
`;

const GhostButton = styled.button`
  ${commonStyles.buttonBase}
  background: transparent;
  color: ${tokens.colors.primary[600]};
  border: ${tokens.borderWidths[1]} solid ${tokens.colors.primary[300]};
  padding: ${tokens.spacing[3]} ${tokens.spacing[6]};
  
  &:hover {
    background: ${tokens.colors.primary[50]};
    border-color: ${tokens.colors.primary[400]};
  }
  
  &:active {
    background: ${tokens.colors.primary[100]};
    border-color: ${tokens.colors.primary[500]};
  }
  
  @media (prefers-color-scheme: dark) {
    color: ${tokens.colors.primary[400]};
    border-color: ${tokens.colors.primary[600]};
    
    &:hover {
      background: ${tokens.colors.primary[900]};
      border-color: ${tokens.colors.primary[500]};
    }
    
    &:active {
      background: ${tokens.colors.primary[800]};
      border-color: ${tokens.colors.primary[400]};
    }
  }
`;

// Input Examples
const DefaultInput = styled.input`
  ${commonStyles.inputBase}
  width: 100%;
`;

const ErrorInput = styled.input`
  ${commonStyles.inputBase}
  width: 100%;
  border-color: ${tokens.colors.error[500]};
  
  &:focus {
    border-color: ${tokens.colors.error[600]};
    box-shadow: 0 0 0 3px ${tokens.colors.error[500]}20;
  }
  
  @media (prefers-color-scheme: dark) {
    border-color: ${tokens.colors.error[400]};
    
    &:focus {
      border-color: ${tokens.colors.error[300]};
      box-shadow: 0 0 0 3px ${tokens.colors.error[400]}20;
    }
  }
`;

// Card Examples
const DefaultCard = styled.div`
  ${commonStyles.cardBase}
  padding: ${tokens.spacing[6]};
`;

const CompactCard = styled.div`
  ${commonStyles.cardBase}
  padding: ${tokens.spacing[4]};
`;

const ElevatedCard = styled.div`
  ${commonStyles.cardElevated}
  padding: ${tokens.spacing[6]};
`;

// Layout Examples
const FlexCenterBox = styled.div`
  ${flexCenter}
  height: 80px;
  background: ${tokens.colors.primary[500]};
  color: ${tokens.colors.white};
  border-radius: ${tokens.borderRadius.md};
`;

const FlexBetweenBox = styled.div`
  ${flexBetween}
  height: 60px;
  padding: ${tokens.spacing[4]};
  background: ${tokens.colors.secondary[50]};
  color: ${tokens.colors.neutral[900]};
  border-radius: ${tokens.borderRadius.md};
  
  @media (prefers-color-scheme: dark) {
    background: ${tokens.colors.secondary[900]};
    color: ${tokens.colors.neutral[100]};
  }
`;

const TruncateText = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: 200px;
  padding: ${tokens.spacing[2]};
  background: ${tokens.colors.neutral[100]};
  color: ${tokens.colors.neutral[900]};
  border-radius: ${tokens.borderRadius.sm};
  
  @media (prefers-color-scheme: dark) {
    background: ${tokens.colors.neutral[800]};
    color: ${tokens.colors.neutral[100]};
  }
`;

const ComponentMixinsShowcase = () => {
  return (
    <Container>
      <Section>
        <Title>Button Mixins</Title>
        <Paragraph>
          Pre-built button styles with consistent styling and interactions.
        </Paragraph>
        
        <Grid>
          <DemoCard>
            <DemoCardTitle>Primary Button</DemoCardTitle>
            <PrimaryButton>Primary Action</PrimaryButton>
            <CodeBlock>{`const Button = styled.button\`
  \${commonStyles.buttonBase}
  background: \${tokens.colors.primary[500]};
  color: \${tokens.colors.white};
\`;`}</CodeBlock>
          </DemoCard>

          <DemoCard>
            <DemoCardTitle>Secondary Button</DemoCardTitle>
            <SecondaryButton>Secondary Action</SecondaryButton>
            <CodeBlock>{`const Button = styled.button\`
  \${commonStyles.buttonBase}
  background: \${tokens.colors.neutral[100]};
  border: 1px solid \${tokens.colors.neutral[300]};
\`;`}</CodeBlock>
          </DemoCard>

          <DemoCard>
            <DemoCardTitle>Ghost Button</DemoCardTitle>
            <GhostButton>Ghost Action</GhostButton>
            <CodeBlock>{`const Button = styled.button\`
  \${commonStyles.buttonBase}
  background: transparent;
  border: 1px solid \${tokens.colors.primary[300]};
\`;`}</CodeBlock>
          </DemoCard>
        </Grid>
      </Section>

      <Section>
        <Title>Input Mixins</Title>
        <Paragraph>
          Consistent input styling with focus states and validation.
        </Paragraph>
        
        <Grid>
          <DemoCard>
            <DemoCardTitle>Default Input</DemoCardTitle>
            <DefaultInput placeholder="Enter your text..." />
            <CodeBlock>{`const Input = styled.input\`
  \${commonStyles.inputBase}
\`;`}</CodeBlock>
          </DemoCard>

          <DemoCard>
            <DemoCardTitle>Error State</DemoCardTitle>
            <ErrorInput 
              placeholder="Invalid input..." 
              aria-invalid="true"
            />
            <CodeBlock>{`<Input aria-invalid="true" />
// Automatically styled for error state`}</CodeBlock>
          </DemoCard>

          <DemoCard>
            <DemoCardTitle>Disabled State</DemoCardTitle>
            <DefaultInput 
              placeholder="Disabled input" 
              disabled 
            />
            <CodeBlock>{`<Input disabled />
// Automatically styled for disabled state`}</CodeBlock>
          </DemoCard>
        </Grid>
      </Section>

      <Section>
        <Title>Card Mixins</Title>
        <Paragraph>
          Card components with different padding and elevation levels.
        </Paragraph>
        
        <Grid>
          <DemoCard>
            <DemoCardTitle>Default Card</DemoCardTitle>
            <DefaultCard>
              <h5>Card Title</h5>
              <p>Default card with standard padding and subtle shadow.</p>
            </DefaultCard>
            <CodeBlock>{`const Card = styled.div\`
  \${commonStyles.cardBase}
  padding: \${tokens.spacing[6]};
\`;`}</CodeBlock>
          </DemoCard>

          <DemoCard>
            <DemoCardTitle>Compact Card</DemoCardTitle>
            <CompactCard>
              <h5>Compact Card</h5>
              <p>Reduced padding for tight spaces.</p>
            </CompactCard>
            <CodeBlock>{`const Card = styled.div\`
  \${commonStyles.cardBase}
  padding: \${tokens.spacing[4]};
\`;`}</CodeBlock>
          </DemoCard>

          <DemoCard>
            <DemoCardTitle>Elevated Card</DemoCardTitle>
            <ElevatedCard>
              <h5>Elevated Card</h5>
              <p>Higher elevation with hover effects.</p>
            </ElevatedCard>
            <CodeBlock>{`const Card = styled.div\`
  \${commonStyles.cardElevated}
\`;`}</CodeBlock>
          </DemoCard>
        </Grid>
      </Section>

      <Section>
        <Title>Layout Mixins</Title>
        <Paragraph>
          Common layout patterns for flexbox and positioning.
        </Paragraph>
        
        <Grid>
          <DemoCard>
            <DemoCardTitle>Flex Center</DemoCardTitle>
            <FlexCenterBox>
              <span>Centered Content</span>
            </FlexCenterBox>
            <CodeBlock>{`const Container = styled.div\`
  display: flex;
  align-items: center;
  justify-content: center;
\`;`}</CodeBlock>
          </DemoCard>

          <DemoCard>
            <DemoCardTitle>Flex Between</DemoCardTitle>
            <FlexBetweenBox>
              <span>Left</span>
              <span>Right</span>
            </FlexBetweenBox>
            <CodeBlock>{`const Container = styled.div\`
  display: flex;
  align-items: center;
  justify-content: space-between;
\`;`}</CodeBlock>
          </DemoCard>

          <DemoCard>
            <DemoCardTitle>Truncate Text</DemoCardTitle>
            <TruncateText>
              This is a very long text that will be truncated with ellipsis
            </TruncateText>
            <CodeBlock>{`const Text = styled.div\`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
\`;`}</CodeBlock>
          </DemoCard>
        </Grid>
      </Section>

      <Section>
        <Title>Common Styles</Title>
        <Paragraph>
          Base styles that can be extended for custom components.
        </Paragraph>
        
        <CodeBlock>{`// Available common styles:
\${commonStyles.buttonBase}  // Base button styles
\${commonStyles.inputBase}   // Base input styles  
\${commonStyles.cardBase}    // Base card styles

// Usage example:
const CustomButton = styled.button\`
  \${commonStyles.buttonBase}
  // Add your custom styles here
  background: linear-gradient(45deg, #ff4f00, #ff7a51);
\`;`}</CodeBlock>
      </Section>
    </Container>
  );
};

const meta: Meta<typeof ComponentMixinsShowcase> = {
  title: 'Design System/Component Mixins',
  component: ComponentMixinsShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Pre-built styled-components mixins for consistent component styling across the application.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};