'use client';

import { XIcon } from 'lucide-react';

export const ShortcutsCard = ({ onClose }: { onClose: () => void }) => (
  <div className='absolute bottom-[110%] left-1/2 -translate-x-1/2 w-64 bg-slate-900 border border-slate-800 p-4 rounded-xl shadow-xl backdrop-blur-md z-50 animate-in fade-in slide-in-from-bottom-2'>
    <div className='flex justify-between items-center mb-3 border-b border-slate-800 pb-2'>
      <h4 className='text-xs font-bold text-slate-400 uppercase tracking-widest'>
        Keyboard
      </h4>
      <button onClick={onClose} className='text-slate-500 hover:text-white'>
        <XIcon className='w-3 h-3' />
      </button>
    </div>

    <div className='space-y-2 text-xs font-mono'>
      <div className='flex justify-between'>
        <span className='text-slate-500'>Space</span>
        <span className='text-emerald-400'>Play / Pause</span>
      </div>

      <div className='flex justify-between'>
        <span className='text-slate-500'>← / →</span>
        <span className='text-emerald-400'>Time Travel</span>
      </div>

      <div className='flex justify-between'>
        <span className='text-slate-500'>S</span>
        <span className='text-emerald-400'>Next Gen (Step)</span>
      </div>

      <div className='flex justify-between'>
        <span className='text-slate-500'>R</span>
        <span className='text-emerald-400'>Reset</span>
      </div>
    </div>
  </div>
);
