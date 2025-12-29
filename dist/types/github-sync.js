"use strict";
// ============================================================================
// GITHUB SYNC TYPES
// Types and constants for GitHub sync feature
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.GITHUB_RESERVED_NAMES = exports.GITHUB_SYNC_LIMITS = exports.GITHUB_ALLOWED_EXTENSIONS = void 0;
/**
 * Allowed file extensions
 */
exports.GITHUB_ALLOWED_EXTENSIONS = {
    // Only PNG and JPG images allowed
    images: ['.png', '.jpg', '.jpeg'],
    // Code files
    code: ['.html', '.css', '.js'],
};
/**
 * Sync limits to prevent abuse - matches Pro tier
 */
exports.GITHUB_SYNC_LIMITS = {
    // Pro tier limits
    maxDesigns: 10,
    maxSectionsPerDesign: 20,
    maxSharedSections: 10,
    maxAssets: 50,
    // File size limits
    maxHtmlFileSize: 100 * 1024, // 100KB
    maxCssFileSize: 500 * 1024, // 500KB
    maxJsFileSize: 100 * 1024, // 100KB
    maxAssetFileSize: 2 * 1024 * 1024, // 2MB
    // Rate limiting
    maxSyncsPerHour: 10,
    maxPushesPerDay: 50,
    // Name limits
    maxNameLength: 50,
    // Sync lock timeout
    syncLockTimeoutMs: 5 * 60 * 1000, // 5 minutes
};
/**
 * Reserved folder/file names that cannot be used as section names
 */
exports.GITHUB_RESERVED_NAMES = [
    'assets',
    'globals',
    'designs',
    'node_modules',
    '.git',
    '.github',
    'con', 'prn', 'aux', 'nul', // Windows reserved
    'com1', 'com2', 'com3', 'com4',
    'lpt1', 'lpt2', 'lpt3', 'lpt4',
];
