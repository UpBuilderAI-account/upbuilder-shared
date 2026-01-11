/**
 * EDIT OPERATIONS
 * Only changes are sent from frontend to backend - not full data
 * This prevents exposing the full Webflow structure
 */

import type { Breakpoint, PseudoState, EditableAsset } from './editable-tree';

// ============================================================================
// OPERATION TYPES
// ============================================================================

export type EditOperationType =
  | 'addClass'
  | 'removeClass'
  | 'reorderClasses'
  | 'moveNode'
  | 'deleteNode'
  | 'duplicateNode'
  | 'updateText'
  | 'updateNodeImage'  // Update image source/alt on a node
  | 'createClass'
  | 'createCompoundClass'  // New: create compound class from class stack
  | 'updateClassProperty'
  | 'removeClassProperty'
  | 'renameClass'
  | 'createOverride'; // New: create override on selected class instead of editing source

// ============================================================================
// BASE OPERATION
// ============================================================================

interface BaseEditOperation {
  /** Operation type */
  type: EditOperationType;
  /** Timestamp for ordering and deduplication */
  timestamp: number;
}

// ============================================================================
// NODE CLASS OPERATIONS
// ============================================================================

/**
 * Add a class to a node
 */
export interface AddClassOp extends BaseEditOperation {
  type: 'addClass';
  /** Node to add class to */
  nodeId: string;
  /** Class name to add */
  className: string;
  /** Optional position in class list */
  index?: number;
}

/**
 * Remove a class from a node
 */
export interface RemoveClassOp extends BaseEditOperation {
  type: 'removeClass';
  /** Node to remove class from */
  nodeId: string;
  /** Class name to remove */
  className: string;
}

/**
 * Reorder classes on a node
 */
export interface ReorderClassesOp extends BaseEditOperation {
  type: 'reorderClasses';
  /** Node to reorder classes on */
  nodeId: string;
  /** New order of class names */
  classNames: string[];
}

// ============================================================================
// NODE STRUCTURE OPERATIONS
// ============================================================================

/**
 * Move a node to a new position in the tree
 */
export interface MoveNodeOp extends BaseEditOperation {
  type: 'moveNode';
  /** Node to move */
  nodeId: string;
  /** New parent node ID */
  newParentId: string;
  /** Index within new parent's children */
  newIndex: number;
}

/**
 * Delete a node (and all its children)
 */
export interface DeleteNodeOp extends BaseEditOperation {
  type: 'deleteNode';
  /** Node to delete */
  nodeId: string;
}

/**
 * Duplicate a node (and all its children)
 */
export interface DuplicateNodeOp extends BaseEditOperation {
  type: 'duplicateNode';
  /** Node to duplicate */
  nodeId: string;
  /** New node ID (generated on frontend for optimistic update) */
  newNodeId: string;
}

/**
 * Update text content of a node
 */
export interface UpdateTextOp extends BaseEditOperation {
  type: 'updateText';
  /** Node to update */
  nodeId: string;
  /** New text content */
  newText: string;
}

/**
 * Update image source/alt on a node
 */
export interface UpdateNodeImageOp extends BaseEditOperation {
  type: 'updateNodeImage';
  /** Node to update */
  nodeId: string;
  /** New image source URL */
  src: string;
  /** Optional alt text */
  alt?: string;
}

// ============================================================================
// CLASS/STYLE OPERATIONS
// ============================================================================

/**
 * Create a new class/style
 */
export interface CreateClassOp extends BaseEditOperation {
  type: 'createClass';
  /** Name for the new class */
  className: string;
  /** Initial CSS properties */
  properties: Array<{ name: string; value: string }>;
  /** Optional: copy properties from existing class */
  copyFrom?: string;
}

/**
 * Create a compound class from a class stack (Webflow combo class behavior)
 * This creates an entry like ".button.is-primary" that only applies when both classes are present
 */
export interface CreateCompoundClassOp extends BaseEditOperation {
  type: 'createCompoundClass';

  /**
   * The class stack that forms this compound
   * e.g., ["text-size-regular", "text-weight-semibold"]
   */
  classStack: string[];

  /**
   * The compound selector name (derived from classStack)
   * e.g., "text-size-regular.text-weight-semibold"
   */
  compoundSelector: string;

  /** Initial CSS properties for this compound */
  properties?: Array<{ name: string; value: string }>;
}

/**
 * Update a CSS property on a class or compound selector
 * KEY: Uses sourceClassName - the class/compound that OWNS the property
 *
 * For compound selectors (Webflow combo class behavior):
 * - sourceClassName is the compound selector: "button.is-primary"
 * - This creates/updates the style for .button.is-primary { }
 */
export interface UpdateClassPropertyOp extends BaseEditOperation {
  type: 'updateClassProperty';

  /**
   * The class or compound selector that OWNS the property
   * - Single class: "button"
   * - Compound selector: "button.is-primary" (no leading dot)
   * This is the selector that will be modified
   */
  sourceClassName: string;

  /**
   * For compound selectors, the class stack
   * e.g., ["button", "is-primary"]
   */
  classStack?: string[];

  /**
   * The class currently selected in UI (for context)
   * May differ from sourceClassName when editing inherited property
   */
  selectedClassName?: string;

  /** CSS property name */
  property: string;

  /** New CSS value */
  value: string;

  /** Breakpoint to update */
  breakpoint: Breakpoint;

  /** Pseudo-state to update */
  state: PseudoState;

  /**
   * @deprecated Use sourceClassName instead
   */
  className?: string;
}

/**
 * Remove a CSS property from a class
 */
export interface RemoveClassPropertyOp extends BaseEditOperation {
  type: 'removeClassProperty';

  /** The class that owns the property (source class) */
  sourceClassName: string;

  /** CSS property to remove */
  property: string;

  /** Breakpoint */
  breakpoint: Breakpoint;

  /** Pseudo-state */
  state: PseudoState;

  /**
   * @deprecated Use sourceClassName instead
   */
  className?: string;
}

/**
 * Create an override on the selected class instead of editing the source
 * Use when user wants to override an inherited property
 */
export interface CreateOverrideOp extends BaseEditOperation {
  type: 'createOverride';

  /** The class to add the override to */
  className: string;

  /** CSS property name */
  property: string;

  /** New CSS value */
  value: string;

  /** Breakpoint */
  breakpoint: Breakpoint;

  /** Pseudo-state */
  state: PseudoState;
}

/**
 * Rename a class
 */
export interface RenameClassOp extends BaseEditOperation {
  type: 'renameClass';
  /** Current class name */
  oldName: string;
  /** New class name */
  newName: string;
}

// ============================================================================
// UNION TYPE
// ============================================================================

/**
 * Any edit operation
 */
export type EditOperation =
  | AddClassOp
  | RemoveClassOp
  | ReorderClassesOp
  | MoveNodeOp
  | DeleteNodeOp
  | DuplicateNodeOp
  | UpdateTextOp
  | UpdateNodeImageOp
  | CreateClassOp
  | CreateCompoundClassOp
  | UpdateClassPropertyOp
  | RemoveClassPropertyOp
  | RenameClassOp
  | CreateOverrideOp;

// ============================================================================
// REQUEST/RESPONSE TYPES
// ============================================================================

/**
 * Request to apply edit operations
 */
export interface ApplyEditsRequest {
  projectId: string;
  designId: string;
  operations: EditOperation[];
  /** Version the edits are based on (for conflict detection) */
  baseVersion: string;
}

/**
 * Response after applying edits
 */
export interface ApplyEditsResponse {
  success: boolean;
  /** New version after edits applied */
  newVersion: string;
  /** Number of operations successfully applied */
  appliedCount: number;
  /** Any errors that occurred */
  errors?: Array<{
    operationIndex: number;
    /** Operation type or 'unknown' for general errors */
    operationType: EditOperationType | 'unknown';
    message: string;
  }>;
}

/**
 * Request to export a design (Pro only)
 */
export interface RequestExportRequest {
  projectId: string;
  designId: string;
}

/**
 * Response with export data
 */
export interface RequestExportResponse {
  success: boolean;
  designId: string;
  /** Webflow XSCP JSON - ONLY sent to Pro users */
  xscpJson?: string;
  /** Error message if failed */
  error?: string;
  /** True if user needs to upgrade to Pro */
  requiresUpgrade?: boolean;
}

// ============================================================================
// PREVIEW REQUEST/RESPONSE TYPES
// ============================================================================

/**
 * Request to generate HTML preview
 */
export interface RequestPreviewPayload {
  projectId: string;
  designId: string;
}

/**
 * Response with preview HTML
 */
export interface RequestPreviewResponse {
  success: boolean;
  designId: string;
  /** Complete HTML document for preview */
  html?: string;
  /** CSS styles (extracted separately if needed) */
  css?: string;
  /** Preview statistics */
  stats?: {
    nodeCount: number;
    styleCount: number;
    assetCount: number;
  };
  /** Error message if failed */
  error?: string;
}

// ============================================================================
// IMAGE UPLOAD TYPES
// ============================================================================

/**
 * Request to upload an image from customizer
 */
export interface UploadImageRequest {
  projectId: string;
  designId: string;
  /** Base64 encoded file content */
  fileBase64: string;
  /** Original filename */
  fileName: string;
  /** MIME type */
  contentType: string;
}

/**
 * Response after image upload
 */
export interface UploadImageResponse {
  success: boolean;
  /** Created asset entry */
  asset?: EditableAsset;
  /** S3 key for the uploaded image */
  s3Key?: string;
  /** Error message if failed */
  error?: string;
}
