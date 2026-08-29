import { Router } from 'express';
import { BuildingController } from '../controllers/building.controller';

export const buildingRouter = Router();

/**
 * GET /api/building/projects
 * Get all building projects
 */
buildingRouter.get('/building/projects', async (req, res) => {
  await BuildingController.getAllProjects(req, res);
});

/**
 * GET /api/building/projects/featured
 * Get featured building projects
 */
buildingRouter.get('/building/projects/featured', async (req, res) => {
  await BuildingController.getFeaturedProjects(req, res);
});

/**
 * GET /api/building/projects/:id
 * Get building project by ID
 */
buildingRouter.get('/building/projects/:id', async (req, res) => {
  await BuildingController.getProjectById(req, res);
});
