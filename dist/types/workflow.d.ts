import type { ProjectStatus, Platform, StyleFramework } from './core-domain';
/**
 * Stage = active processing stages (excludes idle, complete, failed)
 * Derived from ProjectStatus for single source of truth
 */
export type Stage = Exclude<ProjectStatus, 'idle' | 'complete' | 'failed'>;
/** Progress: -1 = failed, 0 = pending, 1-99 = running, 100 = complete */
export type Progress = number;
export type { Platform };
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
    sections?: {
        id: string;
        name: string;
        progress: Progress;
    }[];
}
export interface WorkflowDesign {
    id: string;
    name: string;
    progress: Progress;
    featuredImgUrl?: string;
    sections?: WorkflowSection[];
    steps?: ExportStep[];
}
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
}
export interface WorkflowError {
    stage: Stage;
    message: string;
}
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
/**
 * Export mode: quick uses defaults, custom allows full configuration
 */
export type ExportMode = 'quick' | 'custom';
/**
 * Custom spacing scale values (rem units)
 * Simplified 5-size scale for clarity
 */
export interface SpacingScale {
    small?: string;
    medium?: string;
    large?: string;
    xlarge?: string;
    xxlarge?: string;
}
/**
 * Stylesheet configuration (part of ExportConfig)
 * Controls CSS generation options
 */
export interface StylesheetConfig {
    /** Style framework to use */
    framework: StyleFramework;
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
    /** Generate button classes (.button, .button.is-*) */
    generateButtons: boolean;
    /** Generate visibility utilities (hide, hide-tablet, etc.) */
    generateVisibility: boolean;
    /** Generate max-width utilities */
    generateMaxWidth: boolean;
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
    /** Custom spacing scale (overrides defaults) */
    spacingScale?: SpacingScale;
    /**
     * Allow flexible CSS units (rem, em, %, vh, vw)
     * If false, only px is allowed
     * Default: true for client-first, false for bem-lite
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
}
/**
 * Default stylesheet configuration
 */
export declare const DEFAULT_STYLESHEET_CONFIG: StylesheetConfig;
/**
 * Default responsive configuration
 */
export declare const DEFAULT_RESPONSIVE_CONFIG: ResponsiveConfig;
/**
 * Default interactivity configuration
 */
export declare const DEFAULT_INTERACTIVITY_CONFIG: InteractivityConfig;
/**
 * Quick mode interactivity
 */
export declare const QUICK_INTERACTIVITY_CONFIG: InteractivityConfig;
/**
 * Quick export config - uses defaults, skips stylesheet review, no animations
 */
export declare const QUICK_EXPORT_CONFIG: ExportConfig;
/**
 * Default export config - custom mode selected by default
 */
export declare const DEFAULT_EXPORT_CONFIG: ExportConfig;
export interface CustomSectionCode {
    html?: string;
    css?: string;
    js?: string;
}
export interface CustomizeData {
    action: 'save' | 'cancel';
    sectionCustomizations?: Record<string, {
        code: CustomSectionCode;
    }>;
}
/** Section info from AI analysis with bounding box for screenshot cropping */
export interface ExportSectionData {
    id: string;
    name: string;
    type: string;
    elementIds: string[];
    bounds?: {
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
    xscpUrl: string;
    /** @deprecated Use WorkflowExportComplete.globalJsUrl instead */
    jsBodyUrl?: string;
    /** @deprecated Use WorkflowExportComplete.globalJs instead */
    jsBody?: string;
    nodeCount: number;
    styleCount: number;
    isLocked?: boolean;
}
/** Custom font info with weights and styles */
export interface CustomFontInfo {
    family: string;
    weights: string[];
    styles: string[];
}
export interface WorkflowExportComplete {
    projectId: string;
    platform: Platform;
    designs: ExportDesignData[];
    isPro?: boolean;
    /** Custom fonts that need to be added to Webflow project before pasting (Webflow only) */
    customFonts?: CustomFontInfo[];
    /** Global JavaScript for entire project (Webflow only) - add to Project Settings > Custom Code */
    globalJs?: string;
    /** S3 URL for global JavaScript file (Webflow only) */
    globalJsUrl?: string;
}
export interface WorkflowCommand {
    projectId: string;
    action: 'start' | 'cancel' | 'next' | 'reprocess_load' | 'reprocess_convert_to_platform' | 'reprocess_customize' | 'reprocess_customize_fast';
    retry?: boolean;
    /** Export configuration from export_config stage */
    exportConfig?: ExportConfig;
}
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
export interface ServerToClientWorkflowEvents {
    'workflow:stage': (data: WorkflowStage) => void;
    'workflow:stages': (data: WorkflowStages) => void;
    'workflow:error': (data: WorkflowError) => void;
    'workflow:editor': (data: WorkflowEditor) => void;
    'workflow:export_complete': (data: WorkflowExportComplete) => void;
    'workflow:renamed': (data: {
        type: RenameTargetType;
        id: string;
        name: string;
    }) => void;
    'workflow:background_progress': (data: WorkflowBackgroundProgress) => void;
}
export interface ClientToServerWorkflowEvents {
    'workflow:command': (data: WorkflowCommand, cb: (ok: boolean) => void) => void;
    'workflow:save_code': (data: CodeSaveRequest, cb: (result: CodeSaveResult) => void) => void;
    'workflow:rename': (data: RenameRequest, cb: (result: RenameResult) => void) => void;
}
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
export declare const isPending: (p: Progress) => boolean;
export declare const isRunning: (p: Progress) => boolean;
export declare const isComplete: (p: Progress) => boolean;
export declare const isFailed: (p: Progress) => boolean;
export declare const STAGE_ORDER: Stage[];
export declare const STAGE_LABELS: Record<Stage, string>;
/**
 * Get the stage order for a specific platform
 * Currently all platforms use the same stage order
 */
export declare function getStageOrderForPlatform(_platform: string): Stage[];
//# sourceMappingURL=workflow.d.ts.map