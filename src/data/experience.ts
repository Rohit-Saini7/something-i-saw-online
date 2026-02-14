export interface Experience {
  id: string;
  role: string;
  company: string;
  location: string;
  period: {
    start: string;
    end: string;
  };
  description: string[];
  tech: string[];
}

export const experience: Experience[] = [
  {
    id: 'car-dekho-sde-ii',
    role: 'Software Development Engineer II',
    company: 'CarDekho Group',
    location: 'Gurugram, India',
    period: {
      start: 'Jul 2023',
      end: 'Present',
    },
    description: [
      'Led full-stack development across digiPartner, digiAgent, and digiBuddy, delivering 50+ production features end-to-end.',
      'Migrated legacy frontend to Next.js, reducing page load time by ~5s and improving Core Web Vitals by 60%.',
      'Designed and shipped 20+ backend micro-modules, including a scalable ACL system supporting 700+ concurrent users.',
      'Built an AWS Lambda based document processing pipeline, cutting manual processing time by 70%.',
      'Delivered a critical “Advance Payout” system from Dev to QA within 24 hours to unblock partner liquidity.',
      'Mentored 2 interns, enabling them to independently ship full-stack features.',
    ],
    tech: ['Next.js', 'NestJS', 'MySQL', 'AWS', 'TypeScript'],
  },
  {
    id: 'car-dekho-react-developer',
    role: 'React Developer',
    company: 'CarDekho Group',
    location: 'Remote',
    period: {
      start: 'Mar 2023',
      end: 'Jul 2023',
    },
    description: [
      'Built a fault-tolerant bulk invoice uploader processing 30,000+ records using AWS Lambda.',
      'Migrated legacy React components to Next.js, improving SEO, performance, and scalability.',
    ],
    tech: ['Next.js', 'React', 'Redux', 'MySQL'],
  },
  {
    id: 'valyu-ai-intern',
    role: 'Frontend Intern',
    company: 'Valyu.ai',
    location: 'Gurugram, India',
    period: {
      start: 'Aug 2022',
      end: 'Oct 2022',
    },
    description: [
      'Built a centralized operations dashboard from scratch, replacing fragmented spreadsheet workflows.',
      'Integrated real-time bi-directional data syncing using Firebase.',
      'Developed custom data visualization components for complex financial datasets.',
    ],
    tech: ['React', 'Node.js', 'Express', 'Firebase'],
  },
  {
    id: 'education',
    role: 'Bachelor of Technology',
    company: 'Kurukshetra University',
    location: 'India',
    period: {
      start: 'Aug 2019',
      end: 'Jun 2023',
    },
    description: [
      'Major in Information Technology.',
      'Graduated with an 8.4 GPA.',
    ],
    tech: [],
  },
];
