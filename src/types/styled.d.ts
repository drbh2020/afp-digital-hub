import 'styled-components';
import { Theme } from '../context/ui/ThemeContext';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}