// ============================================================================
// PLUGIN PROGRESS MILESTONES
// Shared progress constants for Figma plugin export flow
// Used by both plugin frontend and backend to ensure consistent progress tracking
// ============================================================================

/**
 * Fixed progress milestones for plugin export flow
 * Progress only moves forward through these milestones
 */
export const PLUGIN_PROGRESS = {
  /** Initial state */
  START: 0,
  /** Analyzing design structure */
  ANALYZING: 10,
  /** Uploading nodes and images to server */
  UPLOADING: 30,
  /** AI tagging phase starts */
  TAGGING_START: 50,
  /** AI tagging phase ends (max before complete) */
  TAGGING_END: 95,
  /** Export complete */
  COMPLETE: 100,
} as const;

export type PluginProgressMilestone = typeof PLUGIN_PROGRESS[keyof typeof PLUGIN_PROGRESS];

/**
 * Calculate progress during tagging phase based on tagged count
 * Progress scales linearly from TAGGING_START to TAGGING_END
 *
 * @param taggedCount - Number of images tagged so far
 * @param totalImages - Total number of images to tag
 * @returns Progress value between TAGGING_START and TAGGING_END
 */
export function calculateTaggingProgress(taggedCount: number, totalImages: number): number {
  if (totalImages <= 0) return PLUGIN_PROGRESS.TAGGING_START;
  if (taggedCount >= totalImages) return PLUGIN_PROGRESS.TAGGING_END;

  const taggingRange = PLUGIN_PROGRESS.TAGGING_END - PLUGIN_PROGRESS.TAGGING_START;
  const progressPerTag = taggingRange / totalImages;

  return Math.min(
    PLUGIN_PROGRESS.TAGGING_END,
    Math.floor(PLUGIN_PROGRESS.TAGGING_START + (taggedCount * progressPerTag))
  );
}
