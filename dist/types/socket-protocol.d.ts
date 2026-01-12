import type { ImagePair, PreviewData, FramePreview } from './plugin';
import type { Element } from './element';
import type { WorkflowStage, WorkflowStages, WorkflowError, WorkflowEditor, WorkflowCommand, WorkflowExportComplete, WorkflowBackgroundProgress, CodeSaveRequest, CodeSaveResult, RenameRequest, RenameResult, RenameTargetType } from './workflow';
import type { Breakpoints, Platform, StyleFramework, Project, ExportOptions, ExportPayload, SectionStageStatus, SubscriptionTier } from './core-domain';
import type { ExportConfig } from './workflow';
import type { RequestTreePayload, TreeDataResponse } from './editable-tree';
import type { ApplyEditsRequest, ApplyEditsResponse, RequestExportRequest, RequestExportResponse, RequestPreviewPayload, RequestPreviewResponse, UploadImageRequest, UploadImageResponse } from './edit-operations';
export type { ExportOptions, ExportPayload };
export declare const ERROR_CODES: {
    readonly AUTH_INVALID_CREDENTIALS: "AUTH_INVALID_CREDENTIALS";
    readonly AUTH_TOKEN_EXPIRED: "AUTH_TOKEN_EXPIRED";
    readonly AUTH_UNAUTHORIZED: "AUTH_UNAUTHORIZED";
    readonly AUTH_REQUIRED: "AUTH_REQUIRED";
    readonly PROJECT_NOT_FOUND: "PROJECT_NOT_FOUND";
    readonly PROJECT_INVALID_STATUS: "PROJECT_INVALID_STATUS";
    readonly PROJECT_ACCESS_DENIED: "PROJECT_ACCESS_DENIED";
    readonly WORKFLOW_INVALID_STAGE: "WORKFLOW_INVALID_STAGE";
    readonly WORKFLOW_INVALID_ACTION: "WORKFLOW_INVALID_ACTION";
    readonly WORKFLOW_ALREADY_STARTED: "WORKFLOW_ALREADY_STARTED";
    readonly WORKFLOW_NOT_STARTED: "WORKFLOW_NOT_STARTED";
    readonly PLUGIN_INVALID_NODES: "PLUGIN_INVALID_NODES";
    readonly PLUGIN_PROCESSING_FAILED: "PLUGIN_PROCESSING_FAILED";
    readonly EXPORT_FAILED: "EXPORT_FAILED";
    readonly EXPORT_NOT_READY: "EXPORT_NOT_READY";
    readonly INTERNAL_ERROR: "INTERNAL_ERROR";
    readonly VALIDATION_ERROR: "VALIDATION_ERROR";
    readonly RATE_LIMIT_EXCEEDED: "RATE_LIMIT_EXCEEDED";
    readonly NETWORK_ERROR: "NETWORK_ERROR";
};
export type ErrorCode = typeof ERROR_CODES[keyof typeof ERROR_CODES];
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
export declare function createSuccessCallback<T>(data?: T): CallbackSuccess<T>;
/**
 * Helper to create error response
 */
export declare function createErrorCallback(error: string, code?: ErrorCode, details?: any): CallbackError;
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
    labelRange: string;
}
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
        design_name: string;
        platform: Platform;
        styleFramework: StyleFramework;
        breakpoints: Breakpoints;
        colors?: string[];
        gradients?: any[];
        preview?: PreviewData;
        framePreview?: FramePreview;
        exportConfig?: ExportConfig;
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
        design_ids: string[];
    };
}
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
        designIds: string[];
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
/**
 * Events sent from client to server
 */
export interface ClientToServerEvents {
    authenticate: (data: {
        token?: string;
        guest?: boolean;
        pluginToken?: string;
    }, callback: CallbackResponse<{
        userId: string;
        isGuest: boolean;
    }>) => void;
    send_nodes: (data: PluginPayloads['send_nodes'], callback: CallbackResponse<{
        project_id: string;
        design_id: string;
    }>) => void;
    send_design_images: (data: PluginPayloads['send_design_images'], callback: CallbackResponse<{
        imageCount: number;
    }>) => void;
    process_all_images: (data: PluginPayloads['process_all_images'], callback: CallbackResponse<ProcessAllImagesResponse>) => void;
    join_plugin_room: (data: {
        projectId: string;
    }, callback?: CallbackResponse) => void;
    leave_plugin_room: (data: {
        projectId: string;
    }, callback?: CallbackResponse) => void;
    request_project_list: (data: void, callback?: CallbackResponse) => void;
    request_project: (data: {
        projectId: string;
    }, callback?: CallbackResponse) => void;
    leave_project: (data: {
        projectId: string;
    }, callback?: (res: {
        success: boolean;
    }) => void) => void;
    'workflow:command': (data: WorkflowCommand, callback: (ok: boolean) => void) => void;
    'workflow:save_code': (data: CodeSaveRequest, callback: (result: CodeSaveResult) => void) => void;
    'workflow:rename': (data: RenameRequest, callback: (result: RenameResult) => void) => void;
    'workflow:process_pending': (data: {
        projectId: string;
    }, callback: (result: {
        success: boolean;
        error?: string;
        designCount?: number;
    }) => void) => void;
    transfer_project_ownership: (data: {
        projectId: string;
    }, callback: CallbackResponse) => void;
    delete_project: (data: {
        projectId: string;
    }, callback: CallbackResponse) => void;
    'user:check_subscription': (data: void, callback: CallbackResponse<{
        tier: SubscriptionTier;
        isTrialing?: boolean;
        trialEnd?: number | null;
        currentPeriodEnd?: number;
    }>) => void;
    'customizer:request_tree': (data: RequestTreePayload, callback: (response: TreeDataResponse) => void) => void;
    'customizer:apply_edits': (data: ApplyEditsRequest, callback: (response: ApplyEditsResponse) => void) => void;
    'customizer:request_export': (data: RequestExportRequest, callback: (response: RequestExportResponse) => void) => void;
    'customizer:request_preview': (data: RequestPreviewPayload, callback: (response: RequestPreviewResponse) => void) => void;
    'customizer:upload_image': (data: UploadImageRequest, callback: (response: UploadImageResponse) => void) => void;
}
/**
 * Events sent from server to client
 */
export interface ServerToClientEvents {
    'project:state': (data: ProjectUpdate) => void;
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
    receive_project_list: (data: {
        projects: Project[];
        timestamp: string;
    }) => void;
    'plugin:message': (data: PluginEvents['message']) => void;
    'plugin:nodes_processed': (data: PluginEvents['nodes_processed']) => void;
    'plugin:images_processed': (data: PluginEvents['images_processed']) => void;
    error: (data: ErrorPayload) => void;
    'workflow:stage': (data: WorkflowStage) => void;
    'workflow:stages': (data: WorkflowStages) => void;
    'workflow:error': (data: WorkflowError) => void;
    'workflow:editor': (data: WorkflowEditor) => void;
    'workflow:export_complete': (data: WorkflowExportComplete) => void;
    'workflow:renamed': (data: {
        type: RenameTargetType;
        id: string;
        name: string;
    }) => void;
    'workflow:export_limit_reached': (data: {
        projectId: string;
        message: string;
    }) => void;
    'workflow:background_progress': (data: WorkflowBackgroundProgress) => void;
    'workflow:webflow_structure': (data: {
        designId: string;
        designName: string;
        xscp: any;
    }) => void;
    'workflow:style_registry': (data: {
        styles: any[];
        totalCount: number;
    }) => void;
    project_ownership_transferred: (data: {
        projectId: string;
        projectName?: string;
    }) => void;
    project_deleted: (data: {
        projectId: string;
        projectName?: string;
    }) => void;
    'user:subscription_updated': (data: {
        tier: SubscriptionTier;
        isTrialing?: boolean;
        trialEnd?: number | null;
        currentPeriodEnd?: number;
    }) => void;
}
/**
 * Socket data attached to each connection
 */
export interface SocketData {
    userId?: string;
    sessionId?: string;
    isAuthenticated?: boolean;
    isGuest?: boolean;
    figmaUserId?: string;
}
//# sourceMappingURL=socket-protocol.d.ts.map