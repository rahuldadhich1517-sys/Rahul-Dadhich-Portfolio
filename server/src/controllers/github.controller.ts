import { Request, Response } from 'express';
import { getGitHubActivity, clearGitHubCache } from '../services/github.service';

/**
 * GitHub Controller - Handles GitHub-related endpoints
 */
export class GitHubController {
  /**
   * GET /api/github/activity
   * Get GitHub user activity with caching
   */
  static async getActivity(req: Request, res: Response): Promise<void> {
    try {
      const activity = await getGitHubActivity();

      if (!activity) {
        res.status(503).json({
          success: false,
          error: 'GitHub data unavailable',
          message: 'Unable to fetch GitHub data. Please check your GITHUB_USERNAME configuration.',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: activity,
      });
    } catch (error) {
      console.error('GitHub Controller Error:', error);

      res.status(500).json({
        success: false,
        error: 'Internal server error',
        message: 'Failed to fetch GitHub activity',
      });
    }
  }

  /**
   * POST /api/github/refresh
   * Manually refresh GitHub cache (admin only in production)
   */
  static async refreshCache(req: Request, res: Response): Promise<void> {
    try {
      clearGitHubCache();
      const activity = await getGitHubActivity();

      if (!activity) {
        res.status(503).json({
          success: false,
          error: 'GitHub data unavailable',
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Cache refreshed',
        data: activity,
      });
    } catch (error) {
      console.error('GitHub Cache Refresh Error:', error);

      res.status(500).json({
        success: false,
        error: 'Failed to refresh cache',
      });
    }
  }
}
