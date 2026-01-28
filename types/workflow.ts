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
  /** Streaming output content for this stage (workflow terminal text) */
  streamContent?: string;
}

/**
 * Early asset upload progress (runs in background during Stages 2-4)
 * Separate from assemblyProgress because it spans multiple stages
 */
export interface EarlyAssetUploadProgress {
  status: 'pending' | 'running' | 'complete' | 'failed';
  uploaded: number;
  total: number;
}

export interface WorkflowStages {
  projectId: string;
  projectName: string;
  platform: Platform;
  currentStage: number;
  stages: WorkflowStage[];
  /** Early asset upload progress (runs in background during load stage) */
  earlyAssetUpload?: EarlyAssetUploadProgress;
  /** Accumulated stream content for reconnection (workflow:output text) */
  streamContent?: string;
}

// =============================================================================
// SERVER → CLIENT EVENTS
// =============================================================================

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

  // ===========================================
  // UNITS
  // ===========================================

  /**
   * Allow flexible CSS units (rem, em, %, vh, vw)
   * If false, only px is allowed
   */
  allowFlexibleUnits: boolean;
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
 * Controls CSS transitions and hover effects
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
   * Enable interactive components (tabs, sliders, dropdowns, carousels)
   * If false, forces static layouts only - no interactive patterns
   */
  enableInteractiveComponents: boolean;
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
  /** Custom AI instructions for guiding design decisions (optional) */
  customInstructions?: string;
  /**
   * Enable AI assistant (planning + auto-fixing phases)
   * When enabled, AI analyzes the design, creates a plan, and auto-fixes visual issues
   * When disabled, skips plan and fixing stages for faster export
   * Default: true (enabled)
   */
  enableAIAssistant?: boolean;
  /**
   * @deprecated Use enableAIAssistant instead
   */
  enablePlanning?: boolean;
  /**
   * Webflow-specific configuration
   * When set, synced styles from the Webflow site will be merged with AI-generated styles
   */
  webflow?: {
    /** The Webflow site ID to use for synced styles */
    siteId: string;
    /** Whether to use synced styles from this site (default: true if siteId is set) */
    useSyncedStyles?: boolean;
  };
  /**
   * UpBuilder-specific configuration
   * When set, styles from an existing UpBuilder project will be reused
   */
  upbuilder?: {
    /** The source project ID to reuse styles from */
    projectId: string;
    /** The source design ID (optional, for reference) */
    designId?: string;
    /** Whether to reuse styles from this project (default: true if projectId is set) */
    reuseStyles?: boolean;
  };
}

/**
 * Default stylesheet configuration
 */
export const DEFAULT_STYLESHEET_CONFIG: StylesheetConfig = {
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

  // Units (disabled by default)
  allowFlexibleUnits: false,
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
  enableTransitions: false,   // CSS hover effects disabled by default
  enableInteractiveComponents: false,  // Tabs, sliders, dropdowns disabled by default (enable for specific sections)
};

/**
 * Quick mode interactivity
 */
export const QUICK_INTERACTIVITY_CONFIG: InteractivityConfig = {
  enableTransitions: false,   // CSS hover effects disabled by default
  enableInteractiveComponents: false,  // Tabs, sliders, dropdowns disabled by default
};

/**
 * Quick export config - uses defaults, skips stylesheet review, no animations
 */
export const QUICK_EXPORT_CONFIG: ExportConfig = {
  mode: 'quick',
  stylesheet: DEFAULT_STYLESHEET_CONFIG,
  responsive: DEFAULT_RESPONSIVE_CONFIG,
  interactivity: QUICK_INTERACTIVITY_CONFIG,
  enableAIAssistant: false,  // Quick mode skips AI planning and fixing
};

/**
 * Default export config - custom mode selected by default
 */
export const DEFAULT_EXPORT_CONFIG: ExportConfig = {
  mode: 'custom',
  stylesheet: DEFAULT_STYLESHEET_CONFIG,
  responsive: DEFAULT_RESPONSIVE_CONFIG,
  interactivity: DEFAULT_INTERACTIVITY_CONFIG,
  enableAIAssistant: true,  // AI assistant (planning + fixing) enabled by default
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

/** Section info from AI analysis with bounding box for screenshot cropping */
export interface ExportSectionData {
  id: string;
  name: string;
  type: string;           // "navbar", "hero", "features", etc.
  elementIds: string[];   // Element IDs from HTML list for this section
  bounds?: {              // Calculated bounding box from element IDs (original Figma coordinates)
    x: number;
    y: number;
    width: number;
    height: number;
  };
}

export interface ExportDesignData {
  id: string;
  name: string;
  sections: ExportSectionData[];
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
  action: 'start' | 'cancel' | 'next' | 'resume' | 'reprocess_load' | 'reprocess_convert_to_platform' | 'reprocess_customize' | 'reprocess_customize_fast' | 'quick_rebuild';
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
 * load runs in background while user configures
 */
export interface WorkflowBackgroundProgress {
  projectId: string;
  load: BackgroundJobStatus;
  /** Number of designs loaded (after load completes) */
  designCount?: number;
  /** Error message if any job failed */
  error?: string;
}

// =============================================================================
// SOCKET EVENT TYPES
// =============================================================================

export interface ServerToClientWorkflowEvents {
  'workflow:stage': (data: WorkflowStage) => void;
  'workflow:stages': (data: WorkflowStages) => void;
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
}

// =============================================================================
// ASSEMBLY TYPES (Build stage consolidation + assembly)
// =============================================================================

/**
 * Design build status with validation step (streamlined workflow)
 * Each design goes through: Build (unified AI) -> XSCP -> Validate
 */
export interface AssemblyDesign {
  id: string;
  name: string;
  /** Build step: unified AI call that outputs styles + structure */
  status: 'pending' | 'running' | 'complete' | 'failed';
  progress: Progress;
  /** Validation step: runs after build completes */
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

/** Build phase for 2-step progress UI */
export type BuildPhase = 'analyzing' | 'building';

/**
 * Assembly progress tracking (streamlined: just designs + asset upload)
 */
export interface AssemblyProgress {
  /** Asset upload runs in background during entire conversion */
  assetUpload?: AssetUploadProgress;
  /** Designs being built (unified build -> XSCP -> validate) */
  designs: AssemblyDesign[];
  /** Current build phase for 3-step progress UI */
  buildPhase?: BuildPhase;
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
// BUILD STYLES TYPES (New build-styles stage)
// =============================================================================

/**
 * Style definition for build-styles and build-sections output
 * Represents a single CSS class with breakpoint and state variants
 */
export interface StyleDefinition {
  /** Class ID/name (e.g., "padding-global", "button", "abc_hero_grid") */
  id: string;
  /** Combo indicator: "" = base class, "&" = combo modifier */
  comb: '' | '&';
  /** Desktop CSS properties */
  main: string;
  /** Tablet CSS (≤991px) */
  medium?: string;
  /** Mobile portrait CSS (≤478px) */
  tiny?: string;
  /** Hover state CSS */
  hover?: string;
  /** Focus state CSS */
  focus?: string;
  /** Active/pressed state CSS */
  active?: string;
  /** Original Webflow style ID (for synced styles - preserves ID on import) */
  webflowStyleId?: string;
}

/**
 * Build styles stage state
 * Stores the base style system created before build-sections
 */
export interface BuildStylesState {
  /** All base styles (utilities, typography, buttons, etc.) */
  styles: StyleDefinition[];
  /** Raw AI output for debugging */
  rawOutput: string;
  /** Timestamp when completed */
  completedAt: number;
}

// =============================================================================
// SECTION BOUNDING & BUILD SECTIONS TYPES
// =============================================================================

/**
 * Section type classification for bounding
 * Flexible string - AI can use any descriptive type (navbar, hero, cta, pricing, testimonials, etc.)
 */
export type SectionType = string;

/**
 * Global section verdict from plan stage analysis
 * IDENTICAL = same across all designs (reuse one)
 * HAS_VARIANTS = visual differences exist (build each variant once)
 */
export type GlobalVerdict = 'IDENTICAL' | 'HAS_VARIANTS';

/**
 * Bounded section from AI analysis
 * Contains bounding box + section tree from design
 */
export interface BoundedSection {
  id: string;
  name: string;
  type: SectionType;
  bounds: { x: number; y: number; width: number; height: number };
  elementIds: string[];
  isGlobal: boolean;
  order: number;
  /** Design ID this section belongs to */
  designId: string;
  /** Google File Manager URI for section screenshot (set by section bounding stage) */
  screenshotUri?: string;

  // ===========================================
  // GLOBAL SECTION DEDUPLICATION METADATA
  // ===========================================

  /** Global verdict from plan stage (IDENTICAL or HAS_VARIANTS) */
  globalVerdict?: GlobalVerdict;

  /**
   * Variant identifier for HAS_VARIANTS globals
   * e.g., "navbar_light", "navbar_dark", "team_v1", "team_v2"
   * Sections with same variant share one AI call in build_sections
   */
  variant?: string;

  /**
   * List of design IDs where this section (or its variant) is used
   * For IDENTICAL globals: all designs using this exact section
   * For HAS_VARIANTS: all designs using this specific variant
   */
  usedInDesigns?: string[];

  /**
   * If true, this is the "primary" instance that will be analyzed
   * Other sections with same variant will copy from this one
   */
  isPrimaryInstance?: boolean;

  /**
   * Reference to the primary section ID if this is a duplicate
   * Used to copy analysis results after build_sections
   */
  primarySectionId?: string;
}

/**
 * Analysis result for a single section
 */
export interface SectionAnalysis {
  sectionId: string;
  sectionName: string;
  designId: string;
  analysis: {
    layout: string;
    colors: string[];
    typography: string;
    elements: string[];
    suggestedClasses: string[];
  };
  /** Raw AI output in the specified format (STRUCTURE + NEW_STYLES) */
  rawOutput: string;
  /** New styles created by this section (parsed from NEW_STYLES block) */
  newStyles?: StyleDefinition[];
  /** Timestamp when analysis completed */
  completedAt: number;
}

/**
 * Build sections stage state stored in project
 */
export interface BuildSectionsState {
  /** All bounded sections across all designs */
  sections: BoundedSection[];
  /** Completed section analyses */
  analyses: SectionAnalysis[];
  /** All new styles from all sections (merged from each section's newStyles) */
  allNewStyles: StyleDefinition[];
  /** Index of current section being analyzed */
  currentSectionIndex: number;
  /** Whether the build sections stage is complete */
  complete: boolean;
}

// =============================================================================
// BUILD SECTIONS SOCKET EVENTS
// =============================================================================

export interface BuildSectionsEvents {
  /** Backend → Frontend: Request screenshot for a section */
  'build_sections:request_screenshot': {
    projectId: string;
    sectionId: string;
    bounds: { x: number; y: number; width: number; height: number };
    designId: string;
    /** S3 URL for the big preview image (for frontend cropping) */
    bigPreviewUrl?: string;
    /** Dimensions of the big preview image */
    bigPreviewDimensions?: { width: number; height: number };
    /** Original Figma frame dimensions (bounds are relative to this) */
    designDimensions?: { width: number; height: number };
  };
  /** Frontend → Backend: Screenshot captured */
  'build_sections:screenshot_ready': {
    projectId: string;
    sectionId: string;
    screenshot: string; // base64 data URL
  };
  /** Backend → Frontend: AI analysis streaming */
  'build_sections:analysis_stream': {
    projectId: string;
    sectionId: string;
    chunk: string;
    done: boolean;
  };
  /** Backend → Frontend: Section analysis complete */
  'build_sections:section_complete': {
    projectId: string;
    sectionId: string;
    analysis: SectionAnalysis;
  };
  /** Backend → Frontend: All sections analyzed */
  'build_sections:all_complete': {
    projectId: string;
    sections: SectionAnalysis[];
  };
}

// =============================================================================
// SECTION BOUNDING SOCKET EVENTS
// =============================================================================

export interface SectionBoundingEvents {
  'section_bounding:start': { projectId: string };
  'section_bounding:progress': { projectId: string; percent: number; message: string };
  'section_bounding:result': { projectId: string; sections: BoundedSection[] };
  'section_bounding:error': { projectId: string; error: string };
}

// =============================================================================
// ASSEMBLY SOCKET EVENTS
// =============================================================================

export interface AssemblyEvents {
  'assembly:start': { projectId: string };
  'assembly:progress': { projectId: string; percent: number; message: string };
  'assembly:stream': { projectId: string; chunk: string; done: boolean };
  'assembly:complete': {
    projectId: string;
    /** Structure blocks per design (D1, D2, etc.) */
    structures: Record<string, string>;
    /** Combined ALL_STYLES */
    styles: string;
  };
  'assembly:error': { projectId: string; error: string };
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
  'plan',
  'section_bounding',
  'build_styles',
  'build_sections',
  'convert_to_platform',
  'summary',
  'customize',
];

export const STAGE_LABELS: Record<Stage, string> = {
  // Plugin-side stages
  analyze_design: 'Analyzing Design',
  images_export: 'Uploading Images',
  // Backend workflow stages
  export_config: 'Configure Export',
  load: 'Loading Data',
  plan: 'Planning Design',
  section_bounding: 'Detecting Sections',
  build_styles: 'Building Styles',
  build_sections: 'Building Sections',
  assembly: 'Assembling', // @deprecated - kept for backwards compatibility
  convert_to_platform: 'Generating Export',
  summary: 'Saving Version',
  customize: 'Preview & Export',
};

/**
 * Get the stage order for a specific platform
 * Currently all platforms use the same stage order
 */
export function getStageOrderForPlatform(_platform: string): Stage[] {
  return STAGE_ORDER;
}
