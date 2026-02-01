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
/** Figma variable reference attached to a color */
export interface FigmaVariableRef {
    id: string;
    name: string;
    collectionName: string;
}
/** A complete Figma color variable with all mode values */
export interface FigmaColorVariable {
    id: string;
    name: string;
    collectionId: string;
    collectionName: string;
    /** Values per mode: { "Light": {r,g,b,a}, "Dark": {r,g,b,a} } */
    modeValues: Record<string, ColorRGBA>;
}
/** A collection of Figma variables */
export interface FigmaVariableCollection {
    id: string;
    name: string;
    modes: {
        id: string;
        name: string;
    }[];
    defaultModeId: string;
}
export interface ColorRGBA {
    r: number;
    g: number;
    b: number;
    a: number;
    colorId?: string;
    /** Figma variable reference (if color is bound to a variable) */
    variableRef?: FigmaVariableRef;
}
export interface Font {
    name?: string;
    size?: number;
    sizeUnit?: SizeUnit;
    weight?: number;
    style?: 'normal' | 'italic' | 'oblique';
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
    /** Gradient data for gradient text fills (background-clip: text) */
    gradient?: GradientData;
}
export interface TextStyle {
    fontFamily?: string;
    fontSize?: number;
    fontWeight?: number;
    fontStyle?: 'normal' | 'italic' | 'oblique';
    lineHeight?: number;
    letterSpacing?: number;
    textAlign?: string;
    textDecoration?: string;
    textTransform?: string;
    color?: ColorRGBA;
    /**
     * Text auto-resize mode from Figma
     * - NONE: fixed width & height
     * - WIDTH_AND_HEIGHT: hug contents (width: fit-content)
     * - HEIGHT: fixed width, auto height
     * - TRUNCATE: fixed size with text-overflow: ellipsis
     */
    textAutoResize?: 'NONE' | 'WIDTH_AND_HEIGHT' | 'HEIGHT' | 'TRUNCATE';
    /**
     * Text truncation mode
     * - DISABLED: no truncation
     * - ENDING: truncate with ellipsis
     */
    textTruncation?: 'DISABLED' | 'ENDING';
    /** Maximum number of lines before truncation (for -webkit-line-clamp) */
    maxLines?: number;
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
    /** Stroke alignment: CENTER (default), INSIDE, OUTSIDE */
    align?: 'CENTER' | 'INSIDE' | 'OUTSIDE';
    cap?: string;
    join?: string;
    miterAngle?: number;
    /** Dash pattern [dash, gap] for dashed/dotted borders */
    dashPattern?: number[];
    /** Gradient data for gradient borders */
    gradients?: GradientData[];
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
/**
 * Blur effect (layer blur or background blur)
 * - LAYER_BLUR → CSS filter: blur(Xpx)
 * - BACKGROUND_BLUR → CSS backdrop-filter: blur(Xpx)
 */
export interface BlurEffect {
    type: 'LAYER_BLUR' | 'BACKGROUND_BLUR';
    radius: number;
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
    /**
     * Blend mode for layer compositing
     * Maps to CSS mix-blend-mode
     */
    blendMode?: string;
    backgroundColors?: BackgroundFill[];
    borders?: Border;
    borderRadius?: number | number[] | string;
    dropShadows?: DropShadow[];
    /** Blur effects (layer blur, background blur) */
    blurEffects?: BlurEffect[];
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