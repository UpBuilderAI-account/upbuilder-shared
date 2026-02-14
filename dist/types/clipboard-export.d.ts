/**
 * Design info included in clipboard export.
 * Contains minimal data needed to display design cards and start processing.
 */
export interface ClipboardExportDesign {
    designId: string;
    designName: string;
    /** Small base64 preview thumbnail (optional) */
    thumbnail?: string;
    dimensions: {
        width: number;
        height: number;
    };
    nodeCount: number;
}
/**
 * JSON blob copied to clipboard after plugin export.
 * User pastes this into the Code panel to start processing.
 */
export interface ClipboardExportData {
    /** Schema version for future compatibility */
    version: 1;
    /** Project ID in database */
    projectId: string;
    /** Human-readable project name */
    projectName: string;
    /** Designs available for processing */
    designs: ClipboardExportDesign[];
    /** Target platform */
    platform: 'webflow' | 'react';
    /** ISO timestamp when export was created */
    createdAt: string;
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