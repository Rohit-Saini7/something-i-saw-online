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
    id: 'car-dekho-sde-1',
    role: 'Software Development Engineer 1',
    company: 'CarDekho Group',
    location: 'Gurugram, India',
    period: {
      start: 'Jul 2023',
      end: 'Present',
    },
    description: [
      'Participated in full SDLC for 3 strategic projects (digiPartner, digiAgent, digiBuddy), launching 50+ features.',
      'Led frontend migration to Next.js, improving performance by 60% and reducing page load times by 5 seconds.',
      'Developed 20+ backend modules, including ACL systems supporting 700+ users.',
      'Engineered AWS Lambda-based document processing at 1,000 records/sec, reducing workflow time by 70%.',
      'Mentored 2 interns through full-stack development best practices.',
    ],
    tech: ['React', 'Next.js', 'Redux Toolkit', 'AWS', 'Context API'],
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
      'Re-architected the invoice uploader to process 30,000+ record files with fault tolerance.',
      'Migrated high-traffic components from React.js to Next.js, boosting scalability.',
    ],
    tech: ['React', 'Next.js', 'JavaScript'],
  },
];
