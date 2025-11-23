import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { Metadata } from 'next';
import ParticleEngine from '@lab-components/particle-engine';
import TextScramble from '@lab-components/text-scramble';
import { MobileWarning } from '@lab-components/mobile-warning';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects
    .filter((p) => p.type === 'lab')
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug && p.type === 'lab');

  if (!project) return { title: 'Not Found' };

  return {
    title: `${project.title} | Lab`,
    description: project.description,
  };
}

export default async function LabPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find((p) => p.slug === slug && p.type === 'lab');

  if (!project) {
    notFound();
  }

  const renderExperiment = () => {
    switch (slug) {
      case 'particle-physics':
        return <ParticleEngine />;
      case 'text-scramble':
        return <TextScramble />;

      default:
        return (
          <div className='space-y-4 text-center'>
            <p className='text-muted-foreground font-mono'>
              Experiment loaded: <span className='text-foreground'>{slug}</span>
            </p>
            <p className='text-muted-foreground text-sm'>
              (Component not found in registry)
            </p>
          </div>
        );
    }
  };

  return (
    <div className='relative flex h-[calc(100vh-100px)] w-full flex-col'>
      {!project.mobileFriendly && <MobileWarning />}
      <div className='z-10 mb-4 flex flex-col justify-between gap-4 md:flex-row md:items-end'>
        <div>
          <h1 className='text-foreground mb-1 text-2xl font-bold'>
            {project.title}
          </h1>
          <p className='text-muted-foreground max-w-lg text-sm'>
            {project.description}
          </p>
        </div>

        <div className='flex gap-2'>
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target='_blank'
              rel='noopener noreferrer'
              className='border-border hover:bg-muted text-muted-foreground hover:text-foreground rounded-md border px-3 py-1.5 text-xs transition-colors'
            >
              View Source
            </a>
          )}
        </div>
      </div>

      <div className='border-border bg-background relative flex-1 overflow-hidden rounded-lg border shadow-sm'>
        {renderExperiment()}
      </div>
    </div>
  );
}
