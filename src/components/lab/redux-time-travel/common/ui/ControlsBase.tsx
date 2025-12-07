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
  DownloadIcon,
} from 'lucide-react';

import { PRESETS } from '../constants';
import { useState, useRef, useEffect, useCallback } from 'react';
import { toast } from 'sonner';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@ui-components/dialog';
import { Button } from '@ui-components/button';
import { useClipboard } from '@/hooks/useClipboard';
import { Kbd, KbdGroup } from '@ui-components/kbd';
import { cn } from '@/lib/utils';
import { Slider } from '@ui-components/slider';
import { Textarea } from '@ui-components/textarea';

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
  const copy = useClipboard();

  const [isImporting, setIsImporting] = useState(false);
  const [importText, setImportText] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
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
    copy(data);
  };

  const handleImport = () => {
    try {
      const parsed = JSON.parse(importText);
      if (Array.isArray(parsed) && parsed.every((n) => typeof n === 'number')) {
        onPreset(parsed);
        setIsImporting(false);
        setImportText('');
      } else {
        toast.error(
          'Invalid format. Expecting an array of numbers like [1, 5, 10]'
        );
      }
    } catch (e: unknown) {
      console.error('Error while parsing JSON in ControlsBase:', importText, e);
      toast.error('Invalid JSON.');
    }
  };

  return (
    <div className='absolute bottom-8 left-1/2 w-full max-w-lg -translate-x-1/2 px-6'>
      <div className='rounded-xl border border-border bg-background/90 p-4 shadow-xl backdrop-blur-md'>
        <div className='mb-4 flex items-center justify-between'>
          <div className='flex items-center gap-2 text-muted-foreground'>
            <HistoryIcon className='size-4 text-primary' />
            <span className='hidden font-mono text-base font-bold uppercase sm:inline'>
              Time Machine
            </span>
          </div>

          <div className='flex items-center gap-2'>
            {Object.entries(PRESETS).map(([name, pattern]) => (
              <button
                key={name}
                onClick={() => {
                  onPreset(pattern);
                  setIsPlaying(false);
                }}
                className='rounded bg-muted px-2 py-1 font-mono text-2xs uppercase tracking-wide text-muted-foreground transition hover:bg-accent hover:text-accent-foreground'
              >
                {name}
              </button>
            ))}

            <div className='mx-1 h-4 w-px bg-border' />

            <Dialog>
              <DialogTrigger asChild className='hidden md:block'>
                <button className='text-muted-foreground transition hover:text-foreground'>
                  <KeyboardIcon className='size-4' />
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Keyboard</DialogTitle>
                </DialogHeader>
                <div className='grid grid-cols-2 gap-2 text-xs font-mono even:text-right'>
                  <Kbd>Space</Kbd> <span>Play / Pause</span>
                  <KbdGroup>
                    <Kbd>←</Kbd>/<Kbd>→</Kbd>
                  </KbdGroup>
                  <span>Time Travel</span>
                  <Kbd>S</Kbd> <span>Next Gen (Step)</span>
                  <Kbd>R</Kbd> <span>Reset</span>
                </div>
              </DialogContent>
            </Dialog>

            <button
              onClick={copyState}
              title='Export Grid State'
              className='text-muted-foreground transition hover:text-foreground'
            >
              <Share2Icon className='size-4' />
            </button>

            <Dialog open={isImporting} onOpenChange={setIsImporting}>
              <DialogTrigger asChild>
                <button className='text-muted-foreground transition hover:text-foreground'>
                  <DownloadIcon className='size-4' />
                </button>
              </DialogTrigger>

              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Import Grid State</DialogTitle>
                  <DialogDescription>
                    Paste state array here...
                  </DialogDescription>
                </DialogHeader>

                <Textarea
                  className='h-52 md:h-32'
                  placeholder='[44, 45, 54]'
                  value={importText}
                  onChange={(e) => setImportText(e.target.value)}
                  autoFocus
                />

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant='outline' onClick={() => setImportText('')}>
                      Cancel
                    </Button>
                  </DialogClose>
                  <Button type='submit' onClick={handleImport}>
                    Load State
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </div>
        </div>

        <div className='mb-5'>
          <Slider
            min={0}
            max={history.length - 1}
            value={[currentIndex]}
            onValueChange={([v]) => {
              onScrub(v);
              setIsPlaying(false);
            }}
          />
        </div>

        <div className='flex items-center justify-between'>
          <button
            onClick={() => {
              onReset();
              setIsPlaying(false);
            }}
            className='rounded-md p-2 text-muted-foreground transition hover:bg-destructive/15 hover:text-destructive'
          >
            <Trash2Icon className='size-4' />
          </button>

          <div className='flex items-center gap-3 rounded-lg bg-muted p-1'>
            <button
              onClick={stepBack}
              disabled={currentIndex === 0}
              className='p-2 text-muted-foreground transition hover:text-foreground disabled:opacity-30'
            >
              <ChevronLeftIcon className='size-4' />
            </button>

            <button
              onClick={togglePlay}
              className={cn(
                'flex items-center gap-2 rounded-md px-6 py-2 text-sm font-bold transition',
                isPlaying
                  ? 'bg-primary text-primary-foreground shadow'
                  : 'bg-card text-card-foreground hover:bg-accent'
              )}
            >
              {isPlaying ? (
                <PauseIcon className='size-3' />
              ) : (
                <PlayIcon className='size-3' />
              )}
            </button>

            <button
              onClick={stepForward}
              disabled={currentIndex === history.length - 1}
              className='p-2 text-muted-foreground transition hover:text-foreground disabled:opacity-30'
            >
              <ChevronRightIcon className='size-4' />
            </button>
          </div>

          <button
            onClick={onStep}
            className='rounded-md p-2 text-muted-foreground transition hover:bg-accent hover:text-accent-foreground'
          >
            <CpuIcon className='size-4' />
          </button>
        </div>
      </div>
    </div>
  );
}
