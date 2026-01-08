// ============================================================================
// EXPORT STEPS CONFIG
// Single source of truth for export stage steps per platform
// ============================================================================

/**
 * Export step definitions per platform
 * - global: Overall export progress (shown in left panel)
 * - design: Per-design progress (shown in design cards)
 */
export const EXPORT_STEPS_CONFIG = {
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
} as const;

// Note: ExportPlatform type already exists in utils/paths.ts
type ExportStepsPlatform = keyof typeof EXPORT_STEPS_CONFIG;

interface ExportStepsOptions {
  /** Skip global sections step (used when assembled designs are available) */
  skipGlobalSections?: boolean;
}

/**
 * Get export steps config for a platform
 * Falls back to webflow if platform not found
 */
export function getExportStepsConfig(platform: string, options?: ExportStepsOptions) {
  const config = EXPORT_STEPS_CONFIG[platform as ExportStepsPlatform] || EXPORT_STEPS_CONFIG.webflow;

  // If using assembled designs, filter out global_sections step
  if (options?.skipGlobalSections) {
    return {
      ...config,
      global: config.global.filter(step => step.id !== 'global_sections'),
      // Simplify design steps for assembled mode - just convert and validate
      design: platform === 'webflow'
        ? [
            { id: 'convert_design', label: 'Convert to Webflow' },
            { id: 'generate_xscp', label: 'Generate export' },
            { id: 'validate_structure', label: 'Validating structure' },
          ]
        : config.design,
    };
  }

  return config;
}
