'use client';

import { useRef } from 'react';
import { Badge } from '@ui-components/badge';
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion';
import { Cpu, PaintBucket, Workflow, CheckCircle2 } from 'lucide-react';

export function Scene2_Hydration() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const mainProgress = useTransform(scrollYProgress, [0, 0.5], ['0%', '100%']);
  const boostProgress = useTransform(
    scrollYProgress,
    [0.6, 0.9],
    ['0%', '100%']
  );

  const item1Mix = useTransform(scrollYProgress, [0.1, 0.2], ['0%', '100%']);
  const item2Mix = useTransform(scrollYProgress, [0.25, 0.35], ['0%', '100%']);
  const item3Mix = useTransform(scrollYProgress, [0.4, 0.5], ['0%', '100%']);

  const item1Opacity = useTransform(scrollYProgress, [0.1, 0.2], [0.5, 1]);
  const item2Opacity = useTransform(scrollYProgress, [0.25, 0.35], [0.5, 1]);
  const item3Opacity = useTransform(scrollYProgress, [0.4, 0.5], [0.5, 1]);

  const yExit = useTransform(scrollYProgress, [0.9, 1], ['0%', '-100%']);
  // const opacityExit = useTransform(scrollYProgress, [0.8, 1], [1, 0]);

  return (
    <section
      ref={containerRef}
      className='h-[400vh] relative pointer-events-none'
    >
      <div className='sticky top-0 h-screen w-full flex md:items-center justify-center overflow-hidden'>
        <motion.div
          style={{ y: yExit }}
          className='w-full max-w-6xl px-6 md:px-8 grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-start md:items-center pt-96 md:pt-0'
        >
          <div className='space-y-4 z-10 text-left relative'>
            <Badge variant='outline'>
              <span className='w-2 h-2 rounded-full bg-primary animate-pulse' />
              CORE_COMPETENCIES
            </Badge>

            <div className='space-y-4'>
              <h2 className='text-4xl md:text-6xl font-bold tracking-tight leading-tight text-foreground'>
                The Arsenal<span className='text-primary'>_</span>
              </h2>

              <div className='grid grid-cols-[7fr_3fr] gap-2'>
                <ProgressBar progress={mainProgress} colorClass='bg-primary' />
                <ProgressBar
                  progress={boostProgress}
                  colorClass='bg-destructive'
                />
              </div>
            </div>

            <div className='text-lg md:text-xl leading-relaxed space-y-2 text-muted-foreground font-medium'>
              <p>
                A curated stack chosen for{' '}
                <span className='text-foreground font-bold'>performance</span>{' '}
                and robustness.
              </p>
              <p>
                I specialize in the{' '}
                <span className='text-foreground font-bold'>
                  React Ecosystem
                </span>
                , backed by serverless infrastructure.
              </p>
            </div>

            <div className='md:grid grid-cols-1 gap-3 text-sm font-mono pt-2 hidden'>
              <FeatureItem
                icon={<Cpu className='w-4 h-4' />}
                text='Hybrid Rendering Architecture'
                mix={item1Mix}
                opacity={item1Opacity}
              />

              <FeatureItem
                icon={<PaintBucket className='w-4 h-4' />}
                text='Design Systems & Micro-Interactions'
                mix={item2Mix}
                opacity={item2Opacity}
              />

              <FeatureItem
                icon={<Workflow className='w-4 h-4' />}
                text='End-to-End Type Safety & CI/CD'
                mix={item3Mix}
                opacity={item3Opacity}
              />
            </div>
          </div>

          <div className='hidden md:block h-125 w-full' />
        </motion.div>
      </div>
    </section>
  );
}

interface FeatureItemProps {
  icon: React.ReactNode;
  text: string;
  mix: MotionValue<string>;
  opacity: MotionValue<number>;
}

function FeatureItem({ icon, text, mix, opacity }: FeatureItemProps) {
  return (
    <motion.div
      style={{
        opacity,
        // @ts-expect-error: CSS custom property intentionally used.
        '--mix': mix,
      }}
      className='flex items-center justify-center md:justify-start gap-4 p-4 rounded-lg bg-muted/50 border backdrop-blur-sm transition-all duration-200'
      css={{
        color:
          'color-mix(in srgb, var(--primary) var(--mix), var(--muted-foreground))',
        borderColor:
          'color-mix(in srgb, var(--primary) var(--mix), var(--border))',
      }}
    >
      <div
        className='shrink-0 transition-colors'
        style={{
          color:
            'color-mix(in srgb, var(--primary) var(--mix), var(--muted-foreground))',
        }}
      >
        {icon}
      </div>

      <span className='tracking-wide uppercase text-xs md:text-sm font-bold'>
        {text}
      </span>

      <motion.div
        style={{
          opacity: useTransform(mix, (val) => (parseFloat(val) > 50 ? 1 : 0)),
        }}
        className='ml-auto text-primary'
      >
        <CheckCircle2 className='w-4 h-4' />
      </motion.div>
    </motion.div>
  );
}

type ProgressBarProps = {
  progress: MotionValue<string>;
  colorClass: string;
};

export function ProgressBar({ progress, colorClass }: ProgressBarProps) {
  return (
    <div className='w-full h-1 bg-popover rounded-full overflow-hidden'>
      <motion.div
        style={{ width: progress }}
        className={`h-full ${colorClass}`}
      />
    </div>
  );
}
