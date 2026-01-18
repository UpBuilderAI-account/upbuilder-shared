"use strict";
/**
 * Plan Stage Types
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PLAN_BLOCK_MARKERS = void 0;
// Block parsing markers
exports.PLAN_BLOCK_MARKERS = {
    DESIGN_ANALYSIS: { begin: 'BEGIN DESIGN_ANALYSIS', end: 'END DESIGN_ANALYSIS' },
    SECTIONS_ANALYSIS: { begin: 'BEGIN SECTIONS_ANALYSIS', end: 'END SECTIONS_ANALYSIS' },
    COLOR_SYSTEM: { begin: 'BEGIN COLOR_SYSTEM', end: 'END COLOR_SYSTEM' },
    TYPOGRAPHY_SYSTEM: { begin: 'BEGIN TYPOGRAPHY_SYSTEM', end: 'END TYPOGRAPHY_SYSTEM' },
    COMPONENTS_PLAN: { begin: 'BEGIN COMPONENTS_PLAN', end: 'END COMPONENTS_PLAN' },
    CUSTOM_INSTRUCTIONS_REVIEW: { begin: 'BEGIN CUSTOM_INSTRUCTIONS_REVIEW', end: 'END CUSTOM_INSTRUCTIONS_REVIEW' },
    QUESTIONS: { begin: 'BEGIN QUESTIONS', end: 'END QUESTIONS' },
    READY: { begin: 'BEGIN READY', end: 'END READY' },
};
