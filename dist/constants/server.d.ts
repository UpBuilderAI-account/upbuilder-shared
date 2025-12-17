/**
 * Available Gemini models
 */
export declare const GEMINI_MODELS: {
    readonly pro: "gemini-3-flash-preview";
    readonly flash: "gemini-3-flash-preview";
    readonly flash2: "gemini-2.0-flash";
    readonly lite: "gemini-flash-lite-latest";
    readonly thinking2: "gemini-2.0-flash-thinking-exp";
};
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
 * Maximum dimension for browser screenshots (width or height)
 */
export declare const MAX_SCREENSHOT_DIMENSION = 2048;
/**
 * Initial timeout for browser operations in milliseconds (updated from 60000)
 */
export declare const BROWSER_INITIAL_TIMEOUT = 30000;
/**
 * Maximum wait time for browser operations in milliseconds
 */
export declare const BROWSER_MAX_WAIT_TIME = 60000;
/**
 * Retry interval for browser operations in milliseconds
 */
export declare const BROWSER_RETRY_INTERVAL = 1000;
/**
 * Base retry multiplier for exponential backoff
 */
export declare const BROWSER_RETRY_MULTIPLIER = 1.5;
/**
 * Chrome/Chromium executable paths by platform
 */
export declare const CHROME_PATHS: {
    readonly win32: readonly ["C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe", "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe"];
    readonly darwin: readonly ["/Applications/Google Chrome.app/Contents/MacOS/Google Chrome"];
    readonly linux: readonly ["/usr/bin/chromium-browser", "/usr/bin/chromium", "/usr/bin/google-chrome", "/usr/bin/google-chrome-stable"];
};
/**
 * Whether to run browser in headless mode
 */
export declare const BROWSER_HEADLESS_MODE = true;
/**
 * Maximum memory for browser process
 */
export declare const BROWSER_MAX_OLD_SPACE_SIZE_MB = 4096;
/**
 * Maximum renderer processes
 */
export declare const BROWSER_RENDERER_PROCESS_LIMIT = 10;
/**
 * Browser viewport dimensions
 */
export declare const DEFAULT_VIEWPORT: {
    readonly width: 1920;
    readonly height: 1080;
};
/**
 * Screenshot quality (0-100)
 */
export declare const DEFAULT_SCREENSHOT_QUALITY = 90;
/**
 * Screenshot format
 */
export declare const DEFAULT_SCREENSHOT_FORMAT: "jpeg";
/**
 * Maximum retries for screenshot capture
 */
export declare const SCREENSHOT_MAX_RETRIES = 3;
/**
 * Browser screenshot retry delay base (1 second)
 */
export declare const BROWSER_SCREENSHOT_RETRY_BASE_MS = 1000;
/**
 * Browser screenshot retry delay max (10 seconds)
 */
export declare const BROWSER_SCREENSHOT_RETRY_MAX_MS = 10000;
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