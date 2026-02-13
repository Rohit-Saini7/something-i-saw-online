'use client';

import { useState, useEffect } from 'react';
import TimeMetric from './TimeMetric';

export default function CSRCard() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const initTimer = setTimeout(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    const interval = setInterval(() => {
      setTime(new Date().toLocaleTimeString());
    }, 1000);

    return () => {
      clearTimeout(initTimer);
      clearInterval(interval);
    };
  }, []);

  return (
    <TimeMetric
      label='Client Side (CSR)'
      time={time}
      type='CSR'
      description='Rendered entirely in the browser. Initial load shows a skeleton/spinner until JavaScript executes.'
    />
  );
}
