/**
 * Reasons why a node was detected as needing vectorization
 */
export type ComplexityReason = 'hard_limit' | 'name_pattern' | 'scattered' | 'overlapping' | 'thin_lines' | 'low_opacity' | 'default_names' | 'very_deep' | 'deep' | 'complexity_score' | 'shape_composition';
/**
 * Confidence level for detection
 * - confident: Designer explicitly named/structured as graphic
 * - likely: Pattern-based detection, usually correct
 * - needs_review: No clear intent, user should verify
 */
export type ConfidenceLevel = 'confident' | 'likely' | 'needs_review';
/**
 * Get confidence level from detection reason
 */
export declare function getConfidenceFromReason(reason: ComplexityReason): ConfidenceLevel;
/**
 * Result from shouldTreatAsVector with reason
 */
export interface VectorizationResult {
    shouldVectorize: boolean;
    reason?: ComplexityReason;
    details?: string;
}
/**
 * A detected complex hierarchy that will be converted to an image
 */
export interface ComplexHierarchyDetection {
    nodeId: string;
    nodeName: string;
    parentName: string;
    reason: ComplexityReason;
    reasonText: string;
    confidence: ConfidenceLevel;
    level: number;
    descendantCount: number;
    bounds: {
        width: number;
        height: number;
    };
    thumbnailUrl?: string;
    isApproved: boolean;
    duplicateCount?: number;
    duplicateNodeIds?: string[];
}
/**
 * Get user-friendly display text for a complexity reason
 */
export declare function getReasonDisplayText(reason: ComplexityReason, details?: string): string;
//# sourceMappingURL=complex-hierarchy.d.ts.map