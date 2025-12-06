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
import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'sonner';

export default function ControlsBase({
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
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showShortcuts, setShowShortcuts] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const togglePlay = useCallback(() => setIsPlaying((p) => !p), []);

  const stepForward = useCallback(() => {
    const next = currentIndex + 1;
    if (next < history.length) onJump(next);
    else onStep();
  }, [currentIndex, history.length, onJump, onStep]);

  const stepBack = useCallback(() => {
    onJump(Math.max(0, currentIndex - 1));
  }, [currentIndex, onJump]);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(stepForward, 150);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, stepForward]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (
        e.target instanceof HTMLInputElement ||
        e.target instanceof HTMLTextAreaElement
      )
        return;

      switch (e.code) {
        case 'Space':
          e.preventDefault();
          togglePlay();
          break;
        case 'ArrowLeft':
          if (!isPlaying) stepBack();
          break;
        case 'ArrowRight':
          if (!isPlaying) stepForward();
          break;
        case 'KeyS':
          if (!isPlaying) onStep();
          break;
        case 'KeyR':
          onReset();
          setIsPlaying(false);
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isPlaying, stepBack, stepForward, togglePlay, onReset, onStep]);

  const copyState = () => {
    const data = JSON.stringify(
      grid.reduce((acc: number[], v, i) => (v ? [...acc, i] : acc), [])
    );
    navigator.clipboard.writeText(data);
    toast.success('Grid state copied to clipboard');
  };

  return (
    <div className='absolute bottom-8 left-1/2 -translate-x-1/2 w-full max-w-lg px-6'>
      {showShortcuts && (
        <ShortcutsCard onClose={() => setShowShortcuts(false)} />
      )}

      <div className='bg-white/90 dark:bg-slate-900/90 border border-slate-200 dark:border-slate-800 backdrop-blur-md rounded-xl p-4 shadow-xl dark:shadow-2xl transition-colors duration-300'>
        <div className='flex justify-between items-center mb-4'>
          <div className='flex items-center gap-2 text-slate-500 dark:text-slate-400'>
            <HistoryIcon className='w-4 h-4 text-emerald-600 dark:text-emerald-500' />
            <span className='text-xs font-mono font-bold uppercase hidden sm:inline'>
              Time Machine
            </span>
          </div>

          <div className='flex gap-2 items-center'>
            {Object.entries(PRESETS).map(([name, pattern]) => (
              <button
                key={name}
                onClick={() => {
                  onPreset(pattern);
                  setIsPlaying(false);
                }}
                className='text-2xs bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 px-2 py-1 rounded hover:bg-emerald-500/10 dark:hover:bg-emerald-500/20 hover:text-emerald-600 dark:hover:text-emerald-400 uppercase font-mono tracking-wide transition-colors'
              >
                {name}
              </button>
            ))}

            <div className='w-px h-4 bg-slate-200 dark:bg-slate-800 mx-1' />

            <button
              onClick={() => setShowShortcuts(!showShortcuts)}
              className={`text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors ${
                showShortcuts ? 'text-emerald-600 dark:text-emerald-400' : ''
              }`}
            >
              <KeyboardIcon className='w-3 h-3' />
            </button>

            <button
              onClick={copyState}
              className='text-slate-400 dark:text-slate-500 hover:text-emerald-600 dark:hover:text-emerald-400 transition-colors'
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
            onChange={(e) => {
              onScrub(Number(e.target.value));
              setIsPlaying(false);
            }}
            className='w-full h-2 bg-slate-200 dark:bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500'
          />
          <div className='absolute top-3 left-0 right-0 h-2 flex justify-between pointer-events-none px-1'>
            {history.map((_, i) => (
              <div
                key={i}
                className={`w-px h-1 transition-colors ${
                  i <= currentIndex
                    ? 'bg-emerald-500/50'
                    : 'bg-slate-300 dark:bg-slate-700'
                }`}
              />
            ))}
          </div>
        </div>

        <div className='flex justify-between items-center'>
          <button
            onClick={() => {
              onReset();
              setIsPlaying(false);
            }}
            className='p-2 rounded-md hover:bg-red-500/10 hover:text-red-600 dark:hover:text-red-400 text-slate-400 dark:text-slate-500 transition-colors'
          >
            <Trash2Icon className='w-4 h-4' />
          </button>

          <div className='flex items-center gap-3 bg-slate-100 dark:bg-slate-800/50 p-1 rounded-lg transition-colors'>
            <button
              onClick={stepBack}
              disabled={currentIndex === 0}
              className='p-2 hover:text-slate-900 dark:hover:text-white text-slate-400 disabled:opacity-30 transition-colors'
            >
              <ChevronLeftIcon className='w-4 h-4' />
            </button>

            <button
              onClick={togglePlay}
              className={`p-2 px-6 rounded-md flex items-center gap-2 text-xs font-bold transition-all ${
                isPlaying
                  ? 'bg-emerald-500 text-white dark:text-slate-950 shadow-md dark:shadow-[0_0_15px_rgba(16,185,129,0.4)]'
                  : 'bg-white/99 dark:bg-slate-700 text-slate-700 dark:text-white hover:bg-slate-50 dark:hover:bg-slate-600 shadow-sm dark:shadow-none'
              }`}
            >
              {isPlaying ? (
                <PauseIcon className='w-3 h-3' />
              ) : (
                <PlayIcon className='w-3 h-3' />
              )}
            </button>

            <button
              onClick={stepForward}
              disabled={currentIndex === history.length - 1}
              className='p-2 hover:text-slate-900 dark:hover:text-white text-slate-400 disabled:opacity-30 transition-colors'
            >
              <ChevronRightIcon className='w-4 h-4' />
            </button>
          </div>

          <button
            onClick={onStep}
            className='p-2 rounded-md hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 text-slate-400 dark:text-slate-500 transition-colors'
          >
            <CpuIcon className='w-4 h-4' />
          </button>
        </div>
      </div>
    </div>
  );
}
