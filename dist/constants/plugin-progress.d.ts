/**
 * Fixed progress milestones for plugin export flow
 * Progress only moves forward through these milestones
 */
export declare const PLUGIN_PROGRESS: {
    /** Initial state */
    readonly START: 0;
    /** Analyzing design structure */
    readonly ANALYZING: 5;
    /** Detecting image nodes (fetching) */
    readonly DETECTING_START: 5;
    readonly DETECTING_END: 15;
    /** Grouping similar images (deduplication) */
    readonly GROUPING_START: 15;
    readonly GROUPING_END: 20;
    /** Exporting images (PNG generation - slowest phase) */
    readonly EXPORTING_START: 20;
    readonly EXPORTING_END: 45;
    /** Sending batches to backend */
    readonly UPLOADING: 45;
    readonly UPLOADING_END: 50;
    /** Backend received data, processing buffers */
    readonly BACKEND_PROCESSING: 50;
    readonly BACKEND_PROCESSING_END: 60;
    /** Uploading to Google Cloud for AI */
    readonly BACKEND_UPLOADING: 60;
    readonly BACKEND_UPLOADING_END: 70;
    /** AI tagging phase */
    readonly TAGGING_START: 70;
    readonly TAGGING_END: 90;
    /** Saving to S3 */
    readonly BACKEND_SAVING: 90;
    readonly BACKEND_SAVING_END: 95;
    /** Export complete */
    readonly COMPLETE: 100;
};
export type PluginProgressMilestone = typeof PLUGIN_PROGRESS[keyof typeof PLUGIN_PROGRESS];
/**
 * Calculate interpolated progress within a range
 * @param current - Current count
 * @param total - Total count
 * @param startProgress - Progress value at start of range
 * @param endProgress - Progress value at end of range
 */
export declare function calculateRangeProgress(current: number, total: number, startProgress: number, endProgress: number): number;
/**
 * Calculate progress during detecting phase
 */
export declare function calculateDetectingProgress(detected: number, total: number): number;
/**
 * Calculate progress during exporting phase
 */
export declare function calculateExportingProgress(exported: number, total: number): number;
/**
 * Calculate progress during backend processing phase
 */
export declare function calculateProcessingProgress(processed: number, total: number): number;
/**
 * Calculate progress during backend upload phase
 */
export declare function calculateUploadingProgress(uploaded: number, total: number): number;
/**
 * Calculate progress during tagging phase based on tagged count
 */
export declare function calculateTaggingProgress(taggedCount: number, totalImages: number): number;
/**
 * Calculate progress during saving phase
 */
export declare function calculateSavingProgress(saved: number, total: number): number;
//# sourceMappingURL=plugin-progress.d.ts.map