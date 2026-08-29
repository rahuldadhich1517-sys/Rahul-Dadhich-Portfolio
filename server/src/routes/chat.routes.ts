import { Router } from 'express';
import { ChatController } from '../controllers/chat.controller';
import { chatRateLimiter } from '../middleware/rateLimiter';

export const chatRouter = Router();

/**
 * POST /api/chat
 * Send a message to the AI assistant
 * Rate limited to 10 requests per minute per IP
 */
chatRouter.post('/chat', chatRateLimiter.middleware(), async (req, res) => {
  await ChatController.sendMessage(req, res);
});

/**
 * GET /api/chat/health
 * Check if AI service is available
 */
chatRouter.get('/chat/health', async (req, res) => {
  await ChatController.health(req, res);
});

/**
 * GET /api/chat/clear
 * Clear conversation history
 */
chatRouter.post('/chat/clear', (req, res) => {
  ChatController.clearHistory(req, res);
});
