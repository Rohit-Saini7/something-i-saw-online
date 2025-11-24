'use client';

import { useEffect, useRef, useState, useCallback } from 'react';
import {
  Settings2Icon,
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
} from 'lucide-react';

const CHAR_SETS = {
  chaos: '!<>-_\\/[]{}—=+*^?#________',
  binary: '01010110100010101011101',
  matrix: 'ｦｧｨｩｪｫｬｭｮｯｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ',
  simple: 'ABCDEFGHIJKLMNOPQRSTUVWXYZ',
};

type CharSetType = 'chaos' | 'binary' | 'matrix' | 'simple';
type RevealMode = 'start' | 'end' | 'random';

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
  <div className='pointer-events-none absolute inset-0 z-50 overflow-hidden opacity-40'>
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
    charSet: 'chaos',
    revealMode: 'random',
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

    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEncryptedText(newEncrypted);

    if (!isDecrypted) {
      setDisplayText(newEncrypted);
    } else {
      setDisplayText(config.text);
    }
  }, [config.text, config.charSet, isDecrypted, generateRandomString]);

  const triggerScramble = (targetText: string) => {
    const chars = CHAR_SETS[config.charSet];
    const length = targetText.length;

    const indices = Array.from({ length }, (_, i) => i);

    if (config.revealMode === 'random') {
      for (let i = indices.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [indices[i], indices[j]] = [indices[j], indices[i]];
      }
    } else if (config.revealMode === 'end') {
      indices.reverse();
    }

    let step = 0;
    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      const charsRevealed = Math.floor(step);
      const solvedIndices = new Set(indices.slice(0, charsRevealed));

      setDisplayText(() =>
        targetText
          .split('')
          .map((_letter, index) => {
            if (solvedIndices.has(index)) {
              return targetText[index];
            }
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('')
      );

      if (step >= length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(targetText);
      }

      step += config.speed;
    }, 30);
  };

  const handleInteractionStart = () => {
    setIsDecrypted(true);
    triggerScramble(config.text);
  };

  const handleInteractionEnd = () => {
    setIsDecrypted(false);
    triggerScramble(encryptedText);
  };

  const handleMouseEnter = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      handleInteractionStart();
    }
  };

  const handleMouseLeave = () => {
    if (window.matchMedia('(hover: hover)').matches) {
      handleInteractionEnd();
    }
  };

  const handleClick = () => {
    if (isDecrypted) handleInteractionEnd();
    else handleInteractionStart();
  };

  return (
    <div className='relative h-screen w-screen bg-slate-950 flex flex-col items-center justify-center overflow-hidden font-mono'>
      {config.crt && <CRTOverlay />}

      <div className='relative z-10 p-8 text-center w-full'>
        <div className='mb-6 flex justify-center'>
          <div
            className={`flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold tracking-widest border transition-all duration-500 ${
              isDecrypted
                ? 'border-emerald-500/50 bg-emerald-500/10 text-emerald-400'
                : 'border-slate-700 bg-slate-900/50 text-slate-500'
            }`}
          >
            {isDecrypted ? (
              <UnlockIcon className='w-3 h-3' />
            ) : (
              <LockIcon className='w-3 h-3' />
            )}
            {isDecrypted ? 'DECRYPTED' : 'ENCRYPTED'}
          </div>
        </div>

        <div
          onClick={handleClick}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          className='text-4xl md:text-7xl lg:text-8xl font-black tracking-tighter cursor-pointer select-none transition-all duration-300 wrap-break-word'
          style={{
            color: isDecrypted ? config.color : '#475569',
            textShadow:
              config.glow && isDecrypted
                ? `0 0 20px ${config.color}, 0 0 40px ${config.color}80`
                : 'none',
            filter: config.crt ? 'blur(0.5px)' : 'none',
          }}
        >
          {displayText}
        </div>

        <div className='mt-8 flex justify-center gap-2 opacity-50 text-xs tracking-[0.2em] text-slate-400'>
          <span>{isDecrypted ? 'LEAVE' : 'HOVER'}</span>
          <span>/</span>
          <span>CLICK TO {isDecrypted ? 'ENCRYPT' : 'DECRYPT'}</span>
        </div>
      </div>

      <div className='absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.03)_1px,transparent_1px)] bg-size-[100px_100px] pointer-events-none' />

      <button
        onClick={() => setIsControlsOpen(!isControlsOpen)}
        className={`fixed top-6 right-6 z-60 flex h-10 w-10 items-center justify-center rounded-full border border-slate-700 backdrop-blur-md transition-all duration-300 hover:bg-slate-800 ${
          isControlsOpen
            ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/50'
            : 'bg-slate-900/50 text-slate-400'
        }`}
      >
        {isControlsOpen ? (
          <XIcon className='h-5 w-5' />
        ) : (
          <Settings2Icon className='h-5 w-5' />
        )}
      </button>

      <div
        className={`fixed right-6 top-20 z-60 w-full max-w-xs transition-all duration-500 ease-out ${
          isControlsOpen
            ? 'translate-x-0 opacity-100'
            : 'translate-x-[120%] opacity-0 pointer-events-none'
        }`}
      >
        <div className='bg-slate-900/95 border-slate-800 w-full rounded-xl border p-5 shadow-2xl backdrop-blur-md'>
          <div className='flex items-center justify-between mb-5'>
            <h3 className='text-slate-500 text-xs font-bold uppercase tracking-widest'>
              Decryption Protocol
            </h3>
            <button
              onClick={() =>
                triggerScramble(isDecrypted ? config.text : encryptedText)
              }
              className='text-emerald-400 hover:text-emerald-300 transition-colors'
              title='Re-run Sequence'
            >
              <RefreshCcwIcon className='h-4 w-4' />
            </button>
          </div>

          <div className='mb-5'>
            <div className='text-slate-400 mb-2 flex justify-between text-xs'>
              <span>Target Payload</span>
            </div>
            <div className='relative'>
              <input
                type='text'
                value={config.text}
                onChange={(e) =>
                  setConfig({ ...config, text: e.target.value.toUpperCase() })
                }
                maxLength={20}
                className='w-full bg-slate-950 border border-slate-800 rounded-lg py-2 pl-3 pr-10 text-sm text-slate-200 focus:outline-none focus:border-emerald-500/50 font-mono tracking-widest uppercase'
              />
              <TypeIcon className='absolute right-3 top-2.5 h-4 w-4 text-slate-600' />
            </div>
          </div>

          <div className='mb-5'>
            <div className='text-slate-400 mb-2 text-xs'>Encryption Cipher</div>
            <div className='grid grid-cols-4 gap-2'>
              {[
                { id: 'chaos', icon: ZapIcon },
                { id: 'binary', icon: BinaryIcon },
                { id: 'matrix', icon: LanguagesIcon },
                { id: 'simple', icon: TypeIcon },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    setConfig({ ...config, charSet: item.id as CharSetType })
                  }
                  className={`flex items-center justify-center h-9 rounded-md border transition-all ${
                    config.charSet === item.id
                      ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                      : 'bg-slate-800 border-transparent text-slate-500 hover:bg-slate-700'
                  }`}
                  title={item.id.toUpperCase()}
                >
                  <item.icon className='h-4 w-4' />
                </button>
              ))}
            </div>
          </div>

          <div className='mb-5'>
            <div className='text-slate-400 mb-2 text-xs'>Reveal Logic</div>
            <div className='grid grid-cols-3 gap-2'>
              {[
                { id: 'start', icon: ArrowRightIcon, label: 'Linear' },
                { id: 'random', icon: ShuffleIcon, label: 'Random' },
                { id: 'end', icon: ArrowLeftIcon, label: 'Reverse' },
              ].map((item) => (
                <button
                  key={item.id}
                  onClick={() =>
                    setConfig({ ...config, revealMode: item.id as RevealMode })
                  }
                  className={`flex items-center justify-center h-9 rounded-md border transition-all ${
                    config.revealMode === item.id
                      ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                      : 'bg-slate-800 border-transparent text-slate-500 hover:bg-slate-700'
                  }`}
                  title={item.label}
                >
                  <item.icon className='h-4 w-4' />
                </button>
              ))}
            </div>
          </div>

          <div className='mb-5'>
            <div className='text-slate-400 mb-2 flex justify-between text-xs'>
              <span>Decryption Speed</span>
              <span className='text-emerald-400 font-mono'>
                {(config.speed * 100).toFixed(0)}%
              </span>
            </div>
            <input
              type='range'
              min='0.1'
              max='1.5'
              step='0.1'
              value={config.speed}
              onChange={(e) =>
                setConfig({ ...config, speed: Number(e.target.value) })
              }
              className='accent-emerald-500 bg-slate-700 h-1 w-full cursor-pointer appearance-none rounded-lg'
            />
          </div>

          <div className='h-px bg-slate-800 w-full mb-5' />

          <div className='space-y-3'>
            <div className='flex items-center justify-between'>
              <span className='text-xs text-slate-400'>System Color</span>
              <div className='flex gap-2'>
                {['#10b981', '#ef4444', '#3b82f6', '#f59e0b', '#ec4899'].map(
                  (c) => (
                    <button
                      key={c}
                      onClick={() => setConfig({ ...config, color: c })}
                      className={`h-4 w-4 rounded-full border border-slate-600 transition-transform hover:scale-110 ${
                        config.color === c
                          ? 'ring-2 ring-white ring-offset-2 ring-offset-slate-900'
                          : ''
                      }`}
                      style={{ backgroundColor: c }}
                    />
                  )
                )}
              </div>
            </div>

            <div className='flex gap-2'>
              <button
                onClick={() => setConfig({ ...config, glow: !config.glow })}
                className={`flex-1 text-xs py-1.5 rounded-md border transition-colors ${
                  config.glow
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                    : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}
              >
                GLOW {config.glow ? 'ON' : 'OFF'}
              </button>
              <button
                onClick={() => setConfig({ ...config, crt: !config.crt })}
                className={`flex-1 flex items-center justify-center gap-2 text-xs py-1.5 rounded-md border transition-colors ${
                  config.crt
                    ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400'
                    : 'bg-slate-800 border-slate-700 text-slate-500'
                }`}
              >
                <MonitorIcon className='h-3 w-3' />
                CRT {config.crt ? 'ON' : 'OFF'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
