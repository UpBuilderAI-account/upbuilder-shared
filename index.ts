// ============================================================================
// SHARED PACKAGE ENTRY POINT
// Main export for @upbuilder/shared package
// ============================================================================

// Export version (auto-incremented on build)
export * from './version';

// Export all types
export * from './types';

// Export all constants
export * from './constants';

// Export all utilities
export * from './utils';

// Export Webflow module (components, constraints, data fields, breakpoints, mappings, docs)
export * as webflow from './webflow';

// Export CSS module (webflow base styles)
export * from './css';

// Re-export validation TYPES only (functions moved to backend API to protect IP)
export type {
  PlacementCheckResult,
  DropPosition,
  DesignNode,
  TreeValidationResult,
} from './webflow/hierarchy-helpers';

// NOTE: Interactive component detection moved to backend-new/prompts/webflow/docs
