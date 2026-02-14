/**
 * EDITABLE TREE TYPES
 * Safe format for frontend customizer - no Webflow internals exposed
 */

// ============================================================================
// BREAKPOINTS - Simplified cascade from Desktop
// ============================================================================

/**
 * All supported breakpoints (simplified: desktop > tablet > mobile)
 * Desktop is the base - styles cascade DOWN only (max-width)
 */
export type Breakpoint =
  | 'desktop'         // Base (no media query)
  | 'tablet'          // ≤991px (max-width: 991px) - cascades DOWN from desktop
  | 'mobile';         // ≤478px (max-width: 478px) - cascades DOWN from tablet

/**
 * Breakpoint configuration metadata
 */
export interface BreakpointConfig {
  label: string;
  query: string | null;
  width: number | null;
  cascadeDirection: 'down' | 'none';
  cascadeSource: Breakpoint | null;
}

/**
 * All breakpoint configurations
 */
export const BREAKPOINT_CONFIG: Record<Breakpoint, BreakpointConfig> = {
  desktop: {
    label: 'Desktop',
    query: null,
    width: null,
    cascadeDirection: 'none',
    cascadeSource: null,
  },
  tablet: {
    label: 'Tablet',
    query: '@media (max-width: 991px)',
    width: 991,
    cascadeDirection: 'down',
    cascadeSource: 'desktop',
  },
  mobile: {
    label: 'Mobile',
    query: '@media (max-width: 478px)',
    width: 478,
    cascadeDirection: 'down',
    cascadeSource: 'tablet',
  },
};

/**
 * Breakpoints in cascade order (larger to smaller)
 */
export const BREAKPOINT_CASCADE_ORDER: Breakpoint[] = [
  'desktop', 'tablet', 'mobile'
];

// ============================================================================
// PSEUDO-STATES - CSS interaction states
// ============================================================================

/**
 * All supported pseudo-states
 * Pressed inherits from Hover, all others inherit from None
 */
export type PseudoState =
  | 'none'            // Default state
  | 'hover'           // :hover
  | 'pressed'         // :active (inherits from hover!)
  | 'focused'         // :focus
  | 'focusVisible'    // :focus-visible
  | 'visited'         // :visited (links only)
  | 'current'         // .w--current (Webflow current page)
  | 'placeholder'     // ::placeholder (inputs only)
  | 'checked'         // :checked (checkboxes/radios)
  | 'disabled';       // :disabled

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
export const STATE_CONFIG: Record<PseudoState, StateConfig> = {
  none: {
    label: 'None',
    cssSelector: '',
    inheritsFrom: 'none',
    applicableTo: 'all',
  },
  hover: {
    label: 'Hover',
    cssSelector: ':hover',
    inheritsFrom: 'none',
    applicableTo: 'all',
  },
  pressed: {
    label: 'Pressed',
    cssSelector: ':active',
    inheritsFrom: 'hover', // KEY: Pressed inherits from Hover!
    applicableTo: 'all',
  },
  focused: {
    label: 'Focused',
    cssSelector: ':focus',
    inheritsFrom: 'none',
    applicableTo: 'all',
  },
  focusVisible: {
    label: 'Focus (keyboard)',
    cssSelector: ':focus-visible',
    inheritsFrom: 'none',
    applicableTo: 'all',
  },
  visited: {
    label: 'Visited',
    cssSelector: ':visited',
    inheritsFrom: 'none',
    applicableTo: 'links',
  },
  current: {
    label: 'Current',
    cssSelector: '.w--current',
    inheritsFrom: 'none',
    applicableTo: 'links',
  },
  placeholder: {
    label: 'Placeholder',
    cssSelector: '::placeholder',
    inheritsFrom: 'none',
    applicableTo: 'inputs',
  },
  checked: {
    label: 'Checked',
    cssSelector: ':checked',
    inheritsFrom: 'none',
    applicableTo: 'checkables',
  },
  disabled: {
    label: 'Disabled',
    cssSelector: ':disabled',
    inheritsFrom: 'none',
    applicableTo: 'inputs',
  },
};

/**
 * States in display order
 */
export const STATE_DISPLAY_ORDER: PseudoState[] = [
  'none', 'hover', 'pressed', 'focused', 'focusVisible',
  'visited', 'current', 'placeholder', 'checked', 'disabled'
];

// ============================================================================
// PROPERTY SOURCE TRACKING - Know where each property comes from
// ============================================================================

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

// ============================================================================
// INHERITANCE CHAIN - Navigate to source classes
// ============================================================================

/**
 * An item in the inheritance chain (for "Inheriting X selectors" menu)
 * Webflow shows: Body → All Tags → Base Class → Combo Stack levels
 */
export interface InheritanceChainItem {
  /** Type of selector */
  type: 'class' | 'combo' | 'tag' | 'body';

  /** Display name */
  displayName: string;

  /** Actual class name (for single classes) */
  className?: string;

  /** Full class stack for combo selectors (e.g., ['button', 'is-primary']) */
  classStack?: string[];

  /** Compound CSS selector (e.g., ".button.is-primary") */
  compoundSelector?: string;

  /** HTML tag name (for tags) */
  tagName?: string;

  /** Properties defined on this selector */
  definedProperties: string[];

  /** Number of properties on this selector */
  propertyCount: number;

  /** Number of elements using this selector */
  usageCount: number;

  /** Element IDs for highlighting */
  elementIds?: string[];
}

// ============================================================================
// COMPOUND SELECTOR UTILITIES
// ============================================================================

/**
 * Generate compound CSS selector from class stack
 * e.g., ['button', 'is-primary'] → '.button.is-primary'
 */
export function getCompoundSelector(classStack: string[]): string {
  if (!classStack || classStack.length === 0) return '';
  return '.' + classStack.join('.');
}

/**
 * Parse compound selector back to class stack
 * e.g., '.button.is-primary' → ['button', 'is-primary']
 */
export function parseCompoundSelector(selector: string): string[] {
  if (!selector) return [];
  // Remove leading dot and split
  return selector.replace(/^\./, '').split('.');
}

/**
 * Check if a selector is a compound (has multiple classes)
 */
export function isCompoundSelector(selector: string): boolean {
  const parts = parseCompoundSelector(selector);
  return parts.length > 1;
}

// ============================================================================
// AFFECTED ELEMENTS - Show impact of edits
// ============================================================================

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

// ============================================================================
// NODE TYPES
// ============================================================================

/**
 * Single node in the editable tree
 * Contains only safe data - no Webflow internal IDs
 */
export interface EditableNode {
  /** Internal ID (NOT Webflow's _id) - format: "node-{index}" */
  id: string;

  /** HTML tag name (div, section, img, etc.) */
  tag: string;

  /** Webflow component type (Block, Section, NavbarWrapper, FormTextInput, etc.) */
  componentType?: string;

  /** Display name for UI (e.g., "div.hero-section" or "Hero Image") */
  displayName: string;

  /** Class names applied to this node */
  classes: string[];

  /** Text content if this is a text element */
  textContent?: string;

  /** Image info if this is an img element */
  image?: {
    /** Image source URL */
    src?: string;
    /** Alt text for accessibility */
    alt: string;
    /** Object fit */
    objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
    /** Object position */
    objectPosition?: string;
    /** Blurred placeholder data URL */
    placeholder?: string;
  };

  /** Link info if this is an anchor element */
  link?: {
    /** Link text content */
    text: string;
    /** Link URL/href */
    href?: string;
    /** Link target (_blank, _self, etc.) */
    target?: '_blank' | '_self' | '_parent' | '_top';
    /** Link type */
    type: 'external' | 'page' | 'section' | 'email' | 'phone';
  };

  /** Form input properties */
  formProps?: {
    /** Input type (text, email, password, submit, etc.) */
    type?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Whether input is required */
    required?: boolean;
    /** Input name attribute */
    name?: string;
    /** Button value text (for type="submit") */
    value?: string;
  };

  /** Video properties */
  videoProps?: {
    /** Video source URL */
    src?: string;
    /** Whether video autoplays */
    autoplay?: boolean;
    /** Whether video loops */
    loop?: boolean;
    /** Whether video is muted */
    muted?: boolean;
    /** Whether to show controls */
    controls?: boolean;
    /** Poster image URL */
    poster?: string;
  };

  /** Data attributes (e.g., data-collapse, data-animation for navbar) */
  attributes?: Record<string, string>;

  /** Child node IDs in order */
  children: string[];

  /** Parent node ID (null for root nodes) */
  parentId: string | null;

  /** Nesting depth (0 for root) */
  depth: number;

  /** Whether this node can be edited */
  editable: boolean;

  /** Global section indicator (if this element is part of a global section) */
  global?: {
    name: string;      // e.g., "Navbar"
    variant: string;   // e.g., "navbar_default"
  };
}

// ============================================================================
// CLASS/STYLE TYPES
// ============================================================================

/** CSS property categories for UI grouping */
export type PropertyCategory =
  | 'layout'
  | 'spacing'
  | 'size'
  | 'typography'
  | 'background'
  | 'border'
  | 'effects'
  | 'position'
  | 'other';

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
 *
 * For compound selectors (Webflow combo classes):
 * - name: "button.is-primary" (the full compound selector without leading dot)
 * - isCombo: true
 * - baseClassName: "button"
 * - classStack: ["button", "is-primary"]
 */
export interface EditableClass {
  /** Internal ID - format: "class-{index}" */
  id: string;

  /**
   * Class name as displayed/stored
   * For single classes: "hero-section"
   * For compound selectors: "button.is-primary" (no leading dot)
   */
  name: string;

  /** Whether this is a combo class (compound selector with multiple classes) */
  isCombo: boolean;

  /** Base class name if this is a combo class */
  baseClassName?: string;

  /**
   * Full class stack for compound selectors
   * e.g., ["text-size-regular", "text-weight-semibold", "text-color-primary"]
   */
  classStack?: string[];

  /**
   * Parent compound selector (for chain navigation)
   * e.g., for "a.b.c", parent is "a.b"
   */
  parentCompound?: string;

  /**
   * Child compound selectors that extend this one
   * e.g., for "a.b", children might be ["a.b.c", "a.b.d"]
   */
  childCompounds?: string[];

  /** Available combo classes that can follow this base */
  availableCombos?: string[];

  /**
   * Properties organized by breakpoint and state
   * Example: properties.desktop.none, properties.tablet.hover
   */
  properties: BreakpointStateProperties;

  /** Number of nodes using this exact class/compound */
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
    mobile?: EditableProperty[];
  };
  usageCount: number;
}

/**
 * Convert legacy class format to new format
 */
export function migrateEditableClass(legacy: EditableClassLegacy): EditableClass {
  const properties: BreakpointStateProperties = {};

  // Desktop properties → desktop.none
  if (legacy.properties?.length > 0) {
    properties.desktop = { none: legacy.properties };
  }

  // Variants → breakpoint.none
  if (legacy.variants?.tablet?.length) {
    properties.tablet = { none: legacy.variants.tablet };
  }
  if (legacy.variants?.mobile?.length) {
    properties.mobile = { none: legacy.variants.mobile };
  }

  return {
    id: legacy.id,
    name: legacy.name,
    isCombo: legacy.isCombo,
    baseClassName: legacy.baseClassName,
    properties,
    usageCount: legacy.usageCount,
  };
}

// ============================================================================
// DESIGN TYPES
// ============================================================================

/**
 * Design dimensions from original Figma frame
 */
export interface DesignDimensions {
  /** Original Figma frame width in pixels */
  width: number;
  /** Original Figma frame height in pixels */
  height: number;
  /** Padded width (width * 1.30) for breakpoint calculation */
  paddedWidth: number;
}

/**
 * Single design in editable format
 */
export interface EditableDesign {
  /** Design ID */
  id: string;

  /** Design name */
  name: string;

  /** Original Figma frame dimensions */
  dimensions?: DesignDimensions;

  /** Big preview image URL (full design screenshot) */
  bigPreviewUrl?: string;

  /** Big preview image dimensions */
  bigPreviewDimensions?: {
    width: number;
    height: number;
  };

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

// ============================================================================
// PAYLOAD TYPES (WebSocket)
// ============================================================================

/**
 * Custom font info
 */
export interface EditableFontInfo {
  family: string;
  weights: string[];
  styles: string[];
  source?: 'google' | 's3' | 'not_found';
  urls?: string[];
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
  size?: { width: number; height: number };
}

/**
 * Full payload sent from backend to frontend
 */
export interface EditableTreePayload {
  /** Project ID */
  projectId: string;

  /** All designs in editable format */
  designs: EditableDesign[];

  /**
   * @deprecated Use styleObjects from EditableTreePayloadV2 instead
   * Legacy global classes - kept for backward compatibility
   */
  globalClasses?: Record<string, EditableClass>;

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

// ============================================================================
// ID MAPPING (Backend only - never sent to frontend)
// ============================================================================

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

  /**
   * For global sections: variant → { structuralPath → nodeId }
   * Used to translate operations between designs sharing the same global section
   */
  globalSectionPaths?: Record<string, Record<string, string>>;
}

// ============================================================================
// WEBFLOW STYLE OBJECT MODEL (Correct Webflow format)
// ============================================================================

/**
 * CSS properties stored as a string per breakpoint+state
 * This matches Webflow's actual `styleLess` format
 * Example: "padding: 20px; color: #fff; display: flex;"
 */
export type StyleLessMap = {
  [K in Breakpoint]?: {
    [S in PseudoState]?: string;
  };
};

/**
 * Webflow-aligned style object
 * Each class (base or combo modifier) is a SEPARATE object with its own _id
 *
 * KEY DIFFERENCE FROM EditableClass:
 * - EditableClass uses compound keys like "button.is-primary"
 * - WebflowStyleObject uses separate objects with `comb` marker
 *
 * For combo chain [button, is-primary, is-large]:
 * - Object 1: { name: "button", comb: "", ... }
 * - Object 2: { name: "is-primary", comb: "&", ... }
 * - Object 3: { name: "is-large", comb: "&", ... }
 * - Object 1's children: [Object 2's _id]
 * - Object 2's children: [Object 3's _id]
 */
export interface WebflowStyleObject {
  /** Unique ID - deterministic hash based on chain position */
  _id: string;

  /**
   * Class name - just the single class, NOT compound
   * Base class: "button"
   * Modifier: "is-primary" (NOT "button.is-primary")
   */
  name: string;

  /**
   * Combo marker - matches Webflow's internal format
   * '' = base class (first in chain, or standalone)
   * '&' = modifier (requires preceding class in chain)
   */
  comb: '' | '&';

  /**
   * CSS properties per breakpoint and state
   * Uses styleLess string format: "prop1: val1; prop2: val2;"
   * Desktop + none is the base, others are overrides
   */
  styleLess: StyleLessMap;

  /**
   * IDs of style objects that can follow this one in a chain
   * For LINEAR chains: typically just one child
   * For branching: multiple children for different combo paths
   */
  children: string[];

  /**
   * Chain context - the full stack of class names leading to this style
   * Examples:
   * - Base "button": ["button"]
   * - Combo "button.is-primary": ["button", "is-primary"]
   * - Triple "button.is-primary.is-large": ["button", "is-primary", "is-large"]
   *
   * Used to generate CSS selectors: "." + chainContext.join(".")
   */
  chainContext: string[];

  /** Number of elements using this exact style chain */
  usageCount: number;

  /** Element IDs for highlighting in preview */
  elementIds?: string[];
}

/**
 * Index for O(1) lookup of style objects by chain signature
 * Key: chain signature using + delimiter (e.g., "button+is-primary")
 * Value: style object _id
 *
 * Usage:
 *   const sig = classStack.join('+');  // "button+is-primary"
 *   const styleId = chainIndex[sig];    // "abc123..."
 *   const style = styleObjects[styleId];
 */
export type ChainIndex = Record<string, string>;

/**
 * Get chain signature from class stack
 * Uses + delimiter to avoid confusion with CSS selectors (which use .)
 */
export function getChainSignature(classStack: string[]): string {
  return classStack.join('+');
}

/**
 * Parse chain signature back to class stack
 */
export function parseChainSignature(signature: string): string[] {
  return signature.split('+').filter(Boolean);
}

/**
 * Build CSS selector from chain context
 * ['button', 'is-primary'] → '.button.is-primary'
 */
export function buildSelectorFromChain(chainContext: string[]): string {
  if (!chainContext || chainContext.length === 0) return '';
  return '.' + chainContext.join('.');
}

/**
 * Parse CSS string to property map
 * "padding: 20px; color: #fff;" → Map { 'padding' => '20px', 'color' => '#fff' }
 */
export function parseStyleLess(styleLess: string): Map<string, string> {
  const map = new Map<string, string>();
  if (!styleLess) return map;

  styleLess.split(';').forEach(decl => {
    const colonIndex = decl.indexOf(':');
    if (colonIndex === -1) return;

    const prop = decl.slice(0, colonIndex).trim();
    const val = decl.slice(colonIndex + 1).trim();
    if (prop && val) {
      map.set(prop, val);
    }
  });

  return map;
}

/**
 * Convert property map to CSS string
 * Map { 'padding' => '20px', 'color' => '#fff' } → "padding: 20px; color: #fff"
 */
export function toStyleLess(props: Map<string, string>): string {
  return Array.from(props.entries())
    .map(([prop, val]) => `${prop}: ${val}`)
    .join('; ');
}

/**
 * Convert WebflowStyleObject's styleLess to EditableProperty array
 * For compatibility with existing UI components
 */
export function styleLessToProperties(
  styleLess: string,
  categorizer?: (prop: string) => PropertyCategory
): EditableProperty[] {
  const props = parseStyleLess(styleLess);
  const defaultCategory: PropertyCategory = 'other';

  return Array.from(props.entries()).map(([name, value]) => ({
    name,
    value,
    category: categorizer ? categorizer(name) : defaultCategory,
  }));
}

/**
 * Convert EditableProperty array to styleLess string
 * For compatibility with existing data
 */
export function propertiesToStyleLess(properties: EditableProperty[]): string {
  if (!properties || properties.length === 0) return '';
  return properties.map(p => `${p.name}: ${p.value}`).join('; ');
}

// ============================================================================
// EXTENDED PAYLOAD WITH WEBFLOW STYLE MODEL
// ============================================================================

/**
 * Extended payload that includes both legacy and new style formats
 * Backend sends both for gradual migration
 */
export interface EditableTreePayloadV2 extends EditableTreePayload {
  /**
   * NEW: Style objects indexed by _id
   * This is the Webflow-aligned format
   */
  styleObjects: Record<string, WebflowStyleObject>;

  /**
   * NEW: Index for O(1) chain → style ID lookups
   * Key: chain signature (e.g., "button+is-primary")
   * Value: style object _id
   */
  chainIndex: ChainIndex;

  /**
   * Initial breakpoint based on original Figma design dimensions
   * Calculated from design width + 15% padding on each side
   * Frontend uses this to set the default canvas/preview breakpoint
   */
  initialBreakpoint?: Breakpoint;

  /**
   * Font CSS for preview injection
   * Contains Google Fonts link tags and @font-face rules for S3 fonts
   * Frontend injects this into preview head as <style id="custom-fonts">
   */
  fontCss?: string;

  /**
   * Google Fonts URL for the link tag
   * Separate from fontCss for easier handling
   */
  googleFontsUrl?: string;

  /** Variable mapping data (from S3 variable-mapping.json) */
  variableMapping?: {
    collections: import('./element').FigmaVariableCollection[];
    variables: import('./element').FigmaColorVariable[];
    cssPropertyMap: Record<string, string>;
  } | null;

  /** CMS schema (from project state) */
  cmsSchema?: import('./cms').CMSSchema | null;

  /** Global section mappings for linked editing (cross-design path maps) */
  globalSectionMappings?: GlobalSectionMapping[];

  /** Custom CSS extracted from XSCP (Webflow-unsupported properties) */
  customCss?: string | null;

  /** Active units mode the XSCP was built with (px or rem) */
  activeUnits?: 'px' | 'rem';

  /**
   * Whether original XSCP backup exists for restore functionality
   * Merged into tree response to eliminate separate socket round-trip
   */
  hasOriginal?: boolean;
}

// ============================================================================
// GLOBAL SECTION TYPES (for linked editing like Webflow Symbols)
// ============================================================================

/**
 * Cross-design node mapping for a global section variant
 * Allows correlating the same "conceptual node" across different designs
 * despite having different internal IDs (node-5 in design A = node-23 in design B)
 */
export interface GlobalSectionMapping {
  /** Global section variant identifier, e.g., "navbar_default" */
  variant: string;
  /** Human-readable name, e.g., "Navbar" */
  name: string;
  /** Which designs have this variant */
  designIds: string[];
  /** Maps designId → rootNodeId for quick lookup */
  rootNodeIds: Record<string, string>;
  /**
   * Maps structuralPath → { designId → nodeId }
   * Path format: DFS child-index path, e.g., "", "0", "0/1", "0/1/2"
   * Root itself = ""
   */
  pathMap: Record<string, Record<string, string>>;
}
