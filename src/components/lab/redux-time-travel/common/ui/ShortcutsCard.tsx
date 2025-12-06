'use client';

import { XIcon } from 'lucide-react';
import { useEffect } from 'react';

export const ShortcutsCard = ({ onClose }: { onClose: () => void }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);
  return (
    <div className='absolute bottom-[110%] left-1/2 -translate-x-1/2 w-64 bg-white/95 dark:bg-slate-900/95 border border-slate-200 dark:border-slate-800 p-4 rounded-xl shadow-xl backdrop-blur-md z-50 animate-in fade-in slide-in-from-bottom-2 transition-colors'>
      <div className='flex justify-between items-center mb-3 border-b border-slate-100 dark:border-slate-800 pb-2'>
        <h4 className='text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest'>
          Keyboard
        </h4>
        <button
          onClick={onClose}
          className='text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-white transition-colors'
        >
          <XIcon className='w-3 h-3' />
        </button>
      </div>

      <div className='space-y-2 text-xs font-mono'>
        <div className='flex justify-between'>
          <span className='text-slate-500'>Space</span>
          <span className='text-emerald-600 dark:text-emerald-400'>
            Play / Pause
          </span>
        </div>

        <div className='flex justify-between'>
          <span className='text-slate-500'>← / →</span>
          <span className='text-emerald-600 dark:text-emerald-400'>
            Time Travel
          </span>
        </div>

        <div className='flex justify-between'>
          <span className='text-slate-500'>S</span>
          <span className='text-emerald-600 dark:text-emerald-400'>
            Next Gen (Step)
          </span>
        </div>

        <div className='flex justify-between'>
          <span className='text-slate-500'>R</span>
          <span className='text-emerald-600 dark:text-emerald-400'>Reset</span>
        </div>
      </div>
    </div>
  );
};
