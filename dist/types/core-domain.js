"use strict";
// ============================================================================
// CORE DOMAIN TYPES
// Consolidated business logic and database entity types
// ============================================================================
// This file consolidates:
// - project.ts: Project, Design, Section types and status enums
// - auth.ts: User, authentication, and session types
// - export.ts: Export configuration and operation types
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.DESIGN_STATUS = exports.createDefaultStageStatus = exports.STAGE_STATUS = exports.SECTION_STAGE = exports.USES_SECTION_CSS = exports.SKIPPED_STAGES = exports.PROJECT_STATUS = void 0;
exports.isProcessingStage = isProcessingStage;
exports.getNextStatus = getNextStatus;
exports.requiresUserActionAfter = requiresUserActionAfter;
exports.shouldSkipStage = shouldSkipStage;
/**
 * Type-safe constants for ProjectStatus
 */
exports.PROJECT_STATUS = {
    IDLE: 'idle',
    LOAD: 'load',
    DETECT_SECTIONS: 'detect_sections',
    STYLES_CONFIG: 'styles_config',
    GENERATE_STYLES: 'generate_styles',
    PREPARE_BUILD: 'prepare_build',
    BUILD: 'build',
    CONSOLIDATE_CSS: 'consolidate_css',
    CONSOLIDATE_SCRIPTS: 'consolidate_scripts',
    CUSTOMIZE: 'customize',
    EXPORT: 'export',
    COMPLETE: 'complete',
    FAILED: 'failed',
};
/**
 * Check if a project status represents an active processing stage
 */
function isProcessingStage(status) {
    const processingStages = [
        'load',
        'detect_sections',
        'generate_styles',
        'prepare_build',
        'build',
        'consolidate_css',
        'consolidate_scripts',
        'export',
    ];
    return processingStages.includes(status);
}
/**
 * Get the next status in the workflow sequence
 * @param status Current status
 * @param platform Optional platform - if provided, skips platform-specific stages
 */
function getNextStatus(status, platform) {
    var _a;
    const transitions = {
        idle: 'load',
        load: 'detect_sections',
        detect_sections: 'styles_config',
        styles_config: 'generate_styles',
        generate_styles: 'prepare_build',
        prepare_build: 'build',
        build: 'consolidate_css',
        consolidate_css: 'consolidate_scripts',
        consolidate_scripts: 'customize',
        customize: 'export',
        export: 'complete',
        complete: null,
        failed: null,
    };
    let next = (_a = transitions[status]) !== null && _a !== void 0 ? _a : null;
    // Skip stages based on platform configuration
    if (platform && next) {
        const skipped = exports.SKIPPED_STAGES[platform] || [];
        while (next && skipped.includes(next)) {
            next = transitions[next];
        }
    }
    return next;
}
/**
 * Check if user action is required after this stage completes
 */
function requiresUserActionAfter(status) {
    // styles_config, generate_styles, and customize stages require user action to proceed
    return status === 'styles_config' || status === 'generate_styles' || status === 'customize';
}
// =============================================================================
// PLATFORM-SPECIFIC STAGE CONFIGURATION
// =============================================================================
/**
 * Stages to skip for each platform
 * Bricks/Elementor skip stylesheet generation and consolidation (sections are self-contained)
 */
exports.SKIPPED_STAGES = {
    webflow: [],
    bricks: ['styles_config', 'generate_styles', 'consolidate_css', 'consolidate_scripts'],
    elementor: ['styles_config', 'generate_styles', 'consolidate_css', 'consolidate_scripts'],
};
/**
 * Platforms that use per-section CSS (vs global stylesheet)
 */
exports.USES_SECTION_CSS = {
    webflow: false,
    bricks: true,
    elementor: true,
};
/**
 * Check if a stage should be skipped for a given platform
 */
function shouldSkipStage(platform, status) {
    const skipped = exports.SKIPPED_STAGES[platform] || [];
    return skipped.includes(status);
}
/**
 * Type-safe constants for SectionStage
 */
exports.SECTION_STAGE = {
    DETECT: 'detect',
    BUILD: 'build',
    EXPORT: 'export',
};
/**
 * Type-safe constants for StageStatus
 */
exports.STAGE_STATUS = {
    PENDING: 'pending',
    RUNNING: 'running',
    COMPLETE: 'complete',
    FAILED: 'failed',
    SKIPPED: 'skipped',
};
/**
 * Helper to create default stage status (all pending)
 */
const createDefaultStageStatus = () => ({
    detect: 'pending',
    build: 'pending',
    export: 'pending',
});
exports.createDefaultStageStatus = createDefaultStageStatus;
/**
 * Type-safe constants for DesignStatus
 */
exports.DESIGN_STATUS = {
    PENDING: 'pending',
    RUNNING: 'running',
    COMPLETE: 'complete',
    FAILED: 'failed',
};
