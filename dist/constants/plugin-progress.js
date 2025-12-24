"use strict";
// ============================================================================
// PLUGIN PROGRESS MILESTONES
// Shared progress constants for Figma plugin export flow
// Used by both plugin frontend and backend to ensure consistent progress tracking
//
// Progress distribution based on actual time spent:
// - Plugin phase (0-50%): ~60% of total time
// - Backend phase (50-100%): ~40% of total time
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLUGIN_PROGRESS = void 0;
exports.calculateRangeProgress = calculateRangeProgress;
exports.calculateDetectingProgress = calculateDetectingProgress;
exports.calculateExportingProgress = calculateExportingProgress;
exports.calculateProcessingProgress = calculateProcessingProgress;
exports.calculateUploadingProgress = calculateUploadingProgress;
exports.calculateTaggingProgress = calculateTaggingProgress;
exports.calculateSavingProgress = calculateSavingProgress;
/**
 * Fixed progress milestones for plugin export flow
 * Progress only moves forward through these milestones
 */
exports.PLUGIN_PROGRESS = {
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
};
/**
 * Calculate interpolated progress within a range
 * @param current - Current count
 * @param total - Total count
 * @param startProgress - Progress value at start of range
 * @param endProgress - Progress value at end of range
 */
function calculateRangeProgress(current, total, startProgress, endProgress) {
    if (total <= 0)
        return startProgress;
    if (current >= total)
        return endProgress;
    const range = endProgress - startProgress;
    const ratio = current / total;
    return Math.min(endProgress, Math.floor(startProgress + (ratio * range)));
}
/**
 * Calculate progress during detecting phase
 */
function calculateDetectingProgress(detected, total) {
    return calculateRangeProgress(detected, total, exports.PLUGIN_PROGRESS.DETECTING_START, exports.PLUGIN_PROGRESS.DETECTING_END);
}
/**
 * Calculate progress during exporting phase
 */
function calculateExportingProgress(exported, total) {
    return calculateRangeProgress(exported, total, exports.PLUGIN_PROGRESS.EXPORTING_START, exports.PLUGIN_PROGRESS.EXPORTING_END);
}
/**
 * Calculate progress during backend processing phase
 */
function calculateProcessingProgress(processed, total) {
    return calculateRangeProgress(processed, total, exports.PLUGIN_PROGRESS.BACKEND_PROCESSING, exports.PLUGIN_PROGRESS.BACKEND_PROCESSING_END);
}
/**
 * Calculate progress during backend upload phase
 */
function calculateUploadingProgress(uploaded, total) {
    return calculateRangeProgress(uploaded, total, exports.PLUGIN_PROGRESS.BACKEND_UPLOADING, exports.PLUGIN_PROGRESS.BACKEND_UPLOADING_END);
}
/**
 * Calculate progress during tagging phase based on tagged count
 */
function calculateTaggingProgress(taggedCount, totalImages) {
    return calculateRangeProgress(taggedCount, totalImages, exports.PLUGIN_PROGRESS.TAGGING_START, exports.PLUGIN_PROGRESS.TAGGING_END);
}
/**
 * Calculate progress during saving phase
 */
function calculateSavingProgress(saved, total) {
    return calculateRangeProgress(saved, total, exports.PLUGIN_PROGRESS.BACKEND_SAVING, exports.PLUGIN_PROGRESS.BACKEND_SAVING_END);
}
