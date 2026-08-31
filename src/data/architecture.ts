export interface ArchitectureNode {
  id: string;
  label: string;
  type: 'client' | 'frontend' | 'api' | 'backend' | 'database' | 'service';
  description: string;
  details: string[];
  color: string;
  position?: { x: number; y: number };
}

export interface ArchitectureConnection {
  from: string;
  to: string;
  label?: string;
}

export const architectureNodes: ArchitectureNode[] = [
  {
    id: 'client',
    label: 'CLIENT',
    type: 'client',
    description: 'Web Browser',
    details: ['TypeScript', 'React Hooks', 'State Management', 'PWA Ready'],
    color: '#61dafb',
    position: { x: 50, y: 10 },
  },
  {
    id: 'frontend',
    label: 'REACT / NEXT.JS',
    type: 'frontend',
    description: 'Frontend Framework',
    details: ['Component Architecture', 'SSR/SSG', 'API Routes', 'Image Optimization'],
    color: '#61dafb',
    position: { x: 50, y: 25 },
  },
  {
    id: 'api',
    label: 'API LAYER',
    type: 'api',
    description: 'REST/GraphQL Interface',
    details: ['Request Routing', 'Middleware', 'Validation', 'Error Handling'],
    color: '#fbbf24',
    position: { x: 50, y: 40 },
  },
  {
    id: 'backend',
    label: 'NODE.JS',
    type: 'backend',
    description: 'Backend Runtime',
    details: ['REST APIs', 'Authentication', 'Business Logic', 'Job Processing'],
    color: '#68a063',
    position: { x: 50, y: 55 },
  },
  {
    id: 'database',
    label: 'POSTGRESQL',
    type: 'database',
    description: 'Relational Database',
    details: ['Prisma ORM', 'Transactions', 'Indexes', 'Data Integrity'],
    color: '#336791',
    position: { x: 50, y: 70 },
  },
  {
    id: 'redis',
    label: 'REDIS',
    type: 'service',
    description: 'Cache & Sessions',
    details: ['In-memory Cache', 'Session Storage', 'Rate Limiting', 'Real-time Data'],
    color: '#dc382d',
    position: { x: 20, y: 55 },
  },
  {
    id: 'ai',
    label: 'AI SERVICE',
    type: 'service',
    description: 'LLM Integration',
    details: ['OpenAI API', 'Prompt Engineering', 'Embeddings', 'Streaming Responses'],
    color: '#00ff88',
    position: { x: 50, y: 85 },
  },
  {
    id: 'cloud',
    label: 'AZURE CLOUD',
    type: 'service',
    description: 'Infrastructure',
    details: ['Docker Containers', 'App Service', 'Storage Blobs', 'CDN'],
    color: '#0078d4',
    position: { x: 80, y: 55 },
  },
];

export const architectureConnections: ArchitectureConnection[] = [
  { from: 'client', to: 'frontend', label: 'HTTP/WebSocket' },
  { from: 'frontend', to: 'api', label: 'API Calls' },
  { from: 'api', to: 'backend', label: 'Processing' },
  { from: 'backend', to: 'database', label: 'Queries' },
  { from: 'backend', to: 'redis', label: 'Cache' },
  { from: 'backend', to: 'ai', label: 'LLM Calls' },
  { from: 'backend', to: 'cloud', label: 'Deploy' },
];

export const getNodeById = (id: string): ArchitectureNode | undefined => {
  return architectureNodes.find((node) => node.id === id);
};

export const getConnectionsForNode = (nodeId: string): ArchitectureConnection[] => {
  return architectureConnections.filter(
    (conn) => conn.from === nodeId || conn.to === nodeId
  );
};
