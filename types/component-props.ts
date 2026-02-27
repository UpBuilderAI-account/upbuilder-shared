/**
 * COMPONENT PROPS
 * Type definitions for interactive component props.
 * Single source of truth - used by both backend XSCP builder and React export.
 */

// ============================================================================
// SWIPER SLIDER
// ============================================================================

/** Swiper effect types */
export type SwiperEffect = 'slide' | 'fade' | 'cube' | 'coverflow' | 'flip' | 'cards' | 'creative';

/** Swiper pagination types */
export type SwiperPaginationType = 'bullets' | 'fraction' | 'progressbar';

/** Swiper autoplay configuration */
export interface SwiperAutoplayConfig {
  delay?: number;
  disableOnInteraction?: boolean;
  pauseOnMouseEnter?: boolean;
  stopOnLastSlide?: boolean;
}

/** Swiper pagination configuration */
export interface SwiperPaginationConfig {
  type?: SwiperPaginationType;
  clickable?: boolean;
  dynamicBullets?: boolean;
}

/** Swiper scrollbar configuration */
export interface SwiperScrollbarConfig {
  draggable?: boolean;
  hide?: boolean;
}

/** Swiper breakpoint configuration */
export interface SwiperBreakpointConfig {
  slidesPerView?: number | 'auto';
  spaceBetween?: number;
  slidesPerGroup?: number;
}

export interface SwiperSliderProps {
  /** Number of slides per view (default: 1) */
  slidesPerView?: number | 'auto';
  /** Space between slides in px (default: 0) */
  spaceBetween?: number;
  /** Slide direction (default: 'horizontal') */
  direction?: 'horizontal' | 'vertical';
  /** Enable loop mode (default: false) */
  loop?: boolean;
  /** Enable autoplay (default: false) */
  autoplay?: boolean | SwiperAutoplayConfig;
  /** Transition effect (default: 'slide') */
  effect?: SwiperEffect;
  /** Transition speed in ms (default: 300) */
  speed?: number;
  /** Enable navigation arrows (default: false) */
  navigation?: boolean;
  /** Enable pagination (default: false) */
  pagination?: boolean | SwiperPaginationConfig;
  /** Enable scrollbar (default: false) */
  scrollbar?: boolean | SwiperScrollbarConfig;
  /** Allow touch/swipe (default: true) */
  allowTouchMove?: boolean;
  /** Show grab cursor (default: false) */
  grabCursor?: boolean;
  /** Enable free mode - slides don't snap (default: false) */
  freeMode?: boolean;
  /** Center active slide (default: false) */
  centeredSlides?: boolean;
  /** Initial slide index (default: 0) */
  initialSlide?: number;
  /** Number of slides to advance per group (default: 1) */
  slidesPerGroup?: number;
  /** Responsive breakpoints */
  breakpoints?: Record<number, SwiperBreakpointConfig>;
}

// ============================================================================
// DROPDOWN / ACCORDION
// ============================================================================

export interface DropdownProps {
  /** Open on hover (true) or click (false) - maps to data-hover attribute */
  hover?: boolean;
  /** Delay before closing on mouse leave in ms (default: 200) - maps to data-delay attribute */
  delay?: number;
  /** Exclude dropdown content from site search results - maps to search.exclude */
  searchExclude?: boolean;
}

// ============================================================================
// TABS
// ============================================================================

export interface TabsProps {
  /** Tab name to show on load (default: first tab) */
  defaultTab?: string;
  /** Fade-in duration in ms (default: 300) */
  fadeIn?: number;
  /** Fade-out duration in ms (default: 100) */
  fadeOut?: number;
  /** Animation easing (default: 'ease') */
  easing?: EasingType;
}

export interface TabLinkProps {
  /** Tab identifier - must match TabsPane tabName */
  tabName: string;
}

export interface TabPaneProps {
  /** Tab identifier - must match TabLink tabName */
  tabName: string;
}

// ============================================================================
// EASING (shared across components)
// ============================================================================

/** All Webflow easing options */
export type EasingType =
  | 'ease'
  | 'ease-in'
  | 'ease-out'
  | 'ease-in-out'
  | 'linear'
  | 'ease-in-quad'
  | 'ease-in-cubic'
  | 'ease-in-quart'
  | 'ease-in-quint'
  | 'ease-in-sine'
  | 'ease-in-expo'
  | 'ease-in-circ'
  | 'ease-in-back'
  | 'ease-out-quad'
  | 'ease-out-cubic'
  | 'ease-out-quart'
  | 'ease-out-quint'
  | 'ease-out-sine'
  | 'ease-out-expo'
  | 'ease-out-circ'
  | 'ease-out-back'
  | 'ease-in-out-quad'
  | 'ease-in-out-cubic'
  | 'ease-in-out-quart'
  | 'ease-in-out-quint'
  | 'ease-in-out-sine'
  | 'ease-in-out-expo'
  | 'ease-in-out-circ'
  | 'ease-in-out-back';

// ============================================================================
// NAVBAR
// ============================================================================

export interface NavbarProps {
  /** Menu icon for: medium (Tablet and below), small (Mobile landscape and below), none (never collapse) */
  collapse?: 'medium' | 'small' | 'none';
  /** Menu type/animation: default (Drop Down), over-left, over-right */
  animation?: 'default' | 'over-left' | 'over-right';
  /** Animation duration in ms (default: 400) */
  duration?: number;
  /** Easing open - animation easing when menu opens (default: 'ease') */
  easing?: EasingType;
  /** Easing close - animation easing when menu closes (default: 'ease') */
  easing2?: EasingType;
  /** Menu fills page height - when checked, mobile menu expands to fill viewport (default: true) */
  docHeight?: boolean;
  /** Disable scroll offset when fixed - prevents scroll position jump when navbar is fixed (default: true) */
  noScroll?: boolean;
}

// ============================================================================
// FORMS
// ============================================================================

export interface FormProps {
  /** Form name for submissions */
  name?: string;
  /** Redirect URL after successful submit */
  redirect?: string;
  /** Form method */
  method?: 'get' | 'post';
}

export interface FormInputProps {
  /** Field name (required, unique per form) */
  name: string;
  /** Input type */
  type?: 'text' | 'email' | 'tel' | 'number' | 'password' | 'url';
  /** Placeholder text */
  placeholder?: string;
  /** Field is required */
  required?: boolean;
  /** Max character length */
  maxLength?: number;
  /** Auto-focus on load */
  autoFocus?: boolean;
}

export interface FormTextareaProps {
  /** Field name (required, unique per form) */
  name: string;
  /** Placeholder text */
  placeholder?: string;
  /** Field is required */
  required?: boolean;
  /** Max character length (default: 5000) */
  maxLength?: number;
}

export interface FormSelectProps {
  /** Field name (required, unique per form) */
  name: string;
  /** Field is required */
  required?: boolean;
  /** Select options */
  options?: Array<{ value: string; label: string }>;
}

export interface FormCheckboxProps {
  /** Field name */
  name?: string;
  /** Checkbox is required */
  required?: boolean;
  /** Default checked state */
  checked?: boolean;
}

export interface FormRadioProps {
  /** Field name (shared across radio group) */
  name: string;
  /** Radio value */
  value?: string;
  /** Radio is required */
  required?: boolean;
}

export interface FormLabelProps {
  /** ID of the input this label is for */
  htmlFor?: string;
}

// ============================================================================
// VIDEO
// ============================================================================

export interface VideoProps {
  /** Video URL (YouTube, Vimeo, or direct) */
  url?: string;
  /** Video title for accessibility */
  title?: string;
}

export interface BackgroundVideoProps {
  /** Video source URL */
  src?: string;
  /** Poster image URL */
  poster?: string;
  /** Auto-play video (default: true) */
  autoplay?: boolean;
  /** Loop video (default: true) */
  loop?: boolean;
  /** Mute video - required for autoplay (default: true) */
  muted?: boolean;
}

// ============================================================================
// LAYOUT
// ============================================================================

export interface RowProps {
  /** Column distribution e.g. "4|4|4" for 3 equal columns */
  cols?: string;
}

export interface GridProps {
  /** Grid layout preset */
  layout?: 'two-by-two' | 'three-by-three' | string;
}

// ============================================================================
// LINKS
// ============================================================================

/** Link mode types */
export type LinkMode = 'external' | 'email' | 'tel';

/** Preload strategy for external links */
export type LinkPreload = 'default' | 'prefetch' | 'prerender';

export interface LinkProps {
  /** Link type: external URL, email, or phone */
  mode?: LinkMode;

  // External URL mode
  /** URL destination (external mode) */
  url?: string;
  /** Open in new tab (external mode) */
  newTab?: boolean;
  /** Preload strategy (external mode) */
  preload?: LinkPreload;

  // Email mode
  /** Email address (email mode) */
  email?: string;
  /** Email subject line (email mode) */
  subject?: string;

  // Phone mode
  /** Phone number (tel mode) */
  tel?: string;

  // Shared across all modes
  /** Render as button style */
  button?: boolean;
  /** Exclude from site search results */
  searchExclude?: boolean;

  // Legacy props (for backwards compatibility)
  /** @deprecated Use url instead */
  href?: string;
  /** @deprecated Use newTab instead */
  target?: '_blank' | '_self' | '_parent' | '_top';
}

// ============================================================================
// LIGHTBOX
// ============================================================================

/** Lightbox media item type */
export type LightboxItemType = 'Image' | 'Video';

/** Single lightbox media item */
export interface LightboxItem {
  /** Item type: Image or Video */
  tag: LightboxItemType;
  /** Item value containing media data */
  val: {
    image?: {
      fileName: string;
      url: string;
    };
    video?: {
      url: string;
    };
    caption?: string;
  };
}

export interface LightboxProps {
  /** Group name for gallery navigation - links multiple lightboxes together */
  group?: string;
  /** Media items in the lightbox gallery */
  items?: LightboxItem[];
  /** Exclude from site search results */
  searchExclude?: boolean;
}

// ============================================================================
// IMAGE
// ============================================================================

export interface ImageProps {
  /** Image source (filename only, not full URL) */
  src?: string;
  /** Alt text for accessibility */
  alt?: string;
  /** Loading strategy */
  loading?: 'lazy' | 'eager';
}

// ============================================================================
// HTML EMBED
// ============================================================================

export interface HtmlEmbedProps {
  /** Raw HTML content (max 10,000 characters for Webflow) */
  html?: string;
}

// ============================================================================
// CODE BLOCK
// ============================================================================

export interface CodeBlockProps {
  /** Code content */
  code?: string;
  /** Programming language for syntax highlighting */
  language?: string;
  /** Color theme */
  theme?: 'dark' | 'light';
  /** Show line numbers */
  lineNumbers?: boolean;
}
