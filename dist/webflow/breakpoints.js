"use strict";
// ============================================================================
// WEBFLOW BREAKPOINTS & STATES
// Single source of truth for all responsive breakpoints and pseudo-states
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.DESKTOP_ONLY_WARNING = exports.STYLE_REGISTRY_FORMAT_DOCS = exports.STATE_DOCS = exports.BREAKPOINT_DOCS = exports.STYLE_REGISTRY_FIELDS = exports.STATE_VARIANT_SUFFIXES = exports.LINK_STATES = exports.FORM_STATES = exports.INTERACTIVE_STATES = exports.STATE_KEYS = exports.PSEUDO_STATES = exports.BREAKPOINT_VARIANT_KEYS = exports.RESPONSIVE_BREAKPOINTS = exports.SMALLER_BREAKPOINTS = exports.LARGER_BREAKPOINTS = exports.BREAKPOINT_KEYS = exports.BREAKPOINTS = void 0;
exports.getBreakpoint = getBreakpoint;
exports.getState = getState;
exports.breakpointToVariantKey = breakpointToVariantKey;
exports.stateToVariantSuffix = stateToVariantSuffix;
exports.getVariantKey = getVariantKey;
exports.isLargerBreakpoint = isLargerBreakpoint;
exports.isSmallerBreakpoint = isSmallerBreakpoint;
exports.getBreakpointsCascadeOrder = getBreakpointsCascadeOrder;
exports.getMediaQuery = getMediaQuery;
exports.generateBreakpointDocsForPrompt = generateBreakpointDocsForPrompt;
exports.generateStateDocsForPrompt = generateStateDocsForPrompt;
/**
 * All Webflow breakpoints in cascade order
 *
 * Webflow uses a hybrid cascade:
 * - Desktop (main) is the BASE - no media query
 * - Larger screens cascade UP with min-width
 * - Smaller screens cascade DOWN with max-width
 */
exports.BREAKPOINTS = {
    // Larger breakpoints (cascade UP from Desktop - min-width)
    xxl: {
        key: 'xxl',
        name: '1920+',
        mediaQuery: '@media screen and (min-width: 1920px)',
        width: 1920,
        direction: 'up',
        order: 1,
        variantKey: 'xxl',
    },
    xl: {
        key: 'xl',
        name: '1440+',
        mediaQuery: '@media screen and (min-width: 1440px)',
        width: 1440,
        direction: 'up',
        order: 2,
        variantKey: 'xl',
    },
    large: {
        key: 'large',
        name: '1280+',
        mediaQuery: '@media screen and (min-width: 1280px)',
        width: 1280,
        direction: 'up',
        order: 3,
        variantKey: 'large',
    },
    // Desktop (BASE - no media query)
    desktop: {
        key: 'desktop',
        name: 'Desktop',
        mediaQuery: null,
        width: null,
        direction: 'base',
        order: 4,
        variantKey: null, // Uses styleLess directly
    },
    // Smaller breakpoints (cascade DOWN from Desktop - max-width)
    tablet: {
        key: 'tablet',
        name: 'Tablet',
        mediaQuery: '@media screen and (max-width: 991px)',
        width: 991,
        direction: 'down',
        order: 5,
        variantKey: 'medium',
    },
    mobileLandscape: {
        key: 'mobileLandscape',
        name: 'Mobile Landscape',
        mediaQuery: '@media screen and (max-width: 767px)',
        width: 767,
        direction: 'down',
        order: 6,
        variantKey: 'small',
    },
    mobile: {
        key: 'mobile',
        name: 'Mobile Portrait',
        mediaQuery: '@media screen and (max-width: 478px)',
        width: 478,
        direction: 'down',
        order: 7,
        variantKey: 'tiny',
    },
};
// Arrays for iteration
exports.BREAKPOINT_KEYS = ['xxl', 'xl', 'large', 'desktop', 'tablet', 'mobileLandscape', 'mobile'];
exports.LARGER_BREAKPOINTS = ['xxl', 'xl', 'large'];
exports.SMALLER_BREAKPOINTS = ['tablet', 'mobileLandscape', 'mobile'];
exports.RESPONSIVE_BREAKPOINTS = [...exports.LARGER_BREAKPOINTS, ...exports.SMALLER_BREAKPOINTS];
// Webflow variant keys (for styles)
exports.BREAKPOINT_VARIANT_KEYS = ['xxl', 'xl', 'large', 'medium', 'small', 'tiny'];
/**
 * All Webflow pseudo-states
 */
exports.PSEUDO_STATES = {
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
};
// Arrays for iteration
exports.STATE_KEYS = ['none', 'hover', 'pressed', 'focused', 'focusVisible', 'visited', 'current', 'placeholder', 'checked', 'disabled'];
exports.INTERACTIVE_STATES = ['hover', 'pressed', 'focused', 'focusVisible'];
exports.FORM_STATES = ['placeholder', 'checked', 'disabled'];
exports.LINK_STATES = ['hover', 'pressed', 'visited', 'current'];
// Webflow state variant suffixes
exports.STATE_VARIANT_SUFFIXES = ['_hover', '_pressed', '_focus', '_focusVisible', '_visited', '_current', '_placeholder', '_checked', '_disabled'];
// -----------------------------------------------------------------------------
// Helper Functions
// -----------------------------------------------------------------------------
/** Get breakpoint definition */
function getBreakpoint(key) {
    return exports.BREAKPOINTS[key];
}
/** Get state definition */
function getState(key) {
    return exports.PSEUDO_STATES[key];
}
/** Convert our breakpoint key to Webflow variant key */
function breakpointToVariantKey(breakpoint) {
    const bp = exports.BREAKPOINTS[breakpoint];
    return bp === null || bp === void 0 ? void 0 : bp.variantKey;
}
/** Convert our state key to Webflow variant suffix */
function stateToVariantSuffix(state) {
    const s = exports.PSEUDO_STATES[state];
    return (s === null || s === void 0 ? void 0 : s.variantSuffix) || '';
}
/**
 * Get the Webflow variant key for a breakpoint + state combination
 * Returns 'main' for desktop+none (which means use styleLess directly, not a variant)
 */
function getVariantKey(breakpoint, state) {
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
/** Check if a breakpoint uses min-width (larger screens) */
function isLargerBreakpoint(breakpoint) {
    var _a;
    return ((_a = exports.BREAKPOINTS[breakpoint]) === null || _a === void 0 ? void 0 : _a.direction) === 'up';
}
/** Check if a breakpoint uses max-width (smaller screens) */
function isSmallerBreakpoint(breakpoint) {
    var _a;
    return ((_a = exports.BREAKPOINTS[breakpoint]) === null || _a === void 0 ? void 0 : _a.direction) === 'down';
}
/** Get breakpoints sorted by cascade order */
function getBreakpointsCascadeOrder() {
    return [...exports.BREAKPOINT_KEYS].sort((a, b) => exports.BREAKPOINTS[a].order - exports.BREAKPOINTS[b].order);
}
/** Get media query for breakpoint */
function getMediaQuery(breakpoint) {
    var _a;
    return ((_a = exports.BREAKPOINTS[breakpoint]) === null || _a === void 0 ? void 0 : _a.mediaQuery) || null;
}
// -----------------------------------------------------------------------------
// Style Registry Format Helpers
// These help generate the correct format for AI prompts
// -----------------------------------------------------------------------------
/**
 * Style registry field names used in prompts
 * Maps to styleLess (desktop) and variants (responsive)
 * Uses actual Webflow variant keys: xl, xxl (not xlarge, xxlarge)
 */
exports.STYLE_REGISTRY_FIELDS = {
    // Desktop (no breakpoint)
    main: 'main',
    // Larger breakpoints (min-width)
    large: 'large', // ≥1280px
    xl: 'xl', // ≥1440px
    xxl: 'xxl', // ≥1920px
    // Smaller breakpoints (max-width)
    medium: 'medium', // ≤991px
    small: 'small', // ≤767px
    tiny: 'tiny', // ≤478px
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
};
/** Generate prompt documentation for breakpoints */
function generateBreakpointDocsForPrompt() {
    return `## Responsive Breakpoints

| Field | Media Query | Direction | Description |
|-------|-------------|-----------|-------------|
| main | (none) | Base | Desktop styles (default) |
| large | min-width: 1280px | ↑ UP | Large desktop (≥1280px) |
| xl | min-width: 1440px | ↑ UP | Extra large desktop (≥1440px) |
| xxl | min-width: 1920px | ↑ UP | Ultra wide desktop (≥1920px) |
| medium | max-width: 991px | ↓ DOWN | Tablet (≤991px) |
| small | max-width: 767px | ↓ DOWN | Mobile landscape (≤767px) |
| tiny | max-width: 478px | ↓ DOWN | Mobile portrait (≤478px) |

**Cascade Rules:**
- \`main\` (Desktop) is the BASE - always required
- Larger breakpoints (large, xl, xxl) cascade UP from Desktop
- Smaller breakpoints (medium, small, tiny) cascade DOWN from Desktop
- Only include breakpoint fields when styles DIFFER from the base`;
}
/** Generate prompt documentation for states */
function generateStateDocsForPrompt() {
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
exports.BREAKPOINT_DOCS = generateBreakpointDocsForPrompt();
/** Pre-built state documentation for prompts */
exports.STATE_DOCS = generateStateDocsForPrompt();
/**
 * Style registry format documentation for prompts
 * Includes both breakpoints and example format
 */
exports.STYLE_REGISTRY_FORMAT_DOCS = `## Style Registry Format

Each style entry uses this format:

\`\`\`
- id: "[CSS Selector]"
  comb: "" | "&"
  main: "[desktop CSS properties]"
  large: "[≥1280px properties]"    # optional
  xl: "[≥1440px properties]"       # optional
  xxl: "[≥1920px properties]"      # optional
  medium: "[≤991px properties]"    # optional
  small: "[≤767px properties]"     # optional
  tiny: "[≤478px properties]"      # optional
  hover: "[hover state]"           # optional
  focus: "[focus state]"           # optional
\`\`\`

### Field Definitions

| Field | Required | Description |
|-------|----------|-------------|
| id | YES | CSS selector (e.g., ".button", ".button.is-primary") |
| comb | YES | "" for base class, "&" for combo modifier |
| main | YES | Desktop styles (BASE) |
| large | NO | Large screens (≥1280px, min-width) |
| xl | NO | Extra large screens (≥1440px, min-width) |
| xxl | NO | Ultra wide screens (≥1920px, min-width) |
| medium | NO | Tablet (≤991px, max-width) |
| small | NO | Mobile landscape (≤767px, max-width) |
| tiny | NO | Mobile portrait (≤478px, max-width) |
| hover | NO | Hover state styles |
| focus | NO | Focus state styles |

### Combo Classes

- \`comb: ""\` = standalone class (e.g., \`.button\`)
- \`comb: "&"\` = combo modifier that requires base class (e.g., \`.button.is-primary\`)
`;
/** Desktop-only mode warning for prompts */
exports.DESKTOP_ONLY_WARNING = `**⚠️ DESKTOP ONLY MODE**
- Do NOT include \`large\`, \`xl\`, \`xxl\`, \`medium\`, \`small\`, or \`tiny\` fields
- Only generate \`main\` (desktop) styles`;
