"use strict";
// ============================================================================
// ONE-SHOT BUILD CONSTANTS
// Shared constants and utilities for one-shot build eligibility
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ONE_SHOT_SKIPPED_STAGES = exports.ONE_SHOT_LIMITS = void 0;
exports.isOneShotEligible = isOneShotEligible;
exports.isOneShotSkippedStage = isOneShotSkippedStage;
/**
 * One-shot build dimension limits
 * Designs must be within these bounds to qualify for one-shot processing
 */
exports.ONE_SHOT_LIMITS = {
    MAX_WIDTH: 2000,
    MAX_HEIGHT: 1500,
};
/**
 * Stages that are skipped during one-shot build
 * These stages are combined into a single AI call
 */
exports.ONE_SHOT_SKIPPED_STAGES = [
    'plan',
    'section_bounding',
    'build_styles',
];
/**
 * Check if designs qualify for one-shot build
 *
 * Criteria:
 * - Exactly 1 design
 * - Width ≤ 2000px
 * - Height ≤ 1500px
 *
 * @param designs - Array of designs to check
 * @returns true if eligible for one-shot build
 */
function isOneShotEligible(designs) {
    // Must be exactly 1 design
    if (designs.length !== 1) {
        return false;
    }
    const design = designs[0];
    const dimensions = design.dimensions;
    // Must have dimensions
    if (!dimensions) {
        return false;
    }
    // Check dimension limits
    return dimensions.width <= exports.ONE_SHOT_LIMITS.MAX_WIDTH &&
        dimensions.height <= exports.ONE_SHOT_LIMITS.MAX_HEIGHT;
}
/**
 * Check if a stage is skipped during one-shot build
 */
function isOneShotSkippedStage(stageId) {
    return exports.ONE_SHOT_SKIPPED_STAGES.includes(stageId);
}
