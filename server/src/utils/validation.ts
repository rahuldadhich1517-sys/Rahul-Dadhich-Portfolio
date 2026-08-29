/**
 * Input Validation and Sanitization Framework
 * Comprehensive validation for all user inputs
 */

/**
 * Validation result type
 */
export interface ValidationResult {
  isValid: boolean;
  errors: string[];
  sanitized?: any;
}

/**
 * Email validation - RFC 5322 simplified
 */
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email) && email.length <= 254;
};

/**
 * Sanitize string input - remove control characters and limit length
 */
export const sanitizeString = (input: string, maxLength: number = 1000): string => {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .trim()
    .slice(0, maxLength)
    .replace(/[\x00-\x1F\x7F]/g, '') // Remove control characters
    .replace(/\n\n+/g, '\n'); // Normalize multiple line breaks
};

/**
 * Sanitize HTML input - escape dangerous characters
 */
export const sanitizeHtml = (input: string, maxLength: number = 5000): string => {
  if (typeof input !== 'string') {
    return '';
  }

  return input
    .trim()
    .slice(0, maxLength)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;')
    .replace(/[\x00-\x1F\x7F]/g, ''); // Remove control characters
};

/**
 * Validate chat message input
 */
export const validateChatMessage = (message: any): ValidationResult => {
  const errors: string[] = [];

  if (message === undefined || message === null) {
    errors.push('Message field is required');
    return { isValid: false, errors };
  }

  if (typeof message !== 'string') {
    errors.push('Message must be a string');
    return { isValid: false, errors };
  }

  if (message.trim().length === 0) {
    errors.push('Message cannot be empty');
    return { isValid: false, errors };
  }

  if (message.length > 10000) {
    errors.push('Message cannot exceed 10,000 characters');
    return { isValid: false, errors };
  }

  if (message.length < 1) {
    errors.push('Message must be at least 1 character');
    return { isValid: false, errors };
  }

  const sanitized = sanitizeString(message, 10000);

  return {
    isValid: errors.length === 0,
    errors,
    sanitized,
  };
};

/**
 * Validate contact form input
 */
export const validateContactForm = (data: any): ValidationResult => {
  const errors: string[] = [];

  // Validate name
  if (!data.name) {
    errors.push('Name is required');
  } else if (typeof data.name !== 'string') {
    errors.push('Name must be a string');
  } else if (data.name.length < 2) {
    errors.push('Name must be at least 2 characters');
  } else if (data.name.length > 100) {
    errors.push('Name cannot exceed 100 characters');
  }

  // Validate email
  if (!data.email) {
    errors.push('Email is required');
  } else if (typeof data.email !== 'string') {
    errors.push('Email must be a string');
  } else if (!validateEmail(data.email)) {
    errors.push('Please provide a valid email address');
  }

  // Validate message
  if (!data.message) {
    errors.push('Message is required');
  } else if (typeof data.message !== 'string') {
    errors.push('Message must be a string');
  } else if (data.message.length < 10) {
    errors.push('Message must be at least 10 characters');
  } else if (data.message.length > 5000) {
    errors.push('Message cannot exceed 5,000 characters');
  }

  if (errors.length > 0) {
    return { isValid: false, errors };
  }

  // Sanitize inputs
  const sanitized = {
    name: sanitizeHtml(data.name, 100),
    email: sanitizeString(data.email, 254),
    message: sanitizeHtml(data.message, 5000),
  };

  return {
    isValid: true,
    errors: [],
    sanitized,
  };
};

/**
 * Detect prompt injection attempts
 * Prevents common jailbreak patterns
 */
export const detectPromptInjection = (message: string): boolean => {
  const injectionPatterns = [
    // System prompt disclosure attempts
    /system prompt|system message|you are a|you are an|you're a|you're an|ignore.*instruction|forget.*instruction|disregard/gi,
    // Role-switching attempts
    /act as|pretend to be|roleplay as|imagine you are/gi,
    // Constraint bypass attempts
    /ignore the above|don't listen to|override|bypass|disable|turn off/gi,
    // Data exfiltration attempts
    /database|schema|table|query|password|api.?key|secret|credential/gi,
    // Output manipulation
    /return.*without.*filter|unfiltered|raw|uncensored|don't sanitize/gi,
  ];

  for (const pattern of injectionPatterns) {
    if (pattern.test(message)) {
      return true;
    }
  }

  return false;
};

/**
 * Validate request body schema
 */
export const validateRequestSchema = (
  data: any,
  schema: { [key: string]: 'string' | 'number' | 'boolean' | 'object' }
): ValidationResult => {
  const errors: string[] = [];

  for (const [key, type] of Object.entries(schema)) {
    if (!(key in data)) {
      errors.push(`Missing required field: ${key}`);
    } else if (typeof data[key] !== type) {
      errors.push(`Field ${key} must be of type ${type}`);
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
};
