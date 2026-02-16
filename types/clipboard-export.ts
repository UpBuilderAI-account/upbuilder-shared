// ============================================================================
// CLIPBOARD EXPORT TYPES
// Schema for JSON blob copied from plugin → pasted in frontend Code panel
// ============================================================================

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
export function validateClipboardExportData(data: unknown): string | null {
  if (!data || typeof data !== 'object') {
    return 'Invalid format. Please copy from Figma plugin.';
  }

  const obj = data as Record<string, unknown>;

  if (!obj.projectId || typeof obj.projectId !== 'string') {
    return 'Missing project ID. Please re-export from Figma plugin.';
  }

  if (!Array.isArray(obj.designs) || obj.designs.length === 0) {
    return 'No designs found in export.';
  }

  for (const design of obj.designs) {
    if (!design.designId || !design.designName) {
      return 'Invalid design data.';
    }
  }

  return null;
}
