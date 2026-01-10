"use strict";
// ============================================================================
// WEBFLOW MODULE
// Single source of truth for all Webflow component definitions, constraints,
// data fields, breakpoints, mappings, and documentation
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTML_TAG_TO_COMPONENT = exports.DESKTOP_ONLY_WARNING = exports.STYLE_REGISTRY_FORMAT_DOCS = exports.STATE_DOCS = exports.BREAKPOINT_DOCS = exports.generateStateDocsForPrompt = exports.generateBreakpointDocsForPrompt = exports.getMediaQuery = exports.getBreakpointsCascadeOrder = exports.isSmallerBreakpoint = exports.isLargerBreakpoint = exports.getVariantKey = exports.stateToVariantSuffix = exports.breakpointToVariantKey = exports.getState = exports.getBreakpoint = exports.STYLE_REGISTRY_FIELDS = exports.STATE_VARIANT_SUFFIXES = exports.LINK_STATES = exports.FORM_STATES = exports.INTERACTIVE_STATES = exports.STATE_KEYS = exports.PSEUDO_STATES = exports.BREAKPOINT_VARIANT_KEYS = exports.RESPONSIVE_BREAKPOINTS = exports.SMALLER_BREAKPOINTS = exports.LARGER_BREAKPOINTS = exports.BREAKPOINT_KEYS = exports.BREAKPOINTS = exports.createEmbedData = exports.createFormTextareaData = exports.createFormInputData = exports.createLinkData = exports.DEFAULT_DATA_FIELDS = exports.isPinnedToParent = exports.getAllowedChildren = exports.hasStrictChildren = exports.forbidsDescendant = exports.requiresAncestor = exports.getDisplayName = exports.getConstraints = exports.HIERARCHY_CHAINS = exports.WEBFLOW_CONSTRAINTS = exports.getComponentsByCategory = exports.isValidComponentType = exports.getComponentDef = exports.COMPONENT_COUNT = exports.COMPONENTS_BY_CATEGORY = exports.ALL_COMPONENT_TYPES = exports.WEBFLOW_COMPONENTS = void 0;
exports.HTML_EMBED_DOCS = exports.LAYOUT_HIERARCHY_DOCS = exports.FORM_HIERARCHY_DOCS = exports.SLIDER_HIERARCHY_DOCS = exports.TABS_HIERARCHY_DOCS = exports.DROPDOWN_HIERARCHY_DOCS = exports.NAVBAR_HIERARCHY_DOCS = exports.VALIDATION_CHECKLIST = exports.COMPONENT_TABLE = exports.COMPONENT_LIST = exports.COMPACT_HIERARCHY_RULES = exports.ALL_HIERARCHY_DOCS = exports.COMPLETE_PROMPT_DOCS = exports.generateMinimalComponentList = exports.generateCompactHierarchyRules = exports.generateCompletePromptDocs = exports.generateAllHierarchyDocs = exports.generateValidationChecklist = exports.generateHtmlEmbedDocs = exports.generateLayoutHierarchyDocs = exports.generateFormHierarchyDocs = exports.generateSliderHierarchyDocs = exports.generateTabsHierarchyDocs = exports.generateDropdownHierarchyDocs = exports.generateNavbarHierarchyDocs = exports.generateComponentTableForPrompt = exports.generateComponentListForPrompt = exports.matchesClassPattern = exports.getXSCPType = exports.getDefaultTag = exports.getComponentType = exports.CLASS_PATTERNS = void 0;
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
Object.defineProperty(exports, "LARGER_BREAKPOINTS", { enumerable: true, get: function () { return breakpoints_1.LARGER_BREAKPOINTS; } });
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
Object.defineProperty(exports, "isLargerBreakpoint", { enumerable: true, get: function () { return breakpoints_1.isLargerBreakpoint; } });
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
// Pre-built documentation strings for AI prompts
// -----------------------------------------------------------------------------
var prompt_docs_1 = require("./prompt-docs");
// Generators
Object.defineProperty(exports, "generateComponentListForPrompt", { enumerable: true, get: function () { return prompt_docs_1.generateComponentListForPrompt; } });
Object.defineProperty(exports, "generateComponentTableForPrompt", { enumerable: true, get: function () { return prompt_docs_1.generateComponentTableForPrompt; } });
Object.defineProperty(exports, "generateNavbarHierarchyDocs", { enumerable: true, get: function () { return prompt_docs_1.generateNavbarHierarchyDocs; } });
Object.defineProperty(exports, "generateDropdownHierarchyDocs", { enumerable: true, get: function () { return prompt_docs_1.generateDropdownHierarchyDocs; } });
Object.defineProperty(exports, "generateTabsHierarchyDocs", { enumerable: true, get: function () { return prompt_docs_1.generateTabsHierarchyDocs; } });
Object.defineProperty(exports, "generateSliderHierarchyDocs", { enumerable: true, get: function () { return prompt_docs_1.generateSliderHierarchyDocs; } });
Object.defineProperty(exports, "generateFormHierarchyDocs", { enumerable: true, get: function () { return prompt_docs_1.generateFormHierarchyDocs; } });
Object.defineProperty(exports, "generateLayoutHierarchyDocs", { enumerable: true, get: function () { return prompt_docs_1.generateLayoutHierarchyDocs; } });
Object.defineProperty(exports, "generateHtmlEmbedDocs", { enumerable: true, get: function () { return prompt_docs_1.generateHtmlEmbedDocs; } });
Object.defineProperty(exports, "generateValidationChecklist", { enumerable: true, get: function () { return prompt_docs_1.generateValidationChecklist; } });
Object.defineProperty(exports, "generateAllHierarchyDocs", { enumerable: true, get: function () { return prompt_docs_1.generateAllHierarchyDocs; } });
Object.defineProperty(exports, "generateCompletePromptDocs", { enumerable: true, get: function () { return prompt_docs_1.generateCompletePromptDocs; } });
Object.defineProperty(exports, "generateCompactHierarchyRules", { enumerable: true, get: function () { return prompt_docs_1.generateCompactHierarchyRules; } });
Object.defineProperty(exports, "generateMinimalComponentList", { enumerable: true, get: function () { return prompt_docs_1.generateMinimalComponentList; } });
// Pre-built strings
Object.defineProperty(exports, "COMPLETE_PROMPT_DOCS", { enumerable: true, get: function () { return prompt_docs_1.COMPLETE_PROMPT_DOCS; } });
Object.defineProperty(exports, "ALL_HIERARCHY_DOCS", { enumerable: true, get: function () { return prompt_docs_1.ALL_HIERARCHY_DOCS; } });
Object.defineProperty(exports, "COMPACT_HIERARCHY_RULES", { enumerable: true, get: function () { return prompt_docs_1.COMPACT_HIERARCHY_RULES; } });
Object.defineProperty(exports, "COMPONENT_LIST", { enumerable: true, get: function () { return prompt_docs_1.COMPONENT_LIST; } });
Object.defineProperty(exports, "COMPONENT_TABLE", { enumerable: true, get: function () { return prompt_docs_1.COMPONENT_TABLE; } });
Object.defineProperty(exports, "VALIDATION_CHECKLIST", { enumerable: true, get: function () { return prompt_docs_1.VALIDATION_CHECKLIST; } });
Object.defineProperty(exports, "NAVBAR_HIERARCHY_DOCS", { enumerable: true, get: function () { return prompt_docs_1.NAVBAR_HIERARCHY_DOCS; } });
Object.defineProperty(exports, "DROPDOWN_HIERARCHY_DOCS", { enumerable: true, get: function () { return prompt_docs_1.DROPDOWN_HIERARCHY_DOCS; } });
Object.defineProperty(exports, "TABS_HIERARCHY_DOCS", { enumerable: true, get: function () { return prompt_docs_1.TABS_HIERARCHY_DOCS; } });
Object.defineProperty(exports, "SLIDER_HIERARCHY_DOCS", { enumerable: true, get: function () { return prompt_docs_1.SLIDER_HIERARCHY_DOCS; } });
Object.defineProperty(exports, "FORM_HIERARCHY_DOCS", { enumerable: true, get: function () { return prompt_docs_1.FORM_HIERARCHY_DOCS; } });
Object.defineProperty(exports, "LAYOUT_HIERARCHY_DOCS", { enumerable: true, get: function () { return prompt_docs_1.LAYOUT_HIERARCHY_DOCS; } });
Object.defineProperty(exports, "HTML_EMBED_DOCS", { enumerable: true, get: function () { return prompt_docs_1.HTML_EMBED_DOCS; } });
