"use strict";
// ============================================================================
// SHARED IDENTIFIERS
// Centralized path builders for S3, socket rooms, projects, and designs
// Single source of truth for all identifier construction (frontend + backend)
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ROOMS = exports.EXPORT_FILE_NAMES = exports.S3_KEYS = void 0;
exports.createS3Paths = createS3Paths;
exports.getExportFileName = getExportFileName;
// ==================== RAW S3 KEY GENERATORS ====================
// These return S3 keys WITHOUT the bucket URL prefix
// Used by backend S3Manager for upload/download operations
/**
 * Build S3 key for design file
 * @example S3_KEYS.design('proj1', 'design1', 'data', 'elements.json')
 * => 'projects/proj1/designs/design1/data/elements.json'
 */
exports.S3_KEYS = {
    /**
     * Design file key: projects/{projectId}/designs/{designId}/{subfolder?}/{file}
     */
    design: (projectId, designId, subfolder, fileName) => {
        const parts = ['projects', projectId, 'designs', designId];
        if (subfolder)
            parts.push(subfolder);
        parts.push(fileName);
        return parts.join('/');
    },
    /**
     * Project file key: projects/{projectId}/{subfolder?}/{file}
     */
    project: (projectId, subfolder, fileName) => {
        const parts = ['projects', projectId];
        if (subfolder)
            parts.push(subfolder);
        parts.push(fileName);
        return parts.join('/');
    },
    /**
     * Project folder prefix: projects/{projectId}/
     */
    projectFolder: (projectId) => `projects/${projectId}/`,
    /**
     * Design folder prefix: projects/{projectId}/designs/{designId}/{subfolder?}/
     */
    designFolder: (projectId, designId, subfolder) => {
        const parts = ['projects', projectId, 'designs', designId];
        if (subfolder)
            parts.push(subfolder);
        return parts.join('/') + '/';
    },
};
// ==================== URL BUILDERS ====================
// These return full URLs with the bucket domain prefix
// Used by frontend for download/display operations
/**
 * S3 URL builder for project assets
 * Uses environment variable with fallback for production bucket
 *
 * @param baseUrl - S3 bucket base URL (from env: NEXT_PUBLIC_S3_BUCKET_URL or S3_BUCKET_URL)
 */
function createS3Paths(baseUrl) {
    // Remove trailing slash if present
    const base = baseUrl.replace(/\/$/, '');
    return {
        /**
         * Get project base path
         * @example getProjectPath('abc123') => '/projects/abc123'
         */
        getProjectPath: (projectId) => `/projects/${projectId}`,
        /**
         * Get design base path
         * @example getDesignPath('abc123', 'def456') => '/projects/abc123/designs/def456'
         */
        getDesignPath: (projectId, designId) => `/projects/${projectId}/designs/${designId}`,
        /**
         * Get full URL for project export file
         * @example getExportUrl('abc123', 'def456', 'webflow-xscp.json')
         * => 'https://bucket.s3.amazonaws.com/projects/abc123/designs/def456/data/webflow-xscp.json'
         */
        getExportUrl: (projectId, designId, fileName) => `${base}/${exports.S3_KEYS.design(projectId, designId, 'data', fileName)}`,
        /**
         * Get full URL for project-level image (shared across all designs)
         * @example getProjectImageUrl('abc123', 'preview.png')
         * => 'https://bucket.s3.amazonaws.com/projects/abc123/images/preview.png'
         */
        getProjectImageUrl: (projectId, fileName) => `${base}/${exports.S3_KEYS.project(projectId, 'images', fileName)}`,
        /**
         * Get full URL for elements JSON
         * @example getElementsUrl('abc123', 'def456')
         */
        getElementsUrl: (projectId, designId) => `${base}/${exports.S3_KEYS.design(projectId, designId, 'data', 'elements.json')}`,
        /**
         * Get base URL
         */
        getBaseUrl: () => base,
    };
}
/**
 * Export file names by platform
 */
exports.EXPORT_FILE_NAMES = {
    webflow: 'webflow-xscp.json',
    bricks: 'bricks-template.json',
};
/**
 * Get export file name for a platform
 */
function getExportFileName(platform) {
    return exports.EXPORT_FILE_NAMES[platform] || null;
}
// ==================== SOCKET ROOM GENERATORS ====================
// Centralized room name generators to prevent typos and fragmentation
/**
 * Room name generators for Socket.IO rooms
 * Use these functions everywhere instead of manually constructing room strings
 */
exports.ROOMS = {
    /**
     * Frontend project room - for broadcasting project state updates to frontend clients
     * @example ROOMS.PROJECT('abc123') => 'project:abc123'
     */
    PROJECT: (projectId) => `project:${projectId}`,
    /**
     * Plugin project room - for broadcasting plugin-specific events (images, composites, etc.)
     * @example ROOMS.PLUGIN('abc123') => 'project:plugin:abc123'
     */
    PLUGIN: (projectId) => `project:plugin:${projectId}`,
    /**
     * Frontend user room - for user-specific broadcasts (notifications, auth updates)
     * @example ROOMS.FRONTEND_USER('user456') => 'frontend:user456'
     */
    FRONTEND_USER: (userId) => `frontend:${userId}`,
    /**
     * User room - for general user broadcasts
     * @example ROOMS.USER('user456') => 'user:user456'
     */
    USER: (userId) => `user:${userId}`,
};
