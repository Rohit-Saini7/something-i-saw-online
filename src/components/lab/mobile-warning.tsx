'use client';

import { useState, useEffect } from 'react';
import { MonitorPlayIcon, XIcon } from 'lucide-react';
import { Button } from '@ui-components/button';

export default function MobileWarning() {
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
    <div className='fixed left-4 right-4 top-16 z-50 animate-in fade-in slide-in-from-top-2'>
      <div className='flex items-center justify-between rounded-lg border border-warning-border bg-warning-soft px-4 py-3 text-xs text-warning-foreground shadow-lg backdrop-blur-md'>
        <div className='flex items-center gap-2'>
          <MonitorPlayIcon className='h-4 w-4 text-warning' />
          <span>Best viewed on Desktop.</span>
        </div>

        <Button
          variant='ghost'
          size='icon-sm'
          onClick={dismiss}
          className='hover:bg-warning/20'
        >
          <XIcon className='h-3 w-3 text-warning' />
          <span className='sr-only'>Dismiss</span>
        </Button>
      </div>
    </div>
  );
}
