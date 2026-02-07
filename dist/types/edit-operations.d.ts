/**
 * EDIT OPERATIONS
 * Only changes are sent from frontend to backend - not full data
 * This prevents exposing the full Webflow structure
 */
import type { Breakpoint, PseudoState, EditableAsset } from './editable-tree';
export type EditOperationType = 'addClass' | 'removeClass' | 'reorderClasses' | 'moveNode' | 'deleteNode' | 'duplicateNode' | 'addNode' | 'wrapNode' | 'unwrapNode' | 'renameNode' | 'updateText' | 'updateNodeImage' | 'updateNodeLink' | 'updateNodeFormProps' | 'updateNodeVideoProps' | 'createClass' | 'createCompoundClass' | 'updateClassProperty' | 'removeClassProperty' | 'renameClass' | 'createOverride' | 'updateStyleObjectProperty' | 'createStyleObject' | 'deleteStyleObject' | 'replaceSection' | 'addStyleObjectsBatch';
interface BaseEditOperation {
    /** Operation type */
    type: EditOperationType;
    /** Timestamp for ordering and deduplication */
    timestamp: number;
}
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
 * Add a new node to the tree
 */
export interface AddNodeOp extends BaseEditOperation {
    type: 'addNode';
    /** New node ID */
    nodeId: string;
    /** Parent node ID (null for root level) */
    parentNodeId: string | null;
    /** Index within parent's children */
    index: number;
    /** Node tag (div, section, etc.) */
    tag: string;
    /** Component type (Block, Section, Text, etc.) */
    componentType: string;
    /** Display name */
    displayName: string;
    /** Initial classes */
    classes: string[];
    /** Initial text content */
    textContent?: string;
}
/**
 * Wrap a node with a container element
 */
export interface WrapNodeOp extends BaseEditOperation {
    type: 'wrapNode';
    /** Node to wrap */
    nodeId: string;
    /** New wrapper node ID */
    wrapperId: string;
    /** Wrapper type (div, section) */
    wrapperType: 'div' | 'section';
    /** Wrapper tag */
    tag: string;
    /** Wrapper component type */
    componentType: string;
}
/**
 * Unwrap a node (remove wrapper, promote children)
 */
export interface UnwrapNodeOp extends BaseEditOperation {
    type: 'unwrapNode';
    /** Node (wrapper) to remove */
    nodeId: string;
    /** Children that will be promoted */
    childIds: string[];
}
/**
 * Rename a node's display name
 */
export interface RenameNodeOp extends BaseEditOperation {
    type: 'renameNode';
    /** Node to rename */
    nodeId: string;
    /** New display name */
    newName: string;
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
/**
 * Update link href/target on a node
 */
export interface UpdateNodeLinkOp extends BaseEditOperation {
    type: 'updateNodeLink';
    /** Node to update */
    nodeId: string;
    /** Link URL */
    href?: string;
    /** Link target */
    target?: '_blank' | '_self' | '_parent' | '_top';
}
/**
 * Update form input properties on a node
 */
export interface UpdateNodeFormPropsOp extends BaseEditOperation {
    type: 'updateNodeFormProps';
    /** Node to update */
    nodeId: string;
    /** Input type */
    inputType?: string;
    /** Placeholder text */
    placeholder?: string;
    /** Required flag */
    required?: boolean;
    /** Input name */
    name?: string;
}
/**
 * Update video properties on a node
 */
export interface UpdateNodeVideoPropsOp extends BaseEditOperation {
    type: 'updateNodeVideoProps';
    /** Node to update */
    nodeId: string;
    /** Video source URL */
    src?: string;
    /** Autoplay flag */
    autoplay?: boolean;
    /** Loop flag */
    loop?: boolean;
    /** Muted flag */
    muted?: boolean;
    /** Controls flag */
    controls?: boolean;
    /** Poster image URL */
    poster?: string;
}
/**
 * Create a new class/style
 */
export interface CreateClassOp extends BaseEditOperation {
    type: 'createClass';
    /** Name for the new class */
    className: string;
    /** Initial CSS properties */
    properties: Array<{
        name: string;
        value: string;
    }>;
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
    properties?: Array<{
        name: string;
        value: string;
    }>;
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
/**
 * Update a style property using the Webflow-aligned style object model
 *
 * KEY DIFFERENCE FROM UpdateClassPropertyOp:
 * - Uses styleId (the _id of a WebflowStyleObject)
 * - chainContext provides the full class chain for context
 * - Targets a specific style object, not a compound selector string
 */
export interface UpdateStyleObjectPropertyOp extends BaseEditOperation {
    type: 'updateStyleObjectProperty';
    /**
     * The style object _id to update
     * This is the unique identifier of the WebflowStyleObject
     */
    styleId: string;
    /**
     * The chain context (class stack) for this style
     * Used for CSS selector generation and debugging
     * e.g., ['button', 'is-primary']
     */
    chainContext: string[];
    /** CSS property name to update */
    property: string;
    /** New CSS value (empty string to remove) */
    value: string;
    /** Target breakpoint */
    breakpoint: Breakpoint;
    /** Target pseudo-state */
    state: PseudoState;
}
/**
 * Create a new style object (for new combo class)
 */
export interface CreateStyleObjectOp extends BaseEditOperation {
    type: 'createStyleObject';
    /**
     * The style object _id (generated deterministically on frontend)
     */
    styleId: string;
    /**
     * The class name - just the single class, not compound
     * e.g., "is-primary" (NOT "button.is-primary")
     */
    name: string;
    /**
     * Position marker
     * '' = base class (first in chain)
     * '&' = modifier (requires preceding class)
     */
    comb: '' | '&';
    /**
     * The full chain context
     * e.g., ['button', 'is-primary']
     */
    chainContext: string[];
    /**
     * Parent style object _id (to update its children array)
     */
    parentStyleId?: string;
    /**
     * Initial CSS properties (optional)
     */
    initialStyleLess?: string;
}
/**
 * DELETE STYLE OBJECT OPERATION
 * Removes a style object (class) from the system
 */
export interface DeleteStyleObjectOp extends BaseEditOperation {
    type: 'deleteStyleObject';
    /**
     * The style object _id to delete
     */
    styleId: string;
    /**
     * The class name being deleted (for reference)
     */
    className: string;
}
/**
 * Structure node for section rebuild
 * Represents a single element in the rebuilt section tree
 */
export interface RebuildStructureNode {
    /** Unique node ID */
    id: string;
    /** Component type (Block, Section, Heading, etc.) */
    compType: string;
    /** Parent node ID ('none' for section root) */
    parent: string;
    /** Array of class/style IDs to apply */
    styles: string[];
    /** HTML tag (for Heading, etc.) */
    tag?: string;
    /** Text content */
    text?: string;
    /** Image source URL */
    src?: string;
    /** Image alt text */
    alt?: string;
    /** Link href */
    href?: string;
    /** Collapse behavior for interactive elements */
    collapse?: string;
    /** Raw HTML for embeds */
    html?: string;
    /** Custom data attribute */
    custom?: string;
}
/**
 * Style definition for styles in rebuild
 */
export interface RebuildStyleDefinition {
    /** Class name (e.g., "nav-link", "btn-primary") */
    name: string;
    /** Combo marker: "" for base class, "&" for modifier */
    comb: '' | '&';
    /** Full combo chain for context (e.g., ["button", "is-primary"]) */
    chain?: string[];
    /** Action: "edit" existing style or "create" new one */
    action: 'edit' | 'create';
    /** CSS for desktop (main breakpoint) */
    main: string;
    /** CSS overrides for tablet (≤991px) */
    medium?: string;
    /** CSS overrides for mobile (≤478px) */
    tiny?: string;
    /** Hover state CSS */
    hover?: string;
    /** Current/active state CSS */
    current?: string;
}
/**
 * REPLACE SECTION OPERATION
 * Replaces an entire section's node tree with new structure
 * Used by AI rebuild mode for full section replacement
 */
export interface ReplaceSectionOp extends BaseEditOperation {
    type: 'replaceSection';
    /**
     * The section node ID to replace
     * All descendants will be removed and replaced with new structure
     */
    sectionId: string;
    /**
     * The new structure for this section
     * First node with parent='none' becomes the new section root
     */
    structure: RebuildStructureNode[];
}
/**
 * ADD STYLE OBJECTS BATCH OPERATION
 * Adds multiple new style objects at once
 * Used by AI rebuild mode to add new styles before structure
 */
export interface AddStyleObjectsBatchOp extends BaseEditOperation {
    type: 'addStyleObjectsBatch';
    /**
     * Array of new styles to add
     * Only styles that don't already exist should be included
     */
    styles: RebuildStyleDefinition[];
}
/**
 * Any edit operation
 */
export type EditOperation = AddClassOp | RemoveClassOp | ReorderClassesOp | MoveNodeOp | DeleteNodeOp | DuplicateNodeOp | AddNodeOp | WrapNodeOp | UnwrapNodeOp | RenameNodeOp | UpdateTextOp | UpdateNodeImageOp | UpdateNodeLinkOp | UpdateNodeFormPropsOp | UpdateNodeVideoPropsOp | CreateClassOp | CreateCompoundClassOp | UpdateClassPropertyOp | RemoveClassPropertyOp | RenameClassOp | CreateOverrideOp | UpdateStyleObjectPropertyOp | CreateStyleObjectOp | DeleteStyleObjectOp | ReplaceSectionOp | AddStyleObjectsBatchOp;
/**
 * Request to apply edit operations
 */
export interface ApplyEditsRequest {
    projectId: string;
    designId: string;
    operations: EditOperation[];
    /** Version the edits are based on (for conflict detection) */
    baseVersion: string;
    /** Updated variable mapping (only sent when variables were changed) */
    variableMapping?: {
        collections: import('./element').FigmaVariableCollection[];
        variables: import('./element').FigmaColorVariable[];
        cssPropertyMap: Record<string, string>;
    };
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
    /** Design IDs updated by global section propagation */
    propagatedDesignIds?: string[];
    /** Updated node subtrees for propagated designs (avoids re-fetch) */
    propagatedUpdates?: Record<string, Record<string, import('./editable-tree').EditableNode>>;
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
    /** True if assets are still uploading to Webflow CDN */
    assetsUploading?: boolean;
    /** Progress of asset upload (when assetsUploading is true) */
    assetProgress?: {
        uploaded: number;
        total: number;
    };
}
/**
 * Asset upload status request
 */
export interface AssetUploadStatusRequest {
    projectId: string;
}
/**
 * Asset upload status response
 */
export interface AssetUploadStatusResponse {
    complete: boolean;
    uploaded: number;
    total: number;
    failed: number;
}
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
export {};
//# sourceMappingURL=edit-operations.d.ts.map