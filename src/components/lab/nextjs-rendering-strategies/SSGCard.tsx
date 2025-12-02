import TimeMetric from './TimeMetric';

export default function SSGCard() {
  const time = new Date().toLocaleTimeString();

  return (
    <TimeMetric
      label='Static Generation (SSG)'
      time={time}
      type='SSG'
      description='Generated once at build time. Extremely fast, but data remains frozen until the next deployment.'
    />
  );
}
