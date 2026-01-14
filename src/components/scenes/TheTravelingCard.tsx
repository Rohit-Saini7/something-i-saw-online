'use client';

import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { useEffect, useState } from 'react';

const CARDS = [
  {
    id: 'frontend',
    title: 'FRONTEND',
    items: [
      { name: 'React', color: 'bg-chart-1' },
      { name: 'Next.js', color: 'bg-chart-2' },
      { name: 'Tailwind CSS', color: 'bg-chart-3' },
      { name: 'Framer', color: 'bg-chart-4' },
      { name: 'Redux Toolkit', color: 'bg-chart-5' },
    ],
  },
  {
    id: 'backend',
    title: 'BACKEND',
    items: [
      { name: 'Node.js', color: 'bg-chart-3' },
      { name: 'Nest.js', color: 'bg-chart-4' },
      { name: 'Typescript', color: 'bg-chart-5' },
      { name: 'MySQL', color: 'bg-chart-1' },
      { name: 'REST API', color: 'bg-chart-2' },
    ],
  },
  {
    id: 'others',
    title: 'OTHERS',
    items: [
      { name: 'AWS Lambda', color: 'bg-chart-5' },
      { name: 'Docker', color: 'bg-chart-4' },
      { name: 'CI/CD', color: 'bg-chart-1' },
      { name: 'Git', color: 'bg-chart-2' },
      { name: 'Vercel', color: 'bg-chart-3' },
    ],
  },
];

export function TheTravelingCard() {
  const { scrollYProgress: globalScroll } = useScroll();
  const [isMobile, setIsMobile] = useState(false);

  const [activeCardId, setActiveCardId] = useState('frontend');
  const activeIndex = CARDS.findIndex((c) => c.id === activeCardId);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const drawProgress = useTransform(globalScroll, [0.01, 0.2], [0, 1]);

  const fanProgress = useTransform(globalScroll, [0.4, 0.45], [0, 1]);

  const yExit = useTransform(globalScroll, [0.6, 0.65], ['-50%', '-150%']);
  const exitOpacity = useTransform(globalScroll, [0.6, 0.65], [1, 0]);

  const desktopX = useTransform(globalScroll, [0.2, 0.4], ['80%', '75%']);
  const desktopY = useTransform(globalScroll, [0.2, 0.4], ['50%', '50%']);

  const mobileX = useTransform(globalScroll, [0.2, 0.4], ['50%', '50%']);
  const mobileY = useTransform(globalScroll, [0.2, 0.28], ['77%', '28%']);

  const desktopScale = useTransform(globalScroll, [0.2, 0.4], [0.85, 1.1]);
  const mobileScale = useTransform(globalScroll, [0.2, 0.35], [0.55, 0.85]);

  const fillOpacity = useTransform(globalScroll, [0.35, 0.5], [0, 1]);
  const rotation = useTransform(globalScroll, [0.35, 0.4], [0, 180]);

  const currentX = isMobile ? mobileX : desktopX;
  const currentY = isMobile ? mobileY : desktopY;
  const currentScale = isMobile ? mobileScale : desktopScale;

  return (
    <div className='fixed inset-0 pointer-events-none z-50 overflow-hidden'>
      <motion.div
        style={{
          left: currentX,
          top: currentY,
          y: yExit,
          scale: currentScale,
          x: '-50%',
          opacity: exitOpacity,
          perspective: 1000,
        }}
        className='absolute w-64 h-96 md:w-80 md:h-[450px]'
      >
        <motion.div
          style={{
            opacity: useTransform(fanProgress, [0.9, 1], [0, 1]),
            y: useTransform(fanProgress, [0.9, 1], [-6, 0]),
          }}
          className='absolute left-full top-1/2 ml-4 -translate-y-1/2 pointer-events-none'
        >
          <div className='text-xs md:text-sm font-mono text-muted-foreground tracking-widest writing-vertical-lr'>
            CLICK TO SWITCH
          </div>
        </motion.div>

        <motion.div
          style={{ rotateY: rotation }}
          className='relative w-full h-full preserve-3d'
        >
          <div className='absolute inset-0 backface-hidden flex items-center justify-center z-50'>
            <svg className='absolute inset-0 w-full h-full overflow-visible'>
              <defs>
                <filter id='hand-drawn-filter'>
                  <feTurbulence
                    type='fractalNoise'
                    baseFrequency='0.04'
                    numOctaves='3'
                    result='noise'
                  />
                  <feDisplacementMap in='SourceGraphic' in2='noise' scale='4' />
                </filter>
              </defs>
              <motion.rect
                width='100%'
                height='100%'
                x='0'
                y='0'
                rx='15'
                fill='none'
                stroke='currentColor'
                strokeWidth='2'
                strokeDasharray='5 5'
                strokeLinecap='round'
                className='text-input'
                style={{
                  pathLength: drawProgress,
                  filter: useTransform(fillOpacity, (o) =>
                    o < 0.5 ? 'url(#hand-drawn-filter)' : 'none'
                  ),
                  strokeOpacity: useTransform(fillOpacity, (o) => 1 - o),
                }}
              />
            </svg>
            <motion.div
              style={{ opacity: useTransform(rotation, [0, 90], [1, 0]) }}
            >
              <div className='text-6xl font-mono font-bold text-muted-foreground/50'>
                {'{ }'}
              </div>
            </motion.div>
          </div>

          {CARDS.map((card, index) => (
            <SingleCard
              key={card.id}
              card={card}
              index={index}
              activeIndex={activeIndex}
              isActive={activeCardId === card.id}
              onClick={() => setActiveCardId(card.id)}
              fanProgress={fanProgress}
            />
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
}

function SingleCard({
  card,
  index,
  activeIndex,
  isActive,
  onClick,
  fanProgress,
}: {
  card: (typeof CARDS)[0];
  index: number;
  activeIndex: number;
  isActive: boolean;
  onClick: () => void;
  fanProgress: MotionValue<number>;
}) {
  const relativeIndex = index - activeIndex;

  const xValue = relativeIndex * 35;
  const rotateValue = relativeIndex * 5;

  const distanceFromActive = Math.abs(index - activeIndex);
  const zIndex = 50 - distanceFromActive;

  const targetX = xValue;
  const targetRotate = rotateValue;
  const targetY = isActive ? 0 : -10;
  const targetScale = isActive ? 1 : 0.95;

  return (
    <motion.div
      onClick={onClick}
      style={{
        rotateY: 180,
        rotate: useTransform(fanProgress, [0, 1], [0, targetRotate]),
        x: useTransform(fanProgress, [0, 1], [0, targetX]),
        y: useTransform(fanProgress, [0, 1], [0, targetY]),
        scale: useTransform(fanProgress, [0, 1], [1, targetScale]),
        zIndex: zIndex,
      }}
      className='absolute inset-0 backface-hidden rounded-2xl bg-background border border-border flex flex-col items-center justify-center p-8 space-y-6 transition-colors duration-300 cursor-pointer pointer-events-auto'
    >
      <h3 className='text-xl font-bold font-mono text-foreground border-b-2 border-primary pb-2'>
        {card.title}
      </h3>

      <div className='w-full space-y-4 font-mono text-sm'>
        {card.items.map((item) => (
          <StackItem key={item.name} name={item.name} color={item.color} />
        ))}
      </div>

      <div className='absolute bottom-4 right-4 w-8 h-8 rounded-full border-2 border-border flex items-center justify-center text-2xs text-muted-foreground'>
        {index + 1}
      </div>

      {!isActive && (
        <motion.div
          style={{ opacity: fanProgress }}
          className='absolute inset-0 bg-black/5 dark:bg-black/40 rounded-2xl flex items-center justify-center backdrop-blur-[1px]'
        >
          <span className='text-xs font-mono font-bold text-white bg-black/50 px-2 py-1 rounded'>
            CLICK
          </span>
        </motion.div>
      )}
    </motion.div>
  );
}

function StackItem({ name, color }: { name: string; color: string }) {
  return (
    <div className='flex items-center gap-3 p-2 rounded-lg bg-popover'>
      <div className={`w-2 h-2 rounded-full ${color}`} />
      <span className='text-popover-foreground font-bold'>{name}</span>
    </div>
  );
}
