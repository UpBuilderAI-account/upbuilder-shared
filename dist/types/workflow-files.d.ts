/**
 * Status of a file during workflow processing
 */
export type WorkflowFileStatus = 'scaffold' | 'placeholder' | 'building' | 'complete';
/**
 * A file being tracked during workflow processing
 */
export interface WorkflowFile {
    /** Relative path, e.g., "src/sections/Hero/Hero.tsx" */
    path: string;
    /** File content (empty or placeholder for pending files) */
    content: string;
    /** Current processing status */
    status: WorkflowFileStatus;
    /** Section name for section files */
    sectionName?: string;
    /** Whether this is a global section (navbar, footer) */
    isGlobal?: boolean;
}
/**
 * Event emitted at workflow start with project scaffold files
 */
export interface FilesScaffoldEvent {
    projectId: string;
    /** Scaffold files: package.json, vite.config.ts, App.tsx, index.html, etc. */
    files: WorkflowFile[];
}
/**
 * Event emitted after section bounding with placeholder files
 */
export interface SectionPlaceholdersEvent {
    projectId: string;
    /** Section info for creating placeholder files */
    sections: Array<{
        name: string;
        displayName: string;
        path: string;
        isGlobal: boolean;
    }>;
}
/**
 * Event emitted when a file is generated/updated during build
 * (Reuses existing FileGeneratedEvent from clipboard-export.ts)
 */
export { FileGeneratedEvent } from './clipboard-export';
//# sourceMappingURL=workflow-files.d.ts.map