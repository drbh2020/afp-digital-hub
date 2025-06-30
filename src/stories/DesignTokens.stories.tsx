import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { tokens } from '../styles/tokens';

const Container = styled.div`
  padding: ${tokens.spacing[6]};
  font-family: ${tokens.fontFamilies.sans};
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

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: ${tokens.spacing[4]};
  margin-bottom: ${tokens.spacing[8]};
`;

const ColorCard = styled.div`
  border: ${tokens.borderWidths[1]} solid ${tokens.colors.neutral[200]};
  border-radius: ${tokens.borderRadius.lg};
  overflow: hidden;
  box-shadow: ${tokens.shadows.sm};
`;

const ColorSwatch = styled.div<{ color: string }>`
  height: 80px;
  background-color: ${props => props.color};
  border-bottom: ${tokens.borderWidths[1]} solid ${tokens.colors.neutral[200]};
`;

const ColorInfo = styled.div`
  padding: ${tokens.spacing[3]};
`;

const ColorName = styled.div`
  font-weight: ${tokens.fontWeights.semibold};
  font-size: ${tokens.textSizes.sm.fontSize};
  margin-bottom: ${tokens.spacing[1]};
`;

const ColorValue = styled.div`
  font-family: ${tokens.fontFamilies.mono};
  font-size: ${tokens.textSizes.xs.fontSize};
  color: ${tokens.colors.neutral[600]};
`;

const SpacingGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: ${tokens.spacing[4]};
`;

const SpacingCard = styled.div`
  border: ${tokens.borderWidths[1]} solid ${tokens.colors.neutral[200]};
  border-radius: ${tokens.borderRadius.md};
  padding: ${tokens.spacing[4]};
  text-align: center;
`;

const SpacingBox = styled.div<{ size: string }>`
  width: ${props => props.size};
  height: ${props => props.size};
  background-color: ${tokens.colors.primary[500]};
  margin: 0 auto ${tokens.spacing[2]};
  border-radius: ${tokens.borderRadius.sm};
`;

const SpacingLabel = styled.div`
  font-size: ${tokens.textSizes.sm.fontSize};
  font-weight: ${tokens.fontWeights.medium};
  margin-bottom: ${tokens.spacing[1]};
`;

const SpacingValue = styled.div`
  font-family: ${tokens.fontFamilies.mono};
  font-size: ${tokens.textSizes.xs.fontSize};
  color: ${tokens.colors.neutral[600]};
`;

const TypeGrid = styled.div`
  display: grid;
  gap: ${tokens.spacing[6]};
`;

const TypeSample = styled.div<{ size: keyof typeof tokens.textSizes }>`
  font-size: ${props => tokens.textSizes[props.size].fontSize};
  line-height: ${props => tokens.textSizes[props.size].lineHeight};
  font-weight: ${tokens.fontWeights.normal};
  margin-bottom: ${tokens.spacing[2]};
`;

const TypeInfo = styled.div`
  font-family: ${tokens.fontFamilies.mono};
  font-size: ${tokens.textSizes.xs.fontSize};
  color: ${tokens.colors.neutral[600]};
  margin-bottom: ${tokens.spacing[4]};
`;

const DesignTokensShowcase = () => {
  return (
    <Container>
      <Section>
        <Title>Colors</Title>
        
        <h3 style={{ marginBottom: tokens.spacing[4], fontSize: tokens.textSizes.xl.fontSize }}>
          Primary Colors
        </h3>
        <ColorGrid>
          {Object.entries(tokens.colors.primary).map(([shade, color]) => (
            <ColorCard key={shade}>
              <ColorSwatch color={color} />
              <ColorInfo>
                <ColorName>primary.{shade}</ColorName>
                <ColorValue>{color}</ColorValue>
              </ColorInfo>
            </ColorCard>
          ))}
        </ColorGrid>

        <h3 style={{ marginBottom: tokens.spacing[4], fontSize: tokens.textSizes.xl.fontSize }}>
          Secondary Colors
        </h3>
        <ColorGrid>
          {Object.entries(tokens.colors.secondary).map(([shade, color]) => (
            <ColorCard key={shade}>
              <ColorSwatch color={color} />
              <ColorInfo>
                <ColorName>secondary.{shade}</ColorName>
                <ColorValue>{color}</ColorValue>
              </ColorInfo>
            </ColorCard>
          ))}
        </ColorGrid>

        <h3 style={{ marginBottom: tokens.spacing[4], fontSize: tokens.textSizes.xl.fontSize }}>
          Neutral Colors
        </h3>
        <ColorGrid>
          {Object.entries(tokens.colors.neutral).map(([shade, color]) => (
            <ColorCard key={shade}>
              <ColorSwatch color={color} />
              <ColorInfo>
                <ColorName>neutral.{shade}</ColorName>
                <ColorValue>{color}</ColorValue>
              </ColorInfo>
            </ColorCard>
          ))}
        </ColorGrid>
      </Section>

      <Section>
        <Title>Spacing</Title>
        <SpacingGrid>
          {Object.entries(tokens.spacing).slice(0, 16).map(([key, value]) => (
            <SpacingCard key={key}>
              <SpacingBox size={value} />
              <SpacingLabel>{key}</SpacingLabel>
              <SpacingValue>{value}</SpacingValue>
            </SpacingCard>
          ))}
        </SpacingGrid>
      </Section>

      <Section>
        <Title>Typography</Title>
        <TypeGrid>
          {Object.entries(tokens.textSizes).map(([size, config]) => (
            <div key={size}>
              <TypeSample size={size as keyof typeof tokens.textSizes}>
                The quick brown fox jumps over the lazy dog
              </TypeSample>
              <TypeInfo>
                {size}: {config.fontSize} / {config.lineHeight}
              </TypeInfo>
            </div>
          ))}
        </TypeGrid>
      </Section>
    </Container>
  );
};

const meta: Meta<typeof DesignTokensShowcase> = {
  title: 'Design System/Design Tokens',
  component: DesignTokensShowcase,
  parameters: {
    layout: 'fullscreen',
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};