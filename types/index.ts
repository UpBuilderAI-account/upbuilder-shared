// ============================================================================
// SHARED TYPES INDEX
// Central export for all type definitions
// ============================================================================

// Core domain types (business logic & database entities)
export * from './core-domain';

// Re-export workflow helpers from core-domain for convenience
export {
  isProcessingStage,
  getNextStatus,
  requiresUserActionAfter,
  shouldSkipStage,
  SKIPPED_STAGES,
  USES_SECTION_CSS,
} from './core-domain';

// API types (HTTP/REST responses)
export * from './api';

// Billing types (subscriptions, pricing)
export * from './billing';

// Socket protocol types (WebSocket communication)
export * from './socket-protocol';

// Workflow types - explicit exports to avoid conflicts with core-domain
// (workflow.ts types are lightweight progress-tracking types)
export {
  // Stage types
  type Stage,
  type Progress,
  // Progress hierarchy (simplified: Stage → Design → Section)
  type WorkflowSection,
  type WorkflowDesign,
  type ExportStep,
  // Stage state
  type WorkflowStage,
  type WorkflowStages,
  // Server events
  type WorkflowStream,
  type WorkflowError,
  // Editor types
  type EditorSection,
  type EditorDesign,
  type EditorGlobal,
  type EditorAsset,
  type WorkflowEditor,
  // Styles config types
  type SpacingScale,
  type StylesConfig,
  DEFAULT_STYLES_CONFIG,
  // Customize types
  type CustomSectionCode,
  type CustomizeData,
  // Export types
  type ExportDesignData,
  type WorkflowExportComplete,
  // Client events
  type WorkflowCommand,
  // Editor code save types
  type CodeSaveRequest,
  type CodeChange,
  type CodeSaveResult,
  // Rename types
  type RenameTargetType,
  type RenameRequest,
  type RenameResult,
  // Socket event interfaces
  type ServerToClientWorkflowEvents,
  type ClientToServerWorkflowEvents,
  // Helpers
  isPending,
  isRunning,
  isComplete,
  isFailed,
  isInlineCSSPlatform,
  getStageOrderForPlatform,
  // Constants
  STAGE_ORDER,
  STAGE_LABELS,
  INLINE_PLATFORM_SKIPPED_STAGES,
} from './workflow';

// Plugin types
export * from './plugin';

// Element types
export * from './element';

// Webflow export types
export * from './webflow';

// Bricks Builder export types
export * from './bricks';

// Elementor Builder export types
export * from './elementor';

// GitHub sync types
export * from './github-sync';
