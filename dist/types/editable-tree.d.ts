/**
 * EDITABLE TREE TYPES
 * Safe format for frontend customizer - no Webflow internals exposed
 */
/**
 * All supported breakpoints
 * Desktop is the base - styles cascade UP (min-width) and DOWN (max-width)
 */
export type Breakpoint = 'xxl' | 'xl' | 'large' | 'desktop' | 'tablet' | 'mobileLandscape' | 'mobile';
/**
 * Breakpoint configuration metadata
 */
export interface BreakpointConfig {
    label: string;
    query: string | null;
    width: number | null;
    cascadeDirection: 'up' | 'down' | 'none';
    cascadeSource: Breakpoint | null;
}
/**
 * All breakpoint configurations
 */
export declare const BREAKPOINT_CONFIG: Record<Breakpoint, BreakpointConfig>;
/**
 * Breakpoints in cascade order (larger to smaller)
 */
export declare const BREAKPOINT_CASCADE_ORDER: Breakpoint[];
/**
 * All supported pseudo-states
 * Pressed inherits from Hover, all others inherit from None
 */
export type PseudoState = 'none' | 'hover' | 'pressed' | 'focused' | 'focusVisible' | 'visited' | 'current' | 'placeholder' | 'checked' | 'disabled';
/**
 * State configuration metadata
 */
export interface StateConfig {
    label: string;
    cssSelector: string;
    inheritsFrom: PseudoState;
    applicableTo: 'all' | 'links' | 'inputs' | 'checkables';
}
/**
 * All state configurations
 */
export declare const STATE_CONFIG: Record<PseudoState, StateConfig>;
/**
 * States in display order
 */
export declare const STATE_DISPLAY_ORDER: PseudoState[];
/**
 * Tracks where a computed property value originates
 */
export interface PropertySource {
    /** The class that defines this property */
    className: string;
    /** The breakpoint where it's defined */
    breakpoint: Breakpoint;
    /** The state where it's defined */
    state: PseudoState;
    /** Is this inherited from an earlier class in the stack? */
    isInheritedFromClass: boolean;
    /** Is this inherited from a larger/smaller breakpoint? */
    isInheritedFromBreakpoint: boolean;
    /** Is this inherited from a parent state (e.g., pressed from hover)? */
    isInheritedFromState: boolean;
    /** Is this value being overridden by a later class in the stack? */
    isOverridden: boolean;
    /** Original value if overridden */
    originalValue?: string;
}
/**
 * A computed property with full source tracking
 */
export interface ComputedPropertyFull {
    /** CSS property name */
    name: string;
    /** Current computed value */
    value: string;
    /** Property category for UI grouping */
    category: PropertyCategory;
    /** Where this value comes from */
    source: PropertySource;
}
/**
 * An item in the inheritance chain (for "Inheriting X selectors" menu)
 */
export interface InheritanceChainItem {
    /** Type of selector */
    type: 'class' | 'combo' | 'tag' | 'body';
    /** Display name */
    displayName: string;
    /** Actual class name (for classes) */
    className?: string;
    /** HTML tag name (for tags) */
    tagName?: string;
    /** Properties defined on this selector */
    definedProperties: string[];
    /** Number of elements using this selector */
    usageCount: number;
}
/**
 * Information about elements affected by editing a class
 */
export interface AffectedElementsInfo {
    /** Elements on current page/design */
    onThisPage: number;
    /** Elements on other pages/designs */
    onOtherPages: number;
    /** Total across site */
    total: number;
    /** Element IDs (for highlighting in preview) */
    elementIds: string[];
}
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
 * Properties organized by breakpoint and state
 * Structure: { desktop: { none: [...], hover: [...] }, tablet: { none: [...] } }
 */
export type BreakpointStateProperties = {
    [K in Breakpoint]?: {
        [S in PseudoState]?: EditableProperty[];
    };
};
/**
 * Single class/style definition - FULL version with all breakpoints and states
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
    /** Available combo classes that can follow this base */
    availableCombos?: string[];
    /**
     * Properties organized by breakpoint and state
     * Example: properties.desktop.none, properties.tablet.hover
     */
    properties: BreakpointStateProperties;
    /** Number of nodes using this class */
    usageCount: number;
    /** IDs of elements using this class (for highlighting) */
    elementIds?: string[];
}
/**
 * LEGACY: Old EditableClass format for backwards compatibility
 * @deprecated Use EditableClass with BreakpointStateProperties
 */
export interface EditableClassLegacy {
    id: string;
    name: string;
    isCombo: boolean;
    baseClassName?: string;
    /** Desktop properties only */
    properties: EditableProperty[];
    /** Responsive variants (no state support) */
    variants: {
        tablet?: EditableProperty[];
        mobileLandscape?: EditableProperty[];
        mobile?: EditableProperty[];
    };
    usageCount: number;
}
/**
 * Convert legacy class format to new format
 */
export declare function migrateEditableClass(legacy: EditableClassLegacy): EditableClass;
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
 * Asset info (images, etc.)
 */
export interface EditableAsset {
    /** Unique ID */
    id: string;
    /** File name */
    name: string;
    /** URL (S3 or relative path) */
    url: string;
    /** Asset type */
    type: 'image' | 'video' | 'other';
    /** Dimensions if known */
    size?: {
        width: number;
        height: number;
    };
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
    /** Assets (images, etc.) */
    assets: EditableAsset[];
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