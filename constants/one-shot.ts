// ============================================================================
// ONE-SHOT BUILD CONSTANTS
// Shared constants and utilities for one-shot build eligibility
// ============================================================================

import type { Design } from '../types/core-domain';

/**
 * One-shot build dimension limits
 * Designs must be within these bounds to qualify for one-shot processing
 */
export const ONE_SHOT_LIMITS = {
  MAX_WIDTH: 2000,
  MAX_HEIGHT: 1500,
} as const;

/**
 * Stages that are skipped during one-shot build
 * These stages are combined into a single AI call
 */
export const ONE_SHOT_SKIPPED_STAGES = [
  'plan',
  'section_bounding',
  'build_styles',
] as const;

export type OneShotSkippedStage = typeof ONE_SHOT_SKIPPED_STAGES[number];

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
export function isOneShotEligible(designs: Pick<Design, 'dimensions'>[]): boolean {
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
  return dimensions.width <= ONE_SHOT_LIMITS.MAX_WIDTH &&
         dimensions.height <= ONE_SHOT_LIMITS.MAX_HEIGHT;
}

/**
 * Check if a stage is skipped during one-shot build
 */
export function isOneShotSkippedStage(stageId: string): boolean {
  return ONE_SHOT_SKIPPED_STAGES.includes(stageId as OneShotSkippedStage);
}
