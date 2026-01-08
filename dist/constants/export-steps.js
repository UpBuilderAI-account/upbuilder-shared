"use strict";
// ============================================================================
// EXPORT STEPS CONFIG
// Single source of truth for export stage steps per platform
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.EXPORT_STEPS_CONFIG = void 0;
exports.getExportStepsConfig = getExportStepsConfig;
/**
 * Export step definitions per platform
 * - global: Overall export progress (shown in left panel)
 * - design: Per-design progress (shown in design cards)
 */
exports.EXPORT_STEPS_CONFIG = {
    webflow: {
        global: [
            { id: 'prepare', label: 'Preparing' },
            { id: 'styles', label: 'Converting styles' },
            { id: 'global_sections', label: 'Building global sections' },
            { id: 'assets', label: 'Uploading assets' },
            { id: 'processing', label: 'Processing designs' },
            { id: 'finalize', label: 'Finalizing' },
        ],
        design: [
            // Note: convert_styles and global sections are now done globally, not per-design
            { id: 'build_sections', label: 'Build sections' },
            { id: 'page_assembly', label: 'Page assembly' },
            { id: 'generate_xscp', label: 'Generate export' },
            { id: 'validate_structure', label: 'Validating structure' },
        ],
    },
    // Bricks and Elementor commented out - only Webflow available for now
    // bricks: {
    //   global: [
    //     { id: 'prepare', label: 'Preparing' },
    //     { id: 'global_sections', label: 'Building global sections' },
    //     { id: 'processing', label: 'Processing designs' },
    //     { id: 'finalize', label: 'Finalizing' },
    //   ],
    //   design: [
    //     { id: 'build', label: 'Convert to Bricks' },
    //     { id: 'generate', label: 'Generate JSON' },
    //   ],
    // },
    // elementor: {
    //   global: [
    //     { id: 'prepare', label: 'Preparing' },
    //     { id: 'global_sections', label: 'Building global sections' },
    //     { id: 'processing', label: 'Processing designs' },
    //     { id: 'finalize', label: 'Finalizing' },
    //   ],
    //   design: [
    //     { id: 'build', label: 'Convert to Elementor' },
    //     { id: 'generate', label: 'Generate JSON' },
    //   ],
    // },
};
/**
 * Get export steps config for a platform
 * Falls back to webflow if platform not found
 */
function getExportStepsConfig(platform, options) {
    const config = exports.EXPORT_STEPS_CONFIG[platform] || exports.EXPORT_STEPS_CONFIG.webflow;
    // If using assembled designs, filter out global_sections step
    if (options === null || options === void 0 ? void 0 : options.skipGlobalSections) {
        return Object.assign(Object.assign({}, config), { global: config.global.filter(step => step.id !== 'global_sections'), 
            // Simplify design steps for assembled mode - just convert and validate
            design: platform === 'webflow'
                ? [
                    { id: 'convert_design', label: 'Convert to Webflow' },
                    { id: 'generate_xscp', label: 'Generate export' },
                    { id: 'validate_structure', label: 'Validating structure' },
                ]
                : config.design });
    }
    return config;
}
