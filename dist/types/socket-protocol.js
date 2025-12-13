"use strict";
// ============================================================================
// SOCKET PROTOCOL TYPES
// Consolidated WebSocket communication types for type-safe Socket.IO
// ============================================================================
// This file consolidates:
// - error.ts: Error codes and error types
// - callback.ts: Callback response patterns
// - responses.ts: Specific response types
// - payloads.ts: Client→Server event payloads
// - events.ts: Server→Client event payloads
// - socket.ts: Full Socket.IO type definitions
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ERROR_CODES = void 0;
exports.createSuccessCallback = createSuccessCallback;
exports.createErrorCallback = createErrorCallback;
// ============================================================================
// ERROR TYPES
// Centralized error codes and error handling types
// ============================================================================
exports.ERROR_CODES = {
    // Authentication errors
    AUTH_INVALID_CREDENTIALS: 'AUTH_INVALID_CREDENTIALS',
    AUTH_TOKEN_EXPIRED: 'AUTH_TOKEN_EXPIRED',
    AUTH_UNAUTHORIZED: 'AUTH_UNAUTHORIZED',
    AUTH_REQUIRED: 'AUTH_REQUIRED',
    // Project errors
    PROJECT_NOT_FOUND: 'PROJECT_NOT_FOUND',
    PROJECT_INVALID_STATUS: 'PROJECT_INVALID_STATUS',
    PROJECT_ACCESS_DENIED: 'PROJECT_ACCESS_DENIED',
    // Workflow errors
    WORKFLOW_INVALID_STAGE: 'WORKFLOW_INVALID_STAGE',
    WORKFLOW_INVALID_ACTION: 'WORKFLOW_INVALID_ACTION',
    WORKFLOW_ALREADY_STARTED: 'WORKFLOW_ALREADY_STARTED',
    WORKFLOW_NOT_STARTED: 'WORKFLOW_NOT_STARTED',
    // Plugin errors
    PLUGIN_INVALID_NODES: 'PLUGIN_INVALID_NODES',
    PLUGIN_PROCESSING_FAILED: 'PLUGIN_PROCESSING_FAILED',
    // Export errors
    EXPORT_FAILED: 'EXPORT_FAILED',
    EXPORT_NOT_READY: 'EXPORT_NOT_READY',
    // General errors
    INTERNAL_ERROR: 'INTERNAL_ERROR',
    VALIDATION_ERROR: 'VALIDATION_ERROR',
    RATE_LIMIT_EXCEEDED: 'RATE_LIMIT_EXCEEDED',
    NETWORK_ERROR: 'NETWORK_ERROR'
};
/**
 * Helper to create success response
 */
function createSuccessCallback(data) {
    return { success: true, data };
}
/**
 * Helper to create error response
 */
function createErrorCallback(error, code, details) {
    return { success: false, error, code, details };
}
// ============================================================================
// TYPED SOCKET USAGE
// ============================================================================
//
// Frontend (socket.io-client):
//   import { Socket } from 'socket.io-client';
//   import type { ServerToClientEvents, ClientToServerEvents } from '@upbuilder/shared';
//   type TypedSocket = Socket<ServerToClientEvents, ClientToServerEvents>;
//
// Backend (socket.io):
//   import { Server, Socket } from 'socket.io';
//   import type { ClientToServerEvents, ServerToClientEvents, SocketData } from '@upbuilder/shared';
//   type TypedSocketIO = Server<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;
//   type TypedSocket = Socket<ClientToServerEvents, ServerToClientEvents, Record<string, never>, SocketData>;
//
// Note: socket.io-client Socket has 2 type params, socket.io Socket has 4.
// Both use the same event interfaces from this file.
// ============================================================================
