/**
 * Socket event names organized by category
 * Use these constants instead of string literals for type safety
 */
export declare const SOCKET_EVENTS: {
    /**
     * Authentication events (client → server)
     */
    readonly AUTH: {
        readonly AUTHENTICATE: "authenticate";
        readonly AUTHENTICATE_GUEST: "authenticate_guest";
    };
    /**
     * Plugin workflow events (client → server)
     * In execution order: SEND_NODES → IMAGE_REVIEW → SEND_DESIGN_IMAGES → PROCESS_ALL_IMAGES
     */
    readonly PLUGIN: {
        readonly SEND_NODES: "send_nodes";
        readonly IMAGE_REVIEW: "image_review_request";
        readonly SEND_DESIGN_IMAGES: "send_design_images";
        readonly PROCESS_ALL_IMAGES: "process_all_images";
        readonly REQUEST_GEOMETRY: "plugin:request_geometry";
        readonly RECOLLECT_QA_GEOMETRY: "plugin:recollect_qa_geometry";
    };
    /**
     * Plugin room management (client → server)
     */
    readonly PLUGIN_ROOM: {
        readonly JOIN: "join_plugin_room";
        readonly LEAVE: "leave_plugin_room";
    };
    /**
     * Project events (client → server)
     */
    readonly PROJECT: {
        readonly REQUEST_PROJECT: "request_project";
        readonly LEAVE_PROJECT: "leave_project";
        readonly REQUEST_LIST: "request_project_list";
        readonly DELETE: "delete_project";
        readonly DELETED: "project_deleted";
        readonly TRANSFER_OWNERSHIP: "transfer_project_ownership";
        readonly CLAIM_GUEST_PROJECTS: "claim_guest_projects";
        readonly GET_STATUS: "project:get_status";
    };
    /**
     * Workflow control events (client → server)
     */
    readonly WORKFLOW: {
        readonly COMMAND: "workflow:command";
        readonly STAGE: "workflow:stage";
        readonly STAGES: "workflow:stages";
        readonly ERROR: "workflow:error";
        readonly EDITOR: "workflow:editor";
        readonly EXPORT_COMPLETE: "workflow:export_complete";
        readonly SAVE_CODE: "workflow:save_code";
        readonly RENAME: "workflow:rename";
        readonly RENAMED: "workflow:renamed";
        readonly BACKGROUND_PROGRESS: "workflow:background_progress";
        readonly WEBFLOW_STRUCTURE: "workflow:webflow_structure";
        readonly STYLE_REGISTRY: "workflow:style_registry";
        readonly VALIDATION_PROGRESS: "workflow:validation_progress";
        readonly STRUCTURED_PLAN: "workflow:structured_plan";
        readonly SECTION_PROGRESS: "workflow:section_progress";
        readonly SECTION_QA_PASSED: "workflow:section_qa_passed";
        readonly SECTION_QA_RESULT: "workflow:section_qa_result";
        readonly AI_ANALYSIS_PROGRESS: "workflow:ai_analysis_progress";
        readonly SCATTERED_ANALYSIS_RESULTS: "scattered-analysis-results";
    };
    /**
     * Server → Client: Project state updates
     */
    readonly STATE: {
        readonly PROJECT: "project:state";
        readonly SECTION_UPDATE: "section:update";
    };
    /**
     * Server → Client: Expansion lifecycle events (multi-tab sync)
     * Broadcast to all tabs viewing the same project
     */
    readonly EXPANSION: {
        readonly STARTED: "expansion:started";
        readonly PROGRESS: "expansion:progress";
        readonly COMPLETED: "expansion:completed";
        readonly FAILED: "expansion:failed";
    };
    /**
     * Server → Client: Plugin processing events
     */
    readonly PLUGIN_EVENTS: {
        readonly MESSAGE: "plugin:message";
        readonly NODES_PROCESSED: "plugin:nodes_processed";
        readonly IMAGES_PROCESSED: "plugin:images_processed";
    };
    /**
     * Server → Client: Project list and updates
     */
    readonly RECEIVE: {
        readonly PROJECT_LIST: "receive_project_list";
        readonly PROJECT_DELETED: "project_deleted";
    };
    /**
     * Server → Client: Error events
     */
    readonly ERROR: {
        readonly GENERAL: "error";
        readonly ELEMENTS: "elements_error";
        readonly IMAGES: "images_error";
    };
    /**
     * Server → Client: Ownership transfer events
     */
    readonly OWNERSHIP: {
        readonly TRANSFERRED: "project_ownership_transferred";
        readonly AUTO_TRANSFER_COMPLETE: "auto_transfer_complete";
    };
    /**
     * GitHub integration events (client ↔ server)
     */
    readonly GITHUB: {
        readonly GET_REPOS: "github_get_repos";
        readonly PUSH_CODE: "github_push_code";
        readonly SYNC_START: "github_sync_start";
        readonly SYNC_PROGRESS: "github_sync_progress";
        readonly SYNC_COMPLETE: "github_sync_complete";
    };
    /**
     * User events (client ↔ server)
     * For user-specific data like subscription
     */
    readonly USER: {
        readonly SUBSCRIPTION_UPDATED: "user:subscription_updated";
        readonly CHECK_SUBSCRIPTION: "user:check_subscription";
    };
    /**
     * Customizer events (client ↔ server)
     * For editing Webflow structure before export
     */
    readonly CUSTOMIZER: {
        readonly REQUEST_TREE: "customizer:request_tree";
        readonly TREE_DATA: "customizer:tree_data";
        readonly APPLY_EDITS: "customizer:apply_edits";
        readonly EDITS_APPLIED: "customizer:edits_applied";
        readonly REQUEST_EXPORT: "customizer:request_export";
        readonly EXPORT_READY: "customizer:export_ready";
        readonly REQUEST_PREVIEW: "customizer:request_preview";
        readonly UPLOAD_IMAGE: "customizer:upload_image";
        readonly ASSET_UPLOAD_STATUS: "customizer:asset_upload_status";
        readonly ASSET_UPLOAD_PROGRESS: "customizer:asset_upload_progress";
        readonly ERROR: "customizer:error";
        readonly RESTORE_ORIGINAL: "customizer:restore_original";
        readonly CHECK_HAS_ORIGINAL: "customizer:check_has_original";
        readonly HAS_ORIGINAL: "customizer:has_original";
        readonly RESTORE_COMPLETE: "customizer:restore_complete";
        readonly CMS_UPDATE_SCHEMA: "customizer:cms_update_schema";
        readonly CMS_ADD_COLLECTION: "customizer:cms_add_collection";
        readonly CMS_DELETE_COLLECTION: "customizer:cms_delete_collection";
        readonly CMS_UPDATE_COLLECTION: "customizer:cms_update_collection";
        readonly CMS_ADD_FIELD: "customizer:cms_add_field";
        readonly CMS_DELETE_FIELD: "customizer:cms_delete_field";
        readonly CMS_UPDATE_FIELD: "customizer:cms_update_field";
        readonly CMS_ADD_ITEM: "customizer:cms_add_item";
        readonly CMS_DELETE_ITEM: "customizer:cms_delete_item";
        readonly CMS_UPDATE_ITEM: "customizer:cms_update_item";
    };
    /**
     * Plan stage events (client ↔ server)
     * For AI-powered design planning before build
     */
    readonly PLAN: {
        readonly START: "plan:start";
        readonly STREAM: "plan:stream";
        readonly MESSAGE: "plan:message";
        readonly REPLY: "plan:reply";
        readonly CONFIRM: "plan:confirm";
        readonly CONFIRMED: "plan:confirmed";
        readonly ERROR: "plan:error";
    };
    /**
     * Fixing stage events (client ↔ server)
     * For AI-powered auto-fixing after build
     */
    readonly FIXING: {
        readonly START: "fixing:start";
        readonly SECTIONS: "fixing:sections";
        readonly REQUEST_FIX: "fixing:request_fix";
        readonly COMMANDS: "fixing:commands";
        readonly SECTION_COMPLETE: "fixing:section_complete";
        readonly COMPLETE: "fixing:complete";
        readonly ERROR: "fixing:error";
    };
    /**
     * Webflow integration events (client ↔ server)
     * For OAuth, site connection, and asset sync
     */
    readonly WEBFLOW: {
        readonly GET_AUTH_URL: "webflow:get_auth_url";
        readonly AUTH_STATUS: "webflow:auth_status";
        readonly DISCONNECT: "webflow:disconnect";
        readonly GET_SITES: "webflow:get_sites";
        readonly SITES_LIST: "webflow:sites_list";
        readonly CONNECT_SITE: "webflow:connect_site";
        readonly DISCONNECT_SITE: "webflow:disconnect_site";
        readonly CONNECTION_STATUS: "webflow:connection_status";
        readonly SYNC_ASSETS: "webflow:sync_assets";
        readonly ASSET_PROGRESS: "webflow:asset_progress";
        readonly ASSET_COMPLETE: "webflow:asset_complete";
        readonly DOWNLOAD_ASSETS_ZIP: "webflow:download_assets_zip";
        readonly PUSH_DESIGN: "webflow:push_design";
        readonly PUSH_PROGRESS: "webflow:push_progress";
        readonly PUSH_COMPLETE: "webflow:push_complete";
        readonly GET_COLLECTIONS: "webflow:get_collections";
        readonly CREATE_COLLECTION: "webflow:create_collection";
        readonly SYNC_CMS_ITEMS: "webflow:sync_cms_items";
        readonly CMS_PROGRESS: "webflow:cms_progress";
        readonly SYNC_STYLES: "webflow:sync_styles";
        readonly GET_SITE_STYLES: "webflow:get_site_styles";
        readonly STYLES_SYNCED: "webflow:styles_synced";
    };
};
/**
 * Type helper to get all client → server event names
 */
export type ClientEventName = typeof SOCKET_EVENTS.AUTH[keyof typeof SOCKET_EVENTS.AUTH] | typeof SOCKET_EVENTS.PLUGIN[keyof typeof SOCKET_EVENTS.PLUGIN] | typeof SOCKET_EVENTS.PLUGIN_ROOM[keyof typeof SOCKET_EVENTS.PLUGIN_ROOM] | typeof SOCKET_EVENTS.PROJECT[keyof typeof SOCKET_EVENTS.PROJECT] | typeof SOCKET_EVENTS.WORKFLOW[keyof typeof SOCKET_EVENTS.WORKFLOW] | typeof SOCKET_EVENTS.GITHUB[keyof typeof SOCKET_EVENTS.GITHUB] | typeof SOCKET_EVENTS.CUSTOMIZER[keyof typeof SOCKET_EVENTS.CUSTOMIZER] | typeof SOCKET_EVENTS.WEBFLOW[keyof typeof SOCKET_EVENTS.WEBFLOW];
/**
 * Type helper to get all server → client event names
 */
export type ServerEventName = typeof SOCKET_EVENTS.STATE[keyof typeof SOCKET_EVENTS.STATE] | typeof SOCKET_EVENTS.EXPANSION[keyof typeof SOCKET_EVENTS.EXPANSION] | typeof SOCKET_EVENTS.PLUGIN_EVENTS[keyof typeof SOCKET_EVENTS.PLUGIN_EVENTS] | typeof SOCKET_EVENTS.RECEIVE[keyof typeof SOCKET_EVENTS.RECEIVE] | typeof SOCKET_EVENTS.ERROR[keyof typeof SOCKET_EVENTS.ERROR] | typeof SOCKET_EVENTS.OWNERSHIP[keyof typeof SOCKET_EVENTS.OWNERSHIP] | typeof SOCKET_EVENTS.USER[keyof typeof SOCKET_EVENTS.USER] | typeof SOCKET_EVENTS.CUSTOMIZER[keyof typeof SOCKET_EVENTS.CUSTOMIZER] | typeof SOCKET_EVENTS.WEBFLOW[keyof typeof SOCKET_EVENTS.WEBFLOW];
//# sourceMappingURL=protocol.d.ts.map