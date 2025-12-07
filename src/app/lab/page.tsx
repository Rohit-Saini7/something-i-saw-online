import Link from 'next/link';
import { projects } from '@/data/projects';
import { ArrowRightIcon, FlaskConicalIcon } from 'lucide-react';
import { OsShortcut } from '@components/command-menu';
import { Badge } from '@ui-components/badge';

export const metadata = {
  title: 'The Lab | Rohit Saini',
  description: 'Experimental playground and physics simulations.',
};

export default function LabGallery() {
  const experiments = projects.filter((p) => p.type === 'experiment');

  return (
    <main className='mx-auto min-h-screen max-w-3xl space-y-24 px-6 py-12 md:py-20 sm:max-w-7xl'>
      <section className='space-y-6'>
        <h1 className='text-4xl font-bold tracking-tighter md:text-6xl'>
          The Laboratory
        </h1>
        <p className='max-w-xl text-lg text-muted-foreground'>
          A collection of isolated web experiments, UI interactions, and physics
          simulations. Use <OsShortcut /> to switch contexts.
        </p>
      </section>

      <section className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {experiments.map((lab) => (
          <Link
            key={lab.id}
            href={`/lab/${lab.slug}`}
            className='group relative block h-64 overflow-hidden rounded-xl border border-border bg-card shadow-sm transition-all duration-300 hover:border-primary/50 hover:shadow-md'
          >
            <div className='absolute inset-0 bg-linear-to-br from-primary/5 to-transparent opacity-0 transition-opacity group-hover:opacity-100' />

            <div className='absolute inset-x-6 top-6'>
              <div className='flex items-start justify-between'>
                <FlaskConicalIcon className='h-6 w-6 text-muted-foreground transition-colors group-hover:text-primary' />
                <ArrowRightIcon className='h-5 w-5 -rotate-45 text-muted-foreground transition-all duration-300 group-hover:rotate-0 group-hover:text-primary' />
              </div>
            </div>

            <div className='absolute inset-x-6 bottom-6'>
              <h2 className='mb-2 text-xl font-semibold text-foreground'>
                {lab.title}
              </h2>

              <p className='mb-4 line-clamp-2 text-sm text-muted-foreground'>
                {lab.description}
              </p>

              <div className='flex flex-wrap gap-2'>
                {lab.tech.slice(0, 3).map((t) => (
                  <Badge variant='secondary' key={t}>
                    {t}
                  </Badge>
                ))}
              </div>
            </div>
          </Link>
        ))}
      </section>
    </main>
  );
}
