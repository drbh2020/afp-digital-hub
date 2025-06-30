import type { Preview } from '@storybook/react';
import { ThemeProvider } from '../src/context/ui/ThemeContext';
import { tokens } from '../src/styles/tokens';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    docs: {
      theme: {
        brandTitle: 'AFP Digital Hub',
        brandUrl: 'https://afp-digital-hub.netlify.app'
      }
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: tokens.colors.white,
        },
        {
          name: 'dark',
          value: tokens.colors.neutral[900],
        },
        {
          name: 'primary',
          value: tokens.colors.primary[50],
        },
      ],
    },
    viewport: {
      viewports: {
        mobile: {
          name: 'Mobile',
          styles: {
            width: '375px',
            height: '667px',
          },
        },
        tablet: {
          name: 'Tablet',
          styles: {
            width: '768px',
            height: '1024px',
          },
        },
        desktop: {
          name: 'Desktop',
          styles: {
            width: '1024px',
            height: '768px',
          },
        },
        largeDesktop: {
          name: 'Large Desktop',
          styles: {
            width: '1440px',
            height: '900px',
          },
        },
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;