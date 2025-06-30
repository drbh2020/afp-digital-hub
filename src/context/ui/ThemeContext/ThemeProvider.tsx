import { createContext, useContext, ReactNode, FC, useMemo } from 'react';
import { ThemeProvider as StyledThemeProvider } from 'styled-components';
import { tokens } from '@/styles/tokens';
import { GlobalStyles } from '@/styles/foundations/global';

// Create flexible types that allow custom values while preserving autocomplete
type FlexibleColorScale = {
  [K in keyof typeof tokens.colors.primary]: (string & {})
};

type FlexibleColors = {
  [K in keyof typeof tokens.colors]: K extends 'white' | 'black' | 'transparent' 
    ? (string & {})
    : FlexibleColorScale
};

type FlexibleTokens = Omit<typeof tokens, 'colors'> & {
  colors: FlexibleColors;
};

export interface Theme {
  tokens: FlexibleTokens;
  mode: 'light' | 'dark';
}

const defaultTheme: Theme = {
  tokens,
  mode: 'light',
};

const ThemeContext = createContext<Theme>(defaultTheme);

export interface ThemeProviderProps {
  children: ReactNode;
  theme?: Partial<Theme>;
}

export const ThemeProvider: FC<ThemeProviderProps> = ({
  children,
  theme = {},
}) => {
  // Memoize theme to prevent unnecessary re-renders
  const mergedTheme = useMemo(() => ({
    ...defaultTheme,
    ...theme,
  }), [theme]);

  return (
    <ThemeContext.Provider value={mergedTheme}>
      <StyledThemeProvider theme={mergedTheme}>
        <GlobalStyles />
        {children}
      </StyledThemeProvider>
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Helper hook for accessing tokens directly
export const useTokens = () => {
  const { tokens } = useTheme();
  return tokens;
};