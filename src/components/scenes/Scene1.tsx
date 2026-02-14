'use client';

import { useRef, useState, useEffect, memo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { MapPinIcon, ClockIcon } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { OsShortcut } from '@components/command-menu';
import { Badge } from '@ui-components/badge';

export function Scene1() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const line1Opacity = useTransform(scrollYProgress, [0.1, 0.25], [0, 1]);
  const line2Opacity = useTransform(scrollYProgress, [0.3, 0.45], [0, 1]);
  const line3Opacity = useTransform(scrollYProgress, [0.5, 0.65], [0, 1]);

  const line1Y = useTransform(scrollYProgress, [0.1, 0.25], [20, 0]);
  const line2Y = useTransform(scrollYProgress, [0.3, 0.45], [20, 0]);
  const line3Y = useTransform(scrollYProgress, [0.5, 0.65], [20, 0]);

  const nameOpacity = useTransform(scrollYProgress, [0, 0.1], [1, 0.75]);
  const hintOpacity = useTransform(scrollYProgress, [0.15, 0.35], [1, 0]);

  return (
    <section ref={containerRef} className='h-[250vh] relative'>
      <div className='sticky top-0 h-screen w-full md:justify-center flex flex-col pt-10 md:pt-0 px-6 md:px-24 overflow-hidden'>
        <div className='absolute top-8 right-8 lg:flex flex-col items-end gap-2 text-2xs md:text-xs text-muted-foreground hidden'>
          <div className='flex items-center gap-2'>
            GURUGRAM, IN
            <MapPinIcon className='w-3 h-3' />
          </div>
          <div className='flex items-center gap-2'>
            <LiveClock />
            <ClockIcon className='w-3 h-3' />
          </div>
          <div className='flex items-center gap-2 text-primary'>
            SYSTEM: ONLINE
            <span className='relative flex h-2 w-2'>
              <span className='animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75'></span>
              <span className='relative inline-flex rounded-full h-2 w-2 bg-primary'></span>
            </span>
          </div>
        </div>

        <motion.div
          style={{ opacity: nameOpacity }}
          className='mb-4 space-y-4 relative z-10'
        >
          <Badge variant='outline' className='md:mb-0'>
            <span className='w-2 h-2 rounded-full bg-primary animate-pulse' />
            Available for Work
          </Badge>

          <h1 className='text-5xl md:text-8xl font-bold tracking-tighter text-foreground leading-none'>
            ROHIT SAINI
            <span className='text-primary animate-pulse'>_</span>
          </h1>

          <div className='flex md:flex-row md:items-center gap-4'>
            <h2 className='text-lg md:text-2xl md:font-bold text-secondary-foreground tracking-widest'>
              SDE<span className='text-primary'>_</span>2
            </h2>
            <SocialLink
              href={
                'https://github.com/' + process.env.NEXT_PUBLIC_GITHUB_USERNAME
              }
              label='GitHub'
              darkIcon='/Icons/github-mark.svg'
              lightIcon='/Icons/github-mark-white.svg'
              height={24}
            />
            <SocialLink
              href={
                'https://linkedin.com/in/' +
                process.env.NEXT_PUBLIC_LINKEDIN_USERNAME
              }
              label='LinkedIn'
              darkIcon='/Icons/InBug-Black.png'
              lightIcon='/Icons/InBug-White.png'
              height={22.5}
            />
          </div>
        </motion.div>

        <div className='text-lg md:text-xl space-y-4 max-w-4xl relative z-10 text-secondary-foreground'>
          <motion.p style={{ opacity: line1Opacity, y: line1Y }}>
            I bridge the gap between{' '}
            <span className='underline decoration-wavy decoration-slate-400'>
              design
            </span>{' '}
            and{' '}
            <span className='text-foreground font-bold border-b-2 border-accent-foreground'>
              engineering
            </span>
            .
          </motion.p>

          <motion.p
            style={{ opacity: line2Opacity, y: line2Y }}
            className='text-secondary-foreground'
          >
            Currently scaling systems at{' '}
            <span className='text-primary font-bold'>CarDekho Group</span>.
          </motion.p>

          <motion.div
            style={{ opacity: line3Opacity, y: line3Y }}
            className='flex flex-wrap gap-x-2 gap-y-2 items-center text-secondary-foreground'
          >
            <span>Obsessed with</span>
            <Badge variant='secondary'>React</Badge>
            <Badge variant='secondary'>Next.js</Badge>
            <span>and</span>
            <Badge variant='secondary'>Clean Architecture</Badge>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className='absolute bottom-6 left-8 md:left-24 flex items-center gap-2'
        >
          <OsShortcut />
          <span className='text-2xs md:text-xs text-muted-foreground'>
            to navigate, change theme or download resume.
          </span>
        </motion.div>

        <motion.div
          style={{ opacity: hintOpacity }}
          className='absolute bottom-14 md:bottom-10 right-8 left-1/2 -translate-x-1/2 text-2xs text-muted-foreground opacity-50 flex flex-col items-center gap-2'
        >
          <span>SCROLL TO COMPILE</span>
          <div className='w-px h-8 bg-linear-to-b from-muted-foreground to-transparent' />
        </motion.div>
      </div>
    </section>
  );
}

const SocialLink = memo(function SocialLink({
  href,
  darkIcon,
  lightIcon,
  height,
  label,
}: {
  href: string;
  darkIcon: string;
  lightIcon: string;
  height: number;
  label: string;
}) {
  return (
    <Link href={href} target='_blank' rel='noopener noreferrer'>
      <Image
        src={darkIcon}
        height={height}
        width={24}
        alt={label}
        className='dark:hidden opacity-90 hover:opacity-100 transition-opacity'
      />
      <Image
        src={lightIcon}
        height={height}
        width={24}
        alt={label}
        className='hidden dark:block opacity-70 hover:opacity-100 transition-opacity'
      />
      <span className='sr-only'>{label}</span>
    </Link>
  );
});

const LiveClock = memo(function LiveClock() {
  const [time, setTime] = useState<string>('');
  const formatter = useRef(
    new Intl.DateTimeFormat('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'Asia/Kolkata',
    })
  );

  useEffect(() => {
    const updateTime = () => {
      setTime(`${formatter.current.format(new Date())} IST`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return time;
});
