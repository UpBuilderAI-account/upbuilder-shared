"use strict";
// ============================================================================
// GITHUB SYNC TYPES
// Types and constants for GitHub sync feature
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.GITHUB_SYNC_LIMITS = void 0;
/**
 * Sync limits to prevent abuse
 */
exports.GITHUB_SYNC_LIMITS = {
    maxDesigns: 5,
    maxSectionsPerDesign: 20,
    maxSharedSections: 10,
    maxAssets: 50,
    maxHtmlFileSize: 100 * 1024, // 100KB
    maxCssFileSize: 500 * 1024, // 500KB
    maxJsFileSize: 200 * 1024, // 200KB
    maxAssetFileSize: 2 * 1024 * 1024, // 2MB
};
