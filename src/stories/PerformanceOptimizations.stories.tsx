import type { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { tokens } from '../styles/tokens';
import { 
  animationOptimizations, 
  gpuOptimizations, 
  containment
} from '../styles/utils/performance';
import { commonStyles } from '../styles/tokens';

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

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${tokens.spacing[6]};
  margin-bottom: ${tokens.spacing[8]};
`;

// Performance Examples
const OptimizedButton = styled.button`
  ${commonStyles.buttonBase}
  ${gpuOptimizations.smoothHover}
  background: ${tokens.colors.primary[500]};
  color: ${tokens.colors.white};
  padding: ${tokens.spacing[3]} ${tokens.spacing[6]};
  border: none;
  border-radius: ${tokens.borderRadius.md};
  cursor: pointer;
  
  &:hover {
    background: ${tokens.colors.primary[600]};
    transform: translateY(-2px);
  }
`;

const OptimizedCard = styled.div`
  ${commonStyles.cardElevated}
  padding: ${tokens.spacing[6]};
  background: ${tokens.colors.white};
  border-radius: ${tokens.borderRadius.lg};
  border: ${tokens.borderWidths[1]} solid ${tokens.colors.neutral[200]};
`;

const GPUAcceleratedBox = styled.div`
  ${gpuOptimizations.promoteLayer}
  ${animationOptimizations.smoothAnimation}
  width: 100px;
  height: 100px;
  background: linear-gradient(45deg, ${tokens.colors.primary[500]}, ${tokens.colors.secondary[500]});
  border-radius: ${tokens.borderRadius.md};
  margin: ${tokens.spacing[4]} auto;
  animation: float 3s ease-in-out infinite;
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
`;

const ContainedList = styled.div`
  ${containment.layout}
  max-height: 200px;
  overflow-y: auto;
  border: ${tokens.borderWidths[1]} solid ${tokens.colors.neutral[300]};
  border-radius: ${tokens.borderRadius.md};
`;

const ListItem = styled.div`
  ${animationOptimizations.respectMotionTransition}
  padding: ${tokens.spacing[3]} ${tokens.spacing[4]};
  border-bottom: ${tokens.borderWidths[1]} solid ${tokens.colors.neutral[200]};
  
  &:last-child {
    border-bottom: none;
  }
  
  &:hover {
    background: ${tokens.colors.neutral[50]};
  }
  
  @media (prefers-color-scheme: dark) {
    border-color: ${tokens.colors.neutral[700]};
    
    &:hover {
      background: ${tokens.colors.neutral[800]};
    }
  }
`;

const CriticalContent = styled.div`
  ${containment.layout}
  ${animationOptimizations.respectMotionTransition}
  padding: ${tokens.spacing[6]};
  background: ${tokens.colors.success[50]};
  border: 2px solid ${tokens.colors.success[200]};
  border-radius: ${tokens.borderRadius.md};
  color: ${tokens.colors.success[900]};
  
  /* Critical content - always visible, optimized for immediate rendering */
  content-visibility: visible;
  contain: layout style;
  
  @media (prefers-color-scheme: dark) {
    background: ${tokens.colors.success[900]};
    border-color: ${tokens.colors.success[700]};
    color: ${tokens.colors.success[100]};
  }
`;

const LazyContent = styled.div`
  ${containment.layout}
  ${animationOptimizations.respectMotionTransition}
  padding: ${tokens.spacing[6]};
  background: ${tokens.colors.info[50]};
  border: 2px solid ${tokens.colors.info[200]};
  border-radius: ${tokens.borderRadius.md};
  margin-top: ${tokens.spacing[4]};
  color: ${tokens.colors.info[900]};
  
  /* Lazy content - optimized for below-the-fold rendering */
  content-visibility: auto;
  contain-intrinsic-size: 0 200px;
  
  @media (prefers-color-scheme: dark) {
    background: ${tokens.colors.info[900]};
    border-color: ${tokens.colors.info[700]};
    color: ${tokens.colors.info[100]};
  }
`;

const DesktopOnlyFeature = styled.div`
  ${animationOptimizations.respectMotionTransition}
  ${containment.layout}
  padding: ${tokens.spacing[4]};
  background: ${tokens.colors.warning[50]};
  border: 2px solid ${tokens.colors.warning[200]};
  border-radius: ${tokens.borderRadius.md};
  text-align: center;
  color: ${tokens.colors.warning[900]};
  
  /* Conditional performance - expensive effects only on desktop */
  @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
    ${gpuOptimizations.smoothHover}
    will-change: transform;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  /* Mobile optimization - no expensive effects */
  @media (max-width: 1023px) {
    will-change: auto;
  }
  
  @media (prefers-color-scheme: dark) {
    background: ${tokens.colors.warning[900]};
    border-color: ${tokens.colors.warning[700]};
    color: ${tokens.colors.warning[100]};
  }
`;

const PerformanceOptimizationsShowcase = () => {
  return (
    <Container>
      <Section>
        <Title>Performance Optimized Components</Title>
        <Paragraph>
          Pre-optimized components with performance hints and GPU acceleration.
        </Paragraph>
        
        <Grid>
          <DemoCard>
            <h4 style={{ marginBottom: tokens.spacing[3] }}>Optimized Button</h4>
            <OptimizedButton>Hover me!</OptimizedButton>
            <CodeBlock>{`const Button = styled.button\`
  \${optimizedComponents.buttonBase}
  // Includes:
  // - will-change: transform
  // - optimized transitions
  // - reduced motion respect
\`;`}</CodeBlock>
          </DemoCard>

          <DemoCard>
            <h4 style={{ marginBottom: tokens.spacing[3] }}>Elevated Card</h4>
            <OptimizedCard>
              <strong>Optimized Card</strong>
              <p>Contains layout containment and GPU acceleration for smooth hover effects.</p>
            </OptimizedCard>
            <CodeBlock>{`const Card = styled.div\`
  \${optimizedComponents.cardElevated}
  // Includes:
  // - contain: layout
  // - GPU acceleration
  // - smooth animations
\`;`}</CodeBlock>
          </DemoCard>
        </Grid>
      </Section>

      <Section>
        <Title>GPU Acceleration & Compositing</Title>
        <Paragraph>
          Examples of GPU-accelerated animations and layer promotion techniques.
        </Paragraph>
        
        <DemoCard>
          <h4 style={{ marginBottom: tokens.spacing[3] }}>GPU Accelerated Animation</h4>
          <GPUAcceleratedBox />
          <CodeBlock>{`const AnimatedBox = styled.div\`
  \${performanceOptimizations.gpuAcceleration}
  \${animationOptimizations.smoothAnimation}
  
  // This creates a compositing layer for smooth animations
  // Properties included:
  // - transform: translateZ(0)
  // - backface-visibility: hidden
  // - will-change: transform, opacity
\`;`}</CodeBlock>
        </DemoCard>
      </Section>

      <Section>
        <Title>CSS Containment</Title>
        <Paragraph>
          CSS containment optimizations to reduce layout thrashing and improve rendering performance.
        </Paragraph>
        
        <DemoCard>
          <h4 style={{ marginBottom: tokens.spacing[3] }}>Contained List</h4>
          <ContainedList>
            {Array.from({ length: 20 }, (_, i) => (
              <ListItem key={i}>
                List item #{i + 1} - Optimized with containment
              </ListItem>
            ))}
          </ContainedList>
          <CodeBlock>{`const List = styled.div\`
  \${containment.layout}  // contain: layout
  \${critical.offScreen} // content-visibility: auto
\`;

const ListItem = styled.div\`
  \${optimizedComponents.listItem}
  // Optimized for repeated renders
\`;`}</CodeBlock>
        </DemoCard>
      </Section>

      <Section>
        <Title>Critical Path Optimization</Title>
        <Paragraph>
          Content visibility optimizations for above-the-fold and below-the-fold content.
        </Paragraph>
        
        <DemoCard>
          <h4 style={{ marginBottom: tokens.spacing[3] }}>Critical vs Lazy Content</h4>
          <CriticalContent>
            <strong>Above-the-fold content</strong>
            <p>This content is always visible and rendered immediately.</p>
          </CriticalContent>
          <LazyContent>
            <strong>Below-the-fold content</strong>
            <p>This content uses content-visibility: auto for performance.</p>
          </LazyContent>
          <CodeBlock>{`const CriticalContent = styled.div\`
  \${containment.layout}
  content-visibility: visible;     // Always render
  contain: layout style;           // Isolate layout calculations
\`;

const LazyContent = styled.div\`
  \${containment.layout}
  content-visibility: auto;        // Lazy render when visible
  contain-intrinsic-size: 0 200px; // Reserve space while hidden
\`;`}</CodeBlock>
        </DemoCard>
      </Section>

      <Section>
        <Title>Conditional Performance</Title>
        <Paragraph>
          Performance optimizations that are conditionally applied based on device capabilities and user preferences.
        </Paragraph>
        
        <DemoCard>
          <h4 style={{ marginBottom: tokens.spacing[3] }}>Desktop-Only Animations</h4>
          <DesktopOnlyFeature>
            Hover effects only on desktop (1024px+)
          </DesktopOnlyFeature>
          <CodeBlock>{`const Feature = styled.div\`
  \${animationOptimizations.respectMotionTransition}
  \${containment.layout}
  
  // Conditional performance - expensive effects only on desktop
  @media (min-width: 1024px) and (prefers-reduced-motion: no-preference) {
    \${gpuOptimizations.smoothHover}
    will-change: transform;
    
    &:hover {
      transform: scale(1.05);
    }
  }
  
  // Mobile optimization - disable expensive effects
  @media (max-width: 1023px) {
    will-change: auto;
  }
\`;`}</CodeBlock>
        </DemoCard>
      </Section>

      <Section>
        <Title>Animation Optimizations</Title>
        <Paragraph>
          Animation performance patterns and accessibility considerations.
        </Paragraph>
        
        <CodeBlock>{`// Animation best practices included:

\${animationOptimizations.optimizedTransition}
// - Only animates transform and opacity
// - Uses hardware acceleration

\${animationOptimizations.respectMotionPreference}
// - Respects prefers-reduced-motion
// - Reduces animation duration to 0.01ms for accessibility

\${animationOptimizations.smoothAnimation}
// - animation-fill-mode: both
// - animation-timing-function: ease-out
// - will-change hints

// Accessibility considerations:
\${animationOptimizations.respectMotionPreference}
// - Respects user motion preferences
// - Automatically disables animations when requested`}</CodeBlock>
      </Section>

      <Section>
        <Title>Performance Best Practices</Title>
        <Paragraph>
          Summary of performance optimization techniques used in this design system.
        </Paragraph>
        
        <CodeBlock>{`// 1. Pre-calculated CSS - No runtime computation
const commonStyles = {
  buttonBase: \`...\`,  // ✅ Pre-calculated
  cardBase: \`...\`,    // ✅ Pre-calculated
};

// 2. CSS Containment - Reduce layout scope
\${containment.layout}     // contain: layout
\${containment.strict}     // contain: strict

// 3. GPU Acceleration - Promote to compositing layer
\${gpuOptimizations.promoteLayer}     // transform: translateZ(0)
\${gpuOptimizations.smoothHover}      // Smooth hover effects

// 4. Animation Optimizations
\${animationOptimizations.optimizedTransition}  // Transform + opacity only
\${animationOptimizations.respectMotionPreference}  // Accessibility
\${animationOptimizations.smoothAnimation}     // GPU-optimized animations

// 5. Tree-shaking - Only import what you use
import { animationOptimizations } from '@/styles/utils/performance';
import { commonStyles } from '@/styles/tokens';`}</CodeBlock>
      </Section>
    </Container>
  );
};

const meta: Meta<typeof PerformanceOptimizationsShowcase> = {
  title: 'Design System/Performance Optimizations',
  component: PerformanceOptimizationsShowcase,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'Performance optimization patterns and techniques for high-performance CSS-in-JS applications.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};