import type { WebflowComponentType } from './components';
/**
 * Primary mapping from HTML tag to Webflow component type
 * Some tags have multiple possible mappings based on context
 */
export declare const HTML_TAG_TO_COMPONENT: Record<string, WebflowComponentType>;
export interface MappingContext {
    /** Parent component type (if known) */
    parentType?: WebflowComponentType;
    /** HTML classes on the element */
    classes?: string[];
    /** HTML attributes */
    attributes?: Record<string, string>;
    /** CSS display value */
    display?: string;
    /** Whether element is inside a form */
    insideForm?: boolean;
    /** Whether element is inside a navbar */
    insideNavbar?: boolean;
    /** Whether element is inside a dropdown */
    insideDropdown?: boolean;
}
/**
 * Get component type for an HTML element with context awareness
 */
export declare function getComponentType(tag: string, context?: MappingContext): WebflowComponentType;
/**
 * Get the default HTML tag for a component type
 */
export declare function getDefaultTag(componentType: WebflowComponentType): string;
/**
 * Map component type to Webflow XSCP type value
 * Most use the component name directly, some have variations
 */
export declare function getXSCPType(componentType: WebflowComponentType): string;
/**
 * Common CSS class patterns that indicate specific components
 */
export declare const CLASS_PATTERNS: {
    readonly navbar: readonly [RegExp, RegExp, RegExp];
    readonly navbarContainer: readonly [RegExp];
    readonly navbarBrand: readonly [RegExp, RegExp, RegExp];
    readonly navbarMenu: readonly [RegExp, RegExp];
    readonly navbarLink: readonly [RegExp, RegExp];
    readonly navbarButton: readonly [RegExp, RegExp, RegExp];
    readonly dropdown: readonly [RegExp, RegExp];
    readonly dropdownToggle: readonly [RegExp, RegExp];
    readonly dropdownList: readonly [RegExp, RegExp];
    readonly dropdownLink: readonly [RegExp, RegExp];
    readonly tabs: readonly [RegExp, RegExp];
    readonly tabsMenu: readonly [RegExp, RegExp];
    readonly tabsContent: readonly [RegExp, RegExp];
    readonly tabsLink: readonly [RegExp, RegExp];
    readonly tabsPane: readonly [RegExp, RegExp];
    readonly slider: readonly [RegExp, RegExp, RegExp];
    readonly sliderMask: readonly [RegExp, RegExp];
    readonly sliderSlide: readonly [RegExp, RegExp];
    readonly sliderArrow: readonly [RegExp, RegExp];
    readonly sliderNav: readonly [RegExp, RegExp];
    readonly form: readonly [RegExp, RegExp];
    readonly formSuccess: readonly [RegExp, RegExp];
    readonly formError: readonly [RegExp, RegExp];
    readonly button: readonly [RegExp, RegExp, RegExp];
    readonly grid: readonly [RegExp, RegExp, RegExp];
    readonly richText: readonly [RegExp, RegExp];
    readonly row: readonly [RegExp, RegExp];
    readonly column: readonly [RegExp, RegExp];
    readonly hflex: readonly [RegExp, RegExp, RegExp];
    readonly vflex: readonly [RegExp, RegExp, RegExp];
    readonly bgVideo: readonly [RegExp, RegExp, RegExp];
    readonly codeBlock: readonly [RegExp, RegExp];
};
/**
 * Check if a class string matches a pattern
 */
export declare function matchesClassPattern(classes: string[], patternKey: keyof typeof CLASS_PATTERNS): boolean;
//# sourceMappingURL=mappings.d.ts.map