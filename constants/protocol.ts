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
    ERROR: 'workflow:error',           // Server → Client: Error events
    EDITOR: 'workflow:editor',         // Server → Client: Editor data for customize stage
    EXPORT_COMPLETE: 'workflow:export_complete', // Server → Client: Export complete with S3 URLs
    SAVE_CODE: 'workflow:save_code',   // Client → Server: Save edited code from customizer
    RENAME: 'workflow:rename',         // Client → Server: Rename design/section
    RENAMED: 'workflow:renamed',       // Server → Client: Broadcast rename to other clients
    // Export limit events
    EXPORT_LIMIT_REACHED: 'workflow:export_limit_reached', // Server → Client: Export limit exceeded
    // Pending designs processing (Pro upgrade flow)
    PROCESS_PENDING: 'workflow:process_pending',  // Client → Server: Process pending designs after upgrade
    // Background progress (export_config stage)
    BACKGROUND_PROGRESS: 'workflow:background_progress', // Server → Client: Background job progress during export_config
    // Webflow structure preview (customize stage)
    WEBFLOW_STRUCTURE: 'workflow:webflow_structure', // Server → Client: XSCP data for tree view
    STYLE_REGISTRY: 'workflow:style_registry',       // Server → Client: Style registry for style panel
    // Validation progress (convert_to_platform stage)
    VALIDATION_PROGRESS: 'workflow:validation_progress', // Server → Client: Validation/fix progress for panel display
    OUTPUT: 'workflow:output',         // Server → Client: Terminal text output
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
   * Customizer events (client ↔ server)
   * For editing Webflow structure before export
   */
  CUSTOMIZER: {
    REQUEST_TREE: 'customizer:request_tree',     // Client → Server: Request editable tree data
    TREE_DATA: 'customizer:tree_data',           // Server → Client: Tree data response
    APPLY_EDITS: 'customizer:apply_edits',       // Client → Server: Apply edit operations
    EDITS_APPLIED: 'customizer:edits_applied',   // Server → Client: Edits applied response
    REQUEST_EXPORT: 'customizer:request_export', // Client → Server: Request export (Pro only)
    EXPORT_READY: 'customizer:export_ready',     // Server → Client: Export ready response
    REQUEST_PREVIEW: 'customizer:request_preview', // Client → Server: Request HTML preview
    UPLOAD_IMAGE: 'customizer:upload_image',     // Client → Server: Upload image asset
    ASSET_UPLOAD_STATUS: 'customizer:asset_upload_status', // Client → Server: Get asset upload status
    ASSET_UPLOAD_PROGRESS: 'customizer:asset_upload_progress', // Server → Client: Broadcast upload progress/completion
    AI_REQUEST: 'customizer:ai:request',         // Client → Server: AI assistant request
    AI_RESPONSE: 'customizer:ai:response',       // Server → Client: AI assistant response
    AI_STREAM: 'customizer:ai:stream',           // Server → Client: AI assistant streaming chunk
    ERROR: 'customizer:error',                   // Server → Client: Error event
    DEV_FIX: 'customizer:dev_fix',               // Client → Server: Dev-only structure fix
  },

  /**
   * Plan stage events (client ↔ server)
   * For AI-powered design planning before build
   */
  PLAN: {
    START: 'plan:start',                 // Client → Server: Start plan generation
    STREAM: 'plan:stream',               // Server → Client: Stream plan analysis chunks
    MESSAGE: 'plan:message',             // Client → Server: User sends message in conversation
    REPLY: 'plan:reply',                 // Server → Client: Stream AI reply
    CONFIRM: 'plan:confirm',             // Client → Server: Confirm plan and save
    CONFIRMED: 'plan:confirmed',         // Server → Client: Plan saved, ready to build
    ERROR: 'plan:error',                 // Server → Client: Plan error
  },

  /**
   * Fixing stage events (client ↔ server)
   * For AI-powered auto-fixing after build
   */
  FIXING: {
    START: 'fixing:start',               // Client → Server: Start fixing process
    SECTIONS: 'fixing:sections',         // Server → Client: List of sections to fix
    REQUEST_FIX: 'fixing:request_fix',   // Client → Server: Request fix for a section
    COMMANDS: 'fixing:commands',         // Server → Client: Commands to execute
    SECTION_COMPLETE: 'fixing:section_complete', // Server → Client: Section fixing complete
    COMPLETE: 'fixing:complete',         // Server → Client: All sections fixed
    ERROR: 'fixing:error',               // Server → Client: Fixing error
  },

  /**
   * Webflow integration events (client ↔ server)
   * For OAuth, site connection, and asset sync
   */
  WEBFLOW: {
    // OAuth
    GET_AUTH_URL: 'webflow:get_auth_url',        // Client → Server: Get OAuth authorization URL
    AUTH_STATUS: 'webflow:auth_status',          // Client → Server: Check if user has Webflow connected
    DISCONNECT: 'webflow:disconnect',            // Client → Server: Disconnect Webflow account

    // Sites
    GET_SITES: 'webflow:get_sites',              // Client → Server: Get list of authorized sites
    SITES_LIST: 'webflow:sites_list',            // Server → Client: List of authorized sites

    // Project connection
    CONNECT_SITE: 'webflow:connect_site',        // Client → Server: Connect project to Webflow site
    DISCONNECT_SITE: 'webflow:disconnect_site',  // Client → Server: Disconnect project from site
    CONNECTION_STATUS: 'webflow:connection_status', // Client ↔ Server: Get/broadcast connection status

    // Asset sync
    SYNC_ASSETS: 'webflow:sync_assets',          // Client → Server: Start asset upload to Webflow
    ASSET_PROGRESS: 'webflow:asset_progress',    // Server → Client: Asset upload progress
    ASSET_COMPLETE: 'webflow:asset_complete',
    DOWNLOAD_ASSETS_ZIP: 'webflow:download_assets_zip', // Client -> Server: Build and download project assets ZIP    // Server → Client: All assets uploaded

    // Push to Webflow
    PUSH_DESIGN: 'webflow:push_design',          // Client → Server: Get Designer-ready payload
    PUSH_PROGRESS: 'webflow:push_progress',      // Server → Client: Push progress
    PUSH_COMPLETE: 'webflow:push_complete',      // Server → Client: Push complete

    // CMS
    GET_COLLECTIONS: 'webflow:get_collections',  // Client → Server: Get CMS collections
    CREATE_COLLECTION: 'webflow:create_collection', // Client → Server: Create CMS collection
    SYNC_CMS_ITEMS: 'webflow:sync_cms_items',    // Client → Server: Sync CMS items
    CMS_PROGRESS: 'webflow:cms_progress',        // Server → Client: CMS sync progress
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
  | typeof SOCKET_EVENTS.GITHUB[keyof typeof SOCKET_EVENTS.GITHUB]
  | typeof SOCKET_EVENTS.CUSTOMIZER[keyof typeof SOCKET_EVENTS.CUSTOMIZER]
  | typeof SOCKET_EVENTS.WEBFLOW[keyof typeof SOCKET_EVENTS.WEBFLOW];

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
  | typeof SOCKET_EVENTS.CUSTOMIZER[keyof typeof SOCKET_EVENTS.CUSTOMIZER]
  | typeof SOCKET_EVENTS.WEBFLOW[keyof typeof SOCKET_EVENTS.WEBFLOW];

// ============================================================================
// ERROR CODES
// Note: ERROR_CODES and ErrorCode are defined in types/socket-protocol.ts
// Import directly from @upbuilder/shared
// ============================================================================
