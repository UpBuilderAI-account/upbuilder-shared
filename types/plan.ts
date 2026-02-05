/**
 * Plan Stage Types - Structured Plan Format
 *
 * The plan stage now outputs structured JSON that can be rendered
 * as organized, collapsible cards instead of raw markdown.
 */

// ============================================================================
// STRUCTURED PLAN DATA
// ============================================================================

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
  type: string; // landing, about, pricing, contact, blog, etc.
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
  presentIn: string[]; // design names
  variants?: PlanComponentVariant[];
}

export interface PlanComponentVariant {
  name: string;
  presentIn: string[]; // design names
  differences: string[]; // what's different (images, colors, layout)
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
  hasInteractiveWarning?: boolean; // if interactive disabled but could be interactive
}

// ============================================================================
// LEGACY MESSAGE TYPES (for chat functionality)
// ============================================================================

export interface PlanMessage {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  timestamp: number;
  structuredPlan?: StructuredPlan; // New: parsed structured data
}

export interface PlanRequest {
  projectId: string;
  designIds: string[];
}

export interface PlanStreamChunk {
  projectId: string;
  chunk: string;
  done: boolean;
  structuredPlan?: StructuredPlan; // New: parsed at end
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

// ============================================================================
// BLOCK MARKERS (for parsing JSON from AI output)
// ============================================================================

export const PLAN_BLOCK_MARKERS = {
  STRUCTURED_PLAN: { begin: 'BEGIN STRUCTURED_PLAN', end: 'END STRUCTURED_PLAN' },
  // Legacy markers (deprecated but kept for backwards compatibility)
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

// ============================================================================
// SECTION PROGRESS TYPES (for build sections stage)
// ============================================================================

export interface SectionBuildProgress {
  sectionId: string;
  sectionName: string;
  designName: string;
  status: 'pending' | 'analyzing' | 'building' | 'validating' | 'qa' | 'qa_rebuilding' | 'fixing' | 'fixing_retry' | 'complete' | 'failed';
  progress: number; // 0-100
  message?: string;
  isGlobal?: boolean;
  isPrimaryInstance?: boolean;
  // Fixing details (when status is 'fixing' or 'fixing_retry')
  fixAttempt?: number; // 1 or 2 (max 2 attempts)
  errorsFixed?: number;
  errorsRemaining?: number;
  // QA details (when status is 'qa' or 'qa_rebuilding')
  qaStatus?: 'pending' | 'analyzing' | 'passed' | 'failed' | 'rebuilding';
  qaAccuracy?: number; // 0-100
  qaIssueCount?: number;
}

export interface BuildSectionsProgress {
  totalSections: number;
  completedSections: number;
  currentPhase: 'analyzing' | 'building' | 'validating' | 'qa' | 'fixing';
  sections: SectionBuildProgress[];
}

/** Simplified status for UI display */
export type SectionDisplayStatus = 'pending' | 'in_progress' | 'complete' | 'failed';

/** Convert detailed build status to simplified display status */
export function toDisplayStatus(status: SectionBuildProgress['status']): SectionDisplayStatus {
  if (status === 'pending') return 'pending';
  if (status === 'complete') return 'complete';
  if (status === 'failed') return 'failed';
  return 'in_progress'; // analyzing, building, validating, qa, qa_rebuilding, fixing, fixing_retry
}

// ============================================================================
// SOCKET EVENTS FOR STRUCTURED PLAN
// ============================================================================

export interface StructuredPlanEvent {
  projectId: string;
  plan: StructuredPlan;
}

export interface SectionProgressEvent {
  projectId: string;
  progress: BuildSectionsProgress;
}
