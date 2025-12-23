// ============================================================================
// GITHUB SYNC TYPES
// Types and constants for GitHub sync feature
// ============================================================================

/**
 * Sync limits to prevent abuse
 */
export const GITHUB_SYNC_LIMITS = {
  maxDesigns: 20,
  maxSectionsPerDesign: 50,
  maxSharedSections: 10,
  maxAssets: 50,
  maxHtmlFileSize: 100 * 1024,       // 100KB
  maxCssFileSize: 500 * 1024,        // 500KB
  maxJsFileSize: 200 * 1024,         // 200KB
  maxAssetFileSize: 2 * 1024 * 1024, // 2MB
} as const;

/**
 * Sync step identifiers
 */
export type GitHubSyncStep =
  | 'fetching'
  | 'analyzing'
  | 'validating'
  | 'updating_sections'
  | 'updating_globals'
  | 'updating_assets'
  | 'finalizing'
  | 'complete'
  | 'error';

/**
 * Progress update sent during sync
 */
export interface GitHubSyncProgress {
  step: GitHubSyncStep;
  progress: number; // 0-100
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
 */
export interface GitHubParsedSection {
  name: string;
  fileName: string;
  content: string;
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
