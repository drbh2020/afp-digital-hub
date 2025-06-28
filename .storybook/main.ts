import { StorybookConfig } from "@storybook/react-webpack5"
import path from "path"

const config: StorybookConfig = {
  stories: ["../src/**/*.stories.@(js|jsx|ts|tsx|mdx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-links",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding"
  ],
  framework: {
    name: "@storybook/react-webpack5",
    options: {},
  },
  webpackFinal: async (config) => {
    // Extend webpack config to match Gatsby's setup
    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        '@': path.resolve(__dirname, '../src'),
        '@/components': path.resolve(__dirname, '../src/components'),
        '@/atoms': path.resolve(__dirname, '../src/components/atoms'),
        '@/molecules': path.resolve(__dirname, '../src/components/molecules'),
        '@/organisms': path.resolve(__dirname, '../src/components/organisms'),
        '@/templates': path.resolve(__dirname, '../src/components/templates'),
        '@/pages': path.resolve(__dirname, '../src/components/pages'),
        '@/hooks': path.resolve(__dirname, '../src/hooks'),
        '@/utils': path.resolve(__dirname, '../src/utils'),
        '@/types': path.resolve(__dirname, '../src/types'),
        '@/schemas': path.resolve(__dirname, '../src/schemas'),
        '@/styles': path.resolve(__dirname, '../src/styles'),
        '@/data': path.resolve(__dirname, '../src/data'),
        '@/context': path.resolve(__dirname, '../src/context')
      }
    }

    // Support for styled-components (same as Gatsby)
    if (config.module?.rules) {
      config.module.rules.push({
        test: /\.(ts|tsx)$/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              presets: [
                '@babel/preset-env',
                '@babel/preset-react',
                '@babel/preset-typescript'
              ],
              plugins: [
                ['babel-plugin-styled-components', { displayName: true }]
              ]
            }
          }
        ]
      })
    }  
    return config;
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
    reactDocgenTypescriptOptions: {
      shouldExtractLiteralValuesFromEnum: true,
      propFilter: (prop) => (prop.parent ? !/node_modules/.test(prop.parent.fileName) : true)
    }
  },
  docs: {
    defaultName: 'Documentation',
  }
}
export default config;
