/**
 * Fixed progress milestones - progress jumps between these values
 * Each stage has ONE value - simpler and less buggy
 */
export declare const PLUGIN_PROGRESS: {
    readonly START: 0;
    readonly SCANNING_GRAPHICS: 2;
    readonly SCANNING_OUTSIDE: 4;
    readonly ANALYZING: 5;
    readonly DETECTING: 10;
    readonly GROUPING: 15;
    readonly EXPORTING: 20;
    readonly EXPORT_DONE: 40;
    readonly UPLOADING: 45;
    readonly UPLOAD_DONE: 50;
    readonly BACKEND_PROCESSING: 55;
    readonly BACKEND_THUMBNAILS: 60;
    readonly BACKEND_UPLOADING: 65;
    readonly TAGGING: 75;
    readonly TAGGING_DONE: 85;
    readonly SAVING: 90;
    readonly COMPLETE: 100;
};
export type PluginProgressMilestone = typeof PLUGIN_PROGRESS[keyof typeof PLUGIN_PROGRESS];
/**
 * Calculate interpolated progress within a range (for image export progress)
 */
export declare function calculateRangeProgress(current: number, total: number, startProgress: number, endProgress: number): number;
/**
 * Calculate progress during tagging phase
 */
export declare function calculateTaggingProgress(taggedCount: number, totalImages: number): number;
//# sourceMappingURL=plugin-progress.d.ts.map