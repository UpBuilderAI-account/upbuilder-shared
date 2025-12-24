// ============================================================================
// PROTOCOL CONSTANTS
// WebSocket event names and error codes shared across Frontend, Backend, Plugin
// ============================================================================
// This file consolidates:
// - socket-events.ts: WebSocket event names
// - errors.ts: Error codes and utility functions (re-exported from types)
// ============================================================================

// ============================================================================
// SOCKET EVENT NAMES
// Type-safe constants for WebSocket events
// ============================================================================

/**
 * Socket event names organized by category
 * Use these constants instead of string literals for type safety
 */
export const SOCKET_EVENTS = {
  /**
   * Authentication events (client → server)
   */
  AUTH: {
    AUTHENTICATE: 'authenticate',
    AUTHENTICATE_GUEST: 'authenticate_guest',
  },

  /**
   * Plugin workflow events (client → server)
   * In execution order: SEND_NODES → SEND_DESIGN_IMAGES → PROCESS_ALL_IMAGES
   */
  PLUGIN: {
    SEND_NODES: 'send_nodes',
    SEND_DESIGN_IMAGES: 'send_design_images',
    PROCESS_ALL_IMAGES: 'process_all_images',
  },

  /**
   * Plugin room management (client → server)
   */
  PLUGIN_ROOM: {
    JOIN: 'join_plugin_room',
    LEAVE: 'leave_plugin_room',
  },

  /**
   * Project events (client → server)
   */
  PROJECT: {
    REQUEST_PROJECT: 'request_project',
    LEAVE_PROJECT: 'leave_project',
    REQUEST_LIST: 'request_project_list',
    DELETE: 'delete_project',
    DELETED: 'project_deleted',
    TRANSFER_OWNERSHIP: 'transfer_project_ownership',
  },

  /**
   * Workflow control events (client → server)
   */
  WORKFLOW: {
    COMMAND: 'workflow:command',       // Client → Server: All workflow commands (start, next, cancel)
    STAGE: 'workflow:stage',           // Server → Client: Single stage update (frequent)
    STAGES: 'workflow:stages',         // Server → Client: Full state (reconnect)
    STREAM: 'workflow:stream',         // Server → Client: Code streaming (CSS/JS)
    ERROR: 'workflow:error',           // Server → Client: Error events
    EDITOR: 'workflow:editor',         // Server → Client: Editor data for customize stage
    EXPORT_COMPLETE: 'workflow:export_complete', // Server → Client: Export complete with S3 URLs
    SAVE_CODE: 'workflow:save_code',   // Client → Server: Save edited code from customizer
    RENAME: 'workflow:rename',         // Client → Server: Rename design/section
    RENAMED: 'workflow:renamed',       // Server → Client: Broadcast rename to other clients
    // Stylesheet review (generate_styles stage)
    SAVE_STYLESHEET: 'workflow:save_stylesheet',   // Client → Server: Save edited stylesheet
    RESET_STYLESHEET: 'workflow:reset_stylesheet', // Client → Server: Reset to original stylesheet
    CLEAN_STYLESHEET: 'workflow:clean_stylesheet', // Client → Server: Remove unused CSS classes
    // Export limit events
    EXPORT_LIMIT_REACHED: 'workflow:export_limit_reached', // Server → Client: Export limit exceeded
    // Pending designs processing (Pro upgrade flow)
    PROCESS_PENDING: 'workflow:process_pending',  // Client → Server: Process pending designs after upgrade
  },

  /**
   * Server → Client: Project state updates
   */
  STATE: {
    PROJECT: 'project:state',
    SECTION_UPDATE: 'section:update', // NEW: Granular section updates (relational migration)
  },

  /**
   * Server → Client: Plugin processing events
   */
  PLUGIN_EVENTS: {
    MESSAGE: 'plugin:message',
    NODES_PROCESSED: 'plugin:nodes_processed',
    IMAGES_PROCESSED: 'plugin:images_processed',
  },

  /**
   * Server → Client: Project list and updates
   */
  RECEIVE: {
    PROJECT_LIST: 'receive_project_list',
    // Note: Use SOCKET_EVENTS.PROJECT.DELETED for project_deleted event
    // This alias exists for backwards compatibility
    PROJECT_DELETED: 'project_deleted',
  },

  /**
   * Server → Client: Error events
   */
  ERROR: {
    GENERAL: 'error',
    ELEMENTS: 'elements_error',
    IMAGES: 'images_error',
  },

  /**
   * Server → Client: Ownership transfer events
   */
  OWNERSHIP: {
    TRANSFERRED: 'project_ownership_transferred',
    AUTO_TRANSFER_COMPLETE: 'auto_transfer_complete',
  },

  /**
   * GitHub integration events (client ↔ server)
   */
  GITHUB: {
    GET_REPOS: 'github_get_repos',
    PUSH_CODE: 'github_push_code',
    SYNC_START: 'github_sync_start',
    SYNC_PROGRESS: 'github_sync_progress',
    SYNC_COMPLETE: 'github_sync_complete',
  },

  /**
   * User events (client ↔ server)
   * For user-specific data like subscription
   */
  USER: {
    SUBSCRIPTION_UPDATED: 'user:subscription_updated',
    CHECK_SUBSCRIPTION: 'user:check_subscription',
  },

  /**
   * System events (server → client)
   * For system-wide notifications like maintenance mode
   */
  SYSTEM: {
    MAINTENANCE: 'system:maintenance',
    MAINTENANCE_END: 'system:maintenance_end',
  },
} as const;

/**
 * Type helper to get all client → server event names
 */
export type ClientEventName =
  | typeof SOCKET_EVENTS.AUTH[keyof typeof SOCKET_EVENTS.AUTH]
  | typeof SOCKET_EVENTS.PLUGIN[keyof typeof SOCKET_EVENTS.PLUGIN]
  | typeof SOCKET_EVENTS.PLUGIN_ROOM[keyof typeof SOCKET_EVENTS.PLUGIN_ROOM]
  | typeof SOCKET_EVENTS.PROJECT[keyof typeof SOCKET_EVENTS.PROJECT]
  | typeof SOCKET_EVENTS.WORKFLOW[keyof typeof SOCKET_EVENTS.WORKFLOW]
  | typeof SOCKET_EVENTS.GITHUB[keyof typeof SOCKET_EVENTS.GITHUB];

/**
 * Type helper to get all server → client event names
 */
export type ServerEventName =
  | typeof SOCKET_EVENTS.STATE[keyof typeof SOCKET_EVENTS.STATE]
  | typeof SOCKET_EVENTS.PLUGIN_EVENTS[keyof typeof SOCKET_EVENTS.PLUGIN_EVENTS]
  | typeof SOCKET_EVENTS.RECEIVE[keyof typeof SOCKET_EVENTS.RECEIVE]
  | typeof SOCKET_EVENTS.ERROR[keyof typeof SOCKET_EVENTS.ERROR]
  | typeof SOCKET_EVENTS.OWNERSHIP[keyof typeof SOCKET_EVENTS.OWNERSHIP]
  | typeof SOCKET_EVENTS.USER[keyof typeof SOCKET_EVENTS.USER]
  | typeof SOCKET_EVENTS.SYSTEM[keyof typeof SOCKET_EVENTS.SYSTEM];

/**
 * Maintenance mode information sent to clients
 */
export interface MaintenanceInfo {
  enabled: boolean;
  message: string;
  estimatedEndTime?: string; // ISO timestamp
}

// ============================================================================
// ERROR CODES
// Note: ERROR_CODES and ErrorCode are defined in types/socket-protocol.ts
// Import directly from @upbuilder/shared
// ============================================================================
