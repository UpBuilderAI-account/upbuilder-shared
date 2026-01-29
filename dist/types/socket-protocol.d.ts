import type { ImagePair, PreviewData, SmallPreview, BigPreview, FramePreview } from './plugin';
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
    readonly VERSION_OUTDATED: "VERSION_OUTDATED";
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
        smallPreview?: SmallPreview;
        bigPreview?: BigPreview;
        /** @deprecated Use smallPreview instead */
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
        pluginVersion?: string;
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
    image_review_request: (data: {
        projectId: string;
        designs: Array<{
            designId: string;
            designName: string;
            screenshotUri: string;
            screenshotBase64?: string;
            dimensions: {
                width: number;
                height: number;
            };
            nodeTree: string;
            currentDetections: string[];
        }>;
    }, callback: CallbackResponse<{
        designs: Array<{
            designId: string;
            suggestions: Array<{
                nodeId: string;
                name: string;
                category: string;
                confidence: 'high' | 'medium';
                reason: string;
            }>;
            falsePositives: Array<{
                nodeId: string;
                reason: string;
            }>;
        }>;
    }>) => void;
    join_plugin_room: (data: {
        projectId: string;
    }, callback?: CallbackResponse) => void;
    leave_plugin_room: (data: {
        projectId: string;
    }, callback?: CallbackResponse) => void;
    request_project_list: (data?: {
        page?: number;
        limit?: number;
        status?: 'processing' | 'complete';
        search?: string;
    }, callback?: CallbackResponse) => void;
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
    'customizer:asset_upload_status': (data: {
        projectId: string;
    }, callback: (response: {
        complete: boolean;
        uploaded: number;
        total: number;
        failed: number;
    }) => void) => void;
    'webflow:get_auth_url': (data: Record<string, never>, callback: (response: {
        success: boolean;
        data?: {
            authUrl: string;
        };
        error?: string;
    }) => void) => void;
    'webflow:auth_status': (data: Record<string, never>, callback: (response: {
        success: boolean;
        data?: {
            connected: boolean;
            webflowEmail?: string;
            scopes?: string[];
            connectedAt?: string;
        };
        error?: string;
    }) => void) => void;
    'webflow:disconnect': (data: Record<string, never>, callback: (response: {
        success: boolean;
        error?: string;
    }) => void) => void;
    'webflow:get_sites': (data: Record<string, never>, callback: (response: {
        success: boolean;
        data?: {
            sites: Array<{
                id: string;
                displayName: string;
                shortName: string;
                previewUrl?: string;
            }>;
        };
        error?: string;
    }) => void) => void;
    'webflow:connect_site': (data: {
        projectId: string;
        siteId: string;
        siteName: string;
        siteShortName?: string;
        sitePreviewUrl?: string;
    }, callback: (response: {
        success: boolean;
        error?: string;
    }) => void) => void;
    'webflow:connection_status': (data: {
        projectId: string;
    }, callback: (response: {
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
    }) => void) => void;
    'webflow:disconnect_site': (data: {
        projectId: string;
    }, callback: (response: {
        success: boolean;
        error?: string;
    }) => void) => void;
    'webflow:sync_assets': (data: {
        projectId: string;
        designId?: string;
    }, callback: (response: {
        success: boolean;
        data?: {
            total: number;
        };
        error?: string;
    }) => void) => void;
    'webflow:push_design': (data: {
        projectId: string;
        designId: string;
    }, callback: (response: {
        success: boolean;
        data?: {
            xscpData: unknown;
            assetMap: Record<string, string>;
            siteId: string;
            siteName: string;
        };
        error?: string;
    }) => void) => void;
    'webflow:download_assets_zip': (data: {
        projectId: string;
    }, callback: (response: {
        success: boolean;
        data?: {
            url: string;
        };
        error?: string;
    }) => void) => void;
    'plan:start': (data: {
        projectId: string;
        designIds: string[];
    }, callback: (response: {
        success: boolean;
        error?: string;
    }) => void) => void;
    'plan:message': (data: {
        projectId: string;
        message: string;
        history: Array<{
            id: string;
            role: 'assistant' | 'user';
            content: string;
            timestamp: number;
        }>;
    }, callback: (response: {
        success: boolean;
        error?: string;
    }) => void) => void;
    'plan:confirm': (data: {
        projectId: string;
        conversation: Array<{
            id: string;
            role: 'assistant' | 'user';
            content: string;
            timestamp: number;
        }>;
    }, callback: (response: {
        success: boolean;
        conversationId?: string;
        error?: string;
    }) => void) => void;
    'fixing:start': (data: {
        projectId: string;
        designId: string;
        sections: Array<{
            id: string;
            name: string;
            bounds: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            isGlobal: boolean;
        }>;
    }, callback: (response: {
        success: boolean;
        error?: string;
    }) => void) => void;
    'fixing:request_fix': (data: {
        projectId: string;
        designId: string;
        sectionId: string;
        sectionName: string;
        nodes: Array<{
            id: string;
            type: string;
            classes: string[];
            tag?: string;
        }>;
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
    }, callback: (response: {
        success: boolean;
        error?: string;
    }) => void) => void;
    'fixing:complete': (data: {
        projectId: string;
        designId?: string;
    }, callback: (response: {
        success: boolean;
        error?: string;
    }) => void) => void;
    'build_sections:screenshot_ready': (data: {
        projectId: string;
        sectionId: string;
        screenshot: string;
    }, callback?: (response: {
        success: boolean;
        error?: string;
    }) => void) => void;
    'fixing:request_rebuild': (data: {
        projectId: string;
        designId: string;
        sectionId: string;
        sectionName: string;
        /** Section bounds for Figma data filtering */
        sectionBounds?: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
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
    }, callback: (response: {
        success: boolean;
        error?: string;
    }) => void) => void;
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
    'workflow:output': (data: {
        projectId: string;
        text: string;
    }) => void;
    'workflow:structured_plan': (data: {
        projectId: string;
        plan: import('./plan').StructuredPlan;
    }) => void;
    'workflow:section_progress': (data: {
        projectId: string;
        progress: import('./plan').BuildSectionsProgress;
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
    project_ownership_transferred: (data: {
        projectId: string;
        projectName?: string;
    }) => void;
    project_deleted: (data: {
        projectId: string;
        projectName?: string;
    }) => void;
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
    'user:subscription_updated': (data: {
        tier: SubscriptionTier;
        isTrialing?: boolean;
        trialEnd?: number | null;
        currentPeriodEnd?: number;
    }) => void;
    'customizer:asset_upload_progress': (data: {
        projectId: string;
        complete: boolean;
        uploaded: number;
        total: number;
        failed: number;
    }) => void;
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
        chatHistory?: Array<{
            role: string;
            content: string;
        }>;
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
    'fixing:sections': (data: {
        projectId: string;
        designId: string;
        sections: Array<{
            id: string;
            name: string;
            bounds: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            isGlobal: boolean;
        }>;
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
    'section_bounding:start': (data: {
        projectId: string;
    }) => void;
    'section_bounding:progress': (data: {
        projectId: string;
        percent: number;
        message: string;
    }) => void;
    'section_bounding:result': (data: {
        projectId: string;
        sections: Array<{
            id: string;
            name: string;
            type: 'navbar' | 'hero' | 'content' | 'footer' | 'other';
            bounds: {
                x: number;
                y: number;
                width: number;
                height: number;
            };
            elementIds: string[];
            isGlobal: boolean;
            order: number;
            designId: string;
        }>;
    }) => void;
    'section_bounding:error': (data: {
        projectId: string;
        error: string;
    }) => void;
    'build_sections:request_screenshot': (data: {
        projectId: string;
        sectionId: string;
        bounds: {
            x: number;
            y: number;
            width: number;
            height: number;
        };
        designId: string;
        /** S3 URL for the big preview image (for frontend cropping) */
        bigPreviewUrl?: string;
        /** Dimensions of the big preview image */
        bigPreviewDimensions?: {
            width: number;
            height: number;
        };
        /** Original Figma frame dimensions (bounds are relative to this) */
        designDimensions?: {
            width: number;
            height: number;
        };
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
    'build_sections:error': (data: {
        projectId: string;
        error: string;
    }) => void;
    'assembly:start': (data: {
        projectId: string;
    }) => void;
    'assembly:progress': (data: {
        projectId: string;
        percent: number;
        message: string;
    }) => void;
    'assembly:stream': (data: {
        projectId: string;
        chunk: string;
        done: boolean;
    }) => void;
    'assembly:complete': (data: {
        projectId: string;
        structures: Record<string, string>;
        styles: string;
    }) => void;
    'assembly:error': (data: {
        projectId: string;
        error: string;
    }) => void;
}
/**
 * Socket data attached to each connection
 */
export interface SocketData {
    userId?: string;
    userEmail?: string;
    sessionId?: string;
    isAuthenticated?: boolean;
    isGuest?: boolean;
    figmaUserId?: string;
}
//# sourceMappingURL=socket-protocol.d.ts.map