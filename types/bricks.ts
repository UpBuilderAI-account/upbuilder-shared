// ============================================================================
// BRICKS BUILDER EXPORT TYPES
// Shared types and constants for Bricks Builder template conversion
// ============================================================================

// -----------------------------------------------------------------------------
// Element Types
// -----------------------------------------------------------------------------

export type BricksElementType =
  | 'section'
  | 'container'
  | 'block'
  | 'div'
  | 'heading'
  | 'text-basic'
  | 'text-link'
  | 'image'
  | 'icon'
  | 'button'
  | 'nav-menu'
  | 'logo';

// Runtime array for iteration
export const BRICKS_ELEMENT_TYPES: BricksElementType[] = [
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

// -----------------------------------------------------------------------------
// Responsive Breakpoints
// -----------------------------------------------------------------------------

export type BricksBreakpoint =
  | 'desktop'
  | 'tablet_portrait'
  | 'mobile_landscape'
  | 'mobile_portrait';

export interface BricksBreakpointInfo {
  name: BricksBreakpoint;
  suffix: string;
  maxWidth: number | null;
}

export const BRICKS_BREAKPOINTS: BricksBreakpointInfo[] = [
  { name: 'desktop', suffix: '', maxWidth: null },
  { name: 'tablet_portrait', suffix: ':tablet_portrait', maxWidth: 991 },
  { name: 'mobile_landscape', suffix: ':mobile_landscape', maxWidth: 767 },
  { name: 'mobile_portrait', suffix: ':mobile_portrait', maxWidth: 479 }
];

// Responsive breakpoints only (excludes desktop)
export const BRICKS_RESPONSIVE_BREAKPOINTS = BRICKS_BREAKPOINTS.filter(
  bp => bp.name !== 'desktop'
);

// Suffixes for detection
export const BRICKS_RESPONSIVE_SUFFIXES = BRICKS_RESPONSIVE_BREAKPOINTS.map(bp => bp.suffix);

// -----------------------------------------------------------------------------
// Style Properties
// -----------------------------------------------------------------------------

export type BricksStyleProperty =
  | '_display'
  | '_position'
  | '_width'
  | '_height'
  | '_margin'
  | '_padding'
  | '_background'
  | '_border'
  | '_typography'
  | '_gap'
  | '_flexDirection'
  | '_alignItems'
  | '_justifyContent';

export const BRICKS_STYLE_PROPERTIES: BricksStyleProperty[] = [
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
// Core Interfaces
// -----------------------------------------------------------------------------

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
  // Content
  text?: string;
  tag?: string;

  // Image
  image?: BricksImageSettings;

  // Icon
  icon?: BricksIconSettings;

  // Link/Button
  link?: BricksLinkSettings;
  style?: string;

  // Bricks-specific style properties (prefixed with _)
  _display?: string;
  _position?: string;
  _width?: string;
  _height?: string;
  _margin?: BricksSpacingObject;
  _padding?: BricksSpacingObject;
  _background?: any;
  _border?: any;
  _typography?: any;

  // Responsive variants (with :breakpoint suffix)
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

// -----------------------------------------------------------------------------
// Prompt Generation Helpers
// -----------------------------------------------------------------------------

export const BRICKS_ELEMENT_TYPES_LIST = {
  layout: ['section', 'container', 'block', 'div'],
  text: ['heading', 'text-basic', 'text-link'],
  media: ['image', 'icon', 'button'],
  navigation: ['nav-menu', 'logo']
} as const;

export const BRICKS_ELEMENT_TYPES_FOR_PROMPT = `- ${BRICKS_ELEMENT_TYPES_LIST.layout.join(', ')}
- ${BRICKS_ELEMENT_TYPES_LIST.text.join(', ')}
- ${BRICKS_ELEMENT_TYPES_LIST.media.join(', ')}
- ${BRICKS_ELEMENT_TYPES_LIST.navigation.join(', ')}`;

export const BRICKS_STYLE_PROPERTIES_FOR_PROMPT = `- _display, _position, _width, _height
- _margin="top,right,bottom,left"
- _padding="top,right,bottom,left"
- _background, _border, _typography
- Responsive: _property:tablet_portrait, _property:mobile_landscape`;

export const BRICKS_BREAKPOINTS_FOR_PROMPT = BRICKS_BREAKPOINTS.map(bp =>
  bp.maxWidth
    ? `- ${bp.name} (${bp.suffix}) - max-width: ${bp.maxWidth}px`
    : `- ${bp.name} (default, no suffix)`
).join('\n');
