import { FC } from 'react';
import { HeadFC, PageProps } from 'gatsby';
import { ThemeProvider } from '@/context/ui/ThemeContext';
import { DesignSystemShowcase } from '@/components/pages/DesignSystemShowcase';

const DesignSystemPage: FC<PageProps> = () => {
  return (
    <ThemeProvider>
      <DesignSystemShowcase />
    </ThemeProvider>
  );
};

export default DesignSystemPage;

export const Head: HeadFC = () => (
  <>
    <title>Design System - AFP Digital Hub</title>
    <meta name="description" content="Complete AFP design system showcase with components, typography, and interactive examples." />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
  </>
);