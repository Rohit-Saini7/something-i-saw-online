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
          <div className='flex h-screen w-full flex-col items-center justify-center space-y-4'>
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
    <>
      {!project.mobileFriendly && <MobileWarning />}
      {renderExperiment()}
    </>
  );
}
