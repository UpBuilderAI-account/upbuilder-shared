export interface BreakpointDef {
    /** Internal Webflow key */
    key: string;
    /** Display name */
    name: string;
    /** CSS media query (null for desktop/main) */
    mediaQuery: string | null;
    /** Breakpoint width in pixels (null for desktop) */
    width: number | null;
    /** Direction: 'up' for min-width, 'down' for max-width */
    direction: 'up' | 'down' | 'base';
    /** Order in cascade (lower = earlier in stylesheet) */
    order: number;
    /** Variant key used in Webflow styles */
    variantKey: string | null;
}
/**
 * All Webflow breakpoints in cascade order
 *
 * Webflow uses a hybrid cascade:
 * - Desktop (main) is the BASE - no media query
 * - Larger screens cascade UP with min-width
 * - Smaller screens cascade DOWN with max-width
 */
export declare const BREAKPOINTS: Record<string, BreakpointDef>;
export type BreakpointKey = keyof typeof BREAKPOINTS;
export declare const BREAKPOINT_KEYS: BreakpointKey[];
export declare const LARGER_BREAKPOINTS: BreakpointKey[];
export declare const SMALLER_BREAKPOINTS: BreakpointKey[];
export declare const RESPONSIVE_BREAKPOINTS: BreakpointKey[];
export declare const BREAKPOINT_VARIANT_KEYS: readonly ["xxl", "xl", "large", "medium", "small", "tiny"];
export type BreakpointVariantKey = typeof BREAKPOINT_VARIANT_KEYS[number];
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
export declare const PSEUDO_STATES: Record<string, StateDef>;
export type StateKey = keyof typeof PSEUDO_STATES;
export declare const STATE_KEYS: StateKey[];
export declare const INTERACTIVE_STATES: StateKey[];
export declare const FORM_STATES: StateKey[];
export declare const LINK_STATES: StateKey[];
export declare const STATE_VARIANT_SUFFIXES: readonly ["_hover", "_pressed", "_focus", "_focusVisible", "_visited", "_current", "_placeholder", "_checked", "_disabled"];
export type StateVariantSuffix = typeof STATE_VARIANT_SUFFIXES[number];
/**
 * All possible Webflow style variant keys
 * Format: breakpoint OR breakpoint_state OR main_state
 */
export type WebflowStyleVariantKey = 'large' | 'xl' | 'xxl' | 'medium' | 'small' | 'tiny' | 'main_hover' | 'main_pressed' | 'main_focus' | 'main_focusVisible' | 'main_visited' | 'main_current' | 'main_placeholder' | 'main_checked' | 'main_disabled' | 'large_hover' | 'large_pressed' | 'large_focus' | 'large_focusVisible' | 'xl_hover' | 'xl_pressed' | 'xl_focus' | 'xl_focusVisible' | 'xxl_hover' | 'xxl_pressed' | 'xxl_focus' | 'xxl_focusVisible' | 'medium_hover' | 'medium_pressed' | 'medium_focus' | 'medium_focusVisible' | 'small_hover' | 'small_pressed' | 'small_focus' | 'small_focusVisible' | 'tiny_hover' | 'tiny_pressed' | 'tiny_focus' | 'tiny_focusVisible';
/** Get breakpoint definition */
export declare function getBreakpoint(key: BreakpointKey): BreakpointDef;
/** Get state definition */
export declare function getState(key: StateKey): StateDef;
/** Convert our breakpoint key to Webflow variant key */
export declare function breakpointToVariantKey(breakpoint: BreakpointKey): BreakpointVariantKey | null;
/** Convert our state key to Webflow variant suffix */
export declare function stateToVariantSuffix(state: StateKey): string;
/**
 * Get the Webflow variant key for a breakpoint + state combination
 * Returns 'main' for desktop+none (which means use styleLess directly, not a variant)
 */
export declare function getVariantKey(breakpoint: BreakpointKey, state: StateKey): string;
/** Check if a breakpoint uses min-width (larger screens) */
export declare function isLargerBreakpoint(breakpoint: BreakpointKey): boolean;
/** Check if a breakpoint uses max-width (smaller screens) */
export declare function isSmallerBreakpoint(breakpoint: BreakpointKey): boolean;
/** Get breakpoints sorted by cascade order */
export declare function getBreakpointsCascadeOrder(): BreakpointKey[];
/** Get media query for breakpoint */
export declare function getMediaQuery(breakpoint: BreakpointKey): string | null;
/**
 * Style registry field names used in prompts
 * Maps to styleLess (desktop) and variants (responsive)
 * Uses actual Webflow variant keys: xl, xxl (not xlarge, xxlarge)
 */
export declare const STYLE_REGISTRY_FIELDS: {
    readonly main: "main";
    readonly large: "large";
    readonly xl: "xl";
    readonly xxl: "xxl";
    readonly medium: "medium";
    readonly small: "small";
    readonly tiny: "tiny";
    readonly hover: "hover";
    readonly focus: "focus";
    readonly pressed: "pressed";
    readonly disabled: "disabled";
    readonly checked: "checked";
    readonly current: "current";
    readonly visited: "visited";
    readonly placeholder: "placeholder";
    readonly focusVisible: "focusVisible";
};
/** Generate prompt documentation for breakpoints */
export declare function generateBreakpointDocsForPrompt(): string;
/** Generate prompt documentation for states */
export declare function generateStateDocsForPrompt(): string;
/** Pre-built breakpoint documentation for prompts */
export declare const BREAKPOINT_DOCS: string;
/** Pre-built state documentation for prompts */
export declare const STATE_DOCS: string;
/**
 * Style registry format documentation for prompts
 * Includes both breakpoints and example format
 */
export declare const STYLE_REGISTRY_FORMAT_DOCS = "## Style Registry Format\n\nEach style entry uses this format:\n\n```\n- id: \"[CSS Selector]\"\n  comb: \"\" | \"&\"\n  main: \"[desktop CSS properties]\"\n  large: \"[\u22651280px properties]\"    # optional\n  xl: \"[\u22651440px properties]\"       # optional\n  xxl: \"[\u22651920px properties]\"      # optional\n  medium: \"[\u2264991px properties]\"    # optional\n  small: \"[\u2264767px properties]\"     # optional\n  tiny: \"[\u2264478px properties]\"      # optional\n  hover: \"[hover state]\"           # optional\n  focus: \"[focus state]\"           # optional\n```\n\n### Field Definitions\n\n| Field | Required | Description |\n|-------|----------|-------------|\n| id | YES | CSS selector (e.g., \".button\", \".button.is-primary\") |\n| comb | YES | \"\" for base class, \"&\" for combo modifier |\n| main | YES | Desktop styles (BASE) |\n| large | NO | Large screens (\u22651280px, min-width) |\n| xl | NO | Extra large screens (\u22651440px, min-width) |\n| xxl | NO | Ultra wide screens (\u22651920px, min-width) |\n| medium | NO | Tablet (\u2264991px, max-width) |\n| small | NO | Mobile landscape (\u2264767px, max-width) |\n| tiny | NO | Mobile portrait (\u2264478px, max-width) |\n| hover | NO | Hover state styles |\n| focus | NO | Focus state styles |\n\n### Combo Classes\n\n- `comb: \"\"` = standalone class (e.g., `.button`)\n- `comb: \"&\"` = combo modifier that requires base class (e.g., `.button.is-primary`)\n";
/** Desktop-only mode warning for prompts */
export declare const DESKTOP_ONLY_WARNING = "**\u26A0\uFE0F DESKTOP ONLY MODE**\n- Do NOT include `large`, `xl`, `xxl`, `medium`, `small`, or `tiny` fields\n- Only generate `main` (desktop) styles";
//# sourceMappingURL=breakpoints.d.ts.map