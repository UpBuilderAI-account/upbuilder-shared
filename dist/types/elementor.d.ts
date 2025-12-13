export type ElementorElType = 'e-flexbox' | 'e-div-block' | 'container' | 'widget';
export type ElementorWidgetType = 'e-heading' | 'e-paragraph' | 'e-button' | 'e-image' | 'e-svg' | 'e-divider' | 'nav-menu' | 'form' | 'google_maps' | 'social-icons' | 'testimonial-carousel' | 'price-list' | 'nested-accordion' | 'nested-carousel';
export declare const ELEMENTOR_EL_TYPES: ElementorElType[];
export declare const ELEMENTOR_WIDGET_TYPES: ElementorWidgetType[];
export type ElementorBreakpoint = 'desktop' | 'tablet' | 'mobile';
export interface ElementorBreakpointInfo {
    name: ElementorBreakpoint;
    maxWidth: number | null;
}
export declare const ELEMENTOR_BREAKPOINTS: ElementorBreakpointInfo[];
export interface ElementorTypedSize {
    '$$type': 'size';
    value: {
        unit: 'px' | '%' | 'rem' | 'em' | 'vw' | 'vh';
        size: number;
    };
}
export interface ElementorTypedColor {
    '$$type': 'color';
    value: string;
}
export interface ElementorTypedString {
    '$$type': 'string';
    value: string;
}
export interface ElementorTypedClasses {
    '$$type': 'classes';
    value: string[];
}
export interface ElementorTypedDimensions {
    '$$type': 'dimensions';
    value: {
        'block-start'?: ElementorTypedSize;
        'block-end'?: ElementorTypedSize;
        'inline-start'?: ElementorTypedSize;
        'inline-end'?: ElementorTypedSize;
    };
}
export interface ElementorTypedBackground {
    '$$type': 'background';
    value: {
        color?: ElementorTypedColor;
        image?: {
            src: ElementorTypedImageSrc;
        };
        'background-overlay'?: {
            '$$type': 'background-overlay';
            value: any[];
        };
    };
}
export interface ElementorTypedImageSrc {
    '$$type': 'image-src';
    value: {
        id?: {
            '$$type': 'image-attachment-id';
            value: number;
        };
        url: {
            '$$type': 'url';
            value: string;
        };
    };
}
export interface ElementorTypedImage {
    '$$type': 'image';
    value: {
        src: ElementorTypedImageSrc;
    };
}
export interface ElementorTypedShadow {
    '$$type': 'shadow';
    value: {
        hOffset: ElementorTypedSize;
        vOffset: ElementorTypedSize;
        blur: ElementorTypedSize;
        spread: ElementorTypedSize;
        color: ElementorTypedColor;
    };
}
export interface ElementorTypedBoxShadow {
    '$$type': 'box-shadow';
    value: ElementorTypedShadow[];
}
export interface ElementorTypedTransform {
    '$$type': 'transform';
    value: {
        'transform-functions': {
            '$$type': 'transform-functions';
            value: any[];
        };
    };
}
export type ElementorTypedValue = ElementorTypedSize | ElementorTypedColor | ElementorTypedString | ElementorTypedClasses | ElementorTypedDimensions | ElementorTypedBackground | ElementorTypedImage | ElementorTypedBoxShadow | ElementorTypedTransform;
export interface ElementorStyleVariant {
    meta: {
        breakpoint: ElementorBreakpoint;
        state: 'hover' | 'active' | 'focus' | null;
    };
    props: Record<string, ElementorTypedValue>;
    custom_css: string | null;
}
export interface ElementorStyleClass {
    id: string;
    label: 'local' | 'global';
    type: 'class';
    variants: ElementorStyleVariant[];
}
export interface ElementorSettings {
    classes?: ElementorTypedClasses;
    tag?: ElementorTypedString;
    title?: ElementorTypedString;
    paragraph?: ElementorTypedString;
    text?: ElementorTypedString;
    image?: ElementorTypedImage;
    svg?: ElementorTypedImageSrc;
    link?: {
        '$$type': 'link';
        value: {
            url: string;
            is_external: boolean;
            nofollow: boolean;
        };
    };
    menu_name?: string;
    menu_id?: number;
    form_fields?: any[];
    address?: string;
    [key: string]: any;
}
export interface ElementorElement {
    id: string;
    settings: ElementorSettings;
    elements: ElementorElement[];
    isInner: boolean;
    elType: ElementorElType;
    widgetType?: ElementorWidgetType;
    styles: Record<string, ElementorStyleClass>;
    editor_settings: any[];
    version: string;
}
export interface ElementorTemplate {
    content: ElementorElement[];
    page_settings: {
        hide_title?: boolean;
        [key: string]: any;
    };
    version: string;
    title: string;
    type: 'page' | 'section' | 'popup';
}
export interface ElementorCompressedSection {
    compressed: string;
    elementCount: number;
    hasGlobalClasses: boolean;
}
export declare const ELEMENTOR_EL_TYPES_LIST: {
    readonly containers: readonly ["e-flexbox", "e-div-block", "container"];
    readonly widgets: {
        readonly text: readonly ["e-heading", "e-paragraph"];
        readonly media: readonly ["e-image", "e-svg", "e-button"];
        readonly interactive: readonly ["nav-menu", "form", "social-icons"];
        readonly advanced: readonly ["nested-accordion", "nested-carousel", "testimonial-carousel"];
    };
};
export declare const ELEMENTOR_EL_TYPES_FOR_PROMPT = "**Containers:**\n- e-flexbox (Section/Row)\n- e-div-block (Column/Group)\n- container (Native Container)\n\n**Widgets:**\n- Text: e-heading, e-paragraph\n- Media: e-image, e-svg, e-button, e-divider\n- Interactive: nav-menu, form, social-icons\n- Advanced: nested-accordion, nested-carousel";
export declare const ELEMENTOR_STYLE_PROPERTIES_FOR_PROMPT = "**Size/Layout:**\n- width, height, min-width, max-width ($$type: \"size\")\n- display, position ($$type: \"string\")\n\n**Box Model (Logical Properties):**\n- padding: { block-start, block-end, inline-start, inline-end }\n- margin: { block-start, block-end, inline-start, inline-end }\n- border-radius ($$type: \"size\")\n\n**Colors:**\n- color, background-color ($$type: \"color\")\n- background: { color, image } ($$type: \"background\")\n\n**Typography:**\n- font-family, font-weight ($$type: \"string\")\n- font-size, line-height ($$type: \"size\")\n\n**Flexbox:**\n- display: \"flex\" | \"block\" | \"inline-block\"\n- justify-content: \"flex-start\" | \"center\" | \"flex-end\" | \"space-between\"\n- align-items: \"start\" | \"center\" | \"end\"\n- align-self: \"start\" | \"center\" | \"end\"\n\n**Effects:**\n- box-shadow ($$type: \"box-shadow\")\n- transform ($$type: \"transform\")";
export declare const ELEMENTOR_BREAKPOINTS_FOR_PROMPT: string;
//# sourceMappingURL=elementor.d.ts.map