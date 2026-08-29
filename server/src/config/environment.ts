/**
 * Environment Configuration with Validation
 * Ensures all required environment variables are present and valid
 */

export interface EnvironmentConfig {
  nodeEnv: 'development' | 'production' | 'test';
  port: number;
  databaseUrl: string;
  aiApiKey: string;
  corsOrigin: string[];
  rateLimitWindowMs: number;
  rateLimitMaxRequests: number;
  requestBodySizeLimit: string;
}

/**
 * Validate and load environment configuration
 */
export const loadEnvironmentConfig = (): EnvironmentConfig => {
  const nodeEnv = (process.env.NODE_ENV || 'development') as 'development' | 'production' | 'test';
  const port = parseInt(process.env.PORT || '3000', 10);
  const databaseUrl = process.env.DATABASE_URL;
  const aiApiKey = process.env.AI_API_KEY;
  const corsOriginRaw = process.env.CORS_ORIGIN || 'http://localhost:5173';
  const rateLimitWindowMs = parseInt(process.env.RATE_LIMIT_WINDOW_MS || '60000', 10);
  const rateLimitMaxRequests = parseInt(process.env.RATE_LIMIT_MAX_REQUESTS || '10', 10);
  const requestBodySizeLimit = process.env.REQUEST_BODY_SIZE_LIMIT || '10kb';

  // Validate required environment variables
  const errors: string[] = [];

  if (!databaseUrl) {
    errors.push('DATABASE_URL environment variable is not set');
  }

  if (!aiApiKey || aiApiKey === 'placeholder') {
    if (nodeEnv === 'production') {
      errors.push('AI_API_KEY environment variable is not set (required in production)');
    } else {
      console.warn('AI_API_KEY not configured - AI features will be disabled');
    }
  }

  if (isNaN(port) || port < 1 || port > 65535) {
    errors.push(`Invalid PORT: ${port}. Must be between 1 and 65535`);
  }

  if (nodeEnv === 'production' && !process.env.DATABASE_URL) {
    errors.push('DATABASE_URL is required in production');
  }

  if (errors.length > 0) {
    console.error('Environment Configuration Errors:');
    errors.forEach((error) => console.error(`  - ${error}`));
    if (nodeEnv === 'production') {
      process.exit(1);
    }
  }

  // Parse CORS origins
  const corsOrigin = corsOriginRaw
    .split(',')
    .map((origin) => origin.trim())
    .filter((origin) => origin.length > 0);

  return {
    nodeEnv,
    port,
    databaseUrl: databaseUrl || '',
    aiApiKey: aiApiKey || '',
    corsOrigin,
    rateLimitWindowMs,
    rateLimitMaxRequests,
    requestBodySizeLimit,
  };
};

/**
 * Get safe environment config (no sensitive values)
 */
export const getSafeEnvironmentConfig = (config: EnvironmentConfig) => {
  return {
    nodeEnv: config.nodeEnv,
    port: config.port,
    corsOrigin: config.corsOrigin,
    requestBodySizeLimit: config.requestBodySizeLimit,
  };
};
