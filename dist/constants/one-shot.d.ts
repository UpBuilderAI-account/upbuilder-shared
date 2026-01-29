import type { Design } from '../types/core-domain';
/**
 * One-shot build dimension limits
 * Designs must be within these bounds to qualify for one-shot processing
 */
export declare const ONE_SHOT_LIMITS: {
    readonly MAX_WIDTH: 2000;
    readonly MAX_HEIGHT: 1500;
};
/**
 * Stages that are skipped during one-shot build
 * These stages are combined into a single AI call
 */
export declare const ONE_SHOT_SKIPPED_STAGES: readonly ["plan", "section_bounding", "build_styles"];
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
export declare function isOneShotEligible(designs: Pick<Design, 'dimensions'>[]): boolean;
/**
 * Check if a stage is skipped during one-shot build
 */
export declare function isOneShotSkippedStage(stageId: string): boolean;
//# sourceMappingURL=one-shot.d.ts.map