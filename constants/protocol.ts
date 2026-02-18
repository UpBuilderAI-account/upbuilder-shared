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
   * In execution order: SEND_NODES → IMAGE_REVIEW → SEND_DESIGN_IMAGES → PROCESS_ALL_IMAGES
   */
  PLUGIN: {
    SEND_NODES: 'send_nodes',
    IMAGE_REVIEW: 'image_review_request',  // AI-powered image detection
    SEND_DESIGN_IMAGES: 'send_design_images',
    PROCESS_ALL_IMAGES: 'process_all_images',
    REQUEST_GEOMETRY: 'plugin:request_geometry',
    RECOLLECT_QA_GEOMETRY: 'plugin:recollect_qa_geometry',
    CANCEL_SCAN: 'cancel_scan',
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
    CLAIM_GUEST_PROJECTS: 'claim_guest_projects',  // Batch claim guest-owned projects
    GET_STATUS: 'project:get_status',  // Get project processing status for resume
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
    // Import session (temp-only export flow)
    IMPORT_SESSION: 'workflow:import_session', // Client → Server: Import temp session files to real project
    // Background progress (export_config stage)
    BACKGROUND_PROGRESS: 'workflow:background_progress', // Server → Client: Background job progress during export_config
    // Webflow structure preview (customize stage)
    WEBFLOW_STRUCTURE: 'workflow:webflow_structure', // Server → Client: XSCP data for tree view
    STYLE_REGISTRY: 'workflow:style_registry',       // Server → Client: Style registry for style panel
    // Validation progress (convert_to_platform stage)
    VALIDATION_PROGRESS: 'workflow:validation_progress', // Server → Client: Validation/fix progress for panel display
    // Structured plan (plan stage)
    STRUCTURED_PLAN: 'workflow:structured_plan', // Server → Client: Parsed structured plan JSON
    // Section build progress (build_sections stage)
    SECTION_PROGRESS: 'workflow:section_progress', // Server → Client: Per-section build progress
    // QA results (build_sections stage)
    SECTION_QA_PASSED: 'workflow:section_qa_passed',   // Server → Client: Section passed QA, show in live preview
    SECTION_QA_RESULT: 'workflow:section_qa_result',   // Server → Client: QA result per attempt (pass or fail)
    // AI image analysis progress (pre-export phase)
    AI_ANALYSIS_PROGRESS: 'workflow:ai_analysis_progress', // Server → Client: Per-design AI analysis progress
    // Scattered analysis results (post-section-bounding)
    SCATTERED_ANALYSIS_RESULTS: 'scattered-analysis-results', // Server → Client: Scattered composition groups for review
    // File generation streaming (build_sections stage)
    FILE_GENERATED: 'workflow:file_generated', // Server → Client: Stream generated files as they complete
    // Progressive file display (shows code panel during workflow)
    FILES_SCAFFOLD: 'workflow:files_scaffold',           // Server → Client: Initial project scaffold files
    SECTION_PLACEHOLDERS: 'workflow:section_placeholders', // Server → Client: Empty section file placeholders
  },

  /**
   * Server → Client: Project state updates
   */
  STATE: {
    PROJECT: 'project:state',
    SECTION_UPDATE: 'section:update', // NEW: Granular section updates (relational migration)
  },

  /**
   * Server → Client: Expansion lifecycle events (multi-tab sync)
   * Broadcast to all tabs viewing the same project
   */
  EXPANSION: {
    STARTED: 'expansion:started',       // Another tab started expansion
    PROGRESS: 'expansion:progress',     // Expansion progress update
    COMPLETED: 'expansion:completed',   // Expansion completed successfully
    FAILED: 'expansion:failed',         // Expansion failed
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
    REQUEST_EXPORT: 'customizer:request_export', // Client → Server: Request export
    EXPORT_READY: 'customizer:export_ready',     // Server → Client: Export ready response
    REQUEST_PREVIEW: 'customizer:request_preview', // Client → Server: Request HTML preview
    UPLOAD_IMAGE: 'customizer:upload_image',     // Client → Server: Upload image asset
    ASSET_UPLOAD_STATUS: 'customizer:asset_upload_status', // Client → Server: Get asset upload status
    ASSET_UPLOAD_PROGRESS: 'customizer:asset_upload_progress', // Server → Client: Broadcast upload progress/completion
    ERROR: 'customizer:error',                   // Server → Client: Error event
    // Restore to original
    RESTORE_ORIGINAL: 'customizer:restore_original',     // Client → Server: Restore all designs to original XSCP
    CHECK_HAS_ORIGINAL: 'customizer:check_has_original', // Client → Server: Check if original XSCP exists
    HAS_ORIGINAL: 'customizer:has_original',             // Server → Client: Response with hasOriginal boolean
    RESTORE_COMPLETE: 'customizer:restore_complete',     // Server → Client: Restore completed successfully
    // Dev: Reprocess XSCP from saved snapshot
    REPROCESS_XSCP: 'customizer:reprocess_xscp',       // Client → Server: Re-run dedup+normalizer+XSCP from snapshot
    SWITCH_UNITS: 'customizer:switch_units',             // Client → Server: Re-run normalizer with rem units
    // CMS Content Management
    CMS_UPDATE_SCHEMA: 'customizer:cms_update_schema',           // Client → Server: Update full CMS schema (init)
    CMS_ADD_COLLECTION: 'customizer:cms_add_collection',         // Client → Server: Add a new collection
    CMS_DELETE_COLLECTION: 'customizer:cms_delete_collection',   // Client → Server: Delete a collection
    CMS_UPDATE_COLLECTION: 'customizer:cms_update_collection',   // Client → Server: Update collection metadata
    CMS_ADD_FIELD: 'customizer:cms_add_field',                   // Client → Server: Add field to collection
    CMS_DELETE_FIELD: 'customizer:cms_delete_field',             // Client → Server: Delete field from collection
    CMS_UPDATE_FIELD: 'customizer:cms_update_field',             // Client → Server: Update field in collection
    CMS_ADD_ITEM: 'customizer:cms_add_item',                     // Client → Server: Add item to collection
    CMS_DELETE_ITEM: 'customizer:cms_delete_item',               // Client → Server: Delete item from collection
    CMS_UPDATE_ITEM: 'customizer:cms_update_item',               // Client → Server: Update item in collection
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
    ASSET_COMPLETE: 'webflow:asset_complete',    // Server → Client: All assets uploaded
    DOWNLOAD_ASSETS_ZIP: 'webflow:download_assets_zip', // Client → Server: Download project assets as ZIP

    // Push to Webflow
    PUSH_DESIGN: 'webflow:push_design',          // Client → Server: Get Designer-ready payload
    PUSH_PROGRESS: 'webflow:push_progress',      // Server → Client: Push progress
    PUSH_COMPLETE: 'webflow:push_complete',      // Server → Client: Push complete

    // CMS
    GET_COLLECTIONS: 'webflow:get_collections',  // Client → Server: Get CMS collections
    CREATE_COLLECTION: 'webflow:create_collection', // Client → Server: Create CMS collection
    SYNC_CMS_ITEMS: 'webflow:sync_cms_items',    // Client → Server: Sync CMS items
    CMS_PROGRESS: 'webflow:cms_progress',        // Server → Client: CMS sync progress

    // Style sync (from Designer Extension)
    SYNC_STYLES: 'webflow:sync_styles',          // Client → Server: Sync styles from Designer Extension
    GET_SITE_STYLES: 'webflow:get_site_styles',  // Client → Server: Get synced styles for a site
    STYLES_SYNCED: 'webflow:styles_synced',      // Server → Client: Styles sync complete
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
  | typeof SOCKET_EVENTS.EXPANSION[keyof typeof SOCKET_EVENTS.EXPANSION]
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
