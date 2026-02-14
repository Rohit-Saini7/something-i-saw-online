'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export function Scene4() {
  const { scrollYProgress } = useScroll();

  const containerOpacity = useTransform(scrollYProgress, [0.9, 0.95], [0, 1]);

  const textScale = useTransform(scrollYProgress, [0.9, 1], [0.8, 1]);
  const textY = useTransform(scrollYProgress, [0.9, 1], [50, 0]);

  const router = useRouter();
  const [isWarping, setIsWarping] = useState(false);

  const handleWarp = () => {
    setIsWarping(true);
    setTimeout(() => {
      router.push('/lab');
    }, 1500);
  };

  return (
    <section className='h-screen relative z-30 pointer-events-none'>
      <div className='sticky top-0 h-screen w-full flex flex-col items-center justify-center overflow-hidden'>
        <motion.div
          style={{ opacity: containerOpacity, scale: textScale, y: textY }}
          className='relative z-40 text-center space-y-8 pointer-events-auto'
        >
          <div className='space-y-2'>
            <h2 className='text-sm md:text-base font-mono text-primary tracking-[0.5em] uppercase'>
              Phase_04: Experimental
            </h2>
            <h1 className='text-5xl md:text-8xl font-black tracking-tighter mix-blend-difference'>
              TALK IS CHEAP
              <span className='text-primary animate-pulse'>_</span>
            </h1>
            <p className='text-muted-foreground text-sm'>
              {'//'} See the raw code. Break things.
            </p>
          </div>

          <div className='pt-8'>
            <button
              onClick={handleWarp}
              className='group relative px-8 py-4 border transition-all hover:border-white/50 cursor-pointer'
            >
              <span className='z-10 font-mono font-bold text-lg duration-300'>
                ENTER_THE_LAB()
              </span>

              <div className='absolute top-0 left-0 w-2 h-2 border-t-2 border-l-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity' />
              <div className='absolute bottom-0 right-0 w-2 h-2 border-b-2 border-r-2 border-primary opacity-0 group-hover:opacity-100 transition-opacity' />
            </button>

            {isWarping ? (
              <motion.div className='fixed inset-0 z-100 flex items-center justify-center pointer-events-none'>
                <motion.div
                  initial={{ scale: 1, opacity: 0 }}
                  animate={{ scale: 500, opacity: 1 }}
                  transition={{ duration: 1.5, ease: 'circIn' }}
                  className='w-2 h-2 bg-primary rounded-full'
                />
              </motion.div>
            ) : null}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
