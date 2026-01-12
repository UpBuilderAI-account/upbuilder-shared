"use strict";
// ============================================================================
// WORKFLOW TYPES - Single source of truth for all workflow state
// ============================================================================
// SIMPLIFIED: 3-level hierarchy only (Stage → Design → Section)
// No beforeSteps, afterSteps, exportSteps - just simple progress tracking
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.STAGE_LABELS = exports.STAGE_ORDER = exports.isFailed = exports.isComplete = exports.isRunning = exports.isPending = exports.DEFAULT_EXPORT_CONFIG = exports.QUICK_EXPORT_CONFIG = exports.QUICK_INTERACTIVITY_CONFIG = exports.DEFAULT_INTERACTIVITY_CONFIG = exports.DEFAULT_RESPONSIVE_CONFIG = exports.DEFAULT_STYLESHEET_CONFIG = void 0;
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
 * Default responsive configuration
 */
exports.DEFAULT_RESPONSIVE_CONFIG = {
    enableResponsive: true, // Responsive styles enabled by default
};
/**
 * Default interactivity configuration
 */
exports.DEFAULT_INTERACTIVITY_CONFIG = {
    enableTransitions: true, // CSS hover effects enabled by default
    enableJavaScript: true, // JS components enabled by default
    enableAnimations: false, // Scroll animations disabled (coming soon)
};
/**
 * Quick mode interactivity - no JS/animations for faster export
 */
exports.QUICK_INTERACTIVITY_CONFIG = {
    enableTransitions: true, // Keep CSS transitions even in quick mode
    enableJavaScript: false,
    enableAnimations: false,
};
/**
 * Quick export config - uses defaults, skips stylesheet review, no animations
 */
exports.QUICK_EXPORT_CONFIG = {
    mode: 'quick',
    stylesheet: exports.DEFAULT_STYLESHEET_CONFIG,
    responsive: exports.DEFAULT_RESPONSIVE_CONFIG,
    interactivity: exports.QUICK_INTERACTIVITY_CONFIG,
};
/**
 * Default export config - custom mode selected by default
 */
exports.DEFAULT_EXPORT_CONFIG = {
    mode: 'custom',
    stylesheet: exports.DEFAULT_STYLESHEET_CONFIG,
    responsive: exports.DEFAULT_RESPONSIVE_CONFIG,
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
    'convert_to_platform',
    'customize',
];
exports.STAGE_LABELS = {
    export_config: 'Configure Export',
    load: 'Loading Data',
    convert_to_platform: 'Building Design',
    customize: 'Preview & Export',
};
/**
 * Get the stage order for a specific platform
 * Currently all platforms use the same stage order
 */
function getStageOrderForPlatform(_platform) {
    return exports.STAGE_ORDER;
}
