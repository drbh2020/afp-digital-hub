import { createGlobalStyle } from 'styled-components';
import { tokens } from '../tokens';

export const GlobalStyles = createGlobalStyle`
  /* CSS Reset */
  *,
  *::before,
  *::after {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  /* HTML & Body */
  html {
    font-size: 1rem;
    line-height: 1.5;
    -webkit-text-size-adjust: 100%;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-rendering: optimizeLegibility;
  }

  body {
    font-family: ${tokens.fontFamilies.sans};
    font-size: ${tokens.fontSizes.base};
    font-weight: ${tokens.fontWeights.normal};
    line-height: ${tokens.lineHeights.normal};
    color: ${tokens.colors.neutral[900]};
    background-color: ${tokens.colors.white};
    min-height: 100vh;
    min-height: 100dvh;
    overflow-x: hidden;
  }

  /* Typography */
  h1, h2, h3, h4, h5, h6 {
    font-weight: ${tokens.fontWeights.bold};
    line-height: ${tokens.lineHeights.tight};
    margin-bottom: ${tokens.spacing[4]};
    color: ${tokens.colors.neutral[900]};
  }

  h1 {
    font-size: ${tokens.textSizes['4xl'].fontSize};
    line-height: ${tokens.textSizes['4xl'].lineHeight};
    
    @media ${tokens.mediaQueries.md} {
      font-size: ${tokens.textSizes['5xl'].fontSize};
      line-height: ${tokens.textSizes['5xl'].lineHeight};
    }
  }

  h2 {
    font-size: ${tokens.textSizes['3xl'].fontSize};
    line-height: ${tokens.textSizes['3xl'].lineHeight};
    
    @media ${tokens.mediaQueries.md} {
      font-size: ${tokens.textSizes['4xl'].fontSize};
      line-height: ${tokens.textSizes['4xl'].lineHeight};
    }
  }

  h3 {
    font-size: ${tokens.textSizes['2xl'].fontSize};
    line-height: ${tokens.textSizes['2xl'].lineHeight};
    
    @media ${tokens.mediaQueries.md} {
      font-size: ${tokens.textSizes['3xl'].fontSize};
      line-height: ${tokens.textSizes['3xl'].lineHeight};
    }
  }

  h4 {
    font-size: ${tokens.textSizes.xl.fontSize};
    line-height: ${tokens.textSizes.xl.lineHeight};
    
    @media ${tokens.mediaQueries.md} {
      font-size: ${tokens.textSizes['2xl'].fontSize};
      line-height: ${tokens.textSizes['2xl'].lineHeight};
    }
  }

  h5 {
    font-size: ${tokens.textSizes.lg.fontSize};
    line-height: ${tokens.textSizes.lg.lineHeight};
    
    @media ${tokens.mediaQueries.md} {
      font-size: ${tokens.textSizes.xl.fontSize};
      line-height: ${tokens.textSizes.xl.lineHeight};
    }
  }

  h6 {
    font-size: ${tokens.textSizes.base.fontSize};
    line-height: ${tokens.textSizes.base.lineHeight};
    
    @media ${tokens.mediaQueries.md} {
      font-size: ${tokens.textSizes.lg.fontSize};
      line-height: ${tokens.textSizes.lg.lineHeight};
    }
  }

  p {
    margin-bottom: ${tokens.spacing[4]};
    color: ${tokens.colors.neutral[700]};
  }

  /* Links */
  a {
    color: ${tokens.colors.primary[500]};
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${tokens.colors.primary[600]};
      text-decoration: underline;
    }

    &:focus {
      outline: 2px solid ${tokens.colors.primary[500]};
      outline-offset: 2px;
      border-radius: ${tokens.borderRadius.sm};
    }
  }

  /* Lists */
  ul, ol {
    margin-bottom: ${tokens.spacing[4]};
    padding-left: ${tokens.spacing[6]};
  }

  li {
    margin-bottom: ${tokens.spacing[2]};
    color: ${tokens.colors.neutral[700]};
  }

  /* Code */
  code {
    font-family: ${tokens.fontFamilies.mono};
    font-size: 0.875em;
    color: ${tokens.colors.primary[600]};
    background-color: ${tokens.colors.neutral[100]};
    padding: ${tokens.spacing[1]} ${tokens.spacing[2]};
    border-radius: ${tokens.borderRadius.sm};
  }

  pre {
    font-family: ${tokens.fontFamilies.mono};
    background-color: ${tokens.colors.neutral[900]};
    color: ${tokens.colors.neutral[100]};
    padding: ${tokens.spacing[4]};
    border-radius: ${tokens.borderRadius.md};
    overflow-x: auto;
    margin-bottom: ${tokens.spacing[4]};

    code {
      background: none;
      color: inherit;
      padding: 0;
    }
  }

  /* Form Elements */
  button, input, select, textarea {
    font-family: inherit;
    font-size: inherit;
    line-height: inherit;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    
    &:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }

  input, select, textarea {
    border: ${tokens.borderWidths[1]} solid ${tokens.colors.neutral[300]};
    border-radius: ${tokens.borderRadius.md};
    padding: ${tokens.spacing[3]} ${tokens.spacing[4]};
    transition: border-color 0.2s ease-in-out, box-shadow 0.2s ease-in-out;

    &:focus {
      outline: none;
      border-color: ${tokens.colors.primary[500]};
      box-shadow: 0 0 0 3px ${tokens.colors.primary[500]}20;
    }

    &::placeholder {
      color: ${tokens.colors.neutral[400]};
    }
  }

  /* Images */
  img {
    max-width: 100%;
    height: auto;
    display: block;
  }

  /* Tables */
  table {
    width: 100%;
    border-collapse: collapse;
    margin-bottom: ${tokens.spacing[4]};
  }

  th, td {
    padding: ${tokens.spacing[3]} ${tokens.spacing[4]};
    text-align: left;
    border-bottom: ${tokens.borderWidths[1]} solid ${tokens.colors.neutral[200]};
  }

  th {
    font-weight: ${tokens.fontWeights.semibold};
    color: ${tokens.colors.neutral[900]};
    background-color: ${tokens.colors.neutral[50]};
  }

  /* Utility Classes */
  .sr-only {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    white-space: nowrap;
    border: 0;
  }

  .focus-visible {
    outline: 2px solid ${tokens.colors.primary[500]};
    outline-offset: 2px;
  }

  /* Smooth scrolling */
  @media (prefers-reduced-motion: no-preference) {
    html {
      scroll-behavior: smooth;
    }
  }

  /* High contrast mode support */
  @media (prefers-contrast: high) {
    body {
      color: #000000;
      background-color: #ffffff;
    }

    a {
      color: #0000ff;
    }

    button, input, select, textarea {
      border-color: #000000;
    }
  }

  /* Dark mode support (optional) */
  @media (prefers-color-scheme: dark) {
    body {
      color: ${tokens.colors.neutral[100]};
      background-color: ${tokens.colors.neutral[900]};
    }

    h1, h2, h3, h4, h5, h6 {
      color: ${tokens.colors.neutral[100]};
    }

    p, li {
      color: ${tokens.colors.neutral[300]};
    }

    code {
      background-color: ${tokens.colors.neutral[800]};
      color: ${tokens.colors.primary[400]};
    }

    input, select, textarea {
      background-color: ${tokens.colors.neutral[800]};
      border-color: ${tokens.colors.neutral[600]};
      color: ${tokens.colors.neutral[100]};

      &::placeholder {
        color: ${tokens.colors.neutral[500]};
      }
    }

    th {
      background-color: ${tokens.colors.neutral[800]};
      color: ${tokens.colors.neutral[100]};
    }

    td {
      border-color: ${tokens.colors.neutral[700]};
    }
  }
`;