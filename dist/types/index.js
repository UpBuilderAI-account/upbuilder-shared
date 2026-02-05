"use strict";
// ============================================================================
// SHARED TYPES INDEX
// Central export for all type definitions
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
var __exportStar = (this && this.__exportStar) || function(m, exports) {
    for (var p in m) if (p !== "default" && !Object.prototype.hasOwnProperty.call(exports, p)) __createBinding(exports, m, p);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.STAGE_LABELS = exports.STAGE_ORDER = exports.getStageOrderForPlatform = exports.isFailed = exports.isComplete = exports.isRunning = exports.isPending = exports.QUICK_EXPORT_CONFIG = exports.DEFAULT_EXPORT_CONFIG = exports.QUICK_INTERACTIVITY_CONFIG = exports.DEFAULT_INTERACTIVITY_CONFIG = exports.DEFAULT_RESPONSIVE_CONFIG = exports.DEFAULT_STYLESHEET_CONFIG = exports.DEFAULT_NAVBAR_CONFIG = exports.SCALABLE_UNITS_CONFIG = exports.DEFAULT_UNITS_CONFIG = exports.IMAGE_DIMENSION_PRESETS = exports.DEFAULT_IMAGE_CONFIG = exports.USES_SECTION_CSS = exports.QUICK_MODE_SKIPPED_STAGES = exports.SKIPPED_STAGES = exports.shouldSkipStage = exports.requiresUserActionAfter = exports.getNextStatus = exports.isProcessingStage = void 0;
// Core domain types (business logic & database entities)
__exportStar(require("./core-domain"), exports);
// Re-export workflow helpers from core-domain for convenience
var core_domain_1 = require("./core-domain");
Object.defineProperty(exports, "isProcessingStage", { enumerable: true, get: function () { return core_domain_1.isProcessingStage; } });
Object.defineProperty(exports, "getNextStatus", { enumerable: true, get: function () { return core_domain_1.getNextStatus; } });
Object.defineProperty(exports, "requiresUserActionAfter", { enumerable: true, get: function () { return core_domain_1.requiresUserActionAfter; } });
Object.defineProperty(exports, "shouldSkipStage", { enumerable: true, get: function () { return core_domain_1.shouldSkipStage; } });
Object.defineProperty(exports, "SKIPPED_STAGES", { enumerable: true, get: function () { return core_domain_1.SKIPPED_STAGES; } });
Object.defineProperty(exports, "QUICK_MODE_SKIPPED_STAGES", { enumerable: true, get: function () { return core_domain_1.QUICK_MODE_SKIPPED_STAGES; } });
Object.defineProperty(exports, "USES_SECTION_CSS", { enumerable: true, get: function () { return core_domain_1.USES_SECTION_CSS; } });
// Billing types (subscriptions, pricing)
__exportStar(require("./billing"), exports);
// Socket protocol types (WebSocket communication)
__exportStar(require("./socket-protocol"), exports);
// Workflow types - explicit exports to avoid conflicts with core-domain
// (workflow.ts types are lightweight progress-tracking types)
var workflow_1 = require("./workflow");
Object.defineProperty(exports, "DEFAULT_IMAGE_CONFIG", { enumerable: true, get: function () { return workflow_1.DEFAULT_IMAGE_CONFIG; } });
Object.defineProperty(exports, "IMAGE_DIMENSION_PRESETS", { enumerable: true, get: function () { return workflow_1.IMAGE_DIMENSION_PRESETS; } });
Object.defineProperty(exports, "DEFAULT_UNITS_CONFIG", { enumerable: true, get: function () { return workflow_1.DEFAULT_UNITS_CONFIG; } });
Object.defineProperty(exports, "SCALABLE_UNITS_CONFIG", { enumerable: true, get: function () { return workflow_1.SCALABLE_UNITS_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_NAVBAR_CONFIG", { enumerable: true, get: function () { return workflow_1.DEFAULT_NAVBAR_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_STYLESHEET_CONFIG", { enumerable: true, get: function () { return workflow_1.DEFAULT_STYLESHEET_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_RESPONSIVE_CONFIG", { enumerable: true, get: function () { return workflow_1.DEFAULT_RESPONSIVE_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_INTERACTIVITY_CONFIG", { enumerable: true, get: function () { return workflow_1.DEFAULT_INTERACTIVITY_CONFIG; } });
Object.defineProperty(exports, "QUICK_INTERACTIVITY_CONFIG", { enumerable: true, get: function () { return workflow_1.QUICK_INTERACTIVITY_CONFIG; } });
Object.defineProperty(exports, "DEFAULT_EXPORT_CONFIG", { enumerable: true, get: function () { return workflow_1.DEFAULT_EXPORT_CONFIG; } });
Object.defineProperty(exports, "QUICK_EXPORT_CONFIG", { enumerable: true, get: function () { return workflow_1.QUICK_EXPORT_CONFIG; } });
// Helpers
Object.defineProperty(exports, "isPending", { enumerable: true, get: function () { return workflow_1.isPending; } });
Object.defineProperty(exports, "isRunning", { enumerable: true, get: function () { return workflow_1.isRunning; } });
Object.defineProperty(exports, "isComplete", { enumerable: true, get: function () { return workflow_1.isComplete; } });
Object.defineProperty(exports, "isFailed", { enumerable: true, get: function () { return workflow_1.isFailed; } });
Object.defineProperty(exports, "getStageOrderForPlatform", { enumerable: true, get: function () { return workflow_1.getStageOrderForPlatform; } });
// Constants
Object.defineProperty(exports, "STAGE_ORDER", { enumerable: true, get: function () { return workflow_1.STAGE_ORDER; } });
Object.defineProperty(exports, "STAGE_LABELS", { enumerable: true, get: function () { return workflow_1.STAGE_LABELS; } });
// Plugin types
__exportStar(require("./plugin"), exports);
// Element types
__exportStar(require("./element"), exports);
// Webflow export types
__exportStar(require("./webflow"), exports);
// Complex hierarchy detection types
__exportStar(require("./complex-hierarchy"), exports);
// Outside elements detection types
__exportStar(require("./outside-elements"), exports);
// Editable tree types (customizer - safe format for frontend)
__exportStar(require("./editable-tree"), exports);
// Edit operations types (customizer - operations sent from frontend)
__exportStar(require("./edit-operations"), exports);
// Plan stage types (workflow v2 - AI planning phase)
__exportStar(require("./plan"), exports);
// Fixing stage types (workflow v2 - AI auto-fix phase)
__exportStar(require("./fixing"), exports);
// Expansion types (smart expansion mode & version history)
__exportStar(require("./expansion"), exports);
// Image review types (AI-powered image detection)
__exportStar(require("./image-review"), exports);
// CMS types (schema, bindings, XSCP integration)
__exportStar(require("./cms"), exports);
// Section render types (browser-based QA rendering)
__exportStar(require("./section-render"), exports);
