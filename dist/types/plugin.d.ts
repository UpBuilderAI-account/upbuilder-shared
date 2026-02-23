import type { User, AuthStatus, Dimensions } from './core-domain';
import type { Element, ColorRGBA, FigmaColorVariable, FigmaVariableCollection } from './element';
import type { ComplexHierarchyDetection } from './complex-hierarchy';
import type { OutsideElementsDetectedData, OutsidePreviewData } from './outside-elements';
/**
 * Border styling
 */
export interface BorderData {
    color: ColorRGBA;
    width: number;
    originalIndex: number;
}
/**
 * Unified frame data for UI and processing
 * Replaces PluginFrameData and FrameMetadata
 */
export interface FrameData {
    id: string;
    name: string;
    width: number;
    height: number;
    nodeCount?: number;
    imageCount?: number;
    index?: number;
    previewUrl?: string;
    hasBackground?: boolean;
    autoLayoutCoverage?: number;
}
/**
 * Preview image data
 */
export interface PreviewData {
    data: string;
    frameName: string;
    width: number;
    height: number;
}
/**
 * Small preview (720px max) for thumbnails/featured images
 * Stored in S3 for dashboard display
 */
export interface SmallPreview {
    data: string;
    previewWidth: number;
    previewHeight: number;
    scale: number;
    originalWidth: number;
    originalHeight: number;
}
/**
 * Big preview (8K max) for AI analysis
 * Uploaded to Google AI Files API for use in prompts
 */
export interface BigPreview {
    data: string;
    width: number;
    height: number;
    originalWidth: number;
    originalHeight: number;
    scale: number;
}
/**
 * @deprecated Use SmallPreview instead. Kept for backward compatibility.
 */
export type FramePreview = SmallPreview;
/**
 * Node that owns an image
 */
export interface ImageNode {
    nodeId: string;
    figmaId: string;
    nodeName: string;
    designId: string;
}
/**
 * Image pair sent from plugin to backend
 * Contains labeled + original images with ownership info
 * Images are globally deduplicated - each unique image sent once with ALL nodes from ALL designs
 */
export interface ImagePair {
    labeledData: string;
    labeledLabel: number;
    originalData: string;
    originalLabel: number;
    nodes: ImageNode[];
}
/**
 * Plugin UI processing stages (for plugin interface state)
 * Separate from backend workflow ProcessingStage
 */
export type PluginUIStage = 'idle' | 'selecting' | 'loading' | 'analyzing' | 'extracting' | 'uploading' | 'processing' | 'upload-complete' | 'building' | 'exporting' | 'reviewing' | 'complete' | 'error';
/**
 * Messages from plugin backend → plugin UI
 * (Internal Figma plugin communication, not WebSocket)
 */
/**
 * Figma user info from figma.currentUser
 */
export interface FigmaUserInfo {
    id: string | null;
    name: string | null;
    sessionId: number | null;
}
export type PluginBackendMessage = {
    type: 'plugin-ready';
    data: {
        version: string;
        figmaFileName?: string;
        pluginToken?: string;
        figmaUser?: FigmaUserInfo;
    };
} | {
    type: 'auth-status';
    data: AuthStatus;
} | {
    type: 'session-expired';
    data: {
        message: string;
    };
} | {
    type: 'frame-selected';
    data: FrameData;
} | {
    type: 'current-selection-detected';
    data: FrameData;
} | {
    type: 'selection-error';
    data: {
        message: string;
        nodeType?: string;
    };
} | {
    type: 'selection-cleared';
    data: Record<string, never>;
} | {
    type: 'frame-oversized';
    data: {
        name: string;
        width: number;
        height: number;
    };
} | {
    type: 'nodes-extracted';
    data: PluginNodesData;
} | {
    type: 'images-extracted';
    data: PluginImagesData;
} | {
    type: 'design-images-extracted';
    data: PluginImagesData & {
        frameIndex: number;
        designId: string;
        isGlobalDedup?: boolean;
    };
} | {
    type: 'design-images-batch';
    data: PluginImagesBatchData;
} | {
    type: 'progress-update';
    data: PluginProgressData;
} | {
    type: 'recent-projects-saved';
    data: {
        success: boolean;
        requestId?: number;
    };
} | {
    type: 'recent-projects-loaded';
    data: {
        success: boolean;
        projects: RecentProject[];
        requestId?: number;
    };
} | {
    type: 'error';
    data: PluginErrorData;
} | {
    type: 'complex-hierarchy-detected';
    data: ComplexHierarchyDetectedData;
} | {
    type: 'complex-hierarchy-frame-progress';
    data: {
        frameId: string;
        detectionCount: number;
        status: 'detecting' | 'complete';
    };
} | {
    type: 'full-preview-ready';
    data: FullPreviewData;
} | {
    type: 'outside-elements-detected';
    data: OutsideElementsDetectedData;
} | {
    type: 'outside-preview-ready';
    data: OutsidePreviewData;
} | {
    type: 'ai-image-review-approved';
    data: {
        count: number;
    };
} | {
    type: 'image-review-thumbnails-ready';
    data: {
        thumbnails: Array<{
            nodeId: string;
            thumbnailUrl: string;
            width: number;
            height: number;
        }>;
    };
} | {
    type: 'ai-scan-progress';
    data: {
        current: number;
        total: number;
    };
} | {
    type: 'ai-scan-data-ready';
    data: AIScanDataReadyPayload;
} | {
    type: 'ai-approved-nodes-set';
    data: {
        count: number;
    };
} | {
    type: 'group-thumbnail-ready';
    data: {
        groupKey: string;
        thumbnailUrl: string;
        width: number;
        height: number;
    };
} | {
    type: 'geometry-measured';
    data: {
        requestId: string;
        success: boolean;
        measurements: Array<{
            commandType: string;
            nodeIds: string[];
            data: any;
            error?: string;
        }>;
    };
};
/**
 * Messages from plugin UI → plugin backend
 * (Internal Figma plugin communication, not WebSocket)
 */
export type PluginFrontendMessage = {
    type: 'check-auth';
} | {
    type: 'get-plugin-info';
} | {
    type: 'check-current-selection';
} | {
    type: 'accept-detected-frame';
    data: {
        frameId: string;
    };
} | {
    type: 'login';
    data: {
        token: string;
        user: User;
    };
} | {
    type: 'logout';
} | {
    type: 'open-external';
    data: {
        url: string;
    };
} | {
    type: 'select-frame';
    data: {
        frameId: string;
    };
} | {
    type: 'enable-frame-selection';
    data: {
        enabled: boolean;
    };
} | {
    type: 'cancel-frame-preview';
    data: {
        frameId: string;
    };
} | {
    type: 'extract-nodes';
    data: {
        frameIds: string[];
        maxDimension?: number;
        fastMode?: boolean;
    };
} | {
    type: 'extract-images';
    data: {
        projectId: string;
        designId: string;
    };
} | {
    type: 'extract-images-for-design';
    data: {
        projectId: string;
        designId: string;
        frameIndex: number;
        isLastDesign: boolean;
    };
} | {
    type: 'extract-all-images';
    data: {
        projectId: string;
        frameToDesignMap: Record<number, string>;
    };
} | {
    type: 'save-recent-projects';
    data: {
        projects: RecentProject[];
        requestId?: number;
    };
} | {
    type: 'load-recent-projects';
    data: {
        requestId?: number;
    };
} | {
    type: 'scan-complex-hierarchies';
    data: {
        frameIds: string[];
    };
} | {
    type: 'complex-hierarchy-approval';
    data: {
        approvedNodeIds: string[];
        excludedNodeIds: string[];
    };
} | {
    type: 'request-full-preview';
    data: {
        nodeId: string;
    };
} | {
    type: 'scroll-to-node';
    data: {
        nodeId: string;
    };
} | {
    type: 'scan-outside-elements';
    data: {
        frameIds: string[];
    };
} | {
    type: 'outside-elements-approval';
    data: {
        includedNodeIds: string[];
        excludedNodeIds: string[];
    };
} | {
    type: 'request-outside-preview';
    data: {
        nodeId: string;
        parentFrameId: string;
    };
} | {
    type: 'ai-image-review-approval';
    data: {
        confirmedNodeIds: string[];
    };
} | {
    type: 'request-image-review-thumbnails';
    data: {
        nodeIds: string[];
    };
} | {
    type: 'scan-ai-images';
    data: {
        frameIds: string[];
        fastMode?: boolean;
    };
} | {
    type: 'set-ai-approved-nodes';
    data: {
        nodeIds: string[];
        groups?: Array<{
            nodeIds: string[];
        }>;
    };
} | {
    type: 'request-group-thumbnail';
    data: {
        groupKey: string;
        nodeIds: string[];
    };
} | {
    type: 'measure-geometry';
    data: {
        requestId: string;
        commands: Array<{
            type: string;
            nodeIds: string[];
        }>;
    };
};
/**
 * Nodes extraction result (plugin UI wrapper)
 */
export interface PluginNodesData {
    nodes: Element[];
    imageCount: number;
    frameId: string;
    frames?: FrameData[];
    totalFrames?: number;
    smallPreviews?: Record<number, SmallPreview>;
    bigPreviews?: Record<number, BigPreview>;
    framePreviews?: Record<number, SmallPreview>;
    /** Figma color variables extracted from the design */
    variables?: FigmaColorVariable[];
    /** Figma variable collections metadata */
    variableCollections?: FigmaVariableCollection[];
}
/**
 * Image extraction result (plugin UI wrapper)
 */
export interface PluginImagesData {
    images: ImagePair[];
    frameId: string;
    smallPreview?: SmallPreview;
    /** @deprecated Use smallPreview instead */
    framePreview?: SmallPreview;
}
/**
 * Image batch data for chunked transfer (plugin → frontend)
 * Used to send images in ~5MB batches to prevent UI freezing
 */
export interface PluginImagesBatchData {
    images: ImagePair[];
    batchIndex: number;
    totalBatches: number;
    designId: string;
    frameIndex: number;
    isLastBatch: boolean;
}
/**
 * Progress update data (plugin UI)
 */
export interface PluginProgressData {
    stage: PluginUIStage;
    message: string;
    progress?: number;
}
/**
 * Error data (plugin UI)
 */
export interface PluginErrorData {
    message: string;
    code?: string;
    details?: Record<string, unknown>;
}
/**
 * Project processing status for resume functionality
 */
export type ProjectProcessingStatus = 'processing' | 'complete' | 'failed' | 'canceled';
/**
 * Recent project data (stored in plugin storage)
 */
export interface RecentProject {
    id: string;
    name: string;
    url: string;
    previewUrl?: string;
    createdAt: number;
    frameName?: string;
    frameDimensions?: Dimensions;
    projectId?: string;
    status?: ProjectProcessingStatus;
    currentStage?: string;
    progress?: number;
    lastActiveAt?: number;
    platform?: string;
    designCount?: number;
    errorMessage?: string;
    sessionId?: string;
    designs?: Array<{
        tempDesignId: string;
        designName: string;
        thumbnail?: string;
    }>;
}
/**
 * Plugin authentication payload stored during OAuth flow
 * This is the data written to the key-pair store during browser auth
 * and read by the plugin to complete authentication
 */
export interface PluginAuthPayload {
    token: string;
    user: {
        id: string;
        name?: string;
        email: string;
        subscription: {
            tier: 'basic' | 'pro' | 'max';
        };
    };
    timestamp: number;
}
/**
 * Data for complex hierarchy detection message
 */
export interface ComplexHierarchyDetectedData {
    detections: ComplexHierarchyDetection[];
    frameId: string;
    frameName: string;
    totalFrames: number;
}
/**
 * Data for full preview response
 */
export interface FullPreviewData {
    nodeId: string;
    imageData: string;
    width: number;
    height: number;
    nodeName: string;
}
/**
 * Data for AI scan (pre-export phase)
 * Contains frame previews and lightweight node data for AI analysis
 */
export interface AIScanFrameData {
    frameId: string;
    frameName: string;
    frameIndex: number;
    bigPreview: {
        data: string;
        width: number;
        height: number;
    } | null;
    nodes: Element[];
}
export interface AIScanDataReadyPayload {
    frames: AIScanFrameData[];
    totalFrames: number;
    fastMode?: boolean;
}
//# sourceMappingURL=plugin.d.ts.map