// ============================================================================
// EXPORT ETA CALCULATION
// Estimates remaining time for export stage based on parallelism limits
// ============================================================================

/**
 * Average processing times in seconds
 * Tune these based on real-world observations
 */
export const EXPORT_TIMES = {
  PREPARE: 2,
  CONVERT_STYLES: 90,     // AI call for style registry (Webflow only)
  SECTION_BUILD: 10,      // Per section avg (6-15s range)
  ASSEMBLY: 90,           // Per design page assembly (40s-2min range)
  GENERATE: 5,            // XSCP/JSON generation
  VALIDATE: 5,            // Structure validation
  FINALIZE: 2,
  ASSET_BATCH: 5,         // Per ~10 assets
} as const;

/**
 * Parallelism limits (must match backend constants)
 */
export const EXPORT_PARALLEL = {
  DESIGNS: 2,             // MAX_PARALLEL_DESIGNS
  GLOBAL_SECTIONS: 3,     // MAX_PARALLEL_GLOBAL_SECTIONS
  DESIGN_SECTIONS: 3,     // batchSize in build-sections
} as const;

/**
 * Export step IDs for tracking completion
 */
export type ExportStepId =
  | 'prepare'
  | 'styles'
  | 'global_sections'
  | 'assets'
  | 'processing'
  | 'finalize';

export interface ExportETAParams {
  platform: 'webflow' | 'bricks' | 'elementor';
  globalSectionsCount: number;
  designs: Array<{ id: string; sectionCount: number }>;
  assetCount?: number;
}

export interface ExportETAResult {
  totalMs: number;
  breakdown: {
    prepare: number;
    convertStyles: number;
    globalSections: number;
    designs: number;
    finalize: number;
  };
}

/**
 * Calculate initial export ETA based on project structure
 * Called once at the start of export stage
 */
export function calculateExportETA(params: ExportETAParams): ExportETAResult {
  const { platform, globalSectionsCount, designs, assetCount = 0 } = params;
  const T = EXPORT_TIMES;
  const P = EXPORT_PARALLEL;

  const breakdown = {
    prepare: T.PREPARE,
    convertStyles: 0,
    globalSections: 0,
    designs: 0,
    finalize: T.FINALIZE,
  };

  // ─────────────────────────────────────────────────────────
  // PHASE 1: Convert styles (Webflow only, sequential)
  // ─────────────────────────────────────────────────────────
  if (platform === 'webflow') {
    breakdown.convertStyles = T.CONVERT_STYLES;
  }

  // ─────────────────────────────────────────────────────────
  // PHASE 2: Global sections (batches of 3)
  // ─────────────────────────────────────────────────────────
  const globalBatches = Math.ceil(globalSectionsCount / P.GLOBAL_SECTIONS);
  breakdown.globalSections = globalBatches * T.SECTION_BUILD;

  // Asset upload runs in parallel with global sections
  // Only adds time if it takes longer than global sections phase
  if (platform === 'webflow' && assetCount > 0) {
    const assetTime = Math.ceil(assetCount / 10) * T.ASSET_BATCH;
    if (assetTime > breakdown.globalSections) {
      // Assets take longer, add the difference
      breakdown.globalSections = assetTime;
    }
  }

  // ─────────────────────────────────────────────────────────
  // PHASE 3: Process designs (batches of 2, parallel within batch)
  // ─────────────────────────────────────────────────────────
  for (let i = 0; i < designs.length; i += P.DESIGNS) {
    const batch = designs.slice(i, i + P.DESIGNS);

    // Designs in batch run in parallel → take the MAX time
    const batchTime = Math.max(...batch.map(d => {
      // Sections within design run in batches of 3
      const sectionBatches = Math.ceil(d.sectionCount / P.DESIGN_SECTIONS);
      const buildTime = sectionBatches * T.SECTION_BUILD;

      return buildTime + T.ASSEMBLY + T.GENERATE + T.VALIDATE;
    }));

    breakdown.designs += batchTime;
  }

  const totalMs = (
    breakdown.prepare +
    breakdown.convertStyles +
    breakdown.globalSections +
    breakdown.designs +
    breakdown.finalize
  ) * 1000;

  return { totalMs, breakdown };
}

/**
 * Track completed steps and calculate remaining time
 */
export interface ExportProgressState {
  startedAt: number;
  initialEstimateMs: number;
  breakdown: ExportETAResult['breakdown'];
  platform: 'webflow' | 'bricks' | 'elementor';
  completedSteps: Set<ExportStepId>;
  completedDesignIds: Set<string>;
  totalDesigns: number;
  designs: Array<{ id: string; sectionCount: number }>;
}

/**
 * Calculate remaining time based on what's completed
 * Called after each step completes to update the ETA
 */
export function calculateRemainingTime(state: ExportProgressState): number {
  const T = EXPORT_TIMES;
  const P = EXPORT_PARALLEL;

  let remainingSeconds = 0;

  // Add time for incomplete steps
  if (!state.completedSteps.has('prepare')) {
    remainingSeconds += state.breakdown.prepare;
  }

  if (state.platform === 'webflow' && !state.completedSteps.has('styles')) {
    remainingSeconds += state.breakdown.convertStyles;
  }

  if (!state.completedSteps.has('global_sections')) {
    remainingSeconds += state.breakdown.globalSections;
  }

  // Calculate remaining design time
  if (!state.completedSteps.has('processing')) {
    const remainingDesigns = state.designs.filter(
      d => !state.completedDesignIds.has(d.id)
    );

    // Process remaining designs in batches of 2
    for (let i = 0; i < remainingDesigns.length; i += P.DESIGNS) {
      const batch = remainingDesigns.slice(i, i + P.DESIGNS);

      const batchTime = Math.max(...batch.map(d => {
        const sectionBatches = Math.ceil(d.sectionCount / P.DESIGN_SECTIONS);
        const buildTime = sectionBatches * T.SECTION_BUILD;
        return buildTime + T.ASSEMBLY + T.GENERATE + T.VALIDATE;
      }));

      remainingSeconds += batchTime;
    }
  }

  if (!state.completedSteps.has('finalize')) {
    remainingSeconds += state.breakdown.finalize;
  }

  return remainingSeconds * 1000;
}

/**
 * Format milliseconds to human readable string
 */
export function formatETA(ms: number): string {
  const seconds = Math.ceil(ms / 1000);

  if (seconds < 60) {
    return `${seconds}s`;
  }

  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  if (remainingSeconds === 0) {
    return `${minutes}min`;
  }

  return `${minutes}min ${remainingSeconds}s`;
}

/**
 * Format to "~X-Y min" range for display
 * Shows a 2-minute range for better accuracy expectations
 */
export function formatETAApprox(ms: number): string {
  const minutes = Math.ceil(ms / 60000);

  if (minutes <= 1) {
    return 'less than a minute';
  }

  if (minutes <= 2) {
    return '~1-2 min';
  }

  // Show range: (approx - 2) to approx
  const lower = minutes - 2;
  return `~${lower}-${minutes} min`;
}
