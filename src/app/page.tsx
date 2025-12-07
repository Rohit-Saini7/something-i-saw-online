import Link from 'next/link';
import {
  ArrowUpRightIcon,
  BriefcaseBusinessIcon,
  ExternalLinkIcon,
  FlaskConicalIcon,
  FolderIcon,
  TerminalIcon,
} from 'lucide-react';
import { projects, ProjectType } from '@/data/projects';
import { experience } from '@/data/experience';
import { OsShortcut } from '@components/command-menu';
import { JSX } from 'react';
import Image from 'next/image';
import { Badge } from '@ui-components/badge';

const TYPE_ICONS = {
  experiment: FlaskConicalIcon,
  work: BriefcaseBusinessIcon,
  external: FolderIcon,
  default: TerminalIcon,
};

const TYPE_BADGES: Partial<Record<ProjectType, JSX.Element>> = {
  experiment: <Badge variant='secondary'>Experiment</Badge>,
  external: (
    <ExternalLinkIcon className='w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors' />
  ),
};

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <main className='mx-auto min-h-screen max-w-3xl space-y-24 px-6 py-12 md:py-20'>
      <section className='space-y-6'>
        <div className='space-y-2'>
          <h1 className='text-4xl font-bold tracking-tight sm:text-5xl'>
            Rohit Saini
          </h1>
          <p className='text-muted-foreground text-xl font-medium'>
            Senior Frontend Engineer
          </p>
        </div>
        <p className='text-muted-foreground max-w-lg text-lg leading-relaxed'>
          I build high-performance, scalable applications. Currently scaling
          systems at
          <span className='text-foreground font-medium'> CarDekho Group</span>.
          Obsessed with React, Next.js, and clean architecture.
        </p>

        <div className='flex items-center gap-4 pt-2'>
          <Link
            href='https://github.com/Rohit-Saini7'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Image
              src='/Icons/github-mark.svg'
              height={24}
              width={24}
              alt='github'
              className='dark:hidden opacity-90 hover:opacity-100 transition-opacity'
            />
            <Image
              src='/Icons/github-mark-white.svg'
              height={24}
              width={24}
              alt='github'
              className='hidden dark:block opacity-70 hover:opacity-100 transition-opacity'
            />
            <span className='sr-only'>GitHub</span>
          </Link>
          <Link
            href='https://linkedin.com/in/rohit-saini7'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Image
              src='/Icons/InBug-Black.png'
              height={22.5}
              width={24}
              className='dark:hidden opacity-70 hover:opacity-100 transition-opacity'
              alt='linkedin'
            />
            <Image
              src='/Icons/InBug-White.png'
              height={22.5}
              width={24}
              className='hidden dark:block opacity-70 hover:opacity-100 transition-opacity'
              alt='linkedin'
            />
            <span className='sr-only'>LinkedIn</span>
          </Link>
          <div className='h-4 w-px bg-border' />
          <p className='text-muted-foreground text-sm'>
            <OsShortcut /> to navigate
            <span className='hidden sm:inline'>
              , change theme or download resume
            </span>
            .
          </p>
        </div>
      </section>

      <section className='space-y-8'>
        <div className='flex items-center justify-between'>
          <h2 className='text-2xl font-semibold tracking-tight'>
            Featured Work
          </h2>
          <Link
            href='/lab'
            className='flex items-center gap-1 text-sm text-muted-foreground hover:text-primary transition-colors'
          >
            View Lab <ArrowUpRightIcon className='h-3 w-3' />
          </Link>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          {featuredProjects.map((project) => {
            const Icon = TYPE_ICONS[project.type] || TYPE_ICONS.default;
            const BadgeType = TYPE_BADGES[project.type] || null;

            return (
              <Link
                href={project.liveUrl ?? project.repoUrl ?? '#'}
                target={project.liveUrl ? '' : '_blank'}
                key={project.id}
                className='group rounded-lg border border-border bg-card p-5 transition-all hover:border-primary/50 hover:shadow-md'
              >
                <div className='mb-4 flex items-start justify-between'>
                  <div className='rounded-md bg-muted/60 p-2 transition-colors group-hover:bg-primary/10'>
                    <Icon className='h-5 w-5 text-primary' />
                  </div>

                  {BadgeType}
                </div>

                <h3 className='mb-2 text-lg font-semibold transition-colors'>
                  {project.title}
                </h3>
                <p className='mb-4 line-clamp-3 text-sm text-muted-foreground'>
                  {project.description}
                </p>

                <div className='mt-auto flex flex-wrap gap-2'>
                  {project.tech.map((t) => (
                    <Badge key={t} variant='secondary'>
                      {t}
                    </Badge>
                  ))}
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className='space-y-8'>
        <h2 className='text-2xl font-semibold tracking-tight'>Experience</h2>
        <div className='ml-2 space-y-12 border-l border-border'>
          {experience.map((role) => (
            <div key={role.id} className='relative pl-8'>
              <span className='absolute top-2 -left-[5px] h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-background' />

              <div className='mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between'>
                <h3 className='text-lg font-medium'>{role.role}</h3>
                <span className='font-mono text-xs tabular-nums text-muted-foreground'>
                  {role.period.start} — {role.period.end}
                </span>
              </div>

              <p className='mb-4 text-sm text-foreground/80'>{role.company}</p>

              <ul className='ml-4 list-outside list-disc space-y-1.5'>
                {role.description.map((desc, i) => (
                  <li key={i} className='pl-1 text-sm text-muted-foreground'>
                    {desc}
                  </li>
                ))}
              </ul>

              <div className='mt-4 flex flex-wrap gap-2'>
                {role.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className='rounded border border-border/40 px-1.5 py-0.5 text-2xs text-muted-foreground/60'
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
