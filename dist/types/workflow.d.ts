import type { ProjectStatus, Platform } from './core-domain';
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
    /** Original CSS from generate_styles stage (for reset functionality) */
    generateStylesOriginalCSS?: string;
    /** Preview HTML from generate_styles stage (demonstrates all utility classes) */
    generateStylesPreviewHtml?: string;
    /** CSS from consolidate_css stage */
    consolidateCssCSS?: string;
    /** JS from consolidate_scripts stage */
    consolidateScriptsJS?: string;
}
export interface WorkflowStream {
    stage: 'generate_styles' | 'consolidate_css' | 'consolidate_scripts';
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
/**
 * Custom spacing scale values (rem units)
 */
export interface SpacingScale {
    tiny?: string;
    xxsmall?: string;
    xsmall?: string;
    small?: string;
    medium?: string;
    large?: string;
    xlarge?: string;
    xxlarge?: string;
    huge?: string;
    xhuge?: string;
    xxhuge?: string;
}
/**
 * Configuration options for Client-First V2.1 stylesheet generation
 */
export interface StylesConfig {
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
 * Default values for Client-First V2.1 StylesConfig
 */
export declare const DEFAULT_STYLES_CONFIG: StylesConfig;
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
    jsBodyUrl?: string;
    jsBody?: string;
    nodeCount: number;
    styleCount: number;
}
export interface WorkflowExportComplete {
    projectId: string;
    platform: Platform;
    designs: ExportDesignData[];
    isPro?: boolean;
}
export interface WorkflowCommand {
    projectId: string;
    action: 'start' | 'cancel' | 'next' | 'reprocess_export' | 'reprocess_export_fast';
    retry?: boolean;
    /** Styles configuration from styles_config stage */
    stylesConfig?: StylesConfig;
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
}
export interface ClientToServerWorkflowEvents {
    'workflow:command': (data: WorkflowCommand, cb: (ok: boolean) => void) => void;
    'workflow:save_code': (data: CodeSaveRequest, cb: (result: CodeSaveResult) => void) => void;
    'workflow:rename': (data: RenameRequest, cb: (result: RenameResult) => void) => void;
    'workflow:save_stylesheet': (data: StylesheetSaveRequest, cb: (result: StylesheetSaveResult) => void) => void;
    'workflow:reset_stylesheet': (data: StylesheetResetRequest, cb: (result: StylesheetSaveResult) => void) => void;
    'workflow:clean_stylesheet': (data: StylesheetCleanRequest, cb: (result: StylesheetCleanResult) => void) => void;
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