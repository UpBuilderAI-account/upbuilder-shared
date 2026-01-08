/**
 * EDITABLE TREE TYPES
 * Safe format for frontend customizer - no Webflow internals exposed
 */
/**
 * Single node in the editable tree
 * Contains only safe data - no Webflow internal IDs
 */
export interface EditableNode {
    /** Internal ID (NOT Webflow's _id) - format: "node-{index}" */
    id: string;
    /** HTML tag name (div, section, img, etc.) */
    tag: string;
    /** Display name for UI (e.g., "div.hero-section" or "Hero Image") */
    displayName: string;
    /** Class names applied to this node */
    classes: string[];
    /** Text content if this is a text element */
    textContent?: string;
    /** Image info if this is an img element */
    image?: {
        alt: string;
        /** Blurred placeholder data URL - NOT actual image URL */
        placeholder?: string;
    };
    /** Link info if this is an anchor element */
    link?: {
        text: string;
        type: 'external' | 'page' | 'section' | 'email' | 'phone';
    };
    /** Child node IDs in order */
    children: string[];
    /** Parent node ID (null for root nodes) */
    parentId: string | null;
    /** Nesting depth (0 for root) */
    depth: number;
    /** Whether this node can be edited */
    editable: boolean;
}
/** CSS property categories for UI grouping */
export type PropertyCategory = 'layout' | 'spacing' | 'size' | 'typography' | 'background' | 'border' | 'effects' | 'position' | 'other';
/**
 * Single CSS property in human-readable format
 */
export interface EditableProperty {
    /** CSS property name (e.g., "display", "padding-top") */
    name: string;
    /** CSS property value (e.g., "flex", "20px") */
    value: string;
    /** Category for grouping in UI */
    category: PropertyCategory;
}
/**
 * Single class/style definition
 */
export interface EditableClass {
    /** Internal ID - format: "class-{index}" */
    id: string;
    /** Class name as displayed in Webflow (e.g., "hero-section") */
    name: string;
    /** Whether this is a combo class (e.g., "button is-primary") */
    isCombo: boolean;
    /** Base class name if this is a combo class */
    baseClassName?: string;
    /** Desktop properties */
    properties: EditableProperty[];
    /** Responsive variant properties */
    variants: {
        tablet?: EditableProperty[];
        mobileLandscape?: EditableProperty[];
        mobile?: EditableProperty[];
    };
    /** Number of nodes using this class */
    usageCount: number;
}
/**
 * Single design in editable format
 */
export interface EditableDesign {
    /** Design ID */
    id: string;
    /** Design name */
    name: string;
    /** All nodes as flat map for O(1) lookup */
    nodes: Record<string, EditableNode>;
    /** Root node IDs (top-level elements in body) */
    rootIds: string[];
    /** All classes/styles in this design */
    classes: Record<string, EditableClass>;
    /** Statistics for UI display */
    stats: {
        nodeCount: number;
        classCount: number;
        imageCount: number;
        linkCount: number;
    };
}
/**
 * Custom font info
 */
export interface EditableFontInfo {
    family: string;
    weights: string[];
    styles: string[];
}
/**
 * Full payload sent from backend to frontend
 */
export interface EditableTreePayload {
    /** Project ID */
    projectId: string;
    /** All designs in editable format */
    designs: EditableDesign[];
    /** Global classes shared across all designs */
    globalClasses: Record<string, EditableClass>;
    /** Custom fonts that need manual setup */
    customFonts: EditableFontInfo[];
    /** Whether project has global JavaScript */
    hasGlobalScripts: boolean;
    /** Version for conflict detection */
    version: string;
}
/**
 * Request tree data
 */
export interface RequestTreePayload {
    projectId: string;
    /** Optional: specific design ID, otherwise all designs */
    designId?: string;
}
/**
 * Tree data response
 */
export interface TreeDataResponse {
    success: boolean;
    data?: EditableTreePayload;
    error?: string;
}
/**
 * Maps between internal IDs and Webflow IDs
 * Stored in project state, never exposed to frontend
 */
export interface IdMapping {
    /** Internal node ID → Webflow _id */
    nodeIdToWebflow: Record<string, string>;
    /** Webflow _id → Internal node ID */
    webflowToNodeId: Record<string, string>;
    /** Class name → Webflow style _id */
    classNameToWebflowId: Record<string, string>;
    /** Webflow style _id → Class name */
    webflowIdToClassName: Record<string, string>;
    /** Version this mapping was created for */
    version: string;
}
//# sourceMappingURL=editable-tree.d.ts.map