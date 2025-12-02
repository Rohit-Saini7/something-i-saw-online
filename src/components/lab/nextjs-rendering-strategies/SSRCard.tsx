import { unstable_noStore as noStore } from 'next/cache';
import TimeMetric from './TimeMetric';

export default async function SSRCard() {
  noStore();
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const time = new Date().toLocaleTimeString();

  return (
    <TimeMetric
      label='Server Side (SSR)'
      time={time}
      type='SSR'
      description='Fetched fresh on every single request. Increases server load but ensures data is never stale.'
    />
  );
}
