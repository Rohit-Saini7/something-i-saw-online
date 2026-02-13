'use client';

import { useEffect, useState, useRef } from 'react';
import { ClockIcon, ServerIcon, ZapIcon, DatabaseIcon } from 'lucide-react';
import { useLogs } from './LogContext';
import { cn } from '@/lib/utils';

interface MetricProps {
  label: string;
  time: string | null;
  type: 'CSR' | 'SSR' | 'SSG' | 'ISR';
  description: string;
}

export default function TimeMetric({
  label,
  time,
  type,
  description,
}: MetricProps) {
  const { addLog } = useLogs();
  const [isHydrated, setIsHydrated] = useState(false);
  const [flash, setFlash] = useState(false);
  const prevTime = useRef(time);

  useEffect(() => {
    setIsHydrated(true);
    if (time) addLog(type, 'Component mounted and hydrated.', 'info');
  }, [addLog, time, type]);

  useEffect(() => {
    if (prevTime.current !== time && time) {
      const msg =
        type === 'SSR'
          ? 'Server snapshot received.'
          : type === 'ISR'
            ? 'Cache revalidation triggered.'
            : type === 'CSR'
              ? 'Browser DOM update.'
              : 'Static content loaded.';

      addLog(type, msg, 'success');
      prevTime.current = time;
    }
  }, [time, type, addLog]);

  useEffect(() => {
    if (prevTime.current !== time) {
      setFlash(true);
      const timer = setTimeout(() => setFlash(false), 600);
      prevTime.current = time;
      return () => clearTimeout(timer);
    }
  }, [time]);

  const styleMap = {
    CSR: 'border-info text-info bg-info/5',
    SSR: 'border-primary text-primary bg-primary/5',
    SSG: 'border-warning text-warning bg-warning/5',
    ISR: 'border-revalidate text-revalidate bg-revalidate/5',
  };

  const icons = {
    CSR: <ZapIcon className='size-4' />,
    SSR: <ServerIcon className='size-4' />,
    SSG: <DatabaseIcon className='size-4' />,
    ISR: <ClockIcon className='size-4' />,
  };

  return (
    <div
      className={cn(
        'relative flex h-full flex-col justify-between rounded-xl border-t-2 p-6 backdrop-blur-sm transition-all duration-500 shadow-sm hover:shadow-md bg-background/80',
        styleMap[type]
      )}
    >
      <div
        className={cn(
          'pointer-events-none absolute inset-0 bg-foreground/5 transition-opacity duration-300',
          flash ? 'opacity-100' : 'opacity-0'
        )}
      />

      <div className='mb-6 flex items-start justify-between'>
        <div className='flex items-center gap-2 text-xs font-bold uppercase tracking-widest opacity-80'>
          {icons[type]}
          {label}
        </div>

        <div className='flex items-center gap-1.5 text-[9px] font-mono uppercase text-muted-foreground'>
          <span
            className={cn(
              'h-1.5 w-1.5 rounded-full transition-colors duration-1000',
              isHydrated
                ? 'bg-success shadow-[0_0_8px_hsl(var(--success)/0.5)]'
                : 'bg-muted-foreground'
            )}
          />
          {isHydrated ? 'Hydrated' : 'Initializing'}
        </div>
      </div>

      <div className='space-y-1'>
        <div className='font-mono text-2xl font-light tracking-tighter tabular-nums text-foreground md:text-3xl'>
          {time || (
            <span className='animate-pulse text-muted-foreground'>
              --:--:--
            </span>
          )}
        </div>
        <p className='font-mono text-xs text-muted-foreground'>
          {time ? `Timestamp: ${time.split(' ')[0]}` : 'Waiting for client...'}
        </p>
      </div>

      <div className='mt-6 border-t pt-4'>
        <p className='text-xs leading-relaxed text-muted-foreground'>
          {description}
        </p>
      </div>
    </div>
  );
}
