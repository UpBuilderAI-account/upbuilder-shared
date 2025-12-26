"use strict";
// ============================================================================
// WORKFLOW TYPES - Single source of truth for all workflow state
// ============================================================================
// SIMPLIFIED: 3-level hierarchy only (Stage → Design → Section)
// No beforeSteps, afterSteps, exportSteps - just simple progress tracking
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.INLINE_PLATFORM_SKIPPED_STAGES = exports.STAGE_LABELS = exports.STAGE_ORDER = exports.isFailed = exports.isComplete = exports.isRunning = exports.isPending = exports.DEFAULT_STYLES_CONFIG = void 0;
exports.isInlineCSSPlatform = isInlineCSSPlatform;
exports.getStageOrderForPlatform = getStageOrderForPlatform;
/**
 * Default values for Client-First V2.1 StylesConfig
 */
exports.DEFAULT_STYLES_CONFIG = {
    // Required (locked)
    useRemFontSizes: true,
    useUnitlessLineHeight: true,
    generateSpacing: true,
    generateTypography: true,
    generateColors: true,
    // Recommended (enabled by default)
    generateButtons: true,
    generateVisibility: true,
    generateMaxWidth: true,
    // Extended (off by default)
    generateBorders: false,
    generateShadows: false,
    generateIcons: false,
    generateAspectRatios: false,
    generateOverflow: false,
    generateZIndex: false,
    generatePointerEvents: false,
};
// =============================================================================
// HELPERS
// =============================================================================
const isPending = (p) => p === 0;
exports.isPending = isPending;
const isRunning = (p) => p > 0 && p < 100;
exports.isRunning = isRunning;
const isComplete = (p) => p === 100;
exports.isComplete = isComplete;
const isFailed = (p) => p === -1;
exports.isFailed = isFailed;
exports.STAGE_ORDER = [
    'load',
    'detect_sections',
    'styles_config',
    'generate_styles',
    'review_stylesheet',
    'prepare_build',
    'build',
    'customize',
    'export',
];
exports.STAGE_LABELS = {
    load: 'Loading Data',
    detect_sections: 'Detecting Sections',
    styles_config: 'Configure Styles',
    generate_styles: 'Generating Base Styles',
    review_stylesheet: 'Review Stylesheet',
    prepare_build: 'Preparing Build',
    build: 'Building Sections',
    customize: 'Review & Customize',
    export: 'Exporting',
};
/**
 * Stages to skip for inline CSS platforms (Bricks, Elementor)
 * These platforms use inline styles per section instead of global stylesheets
 */
exports.INLINE_PLATFORM_SKIPPED_STAGES = [
    'styles_config',
    'generate_styles',
    'review_stylesheet',
];
/**
 * Check if a platform uses inline CSS (skips global stylesheet stages)
 */
function isInlineCSSPlatform(platform) {
    return platform === 'bricks' || platform === 'elementor';
}
/**
 * Get the stage order for a specific platform
 * Filters out stages that should be skipped for inline CSS platforms
 */
function getStageOrderForPlatform(platform) {
    if (isInlineCSSPlatform(platform)) {
        return exports.STAGE_ORDER.filter(stage => !exports.INLINE_PLATFORM_SKIPPED_STAGES.includes(stage));
    }
    return exports.STAGE_ORDER;
}
