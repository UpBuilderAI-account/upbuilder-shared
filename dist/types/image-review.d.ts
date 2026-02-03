/**
 * Category of detected graphic
 */
export type GraphicCategory = 'icon' | 'illustration' | 'logo' | 'photo' | 'decorative' | 'complex';
/**
 * Confidence level for AI detection
 * - high: Auto-checked, very likely a graphic
 * - medium: Needs review, possibly a graphic
 * - low: Needs review, likely structural but worth flagging
 */
export type DetectionConfidence = 'high' | 'medium' | 'low';
/**
 * A single AI-detected potential graphic
 */
export interface DetectedGraphic {
    /** Figma node ID */
    nodeId: string;
    /** Node name from Figma */
    name: string;
    /** Category of graphic */
    category: GraphicCategory;
    /** Confidence level */
    confidence: DetectionConfidence;
    /** AI's reasoning for detection */
    reason: string;
    /** Thumbnail preview (base64) - added by plugin */
    thumbnailUrl?: string;
    /** Dimensions */
    width?: number;
    height?: number;
    /** For multi-node scattered groups: 3 tiers of possible compositions */
    groupVariants?: {
        high: string[];
        medium: string[];
        low: string[];
    };
}
/**
 * A node flagged as false positive by AI
 */
export interface FalsePositive {
    /** Figma node ID */
    nodeId: string;
    /** AI's reasoning for marking as false positive */
    reason: string;
}
/**
 * Input for image review request (per design)
 */
export interface ImageReviewDesignInput {
    designId: string;
    designName: string;
    /** Google Files URI of design screenshot (optional if base64 provided) */
    screenshotUri: string;
    /** Base64 encoded screenshot (backend will upload to Google Files) */
    screenshotBase64?: string;
    dimensions: {
        width: number;
        height: number;
    };
    /** Compact tree representation for AI */
    nodeTree: string;
    /** Node IDs already detected by heuristics */
    currentDetections: string[];
}
/**
 * Full image review request to backend
 */
export interface ImageReviewRequest {
    projectId: string;
    designs: ImageReviewDesignInput[];
}
/**
 * AI analysis result for a single design
 */
export interface ImageReviewDesignResult {
    designId: string;
    /** AI-detected potential graphics */
    suggestions: DetectedGraphic[];
    /** Nodes AI thinks are NOT graphics (override heuristics) */
    falsePositives: FalsePositive[];
}
/**
 * Full image review response from backend
 */
export interface ImageReviewResponse {
    success: boolean;
    designs: ImageReviewDesignResult[];
    error?: string;
    /** Pre-uploaded preview URLs from scan phase (keyed by designId) */
    uploadedPreviews?: Record<string, {
        s3Url: string;
        googleAiUri: string;
        dimensions: {
            width: number;
            height: number;
        };
    }>;
}
/**
 * Combined detection for UI display
 * Merges heuristic detections with AI suggestions
 */
export interface CombinedDetection {
    nodeId: string;
    name: string;
    /** Source of detection */
    source: 'heuristic' | 'ai' | 'grouped';
    /** Only for AI detections */
    category?: GraphicCategory;
    confidence?: DetectionConfidence;
    reason?: string;
    /** Whether item is checked for export */
    isChecked: boolean;
    /** Whether item needs review */
    needsReview: boolean;
    /** Thumbnail preview */
    thumbnailUrl?: string;
    width?: number;
    height?: number;
    /** Is this a false positive flagged by AI? */
    isFalsePositive?: boolean;
    falsePositiveReason?: string;
    /** Whether node has children (used for filtering) */
    hasChildren?: boolean;
    /** Number of visually identical graphics (1 = unique, from grouped graphics dedup) */
    duplicateCount?: number;
    /** All node IDs in this duplicate group (including self) */
    duplicateNodeIds?: string[];
    /** For scattered groups: 3-tier variants the user can pick from */
    groupVariants?: {
        high: string[];
        medium: string[];
        low: string[];
    };
    /** Which tier the user selected (default: 'high') */
    selectedTier?: 'high' | 'medium' | 'low';
}
/**
 * Image review state for a design in the UI
 */
export interface ImageReviewDesignState {
    designId: string;
    designName: string;
    /** All combined detections (heuristic + AI) */
    detections: CombinedDetection[];
    /** Count of auto-checked items (high confidence) */
    autoCheckedCount: number;
    /** Count of items needing review */
    reviewCount: number;
}
/**
 * Full image review state for UI
 */
export interface ImageReviewState {
    isLoading: boolean;
    isComplete: boolean;
    designs: ImageReviewDesignState[];
    error?: string;
}
//# sourceMappingURL=image-review.d.ts.map