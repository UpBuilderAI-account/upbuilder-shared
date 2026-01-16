// ============================================================================
// ELEMENT TYPE - Unified across plugin and backend
// Single source of truth for element/node data
// ============================================================================

import type { Bounds } from './core-domain';

// ==================== ENUMS ====================

export enum ElementType {
  FRAME = 'FRAME',
  TEXT = 'TEXT',
  RECTANGLE = 'RECTANGLE',
  VECTOR = 'VECTOR',
  ELLIPSE = 'ELLIPSE',
  POLYGON = 'POLYGON',
  STAR = 'STAR',
  INSTANCE = 'INSTANCE',
  COMPONENT = 'COMPONENT',
  GROUP = 'GROUP',
  IMAGE = 'IMAGE',
  ROW = 'ROW',
  COLUMN = 'COLUMN'
}

export enum SizeUnit {
  PIXELS = 'PIXELS',
  PERCENT = 'PERCENT'
}

export enum LineHeightUnit {
  PIXELS = 'PIXELS',
  PERCENT = 'PERCENT',
  AUTO = 'AUTO'
}

// ==================== BASIC TYPES ====================

export interface ColorRGBA {
  r: number;  // 0-1 range
  g: number;
  b: number;
  a: number;
  colorId?: string;  // For multi-colored text
}

// ==================== FONT & TEXT ====================

export interface Font {
  name?: string;
  size?: number;
  sizeUnit?: SizeUnit;
  weight?: number;
  style?: 'normal' | 'italic' | 'oblique';  // Font style (italic, oblique)
  lineHeight?: number;
  lineHeightUnit?: LineHeightUnit;
  letterSpacing?: number;
  letterSpacingUnit?: SizeUnit;
  textAlign?: string;
  decoration?: string;
  textTransform?: string;
  case?: string;  // Text case (UPPER, LOWER, TITLE, SMALL_CAPS)
}

export interface TextSegment {
  text: string;
  font?: Font;
  colors?: ColorRGBA[];
}

export interface TextStyle {
  fontFamily?: string;
  fontSize?: number;
  fontWeight?: number;
  fontStyle?: 'normal' | 'italic' | 'oblique';  // Font style (italic, oblique)
  lineHeight?: number;
  letterSpacing?: number;
  textAlign?: string;
  textDecoration?: string;
  textTransform?: string;
  color?: ColorRGBA;
}

// ==================== FILLS & GRADIENTS ====================

export interface GradientStop {
  color: ColorRGBA;
  position: number;  // 0-1
}

export interface GradientData {
  type: 'LINEAR' | 'RADIAL' | 'ANGULAR' | 'DIAMOND';
  stops: GradientStop[];
  transform?: number[][];
  geometry?: {
    start?: [number, number];
    end?: [number, number];
    angle?: number;
    center?: [number, number];
    radius?: [number, number];
    rotation?: number;
  };
}

export interface BackgroundFill {
  color?: ColorRGBA;
  gradient?: GradientData;
  originalIndex: number;
}

// ==================== BORDERS ====================

export interface BorderWidths {
  top: number;
  right: number;
  bottom: number;
  left: number;
}

export interface Border {
  widths?: BorderWidths;
  colors?: ColorRGBA[];
  align?: string;
  cap?: string;
  join?: string;
  miterAngle?: number;
}

// ==================== EFFECTS ====================

export interface DropShadow {
  x: number;
  y: number;
  blur: number;
  radius?: number;  // Alias for blur
  spread: number;
  color: ColorRGBA;
  blendMode?: string;
  showBehind?: boolean;
  type?: 'DROP_SHADOW' | 'INNER_SHADOW';
}

// ==================== IMAGE METADATA ====================

export interface ImageMetadata {
  // Storage URLs
  s3Key?: string;
  s3Url?: string;
  googleCloudUrl?: string;

  // Identity
  label?: string | number;

  // AI-generated metadata
  shortTitle?: string;    // AI-generated filename (e.g., "hero-background")
  title?: string;         // Final display title (from shortTitle or manual)
  description?: string;   // AI-generated description for alt text

  // Rendering properties
  scalingFactor?: number;
  rotation?: number;

  // Composite-specific properties
  format?: string;        // Image format (e.g., 'png', 'jpg')
  width?: number;         // Image width in pixels
  height?: number;        // Image height in pixels
  scale?: number;         // Scaling factor for display
  screenshots?: {         // Composite screenshot variations
    isolated: string;     // Isolated screenshot URL/path
    full: string;         // Full context screenshot URL/path
  };
}

// ==================== COMPOSITE METADATA ====================

export interface CompositeMetadata {
  compositeName?: string;
  compositeType?: string;
  compositeAlt?: string;
  elementNodeIds?: string[];
  ancestorNodeId?: string;
  isComposite?: boolean;
  processedAt?: string;
}

// ==================== MAIN ELEMENT TYPE ====================

/**
 * Unified Element type used across plugin and backend
 *
 * IDs are strings to accommodate:
 * - Numeric strings ("1", "2", "3")
 * - Figma node IDs ("1:24")
 * - UUIDs for database/export targets
 *
 * Use camelCase throughout
 */
export interface Element {
  // ==================== CORE IDENTIFICATION ====================

  id: string;                    // String ID: "1", "2", "3" or Figma IDs
  parentId: string | null;       // String parent ID
  figmaNodeId?: string;          // Original Figma API node ID

  type: ElementType | string;
  name: string;
  level?: number;

  // ==================== POSITION & DIMENSIONS ====================

  /**
   * Element bounds with actual frame-relative position.
   * x, y = position relative to containing frame
   * width, height = element dimensions
   */
  bounds: Bounds;

  /**
   * Transform matrix with position relative to containing FRAME.
   *
   * Format: [[cos(θ), -sin(θ), tx], [sin(θ), cos(θ), ty]]
   * - Position: tx = [0][2], ty = [1][2] (relative to FRAME origin)
   * - Rotation: θ = atan2([1][0], [0][0])
   *
   * Calculated from Figma's absoluteTransform by subtracting frame's position.
   * This works uniformly for ALL elements - no GROUP vs FRAME complexity!
   * All elements position relative to the root FRAME.
   */
  relativeTransform?: [[number, number, number], [number, number, number]];

  /**
   * @deprecated Use relativeTransform instead. Kept for backward compatibility.
   */
  rotation?: number;
  opacity?: number;
  zIndex?: number;

  // ==================== VISUAL PROPERTIES ====================

  backgroundColors?: BackgroundFill[];
  borders?: Border;
  borderRadius?: number | number[] | string;
  dropShadows?: DropShadow[];

  // ==================== TEXT PROPERTIES ====================

  texts?: TextSegment[];
  textStyles?: TextStyle;
  textContent?: string;
  textAlign?: string;

  // ==================== IMAGE PROPERTIES ====================

  hasImages?: boolean;
  isVector?: boolean;
  isMaskGroup?: boolean;

  // ==================== LAYOUT ====================

  layoutMode?: 'HORIZONTAL' | 'VERTICAL' | 'GRID' | 'NONE';
  /**
   * For children of auto-layout frames:
   * - 'AUTO': positioned by auto-layout flow
   * - 'ABSOLUTE': manually positioned, ignores auto-layout
   */
  layoutPositioning?: 'AUTO' | 'ABSOLUTE';
  overflow?: boolean;
  itemReverseZIndex?: boolean;

  // ==================== AUTO LAYOUT CONTAINER PROPERTIES ====================

  /**
   * How the frame sizes itself along the primary axis
   * - 'FIXED': explicit width/height
   * - 'AUTO': hug contents
   */
  primaryAxisSizingMode?: 'FIXED' | 'AUTO';
  /**
   * How the frame sizes itself along the counter axis
   * - 'FIXED': explicit width/height
   * - 'AUTO': hug contents
   */
  counterAxisSizingMode?: 'FIXED' | 'AUTO';
  /**
   * Alignment of children along primary axis (justify-content)
   * - 'MIN': flex-start
   * - 'CENTER': center
   * - 'MAX': flex-end
   * - 'SPACE_BETWEEN': space-between
   */
  primaryAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'SPACE_BETWEEN';
  /**
   * Alignment of children along counter axis (align-items)
   * - 'MIN': flex-start
   * - 'CENTER': center
   * - 'MAX': flex-end
   * - 'BASELINE': baseline
   */
  counterAxisAlignItems?: 'MIN' | 'CENTER' | 'MAX' | 'BASELINE';
  /** Padding - top */
  paddingTop?: number;
  /** Padding - right */
  paddingRight?: number;
  /** Padding - bottom */
  paddingBottom?: number;
  /** Padding - left */
  paddingLeft?: number;
  /** Gap between items (itemSpacing in Figma) */
  itemSpacing?: number;
  /** Flex wrap behavior */
  layoutWrap?: 'NO_WRAP' | 'WRAP';
  /** Gap between wrapped rows/columns (only when layoutWrap is 'WRAP') */
  counterAxisSpacing?: number;

  // ==================== AUTO LAYOUT CHILD PROPERTIES ====================

  /**
   * How child sizes horizontally in auto-layout parent
   * - 'FIXED': explicit width
   * - 'HUG': hug contents
   * - 'FILL': fill available space (flex-grow)
   */
  layoutSizingHorizontal?: 'FIXED' | 'HUG' | 'FILL';
  /**
   * How child sizes vertically in auto-layout parent
   * - 'FIXED': explicit height
   * - 'HUG': hug contents
   * - 'FILL': fill available space (flex-grow)
   */
  layoutSizingVertical?: 'FIXED' | 'HUG' | 'FILL';
  /**
   * Cross-axis alignment override for this child
   * - 'INHERIT': use parent's counterAxisAlignItems
   * - 'STRETCH': stretch to fill cross-axis
   */
  layoutAlign?: 'INHERIT' | 'STRETCH';
  /**
   * Whether child should grow to fill remaining space
   * - 0: don't grow
   * - 1: grow to fill
   */
  layoutGrow?: number;

  // ==================== METADATA ====================

  frameId?: string;
  frameIndex?: number;
  imgMetadata?: ImageMetadata;
  compositeMetadata?: CompositeMetadata;
  processingData?: ProcessingData;
  htmlTag?: string;
  isMask?: boolean;

  // ==================== LINK PROPERTIES ====================

  href?: string;  // Link URL for anchor/button elements

  // ==================== HIERARCHY ====================

  children?: Element[];
}

// ==================== BACKEND PROCESSING TYPES ====================

/**
 * Backend processing metadata
 */
export interface ProcessingData {
  relativeProperties?: {
    relativeX: number;
    relativeY: number;
    relativeRotation: number;
  };
  semanticLabel?: string | null;  // Inferred semantic name like "button_bg", "border_rectangle"
  shortTitle?: string | null;
  isShape?: boolean;
  isBordered?: boolean;
  isFilled?: boolean;
  hasText?: boolean;
  isImage?: boolean;
  zIndex?: number;
  behindOf?: string[] | null;
}

/**
 * ProcessedElement - Element with backend processing metadata
 * Extends Element with backend-specific fields
 */
export interface ProcessedElement extends Omit<Element, 'children'> {
  // Backend adds processing data
  processingData?: ProcessingData;
  imgMetadata?: ImageMetadata;
  compositeMetadata?: CompositeMetadata;

  // Backend may add HTML generation hints
  htmlTag?: string;

  // Composite-specific properties (added during composite processing)
  isComposite?: boolean;
  replacedElements?: string[];

  // Hierarchy with processed children (STRICTLY typed)
  children?: ProcessedElement[];
}

// ==================== TYPE GUARDS ====================

