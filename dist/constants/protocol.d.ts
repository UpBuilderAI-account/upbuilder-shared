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
     * In execution order: SEND_NODES → SEND_DESIGN_IMAGES → PROCESS_ALL_IMAGES
     */
    readonly PLUGIN: {
        readonly SEND_NODES: "send_nodes";
        readonly SEND_DESIGN_IMAGES: "send_design_images";
        readonly PROCESS_ALL_IMAGES: "process_all_images";
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
    };
    /**
     * Workflow control events (client → server)
     */
    readonly WORKFLOW: {
        readonly COMMAND: "workflow:command";
        readonly STAGE: "workflow:stage";
        readonly STAGES: "workflow:stages";
        readonly STREAM: "workflow:stream";
        readonly ERROR: "workflow:error";
        readonly EDITOR: "workflow:editor";
        readonly EXPORT_COMPLETE: "workflow:export_complete";
        readonly SAVE_CODE: "workflow:save_code";
        readonly RENAME: "workflow:rename";
        readonly RENAMED: "workflow:renamed";
        readonly SAVE_STYLESHEET: "workflow:save_stylesheet";
        readonly RESET_STYLESHEET: "workflow:reset_stylesheet";
        readonly CLEAN_STYLESHEET: "workflow:clean_stylesheet";
        readonly EXPORT_LIMIT_REACHED: "workflow:export_limit_reached";
    };
    /**
     * Server → Client: Project state updates
     */
    readonly STATE: {
        readonly PROJECT: "project:state";
        readonly SECTION_UPDATE: "section:update";
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
     * System events (server → client)
     * For system-wide notifications like maintenance mode
     */
    readonly SYSTEM: {
        readonly MAINTENANCE: "system:maintenance";
        readonly MAINTENANCE_END: "system:maintenance_end";
    };
};
/**
 * Type helper to get all client → server event names
 */
export type ClientEventName = typeof SOCKET_EVENTS.AUTH[keyof typeof SOCKET_EVENTS.AUTH] | typeof SOCKET_EVENTS.PLUGIN[keyof typeof SOCKET_EVENTS.PLUGIN] | typeof SOCKET_EVENTS.PLUGIN_ROOM[keyof typeof SOCKET_EVENTS.PLUGIN_ROOM] | typeof SOCKET_EVENTS.PROJECT[keyof typeof SOCKET_EVENTS.PROJECT] | typeof SOCKET_EVENTS.WORKFLOW[keyof typeof SOCKET_EVENTS.WORKFLOW] | typeof SOCKET_EVENTS.GITHUB[keyof typeof SOCKET_EVENTS.GITHUB];
/**
 * Type helper to get all server → client event names
 */
export type ServerEventName = typeof SOCKET_EVENTS.STATE[keyof typeof SOCKET_EVENTS.STATE] | typeof SOCKET_EVENTS.PLUGIN_EVENTS[keyof typeof SOCKET_EVENTS.PLUGIN_EVENTS] | typeof SOCKET_EVENTS.RECEIVE[keyof typeof SOCKET_EVENTS.RECEIVE] | typeof SOCKET_EVENTS.ERROR[keyof typeof SOCKET_EVENTS.ERROR] | typeof SOCKET_EVENTS.OWNERSHIP[keyof typeof SOCKET_EVENTS.OWNERSHIP] | typeof SOCKET_EVENTS.USER[keyof typeof SOCKET_EVENTS.USER] | typeof SOCKET_EVENTS.SYSTEM[keyof typeof SOCKET_EVENTS.SYSTEM];
/**
 * Maintenance mode information sent to clients
 */
export interface MaintenanceInfo {
    enabled: boolean;
    message: string;
    estimatedEndTime?: string;
}
//# sourceMappingURL=protocol.d.ts.map