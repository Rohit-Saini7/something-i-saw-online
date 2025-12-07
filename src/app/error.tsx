'use client';

import { useEffect } from 'react';
import { AlertCircleIcon } from 'lucide-react';
import Link from 'next/link';

export default function Error({
  error,
}: {
  error: Error & { digest?: string };
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex min-h-screen flex-col items-center justify-center space-y-6 px-4 text-center bg-background text-foreground'>
      <div className='rounded-full bg-destructive/10 p-4'>
        <AlertCircleIcon className='h-10 w-10 text-destructive' />
      </div>
      <div className='space-y-2'>
        <h2 className='text-2xl font-bold tracking-tight'>
          Something went wrong!
        </h2>
        <p className='max-w-md text-muted-foreground'>
          A critical error occurred in the mainframe.
        </p>
      </div>

      <div className='flex gap-4'>
        <Link
          href='/'
          className='inline-flex h-9 items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
        >
          Return to Base
        </Link>
        <Link
          href='/lab'
          className='inline-flex h-9 items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50'
        >
          Explore Lab
        </Link>
      </div>
    </div>
  );
}
