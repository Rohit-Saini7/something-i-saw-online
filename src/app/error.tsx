'use client';

import { useEffect } from 'react';
import { AlertCircleIcon } from 'lucide-react';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex h-[calc(100vh-100px)] flex-col items-center justify-center gap-4 text-center'>
      <div className='rounded-full bg-red-500/10 p-4 text-red-500'>
        <AlertCircleIcon className='h-10 w-10' />
      </div>
      <h2 className='text-2xl font-bold tracking-tight'>
        Something went wrong!
      </h2>
      <p className='text-muted-foreground max-w-[400px]'>
        A critical error occurred in the lab mainframe.
      </p>
      <button
        onClick={() => reset()}
        className='bg-primary text-primary-foreground rounded-md px-4 py-2 text-sm font-medium transition-opacity hover:opacity-90'
      >
        Try again
      </button>
    </div>
  );
}
