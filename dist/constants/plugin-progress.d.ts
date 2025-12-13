/**
 * Fixed progress milestones for plugin export flow
 * Progress only moves forward through these milestones
 */
export declare const PLUGIN_PROGRESS: {
    /** Initial state */
    readonly START: 0;
    /** Analyzing design structure */
    readonly ANALYZING: 10;
    /** Uploading nodes and images to server */
    readonly UPLOADING: 30;
    /** AI tagging phase starts */
    readonly TAGGING_START: 50;
    /** AI tagging phase ends (max before complete) */
    readonly TAGGING_END: 95;
    /** Export complete */
    readonly COMPLETE: 100;
};
export type PluginProgressMilestone = typeof PLUGIN_PROGRESS[keyof typeof PLUGIN_PROGRESS];
/**
 * Calculate progress during tagging phase based on tagged count
 * Progress scales linearly from TAGGING_START to TAGGING_END
 *
 * @param taggedCount - Number of images tagged so far
 * @param totalImages - Total number of images to tag
 * @returns Progress value between TAGGING_START and TAGGING_END
 */
export declare function calculateTaggingProgress(taggedCount: number, totalImages: number): number;
//# sourceMappingURL=plugin-progress.d.ts.map