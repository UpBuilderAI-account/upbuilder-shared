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
}

export interface WorkflowStages {
  projectId: string;
  projectName: string;
  platform: Platform;
  currentStage: number;
  stages: WorkflowStage[];
  /** @deprecated Use generateStylesCSS/consolidateCssCSS instead */
  css?: string;
  /** @deprecated Use consolidateScriptsJS instead */
  js?: string;
  /** CSS from generate_styles stage */
  generateStylesCSS?: string;
  /** CSS from consolidate_css stage */
  consolidateCssCSS?: string;
  /** JS from consolidate_scripts stage */
  consolidateScriptsJS?: string;
}

// =============================================================================
// SERVER → CLIENT EVENTS
// =============================================================================

export interface WorkflowStream {
  stage: 'generate_styles' | 'consolidate_css' | 'consolidate_scripts';
  type: 'css' | 'js';
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
}

// =============================================================================
// CLIENT → SERVER EVENTS
// =============================================================================

export interface WorkflowCommand {
  projectId: string;
  action: 'start' | 'cancel' | 'next' | 'reprocess_export' | 'reprocess_export_fast';
  retry?: boolean;
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
  'generate_styles',
  'prepare_build',
  'build',
  'consolidate_css',
  'consolidate_scripts',
  'customize',
  'export',
];

export const STAGE_LABELS: Record<Stage, string> = {
  load: 'Loading Data',
  detect_sections: 'Detecting Sections',
  generate_styles: 'Generating Base Styles',
  prepare_build: 'Preparing Build',
  build: 'Building Sections',
  consolidate_css: 'Regenerating All Styles',
  consolidate_scripts: 'Generating Scripts',
  customize: 'Review & Customize',
  export: 'Exporting',
};

/**
 * Stages to skip for inline CSS platforms (Bricks, Elementor)
 * These platforms use inline styles per section instead of global stylesheets
 */
export const INLINE_PLATFORM_SKIPPED_STAGES: Stage[] = [
  'generate_styles',
  'consolidate_css',
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
