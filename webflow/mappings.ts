// ============================================================================
// WEBFLOW HTML TO COMPONENT MAPPINGS
// Maps HTML elements to Webflow component types
// Used by: design-assembler, section-builder, parsers
// ============================================================================

import type { WebflowComponentType } from './components';

// -----------------------------------------------------------------------------
// HTML Tag to Component Type Mapping
// -----------------------------------------------------------------------------

/**
 * Primary mapping from HTML tag to Webflow component type
 * Some tags have multiple possible mappings based on context
 */
export const HTML_TAG_TO_COMPONENT: Record<string, WebflowComponentType> = {
  // Structure
  div: 'Block',
  section: 'Section',
  main: 'Block',
  article: 'Block',
  aside: 'Block',
  header: 'Block',
  footer: 'Block',
  nav: 'Block', // Unless inside NavbarWrapper, then NavbarMenu

  // Typography
  h1: 'Heading',
  h2: 'Heading',
  h3: 'Heading',
  h4: 'Heading',
  h5: 'Heading',
  h6: 'Heading',
  p: 'Paragraph',
  span: 'Span',
  blockquote: 'Blockquote',

  // Text formatting
  strong: 'Strong',
  b: 'Strong',
  em: 'Emphasized',
  i: 'Emphasized',
  sup: 'Superscript',
  sub: 'Subscript',
  code: 'InlineCode',
  s: 'Strikethrough',
  del: 'Strikethrough',
  u: 'Underline',

  // Lists
  ul: 'List',
  ol: 'List',
  li: 'ListItem',

  // Links
  a: 'Link',

  // Media
  img: 'Image',
  svg: 'HtmlEmbed',
  video: 'HtmlEmbed',
  iframe: 'HtmlEmbed',

  // Forms
  form: 'FormForm',
  input: 'FormTextInput', // Type determines specific component
  textarea: 'FormTextarea',
  select: 'FormSelect',
  button: 'Button',
  label: 'FormBlockLabel',

  // Other
  br: 'LineBreak',
  hr: 'Block', // No direct equivalent, use styled Block
  figure: 'Figure',
  figcaption: 'Figcaption',
} as const;

// -----------------------------------------------------------------------------
// Context-Aware Mapping Rules
// -----------------------------------------------------------------------------

export interface MappingContext {
  /** Parent component type (if known) */
  parentType?: WebflowComponentType;
  /** HTML classes on the element */
  classes?: string[];
  /** HTML attributes */
  attributes?: Record<string, string>;
  /** CSS display value */
  display?: string;
  /** Whether element is inside a form */
  insideForm?: boolean;
  /** Whether element is inside a navbar */
  insideNavbar?: boolean;
  /** Whether element is inside a dropdown */
  insideDropdown?: boolean;
}

/**
 * Get component type for an HTML element with context awareness
 */
export function getComponentType(
  tag: string,
  context?: MappingContext
): WebflowComponentType {
  const normalizedTag = tag.toLowerCase();

  // Input type-specific mapping
  if (normalizedTag === 'input') {
    return mapInputType(context?.attributes?.type, context);
  }

  // Button element
  if (normalizedTag === 'button') {
    if (context?.insideForm && context?.attributes?.type === 'submit') {
      return 'FormButton';
    }
    return 'Button';
  }

  // Anchor element
  if (normalizedTag === 'a') {
    return mapAnchorElement(context);
  }

  // Div element (most complex)
  if (normalizedTag === 'div') {
    return mapDivElement(context);
  }

  // Nav element
  if (normalizedTag === 'nav') {
    if (context?.insideNavbar) {
      return 'NavbarMenu';
    }
    if (context?.insideDropdown) {
      return 'DropdownList';
    }
    return 'Block';
  }

  // Section element
  if (normalizedTag === 'section') {
    return 'Section';
  }

  // Label element
  if (normalizedTag === 'label') {
    // Check if it's for checkbox/radio (inline) or regular field (block)
    if (context?.parentType === 'FormCheckboxWrapper' || context?.parentType === 'FormRadioWrapper') {
      return 'FormInlineLabel';
    }
    return 'FormBlockLabel';
  }

  // Form element
  if (normalizedTag === 'form') {
    // Check if it's a search form
    if (context?.classes?.some(c => c.includes('search'))) {
      return 'SearchForm';
    }
    return 'FormForm';
  }

  // Default lookup
  return HTML_TAG_TO_COMPONENT[normalizedTag] || 'Block';
}

/**
 * Map input element based on type attribute
 */
function mapInputType(type: string | undefined, context?: MappingContext): WebflowComponentType {
  switch (type) {
    case 'text':
    case 'email':
    case 'password':
    case 'tel':
    case 'number':
    case 'url':
    case 'date':
    case 'time':
    case 'datetime-local':
      return 'FormTextInput';

    case 'checkbox':
      return 'FormCheckboxInput';

    case 'radio':
      return 'FormRadioInput';

    case 'file':
      return 'FormFileUploadInput';

    case 'submit':
      if (context?.parentType === 'SearchForm') {
        return 'SearchButton';
      }
      return 'FormButton';

    case 'search':
      return 'SearchInput';

    case 'hidden':
      return 'Block'; // Hidden inputs not directly supported

    default:
      return 'FormTextInput';
  }
}

/**
 * Map anchor element based on context
 */
function mapAnchorElement(context?: MappingContext): WebflowComponentType {
  // Inside navbar
  if (context?.insideNavbar) {
    // Check if it's a brand link
    if (context.classes?.some(c => c.includes('brand') || c.includes('logo'))) {
      return 'NavbarBrand';
    }
    return 'NavbarLink';
  }

  // Inside dropdown
  if (context?.insideDropdown) {
    return 'DropdownLink';
  }

  // Inside tabs
  if (context?.parentType === 'TabsMenu') {
    return 'TabsLink';
  }

  // Button-styled link
  if (context?.classes?.some(c => c.includes('button') || c.includes('btn'))) {
    return 'Button';
  }

  return 'Link';
}

/**
 * Map div element based on context and styling
 */
function mapDivElement(context?: MappingContext): WebflowComponentType {
  // Check classes for common patterns
  if (context?.classes) {
    const classStr = context.classes.join(' ').toLowerCase();

    // Navbar patterns
    if (classStr.includes('navbar') || classStr.includes('nav-wrapper')) {
      return 'NavbarWrapper';
    }
    if (classStr.includes('nav-container')) {
      return 'Block';  // NavbarContainer is deprecated, use Block
    }

    // Dropdown patterns
    if (classStr.includes('dropdown') && !classStr.includes('toggle') && !classStr.includes('list')) {
      return 'DropdownWrapper';
    }
    if (classStr.includes('dropdown-toggle')) {
      return 'DropdownToggle';
    }

    // Tabs patterns
    if (classStr.includes('tabs-wrapper') || classStr.includes('w-tabs')) {
      return 'TabsWrapper';
    }
    if (classStr.includes('tabs-menu')) {
      return 'TabsMenu';
    }
    if (classStr.includes('tabs-content')) {
      return 'TabsContent';
    }
    if (classStr.includes('tab-pane') || classStr.includes('w-tab-pane')) {
      return 'TabsPane';
    }

    // Swiper patterns
    if (classStr.includes('swiper-container') || classStr.includes('swiper')) {
      return 'SwiperSlider';
    }
    if (classStr.includes('swiper-slide')) {
      return 'SwiperSlide';
    }
    if (classStr.includes('swiper-button-prev')) {
      return 'SwiperNavPrev';
    }
    if (classStr.includes('swiper-button-next')) {
      return 'SwiperNavNext';
    }
    if (classStr.includes('swiper-pagination')) {
      return 'SwiperPagination';
    }
    if (classStr.includes('swiper-scrollbar')) {
      return 'SwiperScrollbar';
    }

    // Form patterns
    if (classStr.includes('form-wrapper') || classStr.includes('w-form')) {
      return 'FormWrapper';
    }
    if (classStr.includes('checkbox') && !classStr.includes('input')) {
      return 'FormCheckboxWrapper';
    }
    if (classStr.includes('radio') && !classStr.includes('input')) {
      return 'FormRadioWrapper';
    }
    if (classStr.includes('file-upload') && !classStr.includes('input')) {
      return 'FormFileUploadWrapper';
    }
    if (classStr.includes('success-message') || classStr.includes('w-form-done')) {
      return 'FormSuccessMessage';
    }
    if (classStr.includes('error-message') || classStr.includes('w-form-fail')) {
      return 'FormErrorMessage';
    }

    // Rich text
    if (classStr.includes('rich-text') || classStr.includes('w-richtext')) {
      return 'RichText';
    }
  }

  // Default to Block
  return 'Block';
}

// -----------------------------------------------------------------------------
// Component to HTML Tag Mapping (reverse)
// -----------------------------------------------------------------------------

/**
 * Get the default HTML tag for a component type
 */
export function getDefaultTag(componentType: WebflowComponentType): string {
  const TAG_MAP: Partial<Record<WebflowComponentType, string>> = {
    // Layout Grid
    Row: 'div',
    Column: 'div',
    Grid: 'div',
    HFlex: 'div',
    VFlex: 'div',

    Block: 'div',
    BlockContainer: 'div',
    Section: 'section',
    Heading: 'h2', // Default, actual tag set via data.tag
    Paragraph: 'p',
    Span: 'span',
    Link: 'a',
    Button: 'a', // Webflow buttons are anchor-based
    Image: 'img',
    List: 'ul',
    ListItem: 'li',
    Blockquote: 'blockquote',
    Strong: 'strong',
    Emphasized: 'em',
    Superscript: 'sup',
    Subscript: 'sub',
    InlineCode: 'code',
    Strikethrough: 's',
    Underline: 'u',
    LineBreak: 'br',
    Figure: 'figure',
    Figcaption: 'figcaption',

    // Navigation
    NavbarWrapper: 'div',
    NavbarBrand: 'a',
    NavbarMenu: 'nav',
    NavbarLink: 'a',
    NavbarButton: 'div',

    // Dropdown
    DropdownWrapper: 'div',
    DropdownToggle: 'div',
    DropdownList: 'nav',
    DropdownLink: 'a',

    // Tabs
    TabsWrapper: 'div',
    TabsMenu: 'div',
    TabsContent: 'div',
    TabsLink: 'a',
    TabsPane: 'div',

    // Swiper Slider
    SwiperSlider: 'div',
    SwiperSlide: 'div',
    SwiperNavPrev: 'div',
    SwiperNavNext: 'div',
    SwiperPagination: 'div',
    SwiperScrollbar: 'div',

    // Forms
    FormWrapper: 'div',
    FormForm: 'form',
    FormTextInput: 'input',
    FormTextarea: 'textarea',
    FormSelect: 'select',
    FormButton: 'input', // type="submit"
    FormBlockLabel: 'label',
    FormInlineLabel: 'label',
    FormCheckboxWrapper: 'div',
    FormCheckboxInput: 'input',
    FormRadioWrapper: 'div',
    FormRadioInput: 'input',
    FormSuccessMessage: 'div',
    FormErrorMessage: 'div',
    FormFileUploadWrapper: 'div',
    FormFileUploadDefault: 'div',
    FormFileUploadUploading: 'div',
    FormFileUploadSuccess: 'div',
    FormFileUploadError: 'div',
    FormFileUploadInput: 'input',
    FormFileUploadLabel: 'label',
    FormFileUploadErrorMsg: 'div',
    FormReCaptcha: 'div',

    // Search
    SearchForm: 'form',
    SearchInput: 'input',
    SearchButton: 'input',

    // Media
    HtmlEmbed: 'div',
    Icon: 'div',
    HamburgerIcon: 'div',
    Video: 'div',
    RichText: 'div',
    LightboxWrapper: 'a',
    MapWidget: 'div',
    CodeBlock: 'pre',

    // Background Video
    BackgroundVideoWrapper: 'div',
    BackgroundVideoPlayPauseButton: 'div',
    BackgroundVideoPlayPauseButtonPlaying: 'div',
    BackgroundVideoPlayPauseButtonPaused: 'div',

    // CMS
    DynamoWrapper: 'div',
    DynamoList: 'div',
    DynamoItem: 'div',
    DynamoEmpty: 'div',
    // Container removed - use Block with container-* utility classes instead
  };

  return TAG_MAP[componentType] || 'div';
}

// -----------------------------------------------------------------------------
// Webflow Type Names (for XSCP output)
// -----------------------------------------------------------------------------

/**
 * Map component type to Webflow XSCP type value
 * Most use the component name directly, some have variations
 */
export function getXSCPType(componentType: WebflowComponentType): string {
  // Most components use their name directly
  // Only include exceptions here
  const EXCEPTIONS: Partial<Record<WebflowComponentType, string>> = {
    // None currently - all use component name directly
  };

  return EXCEPTIONS[componentType] || componentType;
}

// -----------------------------------------------------------------------------
// Class Pattern Detection
// -----------------------------------------------------------------------------

/**
 * Common CSS class patterns that indicate specific components
 */
export const CLASS_PATTERNS = {
  navbar: [/nav(bar)?[-_]?wrapper/i, /w-nav/i, /navigation/i],
  navbarContainer: [/nav(bar)?[-_]?container/i],
  navbarBrand: [/nav(bar)?[-_]?brand/i, /logo/i, /w-nav-brand/i],
  navbarMenu: [/nav(bar)?[-_]?menu/i, /w-nav-menu/i],
  navbarLink: [/nav(bar)?[-_]?link/i, /w-nav-link/i],
  navbarButton: [/menu[-_]?button/i, /w-nav-button/i, /hamburger/i],

  dropdown: [/dropdown[-_]?wrapper/i, /w-dropdown/i],
  dropdownToggle: [/dropdown[-_]?toggle/i, /w-dropdown-toggle/i],
  dropdownList: [/dropdown[-_]?list/i, /w-dropdown-list/i],
  dropdownLink: [/dropdown[-_]?link/i, /w-dropdown-link/i],

  tabs: [/tabs[-_]?wrapper/i, /w-tabs/i],
  tabsMenu: [/tabs[-_]?menu/i, /w-tab-menu/i],
  tabsContent: [/tabs[-_]?content/i, /w-tab-content/i],
  tabsLink: [/tab[-_]?link/i, /w-tab-link/i],
  tabsPane: [/tab[-_]?pane/i, /w-tab-pane/i],

  slider: [/slider[-_]?wrapper/i, /w-slider/i, /carousel/i],
  sliderMask: [/slider[-_]?mask/i, /w-slider-mask/i],
  sliderSlide: [/slide(?!r)/i, /w-slide/i],
  sliderArrow: [/slider[-_]?arrow/i, /w-slider-arrow/i],
  sliderNav: [/slider[-_]?nav/i, /w-slider-nav/i],

  form: [/form[-_]?wrapper/i, /w-form/i],
  formSuccess: [/success[-_]?message/i, /w-form-done/i],
  formError: [/error[-_]?message/i, /w-form-fail/i],

  button: [/button/i, /btn/i, /cta/i],
  grid: [/grid/i, /layout/i, /w-layout-grid/i],
  richText: [/rich[-_]?text/i, /w-richtext/i],

  // Layout Grid
  row: [/w-row/i, /row[-_]?wrapper/i],
  column: [/w-col/i, /column/i],
  hflex: [/w-layout-hflex/i, /hflex/i, /h-flex/i],
  vflex: [/w-layout-vflex/i, /vflex/i, /v-flex/i],

  // Background Video
  bgVideo: [/w-background-video/i, /bg[-_]?video/i, /background[-_]?video/i],
  codeBlock: [/code[-_]?block/i, /w-code-block/i],
} as const;

/**
 * Check if a class string matches a pattern
 */
export function matchesClassPattern(
  classes: string[],
  patternKey: keyof typeof CLASS_PATTERNS
): boolean {
  const patterns = CLASS_PATTERNS[patternKey];
  const classStr = classes.join(' ');
  return patterns.some(pattern => pattern.test(classStr));
}
