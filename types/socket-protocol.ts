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
import type { Element, FigmaColorVariable, FigmaVariableCollection } from './element';
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
  AgentEvent,
  AgentHistory,
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

  // Version errors
  VERSION_OUTDATED: 'VERSION_OUTDATED',

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
  DESIGN_LIMIT_REACHED: 'DESIGN_LIMIT_REACHED',

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
  /** Temp design ID for session-based export */
  tempDesignId?: string;
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
    /** S3 URL from scan phase (skip re-upload of big preview) */
    bigPreviewS3Url?: string;
    /** Google AI URI from scan phase */
    bigPreviewGoogleAiUri?: string;
    /** Dimensions of the big preview from scan phase */
    bigPreviewDimensions?: { width: number; height: number };
    /** @deprecated Use smallPreview instead */
    framePreview?: FramePreview;
    exportConfig?: ExportConfig; // Full export config from plugin (skips export_config stage)
    /** Figma color variables extracted from the design */
    variables?: FigmaColorVariable[];
    /** Figma variable collections metadata */
    variableCollections?: FigmaVariableCollection[];
    /** Session ID from scan phase (for retrieving temp files) */
    sessionId?: string;
    /** Temp design ID from scan phase (maps to temp S3 path) */
    scanTempDesignId?: string;
    /** Target project: create new or expand existing */
    targetProject: {
      type: 'new' | 'existing';
      /** Required if type='existing' */
      projectId?: string;
    };
  };

  /**
   * 2. Send design images (stores without processing)
   * NOTE: Now uses sessionId/tempDesignId for temp-only export
   */
  send_design_images: {
    /** Session ID from send_nodes response */
    sessionId: string;
    /** Temp design ID from send_nodes response */
    tempDesignId: string;
    images: ImagePair[];
    /** @deprecated Use sessionId - legacy field for backwards compatibility */
    project_id?: string;
    /** @deprecated Use tempDesignId - legacy field for backwards compatibility */
    design_id?: string;
  };

  /**
   * 3. Process all stored images together with global labels
   * NOTE: Now uses sessionId/tempDesignIds for temp-only export
   */
  process_all_images: {
    /** Session ID from send_nodes response */
    sessionId: string;
    /** Temp design IDs to process (ordered array) */
    tempDesignIds: string[];
    /** @deprecated Use sessionId - legacy field for backwards compatibility */
    project_id?: string;
    /** @deprecated Use tempDesignIds - legacy field for backwards compatibility */
    design_ids?: string[];
  };

  /**
   * 4. Recollect QA geometry from Figma plugin (Phase 2 stub)
   */
  recollect_qa_geometry: {
    project_id: string;
    design_id: string;
    frame_id: string;
    node_ids: string[];
  };
}

/**
 * Response from plugin recollect QA geometry (Phase 2 stub)
 */
export interface RecollectQAGeometryResponse {
  elements: Array<{
    figmaNodeId: string;
    absoluteBoundingBox: { x: number; y: number; width: number; height: number };
  }>;
}

// ============================================================================
// GEOMETRY MEASUREMENT TYPES (AI-driven QA)
// ============================================================================

/** Server → Plugin: request geometry measurements */
export interface GeometryMeasurementRequest {
  requestId: string;
  projectId: string;
  sectionId: string;
  commands: Array<{
    type: 'MEASURE_NODE' | 'MEASURE_DISTANCE' | 'MEASURE_CHILDREN';
    nodeIds: string[];
  }>;
}

/** Plugin → Server: geometry measurement response */
export interface GeometryMeasurementResponse {
  requestId: string;
  success: boolean;
  measurements: Array<{
    commandType: string;
    nodeIds: string[];
    data: NodeMeasurement | DistanceMeasurement | ChildrenMeasurement | null;
    error?: string;
  }>;
}

export interface NodeMeasurement {
  nodeId: string;
  name: string;
  x: number;
  y: number;
  width: number;
  height: number;
  layoutMode?: string;
  paddingTop?: number;
  paddingRight?: number;
  paddingBottom?: number;
  paddingLeft?: number;
  itemSpacing?: number;
}

export interface DistanceMeasurement {
  nodeIdA: string;
  nodeIdB: string;
  dx: number;
  dy: number;
  edgeDistanceH: number;
  edgeDistanceV: number;
}

export interface ChildrenMeasurement {
  parentId: string;
  parentName: string;
  layoutMode: string;
  padding: { top: number; right: number; bottom: number; left: number };
  itemSpacing: number;
  children: Array<{
    nodeId: string;
    name: string;
    x: number;
    y: number;
    width: number;
    height: number;
  }>;
  measuredGaps: number[];
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
    data: { token?: string; guest?: boolean; pluginToken?: string; pluginVersion?: string },
    callback: CallbackResponse<{ userId: string; isGuest: boolean }>
  ) => void;

  // Plugin events (in execution order)
  // NOTE: send_nodes now stores to temp session (no DB write)
  // Returns sessionId + tempDesignId for clipboard export
  send_nodes: (
    data: PluginPayloads['send_nodes'],
    callback: CallbackResponse<{ sessionId: string; tempDesignId: string }>
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

  // AI-powered image review (identifies potential graphics)
  // Uses deferred project creation - sessionId instead of projectId
  image_review_request: (
    data: {
      sessionId: string;
      designs: Array<{
        designId: string;
        designName: string;
        frameId?: string;
        screenshotUri: string;
        screenshotBase64?: string;
        dimensions: { width: number; height: number };
        nodeTree: string;
        nodeIdMap?: Record<string, string>;
        currentDetections: string[];
      }>;
      fastMode?: boolean;
    },
    callback: CallbackResponse<{
      sessionId: string;
      designs: Array<{
        designId: string;
        suggestions: Array<{
          nodeId: string;
          name: string;
          category: string;
          confidence: 'high' | 'medium' | 'low';
          reason: string;
        }>;
        falsePositives: Array<{
          nodeId: string;
          reason: string;
        }>;
      }>;
      uploadedPreviews?: Record<string, {
        tempDesignId: string;
        s3Url: string;
        googleAiUri: string;
        dimensions: { width: number; height: number };
      }>;
    }>
  ) => void;

  // Plugin geometry measurement response (plugin → server)
  'plugin:recollect_qa_geometry': (data: GeometryMeasurementResponse) => void;

  // Plugin room management
  join_plugin_room: (data: { projectId: string }, callback?: CallbackResponse) => void;
  leave_plugin_room: (data: { projectId: string }, callback?: CallbackResponse) => void;

  // Project list request (with optional pagination/filter params)
  request_project_list: (
    data?: {
      page?: number;
      limit?: number;
      status?: 'processing' | 'complete';
      search?: string;
    },
    callback?: CallbackResponse
  ) => void;

  // Single project request
  request_project: (data: { projectId: string }, callback?: CallbackResponse) => void;

  // Leave project room (cleanup when navigating away)
  leave_project: (data: { projectId: string }, callback?: (res: { success: boolean }) => void) => void;

  // Workflow command (replaces workflow_start, workflow_next, workflow_customize)
  'workflow:command': (
    data: WorkflowCommand,
    callback: (ok: boolean, cancelResult?: { wasExpansion: boolean; restoredVersion: number }) => void
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

  // Import session (temp-only export flow)
  // Transfers files from temp/{sessionId}/ to real project and creates DB records
  'workflow:import_session': (
    data: {
      /** Session ID from clipboard export */
      sessionId: string;
      /** Target project: 'new' creates new project, or existing project ID */
      projectId: 'new' | string;
      /** Project name (for new projects) */
      projectName?: string;
      /** Selected temp design IDs to import */
      selectedDesigns: string[];
      /** Platform (webflow, etc.) */
      platform: Platform;
      /** Style framework (client-first, etc.) */
      styleFramework: StyleFramework;
      /** Breakpoints configuration */
      breakpoints: Breakpoints;
      /** Export config from plugin */
      exportConfig?: ExportConfig;
    },
    callback: CallbackResponse<{
      /** Created/target project ID */
      projectId: string;
      /** Map of tempDesignId → real designId */
      designIdMap: Record<string, string>;
    }>
  ) => void;

  // Ownership transfer
  transfer_project_ownership: (
    data: { projectId: string },
    callback: CallbackResponse
  ) => void;

  // Batch claim guest-owned projects (transfer from GUEST_USER_ID to current user)
  claim_guest_projects: (
    data: { projectIds: string[] },
    callback: CallbackResponse<{
      transferred: string[];
      alreadyOwned: string[];
      notFound: string[];
    }>
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

  'webflow:download_assets_zip': (
    data: { projectId: string },
    callback: (response: {
      success: boolean;
      data?: { url: string };
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
      styles: Array<{
        name: string;
        combo: string;
        properties?: Record<string, string>;
        breakpoints?: {
          desktop?: Record<string, string>;
          tablet?: Record<string, string>;
          mobile?: Record<string, string>;
        };
      }>;
      figmaScreenshot: string;
      builtScreenshot: string;
      /** Current pass number (1 = initial, 2 = verification) */
      passNumber?: 1 | 2;
      /** Context from pass 1 (only for pass 2) */
      previousPass?: {
        passNumber: number;
        analysis: string;
        commands: Array<{
          action: string;
          displayMessage: string;
          nodeId: string;
          comboClass: string;
          breakpoint: 'desktop' | 'tablet' | 'mobile';
          property?: string;
          value?: string;
          message?: string;
          className?: string;
          text?: string;
          displayValue?: string;
        }>;
        commandResults: Array<{
          command: any;
          status: 'success' | 'failed' | 'skipped';
          reason?: string;
        }>;
      };
    },
    callback: (response: { success: boolean; error?: string }) => void
  ) => void;

  'fixing:complete': (
    data: { projectId: string; designId?: string },
    callback: (response: { success: boolean; error?: string }) => void
  ) => void;

  // Build sections stage - screenshot ready (frontend → backend)
  'build_sections:screenshot_ready': (
    data: { projectId: string; sectionId: string; screenshot: string },
    callback?: (response: { success: boolean; error?: string }) => void
  ) => void;

  // Validate session (check if temp session still exists and has valid data)
  'workflow:validate_session': (
    data: { sessionId: string },
    callback: (response: {
      success: boolean;
      data?: { valid: boolean; reason?: string; designCount?: number };
      error?: string;
    }) => void
  ) => void;

  // NEW: Rebuild-only fixing (no incremental commands)
  'fixing:request_rebuild': (
    data: {
      projectId: string;
      designId: string;
      sectionId: string;
      sectionName: string;
      /** Section bounds for Figma data filtering */
      sectionBounds?: { x: number; y: number; width: number; height: number };
      /** Whether this is a global section */
      isGlobal?: boolean;
      /** Full design structure from editable tree */
      designStructure: Array<{
        id: string;
        type: string;
        tag?: string;
        classes: string[];
        text?: string;
        src?: string;
        alt?: string;
        parentId: string | null;
        childIds: string[];
      }>;
      /** Full design styles with CSS per breakpoint */
      designStyles: Array<{
        name: string;
        comb: '' | '&';
        chain?: string[];
        css: {
          main: string;
          medium?: string;
          tiny?: string;
        };
      }>;
      /** Screenshots for comparison */
      figmaScreenshot: string;
      builtScreenshot: string;
    },
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
  'plugin:request_geometry': (data: GeometryMeasurementRequest) => void;

  // Error events
  error: (data: ErrorPayload) => void;

  // Workflow events
  'workflow:stage': (data: WorkflowStage) => void;
  'workflow:stages': (data: WorkflowStages) => void;
  'workflow:error': (data: WorkflowError) => void;
  'workflow:import_project_created': (data: {
    projectId: string;
    designIdMap: Record<string, string>;
    isExpansion: boolean;
  }) => void;
  'workflow:editor': (data: WorkflowEditor) => void;
  'workflow:export_complete': (data: WorkflowExportComplete) => void;
  'workflow:renamed': (data: { type: RenameTargetType; id: string; name: string }) => void;
  'workflow:background_progress': (data: WorkflowBackgroundProgress) => void;
  'workflow:webflow_structure': (data: { designId: string; designName: string; xscp: any }) => void;
  'workflow:style_registry': (data: { styles: any[]; totalCount: number }) => void;
  'workflow:structured_plan': (data: { projectId: string; plan: import('./plan').StructuredPlan }) => void;
  'workflow:section_progress': (data: { projectId: string; progress: import('./plan').BuildSectionsProgress }) => void;
  'workflow:ai_analysis_progress': (data: {
    projectId: string;
    designId: string;
    designName: string;
    status: 'pending' | 'analyzing' | 'complete' | 'failed';
    detectionCount?: number;
  }) => void;
  'workflow:validation_progress': (data: {
    projectId: string;
    designId: string;
    designName: string;
    phase: 'idle' | 'parsing' | 'validating' | 'fixing' | 'rebuilding' | 'complete';
    phaseMessage: string;
    attempt: number;
    maxAttempts: number;
    errors: Array<{
      nodeId: string;
      componentType: string;
      errorCode: string;
      message: string;
      lineNumber?: number;
    }>;
    totalElements: number;
    fixedElements: number;
    isComplete: boolean;
    wasFixed: boolean;
  }) => void;
  'workflow:style_metrics': (data: {
    projectId: string;
    totalStyles: number;
    reusedStyles: number;
    newStyles: number;
    reusedStyleNames: string[];
    newStyleNames: string[];
    sourceProjectName?: string;
  }) => void;
  // Progressive file display events
  'workflow:files_scaffold': (data: import('./workflow-files').FilesScaffoldEvent) => void;
  'workflow:section_placeholders': (data: import('./workflow-files').SectionPlaceholdersEvent) => void;
  'workflow:file_generated': (data: import('./clipboard-export').FileGeneratedEvent) => void;

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

  // Expansion/restore events (broadcast to all tabs viewing the same project)
  'expansion:started': (data: {
    projectId: string;
    userId: string;
    type: 'expand' | 'restore';
    version?: number;
    timestamp: number;
  }) => void;
  'expansion:progress': (data: {
    projectId: string;
    stage: string;
    percent: number;
    message?: string;
  }) => void;
  'expansion:completed': (data: {
    projectId: string;
    newVersion: number;
    type: 'expand' | 'restore';
    designsAdded?: number;
    stylesAdded?: number;
    timestamp: number;
  }) => void;
  'expansion:failed': (data: {
    projectId: string;
    error: string;
    type: 'expand' | 'restore';
    timestamp: number;
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
    needsConfirmation?: boolean;
    cached?: boolean;
    chatHistory?: Array<{ role: string; content: string }>;
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
      action: 'setProperty' | 'removeProperty' | 'addClass' | 'removeClass' | 'setTextContent' | 'deleteElement' | 'hideElement' | 'showElement' | 'wrapElement' | 'moveElement' | 'comment';
      displayMessage: string;
      nodeId: string;
      comboClass: string;
      breakpoint: 'desktop' | 'tablet' | 'mobile';
      property?: string;
      value?: string;
      message?: string;
      className?: string;
      text?: string;
      displayValue?: string;
      wrapperTag?: string;
      wrapperClass?: string;
      wrapperStyles?: Record<string, string>;
      includeNextSiblings?: number;
      targetParentClass?: string;
      position?: 'prepend' | 'append';
    }>;
    /** Which pass this response is for */
    passNumber?: 1 | 2;
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

  // NEW: Rebuild result (no incremental commands)
  'fixing:rebuild_result': (data: {
    projectId: string;
    designId: string;
    sectionId: string;
    analysis: string;
    structure: Array<{
      id: string;
      compType: string;
      parent: string;
      styles: string[];
      tag?: string;
      text?: string;
      src?: string;
      alt?: string;
      href?: string;
      collapse?: string;
      html?: string;
      custom?: string;
    }>;
    newStyles: Array<{
      /** Class name (e.g., "nav-link", "btn-primary") */
      name: string;
      /** Combo marker: "" for base class, "&" for modifier */
      comb: '' | '&';
      /** Full combo chain for context */
      chain?: string[];
      /** Action: "edit" existing or "create" new */
      action: 'edit' | 'create';
      /** CSS for desktop */
      main: string;
      /** CSS for tablet */
      medium?: string;
      /** CSS for mobile */
      tiny?: string;
      /** Hover state CSS */
      hover?: string;
      /** Current/active state CSS */
      current?: string;
    }>;
    /** Validation result */
    validation?: {
      isValid: boolean;
      errors: string[];
      warnings: string[];
    };
  }) => void;

  // Section bounding stage events (new workflow)
  'section_bounding:start': (data: { projectId: string }) => void;
  'section_bounding:progress': (data: { projectId: string; percent: number; message: string }) => void;
  'section_bounding:result': (data: {
    projectId: string;
    sections: Array<{
      id: string;
      name: string;
      type: 'navbar' | 'hero' | 'content' | 'footer' | 'other';
      bounds: { x: number; y: number; width: number; height: number };
      elementIds: string[];
      isGlobal: boolean;
      order: number;
      designId: string;
    }>;
  }) => void;
  'section_bounding:error': (data: { projectId: string; error: string }) => void;

  // Build sections stage events (new workflow)
  'build_sections:request_screenshot': (data: {
    projectId: string;
    sectionId: string;
    bounds: { x: number; y: number; width: number; height: number };
    designId: string;
    /** S3 URL for the big preview image (for frontend cropping) */
    bigPreviewUrl?: string;
    /** Dimensions of the big preview image */
    bigPreviewDimensions?: { width: number; height: number };
    /** Original Figma frame dimensions (bounds are relative to this) */
    designDimensions?: { width: number; height: number };
  }) => void;
  'build_sections:progress': (data: {
    projectId: string;
    percent: number;
    message: string;
    currentSection?: number;
    totalSections?: number;
  }) => void;
  'build_sections:analysis_stream': (data: {
    projectId: string;
    sectionId: string;
    chunk: string;
    done: boolean;
  }) => void;
  'build_sections:section_complete': (data: {
    projectId: string;
    sectionId: string;
    analysis: {
      sectionId: string;
      sectionName: string;
      designId: string;
      analysis: {
        layout: string;
        colors: string[];
        typography: string;
        elements: string[];
        suggestedClasses: string[];
      };
      rawOutput: string;
      completedAt: number;
    };
  }) => void;
  'build_sections:all_complete': (data: {
    projectId: string;
    sections: Array<{
      sectionId: string;
      sectionName: string;
      designId: string;
      analysis: {
        layout: string;
        colors: string[];
        typography: string;
        elements: string[];
        suggestedClasses: string[];
      };
      rawOutput: string;
      completedAt: number;
    }>;
  }) => void;
  'build_sections:error': (data: { projectId: string; error: string }) => void;

  // Assembly stage events (new workflow)
  'assembly:start': (data: { projectId: string }) => void;
  'assembly:progress': (data: { projectId: string; percent: number; message: string }) => void;
  'assembly:stream': (data: { projectId: string; chunk: string; done: boolean }) => void;
  'assembly:complete': (data: {
    projectId: string;
    structures: Record<string, string>;
    styles: string;
  }) => void;
  'assembly:error': (data: { projectId: string; error: string }) => void;

  // Agent stage events (Claude Agent SDK refactoring)
  'agent:event': (data: { projectId: string; event: AgentEvent }) => void;
  'agent:complete': (data: { projectId: string; history: AgentHistory }) => void;
  'agent:error': (data: { projectId: string; message: string }) => void;
  'agent:preview_ready': (data: { projectId: string; port: number; url: string }) => void;
  'agent:preview_stopped': (data: { projectId: string }) => void;

  // Activity feed events (persistent workflow history)
  'activity:event': (data: {
    id: string;
    event_type: string;
    message: string;
    dot_color: string;
    meta?: string;
    stage?: string;
    section_id?: string;
    section_name?: string;
    design_id?: string;
    design_name?: string;
    created_at: string | Date;
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
  rateLimitKey?: string; // Key for rate limiting (figmaUserId || userId) - 1 concurrent job per key
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
