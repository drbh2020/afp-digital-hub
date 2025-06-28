
import { Preview } from '@storybook/react-webpack5';
import { ThemeProvider } from 'styled-components'
import { theme } from './theme'
/* import { GlobalStyles } from '../src/styles/globalStyles' */

const preview: Preview  = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/
      }
    },
    docs: {
      theme: {
        brandTitle: 'AFP Digital Hub',
        brandUrl: 'https://afp-digital-hub.netlify.app'
      }
    }
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        {/* <GlobalStyles /> */}
        <Story />
      </ThemeProvider>
    )
  ]
};

export default preview;