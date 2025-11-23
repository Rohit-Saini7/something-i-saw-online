export type ProjectType = 'work' | 'lab' | 'experiment';

export interface Project {
  id: string;
  title: string;
  slug: string;
  description: string;
  type: ProjectType;
  tech: string[];
  date: string; // YYYY-MM-DD
  featured: boolean;
  repoUrl?: string;
  liveUrl?: string;
  mobileFriendly: boolean,
}

export const projects: Project[] = [
  {
    id: '3',
    title: 'Matrix Text Scramble',
    slug: 'text-scramble',
    description:
      'A cyberpunk-inspired text decryption effect using interval mathematics.',
    type: 'lab',
    tech: ['React', 'TypeScript', 'Algorithms'],
    date: '2023-12-01',
    featured: true,
    liveUrl: '/lab/text-scramble',
    mobileFriendly: false,
  },
  {
    id: '2',
    title: 'Particle Physics Engine',
    slug: 'particle-physics',
    description:
      'A canvas-based 2D physics simulation to test browser performance limits.',
    type: 'lab',
    tech: ['HTML5 Canvas', 'TypeScript', 'Math'],
    date: '2023-11-15',
    featured: true,
    liveUrl: '/lab/particle-physics',
    mobileFriendly: true,
  },
  {
    id: '1',
    title: 'BuddyBills',
    slug: 'buddy-bills',
    description:
      'A PWA for group expense tracking with role-based access, auto-balance updates, and dynamic split logic.',
    type: 'work',
    tech: ['Next.js', 'NestJS', 'PostgreSQL', 'SWR'],
    date: '2025-04-01',
    featured: true,
    repoUrl: 'https://github.com/Rohit-Saini7/BuddyBills',
    liveUrl: '#',
    mobileFriendly: false,
  },
];
