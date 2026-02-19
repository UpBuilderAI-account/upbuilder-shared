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
exports.DESIGN_PROCESSING_STATUS = exports.DESIGN_STATUS = exports.createDefaultStageStatus = exports.STAGE_STATUS = exports.SECTION_STAGE = exports.USES_SECTION_CSS = exports.AI_DISABLED_SKIPPED_STAGES = exports.QUICK_MODE_SKIPPED_STAGES = exports.SKIPPED_STAGES = exports.PROJECT_STATUS = void 0;
exports.isProcessingStage = isProcessingStage;
exports.getNextStatus = getNextStatus;
exports.requiresUserActionAfter = requiresUserActionAfter;
exports.shouldSkipStage = shouldSkipStage;
/**
 * Type-safe constants for ProjectStatus
 */
exports.PROJECT_STATUS = {
    IDLE: 'idle',
    // Plugin-side stages
    SCANNING: 'scanning',
    ANALYZE_DESIGN: 'analyze_design',
    IMAGES_EXPORT: 'images_export',
    // Import stage
    IMPORT: 'import',
    // Backend workflow stages
    EXPORT_CONFIG: 'export_config',
    LOAD: 'load',
    PLAN: 'plan',
    SECTION_BOUNDING: 'section_bounding',
    BUILD_STYLES: 'build_styles',
    BUILD_SECTIONS: 'build_sections',
    CMS_SCHEMA: 'cms_schema',
    ASSEMBLY: 'assembly', // @deprecated - kept for backwards compatibility
    CONVERT_TO_PLATFORM: 'convert_to_platform',
    CUSTOMIZE: 'customize',
    COMPLETE: 'complete',
    FAILED: 'failed',
};
/**
 * Check if a project status represents an active processing stage
 */
function isProcessingStage(status) {
    const processingStages = [
        'load',
        // 'plan' removed - stage no longer exists
        'section_bounding',
        'build_styles',
        'build_sections',
        'cms_schema',
        'convert_to_platform',
    ];
    return processingStages.includes(status);
}
/**
 * Get the next status in the workflow sequence
 * @param status Current status
 * @param platform Optional platform - if provided, skips platform-specific stages
 * @param quickMode Optional - if true, skips customize stage
 * @param _enableAIAssistant Deprecated - all stages always run now
 */
function getNextStatus(status, platform, quickMode, _enableAIAssistant) {
    var _a;
    const transitions = {
        // Plugin-side stages (run in Figma plugin, NOT in backend orchestrator)
        idle: 'load', // Workflow starts at load (import handled separately by import-session handler)
        scanning: 'import', // After scan, import stage runs
        analyze_design: 'images_export', // Plugin-only: analyze → images
        images_export: 'import', // Plugin-only: after images uploaded, import runs
        // Import stage (handled by import-session.handler.ts, not orchestrator)
        import: 'load', // After import completes, workflow starts at load
        // Backend workflow stages (export_config removed - plugin sends config)
        export_config: 'load', // Legacy fallback - skip to load
        load: 'section_bounding', // plan stage removed
        plan: 'section_bounding', // @deprecated - kept for backwards compatibility
        section_bounding: 'build_styles',
        build_styles: 'build_sections',
        build_sections: 'cms_schema',
        cms_schema: 'convert_to_platform',
        assembly: 'convert_to_platform', // @deprecated - old projects skip to convert
        convert_to_platform: 'customize',
        customize: 'complete',
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
    // Skip stages for quick mode
    if (quickMode && next) {
        while (next && exports.QUICK_MODE_SKIPPED_STAGES.includes(next)) {
            next = transitions[next];
        }
    }
    return next;
}
/**
 * Check if user action is required after this stage completes
 */
function requiresUserActionAfter(status) {
    // These stages require user action to proceed
    // customize: user reviews final output and triggers export
    // NOTE: export_config removed - plugin sends config directly
    return status === 'customize';
}
// =============================================================================
// PLATFORM-SPECIFIC STAGE CONFIGURATION
// =============================================================================
/**
 * Stages to skip for each platform
 * Bricks/Elementor skip stylesheet generation (sections are self-contained)
 */
exports.SKIPPED_STAGES = {
    webflow: [], // All stages enabled for Webflow
    // bricks: ['generate_styles'],
    // elementor: ['generate_styles'],
};
/**
 * Stages to skip in Quick mode (faster export with defaults)
 * Currently empty - all stages run, customize is always shown
 */
exports.QUICK_MODE_SKIPPED_STAGES = [];
/**
 * Stages to skip when AI assistant is disabled
 * NOTE: Disabled - all stages always run now
 */
exports.AI_DISABLED_SKIPPED_STAGES = [];
/**
 * Platforms that use per-section CSS (in addition to global stylesheet)
 * All platforms now show section CSS in the customizer
 */
exports.USES_SECTION_CSS = {
    webflow: true,
    // bricks: true,
    // elementor: true,
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
/**
 * Type-safe constants for DesignProcessingStatus
 */
exports.DESIGN_PROCESSING_STATUS = {
    PENDING: 'pending',
    QUEUED: 'queued',
    PROCESSING: 'processing',
    COMPLETE: 'complete',
    FAILED: 'failed',
};
