"use strict";
// ============================================================================
// SHARED PACKAGE ENTRY POINT
// Main export for @upbuilder/shared package
// ============================================================================
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInteractivePattern = exports.detectInteractivePattern = exports.INTERACTIVE_PATTERN_DOCS_COMPACT = exports.INTERACTIVE_PATTERN_DOCS = exports.INTERACTIVE_PATTERNS = exports.getConstraintErrorMessage = exports.validateDesignTree = exports.canContainChild = exports.canPlaceElement = exports.webflow = void 0;
// Export all types
__exportStar(require("./types"), exports);
// Export all constants
__exportStar(require("./constants"), exports);
// Export all utilities
__exportStar(require("./utils"), exports);
// Export Webflow module (components, constraints, data fields, breakpoints, mappings, docs)
exports.webflow = __importStar(require("./webflow"));
// Re-export commonly used validation functions directly for convenience
var hierarchy_helpers_1 = require("./webflow/hierarchy-helpers");
Object.defineProperty(exports, "canPlaceElement", { enumerable: true, get: function () { return hierarchy_helpers_1.canPlaceElement; } });
Object.defineProperty(exports, "canContainChild", { enumerable: true, get: function () { return hierarchy_helpers_1.canContainChild; } });
Object.defineProperty(exports, "validateDesignTree", { enumerable: true, get: function () { return hierarchy_helpers_1.validateDesignTree; } });
Object.defineProperty(exports, "getConstraintErrorMessage", { enumerable: true, get: function () { return hierarchy_helpers_1.getConstraintErrorMessage; } });
// Re-export interactive component detection for prompts
var interactive_detection_1 = require("./webflow/interactive-detection");
Object.defineProperty(exports, "INTERACTIVE_PATTERNS", { enumerable: true, get: function () { return interactive_detection_1.INTERACTIVE_PATTERNS; } });
Object.defineProperty(exports, "INTERACTIVE_PATTERN_DOCS", { enumerable: true, get: function () { return interactive_detection_1.INTERACTIVE_PATTERN_DOCS; } });
Object.defineProperty(exports, "INTERACTIVE_PATTERN_DOCS_COMPACT", { enumerable: true, get: function () { return interactive_detection_1.INTERACTIVE_PATTERN_DOCS_COMPACT; } });
Object.defineProperty(exports, "detectInteractivePattern", { enumerable: true, get: function () { return interactive_detection_1.detectInteractivePattern; } });
Object.defineProperty(exports, "getInteractivePattern", { enumerable: true, get: function () { return interactive_detection_1.getInteractivePattern; } });
