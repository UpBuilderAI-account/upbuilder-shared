// ============================================================================
// WEBFLOW MODULE
// Single source of truth for all Webflow component definitions, constraints,
// data fields, breakpoints, mappings, and documentation
// ============================================================================

// -----------------------------------------------------------------------------
// Components
// All 55+ Webflow component type definitions
// -----------------------------------------------------------------------------
export {
  // Types
  type WebflowComponentDef,
  type ComponentCategory,
  type WebflowComponentType,

  // Main definitions
  WEBFLOW_COMPONENTS,
  ALL_COMPONENT_TYPES,
  COMPONENTS_BY_CATEGORY,
  COMPONENT_COUNT,

  // Helpers
  getComponentDef,
  isValidComponentType,
  getComponentsByCategory,
} from './components';

// -----------------------------------------------------------------------------
// Constraints
// Hierarchy rules and validation constraints
// NOTE: WEBFLOW_CONSTRAINTS is intentionally kept for backend use
// The protection is in NOT re-exporting validation functions from main index.ts
// -----------------------------------------------------------------------------
export {
  // Types
  type ConstraintRule,
  type ConstraintDef,
  type ComponentConstraints,
  type ComponentConstraintEntry,

  // Main definitions (used by backend for prompts, code generation, etc.)
  WEBFLOW_CONSTRAINTS,
  HIERARCHY_CHAINS,

  // Helpers (used by backend)
  getConstraints,
  getDisplayName,
  requiresAncestor,
  forbidsDescendant,
  hasStrictChildren,
  getAllowedChildren,
  isPinnedToParent,
} from './constraints';

// -----------------------------------------------------------------------------
// Breakpoints & States
// Responsive breakpoints and pseudo-state definitions
// Only exports that are actually used by consumers
// -----------------------------------------------------------------------------
export {
  // Types (used by backend-new/generators/webflow/types.ts)
  type BreakpointKey,
  type StateKey,
  type WebflowStyleVariantKey,

  // Helpers (used by backend-new/generators/webflow/types.ts)
  getVariantKey,
} from './breakpoints';

// -----------------------------------------------------------------------------
// Mappings
// HTML tag to component type mappings
// -----------------------------------------------------------------------------
export {
  // Types
  type MappingContext,

  // Mappings
  HTML_TAG_TO_COMPONENT,
  CLASS_PATTERNS,

  // Helpers
  getComponentType,
  getDefaultTag,
  getXSCPType,
  matchesClassPattern,
} from './mappings';

// -----------------------------------------------------------------------------
// Prompt Documentation
// NOTE: Most prompt docs moved to backend-new/prompts/webflow/docs
// Only keeping generateBreakpointDocsForPrompt and generateStateDocsForPrompt
// which are re-exported from breakpoints.ts
// -----------------------------------------------------------------------------

// -----------------------------------------------------------------------------
// Hierarchy Helpers
// Types only - validation functions moved to backend API to protect IP
// -----------------------------------------------------------------------------
export type {
  PlacementCheckResult,
  DropPosition,
  DesignNode,
  TreeValidationResult,
} from './hierarchy-helpers';

// -----------------------------------------------------------------------------
// Interactive Component Detection
// NOTE: Moved to backend-new/prompts/webflow/docs/interactive-detection.ts
// Only used by backend AI prompts
// -----------------------------------------------------------------------------
