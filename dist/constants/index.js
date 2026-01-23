"use strict";
// ============================================================================
// SHARED CONSTANTS INDEX
// Central export for all constant values across all packages
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
exports.SERVER_STARTUP_RETRY_DELAY_MS = exports.DEFAULT_MAX_RETRIES = exports.AI_THINKING_BUDGET = exports.AI_MAX_OUTPUT_TOKENS = exports.AI_TEMPERATURE = exports.ERROR_CODES = void 0;
// ============================================
// CROSS-PLATFORM CONSTANTS (Frontend, Backend, Plugin)
// ============================================
/**
 * General application config
 * Includes: Auth, Platform, Network, Validation, UI/CSS
 */
__exportStar(require("./app"), exports);
/**
 * API Protocol constants
 * Includes: Socket events, Error codes
 */
__exportStar(require("./protocol"), exports);
/**
 * Pricing and plan constants
 * Includes: Plan features, pricing configuration
 */
__exportStar(require("./pricing"), exports);
/**
 * Error codes and types
 * Note: ERROR_CODES and ErrorCode are exported from types/socket-protocol.ts
 */
var socket_protocol_1 = require("../types/socket-protocol");
Object.defineProperty(exports, "ERROR_CODES", { enumerable: true, get: function () { return socket_protocol_1.ERROR_CODES; } });
/**
 * AI response markers for prompt generators and parsers
 * Used to maintain consistency between AI prompts and response parsing
 */
__exportStar(require("./ai-markers"), exports);
/**
 * Server/Backend-only constants
 * Only exports actively used by consumers
 */
var server_1 = require("./server");
Object.defineProperty(exports, "AI_TEMPERATURE", { enumerable: true, get: function () { return server_1.AI_TEMPERATURE; } });
Object.defineProperty(exports, "AI_MAX_OUTPUT_TOKENS", { enumerable: true, get: function () { return server_1.AI_MAX_OUTPUT_TOKENS; } });
Object.defineProperty(exports, "AI_THINKING_BUDGET", { enumerable: true, get: function () { return server_1.AI_THINKING_BUDGET; } });
Object.defineProperty(exports, "DEFAULT_MAX_RETRIES", { enumerable: true, get: function () { return server_1.DEFAULT_MAX_RETRIES; } });
Object.defineProperty(exports, "SERVER_STARTUP_RETRY_DELAY_MS", { enumerable: true, get: function () { return server_1.SERVER_STARTUP_RETRY_DELAY_MS; } });
/**
 * Plugin progress milestones
 * Shared between plugin frontend and backend for consistent progress tracking
 */
__exportStar(require("./plugin-progress"), exports);
/**
 * Export steps config per platform
 * Single source of truth for export stage UI
 */
__exportStar(require("./export-steps"), exports);
// Note: Workflow labels and progress are now in types/workflow.ts
