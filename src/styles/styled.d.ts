import 'styled-components';
import { Theme } from '@/context/ui/ThemeContext/ThemeProvider';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}