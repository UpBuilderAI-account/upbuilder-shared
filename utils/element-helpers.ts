// ============================================================================
// ELEMENT UTILITY HELPERS
// Generic utilities for working with Element across all packages
// ============================================================================

import type { Element } from '../types/element';

/**
 * Check if element has text content
 */
export function hasTexts(element: Element): boolean {
  return !!(element.texts && Array.isArray(element.texts) && element.texts.length > 0);
}

/**
 * Check if element has images
 */
export function hasImages(element: Element): boolean {
  return element.hasImages ?? false;
}

/**
 * Check if element has background color
 */
export function hasBgColor(element: Element): boolean {
  return !!(element.backgroundColors && element.backgroundColors.length > 0);
}

/**
 * Check if element has borders
 */
export function hasBorder(element: Element): boolean {
  if (element.borders?.widths) {
    return Object.values(element.borders.widths).some((w) => w > 0.2);
  }
  return false;
}

/**
 * Check if element has backgrounds or borders
 */
export function hasBgsOrBorders(element: Element): boolean {
  return hasBgColor(element) || hasBorder(element);
}

/**
 * Check if element is valid (has id, bounds, and content)
 * NOTE: This checks for visual content. For structural validation only,
 * check bounds.width > 0 && bounds.height > 0 directly.
 */
export function isValidElement(element: Element): boolean {
  return !!(
    element &&
    (element.id || element.figmaNodeId) &&
    element.bounds &&
    (hasTexts(element) || hasImages(element) || hasBgsOrBorders(element))
  );
}

/**
 * Remove decimals from a number (truncates, doesn't round)
 */
export function removeDecimals(value: number | string | null | undefined): number {
  if (value != null && value !== '') {
    const [whole] = value.toString().split('.');
    return Number(whole);
  }
  return 0;
}
