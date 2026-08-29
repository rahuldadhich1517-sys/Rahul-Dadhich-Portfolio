import { Request, Response } from 'express';
import { aiService } from '../services/ai.service';
import {
  validateChatMessage,
  detectPromptInjection,
  sanitizeString,
} from '../utils/validation';

interface ChatRequest {
  message: string;
}

interface ChatResponse {
  success: boolean;
  reply?: string;
  error?: string;
}

/**
 * Chat Controller - Handles chat endpoints with security
 */
export class ChatController {
  /**
   * POST /api/chat
   * Send a message to the AI assistant
   */
  static async sendMessage(req: Request, res: Response): Promise<void> {
    const requestId = req.id;

    try {
      const { message } = req.body as ChatRequest;

      // Validate input
      const validation = validateChatMessage(message);
      if (!validation.isValid) {
        console.warn(`[${requestId}] Chat validation failed:`, validation.errors);
        res.status(400).json({
          success: false,
          error: validation.errors[0],
        });
        return;
      }

      const sanitizedMessage = validation.sanitized!;

      // Detect prompt injection attempts
      if (detectPromptInjection(sanitizedMessage)) {
        console.warn(`[${requestId}] Potential prompt injection detected`, {
          messageLength: sanitizedMessage.length,
        });
        res.status(400).json({
          success: false,
          error: 'Invalid message format',
        });
        return;
      }

      // Call AI service with sanitized message
      const response = await aiService.chat(sanitizedMessage);

      // Ensure API key is never exposed
      const statusCode = response.success ? 200 : 400;

      res.status(statusCode).json({
        success: response.success,
        reply: response.reply,
        error: response.error,
      } as ChatResponse);
    } catch (error) {
      console.error(`[${requestId}] Chat error:`, error instanceof Error ? error.message : 'Unknown error');

      // Safe error response - no stack traces
      res.status(500).json({
        success: false,
        error: 'Failed to process message',
      });
    }
  }

  /**
   * GET /api/chat/clear
   * Clear conversation history
   */
  static clearHistory(req: Request, res: Response): void {
    const requestId = req.id;

    try {
      aiService.clearHistory();
      res.status(200).json({
        success: true,
        message: 'Conversation history cleared',
      });
    } catch (error) {
      console.error(`[${requestId}] Clear history error:`, error instanceof Error ? error.message : 'Unknown error');

      res.status(500).json({
        success: false,
        error: 'Failed to clear history',
      });
    }
  }

  /**
   * GET /api/chat/health
   * Check if AI service is available
   */
  static async health(req: Request, res: Response): Promise<void> {
    const requestId = req.id;

    try {
      const apiKey = process.env.AI_API_KEY;

      // Never expose API key in any response
      const isConfigured = apiKey && apiKey !== 'placeholder' && apiKey.length > 0;

      res.status(200).json({
        success: true,
        aiServiceReady: isConfigured,
        message: isConfigured ? 'AI service is ready' : 'AI service is not configured',
      });
    } catch (error) {
      console.error(`[${requestId}] Health check error:`, error instanceof Error ? error.message : 'Unknown error');

      res.status(500).json({
        success: false,
        error: 'Health check failed',
      });
    }
  }
}

      res.status(200).json({
        success: true,
        aiServiceReady: isConfigured,
        message: isConfigured ? 'AI service is ready' : 'AI service is not configured',
      });
    } catch (error) {
      console.error('Health Check Error:', error);

      res.status(500).json({
        success: false,
        error: 'Health check failed',
      });
    }
  }
}

/**
 * Sanitize user input to prevent injection attacks
 */
function sanitizeInput(input: string): string {
  return input
    .trim()
    .slice(0, 1000) // Limit length
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .replace(/\n\n+/g, '\n'); // Normalize line breaks
}
