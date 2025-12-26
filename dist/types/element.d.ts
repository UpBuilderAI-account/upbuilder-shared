import type { Bounds } from './core-domain';
export declare enum ElementType {
    FRAME = "FRAME",
    TEXT = "TEXT",
    RECTANGLE = "RECTANGLE",
    VECTOR = "VECTOR",
    ELLIPSE = "ELLIPSE",
    POLYGON = "POLYGON",
    STAR = "STAR",
    INSTANCE = "INSTANCE",
    COMPONENT = "COMPONENT",
    GROUP = "GROUP",
    IMAGE = "IMAGE",
    ROW = "ROW",
    COLUMN = "COLUMN"
}
export declare enum SizeUnit {
    PIXELS = "PIXELS",
    PERCENT = "PERCENT"
}
export declare enum LineHeightUnit {
    PIXELS = "PIXELS",
    PERCENT = "PERCENT",
    AUTO = "AUTO"
}
export interface ColorRGBA {
    r: number;
    g: number;
    b: number;
    a: number;
    colorId?: string;
}
export interface Font {
    name?: string;
    size?: number;
    sizeUnit?: SizeUnit;
    weight?: number;
    lineHeight?: number;
    lineHeightUnit?: LineHeightUnit;
    letterSpacing?: number;
    letterSpacingUnit?: SizeUnit;
    textAlign?: string;
    decoration?: string;
    textTransform?: string;
    case?: string;
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
    lineHeight?: number;
    letterSpacing?: number;
    textAlign?: string;
    textDecoration?: string;
    textTransform?: string;
    color?: ColorRGBA;
}
export interface GradientStop {
    color: ColorRGBA;
    position: number;
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
export interface DropShadow {
    x: number;
    y: number;
    blur: number;
    radius?: number;
    spread: number;
    color: ColorRGBA;
    blendMode?: string;
    showBehind?: boolean;
    type?: 'DROP_SHADOW' | 'INNER_SHADOW';
}
export interface ImageMetadata {
    s3Key?: string;
    s3Url?: string;
    googleCloudUrl?: string;
    label?: string | number;
    shortTitle?: string;
    title?: string;
    description?: string;
    scalingFactor?: number;
    rotation?: number;
    format?: string;
    width?: number;
    height?: number;
    scale?: number;
    screenshots?: {
        isolated: string;
        full: string;
    };
}
export interface CompositeMetadata {
    compositeName?: string;
    compositeType?: string;
    compositeAlt?: string;
    elementNodeIds?: string[];
    ancestorNodeId?: string;
    isComposite?: boolean;
    processedAt?: string;
}
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
    id: string;
    parentId: string | null;
    figmaNodeId?: string;
    type: ElementType | string;
    name: string;
    level?: number;
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
    backgroundColors?: BackgroundFill[];
    borders?: Border;
    borderRadius?: number | number[] | string;
    dropShadows?: DropShadow[];
    texts?: TextSegment[];
    textStyles?: TextStyle;
    textContent?: string;
    textAlign?: string;
    hasImages?: boolean;
    isVector?: boolean;
    isMaskGroup?: boolean;
    layoutMode?: 'HORIZONTAL' | 'VERTICAL' | 'GRID' | 'NONE';
    /**
     * For children of auto-layout frames:
     * - 'AUTO': positioned by auto-layout flow
     * - 'ABSOLUTE': manually positioned, ignores auto-layout
     */
    layoutPositioning?: 'AUTO' | 'ABSOLUTE';
    overflow?: boolean;
    itemReverseZIndex?: boolean;
    frameId?: string;
    frameIndex?: number;
    imgMetadata?: ImageMetadata;
    compositeMetadata?: CompositeMetadata;
    processingData?: ProcessingData;
    htmlTag?: string;
    isMask?: boolean;
    href?: string;
    children?: Element[];
}
/**
 * Backend processing metadata
 */
export interface ProcessingData {
    relativeProperties?: {
        relativeX: number;
        relativeY: number;
        relativeRotation: number;
    };
    semanticLabel?: string | null;
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
    processingData?: ProcessingData;
    imgMetadata?: ImageMetadata;
    compositeMetadata?: CompositeMetadata;
    htmlTag?: string;
    isComposite?: boolean;
    replacedElements?: string[];
    children?: ProcessedElement[];
}
//# sourceMappingURL=element.d.ts.map