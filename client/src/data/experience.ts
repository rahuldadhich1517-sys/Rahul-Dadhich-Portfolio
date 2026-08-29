export interface ExperienceEntry {
  id: string;
  year: string;
  role: string;
  company: string;
  description: string;
  technologies: string[];
  duration?: string;
  location?: string;
  type: 'work' | 'education' | 'achievement';
}

export const experiences: ExperienceEntry[] = [
  {
    id: 'exp-1',
    year: '2024',
    role: 'Full Stack Developer',
    company: 'Portfolio Project',
    description: 'Designed and developed a comprehensive full-stack portfolio website using React 19, TypeScript, and Three.js. Implemented interactive 3D visualizations, responsive design, and performance optimization.',
    technologies: ['React', 'TypeScript', 'Three.js', 'Tailwind CSS', 'Node.js', 'Framer Motion'],
    duration: '6 months',
    location: 'Remote',
    type: 'work',
  },
  {
    id: 'exp-2',
    year: '2023',
    role: 'Full Stack Engineer',
    company: 'Tech Company',
    description: 'Developed and maintained multiple web applications. Led technical initiatives for performance optimization and code quality improvements. Collaborated with cross-functional teams on feature development.',
    technologies: ['JavaScript', 'React', 'Node.js', 'PostgreSQL', 'Docker', 'AWS'],
    duration: '1 year',
    location: 'Remote',
    type: 'work',
  },
  {
    id: 'exp-3',
    year: '2022',
    role: 'Junior Web Developer',
    company: 'Startup',
    description: 'Built responsive web applications and fixed production bugs. Contributed to database design and API development. Participated in daily stand-ups and sprint planning.',
    technologies: ['JavaScript', 'React', 'Node.js', 'MongoDB', 'Express', 'Git'],
    duration: '1.5 years',
    location: 'Hybrid',
    type: 'work',
  },
  {
    id: 'exp-4',
    year: '2021',
    role: 'Computer Science Graduate',
    company: 'University',
    description: 'Completed degree with focus on web development and software engineering. Capstone project: built an AI-powered content management system using React and Node.js.',
    technologies: ['Computer Science', 'Web Development', 'Algorithms', 'Database Design'],
    duration: '4 years',
    location: 'On-site',
    type: 'education',
  },
  {
    id: 'exp-5',
    year: '2020',
    role: 'Frontend Developer Intern',
    company: 'Digital Agency',
    description: 'Interned as a frontend developer working on client websites. Learned modern web development practices and collaborated with senior developers on real-world projects.',
    technologies: ['HTML', 'CSS', 'JavaScript', 'React', 'Figma'],
    duration: '3 months',
    location: 'On-site',
    type: 'work',
  },
];

export const getExperienceByYear = (year: string): ExperienceEntry | undefined => {
  return experiences.find((exp) => exp.year === year);
};

export const getExperiencesByType = (type: 'work' | 'education' | 'achievement'): ExperienceEntry[] => {
  return experiences.filter((exp) => exp.type === type);
};

export const getWorkExperiences = (): ExperienceEntry[] => {
  return getExperiencesByType('work').sort((a, b) => {
    const yearA = parseInt(a.year);
    const yearB = parseInt(b.year);
    return yearB - yearA;
  });
};
