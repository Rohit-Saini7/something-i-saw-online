import { Scene1 } from '@components/scenes/Scene1';
import { Scene2 } from '@components/scenes/Scene2';
import { Scene3 } from '@components/scenes/Scene3';
import { Scene4 } from '@components/scenes/Scene4';
import { GlobalBackground } from '@components/scenes/GlobalBackground';
import { TheTravelingCard } from '@components/scenes/TheTravelingCard';

export default function PortfolioPage() {
  return (
    <main className='relative'>
      <GlobalBackground />
      <TheTravelingCard />
      <Scene1 />
      <Scene2 />
      <Scene3 />
      <Scene4 />
    </main>
  );
}
