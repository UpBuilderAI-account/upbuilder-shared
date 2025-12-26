// ============================================================================
// SHARED IDENTIFIERS
// Centralized path builders for S3, socket rooms, projects, and designs
// Single source of truth for all identifier construction (frontend + backend)
// ============================================================================

// ==================== RAW S3 KEY GENERATORS ====================
// These return S3 keys WITHOUT the bucket URL prefix
// Used by backend S3Manager for upload/download operations

/**
 * Build S3 key for design file
 * @example S3_KEYS.design('proj1', 'design1', 'data', 'elements.json')
 * => 'projects/proj1/designs/design1/data/elements.json'
 */
export const S3_KEYS = {
  /**
   * Design file key: projects/{projectId}/designs/{designId}/{subfolder?}/{file}
   */
  design: (projectId: string, designId: string, subfolder: string | undefined, fileName: string): string => {
    const parts = ['projects', projectId, 'designs', designId];
    if (subfolder) parts.push(subfolder);
    parts.push(fileName);
    return parts.join('/');
  },

  /**
   * Project file key: projects/{projectId}/{subfolder?}/{file}
   */
  project: (projectId: string, subfolder: string | undefined, fileName: string): string => {
    const parts = ['projects', projectId];
    if (subfolder) parts.push(subfolder);
    parts.push(fileName);
    return parts.join('/');
  },

  /**
   * Project folder prefix: projects/{projectId}/
   */
  projectFolder: (projectId: string): string => `projects/${projectId}/`,

  /**
   * Design folder prefix: projects/{projectId}/designs/{designId}/{subfolder?}/
   */
  designFolder: (projectId: string, designId: string, subfolder?: string): string => {
    const parts = ['projects', projectId, 'designs', designId];
    if (subfolder) parts.push(subfolder);
    return parts.join('/') + '/';
  },
} as const;

// ==================== URL BUILDERS ====================
// These return full URLs with the bucket domain prefix
// Used by frontend for download/display operations

/**
 * S3 URL builder for project assets
 * Uses environment variable with fallback for production bucket
 *
 * @param baseUrl - S3 bucket base URL (from env: NEXT_PUBLIC_S3_BUCKET_URL or S3_BUCKET_URL)
 */
export function createS3Paths(baseUrl: string) {
  // Remove trailing slash if present
  const base = baseUrl.replace(/\/$/, '');

  return {
    /**
     * Get project base path
     * @example getProjectPath('abc123') => '/projects/abc123'
     */
    getProjectPath: (projectId: string) => `/projects/${projectId}`,

    /**
     * Get design base path
     * @example getDesignPath('abc123', 'def456') => '/projects/abc123/designs/def456'
     */
    getDesignPath: (projectId: string, designId: string) =>
      `/projects/${projectId}/designs/${designId}`,

    /**
     * Get full URL for project export file
     * @example getExportUrl('abc123', 'def456', 'webflow-xscp.json')
     * => 'https://bucket.s3.amazonaws.com/projects/abc123/designs/def456/data/webflow-xscp.json'
     */
    getExportUrl: (projectId: string, designId: string, fileName: string) =>
      `${base}/${S3_KEYS.design(projectId, designId, 'data', fileName)}`,

    /**
     * Get full URL for project-level image (shared across all designs)
     * @example getProjectImageUrl('abc123', 'preview.png')
     * => 'https://bucket.s3.amazonaws.com/projects/abc123/images/preview.png'
     */
    getProjectImageUrl: (projectId: string, fileName: string) =>
      `${base}/${S3_KEYS.project(projectId, 'images', fileName)}`,

    /**
     * Get full URL for elements JSON
     * @example getElementsUrl('abc123', 'def456')
     */
    getElementsUrl: (projectId: string, designId: string) =>
      `${base}/${S3_KEYS.design(projectId, designId, 'data', 'elements.json')}`,

    /**
     * Get base URL
     */
    getBaseUrl: () => base,
  };
}

/**
 * Export file names by platform
 */
export const EXPORT_FILE_NAMES = {
  webflow: 'webflow-xscp.json',
  bricks: 'bricks-template.json',
} as const;

export type ExportPlatform = keyof typeof EXPORT_FILE_NAMES;

/**
 * Get export file name for a platform
 */
export function getExportFileName(platform: string): string | null {
  return EXPORT_FILE_NAMES[platform as ExportPlatform] || null;
}

// ==================== SOCKET ROOM GENERATORS ====================
// Centralized room name generators to prevent typos and fragmentation

/**
 * Room name generators for Socket.IO rooms
 * Use these functions everywhere instead of manually constructing room strings
 */
export const ROOMS = {
  /**
   * Frontend project room - for broadcasting project state updates to frontend clients
   * @example ROOMS.PROJECT('abc123') => 'project:abc123'
   */
  PROJECT: (projectId: string) => `project:${projectId}` as const,

  /**
   * Plugin project room - for broadcasting plugin-specific events (images, composites, etc.)
   * @example ROOMS.PLUGIN('abc123') => 'project:plugin:abc123'
   */
  PLUGIN: (projectId: string) => `project:plugin:${projectId}` as const,

  /**
   * Frontend user room - for user-specific broadcasts (notifications, auth updates)
   * @example ROOMS.FRONTEND_USER('user456') => 'frontend:user456'
   */
  FRONTEND_USER: (userId: string) => `frontend:${userId}` as const,

  /**
   * User room - for general user broadcasts
   * @example ROOMS.USER('user456') => 'user:user456'
   */
  USER: (userId: string) => `user:${userId}` as const,
} as const;

/**
 * Type helper for room names
 */
export type RoomName = ReturnType<typeof ROOMS[keyof typeof ROOMS]>;
