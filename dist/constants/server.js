"use strict";
// ============================================================================
// SERVER CONSTANTS
// Backend-only configuration constants
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.WEBFLOW_IMAGE_UPLOAD_DELAY = exports.STAGE_PROCESSING_DELAY_MS = exports.BACKGROUND_UPLOAD_TIMEOUT_MS = exports.BORDER_WIDTH_THRESHOLD = exports.SHAPE_MIN_DIMENSION_PX = exports.IMAGE_BRIGHTNESS_THRESHOLD = exports.IMAGE_LIGHTNESS_FACTOR = exports.TEXT_MIN_FONT_SIZE_PX = exports.IMAGE_LABEL_FONT_SIZE = exports.IMAGE_SEPARATOR_HEIGHT = exports.IMAGE_CONTAINER_PADDING = exports.IMAGE_LABEL_HEIGHT = exports.IMAGE_CONTAINER_SIZE = exports.STREAMING_RETRY_DELAY_MS = exports.STREAMING_MAX_RETRIES = exports.STREAMING_CHUNK_TIMEOUT_MS = exports.SERVER_STARTUP_RETRY_DELAY_MS = exports.MAX_SCREENSHOT_DIMENSION = exports.STREAMING_SIMPLE_RETRY_DELAY_MS = exports.STREAMING_SIMPLE_TIMEOUT_MS = exports.SIMPLE_MAX_RETRIES = exports.DEFAULT_MAX_RETRIES = exports.MIN_CHUNKS_BEFORE_CHECK = exports.CHUNK_WINDOW_SIZE = exports.MAX_CHUNKS = exports.MAX_AI_RESPONSE_LENGTH = exports.AI_THINKING_BUDGET = exports.CLAUDE_MAX_OUTPUT_TOKENS = exports.AI_MAX_OUTPUT_TOKENS = exports.CLAUDE_TEMPERATURE = exports.AI_TEMPERATURE = exports.CLAUDE_MODELS = void 0;
// ============================================
// AI & MODEL CONFIGURATION
// ============================================
/**
 * Available Claude models
 */
exports.CLAUDE_MODELS = {
    opus: 'claude-opus-4-5-20251101'
};
/**
 * Default temperature for AI generation
 */
exports.AI_TEMPERATURE = 0.1;
/**
 * Default temperature for Claude generation
 */
exports.CLAUDE_TEMPERATURE = 0.1;
/**
 * Maximum output tokens
 */
exports.AI_MAX_OUTPUT_TOKENS = 65536;
/**
 * Maximum output tokens for Claude (API limit: 64000)
 */
exports.CLAUDE_MAX_OUTPUT_TOKENS = 64000;
/**
 * Thinking budget for reasoning
 */
exports.AI_THINKING_BUDGET = 0;
/**
 * Maximum length of AI response in characters (1MB limit - updated from 200KB)
 */
exports.MAX_AI_RESPONSE_LENGTH = 1000000;
/**
 * Maximum number of chunks to process from streaming response (updated from 2000)
 */
exports.MAX_CHUNKS = 10000;
/**
 * Window size for chunk processing validation
 */
exports.CHUNK_WINDOW_SIZE = 100;
/**
 * Minimum chunks to receive before performing validation checks
 */
exports.MIN_CHUNKS_BEFORE_CHECK = 50;
/**
 * Default maximum retry attempts
 */
exports.DEFAULT_MAX_RETRIES = 3;
/**
 * Maximum retries for simple operations
 */
exports.SIMPLE_MAX_RETRIES = 3;
/**
 * Simple streaming timeout (5 minutes)
 */
exports.STREAMING_SIMPLE_TIMEOUT_MS = 300000;
/**
 * Retry delay for simple streaming (5 seconds)
 */
exports.STREAMING_SIMPLE_RETRY_DELAY_MS = 5000;
// ============================================
// SCREENSHOTS
// ============================================
/**
 * Maximum dimension for screenshots (width or height)
 * 8192 = 8K resolution, very high quality for detailed designs
 * Used by Figma plugin for bigPreview generation
 */
exports.MAX_SCREENSHOT_DIMENSION = 8192;
// ============================================
// NETWORK & WEBSOCKET (Backend-specific)
// ============================================
// Note: WEBSOCKET_BUFFER_SIZE_MB, HTTP_PAYLOAD_LIMIT_MB, CONTENT_TYPES,
// DEFAULT_PLATFORM, and DEFAULT_STYLE_FRAMEWORK are exported from app.ts
// and available via @upbuilder/shared
/**
 * Server startup retry delay (3 seconds)
 */
exports.SERVER_STARTUP_RETRY_DELAY_MS = 3000;
// ============================================
// STREAMING
// ============================================
/**
 * Default chunk timeout for AI streaming (2 minutes)
 */
exports.STREAMING_CHUNK_TIMEOUT_MS = 120000;
/**
 * Maximum retries for AI streaming
 */
exports.STREAMING_MAX_RETRIES = 3;
/**
 * Retry delay for streaming failures (5 seconds)
 */
exports.STREAMING_RETRY_DELAY_MS = 5000;
// ============================================
// IMAGE PROCESSING
// ============================================
/**
 * Standard container size for image processing
 */
exports.IMAGE_CONTAINER_SIZE = {
    width: 768,
    height: 768,
};
/**
 * Label height for image annotations
 */
exports.IMAGE_LABEL_HEIGHT = 90;
/**
 * Padding inside image containers
 */
exports.IMAGE_CONTAINER_PADDING = 10;
/**
 * Separator height between elements
 */
exports.IMAGE_SEPARATOR_HEIGHT = 10;
/**
 * Default label font size
 */
exports.IMAGE_LABEL_FONT_SIZE = 65;
/**
 * Minimum text font size
 */
exports.TEXT_MIN_FONT_SIZE_PX = 8;
/**
 * Lightness adjustment factor for grayscale
 */
exports.IMAGE_LIGHTNESS_FACTOR = 10;
/**
 * Brightness threshold for text color detection
 */
exports.IMAGE_BRIGHTNESS_THRESHOLD = 128;
/**
 * Minimum dimension to be considered a shape (vs line)
 */
exports.SHAPE_MIN_DIMENSION_PX = 8;
/**
 * Border width threshold for shape detection
 */
exports.BORDER_WIDTH_THRESHOLD = 0.2;
// ============================================
// TIMEOUTS & DELAYS
// ============================================
/**
 * Background upload timeout (10 minutes)
 */
exports.BACKGROUND_UPLOAD_TIMEOUT_MS = 600000;
/**
 * Delay between stage processing (1 second)
 */
exports.STAGE_PROCESSING_DELAY_MS = 1000;
/**
 * Delay between image uploads to Webflow CDN in milliseconds
 */
exports.WEBFLOW_IMAGE_UPLOAD_DELAY = 2000;
