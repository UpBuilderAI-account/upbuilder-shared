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

import type { ImagePair, PreviewData, SmallPreview, BigPreview, FramePreview } from './plugin';
import type { Element } from './element';
import type {
  WorkflowStage,
  WorkflowStages,
  WorkflowError,
  WorkflowEditor,
  WorkflowCommand,
  WorkflowExportComplete,
  WorkflowBackgroundProgress,
  CodeSaveRequest,
  CodeSaveResult,
  RenameRequest,
  RenameResult,
  RenameTargetType,
} from './workflow';
import type { Breakpoints, Platform, StyleFramework, Project, ExportOptions, ExportPayload, SectionStageStatus, SubscriptionTier } from './core-domain';
import type { ExportConfig } from './workflow';
import type {
  RequestTreePayload,
  TreeDataResponse,
} from './editable-tree';
import type {
  ApplyEditsRequest,
  ApplyEditsResponse,
  RequestExportRequest,
  RequestExportResponse,
  RequestPreviewPayload,
  RequestPreviewResponse,
  UploadImageRequest,
  UploadImageResponse,
} from './edit-operations';

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
    smallPreview?: SmallPreview; // 720px JPG for featured image/thumbnails (S3)
    bigPreview?: BigPreview; // 8K max JPG for AI analysis (Google AI Files)
    /** @deprecated Use smallPreview instead */
    framePreview?: FramePreview;
    exportConfig?: ExportConfig; // Full export config from plugin (skips export_config stage)
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
    data: { token?: string; guest?: boolean; pluginToken?: string },
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

  // Process pending designs after upgrade to Pro
  'workflow:process_pending': (
    data: { projectId: string },
    callback: (result: { success: boolean; error?: string; designCount?: number }) => void
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


  // Check subscription status
  'user:check_subscription': (
    data: void,
    callback: CallbackResponse<{
      tier: SubscriptionTier;
      isTrialing?: boolean;
      trialEnd?: number | null;
      currentPeriodEnd?: number;
    }>
  ) => void;

  // Customizer events
  'customizer:request_tree': (
    data: RequestTreePayload,
    callback: (response: TreeDataResponse) => void
  ) => void;

  'customizer:apply_edits': (
    data: ApplyEditsRequest,
    callback: (response: ApplyEditsResponse) => void
  ) => void;

  'customizer:request_export': (
    data: RequestExportRequest,
    callback: (response: RequestExportResponse) => void
  ) => void;

  'customizer:request_preview': (
    data: RequestPreviewPayload,
    callback: (response: RequestPreviewResponse) => void
  ) => void;

  'customizer:upload_image': (
    data: UploadImageRequest,
    callback: (response: UploadImageResponse) => void
  ) => void;

  'customizer:asset_upload_status': (
    data: { projectId: string },
    callback: (response: { complete: boolean; uploaded: number; total: number; failed: number }) => void
  ) => void;

  // Webflow integration events
  'webflow:get_auth_url': (
    data: Record<string, never>,
    callback: (response: { success: boolean; data?: { authUrl: string }; error?: string }) => void
  ) => void;

  'webflow:auth_status': (
    data: Record<string, never>,
    callback: (response: {
      success: boolean;
      data?: { connected: boolean; webflowEmail?: string; scopes?: string[]; connectedAt?: string };
      error?: string;
    }) => void
  ) => void;

  'webflow:disconnect': (
    data: Record<string, never>,
    callback: (response: { success: boolean; error?: string }) => void
  ) => void;

  'webflow:get_sites': (
    data: Record<string, never>,
    callback: (response: {
      success: boolean;
      data?: { sites: Array<{ id: string; displayName: string; shortName: string; previewUrl?: string }> };
      error?: string;
    }) => void
  ) => void;

  'webflow:connect_site': (
    data: { projectId: string; siteId: string; siteName: string; siteShortName?: string; sitePreviewUrl?: string },
    callback: (response: { success: boolean; error?: string }) => void
  ) => void;

  'webflow:connection_status': (
    data: { projectId: string },
    callback: (response: {
      success: boolean;
      data?: {
        connected: boolean;
        siteId?: string;
        siteName?: string;
        siteShortName?: string;
        sitePreviewUrl?: string;
        syncState?: Record<string, unknown>;
      };
      error?: string;
    }) => void
  ) => void;

  'webflow:disconnect_site': (
    data: { projectId: string },
    callback: (response: { success: boolean; error?: string }) => void
  ) => void;

  'webflow:sync_assets': (
    data: { projectId: string; designId?: string },
    callback: (response: { success: boolean; data?: { total: number }; error?: string }) => void
  ) => void;

  'webflow:push_design': (
    data: { projectId: string; designId: string },
    callback: (response: {
      success: boolean;
      data?: { xscpData: unknown; assetMap: Record<string, string>; siteId: string; siteName: string };
      error?: string;
    }) => void
  ) => void;

  // Plan stage events (Workflow V2)
  'plan:start': (
    data: { projectId: string; designIds: string[] },
    callback: (response: { success: boolean; error?: string }) => void
  ) => void;

  'plan:message': (
    data: { projectId: string; message: string; history: Array<{ id: string; role: 'assistant' | 'user'; content: string; timestamp: number }> },
    callback: (response: { success: boolean; error?: string }) => void
  ) => void;

  'plan:confirm': (
    data: { projectId: string; conversation: Array<{ id: string; role: 'assistant' | 'user'; content: string; timestamp: number }> },
    callback: (response: { success: boolean; conversationId?: string; error?: string }) => void
  ) => void;

  // Fixing stage events (Workflow V2)
  'fixing:start': (
    data: { projectId: string; designId: string; sections: Array<{ id: string; name: string; bounds: { x: number; y: number; width: number; height: number }; isGlobal: boolean }> },
    callback: (response: { success: boolean; error?: string }) => void
  ) => void;

  'fixing:request_fix': (
    data: {
      projectId: string;
      designId: string;
      sectionId: string;
      sectionName: string;
      nodes: Array<{ id: string; type: string; classes: string[]; tag?: string }>;
      styles: Array<{ name: string; properties: Record<string, string> }>;
      figmaScreenshot: string;
      builtScreenshot: string;
    },
    callback: (response: { success: boolean; error?: string }) => void
  ) => void;

  'fixing:complete': (
    data: { projectId: string; designId?: string },
    callback: (response: { success: boolean; error?: string }) => void
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

  // Workflow events
  'workflow:stage': (data: WorkflowStage) => void;
  'workflow:stages': (data: WorkflowStages) => void;
  'workflow:error': (data: WorkflowError) => void;
  'workflow:editor': (data: WorkflowEditor) => void;
  'workflow:export_complete': (data: WorkflowExportComplete) => void;
  'workflow:renamed': (data: { type: RenameTargetType; id: string; name: string }) => void;
  'workflow:export_limit_reached': (data: { projectId: string; message: string }) => void;
  'workflow:background_progress': (data: WorkflowBackgroundProgress) => void;
  'workflow:webflow_structure': (data: { designId: string; designName: string; xscp: any }) => void;
  'workflow:style_registry': (data: { styles: any[]; totalCount: number }) => void;

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
    tier: SubscriptionTier;
    isTrialing?: boolean;
    trialEnd?: number | null;
    currentPeriodEnd?: number;
  }) => void;

  // Customizer events (broadcast from server)
  'customizer:asset_upload_progress': (data: {
    projectId: string;
    complete: boolean;
    uploaded: number;
    total: number;
    failed: number;
  }) => void;

  // Webflow integration events (server → client)
  'webflow:connection_status': (data: {
    projectId: string;
    connected: boolean;
    siteId?: string;
    siteName?: string;
  }) => void;

  'webflow:asset_progress': (data: {
    projectId: string;
    uploaded: number;
    failed: number;
    total: number;
    currentAsset?: string;
  }) => void;

  'webflow:asset_complete': (data: {
    projectId: string;
    uploaded: number;
    failed: number;
    total: number;
  }) => void;

  // Plan stage events (Workflow V2 - server → client)
  'plan:stream': (data: {
    projectId: string;
    chunk: string;
    blocks?: {
      designAnalysis?: string;
      sectionsAnalysis?: string;
      colorSystem?: string;
      typographySystem?: string;
      componentsPlan?: string;
      customInstructionsReview?: string;
      questions?: string;
      ready?: string;
    };
    done: boolean;
  }) => void;

  'plan:reply': (data: {
    projectId: string;
    chunk: string;
    content?: string;
    done: boolean;
  }) => void;

  'plan:confirmed': (data: {
    projectId: string;
    conversationId: string;
  }) => void;

  'plan:error': (data: {
    projectId: string;
    error: string;
  }) => void;

  // Fixing stage events (Workflow V2 - server → client)
  'fixing:sections': (data: {
    projectId: string;
    designId: string;
    sections: Array<{ id: string; name: string; bounds: { x: number; y: number; width: number; height: number }; isGlobal: boolean }>;
  }) => void;

  'fixing:commands': (data: {
    projectId: string;
    designId: string;
    sectionId: string;
    analysis: string;
    commands: Array<{
      action: 'selectNode' | 'setBreakpoint' | 'setProperty' | 'removeProperty' | 'comment';
      displayMessage: string;
      nodeId?: string;
      className?: string;
      property?: string;
      value?: string;
      breakpoint?: 'desktop' | 'tablet' | 'mobile';
      message?: string;
    }>;
  }) => void;

  'fixing:section_complete': (data: {
    projectId: string;
    designId: string;
    sectionId: string;
  }) => void;

  'fixing:complete': (data: {
    projectId: string;
    designId: string;
  }) => void;

  'fixing:error': (data: {
    projectId: string;
    sectionId?: string;
    error: string;
  }) => void;
}

/**
 * Socket data attached to each connection
 */
export interface SocketData {
  userId?: string;
  userEmail?: string; // User email from JWT token (for tracking/notifications)
  sessionId?: string;
  isAuthenticated?: boolean;
  isGuest?: boolean;
  figmaUserId?: string; // Figma user ID from plugin token (for guest isolation)
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
