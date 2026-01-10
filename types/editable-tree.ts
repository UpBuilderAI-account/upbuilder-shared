/**
 * EDITABLE TREE TYPES
 * Safe format for frontend customizer - no Webflow internals exposed
 */

// ============================================================================
// BREAKPOINTS - Webflow's bidirectional cascade from Desktop
// ============================================================================

/**
 * All supported breakpoints
 * Desktop is the base - styles cascade UP (min-width) and DOWN (max-width)
 */
export type Breakpoint =
  | 'xxl'             // 1920px+ (min-width: 1920px) - cascades UP from xl
  | 'xl'              // 1440px+ (min-width: 1440px) - cascades UP from large
  | 'large'           // 1280px+ (min-width: 1280px) - cascades UP from desktop
  | 'desktop'         // Base (no media query)
  | 'tablet'          // ≤991px (max-width: 991px) - cascades DOWN from desktop
  | 'mobileLandscape' // ≤767px (max-width: 767px) - cascades DOWN from tablet
  | 'mobile';         // ≤478px (max-width: 478px) - cascades DOWN from mobileLandscape

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
export const BREAKPOINT_CONFIG: Record<Breakpoint, BreakpointConfig> = {
  xxl: {
    label: '1920px',
    query: '@media (min-width: 1920px)',
    width: 1920,
    cascadeDirection: 'up',
    cascadeSource: 'xl',
  },
  xl: {
    label: '1440px',
    query: '@media (min-width: 1440px)',
    width: 1440,
    cascadeDirection: 'up',
    cascadeSource: 'large',
  },
  large: {
    label: '1280px',
    query: '@media (min-width: 1280px)',
    width: 1280,
    cascadeDirection: 'up',
    cascadeSource: 'desktop',
  },
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
  mobileLandscape: {
    label: 'Landscape',
    query: '@media (max-width: 767px)',
    width: 767,
    cascadeDirection: 'down',
    cascadeSource: 'tablet',
  },
  mobile: {
    label: 'Mobile',
    query: '@media (max-width: 478px)',
    width: 478,
    cascadeDirection: 'down',
    cascadeSource: 'mobileLandscape',
  },
};

/**
 * Breakpoints in cascade order (larger to smaller)
 */
export const BREAKPOINT_CASCADE_ORDER: Breakpoint[] = [
  'xxl', 'xl', 'large', 'desktop', 'tablet', 'mobileLandscape', 'mobile'
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
    mobileLandscape?: EditableProperty[];
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
  if (legacy.variants?.mobileLandscape?.length) {
    properties.mobileLandscape = { none: legacy.variants.mobileLandscape };
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
}
