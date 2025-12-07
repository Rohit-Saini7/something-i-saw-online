'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RefreshCwIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function RefreshControl() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    router.refresh();
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className='fixed bottom-8 left-1/2 z-50 flex -translate-x-1/2 items-center gap-4 rounded-full border bg-background/90 p-2 pr-6 shadow-2xl backdrop-blur-md transition-colors'>
      <button
        onClick={handleRefresh}
        className={cn(
          'rounded-full bg-primary p-3 text-primary-foreground transition-all hover:bg-primary/90',
          loading ? 'animate-rotate-once' : ''
        )}
      >
        <RefreshCwIcon size={20} />
      </button>
      <div className='text-sm'>
        <p className='font-medium text-foreground'>Soft Refresh</p>
        <p className='text-xs text-muted-foreground'>
          <code className='rounded border bg-muted px-1'>router.refresh()</code>
        </p>
      </div>
    </div>
  );
}
