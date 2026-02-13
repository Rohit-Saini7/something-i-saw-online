type ISODate = `${number}-${number}-${number}`;

export const PROJECT_TYPES = ['external', 'work', 'experiment'] as const;
export type ProjectType = (typeof PROJECT_TYPES)[number];

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: ProjectType;
  tech: readonly string[];
  date: ISODate; //? YYYY-MM-DD
  featured: boolean;
  repoUrl?: string;
  liveUrl?: string;
  responsive: boolean;
}

export const projects: readonly Project[] = [
  {
    id: 'nextjs-rendering-strategies',
    title: 'Rendering Time Travel',
    slug: 'nextjs-rendering-strategies',
    description:
      'A comparative experiment visualizing the execution timing differences between CSR, SSR, SSG, and ISR. Uses real-time timestamps to demonstrate caching behaviors and hydration lag in the App Router.',
    type: 'experiment',
    tech: ['Rendering', 'Next.js', 'Tailwind CSS'],
    date: '2025-12-02',
    featured: true,
    liveUrl: '/lab/nextjs-rendering-strategies',
    repoUrl:
      'https://github.com/Rohit-Saini7/something-i-saw-online/blob/master/src/components/lab/nextjs-rendering-strategies/index.tsx',
    responsive: true,
  },
  {
    id: 'redux-time-travel-toolkit',
    title: 'Temporal State Machine (RTK)',
    slug: 'redux-time-travel-toolkit',
    description:
      'Refactored version using Redux Toolkit. Showcases createSlice, internal Immer usage for simplified immutability, and reduced boilerplate.',
    type: 'experiment',
    tech: ['Redux Toolkit', 'React', 'Tailwind CSS'],
    date: '2025-12-01',
    featured: true,
    liveUrl: '/lab/redux-toolkit-time-travel',
    repoUrl:
      'https://github.com/Rohit-Saini7/something-i-saw-online/blob/master/src/components/lab/redux-time-travel/toolkit.tsx',
    responsive: true,
  },
  {
    id: 'redux-time-travel-legacy',
    title: 'Temporal State Machine (Legacy)',
    slug: 'redux-time-travel-legacy',
    description:
      'A pure Redux implementation showcasing manual immutability, state history, and time-travel debugging without Redux Toolkit.',
    type: 'experiment',
    tech: ['Redux (Legacy)', 'React', 'Tailwind CSS'],
    date: '2025-12-01',
    featured: false,
    liveUrl: '/lab/redux-time-travel',
    repoUrl:
      'https://github.com/Rohit-Saini7/something-i-saw-online/blob/master/src/components/lab/redux-time-travel/legacy.tsx',
    responsive: true,
  },
  {
    id: 'text-scramble',
    title: 'Matrix Text Scramble',
    slug: 'text-scramble',
    description:
      'A cyberpunk-inspired text decryption effect using interval mathematics.',
    type: 'experiment',
    tech: ['React', 'TypeScript', 'Algorithms'],
    date: '2025-11-24',
    featured: false,
    liveUrl: '/lab/text-scramble',
    repoUrl:
      'https://github.com/Rohit-Saini7/something-i-saw-online/blob/master/src/components/lab/text-scramble.tsx',
    responsive: true,
  },
  {
    id: 'particle-physics',
    title: 'Particle Physics Engine',
    slug: 'particle-physics',
    description:
      'A canvas-based 2D physics simulation to test browser performance limits.',
    type: 'experiment',
    tech: ['HTML5 Canvas', 'TypeScript', 'Math'],
    date: '2025-11-24',
    featured: true,
    liveUrl: '/lab/particle-physics',
    repoUrl:
      'https://github.com/Rohit-Saini7/something-i-saw-online/blob/master/src/components/lab/particle-engine.tsx',
    responsive: true,
  },
  {
    id: 'buddy-bills',
    title: 'BuddyBills',
    slug: 'buddy-bills',
    description:
      'A PWA for group expense tracking with role-based access, auto-balance updates, and dynamic split logic.',
    type: 'external',
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'SWR'],
    date: '2025-04-01',
    featured: true,
    repoUrl: 'https://github.com/Rohit-Saini7/BuddyBills',
    responsive: true,
  },
] as const;
