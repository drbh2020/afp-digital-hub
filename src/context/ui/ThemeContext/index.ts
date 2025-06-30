export * from './ThemeProvider';
export { tokens } from '@/styles/tokens';

// Export default theme for testing
import { tokens } from '@/styles/tokens';

export const theme = {
  tokens,
  mode: 'light' as const,
};