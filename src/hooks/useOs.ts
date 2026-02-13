'use client';

import { useEffect, useState } from 'react';

type OS = 'mac' | 'win' | 'linux' | 'unknown';

interface NavigatorWithUAData extends Navigator {
  userAgentData: {
    platform: string;
  };
}

function hasUserAgentData(
  navigator: Navigator
): navigator is NavigatorWithUAData {
  return 'userAgentData' in navigator;
}

export default function useOs(): OS {
  const [os, setOs] = useState<OS>('unknown');

  useEffect(() => {
    if (hasUserAgentData(navigator)) {
      const platform = navigator.userAgentData.platform.toLowerCase();

      if (platform.includes('mac')) return setOs('mac');
      if (platform.includes('win')) return setOs('win');
      if (platform.includes('linux')) return setOs('linux');
    }

    const ua = navigator.userAgent.toLowerCase();

    if (/mac|iphone|ipad|ipod/.test(ua)) setOs('mac');
    else if (/win/.test(ua)) setOs('win');
    else if (/linux/.test(ua)) setOs('linux');
    else setOs('unknown');
  }, []);

  return os;
}
