// ============================================================================
// WORKFLOW TYPES - Single source of truth for all workflow state
// ============================================================================
// SIMPLIFIED: 3-level hierarchy only (Stage → Design → Section)
// No beforeSteps, afterSteps, exportSteps - just simple progress tracking
// ============================================================================

import type { ProjectStatus, Platform } from './core-domain';

/**
 * Stage = active processing stages (excludes idle, complete, failed)
 * Derived from ProjectStatus for single source of truth
 */
export type Stage = Exclude<ProjectStatus, 'idle' | 'complete' | 'failed'>;

/** Progress: -1 = failed, 0 = pending, 1-99 = running, 100 = complete */
export type Progress = number;

// Re-export Platform from core-domain for convenience
export type { Platform };

// =============================================================================
// PROGRESS HIERARCHY (3 levels only: Stage → Design → Section)
// =============================================================================

export interface WorkflowSection {
  id: string;
  name: string;
  progress: Progress;
  isGlobal?: boolean;
  variant?: string;
}

/**
 * Export step for design-level or global export progress
 * Progress: 0=pending, 1-99=running, 100=complete, -1=failed
 */
export interface ExportStep {
  id: string;
  label: string;
  progress: Progress;
  message?: string;
  /** Nested sections for steps like global_sections that process multiple items */
  sections?: { id: string; name: string; progress: Progress }[];
}

export interface WorkflowDesign {
  id: string;
  name: string;
  progress: Progress;
  featuredImgUrl?: string;
  sections?: WorkflowSection[];
  steps?: ExportStep[];
}

// =============================================================================
// STAGE STATE
// =============================================================================

export interface WorkflowStage {
  stage: Stage;
  progress: Progress;
  message?: string;
  designs?: WorkflowDesign[];
  exportSteps?: ExportStep[];
  /** If true, this is a retry - frontend should allow progress to decrease */
  retry?: boolean;
  /** Estimated remaining time in milliseconds (export stage only) */
  estimatedRemainingMs?: number;
  /** Timestamp when export stage started (for elapsed time calculation) */
  exportStartedAt?: number;
}

export interface WorkflowStages {
  projectId: string;
  projectName: string;
  platform: Platform;
  currentStage: number;
  stages: WorkflowStage[];
  /** @deprecated Use generateStylesCSS instead */
  css?: string;
  /** @deprecated Use consolidateScriptsJS instead */
  js?: string;
  /** CSS from generate_styles stage (global stylesheet) */
  generateStylesCSS?: string;
  /** Original CSS from generate_styles stage (for reset functionality) */
  generateStylesOriginalCSS?: string;
  /** Preview HTML from generate_styles stage (demonstrates all utility classes) */
  generateStylesPreviewHtml?: string;
  /** JS from consolidate_scripts stage */
  consolidateScriptsJS?: string;
}

// =============================================================================
// SERVER → CLIENT EVENTS
// =============================================================================

export interface WorkflowStream {
  stage: 'generate_styles' | 'consolidate_scripts';
  type: 'css' | 'js' | 'preview_html';
  chunk: string;
  done?: boolean;
  /** If true, frontend should clear accumulated code before appending chunk (used for retries) */
  reset?: boolean;
}

export interface WorkflowError {
  stage: Stage;
  message: string;
}

// =============================================================================
// EDITOR (Customize Stage)
// =============================================================================

export interface EditorSection {
  id: string;
  name: string;
  html: string;
  css: string;
  js?: string;
  globalId?: string;
}

export interface EditorDesign {
  id: string;
  name: string;
  sections: EditorSection[];
}

export interface EditorGlobal {
  id: string;
  name: string;
  variant: string;
  html: string;
  css?: string;
  js?: string;
}

export interface EditorAsset {
  name: string;
  url: string;
}

export interface WorkflowEditor {
  stylesheet: string;
  globalJS?: string;
  assets: EditorAsset[];
  globals: EditorGlobal[];
  designs: EditorDesign[];
}

// =============================================================================
// STYLES CONFIG STAGE TYPES (Client-First V2.1)
// =============================================================================

/**
 * Custom spacing scale values (rem units)
 */
export interface SpacingScale {
  tiny?: string;      // default: 0.125rem (2px)
  xxsmall?: string;   // default: 0.25rem (4px)
  xsmall?: string;    // default: 0.5rem (8px)
  small?: string;     // default: 1rem (16px)
  medium?: string;    // default: 2rem (32px)
  large?: string;     // default: 3rem (48px)
  xlarge?: string;    // default: 4rem (64px)
  xxlarge?: string;   // default: 5rem (80px)
  huge?: string;      // default: 6rem (96px)
  xhuge?: string;     // default: 8rem (128px)
  xxhuge?: string;    // default: 12rem (192px)
}

/**
 * Configuration options for Client-First V2.1 stylesheet generation
 */
export interface StylesConfig {
  // ===========================================
  // REQUIRED (Locked, always true)
  // ===========================================

  /** Use rem units for font sizes (Client-First requirement) */
  useRemFontSizes: boolean;

  /** Use unitless line-height values (Client-First requirement) */
  useUnitlessLineHeight: boolean;

  /** Generate spacing utilities (margin-*, padding-*, spacer-*) - Core Client-First system */
  generateSpacing: boolean;

  /** Generate typography utilities (text-size-*, text-weight-*, heading-style-*, etc.) */
  generateTypography: boolean;

  /** Generate color utilities (text-color-*, background-color-*) */
  generateColors: boolean;

  // ===========================================
  // RECOMMENDED (Enabled by default)
  // ===========================================

  /** Generate button classes (.button, .button.is-*) */
  generateButtons: boolean;

  /** Generate visibility utilities (hide, hide-tablet, etc.) */
  generateVisibility: boolean;

  /** Generate max-width utilities */
  generateMaxWidth: boolean;

  // ===========================================
  // EXTENDED (Disabled by default - adds CSS weight)
  // ===========================================

  /** Generate border/radius utilities */
  generateBorders: boolean;

  /** Generate shadow utilities */
  generateShadows: boolean;

  /** Generate icon sizing utilities */
  generateIcons: boolean;

  /** Generate aspect ratio utilities */
  generateAspectRatios: boolean;

  /** Generate overflow utilities */
  generateOverflow: boolean;

  /** Generate z-index utilities */
  generateZIndex: boolean;

  /** Generate pointer-events utilities */
  generatePointerEvents: boolean;

  // ===========================================
  // CUSTOM VALUES (Optional overrides)
  // ===========================================

  /** Custom spacing scale (overrides defaults) */
  spacingScale?: SpacingScale;
}

/**
 * Default values for Client-First V2.1 StylesConfig
 */
export const DEFAULT_STYLES_CONFIG: StylesConfig = {
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
// CUSTOMIZE STAGE TYPES
// =============================================================================

export interface CustomSectionCode {
  html?: string;
  css?: string;
  js?: string;
}

export interface CustomizeData {
  action: 'save' | 'cancel';
  sectionCustomizations?: Record<string, { code: CustomSectionCode }>;
}

// =============================================================================
// EXPORT COMPLETE EVENT (workflow:export_complete)
// =============================================================================

export interface ExportDesignData {
  id: string;
  name: string;
  sections: { id: string; name: string }[];
  xscpUrl: string;      // S3 URL to fetch XSCP JSON (Webflow) or Bricks template JSON
  jsBodyUrl?: string;   // S3 URL for JS body code (Webflow only)
  jsBody?: string;      // Actual JS body content for clipboard copy (Webflow only)
  nodeCount: number;
  styleCount: number;
}

export interface WorkflowExportComplete {
  projectId: string;
  platform: Platform;
  designs: ExportDesignData[];
  isPro?: boolean;  // Subscription status for frontend section limiting
  /** Custom fonts that need to be added to Webflow project before pasting (Webflow only) */
  customFonts?: string[];
}

// =============================================================================
// CLIENT → SERVER EVENTS
// =============================================================================

export interface WorkflowCommand {
  projectId: string;
  action: 'start' | 'cancel' | 'next' | 'reprocess_export' | 'reprocess_export_fast';
  retry?: boolean;
  /** Styles configuration from styles_config stage (client-first only) */
  stylesConfig?: StylesConfig;
  /** Style framework selected in styles_config stage */
  framework?: 'client-first' | 'simple';
}

// =============================================================================
// EDITOR CODE SAVE TYPES
// =============================================================================

/**
 * Request to save edited code from the customizer
 */
export interface CodeSaveRequest {
  projectId: string;
  changes: CodeChange[];
}

/**
 * A single code change to save
 */
export interface CodeChange {
  /** Type of item being saved */
  type: 'section' | 'globalSection' | 'stylesheet' | 'globalScript';
  /** Section or GlobalSection ID (not needed for stylesheet/globalScript) */
  id?: string;
  /** Design ID (for sections only, used for logging) */
  designId?: string;
  /** The code to save */
  code: {
    html?: string;
    css?: string;
    js?: string;
  };
}

/**
 * Result of a code save operation
 */
export interface CodeSaveResult {
  success: boolean;
  savedCount: number;
  errors?: Array<{
    type: string;
    id?: string;
    message: string;
  }>;
}

// =============================================================================
// STYLESHEET REVIEW TYPES (generate_styles stage)
// =============================================================================

/**
 * Request to save edited stylesheet during generate_styles review
 */
export interface StylesheetSaveRequest {
  projectId: string;
  css: string;
}

/**
 * Request to reset stylesheet to original generated version
 */
export interface StylesheetResetRequest {
  projectId: string;
}

/**
 * Request to clean unused CSS classes from stylesheet
 */
export interface StylesheetCleanRequest {
  projectId: string;
}

/**
 * Result of stylesheet save/reset operation
 */
export interface StylesheetSaveResult {
  success: boolean;
  css?: string;
  error?: string;
}

/**
 * Result of stylesheet clean operation
 */
export interface StylesheetCleanResult {
  success: boolean;
  css?: string;
  removedClasses?: string[];
  originalSize?: number;
  cleanedSize?: number;
  error?: string;
}

// =============================================================================
// RENAME TYPES
// =============================================================================

export type RenameTargetType = 'design' | 'section' | 'globalSection';

export interface RenameRequest {
  projectId: string;
  type: RenameTargetType;
  id: string;
  name: string;
}

export interface RenameResult {
  success: boolean;
  error?: string;
}

// =============================================================================
// SOCKET EVENT TYPES
// =============================================================================

export interface ServerToClientWorkflowEvents {
  'workflow:stage': (data: WorkflowStage) => void;
  'workflow:stages': (data: WorkflowStages) => void;
  'workflow:stream': (data: WorkflowStream) => void;
  'workflow:error': (data: WorkflowError) => void;
  'workflow:editor': (data: WorkflowEditor) => void;
  'workflow:export_complete': (data: WorkflowExportComplete) => void;
  'workflow:renamed': (data: { type: RenameTargetType; id: string; name: string }) => void;
}

export interface ClientToServerWorkflowEvents {
  'workflow:command': (data: WorkflowCommand, cb: (ok: boolean) => void) => void;
  'workflow:save_code': (data: CodeSaveRequest, cb: (result: CodeSaveResult) => void) => void;
  'workflow:rename': (data: RenameRequest, cb: (result: RenameResult) => void) => void;
  // Stylesheet review stage events
  'workflow:save_stylesheet': (data: StylesheetSaveRequest, cb: (result: StylesheetSaveResult) => void) => void;
  'workflow:reset_stylesheet': (data: StylesheetResetRequest, cb: (result: StylesheetSaveResult) => void) => void;
  'workflow:clean_stylesheet': (data: StylesheetCleanRequest, cb: (result: StylesheetCleanResult) => void) => void;
}

// =============================================================================
// HELPERS
// =============================================================================

export const isPending = (p: Progress): boolean => p === 0;
export const isRunning = (p: Progress): boolean => p > 0 && p < 100;
export const isComplete = (p: Progress): boolean => p === 100;
export const isFailed = (p: Progress): boolean => p === -1;

export const STAGE_ORDER: Stage[] = [
  'load',
  'detect_sections',
  'styles_config',
  'generate_styles',
  'review_stylesheet',
  'prepare_build',
  'build',
  'consolidate_scripts',
  'customize',
  'export',
];

export const STAGE_LABELS: Record<Stage, string> = {
  load: 'Loading Data',
  detect_sections: 'Detecting Sections',
  styles_config: 'Configure Styles',
  generate_styles: 'Generating Base Styles',
  review_stylesheet: 'Review Stylesheet',
  prepare_build: 'Preparing Build',
  build: 'Building Sections',
  consolidate_scripts: 'Generating Scripts',
  customize: 'Review & Customize',
  export: 'Exporting',
};

/**
 * Stages to skip for inline CSS platforms (Bricks, Elementor)
 * These platforms use inline styles per section instead of global stylesheets
 */
export const INLINE_PLATFORM_SKIPPED_STAGES: Stage[] = [
  'styles_config',
  'generate_styles',
  'review_stylesheet',
  'consolidate_scripts',
];

/**
 * Check if a platform uses inline CSS (skips global stylesheet stages)
 */
export function isInlineCSSPlatform(platform: string): boolean {
  return platform === 'bricks' || platform === 'elementor';
}

/**
 * Get the stage order for a specific platform
 * Filters out stages that should be skipped for inline CSS platforms
 */
export function getStageOrderForPlatform(platform: string): Stage[] {
  if (isInlineCSSPlatform(platform)) {
    return STAGE_ORDER.filter(stage => !INLINE_PLATFORM_SKIPPED_STAGES.includes(stage));
  }
  return STAGE_ORDER;
}
