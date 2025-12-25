// ============================================================================
// PLUGIN PROGRESS MILESTONES
// Simple milestone-based progress for Figma plugin export flow
// Progress jumps between milestones at stage transitions - no continuous updates
// ============================================================================

/**
 * Fixed progress milestones - progress jumps between these values
 * Each stage has ONE value - simpler and less buggy
 */
export const PLUGIN_PROGRESS = {
  // === PRE-CHECKS (0-5%) ===
  START: 0,
  SCANNING_GRAPHICS: 2,    // Scanning for grouped graphics
  SCANNING_OUTSIDE: 4,     // Scanning for outside elements

  // === PLUGIN PHASE (5-50%) ===
  ANALYZING: 5,            // Reading design structure
  DETECTING: 10,           // Detecting image nodes
  GROUPING: 15,            // Grouping/deduplicating images
  EXPORTING: 20,           // Exporting images (PNG generation)
  EXPORT_DONE: 40,         // Export complete
  UPLOADING: 45,           // Sending to backend
  UPLOAD_DONE: 50,         // Upload complete

  // === BACKEND PHASE (50-100%) ===
  BACKEND_PROCESSING: 55,  // Backend processing buffers
  BACKEND_THUMBNAILS: 60,  // Creating thumbnails
  BACKEND_UPLOADING: 65,   // Uploading for AI
  TAGGING: 75,             // AI tagging
  TAGGING_DONE: 85,        // Tagging complete
  SAVING: 90,              // Saving to cloud
  COMPLETE: 100,           // All done
} as const;

export type PluginProgressMilestone = typeof PLUGIN_PROGRESS[keyof typeof PLUGIN_PROGRESS];

/**
 * Calculate interpolated progress within a range (for image export progress)
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
 * Calculate progress during tagging phase
 */
export function calculateTaggingProgress(taggedCount: number, totalImages: number): number {
  return calculateRangeProgress(
    taggedCount,
    totalImages,
    PLUGIN_PROGRESS.TAGGING,
    PLUGIN_PROGRESS.TAGGING_DONE
  );
}
