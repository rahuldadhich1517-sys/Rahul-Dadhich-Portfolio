import { Request, Response } from 'express';
import {
  getAllBuildingProjects,
  getFeaturedBuildingProjects,
  getBuildingProjectById,
} from '../data/buildingProjects';

/**
 * Building Projects Controller - Handles project endpoints
 */
export class BuildingController {
  /**
   * GET /api/building/projects
   * Get all building projects
   */
  static async getAllProjects(req: Request, res: Response): Promise<void> {
    try {
      const projects = getAllBuildingProjects();

      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      console.error('Building Controller Error:', error);

      res.status(500).json({
        success: false,
        error: 'Failed to fetch building projects',
      });
    }
  }

  /**
   * GET /api/building/projects/featured
   * Get featured building projects
   */
  static async getFeaturedProjects(req: Request, res: Response): Promise<void> {
    try {
      const projects = getFeaturedBuildingProjects();

      res.status(200).json({
        success: true,
        data: projects,
      });
    } catch (error) {
      console.error('Featured Projects Error:', error);

      res.status(500).json({
        success: false,
        error: 'Failed to fetch featured projects',
      });
    }
  }

  /**
   * GET /api/building/projects/:id
   * Get building project by ID
   */
  static async getProjectById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;

      if (!id) {
        res.status(400).json({
          success: false,
          error: 'Project ID is required',
        });
        return;
      }

      const project = getBuildingProjectById(id);

      if (!project) {
        res.status(404).json({
          success: false,
          error: 'Project not found',
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: project,
      });
    } catch (error) {
      console.error('Get Project Error:', error);

      res.status(500).json({
        success: false,
        error: 'Failed to fetch project',
      });
    }
  }
}
