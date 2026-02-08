"use strict";
// ============================================================================
// WORKFLOW TYPES - Single source of truth for all workflow state
// ============================================================================
// SIMPLIFIED: 3-level hierarchy only (Stage → Design → Section)
// No beforeSteps, afterSteps, exportSteps - just simple progress tracking
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.STAGE_LABELS = exports.STAGE_ORDER = exports.isFailed = exports.isComplete = exports.isRunning = exports.isPending = exports.DEFAULT_EXPORT_CONFIG = exports.QUICK_EXPORT_CONFIG = exports.QUICK_INTERACTIVITY_CONFIG = exports.DEFAULT_INTERACTIVITY_CONFIG = exports.DEFAULT_RESPONSIVE_CONFIG = exports.DEFAULT_STYLESHEET_CONFIG = exports.DEFAULT_NAVBAR_CONFIG = exports.SCALABLE_UNITS_CONFIG = exports.DEFAULT_UNITS_CONFIG = exports.IMAGE_DIMENSION_PRESETS = exports.DEFAULT_IMAGE_CONFIG = void 0;
exports.getStageOrderForPlatform = getStageOrderForPlatform;
exports.DEFAULT_IMAGE_CONFIG = {
    format: 'webp',
    maxDimension: 1920,
};
exports.IMAGE_DIMENSION_PRESETS = [
    { label: 'Low (1024px)', value: 1024 },
    { label: 'Medium (1280px)', value: 1280 },
    { label: 'Standard (1920px)', value: 1920 },
    { label: 'High (2560px)', value: 2560 },
    { label: 'Ultra (3840px)', value: 3840 },
];
exports.DEFAULT_UNITS_CONFIG = {
    baseFontSize: 16,
    fontSize: 'px',
    lineHeight: 'px',
    letterSpacing: 'px',
    spacing: 'px',
    borderRadius: 'px',
};
/** Preset: Scalable units (rem-based, best practice) */
exports.SCALABLE_UNITS_CONFIG = {
    baseFontSize: 16,
    fontSize: 'rem',
    lineHeight: 'unitless',
    letterSpacing: 'em',
    spacing: 'rem',
    borderRadius: 'px',
};
exports.DEFAULT_NAVBAR_CONFIG = {
    collapseAt: 'medium',
    animation: 'default',
    animationDuration: 400,
    dropdownHover: true,
    dropdownDelay: 300,
};
/**
 * Default stylesheet configuration
 */
exports.DEFAULT_STYLESHEET_CONFIG = {
    framework: 'client-first',
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
    enableTransitions: false, // CSS hover effects disabled by default
    enableInteractiveComponents: false, // Tabs, sliders, dropdowns disabled by default (enable for specific sections)
};
/**
 * Quick mode interactivity
 */
exports.QUICK_INTERACTIVITY_CONFIG = {
    enableTransitions: false, // CSS hover effects disabled by default
    enableInteractiveComponents: false, // Tabs, sliders, dropdowns disabled by default
};
/**
 * Quick export config - uses defaults, skips stylesheet review, no animations
 */
exports.QUICK_EXPORT_CONFIG = {
    mode: 'quick',
    stylesheet: exports.DEFAULT_STYLESHEET_CONFIG,
    responsive: exports.DEFAULT_RESPONSIVE_CONFIG,
    interactivity: exports.QUICK_INTERACTIVITY_CONFIG,
    imageConfig: exports.DEFAULT_IMAGE_CONFIG,
    unitsConfig: exports.DEFAULT_UNITS_CONFIG,
    navbarConfig: exports.DEFAULT_NAVBAR_CONFIG,
    enableAIAssistant: false, // Quick mode skips AI planning and fixing
    enableCms: false, // CMS disabled in quick mode
};
/**
 * Default export config - custom mode selected by default
 */
exports.DEFAULT_EXPORT_CONFIG = {
    mode: 'custom',
    stylesheet: exports.DEFAULT_STYLESHEET_CONFIG,
    responsive: exports.DEFAULT_RESPONSIVE_CONFIG,
    interactivity: exports.DEFAULT_INTERACTIVITY_CONFIG,
    imageConfig: exports.DEFAULT_IMAGE_CONFIG,
    unitsConfig: exports.DEFAULT_UNITS_CONFIG,
    navbarConfig: exports.DEFAULT_NAVBAR_CONFIG,
    enableAIAssistant: true, // AI assistant (planning + fixing) enabled by default
    enableCms: false, // CMS disabled by default
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
    // 'plan' removed - stage no longer exists
    'section_bounding',
    'scattered_analysis',
    'build_styles',
    'build_sections',
    'cms_schema',
    'convert_to_platform',
    'customize',
];
exports.STAGE_LABELS = {
    // Plugin-side stages
    scanning: 'AI Scanning',
    analyze_design: 'Analyzing Design',
    images_export: 'Uploading Images',
    // Backend workflow stages
    export_config: 'Configure Export',
    load: 'Loading Data',
    plan: 'Planning Design',
    section_bounding: 'Detecting Sections',
    scattered_analysis: 'Analyzing Scattered',
    build_styles: 'Building Styles',
    build_sections: 'Building Sections',
    cms_schema: 'CMS Schema',
    assembly: 'Assembling', // @deprecated - kept for backwards compatibility
    convert_to_platform: 'Generating Export',
    customize: 'Preview & Export',
};
/**
 * Get the stage order for a specific platform
 * Currently all platforms use the same stage order
 */
function getStageOrderForPlatform(_platform) {
    return exports.STAGE_ORDER;
}
