/**
 * An element detected as mostly outside its parent frame
 */
export interface OutsideElementDetection {
    nodeId: string;
    nodeName: string;
    parentFrameId: string;
    parentFrameName: string;
    percentageOutside: number;
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    thumbnailUrl?: string;
    isIncluded: boolean;
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
    imageData: string;
    width: number;
    height: number;
}
//# sourceMappingURL=outside-elements.d.ts.map