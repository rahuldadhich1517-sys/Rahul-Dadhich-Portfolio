import { Router } from 'express';
import { GitHubController } from '../controllers/github.controller';

export const githubRouter = Router();

/**
 * GET /api/github/activity
 * Get GitHub user activity with caching
 */
githubRouter.get('/github/activity', async (req, res) => {
  await GitHubController.getActivity(req, res);
});

/**
 * POST /api/github/refresh
 * Manually refresh GitHub cache
 */
githubRouter.post('/github/refresh', async (req, res) => {
  await GitHubController.refreshCache(req, res);
});
