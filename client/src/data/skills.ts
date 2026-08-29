export interface Skill {
  id: string;
  name: string;
  icon: string;
  category: 'Frontend' | 'Backend' | 'Database' | 'DevOps' | 'Tools' | 'AI/ML';
  proficiency: 'Expert' | 'Advanced' | 'Intermediate';
  description: string;
  relatedTechs: string[];
  color: string;
  position?: [number, number, number];
}

export const skills: Skill[] = [
  {
    id: 'react',
    name: 'React',
    icon: '⚛️',
    category: 'Frontend',
    proficiency: 'Expert',
    description: 'Component-based UI library for building interactive interfaces',
    relatedTechs: ['TypeScript', 'Redux Toolkit', 'Context API'],
    color: '#61dafb',
  },
  {
    id: 'typescript',
    name: 'TypeScript',
    icon: '📘',
    category: 'Frontend',
    proficiency: 'Expert',
    description: 'Typed JavaScript superset for scalable development',
    relatedTechs: ['React', 'Node.js', 'Express'],
    color: '#3178c6',
  },
  {
    id: 'javascript',
    name: 'JavaScript',
    icon: '✨',
    category: 'Frontend',
    proficiency: 'Expert',
    description: 'Core language for modern web development',
    relatedTechs: ['TypeScript', 'React', 'Node.js'],
    color: '#f7df1e',
  },
  {
    id: 'nodejs',
    name: 'Node.js',
    icon: '🟢',
    category: 'Backend',
    proficiency: 'Advanced',
    description: 'JavaScript runtime for server-side applications',
    relatedTechs: ['Express', 'TypeScript', 'MongoDB'],
    color: '#68a063',
  },
  {
    id: 'express',
    name: 'Express',
    icon: '⚡',
    category: 'Backend',
    proficiency: 'Advanced',
    description: 'Lightweight web application framework for Node.js',
    relatedTechs: ['Node.js', 'REST APIs', 'Middleware'],
    color: '#000000',
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    icon: '▲',
    category: 'Frontend',
    proficiency: 'Advanced',
    description: 'React framework with SSR, SSG, and API routes',
    relatedTechs: ['React', 'TypeScript', 'Vercel'],
    color: '#000000',
  },
  {
    id: 'mongodb',
    name: 'MongoDB',
    icon: '🍃',
    category: 'Database',
    proficiency: 'Advanced',
    description: 'NoSQL document database for flexible data storage',
    relatedTechs: ['Mongoose', 'Node.js', 'Express'],
    color: '#00ed64',
  },
  {
    id: 'postgresql',
    name: 'PostgreSQL',
    icon: '🐘',
    category: 'Database',
    proficiency: 'Advanced',
    description: 'Powerful relational database with JSON support',
    relatedTechs: ['Prisma', 'TypeScript', 'Node.js'],
    color: '#336791',
  },
  {
    id: 'prisma',
    name: 'Prisma',
    icon: '🔮',
    category: 'Database',
    proficiency: 'Advanced',
    description: 'Modern ORM for type-safe database access',
    relatedTechs: ['PostgreSQL', 'TypeScript', 'Node.js'],
    color: '#0c344b',
  },
  {
    id: 'redis',
    name: 'Redis',
    icon: '🔴',
    category: 'Database',
    proficiency: 'Intermediate',
    description: 'In-memory data structure store for caching and sessions',
    relatedTechs: ['Node.js', 'Express', 'Performance'],
    color: '#dc382d',
  },
  {
    id: 'docker',
    name: 'Docker',
    icon: '🐳',
    category: 'DevOps',
    proficiency: 'Advanced',
    description: 'Containerization platform for consistent deployments',
    relatedTechs: ['Kubernetes', 'DevOps', 'CI/CD'],
    color: '#2496ed',
  },
  {
    id: 'azure',
    name: 'Azure',
    icon: '☁️',
    category: 'DevOps',
    proficiency: 'Intermediate',
    description: 'Cloud platform for hosting and infrastructure',
    relatedTechs: ['Docker', 'CI/CD', 'Databases'],
    color: '#0078d4',
  },
  {
    id: 'git',
    name: 'Git',
    icon: '📦',
    category: 'Tools',
    proficiency: 'Expert',
    description: 'Version control system for collaborative development',
    relatedTechs: ['GitHub', 'CI/CD', 'DevOps'],
    color: '#f1502f',
  },
  {
    id: 'github',
    name: 'GitHub',
    icon: '🐙',
    category: 'Tools',
    proficiency: 'Expert',
    description: 'Platform for version control and collaboration',
    relatedTechs: ['Git', 'Actions', 'CI/CD'],
    color: '#ffffff',
  },
  {
    id: 'ai-apis',
    name: 'AI / LLM APIs',
    icon: '🤖',
    category: 'AI/ML',
    proficiency: 'Advanced',
    description: 'Integration of OpenAI, Anthropic, and other LLM providers',
    relatedTechs: ['Node.js', 'Python', 'API Design'],
    color: '#00ff88',
  },
];

// Generate positions for 3D constellation
export const generateConstellationPositions = (count: number): [number, number, number][] => {
  const positions: [number, number, number][] = [];
  const radius = 4;
  const height = 3;

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const y = (Math.random() - 0.5) * height;
    const currentRadius = radius + (Math.random() - 0.5) * 1.5;

    positions.push([
      Math.cos(angle) * currentRadius,
      y,
      Math.sin(angle) * currentRadius,
    ]);
  }

  return positions;
};
