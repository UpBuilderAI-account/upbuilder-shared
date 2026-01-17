"use strict";
// ============================================================================
// WEBFLOW MODULE
// Single source of truth for all Webflow component definitions, constraints,
// data fields, breakpoints, mappings, and documentation
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.getComponentType = exports.CLASS_PATTERNS = exports.HTML_TAG_TO_COMPONENT = exports.DESKTOP_ONLY_WARNING = exports.STYLE_REGISTRY_FORMAT_DOCS = exports.STATE_DOCS = exports.BREAKPOINT_DOCS = exports.generateStateDocsForPrompt = exports.generateBreakpointDocsForPrompt = exports.getMediaQuery = exports.getBreakpointsCascadeOrder = exports.isSmallerBreakpoint = exports.getVariantKey = exports.stateToVariantSuffix = exports.breakpointToVariantKey = exports.getState = exports.getBreakpoint = exports.STYLE_REGISTRY_FIELDS = exports.STATE_VARIANT_SUFFIXES = exports.LINK_STATES = exports.FORM_STATES = exports.INTERACTIVE_STATES = exports.STATE_KEYS = exports.PSEUDO_STATES = exports.BREAKPOINT_VARIANT_KEYS = exports.RESPONSIVE_BREAKPOINTS = exports.SMALLER_BREAKPOINTS = exports.BREAKPOINT_KEYS = exports.BREAKPOINTS = exports.createEmbedData = exports.createFormTextareaData = exports.createFormInputData = exports.createLinkData = exports.DEFAULT_DATA_FIELDS = exports.isPinnedToParent = exports.getAllowedChildren = exports.hasStrictChildren = exports.forbidsDescendant = exports.requiresAncestor = exports.getDisplayName = exports.getConstraints = exports.HIERARCHY_CHAINS = exports.WEBFLOW_CONSTRAINTS = exports.getComponentsByCategory = exports.isValidComponentType = exports.getComponentDef = exports.COMPONENT_COUNT = exports.COMPONENTS_BY_CATEGORY = exports.ALL_COMPONENT_TYPES = exports.WEBFLOW_COMPONENTS = void 0;
exports.getConstraintErrorMessage = exports.validateDesignTree = exports.getValidChildTypes = exports.getValidParentTypes = exports.canContainChild = exports.canPlaceElement = exports.matchesClassPattern = exports.getXSCPType = exports.getDefaultTag = void 0;
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
// Data Fields
// Component-specific data field specifications
// -----------------------------------------------------------------------------
var data_fields_1 = require("./data-fields");
// Default values
Object.defineProperty(exports, "DEFAULT_DATA_FIELDS", { enumerable: true, get: function () { return data_fields_1.DEFAULT_DATA_FIELDS; } });
// Helpers
Object.defineProperty(exports, "createLinkData", { enumerable: true, get: function () { return data_fields_1.createLinkData; } });
Object.defineProperty(exports, "createFormInputData", { enumerable: true, get: function () { return data_fields_1.createFormInputData; } });
Object.defineProperty(exports, "createFormTextareaData", { enumerable: true, get: function () { return data_fields_1.createFormTextareaData; } });
Object.defineProperty(exports, "createEmbedData", { enumerable: true, get: function () { return data_fields_1.createEmbedData; } });
// -----------------------------------------------------------------------------
// Breakpoints & States
// Responsive breakpoints and pseudo-state definitions
// -----------------------------------------------------------------------------
var breakpoints_1 = require("./breakpoints");
// Breakpoint definitions
Object.defineProperty(exports, "BREAKPOINTS", { enumerable: true, get: function () { return breakpoints_1.BREAKPOINTS; } });
Object.defineProperty(exports, "BREAKPOINT_KEYS", { enumerable: true, get: function () { return breakpoints_1.BREAKPOINT_KEYS; } });
Object.defineProperty(exports, "SMALLER_BREAKPOINTS", { enumerable: true, get: function () { return breakpoints_1.SMALLER_BREAKPOINTS; } });
Object.defineProperty(exports, "RESPONSIVE_BREAKPOINTS", { enumerable: true, get: function () { return breakpoints_1.RESPONSIVE_BREAKPOINTS; } });
Object.defineProperty(exports, "BREAKPOINT_VARIANT_KEYS", { enumerable: true, get: function () { return breakpoints_1.BREAKPOINT_VARIANT_KEYS; } });
// State definitions
Object.defineProperty(exports, "PSEUDO_STATES", { enumerable: true, get: function () { return breakpoints_1.PSEUDO_STATES; } });
Object.defineProperty(exports, "STATE_KEYS", { enumerable: true, get: function () { return breakpoints_1.STATE_KEYS; } });
Object.defineProperty(exports, "INTERACTIVE_STATES", { enumerable: true, get: function () { return breakpoints_1.INTERACTIVE_STATES; } });
Object.defineProperty(exports, "FORM_STATES", { enumerable: true, get: function () { return breakpoints_1.FORM_STATES; } });
Object.defineProperty(exports, "LINK_STATES", { enumerable: true, get: function () { return breakpoints_1.LINK_STATES; } });
Object.defineProperty(exports, "STATE_VARIANT_SUFFIXES", { enumerable: true, get: function () { return breakpoints_1.STATE_VARIANT_SUFFIXES; } });
// Style registry fields
Object.defineProperty(exports, "STYLE_REGISTRY_FIELDS", { enumerable: true, get: function () { return breakpoints_1.STYLE_REGISTRY_FIELDS; } });
// Helpers
Object.defineProperty(exports, "getBreakpoint", { enumerable: true, get: function () { return breakpoints_1.getBreakpoint; } });
Object.defineProperty(exports, "getState", { enumerable: true, get: function () { return breakpoints_1.getState; } });
Object.defineProperty(exports, "breakpointToVariantKey", { enumerable: true, get: function () { return breakpoints_1.breakpointToVariantKey; } });
Object.defineProperty(exports, "stateToVariantSuffix", { enumerable: true, get: function () { return breakpoints_1.stateToVariantSuffix; } });
Object.defineProperty(exports, "getVariantKey", { enumerable: true, get: function () { return breakpoints_1.getVariantKey; } });
Object.defineProperty(exports, "isSmallerBreakpoint", { enumerable: true, get: function () { return breakpoints_1.isSmallerBreakpoint; } });
Object.defineProperty(exports, "getBreakpointsCascadeOrder", { enumerable: true, get: function () { return breakpoints_1.getBreakpointsCascadeOrder; } });
Object.defineProperty(exports, "getMediaQuery", { enumerable: true, get: function () { return breakpoints_1.getMediaQuery; } });
// Documentation generators
Object.defineProperty(exports, "generateBreakpointDocsForPrompt", { enumerable: true, get: function () { return breakpoints_1.generateBreakpointDocsForPrompt; } });
Object.defineProperty(exports, "generateStateDocsForPrompt", { enumerable: true, get: function () { return breakpoints_1.generateStateDocsForPrompt; } });
// Pre-built documentation constants
Object.defineProperty(exports, "BREAKPOINT_DOCS", { enumerable: true, get: function () { return breakpoints_1.BREAKPOINT_DOCS; } });
Object.defineProperty(exports, "STATE_DOCS", { enumerable: true, get: function () { return breakpoints_1.STATE_DOCS; } });
Object.defineProperty(exports, "STYLE_REGISTRY_FORMAT_DOCS", { enumerable: true, get: function () { return breakpoints_1.STYLE_REGISTRY_FORMAT_DOCS; } });
Object.defineProperty(exports, "DESKTOP_ONLY_WARNING", { enumerable: true, get: function () { return breakpoints_1.DESKTOP_ONLY_WARNING; } });
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
