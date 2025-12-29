// ============================================================================
// GITHUB SYNC TYPES
// Types and constants for GitHub sync feature
// ============================================================================

/**
 * Allowed file extensions
 */
export const GITHUB_ALLOWED_EXTENSIONS = {
  // Only PNG and JPG images allowed
  images: ['.png', '.jpg', '.jpeg'],
  // Code files
  code: ['.html', '.css', '.js'],
} as const;

/**
 * Sync limits to prevent abuse - matches Pro tier
 */
export const GITHUB_SYNC_LIMITS = {
  // Pro tier limits
  maxDesigns: 10,
  maxSectionsPerDesign: 20,
  maxSharedSections: 10,
  maxAssets: 50,

  // File size limits
  maxHtmlFileSize: 100 * 1024,       // 100KB
  maxCssFileSize: 500 * 1024,        // 500KB
  maxJsFileSize: 100 * 1024,         // 100KB
  maxAssetFileSize: 2 * 1024 * 1024, // 2MB

  // Rate limiting
  maxSyncsPerHour: 10,
  maxPushesPerDay: 50,

  // Name limits
  maxNameLength: 50,

  // Sync lock timeout
  syncLockTimeoutMs: 5 * 60 * 1000, // 5 minutes
} as const;

/**
 * Reserved folder/file names that cannot be used as section names
 */
export const GITHUB_RESERVED_NAMES = [
  'assets',
  'globals',
  'designs',
  'node_modules',
  '.git',
  '.github',
  'con', 'prn', 'aux', 'nul', // Windows reserved
  'com1', 'com2', 'com3', 'com4',
  'lpt1', 'lpt2', 'lpt3', 'lpt4',
] as const;

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
 * Each section can have HTML, CSS, and JS files
 */
export interface GitHubParsedSection {
  name: string;
  fileName: string;    // The .html filename
  content: string;     // HTML content
  css?: string;        // CSS content (optional, from {section}.css file)
  js?: string;         // JS content (optional, from {section}.js file)
  size: number;        // HTML file size
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

// ============================================================================
// ENHANCED SYNC TYPES
// ============================================================================

/**
 * Sync mode - controls how new/deleted items are handled
 */
export type GitHubSyncMode =
  | 'update_only'  // Only update existing items (safest)
  | 'add_new';     // Update existing + add new items (requires approval)

/**
 * Pending changes detected from GitHub (for approval modal)
 */
export interface GitHubSyncPendingChanges {
  // Items that will be updated (no approval needed)
  modified: {
    sections: Array<{ designName: string; sectionName: string }>;
    globalSections: string[];
    assets: string[];
    stylesheet: boolean;
  };

  // NEW items that need approval
  newItems: {
    designs: string[];
    sections: Array<{ designName: string; sectionName: string }>;
    globalSections: string[];
    assets: string[];
  };

  // Validation warnings (non-blocking)
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
  duration?: number; // milliseconds
}

/**
 * Asset validation result
 */
export interface AssetValidationResult {
  valid: boolean;
  error?: string;
  sanitizedName?: string; // Name after sanitization
}

/**
 * Content sanitization result
 */
export interface ContentSanitizationResult {
  content: string;
  wasModified: boolean;
  removedItems?: string[]; // e.g., ["script tag", "javascript: URL"]
}
