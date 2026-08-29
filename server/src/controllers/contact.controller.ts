import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface ContactRequest {
  name: string;
  email: string;
  message: string;
}

/**
 * Validate email format
 */
function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Sanitize input to prevent injection attacks
 */
function sanitizeInput(input: string): string {
  return input
    .trim()
    .slice(0, 5000) // Limit length
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

/**
 * Contact Controller - Handles contact form submissions
 */
export class ContactController {
  /**
   * POST /api/contact
   * Create a new contact submission
   */
  static async submitContact(req: Request, res: Response): Promise<void> {
    try {
      const { name, email, message } = req.body as ContactRequest;

      // Validation
      if (!name || !email || !message) {
        res.status(400).json({
          success: false,
          error: 'Name, email, and message are required',
        });
        return;
      }

      // Validate name
      if (name.length < 2 || name.length > 100) {
        res.status(400).json({
          success: false,
          error: 'Name must be between 2 and 100 characters',
        });
        return;
      }

      // Validate email
      if (!isValidEmail(email)) {
        res.status(400).json({
          success: false,
          error: 'Please provide a valid email address',
        });
        return;
      }

      // Validate message
      if (message.length < 10 || message.length > 5000) {
        res.status(400).json({
          success: false,
          error: 'Message must be between 10 and 5000 characters',
        });
        return;
      }

      // Sanitize inputs
      const sanitizedName = sanitizeInput(name);
      const sanitizedEmail = sanitizeInput(email);
      const sanitizedMessage = sanitizeInput(message);

      // Create contact submission in database
      const contact = await prisma.contact.create({
        data: {
          name: sanitizedName,
          email: sanitizedEmail,
          message: sanitizedMessage,
          status: 'NEW',
        },
      });

      // TODO: Send email notification to portfolio owner
      // TODO: Send confirmation email to user

      res.status(201).json({
        success: true,
        message: 'Message transmitted successfully.',
        data: {
          id: contact.id,
        },
      });
    } catch (error) {
      console.error('Contact Submission Error:', error);

      // Don't expose technical errors to user
      res.status(500).json({
        success: false,
        error: 'Unable to send message. Please try again.',
      });
    }
  }

  /**
   * GET /api/contact/submissions
   * Get all contact submissions (admin only - should be protected)
   */
  static async getSubmissions(req: Request, res: Response): Promise<void> {
    try {
      const contacts = await prisma.contact.findMany({
        orderBy: {
          createdAt: 'desc',
        },
      });

      res.status(200).json({
        success: true,
        data: contacts,
      });
    } catch (error) {
      console.error('Get Submissions Error:', error);

      res.status(500).json({
        success: false,
        error: 'Failed to fetch submissions',
      });
    }
  }

  /**
   * PATCH /api/contact/:id/status
   * Update contact submission status (admin only)
   */
  static async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const { status } = req.body;

      if (!id) {
        res.status(400).json({
          success: false,
          error: 'Contact ID is required',
        });
        return;
      }

      if (!['NEW', 'READ', 'REPLIED'].includes(status)) {
        res.status(400).json({
          success: false,
          error: 'Invalid status',
        });
        return;
      }

      const contact = await prisma.contact.update({
        where: { id },
        data: { status },
      });

      res.status(200).json({
        success: true,
        data: contact,
      });
    } catch (error) {
      console.error('Update Status Error:', error);

      res.status(500).json({
        success: false,
        error: 'Failed to update status',
      });
    }
  }
}
