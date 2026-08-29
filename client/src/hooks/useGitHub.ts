import { useState, useEffect, useCallback } from 'react';
import { GitHubActivity, UseGitHubReturn } from '../types/github';
import { apiCache } from '../utils/apiCache';

const API_BASE_URL = (import.meta as unknown as { env: { VITE_API_URL?: string } }).env.VITE_API_URL || 'http://localhost:3000/api';

/**
 * Custom hook for fetching GitHub activity data
 * Implements caching to prevent duplicate requests
 * Cache TTL: 24 hours (GitHub API is rate-limited)
 */
export const useGitHub = (): UseGitHubReturn => {
  const [activity, setActivity] = useState<GitHubActivity | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchActivity = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Use cache to prevent duplicate requests
      const data = await apiCache.getOrFetch(
        'github-activity',
        async () => {
          const response = await fetch(`${API_BASE_URL}/github/activity`);

          if (!response.ok) {
            const data = await response.json();
            throw new Error(data.message || 'Failed to fetch GitHub activity');
          }

          return response.json();
        },
        24 * 60 * 60 * 1000 // 24 hour cache
      );

      setActivity(data.data);
    } catch (err) {
      console.error('GitHub hook error:', err);
      setError(err instanceof Error ? err.message : 'Failed to fetch GitHub data');
      setActivity(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchActivity();
  }, [fetchActivity]);

  const refetch = useCallback(async () => {
    apiCache.clear('github-activity');
    await fetchActivity();
  }, [fetchActivity]);

  return {
    activity,
    isLoading,
    error,
    refetch,
  };
};
