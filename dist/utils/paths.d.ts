/**
 * Build S3 key for design file
 * @example S3_KEYS.design('proj1', 'design1', 'data', 'elements.json')
 * => 'projects/proj1/designs/design1/data/elements.json'
 */
export declare const S3_KEYS: {
    /**
     * Design file key: projects/{projectId}/designs/{designId}/{subfolder?}/{file}
     */
    readonly design: (projectId: string, designId: string, subfolder: string | undefined, fileName: string) => string;
    /**
     * Project file key: projects/{projectId}/{subfolder?}/{file}
     */
    readonly project: (projectId: string, subfolder: string | undefined, fileName: string) => string;
    /**
     * Project folder prefix: projects/{projectId}/
     */
    readonly projectFolder: (projectId: string) => string;
    /**
     * Design folder prefix: projects/{projectId}/designs/{designId}/{subfolder?}/
     */
    readonly designFolder: (projectId: string, designId: string, subfolder?: string) => string;
};
/**
 * S3 URL builder for project assets
 * Uses environment variable with fallback for production bucket
 *
 * @param baseUrl - S3 bucket base URL (from env: NEXT_PUBLIC_S3_BUCKET_URL or S3_BUCKET_URL)
 */
export declare function createS3Paths(baseUrl: string): {
    /**
     * Get project base path
     * @example getProjectPath('abc123') => '/projects/abc123'
     */
    getProjectPath: (projectId: string) => string;
    /**
     * Get design base path
     * @example getDesignPath('abc123', 'def456') => '/projects/abc123/designs/def456'
     */
    getDesignPath: (projectId: string, designId: string) => string;
    /**
     * Get full URL for project export file
     * @example getExportUrl('abc123', 'def456', 'webflow-xscp.json')
     * => 'https://bucket.s3.amazonaws.com/projects/abc123/designs/def456/data/webflow-xscp.json'
     */
    getExportUrl: (projectId: string, designId: string, fileName: string) => string;
    /**
     * Get full URL for project-level image (shared across all designs)
     * @example getProjectImageUrl('abc123', 'preview.png')
     * => 'https://bucket.s3.amazonaws.com/projects/abc123/images/preview.png'
     */
    getProjectImageUrl: (projectId: string, fileName: string) => string;
    /**
     * Get full URL for elements JSON
     * @example getElementsUrl('abc123', 'def456')
     */
    getElementsUrl: (projectId: string, designId: string) => string;
    /**
     * Get base URL
     */
    getBaseUrl: () => string;
};
/**
 * Export file names by platform
 */
export declare const EXPORT_FILE_NAMES: {
    readonly webflow: "webflow-xscp.json";
    readonly bricks: "bricks-template.json";
};
export type ExportPlatform = keyof typeof EXPORT_FILE_NAMES;
/**
 * Get export file name for a platform
 */
export declare function getExportFileName(platform: string): string | null;
/**
 * Room name generators for Socket.IO rooms
 * Use these functions everywhere instead of manually constructing room strings
 */
export declare const ROOMS: {
    /**
     * Frontend project room - for broadcasting project state updates to frontend clients
     * @example ROOMS.PROJECT('abc123') => 'project:abc123'
     */
    readonly PROJECT: (projectId: string) => `project:${string}`;
    /**
     * Plugin project room - for broadcasting plugin-specific events (images, composites, etc.)
     * @example ROOMS.PLUGIN('abc123') => 'project:plugin:abc123'
     */
    readonly PLUGIN: (projectId: string) => `project:plugin:${string}`;
    /**
     * Frontend user room - for user-specific broadcasts (notifications, auth updates)
     * @example ROOMS.FRONTEND_USER('user456') => 'frontend:user456'
     */
    readonly FRONTEND_USER: (userId: string) => `frontend:${string}`;
    /**
     * User room - for general user broadcasts
     * @example ROOMS.USER('user456') => 'user:user456'
     */
    readonly USER: (userId: string) => `user:${string}`;
};
/**
 * Type helper for room names
 */
export type RoomName = ReturnType<typeof ROOMS[keyof typeof ROOMS]>;
//# sourceMappingURL=paths.d.ts.map