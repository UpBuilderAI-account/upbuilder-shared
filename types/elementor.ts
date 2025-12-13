// ============================================================================
// ELEMENTOR BUILDER EXPORT TYPES
// Shared types and constants for Elementor template conversion
// Based on Elementor's new Flexbox Container system with $$type notation
// ============================================================================

// -----------------------------------------------------------------------------
// Element Types
// -----------------------------------------------------------------------------

export type ElementorElType =
  | 'e-flexbox'      // Section/Container wrapper
  | 'e-div-block'    // Column/Group wrapper
  | 'container'      // Native Flexbox Container
  | 'widget';        // Leaf node (actual content)

export type ElementorWidgetType =
  | 'e-heading'
  | 'e-paragraph'
  | 'e-button'
  | 'e-image'
  | 'e-svg'
  | 'e-divider'
  | 'nav-menu'
  | 'form'
  | 'google_maps'
  | 'social-icons'
  | 'testimonial-carousel'
  | 'price-list'
  | 'nested-accordion'
  | 'nested-carousel';

export const ELEMENTOR_EL_TYPES: ElementorElType[] = [
  'e-flexbox',
  'e-div-block',
  'container',
  'widget'
];

export const ELEMENTOR_WIDGET_TYPES: ElementorWidgetType[] = [
  'e-heading',
  'e-paragraph',
  'e-button',
  'e-image',
  'e-svg',
  'e-divider',
  'nav-menu',
  'form',
  'google_maps',
  'social-icons',
  'testimonial-carousel',
  'price-list',
  'nested-accordion',
  'nested-carousel'
];

// -----------------------------------------------------------------------------
// Responsive Breakpoints
// -----------------------------------------------------------------------------

export type ElementorBreakpoint = 'desktop' | 'tablet' | 'mobile';

export interface ElementorBreakpointInfo {
  name: ElementorBreakpoint;
  maxWidth: number | null;
}

export const ELEMENTOR_BREAKPOINTS: ElementorBreakpointInfo[] = [
  { name: 'desktop', maxWidth: null },
  { name: 'tablet', maxWidth: 1024 },
  { name: 'mobile', maxWidth: 767 }
];

// -----------------------------------------------------------------------------
// Typed Property System ($$type notation)
// -----------------------------------------------------------------------------

export interface ElementorTypedSize {
  '$$type': 'size';
  value: {
    unit: 'px' | '%' | 'rem' | 'em' | 'vw' | 'vh';
    size: number;
  };
}

export interface ElementorTypedColor {
  '$$type': 'color';
  value: string;  // Hex or rgba
}

export interface ElementorTypedString {
  '$$type': 'string';
  value: string;
}

export interface ElementorTypedClasses {
  '$$type': 'classes';
  value: string[];  // Array of class IDs (e-xxx or g-xxx)
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

// Union of all typed values
export type ElementorTypedValue =
  | ElementorTypedSize
  | ElementorTypedColor
  | ElementorTypedString
  | ElementorTypedClasses
  | ElementorTypedDimensions
  | ElementorTypedBackground
  | ElementorTypedImage
  | ElementorTypedBoxShadow
  | ElementorTypedTransform;

// -----------------------------------------------------------------------------
// Style Variant System
// -----------------------------------------------------------------------------

export interface ElementorStyleVariant {
  meta: {
    breakpoint: ElementorBreakpoint;
    state: 'hover' | 'active' | 'focus' | null;
  };
  props: Record<string, ElementorTypedValue>;
  custom_css: string | null;
}

export interface ElementorStyleClass {
  id: string;           // e.g., "e-1b323651-81c26ef" or "g-869e9b6"
  label: 'local' | 'global';
  type: 'class';
  variants: ElementorStyleVariant[];
}

// -----------------------------------------------------------------------------
// Element Settings
// -----------------------------------------------------------------------------

export interface ElementorSettings {
  // Classes reference
  classes?: ElementorTypedClasses;

  // Semantic HTML tag override
  tag?: ElementorTypedString;

  // Content settings (widget-specific)
  title?: ElementorTypedString;        // e-heading
  paragraph?: ElementorTypedString;    // e-paragraph
  text?: ElementorTypedString;         // e-button
  image?: ElementorTypedImage;         // e-image
  svg?: ElementorTypedImageSrc;        // e-svg

  // Link settings
  link?: {
    '$$type': 'link';
    value: {
      url: string;
      is_external: boolean;
      nofollow: boolean;
    };
  };

  // Nav menu specific
  menu_name?: string;
  menu_id?: number;

  // Form specific
  form_fields?: any[];

  // Map specific
  address?: string;

  // Generic settings index
  [key: string]: any;
}

// -----------------------------------------------------------------------------
// Core Element Interface
// -----------------------------------------------------------------------------

export interface ElementorElement {
  id: string;                          // 6-8 char hex ID
  settings: ElementorSettings;
  elements: ElementorElement[];        // Child elements (recursive)
  isInner: boolean;                    // Inner container flag
  elType: ElementorElType;             // Container type
  widgetType?: ElementorWidgetType;    // Widget type (only for elType: 'widget')
  styles: Record<string, ElementorStyleClass>;  // Inline style definitions
  editor_settings: any[];
  version: string;                     // Usually "0.0"
}

// -----------------------------------------------------------------------------
// Template Root Structure
// -----------------------------------------------------------------------------

export interface ElementorTemplate {
  content: ElementorElement[];
  page_settings: {
    hide_title?: boolean;
    [key: string]: any;
  };
  version: string;       // e.g., "0.4"
  title: string;
  type: 'page' | 'section' | 'popup';
}

// -----------------------------------------------------------------------------
// Compressed Format (for AI generation)
// -----------------------------------------------------------------------------

export interface ElementorCompressedSection {
  compressed: string;
  elementCount: number;
  hasGlobalClasses: boolean;
}

// -----------------------------------------------------------------------------
// Prompt Generation Helpers
// -----------------------------------------------------------------------------

export const ELEMENTOR_EL_TYPES_LIST = {
  containers: ['e-flexbox', 'e-div-block', 'container'],
  widgets: {
    text: ['e-heading', 'e-paragraph'],
    media: ['e-image', 'e-svg', 'e-button'],
    interactive: ['nav-menu', 'form', 'social-icons'],
    advanced: ['nested-accordion', 'nested-carousel', 'testimonial-carousel']
  }
} as const;

export const ELEMENTOR_EL_TYPES_FOR_PROMPT = `**Containers:**
- e-flexbox (Section/Row)
- e-div-block (Column/Group)
- container (Native Container)

**Widgets:**
- Text: e-heading, e-paragraph
- Media: e-image, e-svg, e-button, e-divider
- Interactive: nav-menu, form, social-icons
- Advanced: nested-accordion, nested-carousel`;

export const ELEMENTOR_STYLE_PROPERTIES_FOR_PROMPT = `**Size/Layout:**
- width, height, min-width, max-width ($$type: "size")
- display, position ($$type: "string")

**Box Model (Logical Properties):**
- padding: { block-start, block-end, inline-start, inline-end }
- margin: { block-start, block-end, inline-start, inline-end }
- border-radius ($$type: "size")

**Colors:**
- color, background-color ($$type: "color")
- background: { color, image } ($$type: "background")

**Typography:**
- font-family, font-weight ($$type: "string")
- font-size, line-height ($$type: "size")

**Flexbox:**
- display: "flex" | "block" | "inline-block"
- justify-content: "flex-start" | "center" | "flex-end" | "space-between"
- align-items: "start" | "center" | "end"
- align-self: "start" | "center" | "end"

**Effects:**
- box-shadow ($$type: "box-shadow")
- transform ($$type: "transform")`;

export const ELEMENTOR_BREAKPOINTS_FOR_PROMPT = ELEMENTOR_BREAKPOINTS.map(bp =>
  bp.maxWidth
    ? `- ${bp.name} - max-width: ${bp.maxWidth}px`
    : `- ${bp.name} (default, no media query)`
).join('\n');
