/**
 * Allowed file extensions
 */
export declare const GITHUB_ALLOWED_EXTENSIONS: {
    readonly images: readonly [".png", ".jpg", ".jpeg"];
    readonly code: readonly [".html", ".css", ".js"];
};
/**
 * Sync limits to prevent abuse - matches Pro tier
 */
export declare const GITHUB_SYNC_LIMITS: {
    readonly maxDesigns: 10;
    readonly maxSectionsPerDesign: 20;
    readonly maxSharedSections: 10;
    readonly maxAssets: 1000;
    readonly maxHtmlFileSize: number;
    readonly maxCssFileSize: number;
    readonly maxJsFileSize: number;
    readonly maxTotalAssetSize: number;
    readonly maxNameLength: 50;
    readonly syncLockTimeoutMs: number;
};
/**
 * Reserved folder/file names that cannot be used as section names
 */
export declare const GITHUB_RESERVED_NAMES: readonly ["assets", "globals", "designs", "node_modules", ".git", ".github", "con", "prn", "aux", "nul", "com1", "com2", "com3", "com4", "lpt1", "lpt2", "lpt3", "lpt4"];
/**
 * Sync step identifiers
 */
export type GitHubSyncStep = 'fetching' | 'analyzing' | 'validating' | 'updating_sections' | 'updating_globals' | 'updating_assets' | 'finalizing' | 'complete' | 'error';
/**
 * Progress update sent during sync
 */
export interface GitHubSyncProgress {
    step: GitHubSyncStep;
    progress: number;
    message: string;
}
/**
 * Error types for sync validation
 */
export type GitHubSyncErrorType = 'structure' | 'limit' | 'file' | 'permission' | 'network';
/**
 * Sync error details
 */
export interface GitHubSyncError {
    type: GitHubSyncErrorType;
    message: string;
    path?: string;
    details?: {
        found?: number;
        max?: number;
    };
}
/**
 * Final sync result
 */
export interface GitHubSyncResult {
    success: boolean;
    designsUpdated: number;
    sectionsUpdated: number;
    globalsUpdated: number;
    assetsUpdated: number;
    errors?: GitHubSyncError[];
}
/**
 * Parsed section from GitHub
 * Each section can have HTML, CSS, and JS files
 */
export interface GitHubParsedSection {
    name: string;
    fileName: string;
    content: string;
    css?: string;
    js?: string;
    size: number;
}
/**
 * Parsed design from GitHub
 */
export interface GitHubParsedDesign {
    name: string;
    folderName: string;
    sections: GitHubParsedSection[];
}
/**
 * Parsed globals from GitHub
 */
export interface GitHubParsedGlobals {
    styles?: {
        content: string;
        size: number;
    };
    scripts?: {
        content: string;
        size: number;
    };
    shared: GitHubParsedSection[];
}
/**
 * Parsed asset from GitHub
 */
export interface GitHubParsedAsset {
    name: string;
    path: string;
    size: number;
    downloadUrl: string;
}
/**
 * Complete parsed repository structure
 */
export interface GitHubRepoStructure {
    designs: GitHubParsedDesign[];
    globals: GitHubParsedGlobals;
    assets: GitHubParsedAsset[];
}
/**
 * Request payload for sync start
 */
export interface GitHubSyncStartPayload {
    userId: string;
    projectId: string;
}
/**
 * Callback response for sync start
 */
export interface GitHubSyncStartResponse {
    success: boolean;
    error?: string;
}
/**
 * Sync mode - controls how new/deleted items are handled
 */
export type GitHubSyncMode = 'update_only' | 'add_new';
/**
 * Pending changes detected from GitHub (for approval modal)
 */
export interface GitHubSyncPendingChanges {
    modified: {
        sections: Array<{
            designName: string;
            sectionName: string;
        }>;
        globalSections: string[];
        assets: string[];
        stylesheet: boolean;
    };
    newItems: {
        designs: string[];
        sections: Array<{
            designName: string;
            sectionName: string;
        }>;
        globalSections: string[];
        assets: string[];
    };
    warnings: GitHubSyncWarning[];
}
/**
 * Non-blocking warning during sync
 */
export interface GitHubSyncWarning {
    type: 'unused_asset' | 'name_truncated' | 'encoding_fixed' | 'content_sanitized';
    message: string;
    path?: string;
}
/**
 * Manifest file stored in repo root (.upbuilder.json)
 * Used to track IDs and prevent orphaning on rename
 */
export interface GitHubManifest {
    version: 1;
    projectId: string;
    platform: string;
    lastSyncedAt: string;
    designs: Record<string, {
        id: string;
        createdAt: string;
    }>;
    sections: Record<string, {
        id: string;
        globalId: string | null;
        createdAt: string;
    }>;
    globalSections: Record<string, {
        id: string;
        createdAt: string;
    }>;
}
/**
 * Sync lock to prevent concurrent syncs
 */
export interface GitHubSyncLock {
    projectId: string;
    userId: string;
    operation: 'push' | 'sync';
    startedAt: string;
    expiresAt: string;
}
/**
 * Rate limit tracking
 */
export interface GitHubRateLimitInfo {
    userId: string;
    syncsThisHour: number;
    pushesToday: number;
    hourResetAt: string;
    dayResetAt: string;
}
/**
 * Extended sync result with detailed info
 */
export interface GitHubSyncResultExtended extends GitHubSyncResult {
    warnings?: GitHubSyncWarning[];
    newItemsCreated?: {
        designs: number;
        sections: number;
        globalSections: number;
        assets: number;
    };
    duration?: number;
}
/**
 * Asset validation result
 */
export interface AssetValidationResult {
    valid: boolean;
    error?: string;
    sanitizedName?: string;
}
/**
 * Content sanitization result
 */
export interface ContentSanitizationResult {
    content: string;
    wasModified: boolean;
    removedItems?: string[];
}
//# sourceMappingURL=github-sync.d.ts.map