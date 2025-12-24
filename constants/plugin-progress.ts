// ============================================================================
// PLUGIN PROGRESS MILESTONES
// Shared progress constants for Figma plugin export flow
// Used by both plugin frontend and backend to ensure consistent progress tracking
//
// Progress distribution based on actual time spent:
// - Plugin phase (0-50%): ~60% of total time
// - Backend phase (50-100%): ~40% of total time
// ============================================================================

/**
 * Fixed progress milestones for plugin export flow
 * Progress only moves forward through these milestones
 */
export const PLUGIN_PROGRESS = {
  /** Initial state */
  START: 0,

  // === PLUGIN PHASE (0-50%) ===
  /** Analyzing design structure */
  ANALYZING: 5,
  /** Detecting image nodes (fetching) */
  DETECTING_START: 5,
  DETECTING_END: 15,
  /** Grouping similar images (deduplication) */
  GROUPING_START: 15,
  GROUPING_END: 20,
  /** Exporting images (PNG generation - slowest phase) */
  EXPORTING_START: 20,
  EXPORTING_END: 45,
  /** Sending batches to backend */
  UPLOADING: 45,
  UPLOADING_END: 50,

  // === BACKEND PHASE (50-100%) ===
  /** Backend received data, processing buffers */
  BACKEND_PROCESSING: 50,
  BACKEND_PROCESSING_END: 60,
  /** Uploading to Google Cloud for AI */
  BACKEND_UPLOADING: 60,
  BACKEND_UPLOADING_END: 70,
  /** AI tagging phase */
  TAGGING_START: 70,
  TAGGING_END: 90,
  /** Saving to S3 */
  BACKEND_SAVING: 90,
  BACKEND_SAVING_END: 95,
  /** Export complete */
  COMPLETE: 100,
} as const;

export type PluginProgressMilestone = typeof PLUGIN_PROGRESS[keyof typeof PLUGIN_PROGRESS];

/**
 * Calculate interpolated progress within a range
 * @param current - Current count
 * @param total - Total count
 * @param startProgress - Progress value at start of range
 * @param endProgress - Progress value at end of range
 */
export function calculateRangeProgress(
  current: number,
  total: number,
  startProgress: number,
  endProgress: number
): number {
  if (total <= 0) return startProgress;
  if (current >= total) return endProgress;

  const range = endProgress - startProgress;
  const ratio = current / total;

  return Math.min(endProgress, Math.floor(startProgress + (ratio * range)));
}

/**
 * Calculate progress during detecting phase
 */
export function calculateDetectingProgress(detected: number, total: number): number {
  return calculateRangeProgress(
    detected,
    total,
    PLUGIN_PROGRESS.DETECTING_START,
    PLUGIN_PROGRESS.DETECTING_END
  );
}

/**
 * Calculate progress during exporting phase
 */
export function calculateExportingProgress(exported: number, total: number): number {
  return calculateRangeProgress(
    exported,
    total,
    PLUGIN_PROGRESS.EXPORTING_START,
    PLUGIN_PROGRESS.EXPORTING_END
  );
}

/**
 * Calculate progress during backend processing phase
 */
export function calculateProcessingProgress(processed: number, total: number): number {
  return calculateRangeProgress(
    processed,
    total,
    PLUGIN_PROGRESS.BACKEND_PROCESSING,
    PLUGIN_PROGRESS.BACKEND_PROCESSING_END
  );
}

/**
 * Calculate progress during backend upload phase
 */
export function calculateUploadingProgress(uploaded: number, total: number): number {
  return calculateRangeProgress(
    uploaded,
    total,
    PLUGIN_PROGRESS.BACKEND_UPLOADING,
    PLUGIN_PROGRESS.BACKEND_UPLOADING_END
  );
}

/**
 * Calculate progress during tagging phase based on tagged count
 */
export function calculateTaggingProgress(taggedCount: number, totalImages: number): number {
  return calculateRangeProgress(
    taggedCount,
    totalImages,
    PLUGIN_PROGRESS.TAGGING_START,
    PLUGIN_PROGRESS.TAGGING_END
  );
}

/**
 * Calculate progress during saving phase
 */
export function calculateSavingProgress(saved: number, total: number): number {
  return calculateRangeProgress(
    saved,
    total,
    PLUGIN_PROGRESS.BACKEND_SAVING,
    PLUGIN_PROGRESS.BACKEND_SAVING_END
  );
}
