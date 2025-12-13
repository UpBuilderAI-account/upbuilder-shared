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
export declare function calculateBoundingBox(elements: ElementWithBounds[]): Bounds | null;
/**
 * Calculates the bounding box for a specific group of elements identified by IDs
 * Supports multiple ID formats: numeric ID, Figma node ID, short title, or name
 * @param elementIds Array of element identifiers
 * @param allElements All available elements to search through
 * @returns Bounding box or undefined if no valid elements found
 */
export declare function calculateGroupBounds(elementIds: string[], allElements: ElementWithBounds[]): Bounds | undefined;
/**
 * Checks if two bounds overlap
 */
export declare function boundsOverlap(a: Bounds, b: Bounds): boolean;
/**
 * Calculates the area of a bounds
 */
export declare function boundsArea(bounds: Bounds): number;
/**
 * Checks if bounds A contains bounds B
 */
export declare function boundsContains(outer: Bounds, inner: Bounds): boolean;
export {};
//# sourceMappingURL=bounds.d.ts.map