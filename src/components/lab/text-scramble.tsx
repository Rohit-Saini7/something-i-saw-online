'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  XIcon,
  RefreshCcwIcon,
  TypeIcon,
  ZapIcon,
  BinaryIcon,
  LanguagesIcon,
  MonitorIcon,
  ArrowRightIcon,
  ArrowLeftIcon,
  ShuffleIcon,
  LockIcon,
  UnlockIcon,
  SlidersHorizontalIcon,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '@ui-components/slider';
import { Toggle } from '@ui-components/toggle';
import { Button } from '@ui-components/button';
import { ButtonGroup } from '@ui-components/button-group';

const CHAR_SETS = {
  Chaos: '!<>-_\\/[]{}—=+*^?#________',
  Binary: '01010110100010101011101',
  Matrix: 'ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ',
  Simple: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

type CharSetType = keyof typeof CHAR_SETS;
type RevealMode = 'Linear' | 'Random' | 'Reverse';

type ScrambleConfig = {
  text: string;
  speed: number;
  charSet: CharSetType;
  revealMode: RevealMode;
  glow: boolean;
  crt: boolean;
  color: string;
};

const CRTOverlay = () => (
  <div className='pointer-events-none absolute inset-0 z-60 overflow-hidden opacity-40'>
    <div className='absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-size-[100%_4px,3px_100%]' />
    <div className='absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_50%,rgba(0,0,0,0.4)_100%)]' />
  </div>
);

export default function ScrambleLab() {
  const [isControlsOpen, setIsControlsOpen] = useState(false);
  const [isDecrypted, setIsDecrypted] = useState(false);

  const [config, setConfig] = useState<ScrambleConfig>({
    text: 'SYSTEM_BREACH',
    speed: 0.4,
    charSet: 'Chaos',
    revealMode: 'Random',
    glow: true,
    crt: true,
    color: '#10b981',
  });

  const [encryptedText, setEncryptedText] = useState('');
  const [displayText, setDisplayText] = useState('');

  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const generateRandomString = useCallback(
    (length: number, charSet: CharSetType) => {
      const chars = CHAR_SETS[charSet];
      return Array.from(
        { length },
        () => chars[Math.floor(Math.random() * chars.length)]
      ).join('');
    },
    []
  );

  useEffect(() => {
    const newEncrypted = generateRandomString(
      config.text.length,
      config.charSet
    );

    setEncryptedText(newEncrypted);
    setDisplayText(isDecrypted ? config.text : newEncrypted);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [config.text, config.charSet, generateRandomString]);

  const triggerScramble = (targetText: string) => {
    const chars = CHAR_SETS[config.charSet];
    const length = targetText.length;

    const indices = Array.from({ length }, (_, i) => i);

    if (config.revealMode === 'Random') {
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
    } else if (config.revealMode === 'Reverse') {
      indices.reverse();
    }

    let step = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const charsRevealed = Math.floor(step);
      const solved = new Set(indices.slice(0, charsRevealed));

      setDisplayText(() =>
        targetText
          .split('')
          .map((letter, index) =>
            solved.has(index)
              ? letter
              : chars[Math.floor(Math.random() * chars.length)]
          )
          .join('')
      );

      if (step >= length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(targetText);
      }

      step += config.speed;
    }, 30);
  };

  const handleStart = () => {
    setIsDecrypted(true);
    triggerScramble(config.text);
  };

  const handleEnd = () => {
    setIsDecrypted(false);
    triggerScramble(encryptedText);
  };

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      handleStart();
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      handleEnd();
    }
  };

  const handleClick = () => {
    if (isDecrypted) handleEnd();
    else handleStart();
  };

  return (
    <div className='relative flex h-screen w-screen flex-col items-center justify-center overflow-hidden font-mono'>
      {config.crt && <CRTOverlay />}

      <div className='relative z-10 mb-6'>
        <div
          className={cn(
            'flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-bold tracking-widest transition-colors',
            isDecrypted
              ? 'border-primary bg-primary/10 text-primary'
              : 'border-border bg-muted text-muted-foreground'
          )}
        >
          {isDecrypted ? (
            <UnlockIcon className='size-3' />
          ) : (
            <LockIcon className='size-3' />
          )}
          {isDecrypted ? 'DECRYPTED' : 'ENCRYPTED'}
        </div>
      </div>

      <button
        type='button'
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className='rounded-lg text-4xl font-black tracking-tighter transition focus-visible:ring-1 focus-visible:ring-ring/50 md:text-7xl lg:text-8xl'
        style={{
          color: isDecrypted ? config.color : undefined,
          textShadow:
            config.glow && isDecrypted
              ? `0 0 20px ${config.color}, 0 0 40px ${config.color}80`
              : 'none',
          filter: config.crt ? 'blur(0.5px)' : 'none',
        }}
      >
        {displayText}
      </button>

      <div className='mt-8 flex text-sm tracking-widest text-muted-foreground justify-center gap-2'>
        <span>{isDecrypted ? 'LEAVE' : 'HOVER'}</span>
        <span>/</span>
        <span>CLICK TO {isDecrypted ? 'ENCRYPT' : 'DECRYPT'}</span>
      </div>

      <Button
        onClick={() => setIsControlsOpen(!isControlsOpen)}
        className='fixed top-6 right-6 z-40 rounded-full'
        variant='outline'
        size='icon-lg'
      >
        {isControlsOpen ? (
          <XIcon className='h-5 w-5' />
        ) : (
          <SlidersHorizontalIcon className='h-5 w-5' />
        )}
      </Button>

      <div
        className={cn(
          'fixed right-6 top-20 z-60 w-full max-w-xs transition',
          isControlsOpen
            ? 'translate-x-0 opacity-100'
            : 'translate-x-[120%] opacity-0 pointer-events-none'
        )}
      >
        <div className='rounded-xl border border-border bg-card p-5 shadow-xl backdrop-blur-md'>
          <div className='mb-5 flex items-center justify-between'>
            <h3 className='text-xs font-bold tracking-widest text-muted-foreground uppercase'>
              Decryption Protocol
            </h3>
            <Button
              variant='ghost'
              size='icon-only'
              onClick={() =>
                triggerScramble(isDecrypted ? config.text : encryptedText)
              }
              title='Re-run Sequence'
            >
              <RefreshCcwIcon className='h-4 w-4' />
            </Button>
          </div>

          <div className='mb-5'>
            <div className='mb-2 text-xs text-muted-foreground'>
              Target Payload
            </div>
            <div className='relative'>
              <input
                type='text'
                value={config.text}
                onChange={(e) =>
                  setConfig({ ...config, text: e.target.value.toUpperCase() })
                }
                maxLength={20}
                className='w-full rounded-lg border border-input bg-background py-2 pl-3 pr-10 text-sm text-foreground font-mono tracking-widest uppercase focus-visible:ring-1 focus-visible:ring-ring/50 outline-none'
              />
              <TypeIcon className='absolute right-3 top-2.5 h-4 w-4 text-muted-foreground' />
            </div>
          </div>

          <div className='mb-5'>
            <div className='mb-2 text-xs text-muted-foreground'>
              Encryption Cipher
            </div>
            <ButtonGroup className='grid w-full grid-cols-4'>
              {[
                { id: 'Chaos', icon: ZapIcon },
                { id: 'Binary', icon: BinaryIcon },
                { id: 'Matrix', icon: LanguagesIcon },
                { id: 'Simple', icon: TypeIcon },
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={config.charSet === item.id ? 'default' : 'outline'}
                  onClick={() =>
                    setConfig({
                      ...config,
                      charSet: item.id as CharSetType,
                    })
                  }
                  title={item.id.toUpperCase()}
                >
                  <item.icon />
                </Button>
              ))}
            </ButtonGroup>
          </div>

          <div className='mb-5'>
            <div className='mb-2 text-xs text-muted-foreground'>
              Reveal Logic
            </div>
            <ButtonGroup className='grid w-full grid-cols-3'>
              {[
                { id: 'Linear', icon: ArrowRightIcon },
                { id: 'Random', icon: ShuffleIcon },
                { id: 'Reverse', icon: ArrowLeftIcon },
              ].map((item) => (
                <Button
                  key={item.id}
                  variant={
                    config.revealMode === item.id ? 'default' : 'outline'
                  }
                  onClick={() =>
                    setConfig({
                      ...config,
                      revealMode: item.id as RevealMode,
                    })
                  }
                  title={item.id}
                >
                  <item.icon />
                </Button>
              ))}
            </ButtonGroup>
          </div>

          <div className='mb-5 space-y-2'>
            <div className='flex justify-between text-xs text-muted-foreground'>
              <span>Decryption Speed</span>
              <span className='font-mono text-foreground'>
                {(config.speed * 100).toFixed(0)}%
              </span>
            </div>
            <Slider
              min={0.1}
              max={1.5}
              step={0.1}
              value={[config.speed]}
              onValueChange={(v) => {
                const value = Array.isArray(v) ? v[0] : v;
                setConfig((c) => ({ ...c, speed: value }));
              }}
            />
          </div>
          <div className='mb-5 space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-xs text-slate-500 dark:text-slate-400'>
                System Color
              </span>
              <div className='flex gap-2'>
                {['#10b981', '#ef4444', '#3b82f6', '#f59e0b', '#ec4899'].map(
                  (c) => (
                    <button
                      key={c}
                      onClick={() => setConfig({ ...config, color: c })}
                      className={`h-4 w-4 rounded-full border border-slate-300 dark:border-slate-600 transition-transform hover:scale-110 ${
                        config.color === c
                          ? 'ring-2 ring-white dark:ring-white ring-offset-2 ring-offset-slate-100 dark:ring-offset-slate-900'
                          : ''
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  )
                )}
              </div>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-2'>
            <Toggle
              onPressedChange={() =>
                setConfig((c) => ({ ...c, glow: !c.glow }))
              }
              pressed={config.glow}
              variant='primary'
            >
              GLOW {config.glow ? 'ON' : 'OFF'}
            </Toggle>
            <Toggle
              onPressedChange={() => setConfig((c) => ({ ...c, crt: !c.crt }))}
              variant='primary'
              pressed={config.crt}
            >
              <MonitorIcon className='size-3' />
              CRT {config.crt ? 'ON' : 'OFF'}
            </Toggle>
          </div>
        </div>
      </div>
    </div>
  );
}
