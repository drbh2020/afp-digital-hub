import type { Meta, StoryObj } from '@storybook/react';
import { PageLayout } from './PageLayout';
import { Text } from '@/components/atoms/Text/Text';
import { Button } from '@/components/atoms/Button/Button';
import { Card } from '@/components/molecules/Card/Card';

const meta = {
  title: 'Templates/PageLayout',
  component: PageLayout,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: 'A comprehensive page layout template providing consistent structure with header, footer, and main content area. Features flexible configuration, accessibility, and responsive design.',
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    headerProps: {
      control: 'object',
      description: 'Props to pass to the Header component',
    },
    footerProps: {
      control: 'object',
      description: 'Props to pass to the Footer component',
    },
    showHeader: {
      control: { type: 'boolean' },
      description: 'Show or hide the header',
    },
    showFooter: {
      control: { type: 'boolean' },
      description: 'Show or hide the footer',
    },
    containerSize: {
      control: { type: 'select' },
      options: ['xs', 'sm', 'md', 'lg', 'xl', '2xl', 'full'],
      description: 'Container size for the main content',
    },
    spacing: {
      control: { type: 'select' },
      options: ['none', 'sm', 'md', 'lg', 'xl'],
      description: 'Spacing around the main content',
    },
    children: {
      control: 'text',
      description: 'Main content to display',
    },
  },
} satisfies Meta<typeof PageLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

// Sample content components
const SampleContent = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
    <Text as="h1" variant="h1">
      Bienvenido a AFP Digital Hub
    </Text>
    <Text as="p" variant="lead">
      Tu plataforma confiable para la planificación de tu jubilación y gestión de fondos de pensión.
    </Text>
    
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
      <Card variant="elevated">
        <Text as="h3" variant="h3" style={{ marginBottom: '1rem' }}>
          Calculadora de Pensión
        </Text>
        <Text as="p" variant="body" style={{ marginBottom: '1.5rem' }}>
          Calcula tu pensión estimada y planifica tu futuro financiero con nuestras herramientas especializadas.
        </Text>
        <Button variant="primary">
          Calcular Pensión
        </Button>
      </Card>
      
      <Card variant="elevated">
        <Text as="h3" variant="h3" style={{ marginBottom: '1rem' }}>
          Gestión de Fondos
        </Text>
        <Text as="p" variant="body" style={{ marginBottom: '1.5rem' }}>
          Administra tus fondos de pensión y optimiza tu cartera de inversión para maximizar tus retornos.
        </Text>
        <Button variant="secondary">
          Ver Fondos
        </Button>
      </Card>
      
      <Card variant="elevated">
        <Text as="h3" variant="h3" style={{ marginBottom: '1rem' }}>
          Educación Financiera
        </Text>
        <Text as="p" variant="body" style={{ marginBottom: '1.5rem' }}>
          Aprende sobre planificación financiera y toma decisiones informadas sobre tu jubilación.
        </Text>
        <Button variant="ghost">
          Explorar Recursos
        </Button>
      </Card>
    </div>
  </div>
);

const MinimalContent = () => (
  <div style={{ textAlign: 'center', padding: '4rem 0' }}>
    <Text as="h1" variant="h1" style={{ marginBottom: '1rem' }}>
      Página Simple
    </Text>
    <Text as="p" variant="body">
      Contenido mínimo para demostrar el diseño básico.
    </Text>
  </div>
);

const FormContent = () => (
  <div style={{ maxWidth: '500px', margin: '0 auto' }}>
    <Text as="h1" variant="h2" style={{ marginBottom: '2rem', textAlign: 'center' }}>
      Iniciar Sesión
    </Text>
    
    <Card variant="elevated" style={{ padding: '2rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Correo Electrónico
          </label>
          <input 
            type="email" 
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.5rem',
              fontSize: '1rem'
            }} 
            placeholder="tu@email.com"
          />
        </div>
        
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>
            Contraseña
          </label>
          <input 
            type="password" 
            style={{ 
              width: '100%', 
              padding: '0.75rem', 
              border: '1px solid #d1d5db', 
              borderRadius: '0.5rem',
              fontSize: '1rem'
            }} 
            placeholder="••••••••"
          />
        </div>
        
        <Button variant="primary" style={{ width: '100%' }}>
          Iniciar Sesión
        </Button>
      </div>
    </Card>
  </div>
);

// Default story
export const Default: Story = {
  args: {
    children: <SampleContent />,
    showHeader: true,
    showFooter: true,
    containerSize: 'lg',
    spacing: 'md',
  },
};

// Container size examples
export const ExtraSmallContainer: Story = {
  args: {
    children: <MinimalContent />,
    containerSize: 'xs',
    spacing: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra small container (max-width: 20rem) for very narrow content.',
      },
    },
  },
};

export const SmallContainer: Story = {
  args: {
    children: <FormContent />,
    containerSize: 'sm',
    spacing: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Small container (max-width: 24rem) perfect for forms and focused content.',
      },
    },
  },
};

export const MediumContainer: Story = {
  args: {
    children: <SampleContent />,
    containerSize: 'md',
    spacing: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Medium container (max-width: 28rem) for moderate content width.',
      },
    },
  },
};

export const LargeContainer: Story = {
  args: {
    children: <SampleContent />,
    containerSize: 'lg',
    spacing: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Large container (max-width: 32rem) - the default size for most content.',
      },
    },
  },
};

export const ExtraLargeContainer: Story = {
  args: {
    children: <SampleContent />,
    containerSize: 'xl',
    spacing: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Extra large container (max-width: 36rem) for wide content layouts.',
      },
    },
  },
};

export const DoubleExtraLargeContainer: Story = {
  args: {
    children: <SampleContent />,
    containerSize: '2xl',
    spacing: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Double extra large container (max-width: 42rem) for very wide content.',
      },
    },
  },
};

export const FullWidthContainer: Story = {
  args: {
    children: (
      <div style={{ 
        background: 'linear-gradient(135deg, #ff4f00, #14b8a6)', 
        color: 'white', 
        padding: '4rem 2rem', 
        textAlign: 'center' 
      }}>
        <Text as="h1" variant="h1" style={{ color: 'white', marginBottom: '1rem' }}>
          Full Width Layout
        </Text>
        <Text as="p" variant="lead" style={{ color: 'white' }}>
          Este contenido se extiende a todo el ancho de la pantalla.
        </Text>
      </div>
    ),
    containerSize: 'full',
    spacing: 'none',
  },
  parameters: {
    docs: {
      description: {
        story: 'Full width container that spans the entire viewport width.',
      },
    },
  },
};

// Spacing examples
export const NoSpacing: Story = {
  args: {
    children: <SampleContent />,
    spacing: 'none',
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout with no padding around the main content.',
      },
    },
  },
};

export const SmallSpacing: Story = {
  args: {
    children: <SampleContent />,
    spacing: 'sm',
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout with small spacing (1rem) around the main content.',
      },
    },
  },
};

export const MediumSpacing: Story = {
  args: {
    children: <SampleContent />,
    spacing: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout with medium spacing (2rem) around the main content - the default.',
      },
    },
  },
};

export const LargeSpacing: Story = {
  args: {
    children: <SampleContent />,
    spacing: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout with large spacing (3rem) around the main content.',
      },
    },
  },
};

export const ExtraLargeSpacing: Story = {
  args: {
    children: <SampleContent />,
    spacing: 'xl',
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout with extra large spacing (4rem) around the main content.',
      },
    },
  },
};

// Header configuration examples
export const DefaultHeader: Story = {
  args: {
    children: <SampleContent />,
    headerProps: {
      variant: 'default',
      showNavigation: true,
      showAuthButtons: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout with default header configuration.',
      },
    },
  },
};

export const TransparentHeader: Story = {
  args: {
    children: <SampleContent />,
    headerProps: {
      variant: 'transparent',
      showNavigation: true,
      showAuthButtons: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout with transparent header, ideal for hero sections.',
      },
    },
  },
};

export const CompactHeader: Story = {
  args: {
    children: <SampleContent />,
    headerProps: {
      variant: 'compact',
      showNavigation: true,
      showAuthButtons: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout with compact header for space-efficient designs.',
      },
    },
  },
};

export const NoHeader: Story = {
  args: {
    children: <SampleContent />,
    showHeader: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout without header for focused experiences or app shells.',
      },
    },
  },
};

// Footer configuration examples
export const DefaultFooter: Story = {
  args: {
    children: <SampleContent />,
    footerProps: {
      variant: 'default',
      showSocialLinks: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout with default footer configuration.',
      },
    },
  },
};

export const MinimalFooter: Story = {
  args: {
    children: <SampleContent />,
    footerProps: {
      variant: 'minimal',
      showSocialLinks: false,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout with minimal footer showing only copyright information.',
      },
    },
  },
};

export const ExtendedFooter: Story = {
  args: {
    children: <SampleContent />,
    footerProps: {
      variant: 'extended',
      showSocialLinks: true,
    },
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout with extended footer for comprehensive information.',
      },
    },
  },
};

export const NoFooter: Story = {
  args: {
    children: <SampleContent />,
    showFooter: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout without footer for focused experiences or app shells.',
      },
    },
  },
};

// Real-world usage examples
export const LandingPage: Story = {
  args: {
    children: <SampleContent />,
    headerProps: {
      variant: 'transparent',
      showNavigation: true,
      showAuthButtons: true,
    },
    footerProps: {
      variant: 'extended',
      showSocialLinks: true,
    },
    containerSize: 'xl',
    spacing: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Landing page layout with transparent header and extended footer.',
      },
    },
  },
};

export const ApplicationPage: Story = {
  args: {
    children: <SampleContent />,
    headerProps: {
      variant: 'default',
      showNavigation: true,
      showAuthButtons: false,
    },
    footerProps: {
      variant: 'minimal',
      showSocialLinks: false,
    },
    containerSize: 'lg',
    spacing: 'md',
  },
  parameters: {
    docs: {
      description: {
        story: 'Application page layout for authenticated user areas.',
      },
    },
  },
};

export const LoginPage: Story = {
  args: {
    children: <FormContent />,
    headerProps: {
      variant: 'compact',
      showNavigation: false,
      showAuthButtons: false,
    },
    footerProps: {
      variant: 'minimal',
      showSocialLinks: false,
    },
    containerSize: 'sm',
    spacing: 'lg',
  },
  parameters: {
    docs: {
      description: {
        story: 'Login page layout with minimal header and footer for focused experience.',
      },
    },
  },
};

export const FullScreenApp: Story = {
  args: {
    children: (
      <div style={{ 
        background: '#f8fafc', 
        height: '80vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center' 
      }}>
        <Text as="h2" variant="h2">
          Aplicación de Pantalla Completa
        </Text>
      </div>
    ),
    showHeader: false,
    showFooter: false,
    containerSize: 'full',
    spacing: 'none',
  },
  parameters: {
    docs: {
      description: {
        story: 'Full screen application layout without header or footer.',
      },
    },
  },
};

// Accessibility showcase
export const AccessibilityFeatures: Story = {
  args: {
    children: <SampleContent />,
  },
  parameters: {
    docs: {
      description: {
        story: 'Layout demonstrating accessibility features including skip links, semantic structure, proper ARIA labels, and keyboard navigation support. Press Tab to see the skip link.',
      },
    },
  },
};

// Mobile responsiveness
export const MobileLayout: Story = {
  args: {
    children: <SampleContent />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Layout shown in mobile viewport to demonstrate responsive behavior.',
      },
    },
  },
};

export const TabletLayout: Story = {
  args: {
    children: <SampleContent />,
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Layout shown in tablet viewport to demonstrate responsive behavior.',
      },
    },
  },
};