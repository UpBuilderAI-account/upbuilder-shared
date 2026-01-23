"use strict";
// ============================================================================
// WEBFLOW MODULE
// Single source of truth for all Webflow component definitions, constraints,
// data fields, breakpoints, mappings, and documentation
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.getConstraintErrorMessage = exports.validateDesignTree = exports.getValidChildTypes = exports.getValidParentTypes = exports.canContainChild = exports.canPlaceElement = exports.matchesClassPattern = exports.getXSCPType = exports.getDefaultTag = exports.getComponentType = exports.CLASS_PATTERNS = exports.HTML_TAG_TO_COMPONENT = exports.getVariantKey = exports.isPinnedToParent = exports.getAllowedChildren = exports.hasStrictChildren = exports.forbidsDescendant = exports.requiresAncestor = exports.getDisplayName = exports.getConstraints = exports.HIERARCHY_CHAINS = exports.WEBFLOW_CONSTRAINTS = exports.getComponentsByCategory = exports.isValidComponentType = exports.getComponentDef = exports.COMPONENT_COUNT = exports.COMPONENTS_BY_CATEGORY = exports.ALL_COMPONENT_TYPES = exports.WEBFLOW_COMPONENTS = void 0;
// -----------------------------------------------------------------------------
// Components
// All 55+ Webflow component type definitions
// -----------------------------------------------------------------------------
var components_1 = require("./components");
// Main definitions
Object.defineProperty(exports, "WEBFLOW_COMPONENTS", { enumerable: true, get: function () { return components_1.WEBFLOW_COMPONENTS; } });
Object.defineProperty(exports, "ALL_COMPONENT_TYPES", { enumerable: true, get: function () { return components_1.ALL_COMPONENT_TYPES; } });
Object.defineProperty(exports, "COMPONENTS_BY_CATEGORY", { enumerable: true, get: function () { return components_1.COMPONENTS_BY_CATEGORY; } });
Object.defineProperty(exports, "COMPONENT_COUNT", { enumerable: true, get: function () { return components_1.COMPONENT_COUNT; } });
// Helpers
Object.defineProperty(exports, "getComponentDef", { enumerable: true, get: function () { return components_1.getComponentDef; } });
Object.defineProperty(exports, "isValidComponentType", { enumerable: true, get: function () { return components_1.isValidComponentType; } });
Object.defineProperty(exports, "getComponentsByCategory", { enumerable: true, get: function () { return components_1.getComponentsByCategory; } });
// -----------------------------------------------------------------------------
// Constraints
// Hierarchy rules and validation constraints
// -----------------------------------------------------------------------------
var constraints_1 = require("./constraints");
// Main definitions
Object.defineProperty(exports, "WEBFLOW_CONSTRAINTS", { enumerable: true, get: function () { return constraints_1.WEBFLOW_CONSTRAINTS; } });
Object.defineProperty(exports, "HIERARCHY_CHAINS", { enumerable: true, get: function () { return constraints_1.HIERARCHY_CHAINS; } });
// Helpers
Object.defineProperty(exports, "getConstraints", { enumerable: true, get: function () { return constraints_1.getConstraints; } });
Object.defineProperty(exports, "getDisplayName", { enumerable: true, get: function () { return constraints_1.getDisplayName; } });
Object.defineProperty(exports, "requiresAncestor", { enumerable: true, get: function () { return constraints_1.requiresAncestor; } });
Object.defineProperty(exports, "forbidsDescendant", { enumerable: true, get: function () { return constraints_1.forbidsDescendant; } });
Object.defineProperty(exports, "hasStrictChildren", { enumerable: true, get: function () { return constraints_1.hasStrictChildren; } });
Object.defineProperty(exports, "getAllowedChildren", { enumerable: true, get: function () { return constraints_1.getAllowedChildren; } });
Object.defineProperty(exports, "isPinnedToParent", { enumerable: true, get: function () { return constraints_1.isPinnedToParent; } });
// -----------------------------------------------------------------------------
// Breakpoints & States
// Responsive breakpoints and pseudo-state definitions
// Only exports that are actually used by consumers
// -----------------------------------------------------------------------------
var breakpoints_1 = require("./breakpoints");
// Helpers (used by backend-new/generators/webflow/types.ts)
Object.defineProperty(exports, "getVariantKey", { enumerable: true, get: function () { return breakpoints_1.getVariantKey; } });
// -----------------------------------------------------------------------------
// Mappings
// HTML tag to component type mappings
// -----------------------------------------------------------------------------
var mappings_1 = require("./mappings");
// Mappings
Object.defineProperty(exports, "HTML_TAG_TO_COMPONENT", { enumerable: true, get: function () { return mappings_1.HTML_TAG_TO_COMPONENT; } });
Object.defineProperty(exports, "CLASS_PATTERNS", { enumerable: true, get: function () { return mappings_1.CLASS_PATTERNS; } });
// Helpers
Object.defineProperty(exports, "getComponentType", { enumerable: true, get: function () { return mappings_1.getComponentType; } });
Object.defineProperty(exports, "getDefaultTag", { enumerable: true, get: function () { return mappings_1.getDefaultTag; } });
Object.defineProperty(exports, "getXSCPType", { enumerable: true, get: function () { return mappings_1.getXSCPType; } });
Object.defineProperty(exports, "matchesClassPattern", { enumerable: true, get: function () { return mappings_1.matchesClassPattern; } });
// -----------------------------------------------------------------------------
// Prompt Documentation
// NOTE: Most prompt docs moved to backend-new/prompts/webflow/docs
// Only keeping generateBreakpointDocsForPrompt and generateStateDocsForPrompt
// which are re-exported from breakpoints.ts
// -----------------------------------------------------------------------------
// -----------------------------------------------------------------------------
// Hierarchy Helpers
// Frontend-friendly validation functions for drag/drop
// -----------------------------------------------------------------------------
var hierarchy_helpers_1 = require("./hierarchy-helpers");
// Quick validation (for drag/drop pre-check)
Object.defineProperty(exports, "canPlaceElement", { enumerable: true, get: function () { return hierarchy_helpers_1.canPlaceElement; } });
Object.defineProperty(exports, "canContainChild", { enumerable: true, get: function () { return hierarchy_helpers_1.canContainChild; } });
Object.defineProperty(exports, "getValidParentTypes", { enumerable: true, get: function () { return hierarchy_helpers_1.getValidParentTypes; } });
Object.defineProperty(exports, "getValidChildTypes", { enumerable: true, get: function () { return hierarchy_helpers_1.getValidChildTypes; } });
// Full tree validation (for post-operation check)
Object.defineProperty(exports, "validateDesignTree", { enumerable: true, get: function () { return hierarchy_helpers_1.validateDesignTree; } });
Object.defineProperty(exports, "getConstraintErrorMessage", { enumerable: true, get: function () { return hierarchy_helpers_1.getConstraintErrorMessage; } });
// -----------------------------------------------------------------------------
// Interactive Component Detection
// NOTE: Moved to backend-new/prompts/webflow/docs/interactive-detection.ts
// Only used by backend AI prompts
// -----------------------------------------------------------------------------
