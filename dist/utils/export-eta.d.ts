/**
 * Average processing times in seconds
 * Tune these based on real-world observations
 */
export declare const EXPORT_TIMES: {
    readonly PREPARE: 2;
    readonly CONVERT_STYLES: 90;
    readonly SECTION_BUILD: 10;
    readonly ASSEMBLY: 90;
    readonly GENERATE: 5;
    readonly VALIDATE: 5;
    readonly FINALIZE: 2;
    readonly ASSET_BATCH: 5;
};
/**
 * Parallelism limits (must match backend constants)
 */
export declare const EXPORT_PARALLEL: {
    readonly DESIGNS: 2;
    readonly GLOBAL_SECTIONS: 3;
    readonly DESIGN_SECTIONS: 3;
};
/**
 * Export step IDs for tracking completion
 */
export type ExportStepId = 'prepare' | 'styles' | 'global_sections' | 'assets' | 'processing' | 'finalize';
export interface ExportETAParams {
    platform: 'webflow' | 'bricks' | 'elementor';
    globalSectionsCount: number;
    designs: Array<{
        id: string;
        sectionCount: number;
    }>;
    assetCount?: number;
}
export interface ExportETAResult {
    totalMs: number;
    breakdown: {
        prepare: number;
        convertStyles: number;
        globalSections: number;
        designs: number;
        finalize: number;
    };
}
/**
 * Calculate initial export ETA based on project structure
 * Called once at the start of export stage
 */
export declare function calculateExportETA(params: ExportETAParams): ExportETAResult;
/**
 * Track completed steps and calculate remaining time
 */
export interface ExportProgressState {
    startedAt: number;
    initialEstimateMs: number;
    breakdown: ExportETAResult['breakdown'];
    platform: 'webflow' | 'bricks' | 'elementor';
    completedSteps: Set<ExportStepId>;
    completedDesignIds: Set<string>;
    totalDesigns: number;
    designs: Array<{
        id: string;
        sectionCount: number;
    }>;
}
/**
 * Calculate remaining time based on what's completed
 * Called after each step completes to update the ETA
 */
export declare function calculateRemainingTime(state: ExportProgressState): number;
/**
 * Format milliseconds to human readable string
 */
export declare function formatETA(ms: number): string;
/**
 * Format to "~X-Y min" range for display
 * Shows a 2-minute range for better accuracy expectations
 */
export declare function formatETAApprox(ms: number): string;
//# sourceMappingURL=export-eta.d.ts.map