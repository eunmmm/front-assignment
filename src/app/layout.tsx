import type { Metadata } from 'next';

import ThemeProviderWrapper from '@/contexts/ThemeProviderWrapper';

import '../styles/globals.scss';
import '../styles/variables.scss';

export const metadata: Metadata = {
  title: 'Todo List',
  description: 'Manage your tasks efficiently with our Todo List',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko">
      <body>
        <ThemeProviderWrapper>{children}</ThemeProviderWrapper>
      </body>
    </html>
  );
}
