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
  chatHistory?: Array<{ role: string; content: string }>;
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

// Block parsing markers
export const PLAN_BLOCK_MARKERS = {
  DESIGN_ANALYSIS: { begin: 'BEGIN DESIGN_ANALYSIS', end: 'END DESIGN_ANALYSIS' },
  SECTIONS_ANALYSIS: { begin: 'BEGIN SECTIONS_ANALYSIS', end: 'END SECTIONS_ANALYSIS' },
  COLOR_SYSTEM: { begin: 'BEGIN COLOR_SYSTEM', end: 'END COLOR_SYSTEM' },
  TYPOGRAPHY_SYSTEM: { begin: 'BEGIN TYPOGRAPHY_SYSTEM', end: 'END TYPOGRAPHY_SYSTEM' },
  COMPONENTS_PLAN: { begin: 'BEGIN COMPONENTS_PLAN', end: 'END COMPONENTS_PLAN' },
  CUSTOM_INSTRUCTIONS_REVIEW: { begin: 'BEGIN CUSTOM_INSTRUCTIONS_REVIEW', end: 'END CUSTOM_INSTRUCTIONS_REVIEW' },
  QUESTIONS: { begin: 'BEGIN QUESTIONS', end: 'END QUESTIONS' },
  READY: { begin: 'BEGIN READY', end: 'END READY' },
} as const;

export type PlanBlockType = keyof typeof PLAN_BLOCK_MARKERS;
