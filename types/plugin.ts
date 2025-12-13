// ============================================================================
// PLUGIN TYPES
// Figma plugin data structures for nodes and images
// ============================================================================

import type { User, AuthStatus, Dimensions } from './core-domain';
import type {
  Element,
  ColorRGBA
} from './element';

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
  index?: number; // Frame index for processing order
  previewUrl?: string; // Base64 preview image for UI
}

// FrameMetadata and PluginFrameData aliases removed - use FrameData directly

/**
 * Preview image data
 */
export interface PreviewData {
  data: string; // base64
  frameName: string;
  width: number;
  height: number;
}

/**
 * Frame preview with scaling info
 */
export interface FramePreview {
  data: string; // base64
  previewWidth: number;
  previewHeight: number;
  scale: number;
  originalWidth: number;
  originalHeight: number;
}

/**
 * Node that owns an image
 */
export interface ImageNode {
  nodeId: string;    // "n123"
  figmaId: string;   // "456:789"
  nodeName: string;  // "Background Image"
  designId: string;  // "design-uuid" - which design this node belongs to
}

/**
 * Image pair sent from plugin to backend
 * Contains labeled + original images with ownership info
 * Images are globally deduplicated - each unique image sent once with ALL nodes from ALL designs
 */
export interface ImagePair {
  // Labeled image (with gray overlay + number)
  labeledData: string;   // base64
  labeledLabel: number;  // GLOBAL label across all designs

  // Original image (no overlay)
  originalData: string;  // base64
  originalLabel: number; // Same as labeledLabel

  // ALL nodes that use this image (from ANY design)
  nodes: ImageNode[];
}

/**
 * Plugin UI processing stages (for plugin interface state)
 * Separate from backend workflow ProcessingStage
 */
export type PluginUIStage =
  | 'idle'
  | 'selecting'
  | 'loading'
  | 'analyzing'
  | 'extracting'
  | 'uploading'
  | 'processing'
  | 'building'
  | 'exporting'
  | 'reviewing'
  | 'complete'
  | 'error';

// ============================================================================
// PLUGIN INTERNAL COMMUNICATION TYPES
// Types for plugin UI ↔ plugin backend messaging (within Figma)
// ============================================================================

/**
 * Messages from plugin backend → plugin UI
 * (Internal Figma plugin communication, not WebSocket)
 */
export type PluginBackendMessage =
  | { type: 'plugin-ready'; data: { version: string; figmaFileName?: string } }
  | { type: 'auth-status'; data: AuthStatus }
  | { type: 'session-expired'; data: { message: string } }
  | { type: 'frame-selected'; data: FrameData }
  | { type: 'selection-error'; data: { message: string; nodeType?: string } }
  | { type: 'nodes-extracted'; data: PluginNodesData }
  | { type: 'images-extracted'; data: PluginImagesData }
  | { type: 'design-images-extracted'; data: PluginImagesData & { frameIndex: number; designId: string; isGlobalDedup?: boolean } }
  | { type: 'progress-update'; data: PluginProgressData }
  | { type: 'recent-projects-saved'; data: { success: boolean } }
  | { type: 'recent-projects-loaded'; data: { success: boolean; projects: RecentProject[] } }
  | { type: 'error'; data: PluginErrorData };

/**
 * Messages from plugin UI → plugin backend
 * (Internal Figma plugin communication, not WebSocket)
 */
export type PluginFrontendMessage =
  | { type: 'check-auth' }
  | { type: 'get-plugin-info' }
  | { type: 'login'; data: { token: string; user: User } }
  | { type: 'logout' }
  | { type: 'open-external'; data: { url: string } }
  | { type: 'select-frame'; data: { frameId: string } }
  | { type: 'enable-frame-selection'; data: { enabled: boolean } }
  | { type: 'cancel-frame-preview'; data: { frameId: string } }
  | { type: 'extract-nodes'; data: { frameIds: string[] } }
  | { type: 'extract-images'; data: { projectId: string; designId: string } }
  | { type: 'extract-images-for-design'; data: { projectId: string; designId: string; frameIndex: number; isLastDesign: boolean } }
  | { type: 'extract-all-images'; data: { projectId: string; frameToDesignMap: Record<number, string> } }
  | { type: 'save-recent-projects'; data: { projects: RecentProject[] } }
  | { type: 'load-recent-projects'; data: {} };

// ============================================================================
// PLUGIN UI DATA STRUCTURES
// Data structures used within plugin for UI state management
// ============================================================================

/**
 * Nodes extraction result (plugin UI wrapper)
 */
export interface PluginNodesData {
  nodes: Element[];
  imageCount: number;
  frameId: string;
  // Multi-design support
  frames?: FrameData[];
  totalFrames?: number;
  // Frame previews by frame index (sent with send_nodes for immediate upload)
  framePreviews?: Record<number, FramePreview>;
}

/**
 * Image extraction result (plugin UI wrapper)
 */
export interface PluginImagesData {
  images: ImagePair[];
  frameId: string;
  framePreview?: FramePreview;
}

/**
 * Progress update data (plugin UI)
 */
export interface PluginProgressData {
  stage: PluginUIStage;
  message: string;
  progress?: number; // 0-100
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
 * Recent project data (stored in plugin storage)
 */
export interface RecentProject {
  id: string;
  name: string;
  url: string;
  previewUrl?: string; // S3 URL to preview image
  createdAt: number;
  frameName?: string;
  frameDimensions?: Dimensions;
}

// ============================================================================
// PLUGIN AUTHENTICATION PAYLOAD
// Data structure for plugin OAuth token storage
// ============================================================================

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
      tier: 'free' | 'pro' | 'enterprise';
    };
  };
  timestamp: number;
}
