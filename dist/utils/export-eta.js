"use strict";
// ============================================================================
// EXPORT ETA CALCULATION (ADAPTIVE)
// Estimates remaining time based on actual measured times when available
// Falls back to estimates for initial calculation, then adapts as steps complete
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPORT_PARALLEL = exports.EXPORT_TIMES = void 0;
exports.calculateExportETA = calculateExportETA;
exports.calculateRemainingTime = calculateRemainingTime;
exports.formatETA = formatETA;
exports.formatETAApprox = formatETAApprox;
/**
 * Default processing times in seconds (used before actual times are measured)
 * These are conservative estimates - actual times often vary significantly
 */
exports.EXPORT_TIMES = {
    PREPARE: 2,
    CONVERT_STYLES: 60, // AI call for style registry - reduced from 90s
    SECTION_BUILD: 8, // Per section avg - reduced (prebuilt globals are faster)
    ASSEMBLY: 60, // Per design page assembly - reduced from 90s
    GENERATE: 3, // XSCP/JSON generation
    VALIDATE: 3, // Structure validation
    FINALIZE: 2,
    ASSET_BATCH: 3, // Per ~10 assets
    XSCP_REUSE: 1, // Nearly instant - just clone cached XSCP
};
/**
 * Parallelism limits (must match backend constants)
 */
exports.EXPORT_PARALLEL = {
    DESIGNS: 2, // MAX_PARALLEL_DESIGNS
    GLOBAL_SECTIONS: 3, // MAX_PARALLEL_GLOBAL_SECTIONS
    DESIGN_SECTIONS: 3, // batchSize in build-sections
};
/**
 * Calculate initial export ETA based on project structure
 * Called once at the start of export stage
 */
function calculateExportETA(params) {
    const { platform, globalSectionsCount, designs, assetCount = 0 } = params;
    const T = exports.EXPORT_TIMES;
    const P = exports.EXPORT_PARALLEL;
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
    const totalMs = (breakdown.prepare +
        breakdown.convertStyles +
        breakdown.globalSections +
        breakdown.designs +
        breakdown.finalize) * 1000;
    return { totalMs, breakdown };
}
/**
 * Calculate remaining time based on what's completed
 * Called after each step completes to update the ETA
 */
function calculateRemainingTime(state) {
    const T = exports.EXPORT_TIMES;
    const P = exports.EXPORT_PARALLEL;
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
        const remainingDesigns = state.designs.filter(d => !state.completedDesignIds.has(d.id));
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
function formatETA(ms) {
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
function formatETAApprox(ms) {
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
