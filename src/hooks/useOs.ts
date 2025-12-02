'use client';

import { useEffect, useState } from 'react';

export default function useOs() {
  const [os, setOs] = useState('win');

  useEffect(() => {
    const platform = navigator.platform.toLowerCase();
    const userAgent = navigator.userAgent.toLowerCase();

    const isMac =
      platform.includes('mac') || /iphone|ipad|ipod|mac/.test(userAgent);

    setOs(isMac ? 'mac' : 'win');
  }, []);

  return os;
}
