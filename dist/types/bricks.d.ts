export type BricksElementType = 'section' | 'container' | 'block' | 'div' | 'heading' | 'text-basic' | 'text-link' | 'image' | 'icon' | 'button' | 'nav-menu' | 'logo';
export declare const BRICKS_ELEMENT_TYPES: BricksElementType[];
export type BricksBreakpoint = 'desktop' | 'tablet_portrait' | 'mobile_landscape' | 'mobile_portrait';
export interface BricksBreakpointInfo {
    name: BricksBreakpoint;
    suffix: string;
    maxWidth: number | null;
}
export declare const BRICKS_BREAKPOINTS: BricksBreakpointInfo[];
export declare const BRICKS_RESPONSIVE_BREAKPOINTS: BricksBreakpointInfo[];
export declare const BRICKS_RESPONSIVE_SUFFIXES: string[];
export type BricksStyleProperty = '_display' | '_position' | '_width' | '_height' | '_margin' | '_padding' | '_background' | '_border' | '_typography' | '_gap' | '_flexDirection' | '_alignItems' | '_justifyContent';
export declare const BRICKS_STYLE_PROPERTIES: BricksStyleProperty[];
export interface BricksSpacingObject {
    top: string;
    right: string;
    bottom: string;
    left: string;
}
export interface BricksImageSettings {
    url: string;
    alt?: string;
    id?: number | null;
    filename?: string;
}
export interface BricksIconSettings {
    library: string;
    icon?: string;
    svg?: {
        id: number;
        filename: string;
        url: string;
    };
}
export interface BricksLinkSettings {
    type?: string;
    url?: string;
    newTab?: boolean;
}
export interface BricksSettings {
    text?: string;
    tag?: string;
    image?: BricksImageSettings;
    icon?: BricksIconSettings;
    link?: BricksLinkSettings;
    style?: string;
    _display?: string;
    _position?: string;
    _width?: string;
    _height?: string;
    _margin?: BricksSpacingObject;
    _padding?: BricksSpacingObject;
    _background?: any;
    _border?: any;
    _typography?: any;
    [key: string]: any;
}
export interface BricksElement {
    id: string;
    name: string;
    settings: BricksSettings;
    children: string[];
    parent: string | number;
    label?: string;
}
export interface BricksTemplate {
    id: number;
    name: string;
    title: string;
    date: string;
    date_formatted: string;
    author: {
        name: string;
        avatar: string;
        url: string;
    };
    permalink: string;
    thumbnail: null;
    bundles: any[];
    tags: any[];
    type: string;
    content: BricksElement[];
    templateType: string;
}
export interface BricksCompressedSection {
    compressed: string;
    elementCount: number;
    responsive: boolean;
}
export declare const BRICKS_ELEMENT_TYPES_LIST: {
    readonly layout: readonly ["section", "container", "block", "div"];
    readonly text: readonly ["heading", "text-basic", "text-link"];
    readonly media: readonly ["image", "icon", "button"];
    readonly navigation: readonly ["nav-menu", "logo"];
};
export declare const BRICKS_ELEMENT_TYPES_FOR_PROMPT: string;
export declare const BRICKS_STYLE_PROPERTIES_FOR_PROMPT = "- _display, _position, _width, _height\n- _margin=\"top,right,bottom,left\"\n- _padding=\"top,right,bottom,left\"\n- _background, _border, _typography\n- Responsive: _property:tablet_portrait, _property:mobile_landscape";
export declare const BRICKS_BREAKPOINTS_FOR_PROMPT: string;
//# sourceMappingURL=bricks.d.ts.map