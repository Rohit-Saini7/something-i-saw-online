import Link from 'next/link';
import { projects } from '@/data/projects';
import { ArrowRightIcon, FlaskConicalIcon } from 'lucide-react';

export const metadata = {
  title: 'The Lab | Rohit Saini',
  description: 'Experimental playground and physics simulations.',
};

export default function LabGallery() {
  const experiments = projects.filter((p) => p.type === 'lab');

  return (
    <div className='mx-auto max-w-7xl py-12'>
      <div className='mb-16 space-y-4'>
        <h1 className='text-4xl font-bold tracking-tighter md:text-6xl'>
          The Laboratory
        </h1>
        <p className='text-muted-foreground max-w-xl text-lg'>
          A collection of isolated web experiments, UI interactions, and physics
          simulations. Use{' '}
          <span className='text-foreground border-border rounded border px-1 font-mono text-sm'>
            Cmd+K
          </span>{' '}
          to switch contexts.
        </p>
      </div>

      <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
        {experiments.map((lab) => (
          <Link
            key={lab.id}
            href={`/lab/${lab.slug}`}
            className='group bg-card border-border hover:border-primary/50 relative block h-64 overflow-hidden rounded-xl border shadow-sm transition-all duration-300 hover:shadow-md'
          >
            <div className='from-primary/5 absolute inset-0 bg-linear-to-br to-transparent opacity-0 transition-opacity group-hover:opacity-100' />

            <div className='absolute top-6 right-6 left-6'>
              <div className='flex items-start justify-between'>
                <FlaskConicalIcon className='text-muted-foreground group-hover:text-primary h-6 w-6 transition-colors' />
                <ArrowRightIcon className='text-muted-foreground group-hover:text-primary h-5 w-5 -rotate-45 transition-all duration-300 group-hover:rotate-0' />
              </div>
            </div>

            <div className='absolute right-6 bottom-6 left-6'>
              <h2 className='text-foreground mb-2 text-xl font-semibold'>
                {lab.title}
              </h2>
              <p className='text-muted-foreground mb-4 line-clamp-2 text-sm'>
                {lab.description}
              </p>
              <div className='flex flex-wrap gap-2'>
                {lab.tech.slice(0, 3).map((t) => (
                  <span
                    key={t}
                    className='text-muted-foreground border-border bg-muted/50 rounded border px-2 py-1 text-[10px] tracking-wider uppercase'
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </Link>
        ))}

        {experiments.length === 0 && (
          <div className='border-border text-muted-foreground col-span-full rounded-xl border border-dashed py-20 text-center'>
            <FlaskConicalIcon className='mx-auto mb-4 h-12 w-12 opacity-20' />
            <p>No experiments initialized yet.</p>
          </div>
        )}
      </div>
    </div>
  );
}
