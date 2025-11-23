import Link from 'next/link';
import { AlertTriangleIcon } from 'lucide-react';

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center space-y-6 px-4 text-center'>
      <div className='rounded-full bg-red-100 p-4 dark:bg-red-900/20'>
        <AlertTriangleIcon className='h-10 w-10 text-red-600 dark:text-red-500' />
      </div>

      <div className='space-y-2'>
        <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl'>
          404: System Failure
        </h1>
        <p className='text-muted-foreground max-w-[400px]'>
          The requested coordinate does not exist in this sector.
        </p>
      </div>

      <div className='flex gap-4'>
        <Link
          href='/'
          className='focus-visible:ring-ring bg-primary text-primary-foreground hover:bg-primary/90 inline-flex h-9 items-center justify-center rounded-md px-4 py-2 text-sm font-medium shadow transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
        >
          Return to Base
        </Link>
        <Link
          href='/lab'
          className='focus-visible:ring-ring border-input bg-background hover:bg-accent hover:text-accent-foreground inline-flex h-9 items-center justify-center rounded-md border px-4 py-2 text-sm font-medium shadow-sm transition-colors focus-visible:ring-1 focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50'
        >
          Explore Lab
        </Link>
      </div>
    </div>
  );
}
