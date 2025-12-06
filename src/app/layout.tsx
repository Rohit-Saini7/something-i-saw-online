import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@components/theme-provider';
import CommandMenu from '@components/command-menu';
import { Analytics } from '@vercel/analytics/react';
import { cn } from '@/lib/utils';
import { Toaster } from '@ui-components/sonner';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: 'Portfolio + Lab',
  description: 'A digital garden and experiment laboratory.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en' suppressHydrationWarning>
      <body
        className={cn(
          'bg-background min-h-screen font-sans antialiased',
          inter.variable
        )}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CommandMenu />
          <Analytics />
          <Toaster position='bottom-center' richColors />
        </ThemeProvider>
      </body>
    </html>
  );
}
