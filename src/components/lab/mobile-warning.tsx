'use client';

import { useState, useEffect } from 'react';
import { MonitorPlay, X } from 'lucide-react';

export function MobileWarning() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobile = window.innerWidth < 768;
      const isDismissed = sessionStorage.getItem('lab-warning-dismissed');
      setShow(isMobile && !isDismissed);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const dismiss = () => {
    setShow(false);
    sessionStorage.setItem('lab-warning-dismissed', 'true');
  };

  if (!show) return null;

  return (
    <div className='fixed top-[70px] left-4 right-4 z-50 animate-in fade-in slide-in-from-top-2'>
      <div className='bg-yellow-500/10 backdrop-blur-md border border-yellow-500/20 text-yellow-600 dark:text-yellow-500 text-xs py-3 px-4 rounded-lg flex items-center justify-between shadow-lg'>
        <div className='flex items-center gap-2'>
          <MonitorPlay className='h-4 w-4' />
          <span>Best viewed on Desktop.</span>
        </div>
        <button
          onClick={dismiss}
          className='hover:bg-yellow-500/20 p-1 rounded-full transition-colors'
        >
          <X className='h-3 w-3' />
          <span className='sr-only'>Dismiss</span>
        </button>
      </div>
    </div>
  );
}
