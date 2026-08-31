import type { IconType } from 'react-icons';
import { BsFiletypeSql } from 'react-icons/bs';

import {
  SiReact,
  SiTypescript,
  SiJavascript,
  SiNodedotjs,
  SiExpress,
  SiNextdotjs,
  SiMongodb,
  SiDocker,
  SiGit,
  SiGithub,
} from 'react-icons/si';

import { FaMicrosoft } from 'react-icons/fa';
import { FaBrain } from 'react-icons/fa6';

export interface Skill {
id: string;
name: string;
icon: IconType;
category:
| 'Frontend'
| 'Backend'
| 'Database'
| 'DevOps'
| 'Tools'
| 'AI/ML';
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
icon: SiReact,
category: 'Frontend',
proficiency: 'Expert',
description: 'Component-based UI library for building interactive interfaces',
relatedTechs: ['TypeScript', 'Redux Toolkit', 'Context API'],
color: '#61DAFB',
},
{
id: 'typescript',
name: 'TypeScript',
icon: SiTypescript,
category: 'Frontend',
proficiency: 'Expert',
description: 'Typed JavaScript superset for scalable development',
relatedTechs: ['React', 'Node.js', 'Express'],
color: '#3178C6',
},
{
id: 'javascript',
name: 'JavaScript',
icon: SiJavascript,
category: 'Frontend',
proficiency: 'Expert',
description: 'Core language for modern web development',
relatedTechs: ['TypeScript', 'React', 'Node.js'],
color: '#F7DF1E',
},
{
id: 'nodejs',
name: 'Node.js',
icon: SiNodedotjs,
category: 'Backend',
proficiency: 'Advanced',
description: 'JavaScript runtime for server-side applications',
relatedTechs: ['Express', 'TypeScript', 'MongoDB'],
color: '#339933',
},
{
id: 'express',
name: 'Express',
icon: SiExpress,
category: 'Backend',
proficiency: 'Advanced',
description: 'Lightweight web application framework for Node.js',
relatedTechs: ['Node.js', 'REST APIs', 'Middleware'],
color: '#000',
},
{
id: 'nextjs',
name: 'Next.js',
icon: SiNextdotjs,
category: 'Frontend',
proficiency: 'Advanced',
description: 'React framework with SSR, SSG, and API routes',
relatedTechs: ['React', 'TypeScript', 'Vercel'],
color: '#000',
},
{
id: 'mongodb',
name: 'MongoDB',
icon: SiMongodb,
category: 'Database',
proficiency: 'Advanced',
description: 'NoSQL document database for flexible data storage',
relatedTechs: ['Mongoose', 'Node.js', 'Express'],
color: '#47A248',
},
{
id: 'sql',
name: 'SQL',
icon: BsFiletypeSql,
category: 'Database',
proficiency: 'Advanced',
description: 'Powerful relational database for structured data',
relatedTechs: ['Prisma', 'TypeScript', 'Node.js'],
color: '#4169E1',
},
{
id: 'docker',
name: 'Docker',
icon: SiDocker,
category: 'DevOps',
proficiency: 'Advanced',
description: 'Containerization platform for consistent deployments',
relatedTechs: ['Kubernetes', 'DevOps', 'CI/CD'],
color: '#2496ED',
},
{
id: 'azure',
name: 'Azure',
icon: FaMicrosoft,
category: 'DevOps',
proficiency: 'Intermediate',
description: 'Cloud platform for hosting and infrastructure',
relatedTechs: ['Docker', 'CI/CD', 'Databases'],
color: '#0078D4',
},
{
id: 'git',
name: 'Git',
icon: SiGit,
category: 'Tools',
proficiency: 'Expert',
description: 'Version control system for collaborative development',
relatedTechs: ['GitHub', 'CI/CD', 'DevOps'],
color: '#F05032',
},
{
id: 'github',
name: 'GitHub',
icon: SiGithub,
category: 'Tools',
proficiency: 'Expert',
description: 'Platform for version control and collaboration',
relatedTechs: ['Git', 'Actions', 'CI/CD'],
color: '#FFFFFF',
},
{
id: 'ai-apis',
name: 'AI / LLM APIs',
icon: FaBrain,
category: 'AI/ML',
proficiency: 'Advanced',
description: 'Integration of AI and LLM APIs into modern applications',
relatedTechs: ['Node.js', 'LLM APIs', 'API Integration'],
color: '#10A37F',
},
];

// Generate positions for 3D constellation
export const generateConstellationPositions = (
count: number
): [number, number, number][] => {
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
