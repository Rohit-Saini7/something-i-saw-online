'use client';

import { motion, useScroll, useTransform } from 'framer-motion';

export function GlobalBackground() {
  const { scrollYProgress } = useScroll();

  const blueprintOpacity = useTransform(scrollYProgress, [0.25, 0.3], [1, 0]);
  const hydrationOpacity = useTransform(
    scrollYProgress,
    [0, 0.25, 0.55, 0.6],
    [0, 0, 1, 0]
  );
  const performanceOpacity = useTransform(scrollYProgress, [0.6, 0.65], [0, 1]);

  return (
    <div className='fixed inset-0 -z-50 bg-background'>
      <motion.div
        style={{ opacity: blueprintOpacity }}
        className='absolute inset-0'
      >
        <div
          className='absolute inset-0 opacity-[0.3]'
          style={{
            backgroundImage: `radial-gradient(circle, #888888 1px, transparent 1px)`,
            backgroundSize: '24px 24px',
          }}
        />
      </motion.div>

      <motion.div
        style={{ opacity: hydrationOpacity }}
        className='absolute inset-0 transition-colors duration-500'
      >
        <div className='absolute inset-0 bg-linear-to-tr from-blue-50/50 via-white to-purple-50/20 dark:from-slate-900 dark:via-black dark:to-slate-900 opacity-80' />
      </motion.div>

      <motion.div
        style={{ opacity: performanceOpacity }}
        className='absolute inset-0 z-10 transition-colors duration-500'
      >
        <div className='absolute inset-0 bg-[linear-gradient(rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-size-[40px_40px]' />
      </motion.div>
    </div>
  );
}
