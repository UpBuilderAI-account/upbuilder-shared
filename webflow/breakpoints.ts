// ============================================================================
// WEBFLOW BREAKPOINTS & STATES
// Single source of truth for all responsive breakpoints and pseudo-states
// Simplified: desktop > tablet > mobile only
// ============================================================================

// -----------------------------------------------------------------------------
// Breakpoint Definitions
// -----------------------------------------------------------------------------

export interface BreakpointDef {
  /** Internal Webflow key */
  key: string;
  /** Display name */
  name: string;
  /** CSS media query (null for desktop/main) */
  mediaQuery: string | null;
  /** Breakpoint width in pixels (null for desktop) */
  width: number | null;
  /** Direction: 'down' for max-width, 'base' for desktop */
  direction: 'down' | 'base';
  /** Order in cascade (lower = earlier in stylesheet) */
  order: number;
  /** Variant key used in Webflow styles */
  variantKey: string | null;
}

/**
 * All Webflow breakpoints in cascade order (simplified)
 *
 * Desktop is the BASE - no media query
 * Smaller screens cascade DOWN with max-width
 */
export const BREAKPOINTS: Record<string, BreakpointDef> = {
  // Desktop (BASE - no media query)
  desktop: {
    key: 'desktop',
    name: 'Desktop',
    mediaQuery: null,
    width: null,
    direction: 'base',
    order: 1,
    variantKey: null, // Uses styleLess directly
  },

  // Smaller breakpoints (cascade DOWN from Desktop - max-width)
  tablet: {
    key: 'tablet',
    name: 'Tablet',
    mediaQuery: '@media screen and (max-width: 991px)',
    width: 991,
    direction: 'down',
    order: 2,
    variantKey: 'medium',
  },
  mobile: {
    key: 'mobile',
    name: 'Mobile',
    mediaQuery: '@media screen and (max-width: 479px)',
    width: 479,
    direction: 'down',
    order: 3,
    variantKey: 'tiny',
  },
} as const;

// Type for breakpoint keys
export type BreakpointKey = keyof typeof BREAKPOINTS;

// Arrays for iteration
export const BREAKPOINT_KEYS: BreakpointKey[] = ['desktop', 'tablet', 'mobile'];
export const SMALLER_BREAKPOINTS: BreakpointKey[] = ['tablet', 'mobile'];
export const RESPONSIVE_BREAKPOINTS: BreakpointKey[] = ['tablet', 'mobile'];

// Webflow variant keys (for styles)
export const BREAKPOINT_VARIANT_KEYS = ['medium', 'tiny'] as const;
export type BreakpointVariantKey = typeof BREAKPOINT_VARIANT_KEYS[number];

// -----------------------------------------------------------------------------
// Pseudo-State Definitions
// -----------------------------------------------------------------------------

export interface StateDef {
  /** Internal Webflow key */
  key: string;
  /** Display name */
  name: string;
  /** CSS pseudo-selector */
  selector: string;
  /** Webflow variant suffix */
  variantSuffix: string;
  /** Order in which states are applied */
  order: number;
}

/**
 * All Webflow pseudo-states
 */
export const PSEUDO_STATES: Record<string, StateDef> = {
  none: {
    key: 'none',
    name: 'None',
    selector: '',
    variantSuffix: '',
    order: 0,
  },
  hover: {
    key: 'hover',
    name: 'Hover',
    selector: ':hover',
    variantSuffix: '_hover',
    order: 1,
  },
  pressed: {
    key: 'pressed',
    name: 'Pressed',
    selector: ':active',
    variantSuffix: '_pressed',
    order: 2,
  },
  focused: {
    key: 'focused',
    name: 'Focused',
    selector: ':focus',
    variantSuffix: '_focus',
    order: 3,
  },
  focusVisible: {
    key: 'focusVisible',
    name: 'Focus Visible',
    selector: ':focus-visible',
    variantSuffix: '_focusVisible',
    order: 4,
  },
  visited: {
    key: 'visited',
    name: 'Visited',
    selector: ':visited',
    variantSuffix: '_visited',
    order: 5,
  },
  current: {
    key: 'current',
    name: 'Current',
    selector: '.w--current', // Webflow's current class
    variantSuffix: '_current',
    order: 6,
  },
  placeholder: {
    key: 'placeholder',
    name: 'Placeholder',
    selector: '::placeholder',
    variantSuffix: '_placeholder',
    order: 7,
  },
  checked: {
    key: 'checked',
    name: 'Checked',
    selector: ':checked',
    variantSuffix: '_checked',
    order: 8,
  },
  disabled: {
    key: 'disabled',
    name: 'Disabled',
    selector: ':disabled',
    variantSuffix: '_disabled',
    order: 9,
  },
} as const;

// Type for state keys
export type StateKey = keyof typeof PSEUDO_STATES;

// Arrays for iteration
export const STATE_KEYS: StateKey[] = ['none', 'hover', 'pressed', 'focused', 'focusVisible', 'visited', 'current', 'placeholder', 'checked', 'disabled'];
export const INTERACTIVE_STATES: StateKey[] = ['hover', 'pressed', 'focused', 'focusVisible'];
export const FORM_STATES: StateKey[] = ['placeholder', 'checked', 'disabled'];
export const LINK_STATES: StateKey[] = ['hover', 'pressed', 'visited', 'current'];

// Webflow state variant suffixes
export const STATE_VARIANT_SUFFIXES = ['_hover', '_pressed', '_focus', '_focusVisible', '_visited', '_current', '_placeholder', '_checked', '_disabled'] as const;
export type StateVariantSuffix = typeof STATE_VARIANT_SUFFIXES[number];

// -----------------------------------------------------------------------------
// Combined Variant Keys
// -----------------------------------------------------------------------------

/**
 * All possible Webflow style variant keys
 * Format: breakpoint OR breakpoint_state OR main_state
 */
export type WebflowStyleVariantKey =
  // Breakpoint only (desktop uses styleLess, not a variant)
  | 'medium' | 'tiny'
  // Desktop states (main_*)
  | 'main_hover' | 'main_pressed' | 'main_focus' | 'main_focusVisible'
  | 'main_visited' | 'main_current' | 'main_placeholder' | 'main_checked' | 'main_disabled'
  // Smaller breakpoint states
  | 'medium_hover' | 'medium_pressed' | 'medium_focus' | 'medium_focusVisible'
  | 'tiny_hover' | 'tiny_pressed' | 'tiny_focus' | 'tiny_focusVisible';

// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------

/** Get breakpoint definition */
export function getBreakpoint(key: BreakpointKey): BreakpointDef {
  return BREAKPOINTS[key];
}

/** Get state definition */
export function getState(key: StateKey): StateDef {
  return PSEUDO_STATES[key];
}

/** Convert our breakpoint key to Webflow variant key */
export function breakpointToVariantKey(breakpoint: BreakpointKey): BreakpointVariantKey | null {
  const bp = BREAKPOINTS[breakpoint];
  return bp?.variantKey as BreakpointVariantKey | null;
}

/** Convert our state key to Webflow variant suffix */
export function stateToVariantSuffix(state: StateKey): string {
  const s = PSEUDO_STATES[state];
  return s?.variantSuffix || '';
}

/**
 * Get the Webflow variant key for a breakpoint + state combination
 * Returns 'main' for desktop+none (which means use styleLess directly, not a variant)
 */
export function getVariantKey(breakpoint: BreakpointKey, state: StateKey): string {
  const bpKey = breakpointToVariantKey(breakpoint);
  const stSuffix = stateToVariantSuffix(state);

  // Desktop + none = main styleLess (not a variant)
  if (bpKey === null && stSuffix === '') {
    return 'main';
  }

  // Desktop + state = main_state
  if (bpKey === null) {
    return `main${stSuffix}`;
  }

  // Breakpoint + none = just breakpoint
  if (stSuffix === '') {
    return bpKey;
  }

  // Breakpoint + state = breakpoint_state
  return `${bpKey}${stSuffix}`;
}

/** Check if a breakpoint uses max-width (smaller screens) */
export function isSmallerBreakpoint(breakpoint: BreakpointKey): boolean {
  return BREAKPOINTS[breakpoint]?.direction === 'down';
}

/** Get breakpoints sorted by cascade order */
export function getBreakpointsCascadeOrder(): BreakpointKey[] {
  return [...BREAKPOINT_KEYS].sort((a, b) => BREAKPOINTS[a].order - BREAKPOINTS[b].order);
}

/** Get media query for breakpoint */
export function getMediaQuery(breakpoint: BreakpointKey): string | null {
  return BREAKPOINTS[breakpoint]?.mediaQuery || null;
}

// -----------------------------------------------------------------------------
// Style Registry Format Helpers
// These help generate the correct format for AI prompts
// -----------------------------------------------------------------------------

/**
 * Style registry field names used in prompts
 * Maps to styleLess (desktop) and variants (responsive)
 */
export const STYLE_REGISTRY_FIELDS = {
  // Desktop (no breakpoint)
  main: 'main',
  // Smaller breakpoints (max-width)
  medium: 'medium',  // ≤991px (tablet)
  tiny: 'tiny',      // ≤479px (mobile)
  // Desktop states
  hover: 'hover',
  focus: 'focus',
  pressed: 'pressed',
  disabled: 'disabled',
  checked: 'checked',
  current: 'current',
  visited: 'visited',
  placeholder: 'placeholder',
  focusVisible: 'focusVisible',
} as const;

/** Generate prompt documentation for breakpoints */
export function generateBreakpointDocsForPrompt(): string {
  return `## Responsive Breakpoints

| Field | Media Query | Direction | Description |
|-------|-------------|-----------|-------------|
| main | (none) | Base | Desktop styles (default) |
| medium | max-width: 991px | DOWN | Tablet (≤991px) |
| tiny | max-width: 479px | DOWN | Mobile (≤479px) |

**Cascade Rules:**
- \`main\` (Desktop) is the BASE - always required
- Smaller breakpoints (medium, tiny) cascade DOWN from Desktop
- Only include breakpoint fields when styles DIFFER from the base`;
}

/** Generate prompt documentation for states */
export function generateStateDocsForPrompt(): string {
  return `## Pseudo-States

| Field | CSS Selector | Description |
|-------|--------------|-------------|
| hover | :hover | Mouse hover state |
| focus | :focus | Focused state |
| active/pressed | :active | Pressed/active state |
| disabled | :disabled | Disabled form elements |
| checked | :checked | Checked checkboxes/radios |
| current | .w--current | Current nav item |
| visited | :visited | Visited links |
| placeholder | ::placeholder | Input placeholder text |
| focusVisible | :focus-visible | Focus visible (keyboard) |

**State Rules:**
- Only include state fields when element has interactive styles
- hover/focus/active are most common for buttons and links
- checked/disabled are for form elements`;
}

// -----------------------------------------------------------------------------
// Pre-built Documentation Constants for Prompts
// -----------------------------------------------------------------------------

/** Pre-built breakpoint documentation for prompts */
export const BREAKPOINT_DOCS = generateBreakpointDocsForPrompt();

/** Pre-built state documentation for prompts */
export const STATE_DOCS = generateStateDocsForPrompt();

/**
 * Style registry format documentation for prompts
 * Includes both breakpoints and example format
 */
export const STYLE_REGISTRY_FORMAT_DOCS = `## Style Registry Format

Each style entry uses this format:

\`\`\`
- id: "[CSS Selector]"
  comb: "" | "&"
  main: "[desktop CSS properties]"
  medium: "[≤991px properties]"    # optional (tablet)
  tiny: "[≤478px properties]"      # optional (mobile)
  hover: "[hover state]"           # optional
  focus: "[focus state]"           # optional
\`\`\`

### Field Definitions

| Field | Required | Description |
|-------|----------|-------------|
| id | YES | CSS selector (e.g., ".button", ".button.is-primary") |
| comb | YES | "" for base class, "&" for combo modifier |
| main | YES | Desktop styles (BASE) |
| medium | NO | Tablet (≤991px, max-width) |
| tiny | NO | Mobile (≤479px, max-width) |
| hover | NO | Hover state styles |
| focus | NO | Focus state styles |

### Combo Classes

- \`comb: ""\` = standalone class (e.g., \`.button\`)
- \`comb: "&"\` = combo modifier that requires base class (e.g., \`.button.is-primary\`)
`;

/** Desktop-only mode warning for prompts */
export const DESKTOP_ONLY_WARNING = `**DESKTOP ONLY MODE**
- Do NOT include \`medium\` or \`tiny\` fields
- Only generate \`main\` (desktop) styles`;
