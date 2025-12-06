import Link from 'next/link';
import {
  ArrowUpRightIcon,
  FlaskConicalIcon,
  GithubIcon,
  LinkedinIcon,
  TerminalIcon,
} from 'lucide-react';
import { projects } from '@/data/projects';
import { experience } from '@/data/experience';
import { OsShortcut } from '@components/command-menu';

export default function Home() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <main className='mx-auto min-h-screen max-w-3xl space-y-24 px-6 py-12 md:py-20'>
      <section className='space-y-6'>
        <div className='space-y-2'>
          <h1 className='text-foreground text-4xl font-bold tracking-tight sm:text-5xl'>
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
          <a
            href='https://github.com/Rohit-Saini7'
            target='_blank'
            rel='noopener noreferrer'
            className='text-muted-foreground hover:text-foreground transition-colors'
          >
            <GithubIcon className='h-6 w-6' />
            <span className='sr-only'>GitHub</span>
          </a>
          <a
            href='https://linkedin.com/in/rohit-saini7'
            target='_blank'
            rel='noopener noreferrer'
            className='text-muted-foreground hover:text-foreground transition-colors'
          >
            <LinkedinIcon className='h-6 w-6' />
            <span className='sr-only'>LinkedIn</span>
          </a>
          <div className='bg-border h-4 w-px' />
          <p className='text-muted-foreground text-sm'>
            <OsShortcut /> to navigate
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
            className='text-muted-foreground hover:text-primary flex items-center gap-1 text-sm'
          >
            View Lab <ArrowUpRightIcon className='h-3 w-3' />
          </Link>
        </div>

        <div className='grid gap-6 md:grid-cols-2'>
          {featuredProjects.map((project) => (
            <div
              key={project.id}
              className='group border-border bg-card hover:border-primary/50 rounded-lg border p-5 transition-all hover:shadow-md'
            >
              <div className='mb-4 flex items-start justify-between'>
                <div className='bg-muted/50 group-hover:bg-primary/10 rounded-md p-2 transition-colors'>
                  {project.type === 'lab' ? (
                    <FlaskConicalIcon className='text-primary h-5 w-5' />
                  ) : (
                    <TerminalIcon className='text-primary h-5 w-5' />
                  )}
                </div>
                {project.type === 'lab' && (
                  <span className='bg-secondary text-secondary-foreground rounded-full px-2 py-1 text-2xs font-bold tracking-wider uppercase'>
                    Experiment
                  </span>
                )}
              </div>

              <h3 className='group-hover:text-primary mb-2 text-lg font-semibold transition-colors'>
                {project.title}
              </h3>
              <p className='text-muted-foreground mb-4 line-clamp-3 text-sm'>
                {project.description}
              </p>

              <div className='mt-auto flex flex-wrap gap-2'>
                {project.tech.map((t) => (
                  <span
                    key={t}
                    className='text-muted-foreground bg-muted border-border/50 rounded border px-2 py-1 text-xs'
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className='space-y-8'>
        <h2 className='text-2xl font-semibold tracking-tight'>Experience</h2>
        <div className='border-border ml-2 space-y-12 border-l'>
          {experience.map((role) => (
            <div key={role.id} className='relative pl-8'>
              <span className='bg-primary ring-background absolute top-2 -left-[5px] h-2.5 w-2.5 rounded-full ring-4' />

              <div className='mb-2 flex flex-col sm:flex-row sm:items-baseline sm:justify-between'>
                <h3 className='text-lg font-medium'>{role.role}</h3>
                <span className='text-muted-foreground font-mono text-xs tabular-nums'>
                  {role.period.start} — {role.period.end}
                </span>
              </div>

              <p className='text-foreground/80 mb-4 text-sm'>{role.company}</p>

              <ul className='ml-4 list-outside list-disc space-y-1.5'>
                {role.description.map((desc, i) => (
                  <li key={i} className='text-muted-foreground pl-1 text-sm'>
                    {desc}
                  </li>
                ))}
              </ul>

              <div className='mt-4 flex flex-wrap gap-2'>
                {role.tech.slice(0, 4).map((t) => (
                  <span
                    key={t}
                    className='text-muted-foreground/60 border-border/40 rounded border px-1.5 py-0.5 text-2xs'
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
