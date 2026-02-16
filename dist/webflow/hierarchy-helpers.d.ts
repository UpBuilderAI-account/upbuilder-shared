export interface PlacementCheckResult {
    valid: boolean;
    error?: string;
    errorCode?: 'INVALID_PARENT' | 'INVALID_CHILD' | 'FORBIDDEN_NESTING' | 'FORBIDDEN_DESCENDANT' | 'MISSING_ANCESTOR' | 'MISSING_REQUIRED_CHILD' | 'DUPLICATE_REQUIRED_CHILD' | 'DUPLICATE_OPTIONAL_CHILD';
}
export type DropPosition = 'inside' | 'before' | 'after';
export interface DesignNode {
    id: string;
    componentType: string;
    parentId?: string;
    children: string[];
}
export interface TreeValidationResult {
    valid: boolean;
    errors: Array<{
        nodeId: string;
        message: string;
        errorCode?: string;
    }>;
}
/**
 * Quick check if an element type can be placed inside/near a target
 * Returns immediately - doesn't validate entire tree
 *
 * For 'inside' position: targetType is the container
 * For 'before'/'after' position: targetType should be the PARENT (caller must provide this)
 */
export declare function canPlaceElement(elementType: string, targetType: string, _position: DropPosition): PlacementCheckResult;
/**
 * Check if an element type can contain children of a specific type
 */
export declare function canContainChild(parentType: string, childType: string): PlacementCheckResult;
/**
 * Get list of valid parent types for an element
 * Returns null if any parent is allowed
 */
export declare function getValidParentTypes(elementType: string): string[] | null;
/**
 * Get list of valid child types for an element
 * Returns null if any children are allowed
 */
export declare function getValidChildTypes(parentType: string): string[] | null;
/**
 * Validate an entire design tree structure
 * Checks all nodes for constraint violations
 */
export declare function validateDesignTree(nodes: Record<string, DesignNode>, _rootIds: string[]): TreeValidationResult;
/**
 * Get user-friendly error message for a constraint violation
 */
export declare function getConstraintErrorMessage(elementType: string, targetType: string, errorCode: string): string;
//# sourceMappingURL=hierarchy-helpers.d.ts.map