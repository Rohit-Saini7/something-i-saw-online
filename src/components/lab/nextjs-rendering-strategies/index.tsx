import { Suspense } from 'react';
import TimeMetric from './TimeMetric';
import RefreshControl from './RefreshControl';
import SystemConsole from './SystemConsole';
import LogProvider from './LogContext';
import CSRCard from './CSRCard';
import SSRCard from './SSRCard';
import SSGCard from './SSGCard';
import ISRCard from './ISRCard';

export default function TheTimestampTest() {
  return (
    <LogProvider>
      <div className='relative mx-auto w-full max-w-7xl p-4 md:p-8'>
        <div className='mb-12 space-y-4'>
          <h2 className='ml-14 mt-2.5 text-3xl font-bold tracking-tight sm:ml-0 sm:mt-0 md:text-4xl'>
            Rendering Strategies
          </h2>
          <p className='max-w-2xl text-lg text-muted-foreground'>
            An interactive laboratory visualizing the temporal differences
            between Next.js rendering methods. Watch how &ldquo;Time&rdquo;
            flows differently in each quadrant.
          </p>
        </div>

        <div className='gap-4 md:grid md:grid-cols-[7fr_3fr] lg:gap-6'>
          <div className='mb-20 grid grid-cols-1 gap-4 md:grid-cols-2 lg:gap-6'>
            <CSRCard />
            <Suspense
              fallback={
                <TimeMetric
                  label='Loading Server...'
                  time={null}
                  type='SSR'
                  description='Streaming in progress...'
                />
              }
            >
              <SSRCard />
            </Suspense>
            <SSGCard />
            <ISRCard />
          </div>
          <SystemConsole />
        </div>

        <RefreshControl />
      </div>
    </LogProvider>
  );
}
