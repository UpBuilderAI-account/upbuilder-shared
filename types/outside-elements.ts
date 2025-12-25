// ============================================================================
// OUTSIDE ELEMENTS DETECTION TYPES
// Types for elements detected outside frame boundaries
// ============================================================================

/**
 * An element detected as mostly outside its parent frame
 */
export interface OutsideElementDetection {
  nodeId: string;
  nodeName: string;
  parentFrameId: string;
  parentFrameName: string;
  percentageOutside: number;  // 90-100%
  bounds: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
  thumbnailUrl?: string;      // base64 small preview
  isIncluded: boolean;        // default false - exclude by default
}

/**
 * Data sent when outside elements are detected
 */
export interface OutsideElementsDetectedData {
  detections: OutsideElementDetection[];
  totalFrames: number;
}

/**
 * Full preview data for outside element
 */
export interface OutsidePreviewData {
  nodeId: string;
  nodeName: string;
  imageData: string;  // base64
  width: number;
  height: number;
}
