import { Request, Response, NextFunction } from 'express';

interface RateLimitStore {
  [key: string]: {
    count: number;
    resetTime: number;
  };
}

/**
 * Simple in-memory rate limiter
 * In production, use Redis or a library like express-rate-limit
 */
export class RateLimiter {
  private store: RateLimitStore = {};
  private windowMs: number; // Time window in milliseconds
  private maxRequests: number; // Max requests per window
  private cleanupInterval: ReturnType<typeof setInterval> | null;

  constructor(windowMs: number = 60000, maxRequests: number = 10) {
    this.windowMs = windowMs;
    this.maxRequests = maxRequests;

    // Cleanup expired entries every 5 minutes
    this.cleanupInterval = setInterval(() => {
      this.cleanup();
    }, 5 * 60 * 1000);
  }

  /**
   * Middleware to limit requests
   */
  middleware() {
    return (req: Request, res: Response, next: NextFunction) => {
      const clientIp = this.getClientIp(req);
      const now = Date.now();

      if (!this.store[clientIp]) {
        this.store[clientIp] = {
          count: 0,
          resetTime: now + this.windowMs,
        };
      }

      const clientData = this.store[clientIp];

      // Reset if window has passed
      if (now > clientData.resetTime) {
        clientData.count = 0;
        clientData.resetTime = now + this.windowMs;
      }

      // Check if limit exceeded
      if (clientData.count >= this.maxRequests) {
        const retryAfter = Math.ceil((clientData.resetTime - now) / 1000);
        return res.status(429).json({
          success: false,
          error: 'Too many requests. Please try again later.',
          retryAfter,
        });
      }

      // Increment count
      clientData.count++;

      // Add rate limit headers
      res.setHeader('X-RateLimit-Limit', this.maxRequests);
      res.setHeader('X-RateLimit-Remaining', this.maxRequests - clientData.count);
      res.setHeader('X-RateLimit-Reset', new Date(clientData.resetTime).toISOString());

      next();
    };
  }

  /**
   * Get client IP from request
   */
  private getClientIp(req: Request): string {
    const forwarded = req.headers['x-forwarded-for'];
    if (typeof forwarded === 'string') {
      return forwarded.split(',')[0].trim();
    }
    return req.socket.remoteAddress || 'unknown';
  }

  /**
   * Cleanup expired entries
   */
  private cleanup(): void {
    const now = Date.now();
    for (const ip in this.store) {
      if (now > this.store[ip].resetTime + this.windowMs) {
        delete this.store[ip];
      }
    }
  }

  /**
   * Destroy the rate limiter
   */
  destroy(): void {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }
}

// Export default rate limiter (10 requests per minute per IP)
export const chatRateLimiter = new RateLimiter(60 * 1000, 10);
