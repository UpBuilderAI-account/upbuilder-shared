// ============================================================================
// WORKFLOW TYPES - Single source of truth for all workflow state
// ============================================================================
// SIMPLIFIED: 3-level hierarchy only (Stage → Design → Section)
// No beforeSteps, afterSteps, exportSteps - just simple progress tracking
// ============================================================================

import type { ProjectStatus, Platform, StyleFramework } from './core-domain';

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
  /** Assembly progress tracking (build stage only) */
  assemblyProgress?: AssemblyProgress;
}

export interface WorkflowStages {
  projectId: string;
  projectName: string;
  platform: Platform;
  currentStage: number;
  stages: WorkflowStage[];
  /** CSS from generate_styles stage (global stylesheet) */
  generateStylesCSS?: string;
  /** Original CSS from generate_styles stage (for reset functionality) */
  generateStylesOriginalCSS?: string;
  /** Preview HTML from generate_styles stage (demonstrates all utility classes) */
  generateStylesPreviewHtml?: string;
}

// =============================================================================
// SERVER → CLIENT EVENTS
// =============================================================================

export interface WorkflowStream {
  stage: 'generate_styles';
  type: 'css' | 'preview_html';
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
  /** When true, editor is in view-only mode (superadmin viewing past customize stage) */
  readOnly?: boolean;
}

// =============================================================================
// EXPORT CONFIG STAGE TYPES
// Replaces old StylesConfig - now includes mode, stylesheet, and interactivity
// =============================================================================

/**
 * Export mode: quick uses defaults, custom allows full configuration
 */
export type ExportMode = 'quick' | 'custom';

/**
 * Custom spacing scale values (rem units)
 * Simplified 5-size scale for clarity
 */
export interface SpacingScale {
  small?: string;     // default: 1rem (16px)
  medium?: string;    // default: 2rem (32px)
  large?: string;     // default: 3rem (48px)
  xlarge?: string;    // default: 5rem (80px)
  xxlarge?: string;   // default: 8rem (128px)
}

/**
 * Stylesheet configuration (part of ExportConfig)
 * Controls CSS generation options
 */
export interface StylesheetConfig {
  /** Style framework to use */
  framework: StyleFramework;

  // ===========================================
  // CORE (Locked, always true)
  // ===========================================

  /** Use rem units for font sizes */
  useRemFontSizes: boolean;

  /** Use unitless line-height values */
  useUnitlessLineHeight: boolean;

  /** Generate spacing utilities (margin-*, padding-*, spacer-*) */
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
 * Responsive configuration (part of ExportConfig)
 * Controls responsive breakpoint CSS generation
 */
export interface ResponsiveConfig {
  /**
   * Enable responsive styles for Webflow breakpoints:
   * - Desktop: Base styles (default)
   * - Tablet: 991px and below
   * - Mobile Landscape: 767px and below
   * - Mobile Portrait: 478px and below
   */
  enableResponsive: boolean;
}

/**
 * Interactivity configuration (part of ExportConfig)
 * Controls CSS transitions, JavaScript components, and animations
 */
export interface InteractivityConfig {
  /**
   * Enable CSS transitions and hover effects:
   * - Smooth hover states on buttons, links, cards
   * - CSS transition properties
   * - :hover, :focus, :active state changes
   */
  enableTransitions: boolean;

  /**
   * Enable JavaScript in the export:
   * - Required for interactive elements (sliders, tabs, accordions, modals, filters)
   * - Required for scroll animations to work
   */
  enableJavaScript: boolean;

  /**
   * Enable scroll animations (requires enableJavaScript):
   * - Scroll reveals (AOS fade-up on sections, zoom on images)
   * - Infinite marquees (auto-detected logo strips)
   * - Entrance animations
   */
  enableAnimations: boolean;
}

/**
 * Complete export configuration
 * Sent from frontend to backend during export_config stage
 */
export interface ExportConfig {
  mode: ExportMode;
  stylesheet: StylesheetConfig;
  responsive: ResponsiveConfig;
  interactivity: InteractivityConfig;
}

/**
 * Default stylesheet configuration
 */
export const DEFAULT_STYLESHEET_CONFIG: StylesheetConfig = {
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
export const DEFAULT_RESPONSIVE_CONFIG: ResponsiveConfig = {
  enableResponsive: true,    // Responsive styles enabled by default
};

/**
 * Default interactivity configuration
 */
export const DEFAULT_INTERACTIVITY_CONFIG: InteractivityConfig = {
  enableTransitions: true,   // CSS hover effects enabled by default
  enableJavaScript: true,    // JS components enabled by default
  enableAnimations: false,   // Scroll animations disabled (coming soon)
};

/**
 * Quick mode interactivity - no JS/animations for faster export
 */
export const QUICK_INTERACTIVITY_CONFIG: InteractivityConfig = {
  enableTransitions: true,   // Keep CSS transitions even in quick mode
  enableJavaScript: false,
  enableAnimations: false,
};

/**
 * Quick export config - uses defaults, skips stylesheet review, no animations
 */
export const QUICK_EXPORT_CONFIG: ExportConfig = {
  mode: 'quick',
  stylesheet: DEFAULT_STYLESHEET_CONFIG,
  responsive: DEFAULT_RESPONSIVE_CONFIG,
  interactivity: QUICK_INTERACTIVITY_CONFIG,
};

/**
 * Default export config - custom mode selected by default
 */
export const DEFAULT_EXPORT_CONFIG: ExportConfig = {
  mode: 'custom',
  stylesheet: DEFAULT_STYLESHEET_CONFIG,
  responsive: DEFAULT_RESPONSIVE_CONFIG,
  interactivity: DEFAULT_INTERACTIVITY_CONFIG,
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
  /** @deprecated Use WorkflowExportComplete.globalJsUrl instead */
  jsBodyUrl?: string;   // S3 URL for JS body code (Webflow only) - DEPRECATED
  /** @deprecated Use WorkflowExportComplete.globalJs instead */
  jsBody?: string;      // Actual JS body content for clipboard copy (Webflow only) - DEPRECATED
  nodeCount: number;
  styleCount: number;
  isLocked?: boolean;   // True if design exceeds tier limit and wasn't processed
}

/** Custom font info with weights and styles */
export interface CustomFontInfo {
  family: string;
  weights: string[];  // e.g., ['400', '500', '700']
  styles: string[];   // e.g., ['normal', 'italic']
}

export interface WorkflowExportComplete {
  projectId: string;
  platform: Platform;
  designs: ExportDesignData[];
  isPro?: boolean;  // Subscription status for frontend section limiting
  /** Custom fonts that need to be added to Webflow project before pasting (Webflow only) */
  customFonts?: CustomFontInfo[];
  /** Global JavaScript for entire project (Webflow only) - add to Project Settings > Custom Code */
  globalJs?: string;
  /** S3 URL for global JavaScript file (Webflow only) */
  globalJsUrl?: string;
}

// =============================================================================
// CLIENT → SERVER EVENTS
// =============================================================================

export interface WorkflowCommand {
  projectId: string;
  action: 'start' | 'cancel' | 'next' | 'reprocess_load' | 'reprocess_detect_sections' | 'reprocess_generate_styles' | 'reprocess_prepare_build' | 'reprocess_convert_to_platform' | 'reprocess_customize' | 'reprocess_customize_fast';
  retry?: boolean;
  /** Export configuration from export_config stage */
  exportConfig?: ExportConfig;
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
// BACKGROUND PROGRESS TYPES (export_config stage)
// =============================================================================

export type BackgroundJobStatus = 'pending' | 'running' | 'complete' | 'failed';

/**
 * Background job progress during export_config stage
 * load + detect_sections run in background while user configures
 */
export interface WorkflowBackgroundProgress {
  projectId: string;
  load: BackgroundJobStatus;
  detectSections: BackgroundJobStatus;
  /** Number of designs loaded (after load completes) */
  designCount?: number;
  /** Number of sections detected (after detectSections completes) */
  sectionCount?: number;
  /** Error message if any job failed */
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
  'workflow:background_progress': (data: WorkflowBackgroundProgress) => void;
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
// ASSEMBLY TYPES (Build stage consolidation + assembly)
// =============================================================================

/**
 * Consolidation step status (CSS or JS consolidation)
 */
export interface ConsolidationStep {
  type: 'css' | 'js';
  status: 'pending' | 'running' | 'complete' | 'failed';
  progress: Progress;
  message?: string;
}

/**
 * Design assembly status with validation step
 */
export interface AssemblyDesign {
  id: string;
  name: string;
  /** Assembly step: building the design HTML */
  status: 'pending' | 'running' | 'complete' | 'failed';
  progress: Progress;
  /** Validation step: runs after assembly completes */
  validation?: {
    status: 'pending' | 'running' | 'complete' | 'failed';
    progress: Progress;
    message?: string;
  };
}

/**
 * Asset upload progress (runs in background during conversion)
 */
export interface AssetUploadProgress {
  status: 'pending' | 'running' | 'complete' | 'failed';
  progress: Progress;
  uploaded: number;
  total: number;
}

/**
 * Assembly progress tracking (consolidation + design assembly)
 */
export interface AssemblyProgress {
  /** Asset upload runs in background during entire conversion */
  assetUpload?: AssetUploadProgress;
  consolidation: {
    css: ConsolidationStep;
    js: ConsolidationStep;
    jsEnabled: boolean;  // Whether JS consolidation is enabled (based on enableJavaScript config)
  };
  designs: AssemblyDesign[];
}

/**
 * Assembled design output (result of build stage)
 */
export interface AssembledDesign {
  id: string;
  designId: string;
  name: string;
  html: string;
  css: string;
  js: string;
  sectionCount: number;
  createdAt: string;
}

// =============================================================================
// HELPERS
// =============================================================================

export const isPending = (p: Progress): boolean => p === 0;
export const isRunning = (p: Progress): boolean => p > 0 && p < 100;
export const isComplete = (p: Progress): boolean => p === 100;
export const isFailed = (p: Progress): boolean => p === -1;

export const STAGE_ORDER: Stage[] = [
  'export_config',
  'load',
  'detect_sections',
  'generate_styles',
  'review_stylesheet',
  'prepare_build',
  'convert_to_platform',
  'customize',
];

export const STAGE_LABELS: Record<Stage, string> = {
  export_config: 'Configure Export',
  load: 'Loading Data',
  detect_sections: 'Detecting Sections',
  generate_styles: 'Generating Base Styles',
  review_stylesheet: 'Review Stylesheet',
  prepare_build: 'Preparing Build',
  convert_to_platform: 'Converting to Webflow',
  customize: 'Preview & Export',
};

/**
 * Stages to skip for inline CSS platforms (Bricks, Elementor)
 * These platforms use inline styles per section instead of global stylesheets
 */
export const INLINE_PLATFORM_SKIPPED_STAGES: Stage[] = [
  'generate_styles',
  'review_stylesheet',
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
