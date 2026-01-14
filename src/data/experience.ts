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
    id: 'car-dekho-sde-2',
    role: 'Software Development Engineer 2',
    company: 'CarDekho Group',
    location: 'Gurugram, India',
    period: {
      start: 'Jul 2023',
      end: 'Present',
    },
    description: [
      'Orchestrated full-stack development for digiPartner, digiAgent, and digiBuddy, shipping 50+ features to production.',
      'Led a strategic frontend migration to Next.js, slashing page load times by 5s and boosting Core Web Vitals by 60%.',
      'Architected 20+ backend micro-modules and a scalable ACL system managing permissions for 700+ concurrent users.',
      'Designed an AWS Lambda document pipeline that automated manual workflows, cutting processing time by 70%.',
      'Rapid Execution: Engineered and deployed the "Advance Payout" system from Dev to QA in a critical 24-hour sprint to solve partner liquidity issues.',
      'Mentored 2 interns, converting them into effective full-stack contributors.',
    ],
    tech: ['Next.js', 'NestJS', 'MySQL', 'AWS', 'TypeScript'],
  },
  {
    id: 'car-dekho-intern',
    role: 'Frontend Intern',
    company: 'CarDekho Group',
    location: 'Remote',
    period: {
      start: 'Mar 2023',
      end: 'Jul 2023',
    },
    description: [
      'Engineered a fault-tolerant bulk invoice uploader capable of parsing and validating 30,000+ records using AWS Lambda.',
      'Migrated legacy React components to Next.js, significantly improving SEO and scalability.',
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
      'Built a centralized operations dashboard from 0 to 1, replacing fragmented spreadsheet workflows.',
      'Integrated real-time bi-directional data syncing with Firebase to modernize internal operations.',
      'Developed and shipped custom data visualization components for complex financial datasets.',
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
      'Graduated with 8.4 GPA.',
    ],
    tech: ['CS Fundamentals'],
  },
];