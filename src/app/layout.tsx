import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ThemeProvider from '@components/theme-provider';
import CommandMenu from '@components/command-menu';
import { Analytics } from '@vercel/analytics/react';
import { cn } from '@/lib/utils';
import { Toaster } from '@ui-components/sonner';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Portfolio + Lab',
  description: 'A digital garden and experiment laboratory.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en' suppressHydrationWarning className='bg-background'>
      <body
        className={cn('min-h-screen font-sans antialiased', inter.variable)}
      >
        <ThemeProvider
          attribute='class'
          defaultTheme='system'
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <CommandMenu />
          <Toaster position='bottom-center' richColors />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
