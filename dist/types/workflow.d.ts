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
 * Quick mode interactivity - no JS/animations for faster export
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
export interface ExportDesignData {
    id: string;
    name: string;
    sections: {
        id: string;
        name: string;
    }[];
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
    action: 'start' | 'cancel' | 'next' | 'reprocess_load' | 'reprocess_detect_sections' | 'reprocess_generate_styles' | 'reprocess_prepare_build' | 'reprocess_convert_to_platform';
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
export interface ServerToClientWorkflowEvents {
    'workflow:stage': (data: WorkflowStage) => void;
    'workflow:stages': (data: WorkflowStages) => void;
    'workflow:stream': (data: WorkflowStream) => void;
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
    'workflow:save_stylesheet': (data: StylesheetSaveRequest, cb: (result: StylesheetSaveResult) => void) => void;
    'workflow:reset_stylesheet': (data: StylesheetResetRequest, cb: (result: StylesheetSaveResult) => void) => void;
    'workflow:clean_stylesheet': (data: StylesheetCleanRequest, cb: (result: StylesheetCleanResult) => void) => void;
}
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
 * Design assembly status
 */
export interface AssemblyDesign {
    id: string;
    name: string;
    status: 'pending' | 'running' | 'complete' | 'failed';
    progress: Progress;
}
/**
 * Assembly progress tracking (consolidation + design assembly)
 */
export interface AssemblyProgress {
    consolidation: {
        css: ConsolidationStep;
        js: ConsolidationStep;
        jsEnabled: boolean;
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
export declare const isPending: (p: Progress) => boolean;
export declare const isRunning: (p: Progress) => boolean;
export declare const isComplete: (p: Progress) => boolean;
export declare const isFailed: (p: Progress) => boolean;
export declare const STAGE_ORDER: Stage[];
export declare const STAGE_LABELS: Record<Stage, string>;
/**
 * Stages to skip for inline CSS platforms (Bricks, Elementor)
 * These platforms use inline styles per section instead of global stylesheets
 */
export declare const INLINE_PLATFORM_SKIPPED_STAGES: Stage[];
/**
 * Check if a platform uses inline CSS (skips global stylesheet stages)
 */
export declare function isInlineCSSPlatform(platform: string): boolean;
/**
 * Get the stage order for a specific platform
 * Filters out stages that should be skipped for inline CSS platforms
 */
export declare function getStageOrderForPlatform(platform: string): Stage[];
//# sourceMappingURL=workflow.d.ts.map