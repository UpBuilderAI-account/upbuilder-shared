/**
 * Available Claude models
 */
export declare const CLAUDE_MODELS: {
    readonly opus: "claude-opus-4-5-20251101";
};
/**
 * Default temperature for AI generation
 */
export declare const AI_TEMPERATURE = 0.1;
/**
 * Default temperature for Claude generation
 */
export declare const CLAUDE_TEMPERATURE = 0.1;
/**
 * Maximum output tokens
 */
export declare const AI_MAX_OUTPUT_TOKENS = 65536;
/**
 * Maximum output tokens for Claude (API limit: 64000)
 */
export declare const CLAUDE_MAX_OUTPUT_TOKENS = 64000;
/**
 * Thinking budget for reasoning
 */
export declare const AI_THINKING_BUDGET = 0;
/**
 * Maximum length of AI response in characters (1MB limit - updated from 200KB)
 */
export declare const MAX_AI_RESPONSE_LENGTH = 1000000;
/**
 * Maximum number of chunks to process from streaming response (updated from 2000)
 */
export declare const MAX_CHUNKS = 10000;
/**
 * Window size for chunk processing validation
 */
export declare const CHUNK_WINDOW_SIZE = 100;
/**
 * Minimum chunks to receive before performing validation checks
 */
export declare const MIN_CHUNKS_BEFORE_CHECK = 50;
/**
 * Default maximum retry attempts
 */
export declare const DEFAULT_MAX_RETRIES = 3;
/**
 * Maximum retries for simple operations
 */
export declare const SIMPLE_MAX_RETRIES = 3;
/**
 * Simple streaming timeout (5 minutes)
 */
export declare const STREAMING_SIMPLE_TIMEOUT_MS = 300000;
/**
 * Retry delay for simple streaming (5 seconds)
 */
export declare const STREAMING_SIMPLE_RETRY_DELAY_MS = 5000;
/**
 * Maximum dimension for screenshots (width or height)
 * 8192 = 8K resolution, very high quality for detailed designs
 * Used by Figma plugin for bigPreview generation
 */
export declare const MAX_SCREENSHOT_DIMENSION = 8192;
/**
 * Server startup retry delay (3 seconds)
 */
export declare const SERVER_STARTUP_RETRY_DELAY_MS = 3000;
/**
 * Default chunk timeout for AI streaming (2 minutes)
 */
export declare const STREAMING_CHUNK_TIMEOUT_MS = 120000;
/**
 * Maximum retries for AI streaming
 */
export declare const STREAMING_MAX_RETRIES = 3;
/**
 * Retry delay for streaming failures (5 seconds)
 */
export declare const STREAMING_RETRY_DELAY_MS = 5000;
/**
 * Standard container size for image processing
 */
export declare const IMAGE_CONTAINER_SIZE: {
    readonly width: 768;
    readonly height: 768;
};
/**
 * Label height for image annotations
 */
export declare const IMAGE_LABEL_HEIGHT = 90;
/**
 * Padding inside image containers
 */
export declare const IMAGE_CONTAINER_PADDING = 10;
/**
 * Separator height between elements
 */
export declare const IMAGE_SEPARATOR_HEIGHT = 10;
/**
 * Default label font size
 */
export declare const IMAGE_LABEL_FONT_SIZE = 65;
/**
 * Minimum text font size
 */
export declare const TEXT_MIN_FONT_SIZE_PX = 8;
/**
 * Lightness adjustment factor for grayscale
 */
export declare const IMAGE_LIGHTNESS_FACTOR = 10;
/**
 * Brightness threshold for text color detection
 */
export declare const IMAGE_BRIGHTNESS_THRESHOLD = 128;
/**
 * Minimum dimension to be considered a shape (vs line)
 */
export declare const SHAPE_MIN_DIMENSION_PX = 8;
/**
 * Border width threshold for shape detection
 */
export declare const BORDER_WIDTH_THRESHOLD = 0.2;
/**
 * Background upload timeout (10 minutes)
 */
export declare const BACKGROUND_UPLOAD_TIMEOUT_MS = 600000;
/**
 * Delay between stage processing (1 second)
 */
export declare const STAGE_PROCESSING_DELAY_MS = 1000;
/**
 * Delay between image uploads to Webflow CDN in milliseconds
 */
export declare const WEBFLOW_IMAGE_UPLOAD_DELAY = 2000;
//# sourceMappingURL=server.d.ts.map