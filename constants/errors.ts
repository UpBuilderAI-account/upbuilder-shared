// ============================================================================
// ERROR UTILITIES
// Helper functions for error code validation and messages
// ============================================================================

import { ERROR_CODES, type ErrorCode } from '../types/socket-protocol';

/**
 * Error messages for each error code
 */
const ERROR_MESSAGES: Record<ErrorCode, string> = {
  // Authentication errors
  [ERROR_CODES.AUTH_INVALID_CREDENTIALS]: 'Invalid email or password',
  [ERROR_CODES.AUTH_TOKEN_EXPIRED]: 'Your session has expired. Please sign in again',
  [ERROR_CODES.AUTH_UNAUTHORIZED]: 'You are not authorized to perform this action',
  [ERROR_CODES.AUTH_REQUIRED]: 'Authentication is required',

  // Version errors
  [ERROR_CODES.VERSION_OUTDATED]: 'Plugin version is outdated. Please close this Figma tab and open a new one to update.',

  // Project errors
  [ERROR_CODES.PROJECT_NOT_FOUND]: 'Project not found',
  [ERROR_CODES.PROJECT_INVALID_STATUS]: 'Invalid project status',
  [ERROR_CODES.PROJECT_ACCESS_DENIED]: 'You do not have access to this project',

  // Workflow errors
  [ERROR_CODES.WORKFLOW_INVALID_STAGE]: 'Invalid workflow stage',
  [ERROR_CODES.WORKFLOW_INVALID_ACTION]: 'Invalid workflow action',
  [ERROR_CODES.WORKFLOW_ALREADY_STARTED]: 'Workflow has already been started',
  [ERROR_CODES.WORKFLOW_NOT_STARTED]: 'Workflow has not been started',

  // Plugin errors
  [ERROR_CODES.PLUGIN_INVALID_NODES]: 'Invalid node data from plugin',
  [ERROR_CODES.PLUGIN_PROCESSING_FAILED]: 'Plugin processing failed',

  // Export errors
  [ERROR_CODES.EXPORT_FAILED]: 'Export failed',
  [ERROR_CODES.EXPORT_NOT_READY]: 'Export is not ready yet',

  // General errors
  [ERROR_CODES.INTERNAL_ERROR]: 'An internal error occurred',
  [ERROR_CODES.VALIDATION_ERROR]: 'Validation error',
  [ERROR_CODES.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded. Please try again later',
  [ERROR_CODES.NETWORK_ERROR]: 'Network error. Please check your connection',
};

/**
 * Check if a string is a valid error code
 */
export function isValidErrorCode(code: string): code is ErrorCode {
  return Object.values(ERROR_CODES).includes(code as ErrorCode);
}

/**
 * Get a user-friendly error message for an error code
 */
export function getErrorMessage(code: ErrorCode | string): string {
  if (isValidErrorCode(code)) {
    return ERROR_MESSAGES[code];
  }
  return 'An unexpected error occurred';
}
