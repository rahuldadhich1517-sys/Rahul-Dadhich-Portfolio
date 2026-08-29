import { Router } from 'express';
import { ContactController } from '../controllers/contact.controller';
import { chatRateLimiter } from '../middleware/rateLimiter';

export const contactRouter = Router();

/**
 * POST /api/contact
 * Submit a contact form
 * Rate limited to 5 requests per minute per IP
 */
contactRouter.post('/contact', chatRateLimiter.middleware(), async (req, res) => {
  await ContactController.submitContact(req, res);
});

/**
 * GET /api/contact/submissions
 * Get all contact submissions (admin only in production)
 */
contactRouter.get('/contact/submissions', async (req, res) => {
  await ContactController.getSubmissions(req, res);
});

/**
 * PATCH /api/contact/:id/status
 * Update contact submission status (admin only in production)
 */
contactRouter.patch('/contact/:id/status', async (req, res) => {
  await ContactController.updateStatus(req, res);
});
