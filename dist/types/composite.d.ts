/**
 * Composite graphic element (AI-identified multi-element group)
 */
export interface CompositeGraphic {
    elementNames: string[];
    semanticCompositeName: string;
    type: string;
    alt: string;
    parentElementId?: string;
    validationReason?: string;
}
/**
 * Result of composite analysis (AI identification of multi-element graphics)
 */
export interface CompositeAnalysisResult {
    validComposites: CompositeGraphic[];
    nodeIds: string[];
    totalAnalyzed: number;
    totalPassed: number;
    hierarchyText: string;
}
/**
 * Composite screenshot sent from plugin to backend
 * Contains screenshot + metadata for a composite graphic
 */
export interface CompositeScreenshot {
    data: string;
    label: number;
    name: string;
    type: string;
    alt: string;
    nodeIds: string[];
    ancestorNodeId: string;
}
//# sourceMappingURL=composite.d.ts.map