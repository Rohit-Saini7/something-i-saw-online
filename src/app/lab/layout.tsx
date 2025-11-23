'use client';

import Link from 'next/link';
import { ArrowLeftIcon } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function LabLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  const isLabRoot = pathname === '/lab';
  const backHref = isLabRoot ? '/' : '/lab';
  const backLabel = isLabRoot ? 'Back to Base' : 'Back to Lab';

  return (
    <div className='bg-background text-foreground selection:bg-primary/20 min-h-screen'>
      <header className='pointer-events-none fixed top-0 right-0 left-0 z-50 flex items-start justify-between p-6'>
        <Link
          href={backHref}
          className='text-muted-foreground hover:text-foreground bg-background/50 border-border pointer-events-auto flex items-center gap-2 rounded-full border px-3 py-1.5 text-sm shadow-sm backdrop-blur-sm transition-colors'
        >
          <ArrowLeftIcon className='h-4 w-4' />
          <span className='font-mono'>{backLabel}</span>
        </Link>
      </header>

      <main className='relative min-h-screen px-6 pt-20'>{children}</main>
    </div>
  );
}
