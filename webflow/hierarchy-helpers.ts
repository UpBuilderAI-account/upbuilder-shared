// ============================================================================
// HIERARCHY VALIDATION HELPERS
// Frontend-friendly validation functions for drag/drop and real-time validation
// ============================================================================

import type { WebflowComponentType } from './components';
import {
  WEBFLOW_CONSTRAINTS,
  getDisplayName,
  getAllowedChildren,
  isPinnedToParent,
} from './constraints';

// =============================================================================
// TYPES
// =============================================================================

export interface PlacementCheckResult {
  valid: boolean;
  error?: string;
  errorCode?: 'INVALID_PARENT' | 'INVALID_CHILD' | 'FORBIDDEN_NESTING' | 'FORBIDDEN_DESCENDANT' | 'MISSING_ANCESTOR';
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

// =============================================================================
// QUICK PLACEMENT VALIDATION
// Used for drag/drop pre-validation (before applying change)
// =============================================================================

/**
 * Quick check if an element type can be placed inside/near a target
 * Returns immediately - doesn't validate entire tree
 *
 * For 'inside' position: targetType is the container
 * For 'before'/'after' position: targetType should be the PARENT (caller must provide this)
 */
export function canPlaceElement(
  elementType: string,
  targetType: string,
  _position: DropPosition
): PlacementCheckResult {
  const elementConstraints = WEBFLOW_CONSTRAINTS[elementType as WebflowComponentType];

  // Unknown element types are allowed (permissive for custom/unknown elements)
  if (!elementConstraints) {
    return { valid: true };
  }

  const constraints = elementConstraints.constraints;

  // Check pinToParent constraint - these elements cannot be moved at all
  if (isPinnedToParent(elementType as WebflowComponentType)) {
    // Check if this would move the element to a different parent type
    const parentConstraints = constraints.parent || constraints.ancestors || [];
    for (const constraint of parentConstraints) {
      if (constraint.rule === 'ExactlyOne' || constraint.rule === 'AtLeastOne') {
        const allowedParents = Array.isArray(constraint.is)
          ? constraint.is
          : [constraint.is as string];

        // If target is not one of the allowed parents, this pinned element can't be moved there
        if (!allowedParents.includes(targetType)) {
          return {
            valid: false,
            error: `${getDisplayName(elementType as WebflowComponentType)} is locked to its parent and cannot be moved`,
            errorCode: 'INVALID_PARENT',
          };
        }
      }
    }
  }

  // For all positions, we're checking if element can be a child of targetType
  // (For before/after, caller passes the parent as targetType)

  // 1. Check parent constraints (element requires specific direct parent)
  const parentConstraints = constraints.parent || [];
  for (const constraint of parentConstraints) {
    if (constraint.rule === 'ExactlyOne' || constraint.rule === 'AtLeastOne') {
      const allowedParents = Array.isArray(constraint.is)
        ? constraint.is
        : [constraint.is as string];

      if (!allowedParents.includes(targetType)) {
        return {
          valid: false,
          error: `${getDisplayName(elementType as WebflowComponentType)} must be placed inside ${getDisplayName(allowedParents[0] as WebflowComponentType)}`,
          errorCode: 'INVALID_PARENT',
        };
      }
    }
  }

  // 2. Check ancestor constraints when dropping at root level (Body)
  // If element requires an ancestor, it can't be at root
  if (targetType === 'Body' || targetType === 'body') {
    const ancestorConstraints = constraints.ancestors || [];
    for (const constraint of ancestorConstraints) {
      if (constraint.rule === 'ExactlyOne' || constraint.rule === 'AtLeastOne') {
        const requiredAncestors = Array.isArray(constraint.is)
          ? constraint.is
          : [constraint.is as string];
        const ancestorName = getDisplayName(requiredAncestors[0] as WebflowComponentType);
        return {
          valid: false,
          error: `${getDisplayName(elementType as WebflowComponentType)} must be inside ${ancestorName}`,
          errorCode: 'MISSING_ANCESTOR',
        };
      }
    }
  }

  // 3. Check if target has strict children requirements
  const targetConstraints = WEBFLOW_CONSTRAINTS[targetType as WebflowComponentType];
  if (targetConstraints?.constraints.children) {
    for (const constraint of targetConstraints.constraints.children) {
      if (constraint.rule === 'RequireOnly') {
        const allowedChildren = Array.isArray(constraint.is)
          ? constraint.is
          : [constraint.is as string];

        if (!allowedChildren.includes(elementType)) {
          const allowedNames = allowedChildren
            .map(t => getDisplayName(t as WebflowComponentType))
            .join(', ');
          return {
            valid: false,
            error: `${getDisplayName(targetType as WebflowComponentType)} can only contain: ${allowedNames}`,
            errorCode: 'INVALID_CHILD',
          };
        }
      }
    }
  }

  // 4. Check if target forbids this element as descendant
  const targetDescendantConstraints = targetConstraints?.constraints.descendants || [];
  for (const constraint of targetDescendantConstraints) {
    if (constraint.rule === 'Forbid') {
      const forbiddenTypes = Array.isArray(constraint.is)
        ? constraint.is
        : [constraint.is as string];

      if (forbiddenTypes.includes(elementType)) {
        return {
          valid: false,
          error: `${getDisplayName(elementType as WebflowComponentType)} cannot be placed inside ${getDisplayName(targetType as WebflowComponentType)}`,
          errorCode: 'FORBIDDEN_DESCENDANT',
        };
      }
    }
  }

  return { valid: true };
}

/**
 * Check if an element type can contain children of a specific type
 */
export function canContainChild(
  parentType: string,
  childType: string
): PlacementCheckResult {
  return canPlaceElement(childType, parentType, 'inside');
}

/**
 * Get list of valid parent types for an element
 * Returns null if any parent is allowed
 */
export function getValidParentTypes(elementType: string): string[] | null {
  const constraints = WEBFLOW_CONSTRAINTS[elementType as WebflowComponentType]?.constraints;
  if (!constraints) return null;

  const validParents: string[] = [];

  const parentConstraints = constraints.parent || [];
  for (const constraint of parentConstraints) {
    if (constraint.rule === 'ExactlyOne' || constraint.rule === 'AtLeastOne') {
      const parents = Array.isArray(constraint.is) ? constraint.is : [constraint.is as string];
      validParents.push(...parents);
    }
  }

  // Also check ancestor constraints (less strict but relevant)
  const ancestorConstraints = constraints.ancestors || [];
  for (const constraint of ancestorConstraints) {
    if (constraint.rule === 'ExactlyOne' || constraint.rule === 'AtLeastOne') {
      const ancestors = Array.isArray(constraint.is) ? constraint.is : [constraint.is as string];
      // Only add if not already in list
      for (const ancestor of ancestors) {
        if (!validParents.includes(ancestor)) {
          validParents.push(ancestor);
        }
      }
    }
  }

  return validParents.length > 0 ? validParents : null;
}

/**
 * Get list of valid child types for an element
 * Returns null if any children are allowed
 */
export function getValidChildTypes(parentType: string): string[] | null {
  return getAllowedChildren(parentType as WebflowComponentType);
}

// =============================================================================
// FULL TREE VALIDATION
// Used for post-operation validation (after applying change)
// =============================================================================

/**
 * Validate an entire design tree structure
 * Checks all nodes for constraint violations
 */
export function validateDesignTree(
  nodes: Record<string, DesignNode>,
  _rootIds: string[]
): TreeValidationResult {
  const errors: TreeValidationResult['errors'] = [];

  // Validate each node
  for (const [nodeId, node] of Object.entries(nodes)) {
    const constraints = WEBFLOW_CONSTRAINTS[node.componentType as WebflowComponentType]?.constraints;
    if (!constraints) continue;

    // 1. Check required parent constraint
    const parentConstraints = constraints.parent || [];
    for (const constraint of parentConstraints) {
      if (constraint.rule === 'ExactlyOne' || constraint.rule === 'AtLeastOne') {
        const allowedParents = Array.isArray(constraint.is)
          ? constraint.is
          : [constraint.is as string];

        const parent = node.parentId ? nodes[node.parentId] : null;
        if (!parent || !allowedParents.includes(parent.componentType)) {
          const parentName = getDisplayName(allowedParents[0] as WebflowComponentType);
          errors.push({
            nodeId,
            message: `${getDisplayName(node.componentType as WebflowComponentType)} must be directly inside ${parentName}`,
            errorCode: 'INVALID_PARENT',
          });
        }
      }
    }

    // 2. Check required ancestor constraint (somewhere above, not necessarily direct parent)
    const ancestorConstraints = constraints.ancestors || [];
    for (const constraint of ancestorConstraints) {
      if (constraint.rule === 'AtLeastOne' || constraint.rule === 'ExactlyOne') {
        const requiredTypes = Array.isArray(constraint.is)
          ? constraint.is
          : [constraint.is as string];

        // Walk up the tree to find required ancestor
        let found = false;
        let currentId = node.parentId;
        while (currentId) {
          const ancestor = nodes[currentId];
          if (ancestor && requiredTypes.includes(ancestor.componentType)) {
            found = true;
            break;
          }
          currentId = ancestor?.parentId;
        }

        if (!found) {
          const ancestorName = getDisplayName(requiredTypes[0] as WebflowComponentType);
          errors.push({
            nodeId,
            message: `${getDisplayName(node.componentType as WebflowComponentType)} must be inside ${ancestorName}`,
            errorCode: 'MISSING_ANCESTOR',
          });
        }
      }
    }

    // 3. Check children constraints (RequireOnly)
    const childConstraints = constraints.children || [];
    for (const constraint of childConstraints) {
      if (constraint.rule === 'RequireOnly') {
        const allowedTypes = Array.isArray(constraint.is)
          ? constraint.is
          : [constraint.is as string];

        for (const childId of node.children) {
          const child = nodes[childId];
          if (child && !allowedTypes.includes(child.componentType)) {
            const allowedNames = allowedTypes
              .map(t => getDisplayName(t as WebflowComponentType))
              .join(', ');
            errors.push({
              nodeId: childId,
              message: `${getDisplayName(child.componentType as WebflowComponentType)} cannot be placed inside ${getDisplayName(node.componentType as WebflowComponentType)}. Only allowed: ${allowedNames}`,
              errorCode: 'INVALID_CHILD',
            });
          }
        }
      }

      // Check AtLeastOne constraint
      if (constraint.rule === 'AtLeastOne') {
        const requiredTypes = Array.isArray(constraint.is)
          ? constraint.is
          : [constraint.is as string];

        const hasRequired = node.children.some(childId => {
          const child = nodes[childId];
          return child && requiredTypes.includes(child.componentType);
        });

        if (!hasRequired && node.children.length > 0) {
          // Only error if there are children but none of the required type
          const requiredName = getDisplayName(requiredTypes[0] as WebflowComponentType);
          errors.push({
            nodeId,
            message: `${getDisplayName(node.componentType as WebflowComponentType)} must contain at least one ${requiredName}`,
            errorCode: 'MISSING_ANCESTOR',
          });
        }
      }
    }

    // 4. Check forbidden descendants
    const descendantConstraints = constraints.descendants || [];
    for (const constraint of descendantConstraints) {
      if (constraint.rule === 'Forbid') {
        const forbiddenTypes = Array.isArray(constraint.is)
          ? constraint.is
          : [constraint.is as string];

        // Check all descendants (recursive)
        const checkDescendants = (parentId: string, depth: number = 0) => {
          if (depth > 50) return; // Safety limit

          const parent = nodes[parentId];
          if (!parent) return;

          for (const childId of parent.children) {
            const child = nodes[childId];
            if (!child) continue;

            if (forbiddenTypes.includes(child.componentType)) {
              errors.push({
                nodeId: childId,
                message: `${getDisplayName(child.componentType as WebflowComponentType)} cannot be inside ${getDisplayName(node.componentType as WebflowComponentType)}`,
                errorCode: 'FORBIDDEN_DESCENDANT',
              });
            }

            // Recurse into children
            checkDescendants(childId, depth + 1);
          }
        };

        checkDescendants(nodeId);
      }
    }
  }

  // Deduplicate errors (same node might be flagged by multiple rules)
  const uniqueErrors = errors.filter((error, index, self) =>
    index === self.findIndex(e => e.nodeId === error.nodeId && e.message === error.message)
  );

  return {
    valid: uniqueErrors.length === 0,
    errors: uniqueErrors,
  };
}

/**
 * Get user-friendly error message for a constraint violation
 */
export function getConstraintErrorMessage(
  elementType: string,
  targetType: string,
  errorCode: string
): string {
  const elementName = getDisplayName(elementType as WebflowComponentType);
  const targetName = getDisplayName(targetType as WebflowComponentType);

  switch (errorCode) {
    case 'INVALID_PARENT':
      return `${elementName} cannot be placed directly inside ${targetName}`;
    case 'INVALID_CHILD':
      return `${targetName} cannot contain ${elementName}`;
    case 'FORBIDDEN_NESTING':
      return `${elementName} elements cannot be nested`;
    case 'FORBIDDEN_DESCENDANT':
      return `${elementName} cannot be inside ${targetName}`;
    case 'MISSING_ANCESTOR':
      return `${elementName} must be inside a ${targetName}`;
    default:
      return 'Invalid element placement';
  }
}
