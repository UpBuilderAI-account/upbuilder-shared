/**
 * Plan Stage Types
 */
export interface PlanMessage {
    id: string;
    role: 'assistant' | 'user';
    content: string;
    timestamp: number;
    blocks?: PlanBlocks;
}
export interface PlanBlocks {
    designAnalysis?: string;
    sectionsAnalysis?: string;
    colorSystem?: string;
    typographySystem?: string;
    componentsPlan?: string;
    customInstructionsReview?: string;
    questions?: string;
    ready?: string;
}
export interface PlanRequest {
    projectId: string;
    designIds: string[];
}
export interface PlanStreamChunk {
    projectId: string;
    chunk: string;
    blocks?: PlanBlocks;
    done: boolean;
    needsConfirmation?: boolean;
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
//# sourceMappingURL=plan.d.ts.map