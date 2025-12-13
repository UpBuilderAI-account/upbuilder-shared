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
exports.INLINE_PLATFORM_SKIPPED_STAGES = exports.STAGE_LABELS = exports.STAGE_ORDER = exports.getStageOrderForPlatform = exports.isInlineCSSPlatform = exports.isFailed = exports.isComplete = exports.isRunning = exports.isPending = exports.USES_SECTION_CSS = exports.SKIPPED_STAGES = exports.shouldSkipStage = exports.requiresUserActionAfter = exports.getNextStatus = exports.isProcessingStage = void 0;
// Core domain types (business logic & database entities)
__exportStar(require("./core-domain"), exports);
// Re-export workflow helpers from core-domain for convenience
var core_domain_1 = require("./core-domain");
Object.defineProperty(exports, "isProcessingStage", { enumerable: true, get: function () { return core_domain_1.isProcessingStage; } });
Object.defineProperty(exports, "getNextStatus", { enumerable: true, get: function () { return core_domain_1.getNextStatus; } });
Object.defineProperty(exports, "requiresUserActionAfter", { enumerable: true, get: function () { return core_domain_1.requiresUserActionAfter; } });
Object.defineProperty(exports, "shouldSkipStage", { enumerable: true, get: function () { return core_domain_1.shouldSkipStage; } });
Object.defineProperty(exports, "SKIPPED_STAGES", { enumerable: true, get: function () { return core_domain_1.SKIPPED_STAGES; } });
Object.defineProperty(exports, "USES_SECTION_CSS", { enumerable: true, get: function () { return core_domain_1.USES_SECTION_CSS; } });
// API types (HTTP/REST responses)
__exportStar(require("./api"), exports);
// Billing types (subscriptions, pricing)
__exportStar(require("./billing"), exports);
// Socket protocol types (WebSocket communication)
__exportStar(require("./socket-protocol"), exports);
// Workflow types - explicit exports to avoid conflicts with core-domain
// (workflow.ts types are lightweight progress-tracking types)
var workflow_1 = require("./workflow");
// Helpers
Object.defineProperty(exports, "isPending", { enumerable: true, get: function () { return workflow_1.isPending; } });
Object.defineProperty(exports, "isRunning", { enumerable: true, get: function () { return workflow_1.isRunning; } });
Object.defineProperty(exports, "isComplete", { enumerable: true, get: function () { return workflow_1.isComplete; } });
Object.defineProperty(exports, "isFailed", { enumerable: true, get: function () { return workflow_1.isFailed; } });
Object.defineProperty(exports, "isInlineCSSPlatform", { enumerable: true, get: function () { return workflow_1.isInlineCSSPlatform; } });
Object.defineProperty(exports, "getStageOrderForPlatform", { enumerable: true, get: function () { return workflow_1.getStageOrderForPlatform; } });
// Constants
Object.defineProperty(exports, "STAGE_ORDER", { enumerable: true, get: function () { return workflow_1.STAGE_ORDER; } });
Object.defineProperty(exports, "STAGE_LABELS", { enumerable: true, get: function () { return workflow_1.STAGE_LABELS; } });
Object.defineProperty(exports, "INLINE_PLATFORM_SKIPPED_STAGES", { enumerable: true, get: function () { return workflow_1.INLINE_PLATFORM_SKIPPED_STAGES; } });
// Plugin types
__exportStar(require("./plugin"), exports);
// Element types
__exportStar(require("./element"), exports);
// Webflow export types
__exportStar(require("./webflow"), exports);
// Bricks Builder export types
__exportStar(require("./bricks"), exports);
// Elementor Builder export types
__exportStar(require("./elementor"), exports);
