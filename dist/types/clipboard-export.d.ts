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
 */
export interface ClipboardExportData {
    /** Project ID in database */
    projectId: string;
    /** Designs available for processing */
    designs: ClipboardExportDesign[];
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
 */
export declare function validateClipboardExportData(data: unknown): string | null;
//# sourceMappingURL=clipboard-export.d.ts.map