"use strict";
// ============================================================================
// ELEMENTOR BUILDER EXPORT TYPES
// Shared types and constants for Elementor template conversion
// Based on Elementor's new Flexbox Container system with $$type notation
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.ELEMENTOR_BREAKPOINTS_FOR_PROMPT = exports.ELEMENTOR_STYLE_PROPERTIES_FOR_PROMPT = exports.ELEMENTOR_EL_TYPES_FOR_PROMPT = exports.ELEMENTOR_EL_TYPES_LIST = exports.ELEMENTOR_BREAKPOINTS = exports.ELEMENTOR_WIDGET_TYPES = exports.ELEMENTOR_EL_TYPES = void 0;
exports.ELEMENTOR_EL_TYPES = [
    'e-flexbox',
    'e-div-block',
    'container',
    'widget'
];
exports.ELEMENTOR_WIDGET_TYPES = [
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
exports.ELEMENTOR_BREAKPOINTS = [
    { name: 'desktop', maxWidth: null },
    { name: 'tablet', maxWidth: 1024 },
    { name: 'mobile', maxWidth: 767 }
];
// -----------------------------------------------------------------------------
// Prompt Generation Helpers
// -----------------------------------------------------------------------------
exports.ELEMENTOR_EL_TYPES_LIST = {
    containers: ['e-flexbox', 'e-div-block', 'container'],
    widgets: {
        text: ['e-heading', 'e-paragraph'],
        media: ['e-image', 'e-svg', 'e-button'],
        interactive: ['nav-menu', 'form', 'social-icons'],
        advanced: ['nested-accordion', 'nested-carousel', 'testimonial-carousel']
    }
};
exports.ELEMENTOR_EL_TYPES_FOR_PROMPT = `**Containers:**
- e-flexbox (Section/Row)
- e-div-block (Column/Group)
- container (Native Container)

**Widgets:**
- Text: e-heading, e-paragraph
- Media: e-image, e-svg, e-button, e-divider
- Interactive: nav-menu, form, social-icons
- Advanced: nested-accordion, nested-carousel`;
exports.ELEMENTOR_STYLE_PROPERTIES_FOR_PROMPT = `**Size/Layout:**
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
exports.ELEMENTOR_BREAKPOINTS_FOR_PROMPT = exports.ELEMENTOR_BREAKPOINTS.map(bp => bp.maxWidth
    ? `- ${bp.name} - max-width: ${bp.maxWidth}px`
    : `- ${bp.name} (default, no media query)`).join('\n');
