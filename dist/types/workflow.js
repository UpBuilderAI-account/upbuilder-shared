"use strict";
// ============================================================================
// WORKFLOW TYPES - Single source of truth for all workflow state
// ============================================================================
// SIMPLIFIED: 3-level hierarchy only (Stage → Design → Section)
// No beforeSteps, afterSteps, exportSteps - just simple progress tracking
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.INLINE_PLATFORM_SKIPPED_STAGES = exports.STAGE_LABELS = exports.STAGE_ORDER = exports.isFailed = exports.isComplete = exports.isRunning = exports.isPending = exports.DEFAULT_EXPORT_CONFIG = exports.QUICK_EXPORT_CONFIG = exports.QUICK_INTERACTIVITY_CONFIG = exports.DEFAULT_INTERACTIVITY_CONFIG = exports.DEFAULT_STYLESHEET_CONFIG = void 0;
exports.isInlineCSSPlatform = isInlineCSSPlatform;
exports.getStageOrderForPlatform = getStageOrderForPlatform;
/**
 * Default stylesheet configuration
 */
exports.DEFAULT_STYLESHEET_CONFIG = {
    framework: 'simple',
    // Core (locked)
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
/**
 * Default interactivity configuration
 */
exports.DEFAULT_INTERACTIVITY_CONFIG = {
    enableJavaScript: true, // Enabled by default for custom mode
    enableAnimations: true, // Enabled by default for custom mode
};
/**
 * Quick mode interactivity - no JS/animations for faster export
 */
exports.QUICK_INTERACTIVITY_CONFIG = {
    enableJavaScript: false,
    enableAnimations: false,
};
/**
 * Quick export config - uses defaults, skips stylesheet review, no animations
 */
exports.QUICK_EXPORT_CONFIG = {
    mode: 'quick',
    stylesheet: exports.DEFAULT_STYLESHEET_CONFIG,
    interactivity: exports.QUICK_INTERACTIVITY_CONFIG,
};
/**
 * Default export config - custom mode selected by default
 */
exports.DEFAULT_EXPORT_CONFIG = {
    mode: 'custom',
    stylesheet: exports.DEFAULT_STYLESHEET_CONFIG,
    interactivity: exports.DEFAULT_INTERACTIVITY_CONFIG,
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
    'export_config',
    'load',
    'detect_sections',
    'generate_styles',
    'review_stylesheet',
    'prepare_build',
    'build',
    'customize',
    'export',
];
exports.STAGE_LABELS = {
    export_config: 'Configure Export',
    load: 'Loading Data',
    detect_sections: 'Detecting Sections',
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
