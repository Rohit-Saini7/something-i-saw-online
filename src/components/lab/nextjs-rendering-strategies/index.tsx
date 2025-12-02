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
      <div className='relative w-full max-w-7xl mx-auto p-4 md:p-8'>
        <div className='mb-12 space-y-4'>
          <h2 className='text-3xl md:text-4xl font-bold text-gray-900 dark:text-white tracking-tight ml-14 mt-2.5 sm:ml-0 sm:mt-0'>
            Rendering Strategies
          </h2>
          <p className='text-gray-600 dark:text-gray-400 max-w-2xl text-lg'>
            An interactive laboratory visualizing the temporal differences
            between Next.js rendering methods. Watch how &ldquo;Time&rdquo;
            flows differently in each quadrant.
          </p>
        </div>

        <div className='gap-4 lg:gap-6 md:grid md:grid-cols-[7fr_3fr]'>
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-6 mb-20'>
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
