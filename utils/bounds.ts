/**
 * Bounding box calculation utilities
 * Consolidated logic used by both frontend and backend
 */

import type { Bounds } from '../types/core-domain';

interface ElementWithBounds {
  id?: string | number;
  name?: string;
  figmaNodeId?: string;
  processingData?: {
    shortTitle?: string | null;
  };
  bounds?: Bounds;
}

/**
 * Calculates the bounding box that encompasses all given elements
 * bounds.x/y contains the actual frame-relative position
 * @param elements Array of elements with bounds
 * @returns Bounding box or null if no valid bounds found
 */
export function calculateBoundingBox(elements: ElementWithBounds[]): Bounds | null {
  if (!elements || elements.length === 0) {
    return null;
  }

  let minX = Infinity;
  let minY = Infinity;
  let maxX = -Infinity;
  let maxY = -Infinity;
  let found = false;

  elements.forEach(element => {
    if (!element.bounds) return;

    const { x, y, width, height } = element.bounds;

    if (typeof x === 'number' && typeof y === 'number' &&
        typeof width === 'number' && typeof height === 'number') {
      minX = Math.min(minX, x);
      minY = Math.min(minY, y);
      maxX = Math.max(maxX, x + width);
      maxY = Math.max(maxY, y + height);
      found = true;
    }
  });

  if (!found) return null;

  return {
    x: minX,
    y: minY,
    width: maxX - minX,
    height: maxY - minY
  };
}

/**
 * Calculates the bounding box for a specific group of elements identified by IDs
 * Supports multiple ID formats: numeric ID, Figma node ID, short title, or name
 * @param elementIds Array of element identifiers
 * @param allElements All available elements to search through
 * @returns Bounding box or undefined if no valid elements found
 */
export function calculateGroupBounds(
  elementIds: string[],
  allElements: ElementWithBounds[]
): Bounds | undefined {
  if (!elementIds.length || !allElements.length) {
    return undefined;
  }

  // Create a robust lookup map that indexes elements by ALL possible identifiers
  const elementMap = new Map<string, ElementWithBounds>();

  allElements.forEach(el => {
    // 1. Index by numeric/string ID (e.g., "123")
    if (el.id) elementMap.set(String(el.id), el);

    // 2. Index by Figma Node ID (e.g., "1:24")
    if (el.figmaNodeId) elementMap.set(el.figmaNodeId, el);

    // 3. Index by Short Title (e.g., "hero_image") - Most common in AI sections
    if (el.processingData?.shortTitle) elementMap.set(el.processingData.shortTitle, el);

    // 4. Index by Name (fallback)
    if (el.name) elementMap.set(el.name, el);
  });

  const matchedElements: ElementWithBounds[] = [];

  for (const id of elementIds) {
    const element = elementMap.get(String(id));

    if (!element) {
      // Silently skip - caller can handle missing elements
      continue;
    }

    if (element.bounds) {
      matchedElements.push(element);
    }
  }

  return calculateBoundingBox(matchedElements) || undefined;
}

/**
 * Checks if two bounds overlap
 */
export function boundsOverlap(a: Bounds, b: Bounds): boolean {
  return !(
    a.x + a.width < b.x ||
    b.x + b.width < a.x ||
    a.y + a.height < b.y ||
    b.y + b.height < a.y
  );
}

/**
 * Calculates the area of a bounds
 */
export function boundsArea(bounds: Bounds): number {
  return bounds.width * bounds.height;
}

/**
 * Checks if bounds A contains bounds B
 */
export function boundsContains(outer: Bounds, inner: Bounds): boolean {
  return (
    inner.x >= outer.x &&
    inner.y >= outer.y &&
    inner.x + inner.width <= outer.x + outer.width &&
    inner.y + inner.height <= outer.y + outer.height
  );
}
