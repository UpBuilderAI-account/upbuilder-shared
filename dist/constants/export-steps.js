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
            { id: 'assets', label: 'Uploading assets' },
            { id: 'processing', label: 'Processing designs' },
            { id: 'finalize', label: 'Finalizing' },
        ],
        design: [
            { id: 'convert_styles', label: 'Convert styles' },
            { id: 'build_sections', label: 'Build sections' },
            { id: 'page_assembly', label: 'Page assembly' },
            { id: 'generate_xscp', label: 'Generate export' },
        ],
    },
    bricks: {
        global: [
            { id: 'prepare', label: 'Preparing' },
            { id: 'processing', label: 'Processing designs' },
            { id: 'finalize', label: 'Finalizing' },
        ],
        design: [
            { id: 'initialize', label: 'Initialize' },
            { id: 'build', label: 'Build sections' },
            { id: 'assembly', label: 'Assembly' },
            { id: 'generate', label: 'Generate JSON' },
        ],
    },
    elementor: {
        global: [
            { id: 'prepare', label: 'Preparing' },
            { id: 'processing', label: 'Processing designs' },
            { id: 'finalize', label: 'Finalizing' },
        ],
        design: [
            { id: 'initialize', label: 'Initialize' },
            { id: 'build', label: 'Build sections' },
            { id: 'assembly', label: 'Assembly' },
            { id: 'generate', label: 'Generate JSON' },
        ],
    },
};
/**
 * Get export steps config for a platform
 * Falls back to webflow if platform not found
 */
function getExportStepsConfig(platform) {
    return exports.EXPORT_STEPS_CONFIG[platform] || exports.EXPORT_STEPS_CONFIG.webflow;
}
