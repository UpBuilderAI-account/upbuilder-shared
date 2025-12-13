import type { Element } from '../types/element';
/**
 * Check if element has text content
 */
export declare function hasTexts(element: Element): boolean;
/**
 * Check if element has images
 */
export declare function hasImages(element: Element): boolean;
/**
 * Check if element has background color
 */
export declare function hasBgColor(element: Element): boolean;
/**
 * Check if element has borders
 */
export declare function hasBorder(element: Element): boolean;
/**
 * Check if element has backgrounds or borders
 */
export declare function hasBgsOrBorders(element: Element): boolean;
/**
 * Check if element is valid (has id, bounds, and content)
 * NOTE: This checks for visual content. For structural validation only,
 * check bounds.width > 0 && bounds.height > 0 directly.
 */
export declare function isValidElement(element: Element): boolean;
/**
 * Remove decimals from a number (truncates, doesn't round)
 */
export declare function removeDecimals(value: number | string | null | undefined): number;
//# sourceMappingURL=element-helpers.d.ts.map