import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'
import path from 'path'
import { fileURLToPath } from 'url'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./__tests__/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: [
        'node_modules/',
        '__tests__/',
        '.storybook/',
        'coverage/',
        'public/',
        '.cache/',
        'gatsby-*.ts',
        '**/*.stories.tsx',
        '**/*.types.ts'
      ],
      thresholds: {
        global: {
          branches: 80,
          functions: 80,
          lines: 80,
          statements: 80
        }
      }
    }
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/components'),
      '@/atoms': path.resolve(__dirname, 'src/components/atoms'),
      '@/molecules': path.resolve(__dirname, 'src/components/molecules'),
      '@/organisms': path.resolve(__dirname, 'src/components/organisms'),
      '@/templates': path.resolve(__dirname, 'src/components/templates'),
      '@/pages': path.resolve(__dirname, 'src/components/pages'),
      '@/hooks': path.resolve(__dirname, 'src/hooks'),
      '@/utils': path.resolve(__dirname, 'src/utils'),
      '@/types': path.resolve(__dirname, 'src/types'),
      '@/schemas': path.resolve(__dirname, 'src/schemas'),
      '@/styles': path.resolve(__dirname, 'src/styles'),
      '@/data': path.resolve(__dirname, 'src/data'),
      '@/context': path.resolve(__dirname, 'src/context')
    }
  }
})