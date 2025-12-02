import TimeMetric from './TimeMetric';
import { unstable_cache as cache } from 'next/cache';

const getCachedTime = cache(
  async () => new Date().toLocaleTimeString(),
  ['isr-time-key'],
  { revalidate: 10 }
);

export async function ISRCard() {
  const time = await getCachedTime();

  return (
    <TimeMetric
      label='Incremental (ISR)'
      time={time}
      type='ISR'
      description='Hybrid approach. Serves static HTML (fast) but regenerates it in the background every 10 seconds.'
    />
  );
}
