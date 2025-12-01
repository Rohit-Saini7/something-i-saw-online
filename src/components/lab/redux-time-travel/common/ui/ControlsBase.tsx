'use client';

import {
  HistoryIcon,
  PlayIcon,
  PauseIcon,
  ChevronRightIcon,
  ChevronLeftIcon,
  Trash2Icon,
  CpuIcon,
  Share2Icon,
  KeyboardIcon,
} from 'lucide-react';

import { PRESETS } from '../constants';
import { ShortcutsCard } from './ShortcutsCard';
import { useState, useRef, useEffect } from 'react';

export const ControlsBase = ({
  history,
  currentIndex,
  grid,
  onScrub,
  onReset,
  onStep,
  onJump,
  onPreset,
}: {
  history: boolean[][];
  currentIndex: number;
  grid: boolean[];
  onScrub: (n: number) => void;
  onReset: () => void;
  onStep: () => void;
  onJump: (n: number) => void;
  onPreset: (pattern: number[]) => void;
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(() => {
        const next = currentIndex + 1;
        if (next < history.length) onJump(next);
        else onStep();
      }, 150);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, [isPlaying, onJump, onStep, currentIndex, history.length]);

  const copyState = () => {
    const data = JSON.stringify(
      grid.reduce((acc: number[], v, i) => (v ? [...acc, i] : acc), [])
    );
    navigator.clipboard.writeText(data);
    alert('Grid state copied to clipboard');
  };

  return (
    <div className='absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6'>
      {showShortcuts && (
        <ShortcutsCard onClose={() => setShowShortcuts(false)} />
      )}

      <div className='bg-slate-900/90 border border-slate-800 backdrop-blur-md rounded-xl p-4 shadow-2xl'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center gap-2 text-slate-400'>
            <HistoryIcon className='w-4 h-4 text-emerald-500' />
            <span className='text-xs font-mono font-bold uppercase hidden sm:inline'>
              Time Machine
            </span>
          </div>

          <div className='flex gap-2 items-center'>
            {Object.entries(PRESETS).map(([name, pattern]) => (
              <button
                key={name}
                onClick={() => onPreset(pattern)}
                className='text-[10px] bg-slate-800 px-2 py-1 rounded hover:bg-emerald-500/20 hover:text-emerald-400 uppercase font-mono tracking-wide'
              >
                {name}
              </button>
            ))}

            <div className='w-px h-4 bg-slate-800 mx-1' />

            <button
              onClick={() => setShowShortcuts(!showShortcuts)}
              className={`text-slate-500 hover:text-emerald-400 ${
                showShortcuts ? 'text-emerald-400' : ''
              }`}
            >
              <KeyboardIcon className='w-3 h-3' />
            </button>

            <button
              onClick={copyState}
              className='text-slate-500 hover:text-emerald-400'
            >
              <Share2Icon className='w-3 h-3' />
            </button>
          </div>
        </div>

        <div className='relative mb-5 group'>
          <input
            type='range'
            min={0}
            max={history.length - 1}
            value={currentIndex}
            onChange={(e) => onScrub(Number(e.target.value))}
            className='w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500'
          />
          <div className='absolute top-3 left-0 right-0 h-2 flex justify-between pointer-events-none px-1'>
            {history.map((_, i) => (
              <div
                key={i}
                className={`w-px h-1 ${
                  i <= currentIndex ? 'bg-emerald-500/50' : 'bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <button
            onClick={onReset}
            className='p-2 rounded-md hover:bg-red-500/10 hover:text-red-400 text-slate-500'
          >
            <Trash2Icon className='w-4 h-4' />
          </button>

          <div className='flex items-center gap-3 bg-slate-800/50 p-1 rounded-lg'>
            <button
              onClick={() => onJump(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className='p-2 hover:text-white text-slate-400 disabled:opacity-30'
            >
              <ChevronLeftIcon className='w-4 h-4' />
            </button>

            <button
              onClick={() => setIsPlaying(!isPlaying)}
              className={`p-2 px-6 rounded-md flex items-center gap-2 text-xs font-bold ${
                isPlaying
                  ? 'bg-emerald-500 text-slate-950 shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-slate-700 text-white hover:bg-slate-600'
              }`}
            >
              {isPlaying ? (
                <PauseIcon className='w-3 h-3' />
              ) : (
                <PlayIcon className='w-3 h-3' />
              )}
              {isPlaying ? 'RUN SIM' : 'PLAY'}
            </button>

            <button
              onClick={() =>
                onJump(Math.min(history.length - 1, currentIndex + 1))
              }
              disabled={currentIndex === history.length - 1}
              className='p-2 hover:text-white text-slate-400 disabled:opacity-30'
            >
              <ChevronRightIcon className='w-4 h-4' />
            </button>
          </div>

          <button
            onClick={onStep}
            className='p-2 rounded-md hover:bg-emerald-500/10 hover:text-emerald-400 text-slate-500'
          >
            <CpuIcon className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  );
};
