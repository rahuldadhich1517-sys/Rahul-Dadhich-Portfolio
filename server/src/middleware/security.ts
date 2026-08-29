/**
 * Security Middleware Configuration
 * Implements Helmet, CORS, rate limiting, and request validation
 */

import helmet from 'helmet';
import cors from 'cors';
import rateLimit from 'express-rate-limit';
import { Express, Request, Response, NextFunction } from 'express';
import { EnvironmentConfig } from '../config/environment';

/**
 * Configure Helmet for secure HTTP headers
 */
export const configureHelmet = () => {
  return helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        scriptSrc: ["'self'"],
        imgSrc: ["'self'", 'data:', 'https:'],
        connectSrc: ["'self'"],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 year
      includeSubDomains: true,
      preload: true,
    },
    noSniff: true,
    xssFilter: true,
    referrerPolicy: { policy: 'strict-origin-when-cross-origin' },
  });
};

/**
 * Configure CORS with origin whitelist
 */
export const configureCors = (origins: string[]) => {
  return cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (like mobile apps, curl requests, etc.)
      if (!origin) {
        return callback(null, true);
      }

      if (origins.includes(origin) || origins.includes('*')) {
        callback(null, true);
      } else {
        callback(new Error(`CORS policy: origin ${origin} is not allowed`));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    maxAge: 86400, // 24 hours
  });
};

/**
 * Configure rate limiters for different endpoints
 */
export const createRateLimiters = (config: EnvironmentConfig) => {
  // Chat endpoint: 10 requests per minute per IP
  const chatLimiter = rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: config.rateLimitMaxRequests,
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true, // Return rate limit info in `RateLimit-*` headers
    legacyHeaders: false, // Disable `X-RateLimit-*` headers
    skip: (req: Request) => {
      // Skip rate limiting for health checks
      return req.path === '/api/chat/health';
    },
  });

  // Contact endpoint: 5 requests per minute per IP
  const contactLimiter = rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: Math.floor(config.rateLimitMaxRequests / 2), // 5 req/min
    message: 'Too many contact submissions from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
  });

  // General API limiter: 30 requests per minute
  const apiLimiter = rateLimit({
    windowMs: config.rateLimitWindowMs,
    max: 30,
    message: 'Too many requests from this IP, please try again later',
    standardHeaders: true,
    legacyHeaders: false,
  });

  return { chatLimiter, contactLimiter, apiLimiter };
};

/**
 * Request body size limit middleware
 */
export const requestSizeLimit = (limit: string) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // Manually parse with size limit
    const parsedLimit = parseSize(limit);
    if (req.headers['content-length']) {
      const contentLength = parseInt(req.headers['content-length'], 10);
      if (contentLength > parsedLimit) {
        return res.status(413).json({
          success: false,
          error: `Request body too large. Maximum size is ${limit}`,
        });
      }
    }
    next();
  };
};

/**
 * Parse size string to bytes (e.g., '10kb' -> 10240)
 */
function parseSize(size: string): number {
  const units: { [key: string]: number } = {
    b: 1,
    kb: 1024,
    mb: 1024 * 1024,
    gb: 1024 * 1024 * 1024,
  };

  const match = size.toLowerCase().match(/^(\d+)(b|kb|mb|gb)$/);
  if (!match) return 10 * 1024; // Default 10KB

  const [, value, unit] = match;
  return parseInt(value, 10) * (units[unit] || 1);
}

/**
 * Safe error handler - no stack traces in production
 */
export const errorHandler = (nodeEnv: string) => {
  return (err: any, req: Request, res: Response, next: NextFunction) => {
    const isProduction = nodeEnv === 'production';

    console.error('Error:', err);

    // Don't leak error details in production
    const statusCode = err.statusCode || 500;
    const response: any = {
      success: false,
      error: isProduction ? 'Internal server error' : err.message,
    };

    // Only include stack trace in development
    if (!isProduction && err.stack) {
      response.stack = err.stack;
    }

    res.status(statusCode).json(response);
  };
};

/**
 * Request ID middleware for tracing
 */
export const requestIdMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const requestId = req.headers['x-request-id'] || generateRequestId();
  req.id = requestId as string;
  res.setHeader('X-Request-ID', requestId);
  next();
};

/**
 * Generate unique request ID
 */
function generateRequestId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

declare global {
  namespace Express {
    interface Request {
      id?: string;
    }
  }
}
