/**
 * Design info included in clipboard export.
 * Minimal data: just ID, name, and base64 thumbnail for preview.
 */
export interface ClipboardExportDesign {
    designId: string;
    designName: string;
    /** Base64 preview thumbnail */
    thumbnail?: string;
}
/**
 * JSON blob copied to clipboard after plugin export.
 * Kept minimal - just project ID and design list.
 * @deprecated Use SessionClipboardExportData instead (temp-only export)
 */
export interface ClipboardExportData {
    /** Project ID in database */
    projectId: string;
    /** Designs available for processing */
    designs: ClipboardExportDesign[];
}
/**
 * Design info for session-based export (temp-only).
 * Uses tempDesignId instead of real designId.
 */
export interface SessionClipboardDesign {
    /** Temporary design ID (e.g., "temp-0-123456") - maps to temp S3 path */
    tempDesignId: string;
    /** Human-readable design name (from Figma frame) */
    designName: string;
    /** Base64 preview thumbnail for UI display */
    thumbnail?: string;
}
/**
 * Session-based clipboard export data (temp-only export).
 * No project is created in the database until the user imports in the frontend.
 * Files are stored in temp/{sessionId}/designs/{tempDesignId}/ until import.
 */
export interface SessionClipboardExportData {
    /** Session ID for temp storage lookup */
    sessionId: string;
    /** Designs stored in temp session */
    designs: SessionClipboardDesign[];
}
/**
 * Event emitted when a section file is generated during build.
 * Used to stream files to frontend as they complete.
 */
export interface FileGeneratedEvent {
    projectId: string;
    file: {
        /** Relative path, e.g., "src/sections/Hero/Hero.tsx" */
        path: string;
        /** Full file content */
        content: string;
        /** Section name for UI display */
        sectionName: string;
        /** File status: 'building' for in-progress, 'complete' for finished */
        status?: 'building' | 'complete';
    };
    progress: {
        completedFiles: number;
        totalFiles: number;
    };
}
/**
 * Validates if an object is a valid ClipboardExportData.
 * Returns an error message if invalid, or null if valid.
 * @deprecated Use validateSessionClipboardData for new session-based exports
 */
export declare function validateClipboardExportData(data: unknown): string | null;
/**
 * Validates if an object is a valid SessionClipboardExportData.
 * Returns an error message if invalid, or null if valid.
 */
export declare function validateSessionClipboardData(data: unknown): string | null;
/**
 * Detects the clipboard format and validates accordingly.
 * Returns { type, error } where type is 'session' | 'legacy' | null.
 */
export declare function detectClipboardFormat(data: unknown): {
    type: 'session' | 'legacy' | null;
    error: string | null;
};
//# sourceMappingURL=clipboard-export.d.ts.map