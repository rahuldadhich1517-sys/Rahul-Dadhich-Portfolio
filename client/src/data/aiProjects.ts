export interface AIProject {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  technologies: string[];
  architecture: string[];
  category: 'llm' | 'rag' | 'agents' | 'automation' | 'apis';
  featured?: boolean;
  githubUrl?: string;
  demoUrl?: string;
  image?: string;
  status?: 'completed' | 'in-progress' | 'research';
}

export const aiProjects: AIProject[] = [
  {
    id: 'ai-1',
    title: 'LLM Content Generation Pipeline',
    description: 'Intelligent content generation system leveraging large language models for automated blog writing and documentation.',
    longDescription:
      'A sophisticated pipeline that uses advanced language models to generate high-quality content. Features include prompt engineering, response refinement, and multi-model orchestration.',
    technologies: ['OpenAI API', 'Node.js', 'TypeScript', 'Redis', 'PostgreSQL'],
    architecture: ['API Gateway', 'LLM Service', 'Cache Layer', 'Database'],
    category: 'llm',
    featured: true,
    githubUrl: '#',
    demoUrl: '#',
    status: 'completed',
  },
  {
    id: 'ai-2',
    title: 'Retrieval-Augmented Generation System',
    description: 'RAG system combining document indexing with LLM intelligence for context-aware question answering.',
    longDescription:
      'Advanced RAG implementation with semantic search, vector embeddings, and intelligent retrieval. Enables accurate answers based on custom knowledge bases.',
    technologies: ['LangChain', 'Pinecone', 'OpenAI', 'Express', 'React'],
    architecture: ['Vector Database', 'Semantic Search', 'LLM Integration', 'Frontend UI'],
    category: 'rag',
    featured: true,
    githubUrl: '#',
    demoUrl: '#',
    status: 'completed',
  },
  {
    id: 'ai-3',
    title: 'Autonomous AI Agent Framework',
    description: 'Multi-agent system for complex task decomposition, execution, and result synthesis.',
    longDescription:
      'Framework for building autonomous agents that can plan, execute, and adapt. Includes task decomposition, state management, and inter-agent communication.',
    technologies: ['LangChain', 'OpenAI', 'Node.js', 'TypeScript', 'FastAPI'],
    architecture: ['Agent Core', 'Tool Integration', 'Memory System', 'Execution Engine'],
    category: 'agents',
    featured: true,
    githubUrl: '#',
    demoUrl: '#',
    status: 'completed',
  },
  {
    id: 'ai-4',
    title: 'Workflow Automation Engine',
    description: 'No-code automation platform powered by AI for business process optimization.',
    longDescription:
      'Intelligent automation engine that understands natural language workflow descriptions and generates executable workflows.',
    technologies: ['Node.js', 'TypeScript', 'Express', 'PostgreSQL', 'Redis'],
    architecture: ['Workflow Parser', 'Execution Engine', 'Event System', 'Database'],
    category: 'automation',
    featured: false,
    githubUrl: '#',
    demoUrl: '#',
    status: 'in-progress',
  },
  {
    id: 'ai-5',
    title: 'Multi-Modal AI API Integration',
    description: 'Unified interface for multiple AI APIs including vision, audio, and text processing.',
    longDescription:
      'Abstraction layer over multiple AI providers enabling seamless integration of vision, speech, and text capabilities.',
    technologies: ['OpenAI Vision', 'Google APIs', 'Azure Cognitive', 'Node.js', 'TypeScript'],
    architecture: ['API Gateway', 'Provider Router', 'Response Normalizer', 'Cache'],
    category: 'apis',
    featured: false,
    githubUrl: '#',
    demoUrl: '#',
    status: 'in-progress',
  },
  {
    id: 'ai-6',
    title: 'AI-Powered Code Assistant',
    description: 'Intelligent code generation and debugging assistant with context awareness.',
    longDescription:
      'Advanced code assistant that understands your project structure and generates contextually relevant code suggestions.',
    technologies: ['OpenAI Codex', 'React', 'Express', 'PostgreSQL', 'WebSocket'],
    architecture: ['Code Parser', 'Context Analyzer', 'LLM Integration', 'Real-time API'],
    category: 'llm',
    featured: false,
    githubUrl: '#',
    demoUrl: '#',
    status: 'research',
  },
];

export const getAIProjectById = (id: string): AIProject | undefined => {
  return aiProjects.find((project) => project.id === id);
};

export const getAIProjectsByCategory = (
  category: 'llm' | 'rag' | 'agents' | 'automation' | 'apis'
): AIProject[] => {
  return aiProjects.filter((project) => project.category === category);
};

export const getFeaturedAIProjects = (): AIProject[] => {
  return aiProjects.filter((project) => project.featured).slice(0, 3);
};

export const getAICategories = () => [
  { id: 'llm', label: 'LLM', description: 'Large Language Models' },
  { id: 'rag', label: 'RAG', description: 'Retrieval-Augmented Generation' },
  { id: 'agents', label: 'Agents', description: 'AI Agents' },
  { id: 'automation', label: 'Automation', description: 'AI Automation' },
  { id: 'apis', label: 'APIs', description: 'AI APIs' },
];
