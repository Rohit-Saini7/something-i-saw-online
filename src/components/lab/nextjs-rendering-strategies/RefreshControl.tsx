'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { RefreshCwIcon } from 'lucide-react';

export default function RefreshControl() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRefresh = () => {
    setLoading(true);
    router.refresh();
    setTimeout(() => setLoading(false), 500);
  };

  return (
    <div className='fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-4 bg-white/90 dark:bg-gray-800/90 border border-gray-200 dark:border-gray-700 p-2 pr-6 rounded-full backdrop-blur-md shadow-2xl z-50'>
      <button
        onClick={handleRefresh}
        className={`p-3 rounded-full bg-blue-600 hover:bg-blue-500 text-white transition-all ${loading ? 'animate-spin-fast' : ''}`}
      >
        <RefreshCwIcon size={20} />
      </button>
      <div className='text-sm'>
        <p className='text-gray-900 dark:text-white font-medium'>
          Soft Refresh
        </p>
        <p className='text-gray-500 dark:text-gray-400 text-xs'>
          <code className='bg-gray-100 dark:bg-gray-900 px-1 rounded border border-gray-200 dark:border-gray-700'>
            router.refresh()
          </code>
        </p>
      </div>
    </div>
  );
}
