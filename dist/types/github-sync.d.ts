/**
 * Sync limits to prevent abuse
 */
export declare const GITHUB_SYNC_LIMITS: {
    readonly maxDesigns: 20;
    readonly maxSectionsPerDesign: 50;
    readonly maxSharedSections: 10;
    readonly maxAssets: 50;
    readonly maxHtmlFileSize: number;
    readonly maxCssFileSize: number;
    readonly maxJsFileSize: number;
    readonly maxAssetFileSize: number;
};
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
//# sourceMappingURL=github-sync.d.ts.map