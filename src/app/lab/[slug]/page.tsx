import { notFound } from 'next/navigation';
import { projects } from '@/data/projects';
import { Metadata } from 'next';
import ParticleEngine from '@lab-components/particle-engine';
import TextScramble from '@lab-components/text-scramble';
import ReduxTimeTravelLab from '@lab-components/redux-time-travel/legacy';
import ReduxToolkitTimeTravelLab from '@lab-components/redux-time-travel/toolkit';
import TheTimestampTest from '@lab-components/nextjs-rendering-strategies';
import MobileWarning from '@lab-components/mobile-warning';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects
    .filter((p) => p.type === 'experiment')
    .map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects.find(
    (p) => p.slug === slug && p.type === 'experiment'
  );

  if (!project) return { title: 'Not Found' };

  return {
    title: `${project.title} | Lab`,
    description: project.description,
  };
}

export default async function LabPage({ params }: PageProps) {
  const { slug } = await params;
  const project = projects.find(
    (p) => p.slug === slug && p.type === 'experiment'
  );

  if (!project) {
    notFound();
  }

  const renderExperiment = () => {
    switch (slug) {
      case 'particle-physics':
        return <ParticleEngine />;

      case 'text-scramble':
        return <TextScramble />;

      case 'redux-time-travel-legacy':
        return <ReduxTimeTravelLab />;

      case 'redux-time-travel-toolkit':
        return <ReduxToolkitTimeTravelLab />;

      case 'nextjs-rendering-strategies':
        return <TheTimestampTest />;

      default:
        return (
          <div className='flex min-h-screen w-full flex-col items-center justify-center space-y-4 px-4 text-center'>
            <p className='font-mono text-muted-foreground'>
              Experiment loaded:{' '}
              <span className='font-medium text-foreground'>{slug}</span>
            </p>
            <p className='text-sm text-muted-foreground'>
              (Component not found in registry)
            </p>
          </div>
        );
    }
  };

  return (
    <>
      {project.responsive ? null : <MobileWarning />}
      {renderExperiment()}
    </>
  );
}
