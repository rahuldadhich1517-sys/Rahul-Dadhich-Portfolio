/**
 * Portfolio Knowledge Base
 * Contains all portfolio information for the AI assistant
 */

export interface PortfolioKnowledge {
  name: string;
  role: string;
  summary: string;
  skills: {
    category: string;
    items: string[];
  }[];
  technologies: {
    name: string;
    category: string;
    proficiency: string;
  }[];
  projects: {
    title: string;
    description: string;
    technologies: string[];
    year: string;
  }[];
  experience: {
    role: string;
    company: string;
    duration: string;
    description: string;
  }[];
  education: {
    degree: string;
    institution: string;
    year: string;
  }[];
  contact: {
    email?: string;
    github?: string;
    linkedin?: string;
    twitter?: string;
    portfolio?: string;
  };
}

export const portfolioKnowledge: PortfolioKnowledge = {
  name: 'Rahul Dadhich',
  role: 'Full Stack Developer & AI Enthusiast',
  summary:
    'Experienced full-stack developer with expertise in modern web technologies, AI integration, and cloud infrastructure. Passionate about building scalable applications and exploring AI capabilities.',

  skills: [
    {
      category: 'Frontend',
      items: ['React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'Three.js', 'Next.js'],
    },
    {
      category: 'Backend',
      items: ['Node.js', 'Express', 'FastAPI', 'PostgreSQL', 'MongoDB', 'Prisma'],
    },
    {
      category: 'DevOps & Cloud',
      items: ['Docker', 'Azure', 'AWS', 'CI/CD', 'Git', 'Linux'],
    },
    {
      category: 'AI & ML',
      items: [
        'OpenAI API',
        'LangChain',
        'RAG Systems',
        'AI Agents',
        'Prompt Engineering',
        'Vector Databases',
      ],
    },
    {
      category: 'Tools & Platforms',
      items: ['Redis', 'Pinecone', 'GitHub', 'VS Code', 'Figma', 'Postman'],
    },
  ],

  technologies: [
    { name: 'React', category: 'Frontend', proficiency: 'Expert' },
    { name: 'TypeScript', category: 'Frontend', proficiency: 'Expert' },
    { name: 'Node.js', category: 'Backend', proficiency: 'Expert' },
    { name: 'Express', category: 'Backend', proficiency: 'Advanced' },
    { name: 'PostgreSQL', category: 'Database', proficiency: 'Advanced' },
    { name: 'MongoDB', category: 'Database', proficiency: 'Advanced' },
    { name: 'Docker', category: 'DevOps', proficiency: 'Advanced' },
    { name: 'Azure', category: 'Cloud', proficiency: 'Intermediate' },
    { name: 'AWS', category: 'Cloud', proficiency: 'Intermediate' },
    { name: 'OpenAI API', category: 'AI', proficiency: 'Advanced' },
    { name: 'LangChain', category: 'AI', proficiency: 'Advanced' },
    { name: 'Three.js', category: 'Frontend', proficiency: 'Intermediate' },
    { name: 'Next.js', category: 'Frontend', proficiency: 'Advanced' },
    { name: 'Tailwind CSS', category: 'Frontend', proficiency: 'Expert' },
    { name: 'Git', category: 'Tools', proficiency: 'Expert' },
  ],

  projects: [
    {
      title: 'AI Content Platform',
      description: 'Intelligent platform for AI-powered content generation and management',
      technologies: ['React', 'Node.js', 'OpenAI', 'PostgreSQL', 'Docker'],
      year: '2024',
    },
    {
      title: 'E-Commerce Platform',
      description: 'Full-stack e-commerce application with payment processing',
      technologies: ['React', 'Express', 'MongoDB', 'Stripe', 'Docker'],
      year: '2024',
    },
    {
      title: 'Task Management App',
      description: 'Collaborative task management with real-time updates',
      technologies: ['React', 'Node.js', 'PostgreSQL', 'WebSocket', 'Redis'],
      year: '2023',
    },
    {
      title: 'Data Visualization Dashboard',
      description: 'Interactive analytics dashboard with advanced visualizations',
      technologies: ['React', 'TypeScript', 'D3.js', 'Express', 'PostgreSQL'],
      year: '2023',
    },
    {
      title: 'Mobile Fitness App',
      description: 'React Native fitness tracking application',
      technologies: ['React Native', 'Node.js', 'Firebase', 'TypeScript'],
      year: '2023',
    },
    {
      title: 'AI Document Processing System',
      description: 'System for intelligent document analysis and extraction using AI',
      technologies: ['Python', 'OpenAI', 'LangChain', 'FastAPI', 'PostgreSQL'],
      year: '2024',
    },
  ],

  experience: [
    {
      role: 'Full Stack Developer',
      company: 'Portfolio Project',
      duration: '6 months (2024)',
      description:
        'Designed and developed comprehensive full-stack portfolio website using React 19, TypeScript, and Three.js with interactive 3D visualizations',
    },
    {
      role: 'Full Stack Engineer',
      company: 'Tech Company',
      duration: '1 year (2023)',
      description: 'Developed and maintained multiple web applications, led technical initiatives for performance optimization',
    },
    {
      role: 'Junior Web Developer',
      company: 'Startup',
      duration: '1.5 years (2022)',
      description: 'Built responsive web applications, contributed to database design and API development',
    },
  ],

  education: [
    {
      degree: 'Bachelor of Science in Computer Science',
      institution: 'University',
      year: '2021',
    },
  ],

  contact: {
    email: 'rahul@example.com',
    github: 'https://github.com/rahul',
    linkedin: 'https://linkedin.com/in/rahul',
    twitter: 'https://twitter.com/rahul',
    portfolio: 'https://rahuldadhich.dev',
  },
};

/**
 * Format portfolio knowledge as context for the AI assistant
 */
export const getPortfolioContext = (): string => {
  const { name, role, summary, skills, technologies, projects, experience, education, contact } =
    portfolioKnowledge;

  let context = `
You are a helpful AI assistant representing ${name}, a ${role}.

ABOUT:
${summary}

SKILLS:
${skills.map((skill) => `${skill.category}: ${skill.items.join(', ')}`).join('\n')}

KEY TECHNOLOGIES:
${technologies.map((tech) => `- ${tech.name} (${tech.proficiency})`).join('\n')}

RECENT PROJECTS:
${projects.map((proj) => `- ${proj.title} (${proj.year}): ${proj.description}`).join('\n')}

EXPERIENCE:
${experience.map((exp) => `- ${exp.role} at ${exp.company} (${exp.duration}): ${exp.description}`).join('\n')}

EDUCATION:
${education.map((edu) => `- ${edu.degree} from ${edu.institution} (${edu.year})`).join('\n')}

CONTACT:
${Object.entries(contact)
  .filter(([, value]) => value)
  .map(([key, value]) => `${key}: ${value}`)
  .join('\n')}

IMPORTANT INSTRUCTIONS:
1. Answer questions ONLY based on the information provided above
2. If asked about information not in this knowledge base, respond: "I don't have that information in my knowledge base."
3. Do not make up or invent information about projects, experience, or skills
4. Be helpful and professional in your responses
5. Keep responses concise and relevant
6. If the question is not related to Rahul's portfolio, politely redirect the conversation
`;

  return context;
};
