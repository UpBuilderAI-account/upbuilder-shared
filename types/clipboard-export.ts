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

/**
 * Validates if an object is a valid SessionClipboardExportData.
 * Returns an error message if invalid, or null if valid.
 */
export function validateSessionClipboardData(data: unknown): string | null {
  if (!data || typeof data !== 'object') {
    return 'Invalid format. Please copy from Figma plugin.';
  }

  const obj = data as Record<string, unknown>;

  if (!obj.sessionId || typeof obj.sessionId !== 'string') {
    return 'Missing session ID. Please re-export from Figma plugin.';
  }

  if (!Array.isArray(obj.designs) || obj.designs.length === 0) {
    return 'No designs found in export.';
  }

  for (const design of obj.designs) {
    if (!design.tempDesignId || !design.designName) {
      return 'Invalid design data.';
    }
  }

  return null;
}

/**
 * Detects the clipboard format and validates accordingly.
 * Returns { type, error } where type is 'session' | 'legacy' | null.
 */
export function detectClipboardFormat(data: unknown): {
  type: 'session' | 'legacy' | null;
  error: string | null;
} {
  if (!data || typeof data !== 'object') {
    return { type: null, error: 'Invalid format. Please copy from Figma plugin.' };
  }

  const obj = data as Record<string, unknown>;

  // Check for session format (new)
  if (obj.sessionId && typeof obj.sessionId === 'string') {
    const error = validateSessionClipboardData(data);
    return { type: error ? null : 'session', error };
  }

  // Check for legacy format
  if (obj.projectId && typeof obj.projectId === 'string') {
    const error = validateClipboardExportData(data);
    return { type: error ? null : 'legacy', error };
  }

  return { type: null, error: 'Invalid format. Please copy from Figma plugin.' };
}
