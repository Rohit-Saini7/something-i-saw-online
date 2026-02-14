'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Terminal, Calendar, MapPin, Building2 } from 'lucide-react';
import { experience } from '@experience-data';
import { Badge } from '@ui-components/badge';

export function Scene3() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const heightTransform = useTransform(
    scrollYProgress,
    [0, 0.7],
    ['0%', '100%']
  );

  return (
    <section
      ref={containerRef}
      className='relative z-20 w-full max-w-6xl mx-auto px-4 min-h-screen py-24'
    >
      <div className='grid grid-cols-1 md:grid-cols-[280px_1fr] gap-12 md:gap-20'>
        <motion.div className='md:sticky z-30 top-32 h-fit py-0 bg-transparent'>
          <div className='flex flex-col items-start gap-4'>
            <Badge variant='outline'>
              <Terminal className='w-3 h-3 text-primary animate-pulse' />
              system_log.txt
            </Badge>
            <h2 className='text-4xl md:text-5xl font-bold'>
              Experience
              <span className='text-primary animate-pulse'>_</span>
            </h2>
            <p className='hidden md:block text-muted-foreground text-sm max-w-50'>
              A chronological record of system upgrades and architectural
              decisions.
            </p>
          </div>
        </motion.div>

        <div className='relative flex flex-col gap-12 md:gap-20'>
          <div className='absolute left-4 top-2 bottom-0 w-px bg-border/50 h-[95%]'>
            <motion.div
              style={{ height: heightTransform }}
              className='w-full bg-primary origin-top'
            />
          </div>

          {experience.map((role, index) => (
            <motion.div
              key={role.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className='relative pl-12 group'
            >
              <div className='absolute left-4 top-6 -translate-x-1/2 w-3 h-3 rounded-full bg-background border border-primary group-hover:border-primary group-hover:bg-primary transition-colors duration-500 z-10' />

              <div className='relative transition-all duration-300'>
                <div className='flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-4'>
                  <h3 className='text-xl font-semibold text-foreground flex items-center gap-2'>
                    {role.role}
                  </h3>
                  <Badge
                    variant='outline'
                    className='text-muted-foreground px-2 py-1 rounded w-fit'
                  >
                    <Calendar className='w-3 h-3' />
                    {role.period.start} — {role.period.end}
                  </Badge>
                </div>

                <div className='flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-6'>
                  <div className='flex items-center gap-1.5 text-foreground/80'>
                    <Building2 className='w-3.5 h-3.5 text-primary' />
                    <span className='font-medium'>{role.company}</span>
                  </div>
                  <div className='flex items-center gap-1.5'>
                    <MapPin className='w-3.5 h-3.5' />
                    <span>{role.location}</span>
                  </div>
                </div>

                <ul className='space-y-3 mb-6'>
                  {role.description.map((desc, i) => (
                    <li
                      key={i}
                      className='flex items-start gap-2.5 text-sm text-muted-foreground/90'
                    >
                      <span className='mt-2.5 w-1 h-1 rounded-full bg-primary/50 shrink-0' />
                      <span className='leading-relaxed'>{desc}</span>
                    </li>
                  ))}
                </ul>

                <div className='flex flex-wrap gap-2'>
                  {role.tech.map((t) => (
                    <Badge variant='soft' key={t}>
                      {t}
                    </Badge>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
