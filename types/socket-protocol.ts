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

import type { ImagePair, PreviewData, FramePreview } from './plugin';
import type { Element } from './element';
import type {
  WorkflowStage,
  WorkflowStages,
  WorkflowStream,
  WorkflowError,
  WorkflowEditor,
  WorkflowCommand,
  WorkflowExportComplete,
  CodeSaveRequest,
  CodeSaveResult,
  RenameRequest,
  RenameResult,
  RenameTargetType,
  StylesheetSaveRequest,
  StylesheetResetRequest,
  StylesheetCleanRequest,
  StylesheetSaveResult,
  StylesheetCleanResult,
} from './workflow';
import type { Breakpoints, Platform, StyleFramework, Project, ExportOptions, ExportPayload, SectionStageStatus } from './core-domain';
import type { GitHubSyncProgress, GitHubSyncResult, GitHubSyncStartPayload } from './github-sync';

// Re-export export types for use in socket events
export type { ExportOptions, ExportPayload };

// ============================================================================
// ERROR TYPES
// Centralized error codes and error handling types
// ============================================================================

export const ERROR_CODES = {
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
} as const;

export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];

// ============================================================================
// CALLBACK TYPES
// Type-safe callback response patterns for WebSocket acknowledgments
// ============================================================================

/**
 * Callback function type for WebSocket event handlers
 * Generic T represents the success data type
 */
export type CallbackResponse<T = void> = (response: CallbackResult<T>) => void;

/**
 * Union type representing either success or error result
 */
export type CallbackResult<T = void> = CallbackSuccess<T> | CallbackError;

/**
 * Success response with optional data
 */
export interface CallbackSuccess<T = void> {
  success: true;
  data?: T;
}

/**
 * Error response with message and optional error code
 */
export interface CallbackError {
  success: false;
  error: string;
  code?: ErrorCode;
  details?: any;
}

/**
 * Helper to create success response
 */
export function createSuccessCallback<T>(data?: T): CallbackSuccess<T> {
  return { success: true, data };
}

/**
 * Helper to create error response
 */
export function createErrorCallback(
  error: string,
  code?: ErrorCode,
  details?: any
): CallbackError {
  return { success: false, error, code, details };
}

// ============================================================================
// RESPONSE TYPES
// Specific response types for socket events
// ============================================================================

/**
 * Response from process_all_images event
 */
export interface ProcessAllImagesResponse {
  totalImages: number;
  designs: DesignImagesSummary[];
}

/**
 * Summary of images processed for a single design
 */
export interface DesignImagesSummary {
  designId: string;
  designName: string;
  imageCount: number;
  labelRange: string; // e.g., "1-10", "11-25"
}

// ============================================================================
// PAYLOAD TYPES
// WebSocket event payload definitions (client → server)
// ============================================================================

/**
 * Authentication payload
 */
export interface AuthPayload {
  action: 'login' | 'logout' | 'register' | 'authenticate' | 'guest';
  data: {
    email?: string;
    password?: string;
    token?: string;
  };
}

/**
 * Plugin event payloads (in execution order)
 */
export interface PluginPayloads {
  /**
   * 1. Send nodes from Figma plugin
   */
  send_nodes: {
    nodes: Element[];
    n_images: number;
    project_name: string;
    design_name: string; // Frame/design name (separate from project name)
    platform: Platform;
    styleFramework: StyleFramework;
    breakpoints: Breakpoints;
    colors?: string[];
    gradients?: any[];
    preview?: PreviewData; // Small preview for UI
    framePreview?: FramePreview; // Bigger preview (720px JPG) for featured image
    selectedProjectData?: {
      type: 'existing';
      project: {
        id: string;
        name?: string;
        user_id?: string;
      };
      designName?: string;
    };
  };

  /**
   * 2. Send design images (stores without processing)
   */
  send_design_images: {
    project_id: string;
    design_id: string;
    images: ImagePair[];
  };

  /**
   * 3. Process all stored images together with global labels
   */
  process_all_images: {
    project_id: string;
    design_ids: string[]; // Ordered array (selection order)
  };
}


/**
 * GitHub integration payloads
 */
export interface GitHubPayloads {
  /**
   * Get user's repositories
   */
  get_repos: {
    accessToken: string;
    page?: number;
  };

  /**
   * Push project code to GitHub repository
   */
  push_code: {
    accessToken: string;
    projectId: string;
    repository: string; // Format: "owner/repo"
    branch: string;
    message: string;
  };
}

/**
 * GitHub repository info returned from API
 */
export interface GitHubRepository {
  id: number;
  name: string;
  full_name: string;
  default_branch: string;
  private: boolean;
}

/**
 * GitHub push result
 */
export interface GitHubPushResult {
  url: string;
  sha: string;
  repository?: string; // Full name: owner/repo
}

// ============================================================================
// EVENT TYPES
// WebSocket event definitions (server → client)
// ============================================================================

/**
 * Project update event (Standard)
 */
export interface ProjectUpdate {
  project: Project;
}

/**
 * Plugin-related events
 */
export interface PluginEvents {
  /**
   * General message from plugin processing
   */
  message: {
    message: string;
    data?: any;
    isError?: boolean;
  };

  /**
   * Nodes processed successfully
   */
  nodes_processed: {
    projectId: string;
    designId: string;
  };

  /**
   * Images processed successfully
   */
  images_processed: {
    projectId: string;
    designIds: string[]; // All designs processed together
    totalImages: number;
    designs: DesignImagesSummary[];
  };

}

/**
 * Error event payload
 */
export interface ErrorPayload {
  code: ErrorCode;
  message: string;
  details?: any;
}


// ============================================================================
// SOCKET EVENT TYPES
// Type-safe WebSocket event definitions for Socket.IO
// ============================================================================

/**
 * Events sent from client to server
 */
export interface ClientToServerEvents {
  // Authentication
  authenticate: (
    data: { token?: string; guest?: boolean },
    callback: CallbackResponse<{ userId: string; isGuest: boolean }>
  ) => void;

  // Plugin events (in execution order)
  send_nodes: (
    data: PluginPayloads['send_nodes'],
    callback: CallbackResponse<{ project_id: string; design_id: string }>
  ) => void;

  // NEW: Store design images without processing
  send_design_images: (
    data: PluginPayloads['send_design_images'],
    callback: CallbackResponse<{ imageCount: number }>
  ) => void;

  // NEW: Process all stored images together
  process_all_images: (
    data: PluginPayloads['process_all_images'],
    callback: CallbackResponse<ProcessAllImagesResponse>
  ) => void;

  // Plugin room management
  join_plugin_room: (data: { projectId: string }, callback?: CallbackResponse) => void;
  leave_plugin_room: (data: { projectId: string }, callback?: CallbackResponse) => void;

  // Project list request
  request_project_list: (data: void, callback?: CallbackResponse) => void;

  // Single project request
  request_project: (data: { projectId: string }, callback?: CallbackResponse) => void;

  // Leave project room (cleanup when navigating away)
  leave_project: (data: { projectId: string }, callback?: (res: { success: boolean }) => void) => void;

  // Workflow command (replaces workflow_start, workflow_next, workflow_customize)
  'workflow:command': (
    data: WorkflowCommand,
    callback: (ok: boolean) => void
  ) => void;

  // Workflow save code (save edited code from customizer)
  'workflow:save_code': (
    data: CodeSaveRequest,
    callback: (result: CodeSaveResult) => void
  ) => void;

  // Workflow rename (rename design/section/globalSection)
  'workflow:rename': (
    data: RenameRequest,
    callback: (result: RenameResult) => void
  ) => void;

  // Workflow stylesheet review (save/reset/clean)
  'workflow:save_stylesheet': (
    data: StylesheetSaveRequest,
    callback: (result: StylesheetSaveResult) => void
  ) => void;

  'workflow:reset_stylesheet': (
    data: StylesheetResetRequest,
    callback: (result: StylesheetSaveResult) => void
  ) => void;

  'workflow:clean_stylesheet': (
    data: StylesheetCleanRequest,
    callback: (result: StylesheetCleanResult) => void
  ) => void;

  // Ownership transfer
  transfer_project_ownership: (
    data: { projectId: string },
    callback: CallbackResponse
  ) => void;

  // Project deletion
  delete_project: (
    data: { projectId: string },
    callback: CallbackResponse
  ) => void;

  // GitHub integration
  github_get_repos: (
    data: GitHubPayloads['get_repos'],
    callback: CallbackResponse<GitHubRepository[]>
  ) => void;

  github_push_code: (
    data: GitHubPayloads['push_code'],
    callback: CallbackResponse<GitHubPushResult>
  ) => void;

  // GitHub sync (pull from repository)
  github_sync_start: (
    data: GitHubSyncStartPayload,
    callback: CallbackResponse<void>
  ) => void;

  // Check subscription status
  'user:check_subscription': (
    data: void,
    callback: CallbackResponse<{
      tier: 'basic' | 'pro' | 'max';
      isTrialing?: boolean;
      trialEnd?: number | null;
      currentPeriodEnd?: number;
    }>
  ) => void;
}

/**
 * Events sent from server to client
 */
export interface ServerToClientEvents {
  // Project updates
  'project:state': (data: ProjectUpdate) => void;

  // Granular section updates (NEW - Relational Migration)
  // Supports both legacy status and new per-stage stageStatus
  'section:update': (data: {
    projectId: string;
    designId: string;
    sectionId: string;
    updates: Partial<{
      status: string;
      stageStatus: Partial<SectionStageStatus>;
      html: string;
      css: string;
      js: string;
    }>;
  }) => void;

  // Project list
  receive_project_list: (data: { projects: Project[]; timestamp: string }) => void;

  // Plugin events
  'plugin:message': (data: PluginEvents['message']) => void;
  'plugin:nodes_processed': (data: PluginEvents['nodes_processed']) => void;
  'plugin:images_processed': (data: PluginEvents['images_processed']) => void;

  // Error events
  error: (data: ErrorPayload) => void;

  // Workflow events (7 events total)
  'workflow:stage': (data: WorkflowStage) => void;
  'workflow:stages': (data: WorkflowStages) => void;
  'workflow:stream': (data: WorkflowStream) => void;
  'workflow:error': (data: WorkflowError) => void;
  'workflow:editor': (data: WorkflowEditor) => void;
  'workflow:export_complete': (data: WorkflowExportComplete) => void;
  'workflow:renamed': (data: { type: RenameTargetType; id: string; name: string }) => void;

  // Ownership transfer events
  project_ownership_transferred: (data: {
    projectId: string;
    projectName?: string;
  }) => void;

  // Project deletion events
  project_deleted: (data: {
    projectId: string;
    projectName?: string;
  }) => void;

  // User subscription updates
  'user:subscription_updated': (data: {
    tier: 'basic' | 'pro' | 'max';
    isTrialing?: boolean;
    trialEnd?: number | null;
    currentPeriodEnd?: number;
  }) => void;

  // GitHub sync events
  github_sync_progress: (data: GitHubSyncProgress) => void;
  github_sync_complete: (data: GitHubSyncResult) => void;

  // System events (maintenance mode)
  'system:maintenance': (data: { enabled: boolean; message: string; estimatedEndTime?: string }) => void;
  'system:maintenance_end': (data: Record<string, never>) => void;
}

/**
 * Socket data attached to each connection
 */
export interface SocketData {
  userId?: string;
  sessionId?: string;
  isAuthenticated?: boolean;
  isGuest?: boolean;
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
