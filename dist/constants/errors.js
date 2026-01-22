"use strict";
// ============================================================================
// ERROR UTILITIES
// Helper functions for error code validation and messages
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidErrorCode = isValidErrorCode;
exports.getErrorMessage = getErrorMessage;
const socket_protocol_1 = require("../types/socket-protocol");
/**
 * Error messages for each error code
 */
const ERROR_MESSAGES = {
    // Authentication errors
    [socket_protocol_1.ERROR_CODES.AUTH_INVALID_CREDENTIALS]: 'Invalid email or password',
    [socket_protocol_1.ERROR_CODES.AUTH_TOKEN_EXPIRED]: 'Your session has expired. Please sign in again',
    [socket_protocol_1.ERROR_CODES.AUTH_UNAUTHORIZED]: 'You are not authorized to perform this action',
    [socket_protocol_1.ERROR_CODES.AUTH_REQUIRED]: 'Authentication is required',
    // Version errors
    [socket_protocol_1.ERROR_CODES.VERSION_OUTDATED]: 'Plugin version is outdated. Please close this Figma tab and open a new one to update.',
    // Project errors
    [socket_protocol_1.ERROR_CODES.PROJECT_NOT_FOUND]: 'Project not found',
    [socket_protocol_1.ERROR_CODES.PROJECT_INVALID_STATUS]: 'Invalid project status',
    [socket_protocol_1.ERROR_CODES.PROJECT_ACCESS_DENIED]: 'You do not have access to this project',
    // Workflow errors
    [socket_protocol_1.ERROR_CODES.WORKFLOW_INVALID_STAGE]: 'Invalid workflow stage',
    [socket_protocol_1.ERROR_CODES.WORKFLOW_INVALID_ACTION]: 'Invalid workflow action',
    [socket_protocol_1.ERROR_CODES.WORKFLOW_ALREADY_STARTED]: 'Workflow has already been started',
    [socket_protocol_1.ERROR_CODES.WORKFLOW_NOT_STARTED]: 'Workflow has not been started',
    // Plugin errors
    [socket_protocol_1.ERROR_CODES.PLUGIN_INVALID_NODES]: 'Invalid node data from plugin',
    [socket_protocol_1.ERROR_CODES.PLUGIN_PROCESSING_FAILED]: 'Plugin processing failed',
    // Export errors
    [socket_protocol_1.ERROR_CODES.EXPORT_FAILED]: 'Export failed',
    [socket_protocol_1.ERROR_CODES.EXPORT_NOT_READY]: 'Export is not ready yet',
    // General errors
    [socket_protocol_1.ERROR_CODES.INTERNAL_ERROR]: 'An internal error occurred',
    [socket_protocol_1.ERROR_CODES.VALIDATION_ERROR]: 'Validation error',
    [socket_protocol_1.ERROR_CODES.RATE_LIMIT_EXCEEDED]: 'Rate limit exceeded. Please try again later',
    [socket_protocol_1.ERROR_CODES.NETWORK_ERROR]: 'Network error. Please check your connection',
};
/**
 * Check if a string is a valid error code
 */
function isValidErrorCode(code) {
    return Object.values(socket_protocol_1.ERROR_CODES).includes(code);
}
/**
 * Get a user-friendly error message for an error code
 */
function getErrorMessage(code) {
    if (isValidErrorCode(code)) {
        return ERROR_MESSAGES[code];
    }
    return 'An unexpected error occurred';
}
