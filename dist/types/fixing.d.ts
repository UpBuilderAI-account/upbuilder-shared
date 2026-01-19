/**
 * Fixing Stage Types
 * Uses rebuild-only approach (full structure replacement)
 *
 * NOTE: RebuildStructureNode and RebuildStyleDefinition are defined in
 * edit-operations.ts as they're used by the ReplaceSectionOp and
 * AddStyleObjectsBatchOp operation types.
 */
import type { RebuildStructureNode, RebuildStyleDefinition } from './edit-operations';
export interface FixingSection {
    id: string;
    name: string;
    nodeId: string;
    bounds: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    isGlobal: boolean;
    status: 'pending' | 'in_progress' | 'complete';
}
export interface FixingStartRequest {
    projectId: string;
    designId: string;
    sections: FixingSection[];
}
/** Design node from the editable tree */
export interface DesignNodeInput {
    id: string;
    type: string;
    tag?: string;
    classes: string[];
    text?: string;
    src?: string;
    alt?: string;
    parentId: string | null;
    childIds: string[];
}
/** Design style with CSS per breakpoint */
export interface DesignStyleInput {
    name: string;
    comb: '' | '&';
    chain?: string[];
    css: {
        main: string;
        medium?: string;
        tiny?: string;
    };
}
/** Request to rebuild a section */
export interface SectionRebuildRequest {
    projectId: string;
    designId: string;
    sectionId: string;
    sectionName: string;
    /** Section bounds for Figma data filtering */
    sectionBounds?: {
        x: number;
        y: number;
        width: number;
        height: number;
    };
    /** Whether this is a global section */
    isGlobal?: boolean;
    /** Full design structure from editable tree */
    designStructure: DesignNodeInput[];
    /** Full design styles with CSS per breakpoint */
    designStyles: DesignStyleInput[];
    /** Screenshots for comparison */
    figmaScreenshot: string;
    builtScreenshot: string;
}
/** Response from section rebuild */
export interface SectionRebuildResponse {
    projectId: string;
    designId: string;
    sectionId: string;
    /** AI's analysis of what was wrong */
    analysis: string;
    /** Full structure for this section (replace existing nodes) */
    structure: RebuildStructureNode[];
    /** Styles to edit or create */
    newStyles: RebuildStyleDefinition[];
    /** Validation result (optional) */
    validation?: {
        isValid: boolean;
        errors: string[];
        warnings: string[];
    };
}
//# sourceMappingURL=fixing.d.ts.map