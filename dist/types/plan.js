"use strict";
/**
 * Plan Stage Types - Structured Plan Format
 *
 * The plan stage now outputs structured JSON that can be rendered
 * as organized, collapsible cards instead of raw markdown.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAN_BLOCK_MARKERS = void 0;
// ============================================================================
// BLOCK MARKERS (for parsing JSON from AI output)
// ============================================================================
exports.PLAN_BLOCK_MARKERS = {
    STRUCTURED_PLAN: { begin: 'BEGIN STRUCTURED_PLAN', end: 'END STRUCTURED_PLAN' },
    // Legacy markers (deprecated but kept for backwards compatibility)
    DESIGN_ANALYSIS: { begin: 'BEGIN DESIGN_ANALYSIS', end: 'END DESIGN_ANALYSIS' },
    SECTIONS_ANALYSIS: { begin: 'BEGIN SECTIONS_ANALYSIS', end: 'END SECTIONS_ANALYSIS' },
    COLOR_SYSTEM: { begin: 'BEGIN COLOR_SYSTEM', end: 'END COLOR_SYSTEM' },
    TYPOGRAPHY_SYSTEM: { begin: 'BEGIN TYPOGRAPHY_SYSTEM', end: 'END TYPOGRAPHY_SYSTEM' },
    COMPONENTS_PLAN: { begin: 'BEGIN COMPONENTS_PLAN', end: 'END COMPONENTS_PLAN' },
    CUSTOM_INSTRUCTIONS_REVIEW: { begin: 'BEGIN CUSTOM_INSTRUCTIONS_REVIEW', end: 'END CUSTOM_INSTRUCTIONS_REVIEW' },
    QUESTIONS: { begin: 'BEGIN QUESTIONS', end: 'END QUESTIONS' },
    READY: { begin: 'BEGIN READY', end: 'END READY' },
};
