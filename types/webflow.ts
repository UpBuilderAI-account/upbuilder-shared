// ============================================================================
// WEBFLOW EXPORT TYPES
// Re-exports from shared/webflow/ module for convenient imports
// ============================================================================

// Re-export everything from the webflow module
export {
  // Component types and definitions
  type WebflowComponentType,
  type WebflowComponentDef,
  type ComponentCategory,
  WEBFLOW_COMPONENTS,
  ALL_COMPONENT_TYPES,
  COMPONENTS_BY_CATEGORY,
  COMPONENT_COUNT,
  getComponentDef,
  isValidComponentType,
  getComponentsByCategory,

  // Constraints
  type ConstraintRule,
  type ConstraintDef,
  type ComponentConstraints,
  WEBFLOW_CONSTRAINTS,
  HIERARCHY_CHAINS,
  getConstraints,
  getDisplayName,
  requiresAncestor,
  forbidsDescendant,
  hasStrictChildren,
  getAllowedChildren,
  isPinnedToParent,

  // Breakpoints & States (only actively used exports)
  type BreakpointKey,
  type StateKey,
  type WebflowStyleVariantKey,
  getVariantKey,

  // Mappings
  HTML_TAG_TO_COMPONENT,
  getComponentType,
  getDefaultTag,
  getXSCPType,
} from '../webflow';

// NOTE: Breakpoint/state documentation (BREAKPOINT_DOCS, STATE_DOCS, etc.) moved to backend-new/prompts/workflow/breakpoints.ts
// NOTE: Prompt documentation (SLIDER_HIERARCHY_DOCS, etc.) moved to backend-new/prompts/webflow/docs
