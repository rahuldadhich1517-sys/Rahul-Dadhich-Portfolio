import { useState, useEffect, useCallback } from 'react';
import { BuildingProject } from '../data/buildingProjects';

interface UseBuildingProjectsReturn {
  projects: BuildingProject[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

const API_BASE_URL = (import.meta as unknown as { env: { VITE_API_URL?: string } }).env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Custom hook for fetching building projects
 */
export const useBuildingProjects = (featured: boolean = false): UseBuildingProjectsReturn => {
  const [projects, setProjects] = useState<BuildingProject[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      const endpoint = featured ? '/building/projects/featured' : '/building/projects';
      const response = await fetch(`${API_BASE_URL}${endpoint}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch building projects: ${response.statusText}`);
      }

      const data = await response.json();
      setProjects(data.data || []);
    } catch (err) {
      console.error('Building projects hook error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch projects');
      setProjects([]);
    } finally {
      setIsLoading(false);
    }
  }, [featured]);

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  const refetch = useCallback(async () => {
    await fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    isLoading,
    error,
    refetch,
  };
};
