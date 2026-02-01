/**
 * Plan Stage Types - Structured Plan Format
 *
 * The plan stage now outputs structured JSON that can be rendered
 * as organized, collapsible cards instead of raw markdown.
 */
export interface StructuredPlan {
    summary: PlanSummary;
    designs: PlanDesign[];
    colorPalette: PlanColor[];
    typography: PlanTypography[];
    globalComponents: PlanGlobalComponent[];
    sectionsPerDesign: PlanDesignSections[];
    /** Whether the design contains repeating content patterns eligible for CMS (product grids, blog lists, team members, etc.) */
    hasCmsContent?: boolean;
}
export interface PlanSummary {
    projectName: string;
    designCount: number;
    framework: 'client-first';
    totalSections: number;
    globalComponentsCount: number;
    customInstructions?: string;
    constraints: PlanConstraints;
}
export interface PlanConstraints {
    responsive: boolean;
    hoverEffects: boolean;
    interactiveComponents: boolean;
    units: 'px' | 'rem';
}
export interface PlanDesign {
    id: string;
    index: number;
    originalName: string;
    proposedName: string;
    type: string;
    sectionCount: number;
}
export interface PlanColor {
    name: string;
    hex: string;
    usage: 'primary' | 'secondary' | 'accent' | 'text' | 'text-muted' | 'background' | 'surface' | 'border' | 'error' | 'success' | 'warning' | 'other';
}
export interface PlanTypography {
    element: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'body' | 'body-large' | 'small' | 'caption';
    fontFamily: string;
    fontSize: string;
    fontWeight: string;
    lineHeight?: string;
    letterSpacing?: string;
}
export interface PlanGlobalComponent {
    name: string;
    type: 'navbar' | 'footer' | 'cta' | 'header' | 'sidebar' | 'other';
    verdict: 'IDENTICAL' | 'HAS_VARIANTS';
    presentIn: string[];
    variants?: PlanComponentVariant[];
}
export interface PlanComponentVariant {
    name: string;
    presentIn: string[];
    differences: string[];
}
export interface PlanDesignSections {
    designId: string;
    designName: string;
    sections: PlanSection[];
}
export interface PlanSection {
    name: string;
    type: 'navbar' | 'hero' | 'features' | 'testimonials' | 'pricing' | 'cta' | 'footer' | 'content' | 'gallery' | 'contact' | 'about' | 'stats' | 'team' | 'faq' | 'blog' | 'other';
    isGlobal: boolean;
    globalVariant?: string;
    description?: string;
    hasInteractiveWarning?: boolean;
}
export interface PlanMessage {
    id: string;
    role: 'assistant' | 'user';
    content: string;
    timestamp: number;
    structuredPlan?: StructuredPlan;
}
export interface PlanRequest {
    projectId: string;
    designIds: string[];
}
export interface PlanStreamChunk {
    projectId: string;
    chunk: string;
    done: boolean;
    structuredPlan?: StructuredPlan;
    cached?: boolean;
    chatHistory?: Array<{
        role: string;
        content: string;
    }>;
}
export interface PlanMessageRequest {
    projectId: string;
    message: string;
    history: PlanMessage[];
}
export interface PlanConfirmRequest {
    projectId: string;
    conversation: PlanMessage[];
}
export interface PlanConfirmResponse {
    success: boolean;
    conversationId?: string;
    error?: string;
}
export declare const PLAN_BLOCK_MARKERS: {
    readonly STRUCTURED_PLAN: {
        readonly begin: "BEGIN STRUCTURED_PLAN";
        readonly end: "END STRUCTURED_PLAN";
    };
    readonly DESIGN_ANALYSIS: {
        readonly begin: "BEGIN DESIGN_ANALYSIS";
        readonly end: "END DESIGN_ANALYSIS";
    };
    readonly SECTIONS_ANALYSIS: {
        readonly begin: "BEGIN SECTIONS_ANALYSIS";
        readonly end: "END SECTIONS_ANALYSIS";
    };
    readonly COLOR_SYSTEM: {
        readonly begin: "BEGIN COLOR_SYSTEM";
        readonly end: "END COLOR_SYSTEM";
    };
    readonly TYPOGRAPHY_SYSTEM: {
        readonly begin: "BEGIN TYPOGRAPHY_SYSTEM";
        readonly end: "END TYPOGRAPHY_SYSTEM";
    };
    readonly COMPONENTS_PLAN: {
        readonly begin: "BEGIN COMPONENTS_PLAN";
        readonly end: "END COMPONENTS_PLAN";
    };
    readonly CUSTOM_INSTRUCTIONS_REVIEW: {
        readonly begin: "BEGIN CUSTOM_INSTRUCTIONS_REVIEW";
        readonly end: "END CUSTOM_INSTRUCTIONS_REVIEW";
    };
    readonly QUESTIONS: {
        readonly begin: "BEGIN QUESTIONS";
        readonly end: "END QUESTIONS";
    };
    readonly READY: {
        readonly begin: "BEGIN READY";
        readonly end: "END READY";
    };
};
export type PlanBlockType = keyof typeof PLAN_BLOCK_MARKERS;
export interface SectionBuildProgress {
    sectionId: string;
    sectionName: string;
    designName: string;
    status: 'pending' | 'analyzing' | 'building' | 'validating' | 'qa' | 'qa_rebuilding' | 'fixing' | 'fixing_retry' | 'complete' | 'failed';
    progress: number;
    message?: string;
    isGlobal?: boolean;
    isPrimaryInstance?: boolean;
    fixAttempt?: number;
    errorsFixed?: number;
    errorsRemaining?: number;
    qaStatus?: 'pending' | 'analyzing' | 'passed' | 'failed' | 'rebuilding';
    qaAccuracy?: number;
    qaIssueCount?: number;
}
export interface BuildSectionsProgress {
    totalSections: number;
    completedSections: number;
    currentPhase: 'analyzing' | 'building' | 'validating' | 'qa' | 'fixing';
    sections: SectionBuildProgress[];
}
export interface StructuredPlanEvent {
    projectId: string;
    plan: StructuredPlan;
}
export interface SectionProgressEvent {
    projectId: string;
    progress: BuildSectionsProgress;
}
//# sourceMappingURL=plan.d.ts.map