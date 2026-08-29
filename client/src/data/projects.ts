export interface Project {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  image: string;
  githubUrl?: string;
  liveUrl?: string;
  featured: boolean;
  category: 'Web App' | 'Full Stack' | 'AI/ML' | 'Mobile' | 'Tool';
  architecture?: string;
  challenges?: string[];
  solutions?: string[];
  results?: string[];
  year?: number;
  role?: string;
  team?: string;
}

export const projects: Project[] = [
  {
    id: 'project-1',
    slug: 'ai-content-platform',
    title: 'AI Content Generation Platform',
    shortDescription: 'Intelligent content creation system powered by LLMs',
    description: 'A full-stack web application that leverages advanced LLMs to generate, optimize, and manage content at scale. Features real-time collaboration, template system, and analytics dashboard.',
    longDescription: `This platform revolutionizes content creation by combining cutting-edge LLM technology with intuitive design. Users can generate blog posts, social media content, email campaigns, and more with AI assistance while maintaining full creative control. The system includes version history, team collaboration, and performance analytics.`,
    technologies: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'Prisma', 'OpenAI API', 'Next.js'],
    image: '/projects/ai-content.jpg',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    category: 'Full Stack',
    architecture: 'Next.js frontend with Node.js backend, PostgreSQL database, Redis caching for API responses',
    challenges: [
      'Handling real-time API rate limiting from LLM providers',
      'Implementing efficient caching strategies for cost optimization',
      'Managing concurrent user sessions with live collaboration',
    ],
    solutions: [
      'Implemented queue-based system with Redis for API throttling',
      'Built intelligent cache invalidation based on content freshness',
      'Used WebSockets for real-time collaborative editing',
    ],
    results: [
      'Reduced content generation time by 70%',
      'Achieved 99.9% uptime in first 6 months',
      '500+ daily active users',
    ],
    year: 2024,
    role: 'Full Stack Developer',
  },
  {
    id: 'project-2',
    slug: 'ecommerce-platform',
    title: 'E-Commerce Platform',
    shortDescription: 'Modern shopping experience with real-time inventory management',
    description: 'A scalable e-commerce platform built with modern web technologies. Features include product browsing, intelligent search, cart management, secure payment processing, and admin dashboard.',
    longDescription: `An end-to-end e-commerce solution handling thousands of concurrent users. The platform integrates with Stripe for payments, includes real-time inventory tracking, order management system, and comprehensive admin analytics.`,
    technologies: ['React', 'Node.js', 'Express', 'MongoDB', 'Stripe', 'Docker', 'Azure'],
    image: '/projects/ecommerce.jpg',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    category: 'Full Stack',
    architecture: 'Microservices architecture with Docker containers, MongoDB for product catalog, Redis for session management',
    challenges: [
      'Managing real-time inventory across multiple regions',
      'Optimizing search performance for 100k+ products',
      'Secure payment processing compliance',
    ],
    solutions: [
      'Implemented distributed caching layer with Redis',
      'Built Elasticsearch integration for fast product search',
      'Integrated with Stripe API with webhook handling',
    ],
    results: [
      '1M+ monthly transactions processed',
      '98% payment success rate',
      'Average load time under 2 seconds',
    ],
    year: 2023,
    role: 'Lead Full Stack Developer',
  },
  {
    id: 'project-3',
    slug: 'task-management-app',
    title: 'Task Management Application',
    shortDescription: 'Collaborative workspace for team productivity',
    description: 'A full-featured task management system enabling teams to collaborate in real-time. Includes kanban boards, timeline views, team notifications, and integration with popular tools.',
    longDescription: `Built with modern React and TypeScript, this application provides a seamless experience for distributed teams to manage projects. Real-time updates, permission-based access control, and extensive integrations make it enterprise-ready.`,
    technologies: ['React', 'TypeScript', 'Firebase', 'Tailwind CSS', 'Redux Toolkit'],
    image: '/projects/task-app.jpg',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: true,
    category: 'Web App',
    architecture: 'React SPA with Firebase Realtime Database, Redux state management',
    challenges: [
      'Real-time sync across multiple tabs and devices',
      'Handling complex permission systems',
      'Optimizing re-renders for large task lists',
    ],
    solutions: [
      'Implemented Firestore with offline persistence',
      'Role-based access control with custom hooks',
      'Virtual scrolling for performance optimization',
    ],
    results: [
      '50k+ active users',
      'Sub-100ms real-time updates',
      '4.8/5 average user rating',
    ],
    year: 2023,
    role: 'Lead Frontend Developer',
  },
  {
    id: 'project-4',
    slug: 'data-visualization-dashboard',
    title: 'Data Visualization Dashboard',
    shortDescription: 'Interactive analytics platform with real-time data processing',
    description: 'An advanced analytics dashboard providing real-time insights through interactive visualizations. Supports multiple data sources, custom dashboards, and predictive analytics.',
    longDescription: `This dashboard processes millions of data points to deliver actionable insights. Built with performance in mind, it handles real-time data streams and provides complex visualizations with zero lag.`,
    technologies: ['React', 'D3.js', 'TypeScript', 'Node.js', 'PostgreSQL', 'WebSockets'],
    image: '/projects/dashboard.jpg',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: false,
    category: 'Web App',
    architecture: 'React with D3 visualizations, WebSocket-based real-time updates, PostgreSQL data warehouse',
    challenges: [
      'Rendering large datasets without performance degradation',
      'Real-time data synchronization',
      'Complex d3 chart interactions',
    ],
    solutions: [
      'Implemented data aggregation and sampling strategies',
      'WebSocket connection with optimistic updates',
      'Custom D3 wrapper components for reusability',
    ],
    results: [
      'Handles 10k events/second',
      'Dashboard loads in under 3 seconds',
      'Used by 200+ enterprise clients',
    ],
    year: 2024,
    role: 'Full Stack Developer',
  },
  {
    id: 'project-5',
    slug: 'mobile-fitness-app',
    title: 'Mobile Fitness Companion',
    shortDescription: 'Cross-platform fitness tracking and workout planning app',
    description: 'A comprehensive fitness application with workout tracking, nutrition planning, and social features. Built with React Native for iOS and Android.',
    longDescription: `Track workouts, monitor progress, and connect with a community of fitness enthusiasts. The app includes AI-powered workout recommendations based on your fitness level and goals.`,
    technologies: ['React Native', 'Firebase', 'TypeScript', 'Redux', 'Express'],
    image: '/projects/fitness-app.jpg',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: false,
    category: 'Mobile',
    architecture: 'React Native with Firebase backend, Redux state management',
    challenges: [
      'Cross-platform compatibility',
      'Efficient offline sync',
      'Battery optimization for GPS tracking',
    ],
    solutions: [
      'Shared codebase with platform-specific components',
      'Background sync with WorkManager',
      'Optimized location tracking algorithms',
    ],
    results: [
      '100k+ downloads',
      '4.6 star rating on app stores',
      '50k monthly active users',
    ],
    year: 2023,
    role: 'Mobile Developer',
  },
  {
    id: 'project-6',
    slug: 'ai-document-processor',
    title: 'AI Document Processing System',
    shortDescription: 'Intelligent document extraction and analysis using computer vision',
    description: 'An AI-powered system that automatically processes, extracts, and analyzes documents. Uses OCR and NLP for intelligent information extraction.',
    longDescription: `Automate document workflows with AI. Extract tables, forms, and text with high accuracy. Classify documents and extract key information automatically.`,
    technologies: ['Python', 'TensorFlow', 'Node.js', 'React', 'AWS', 'PostgreSQL'],
    image: '/projects/ai-doc.jpg',
    githubUrl: 'https://github.com',
    liveUrl: 'https://example.com',
    featured: false,
    category: 'AI/ML',
    architecture: 'Python backend with TensorFlow models, Node.js API layer, React frontend',
    challenges: [
      'Model accuracy across different document types',
      'Handling large file uploads',
      'Real-time processing at scale',
    ],
    solutions: [
      'Trained custom models for specific document types',
      'Chunked file uploads with progress tracking',
      'AWS Lambda for serverless processing',
    ],
    results: [
      '95% extraction accuracy',
      'Process 1000+ documents daily',
      '50ms average processing time per page',
    ],
    year: 2024,
    role: 'ML/Backend Developer',
  },
];

export const getProjectBySlug = (slug: string): Project | undefined => {
  return projects.find((p) => p.slug === slug);
};

export const getFeaturedProjects = (): Project[] => {
  return projects.filter((p) => p.featured);
};

export const getProjectsByCategory = (category: string): Project[] => {
  return projects.filter((p) => p.category === category);
};
