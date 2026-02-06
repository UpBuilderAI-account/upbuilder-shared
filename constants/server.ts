// ============================================================================
// SERVER CONSTANTS
// Backend-only configuration constants
// ============================================================================

// ============================================
// AI & MODEL CONFIGURATION
// ============================================

/**
 * Available Claude models
 */
export const CLAUDE_MODELS = {
  opus: 'claude-opus-4-5-20251101'
} as const;

/**
 * Default temperature for AI generation
 */
export const AI_TEMPERATURE = 0.1;

/**
 * Default temperature for Claude generation
 */
export const CLAUDE_TEMPERATURE = 0.1;

/**
 * Maximum output tokens
 */
export const AI_MAX_OUTPUT_TOKENS = 65536;

/**
 * Maximum output tokens for Claude (API limit: 64000)
 */
export const CLAUDE_MAX_OUTPUT_TOKENS = 64000;

/**
 * Thinking budget for reasoning
 */
export const AI_THINKING_BUDGET = 0;

/**
 * Maximum length of AI response in characters (1MB limit - updated from 200KB)
 */
export const MAX_AI_RESPONSE_LENGTH = 1000000;

/**
 * Maximum number of chunks to process from streaming response (updated from 2000)
 */
export const MAX_CHUNKS = 10000;

/**
 * Window size for chunk processing validation
 */
export const CHUNK_WINDOW_SIZE = 100;

/**
 * Minimum chunks to receive before performing validation checks
 */
export const MIN_CHUNKS_BEFORE_CHECK = 50;

/**
 * Default maximum retry attempts
 */
export const DEFAULT_MAX_RETRIES = 3;

/**
 * Maximum retries for simple operations
 */
export const SIMPLE_MAX_RETRIES = 3;

/**
 * Simple streaming timeout (5 minutes)
 * @deprecated Use TIMEOUTS.STREAMING_SIMPLE_TIMEOUT from './timeouts' instead
 */
export const STREAMING_SIMPLE_TIMEOUT_MS = 300000;

/**
 * Retry delay for simple streaming (5 seconds)
 * @deprecated Use TIMEOUTS.STREAMING_SIMPLE_RETRY_DELAY from './timeouts' instead
 */
export const STREAMING_SIMPLE_RETRY_DELAY_MS = 5000;

// ============================================
// SCREENSHOTS
// ============================================

/**
 * Maximum dimension for screenshots (width or height)
 * 8192 = 8K resolution, very high quality for detailed designs
 * Used by Figma plugin for bigPreview generation
 */
export const MAX_SCREENSHOT_DIMENSION = 8192;

// ============================================
// NETWORK & WEBSOCKET (Backend-specific)
// ============================================

// Note: WEBSOCKET_BUFFER_SIZE_MB, HTTP_PAYLOAD_LIMIT_MB, CONTENT_TYPES,
// DEFAULT_PLATFORM, and DEFAULT_STYLE_FRAMEWORK are exported from app.ts
// and available via @upbuilder/shared

/**
 * Server startup retry delay (3 seconds)
 */
export const SERVER_STARTUP_RETRY_DELAY_MS = 3000;

// ============================================
// STREAMING
// ============================================

/**
 * Default chunk timeout for AI streaming (3 minutes)
 * @deprecated Use TIMEOUTS.STREAMING_CHUNK_TIMEOUT from './timeouts' instead
 */
export const STREAMING_CHUNK_TIMEOUT_MS = 180000;

/**
 * Maximum retries for AI streaming
 */
export const STREAMING_MAX_RETRIES = 3;

/**
 * Retry delay for streaming failures (5 seconds)
 * @deprecated Use TIMEOUTS.STREAMING_RETRY_DELAY from './timeouts' instead
 */
export const STREAMING_RETRY_DELAY_MS = 5000;

// ============================================
// IMAGE PROCESSING
// ============================================

/**
 * Standard container size for image processing
 */
export const IMAGE_CONTAINER_SIZE = {
  width: 768,
  height: 768,
} as const;

/**
 * Label height for image annotations
 */
export const IMAGE_LABEL_HEIGHT = 90;

/**
 * Padding inside image containers
 */
export const IMAGE_CONTAINER_PADDING = 10;

/**
 * Separator height between elements
 */
export const IMAGE_SEPARATOR_HEIGHT = 10;

/**
 * Default label font size
 */
export const IMAGE_LABEL_FONT_SIZE = 65;

/**
 * Minimum text font size
 */
export const TEXT_MIN_FONT_SIZE_PX = 8;

/**
 * Lightness adjustment factor for grayscale
 */
export const IMAGE_LIGHTNESS_FACTOR = 10;

/**
 * Brightness threshold for text color detection
 */
export const IMAGE_BRIGHTNESS_THRESHOLD = 128;

/**
 * Minimum dimension to be considered a shape (vs line)
 */
export const SHAPE_MIN_DIMENSION_PX = 8;

/**
 * Border width threshold for shape detection
 */
export const BORDER_WIDTH_THRESHOLD = 0.2;

// ============================================
// TIMEOUTS & DELAYS
// ============================================

/**
 * Background upload timeout (10 minutes)
 */
export const BACKGROUND_UPLOAD_TIMEOUT_MS = 600000;

/**
 * Delay between stage processing (1 second)
 */
export const STAGE_PROCESSING_DELAY_MS = 1000;

/**
 * Delay between image uploads to Webflow CDN in milliseconds
 */
export const WEBFLOW_IMAGE_UPLOAD_DELAY = 2000;
