import express, { Request, Response } from 'express';
import dotenv from 'dotenv';
import { chatRouter } from './routes/chat.routes';
import { githubRouter } from './routes/github.routes';
import { buildingRouter } from './routes/building.routes';
import { contactRouter } from './routes/contact.routes';
import { loadEnvironmentConfig, getSafeEnvironmentConfig } from './config/environment';
import {
  configureHelmet,
  configureCors,
  createRateLimiters,
  requestSizeLimit,
  errorHandler,
  requestIdMiddleware,
} from './middleware/security';

dotenv.config();

// Load and validate environment configuration
const config = loadEnvironmentConfig();

const app = express();

// Security Middleware - Apply in order
// 1. Helmet for HTTP headers security
app.use(configureHelmet());

// 2. CORS with origin whitelist
app.use(configureCors(config.corsOrigin));

// 3. Request ID for tracing
app.use(requestIdMiddleware);

// 4. Request size limits (before body parser)
app.use(requestSizeLimit(config.requestBodySizeLimit));

// 5. Body parser with size limit
app.use(express.json({ limit: config.requestBodySizeLimit }));
app.use(express.urlencoded({ limit: config.requestBodySizeLimit, extended: false }));

// 6. Rate limiters
const { chatLimiter, contactLimiter, apiLimiter } = createRateLimiters(config);

// Health check endpoint - no rate limiting
app.get('/api/health', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Portfolio API is running',
    environment: getSafeEnvironmentConfig(config),
    timestamp: new Date().toISOString(),
  });
});

// Apply rate limiting to API routes
app.use('/api/chat', chatLimiter);
app.use('/api/contact', contactLimiter);
app.use('/api', apiLimiter);

// Routes
app.use('/api', chatRouter);
app.use('/api', githubRouter);
app.use('/api', buildingRouter);
app.use('/api', contactRouter);

// 404 handler
app.use((_req: Request, res: Response) => {
  res.status(404).json({
    success: false,
    error: 'Endpoint not found',
  });
});

// Error handler middleware (must be last)
app.use(errorHandler(config.nodeEnv));

// Start server
const server = app.listen(config.port, () => {
  console.log(`✅ Server is running in ${config.nodeEnv} mode`);
  console.log(`📍 Listening on port ${config.port}`);
  console.log(`🌐 CORS origins: ${config.corsOrigin.join(', ')}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('SIGTERM received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});

process.on('SIGINT', () => {
  console.log('SIGINT received, shutting down gracefully...');
  server.close(() => {
    console.log('Server closed');
    process.exit(0);
  });
});