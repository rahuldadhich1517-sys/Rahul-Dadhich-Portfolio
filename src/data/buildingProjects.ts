export interface ProjectTechnology {
  name: string;
  status: 'completed' | 'in-progress' | 'planned';
}

export interface BuildingProject {
  id: string;
  title: string;
  description: string;
  longDescription?: string;
  progress: number; // 0-100
  technologies: ProjectTechnology[];
  status: 'planning' | 'development' | 'beta' | 'launching';
  startedAt: string; // ISO date
  estimatedCompletion?: string; // ISO date
  featured?: boolean;
}

export const buildingProjects: BuildingProject[] = [
  {
    id: 'project-1',
    title: 'AI SaaS Platform',
    description: 'Next-generation SaaS platform powered by AI for business automation',
    longDescription:
      'A comprehensive SaaS application combining React frontend, Node.js backend, and AI integration. Features include intelligent workflow automation, real-time collaboration, and advanced analytics.',
    progress: 72,
    technologies: [
      { name: 'React', status: 'completed' },
      { name: 'Node.js', status: 'completed' },
      { name: 'PostgreSQL', status: 'completed' },
      { name: 'OpenAI API', status: 'in-progress' },
      { name: 'Deployment', status: 'planned' },
    ],
    status: 'development',
    startedAt: '2024-06-01',
    estimatedCompletion: '2024-10-01',
    featured: true,
  },
  {
    id: 'project-2',
    title: 'Real-time Analytics Dashboard',
    description: 'Enterprise-grade analytics platform with real-time data visualization',
    longDescription:
      'Advanced analytics dashboard featuring real-time data processing, interactive visualizations, and predictive analytics using machine learning models.',
    progress: 58,
    technologies: [
      { name: 'React', status: 'completed' },
      { name: 'D3.js', status: 'completed' },
      { name: 'Express', status: 'completed' },
      { name: 'WebSocket', status: 'in-progress' },
      { name: 'ML Models', status: 'in-progress' },
      { name: 'Deployment', status: 'planned' },
    ],
    status: 'development',
    startedAt: '2024-07-15',
    estimatedCompletion: '2024-11-15',
  },
  {
    id: 'project-3',
    title: 'Developer Tools Suite',
    description: 'Comprehensive toolkit for developers with CLI and web interface',
    longDescription:
      'A collection of developer-focused tools including code analysis, deployment utilities, and monitoring solutions.',
    progress: 45,
    technologies: [
      { name: 'TypeScript', status: 'completed' },
      { name: 'Node.js', status: 'completed' },
      { name: 'CLI', status: 'in-progress' },
      { name: 'Web UI', status: 'in-progress' },
      { name: 'Docker', status: 'planned' },
      { name: 'Testing', status: 'planned' },
    ],
    status: 'development',
    startedAt: '2024-08-01',
    estimatedCompletion: '2024-12-01',
  },
];

/**
 * Get all building projects
 */
export function getAllBuildingProjects(): BuildingProject[] {
  return buildingProjects;
}

/**
 * Get featured building projects
 */
export function getFeaturedBuildingProjects(): BuildingProject[] {
  return buildingProjects.filter((p) => p.featured).slice(0, 2);
}

/**
 * Get building project by ID
 */
export function getBuildingProjectById(id: string): BuildingProject | undefined {
  return buildingProjects.find((p) => p.id === id);
}

/**
 * Calculate progress statistics
 */
export function calculateProgressStats(project: BuildingProject) {
  const completedTechs = project.technologies.filter((t) => t.status === 'completed').length;
  const inProgressTechs = project.technologies.filter((t) => t.status === 'in-progress').length;
  const totalTechs = project.technologies.length;

  return {
    completedTechs,
    inProgressTechs,
    plannedTechs: totalTechs - completedTechs - inProgressTechs,
    totalTechs,
  };
}

/**
 * Get progress color based on percentage
 */
export function getProgressColor(progress: number): string {
  if (progress < 25) return '#ff4444';
  if (progress < 50) return '#ffaa00';
  if (progress < 75) return '#ffff00';
  return '#00ff88';
}

/**
 * Format date for display
 */
export function formatProjectDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });
}

/**
 * Calculate days since project start
 */
export function getDaysSinceStart(startedAt: string): number {
  const start = new Date(startedAt);
  const now = new Date();
  const diff = now.getTime() - start.getTime();
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
