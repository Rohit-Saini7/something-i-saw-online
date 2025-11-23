'use client';

import { useState, useRef } from 'react';

const CHARS = '!<>-_\\/[]{}—=+*^?#________';

export default function TextScramble() {
  const [text, setText] = useState('SYSTEM_READY');
  const targetText = 'HELLO_WORLD';
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const scramble = () => {
    let iteration = 0;

    if (intervalRef.current) clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      setText(() =>
        targetText
          .split('')
          .map((_letter, index) => {
            if (index < iteration) {
              return targetText[index];
            }
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join('')
      );

      if (iteration >= targetText.length) {
        if (intervalRef.current) clearInterval(intervalRef.current);
      }

      iteration += 1 / 3;
    }, 30);
  };

  return (
    <div className='bg-background text-primary flex h-full w-full flex-col items-center justify-center font-mono'>
      <div
        onMouseEnter={scramble}
        onClick={scramble}
        className='hover:bg-muted/50 cursor-pointer rounded-xl p-8 text-6xl font-bold tracking-tighter transition-colors select-none md:text-9xl'
      >
        {text}
      </div>
      <p className='text-muted-foreground mt-8 text-xs tracking-widest uppercase'>
        Hover / Click to Decrypt
      </p>
    </div>
  );
}
