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
    framework: 'bem-lite',
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
    // Units (off for bem-lite = px only)
    allowFlexibleUnits: false,
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
    enableTransitions: false, // CSS hover effects disabled by default
    enableInteractiveComponents: true, // Tabs, sliders, dropdowns enabled by default
};
/**
 * Quick mode interactivity
 */
exports.QUICK_INTERACTIVITY_CONFIG = {
    enableTransitions: false, // CSS hover effects disabled by default
    enableInteractiveComponents: true, // Tabs, sliders, dropdowns enabled by default
};
/**
 * Quick export config - uses defaults, skips stylesheet review, no animations
 */
exports.QUICK_EXPORT_CONFIG = {
    mode: 'quick',
    stylesheet: exports.DEFAULT_STYLESHEET_CONFIG,
    responsive: exports.DEFAULT_RESPONSIVE_CONFIG,
    interactivity: exports.QUICK_INTERACTIVITY_CONFIG,
    enableAIAssistant: false, // Quick mode skips AI planning and fixing
};
/**
 * Default export config - custom mode selected by default
 */
exports.DEFAULT_EXPORT_CONFIG = {
    mode: 'custom',
    stylesheet: exports.DEFAULT_STYLESHEET_CONFIG,
    responsive: exports.DEFAULT_RESPONSIVE_CONFIG,
    interactivity: exports.DEFAULT_INTERACTIVITY_CONFIG,
    enableAIAssistant: true, // AI assistant (planning + fixing) enabled by default
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
    'plan',
    'convert_to_platform',
    'fixing',
    'customize',
];
exports.STAGE_LABELS = {
    export_config: 'Configure Export',
    load: 'Loading Data',
    plan: 'Planning Design',
    convert_to_platform: 'Building Design',
    fixing: 'Auto-Fixing',
    customize: 'Preview & Export',
};
/**
 * Get the stage order for a specific platform
 * Currently all platforms use the same stage order
 */
function getStageOrderForPlatform(_platform) {
    return exports.STAGE_ORDER;
}
