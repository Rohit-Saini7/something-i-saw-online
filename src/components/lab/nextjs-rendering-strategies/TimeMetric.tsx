'use client';

import { useEffect, useState, useRef } from 'react';
import { ClockIcon, ServerIcon, ZapIcon, DatabaseIcon } from 'lucide-react';
import { useLogs } from './LogContext';

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

  const styles = {
    CSR: 'border-blue-500 text-blue-700 dark:text-blue-400 bg-blue-50 dark:bg-blue-500/5',
    SSR: 'border-emerald-500 text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-500/5',
    SSG: 'border-amber-500 text-amber-700 dark:text-amber-400 bg-amber-50 dark:bg-amber-500/5',
    ISR: 'border-purple-500 text-purple-700 dark:text-purple-400 bg-purple-50 dark:bg-purple-500/5',
  };

  const icons = {
    CSR: <ZapIcon className='w-4 h-4' />,
    SSR: <ServerIcon className='w-4 h-4' />,
    SSG: <DatabaseIcon className='w-4 h-4' />,
    ISR: <ClockIcon className='w-4 h-4' />,
  };

  return (
    <div
      className={`relative flex flex-col justify-between h-full border-t-2 rounded-xl p-6 transition-all duration-500 ${styles[type]} bg-white/80 dark:bg-gray-900/40 backdrop-blur-sm shadow-sm hover:shadow-md dark:hover:bg-gray-900/60`}
    >
      <div
        className={`absolute inset-0 bg-black/5 dark:bg-white/5 pointer-events-none transition-opacity duration-300 ${flash ? 'opacity-100' : 'opacity-0'}`}
      />

      <div className='flex justify-between items-start mb-6'>
        <div className='flex items-center gap-2 font-bold tracking-widest text-xs uppercase opacity-80'>
          {icons[type]}
          {label}
        </div>
        <div className='flex items-center gap-1.5 text-[9px] font-mono text-gray-500 dark:text-gray-500 uppercase'>
          <span
            className={`w-1.5 h-1.5 rounded-full transition-colors duration-1000 ${isHydrated ? 'bg-emerald-500 dark:bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.4)] dark:shadow-[0_0_8px_rgba(52,211,153,0.6)]' : 'bg-gray-400 dark:bg-gray-700'}`}
          />
          {isHydrated ? 'Hydrated' : 'Initializing'}
        </div>
      </div>

      <div className='space-y-1'>
        <div className='font-mono text-2xl md:text-3xl font-light tracking-tighter tabular-nums text-gray-900 dark:text-gray-100'>
          {time || (
            <span className='animate-pulse text-gray-400 dark:text-gray-700'>
              --:--:--
            </span>
          )}
        </div>
        <p className='text-xs text-gray-500 dark:text-gray-500 font-mono'>
          {time ? `Timestamp: ${time.split(' ')[0]}` : 'Waiting for client...'}
        </p>
      </div>

      <div className='mt-6 pt-4 border-t border-gray-200 dark:border-white/5'>
        <p className='text-xs text-gray-600 dark:text-gray-400 leading-relaxed'>
          {description}
        </p>
      </div>
    </div>
  );
}
