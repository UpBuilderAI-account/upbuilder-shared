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
  QUICK_MODE_SKIPPED_STAGES,
  USES_SECTION_CSS,
} from './core-domain';

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
  type WorkflowError,
  // Editor types
  type EditorSection,
  type EditorDesign,
  type EditorGlobal,
  type EditorAsset,
  type WorkflowEditor,
  // Export config types
  type ExportMode,
  type SpacingScale,
  type StylesheetConfig,
  type ResponsiveConfig,
  type InteractivityConfig,
  type ExportConfig,
  DEFAULT_STYLESHEET_CONFIG,
  DEFAULT_RESPONSIVE_CONFIG,
  DEFAULT_INTERACTIVITY_CONFIG,
  QUICK_INTERACTIVITY_CONFIG,
  DEFAULT_EXPORT_CONFIG,
  QUICK_EXPORT_CONFIG,
  // Customize types
  type CustomSectionCode,
  type CustomizeData,
  // Export types
  type ExportSectionData,
  type ExportDesignData,
  type CustomFontInfo,
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
  // Background progress types (export_config stage)
  type BackgroundJobStatus,
  type WorkflowBackgroundProgress,
  // Socket event interfaces
  type ServerToClientWorkflowEvents,
  type ClientToServerWorkflowEvents,
  // Assembly types (streamlined build stage)
  type AssemblyDesign,
  type AssemblyProgress,
  type AssetUploadProgress,
  type AssembledDesign,
  type BuildPhase,
  // Early asset upload (runs in background during load stage)
  type EarlyAssetUploadProgress,
  // Helpers
  isPending,
  isRunning,
  isComplete,
  isFailed,
  getStageOrderForPlatform,
  // Constants
  STAGE_ORDER,
  STAGE_LABELS,
  // Build styles types (new build-styles stage)
  type StyleDefinition,
  type BuildStylesState,
  // Section bounding & build sections types
  type SectionType,
  type GlobalVerdict,
  type BoundedSection,
  type SectionAnalysis,
  type BuildSectionsState,
  type BuildSectionsEvents,
  type SectionBoundingEvents,
  type AssemblyEvents,
  // AI image analysis progress (pre-export phase)
  type AIAnalysisDesignProgress,
  type AIAnalysisProgress,
  type AIAnalysisProgressEvent,
} from './workflow';

// Plugin types
export * from './plugin';

// Element types
export * from './element';

// Webflow export types
export * from './webflow';

// Complex hierarchy detection types
export * from './complex-hierarchy';

// Outside elements detection types
export * from './outside-elements';

// Editable tree types (customizer - safe format for frontend)
export * from './editable-tree';

// Edit operations types (customizer - operations sent from frontend)
export * from './edit-operations';

// Plan stage types (workflow v2 - AI planning phase)
export * from './plan';

// Fixing stage types (workflow v2 - AI auto-fix phase)
export * from './fixing';

// Expansion types (smart expansion mode & version history)
export * from './expansion';

// Image review types (AI-powered image detection)
export * from './image-review';

// CMS types (schema, bindings, XSCP integration)
export * from './cms';
