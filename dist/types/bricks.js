"use strict";
// ============================================================================
// BRICKS BUILDER EXPORT TYPES
// Shared types and constants for Bricks Builder template conversion
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.BRICKS_BREAKPOINTS_FOR_PROMPT = exports.BRICKS_STYLE_PROPERTIES_FOR_PROMPT = exports.BRICKS_ELEMENT_TYPES_FOR_PROMPT = exports.BRICKS_ELEMENT_TYPES_LIST = exports.BRICKS_STYLE_PROPERTIES = exports.BRICKS_RESPONSIVE_SUFFIXES = exports.BRICKS_RESPONSIVE_BREAKPOINTS = exports.BRICKS_BREAKPOINTS = exports.BRICKS_ELEMENT_TYPES = void 0;
// Runtime array for iteration
exports.BRICKS_ELEMENT_TYPES = [
    'section',
    'container',
    'block',
    'div',
    'heading',
    'text-basic',
    'text-link',
    'image',
    'icon',
    'button',
    'nav-menu',
    'logo'
];
exports.BRICKS_BREAKPOINTS = [
    { name: 'desktop', suffix: '', maxWidth: null },
    { name: 'tablet_portrait', suffix: ':tablet_portrait', maxWidth: 991 },
    { name: 'mobile_landscape', suffix: ':mobile_landscape', maxWidth: 767 },
    { name: 'mobile_portrait', suffix: ':mobile_portrait', maxWidth: 479 }
];
// Responsive breakpoints only (excludes desktop)
exports.BRICKS_RESPONSIVE_BREAKPOINTS = exports.BRICKS_BREAKPOINTS.filter(bp => bp.name !== 'desktop');
// Suffixes for detection
exports.BRICKS_RESPONSIVE_SUFFIXES = exports.BRICKS_RESPONSIVE_BREAKPOINTS.map(bp => bp.suffix);
exports.BRICKS_STYLE_PROPERTIES = [
    '_display',
    '_position',
    '_width',
    '_height',
    '_margin',
    '_padding',
    '_background',
    '_border',
    '_typography',
    '_gap',
    '_flexDirection',
    '_alignItems',
    '_justifyContent'
];
// -----------------------------------------------------------------------------
// Prompt Generation Helpers
// -----------------------------------------------------------------------------
exports.BRICKS_ELEMENT_TYPES_LIST = {
    layout: ['section', 'container', 'block', 'div'],
    text: ['heading', 'text-basic', 'text-link'],
    media: ['image', 'icon', 'button'],
    navigation: ['nav-menu', 'logo']
};
exports.BRICKS_ELEMENT_TYPES_FOR_PROMPT = `- ${exports.BRICKS_ELEMENT_TYPES_LIST.layout.join(', ')}
- ${exports.BRICKS_ELEMENT_TYPES_LIST.text.join(', ')}
- ${exports.BRICKS_ELEMENT_TYPES_LIST.media.join(', ')}
- ${exports.BRICKS_ELEMENT_TYPES_LIST.navigation.join(', ')}`;
exports.BRICKS_STYLE_PROPERTIES_FOR_PROMPT = `- _display, _position, _width, _height
- _margin="top,right,bottom,left"
- _padding="top,right,bottom,left"
- _background, _border, _typography
- Responsive: _property:tablet_portrait, _property:mobile_landscape`;
exports.BRICKS_BREAKPOINTS_FOR_PROMPT = exports.BRICKS_BREAKPOINTS.map(bp => bp.maxWidth
    ? `- ${bp.name} (${bp.suffix}) - max-width: ${bp.maxWidth}px`
    : `- ${bp.name} (default, no suffix)`).join('\n');
