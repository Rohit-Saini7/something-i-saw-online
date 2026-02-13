import { Scene1_Manifesto } from '@/components/scenes/Scene1_Manifesto';
import { Scene2_Hydration } from '@/components/scenes/Scene2_Hydration';
import { Scene3_Experience } from '@/components/scenes/Scene3_Experience';
import { Scene4_Portal } from '@/components/scenes/Scene4_Portal';
import { GlobalBackground } from '@components/scenes/GlobalBackground';
import { TheTravelingCard } from '@components/scenes/TheTravelingCard';

export default function PortfolioPage() {
  return (
    <main className='relative'>
      <GlobalBackground />
      <TheTravelingCard />
      <Scene1_Manifesto />
      <Scene2_Hydration />
      <Scene3_Experience />
      <Scene4_Portal />
    </main>
  );
}
