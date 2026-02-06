// ============================================================================
// CENTRALIZED TIMEOUT CONSTANTS
// All timeout values in one place for easy tuning.
// Designed to be resilient for users on slow connections (1-5 Mbps).
// ============================================================================

export const TIMEOUTS = {
  // ==========================================================================
  // SOCKET.IO SERVER CONFIG
  // ==========================================================================

  /** Time to wait for PONG before considering client dead (was 60s → 120s for slow/jittery connections) */
  SOCKET_PING_TIMEOUT: 120_000,
  /** Interval for sending PING heartbeats */
  SOCKET_PING_INTERVAL: 25_000,
  /** Time to wait for initial connection handshake */
  SOCKET_CONNECT_TIMEOUT: 45_000,

  // ==========================================================================
  // PLUGIN → BACKEND TRANSFERS (bottleneck: user's upload speed)
  // ==========================================================================

  /** Default timeout for plugin socket emits */
  PLUGIN_DEFAULT: 30_000,
  /** Plugin token wait during init (was 3s → 8s) */
  PLUGIN_TOKEN_WAIT: 8_000,
  /** Guest authentication (was 10s → 15s) */
  PLUGIN_AUTH_GUEST: 15_000,
  /** send_nodes: full Figma tree JSON, can be 5-20MB (was 60s → 3min) */
  PLUGIN_SEND_NODES: 180_000,
  /** send_design_images: base64 image batches (was 60s → 2min) */
  PLUGIN_SEND_IMAGES: 120_000,
  /** process_all_images: server-side processing after upload (was 60s → 90s) */
  PLUGIN_PROCESS_IMAGES: 90_000,
  /** image_review: upload screenshots + AI scan (was 90s → 3min) */
  PLUGIN_IMAGE_REVIEW: 180_000,
  /** Join plugin room (keep 15s) */
  PLUGIN_JOIN_ROOM: 15_000,
  /** Start workflow */
  PLUGIN_WORKFLOW_START: 30_000,
  /** Resume workflow */
  PLUGIN_WORKFLOW_RESUME: 30_000,
  /** Rerun workflow */
  PLUGIN_WORKFLOW_RERUN: 30_000,
  /** Next stage request */
  PLUGIN_WORKFLOW_NEXT: 30_000,
  /** Cancel operation */
  PLUGIN_WORKFLOW_CANCEL: 10_000,
  /** Validate design */
  PLUGIN_VALIDATE_DESIGN: 15_000,
  /** Transfer ownership */
  PLUGIN_TRANSFER_OWNERSHIP: 15_000,
  /** Get project status */
  PLUGIN_GET_STATUS: 15_000,
  /** Claim project */
  PLUGIN_CLAIM_PROJECT: 15_000,
  /** Authentication wait (polling loop) */
  PLUGIN_AUTH_WAIT: 5_000,

  // ==========================================================================
  // FRONTEND SOCKET DEFAULTS
  // ==========================================================================

  /** Default emit timeout for frontend (was 10s → 15s) */
  FRONTEND_DEFAULT: 15_000,
  /** Customizer operations (was 15s → 20s) */
  FRONTEND_CUSTOMIZER: 20_000,
  /** Initial project load (was 15s → 20s) */
  FRONTEND_PROJECT_LOAD: 20_000,
  /** Project list request (was 15s → 20s) */
  FRONTEND_PROJECT_LIST: 20_000,
  /** Project delete (was 10s → 15s) */
  FRONTEND_PROJECT_DELETE: 15_000,
  /** Project duplicate (keep 30s) */
  FRONTEND_PROJECT_DUPLICATE: 30_000,
  /** Version restore (keep 30s) */
  FRONTEND_VERSION_RESTORE: 30_000,
  /** Image upload in customizer (60s for large images on slow connections) */
  FRONTEND_IMAGE_UPLOAD: 60_000,

  // ==========================================================================
  // AI / GEMINI STREAMING
  // ==========================================================================

  /** Idle timeout between Gemini stream chunks (was 120s → 3min for complex pages) */
  GEMINI_STREAM_IDLE: 180_000,
  /** Default chunk timeout for AI streaming shared constant (was 120s → 3min) */
  STREAMING_CHUNK_TIMEOUT: 180_000,
  /** Simple streaming timeout (keep 5min) */
  STREAMING_SIMPLE_TIMEOUT: 300_000,
  /** Retry delay for streaming failures */
  STREAMING_RETRY_DELAY: 5_000,
  /** Simple streaming retry delay */
  STREAMING_SIMPLE_RETRY_DELAY: 5_000,

  // ==========================================================================
  // PLUGIN ACTIVITY (image collection from Figma)
  // ==========================================================================

  /** Inactivity timeout during image collection (keep 3min) */
  PLUGIN_ACTIVITY: 180_000,
} as const;
