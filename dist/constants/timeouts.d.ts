export declare const TIMEOUTS: {
    /** Time to wait for PONG before considering client dead (was 60s → 120s for slow/jittery connections) */
    readonly SOCKET_PING_TIMEOUT: 120000;
    /** Interval for sending PING heartbeats */
    readonly SOCKET_PING_INTERVAL: 25000;
    /** Time to wait for initial connection handshake */
    readonly SOCKET_CONNECT_TIMEOUT: 45000;
    /** Default timeout for plugin socket emits */
    readonly PLUGIN_DEFAULT: 30000;
    /** Plugin token wait during init (was 3s → 8s) */
    readonly PLUGIN_TOKEN_WAIT: 8000;
    /** Guest authentication (was 10s → 15s) */
    readonly PLUGIN_AUTH_GUEST: 15000;
    /** send_nodes: full Figma tree JSON, can be 5-20MB (was 60s → 3min) */
    readonly PLUGIN_SEND_NODES: 180000;
    /** send_design_images: base64 image batches (was 60s → 2min) */
    readonly PLUGIN_SEND_IMAGES: 120000;
    /** process_all_images: server-side processing after upload (was 60s → 90s) */
    readonly PLUGIN_PROCESS_IMAGES: 90000;
    /** image_review: upload screenshots + AI scan (was 90s → 3min) */
    readonly PLUGIN_IMAGE_REVIEW: 180000;
    /** Join plugin room (keep 15s) */
    readonly PLUGIN_JOIN_ROOM: 15000;
    /** Start workflow */
    readonly PLUGIN_WORKFLOW_START: 30000;
    /** Resume workflow */
    readonly PLUGIN_WORKFLOW_RESUME: 30000;
    /** Rerun workflow */
    readonly PLUGIN_WORKFLOW_RERUN: 30000;
    /** Next stage request */
    readonly PLUGIN_WORKFLOW_NEXT: 30000;
    /** Cancel operation */
    readonly PLUGIN_WORKFLOW_CANCEL: 10000;
    /** Validate design */
    readonly PLUGIN_VALIDATE_DESIGN: 15000;
    /** Transfer ownership */
    readonly PLUGIN_TRANSFER_OWNERSHIP: 15000;
    /** Get project status */
    readonly PLUGIN_GET_STATUS: 15000;
    /** Claim project */
    readonly PLUGIN_CLAIM_PROJECT: 15000;
    /** Authentication wait (polling loop) */
    readonly PLUGIN_AUTH_WAIT: 5000;
    /** Default emit timeout for frontend (was 10s → 15s) */
    readonly FRONTEND_DEFAULT: 15000;
    /** Customizer operations (was 15s → 20s) */
    readonly FRONTEND_CUSTOMIZER: 20000;
    /** Initial project load (was 15s → 20s) */
    readonly FRONTEND_PROJECT_LOAD: 20000;
    /** Project list request (was 15s → 20s) */
    readonly FRONTEND_PROJECT_LIST: 20000;
    /** Project delete (was 10s → 15s) */
    readonly FRONTEND_PROJECT_DELETE: 15000;
    /** Project duplicate (keep 30s) */
    readonly FRONTEND_PROJECT_DUPLICATE: 30000;
    /** Version restore (keep 30s) */
    readonly FRONTEND_VERSION_RESTORE: 30000;
    /** Image upload in customizer (60s for large images on slow connections) */
    readonly FRONTEND_IMAGE_UPLOAD: 60000;
    /** Idle timeout between Gemini stream chunks (was 120s → 3min for complex pages) */
    readonly GEMINI_STREAM_IDLE: 180000;
    /** Default chunk timeout for AI streaming shared constant (was 120s → 3min) */
    readonly STREAMING_CHUNK_TIMEOUT: 180000;
    /** Simple streaming timeout (keep 5min) */
    readonly STREAMING_SIMPLE_TIMEOUT: 300000;
    /** Retry delay for streaming failures */
    readonly STREAMING_RETRY_DELAY: 5000;
    /** Simple streaming retry delay */
    readonly STREAMING_SIMPLE_RETRY_DELAY: 5000;
    /** Inactivity timeout during image collection (keep 3min) */
    readonly PLUGIN_ACTIVITY: 180000;
};
//# sourceMappingURL=timeouts.d.ts.map