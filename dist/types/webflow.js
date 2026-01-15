"use strict";
// ============================================================================
// WEBFLOW EXPORT TYPES
// Re-exports from shared/webflow/ module for convenient imports
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.DESKTOP_ONLY_WARNING = exports.STYLE_REGISTRY_FORMAT_DOCS = exports.STATE_DOCS = exports.BREAKPOINT_DOCS = exports.getXSCPType = exports.getDefaultTag = exports.getComponentType = exports.HTML_TAG_TO_COMPONENT = exports.getVariantKey = exports.getState = exports.getBreakpoint = exports.STATE_KEYS = exports.PSEUDO_STATES = exports.RESPONSIVE_BREAKPOINTS = exports.SMALLER_BREAKPOINTS = exports.LARGER_BREAKPOINTS = exports.BREAKPOINT_KEYS = exports.BREAKPOINTS = exports.isPinnedToParent = exports.getAllowedChildren = exports.hasStrictChildren = exports.forbidsDescendant = exports.requiresAncestor = exports.getDisplayName = exports.getConstraints = exports.HIERARCHY_CHAINS = exports.WEBFLOW_CONSTRAINTS = exports.getComponentsByCategory = exports.isValidComponentType = exports.getComponentDef = exports.COMPONENT_COUNT = exports.COMPONENTS_BY_CATEGORY = exports.ALL_COMPONENT_TYPES = exports.WEBFLOW_COMPONENTS = void 0;
// Re-export everything from the webflow module
var webflow_1 = require("../webflow");
Object.defineProperty(exports, "WEBFLOW_COMPONENTS", { enumerable: true, get: function () { return webflow_1.WEBFLOW_COMPONENTS; } });
Object.defineProperty(exports, "ALL_COMPONENT_TYPES", { enumerable: true, get: function () { return webflow_1.ALL_COMPONENT_TYPES; } });
Object.defineProperty(exports, "COMPONENTS_BY_CATEGORY", { enumerable: true, get: function () { return webflow_1.COMPONENTS_BY_CATEGORY; } });
Object.defineProperty(exports, "COMPONENT_COUNT", { enumerable: true, get: function () { return webflow_1.COMPONENT_COUNT; } });
Object.defineProperty(exports, "getComponentDef", { enumerable: true, get: function () { return webflow_1.getComponentDef; } });
Object.defineProperty(exports, "isValidComponentType", { enumerable: true, get: function () { return webflow_1.isValidComponentType; } });
Object.defineProperty(exports, "getComponentsByCategory", { enumerable: true, get: function () { return webflow_1.getComponentsByCategory; } });
Object.defineProperty(exports, "WEBFLOW_CONSTRAINTS", { enumerable: true, get: function () { return webflow_1.WEBFLOW_CONSTRAINTS; } });
Object.defineProperty(exports, "HIERARCHY_CHAINS", { enumerable: true, get: function () { return webflow_1.HIERARCHY_CHAINS; } });
Object.defineProperty(exports, "getConstraints", { enumerable: true, get: function () { return webflow_1.getConstraints; } });
Object.defineProperty(exports, "getDisplayName", { enumerable: true, get: function () { return webflow_1.getDisplayName; } });
Object.defineProperty(exports, "requiresAncestor", { enumerable: true, get: function () { return webflow_1.requiresAncestor; } });
Object.defineProperty(exports, "forbidsDescendant", { enumerable: true, get: function () { return webflow_1.forbidsDescendant; } });
Object.defineProperty(exports, "hasStrictChildren", { enumerable: true, get: function () { return webflow_1.hasStrictChildren; } });
Object.defineProperty(exports, "getAllowedChildren", { enumerable: true, get: function () { return webflow_1.getAllowedChildren; } });
Object.defineProperty(exports, "isPinnedToParent", { enumerable: true, get: function () { return webflow_1.isPinnedToParent; } });
Object.defineProperty(exports, "BREAKPOINTS", { enumerable: true, get: function () { return webflow_1.BREAKPOINTS; } });
Object.defineProperty(exports, "BREAKPOINT_KEYS", { enumerable: true, get: function () { return webflow_1.BREAKPOINT_KEYS; } });
Object.defineProperty(exports, "LARGER_BREAKPOINTS", { enumerable: true, get: function () { return webflow_1.LARGER_BREAKPOINTS; } });
Object.defineProperty(exports, "SMALLER_BREAKPOINTS", { enumerable: true, get: function () { return webflow_1.SMALLER_BREAKPOINTS; } });
Object.defineProperty(exports, "RESPONSIVE_BREAKPOINTS", { enumerable: true, get: function () { return webflow_1.RESPONSIVE_BREAKPOINTS; } });
Object.defineProperty(exports, "PSEUDO_STATES", { enumerable: true, get: function () { return webflow_1.PSEUDO_STATES; } });
Object.defineProperty(exports, "STATE_KEYS", { enumerable: true, get: function () { return webflow_1.STATE_KEYS; } });
Object.defineProperty(exports, "getBreakpoint", { enumerable: true, get: function () { return webflow_1.getBreakpoint; } });
Object.defineProperty(exports, "getState", { enumerable: true, get: function () { return webflow_1.getState; } });
Object.defineProperty(exports, "getVariantKey", { enumerable: true, get: function () { return webflow_1.getVariantKey; } });
// Mappings
Object.defineProperty(exports, "HTML_TAG_TO_COMPONENT", { enumerable: true, get: function () { return webflow_1.HTML_TAG_TO_COMPONENT; } });
Object.defineProperty(exports, "getComponentType", { enumerable: true, get: function () { return webflow_1.getComponentType; } });
Object.defineProperty(exports, "getDefaultTag", { enumerable: true, get: function () { return webflow_1.getDefaultTag; } });
Object.defineProperty(exports, "getXSCPType", { enumerable: true, get: function () { return webflow_1.getXSCPType; } });
// Breakpoint and style documentation for prompts
Object.defineProperty(exports, "BREAKPOINT_DOCS", { enumerable: true, get: function () { return webflow_1.BREAKPOINT_DOCS; } });
Object.defineProperty(exports, "STATE_DOCS", { enumerable: true, get: function () { return webflow_1.STATE_DOCS; } });
Object.defineProperty(exports, "STYLE_REGISTRY_FORMAT_DOCS", { enumerable: true, get: function () { return webflow_1.STYLE_REGISTRY_FORMAT_DOCS; } });
Object.defineProperty(exports, "DESKTOP_ONLY_WARNING", { enumerable: true, get: function () { return webflow_1.DESKTOP_ONLY_WARNING; } });
// NOTE: Prompt documentation (SLIDER_HIERARCHY_DOCS, etc.) moved to backend-new/prompts/webflow/docs
