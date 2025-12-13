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
}
export interface WorkflowStages {
    projectId: string;
    projectName: string;
    platform: Platform;
    currentStage: number;
    stages: WorkflowStage[];
    css?: string;
    js?: string;
}
export interface WorkflowStream {
    stage: 'generate_styles' | 'consolidate_css' | 'consolidate_scripts';
    type: 'css' | 'js';
    chunk: string;
    done?: boolean;
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
    jsHeadUrl?: string;
    jsBodyUrl?: string;
    nodeCount: number;
    styleCount: number;
}
export interface WorkflowExportComplete {
    projectId: string;
    platform: Platform;
    designs: ExportDesignData[];
}
export interface WorkflowCommand {
    projectId: string;
    action: 'start' | 'cancel' | 'next' | 'reprocess_export' | 'reprocess_export_fast';
    retry?: boolean;
}
export interface ServerToClientWorkflowEvents {
    'workflow:stage': (data: WorkflowStage) => void;
    'workflow:stages': (data: WorkflowStages) => void;
    'workflow:stream': (data: WorkflowStream) => void;
    'workflow:error': (data: WorkflowError) => void;
    'workflow:editor': (data: WorkflowEditor) => void;
    'workflow:export_complete': (data: WorkflowExportComplete) => void;
}
export interface ClientToServerWorkflowEvents {
    'workflow:command': (data: WorkflowCommand, cb: (ok: boolean) => void) => void;
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