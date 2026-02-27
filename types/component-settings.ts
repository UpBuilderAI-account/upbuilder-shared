/**
 * COMPONENT SETTINGS
 * Configurable settings for interactive components (Swiper, Dropdown, Tabs, Navbar, etc.)
 * These settings flow through: EditableNode → React Export → Webflow XSCP
 */

import type {
  EasingType,
  LightboxItem,
  SwiperEffect,
  SwiperAutoplayConfig,
  SwiperPaginationConfig,
  SwiperScrollbarConfig,
  SwiperBreakpointConfig,
} from './component-props';

// ============================================================================
// SWIPER SETTINGS
// ============================================================================

export interface SwiperSettings {
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

export const DEFAULT_SWIPER_SETTINGS: SwiperSettings = {
  slidesPerView: 1,
  spaceBetween: 0,
  direction: 'horizontal',
  loop: false,
  autoplay: false,
  effect: 'slide',
  speed: 300,
  navigation: false,
  pagination: false,
  scrollbar: false,
  allowTouchMove: true,
  grabCursor: false,
  freeMode: false,
  centeredSlides: false,
  initialSlide: 0,
  slidesPerGroup: 1,
};

// ============================================================================
// DROPDOWN / ACCORDION SETTINGS
// ============================================================================

export interface DropdownSettings {
  /** Trigger mode: 'hover' for nav dropdowns, 'click' for accordions (default: 'click') */
  mode?: 'hover' | 'click';
  /** Delay before closing on mouse leave in ms (default: 200) */
  closeDelay?: number;
  /** Start in open state (default: false) */
  startOpen?: boolean;
  /** Exclude dropdown content from site search results (default: false) */
  searchExclude?: boolean;
}

export const DEFAULT_DROPDOWN_SETTINGS: Required<DropdownSettings> = {
  mode: 'click',
  closeDelay: 200,
  startOpen: false,
  searchExclude: false,
};

// ============================================================================
// TABS SETTINGS
// ============================================================================

export interface TabsSettings {
  /** Tab name to show on load (default: first tab) */
  defaultTab?: string;
  /** Fade-in duration in ms (default: 300) */
  fadeIn?: number;
  /** Fade-out duration in ms (default: 100) */
  fadeOut?: number;
  /** CSS easing function (default: 'ease') */
  easing?: string;
}

export const DEFAULT_TABS_SETTINGS: Required<Omit<TabsSettings, 'defaultTab'>> & Pick<TabsSettings, 'defaultTab'> = {
  defaultTab: undefined, // Will use first tab
  fadeIn: 300,
  fadeOut: 100,
  easing: 'ease',
};

// ============================================================================
// NAVBAR SETTINGS
// ============================================================================

export interface NavbarSettings {
  /** Menu icon for: 'medium' (Tablet and below), 'small' (Mobile landscape and below), 'none' (never collapse) */
  collapseAt?: 'medium' | 'small' | 'none';
  /** Menu type/animation style: 'default' (Drop Down), 'over-left', 'over-right' */
  animation?: 'default' | 'over-left' | 'over-right';
  /** Animation duration in ms (default: 400) */
  animationDuration?: number;
  /** Easing open - animation easing when menu opens (default: 'ease') */
  easing?: EasingType;
  /** Easing close - animation easing when menu closes (default: 'ease') */
  easing2?: EasingType;
  /** Menu fills page height - mobile menu expands to fill viewport (default: true) */
  docHeight?: boolean;
  /** Disable scroll offset when fixed (default: true) */
  noScroll?: boolean;
  /** Dropdown trigger in desktop: 'hover' or 'click' (default: 'hover') */
  dropdownMode?: 'hover' | 'click';
  /** Dropdown close delay in ms (default: 300) */
  dropdownDelay?: number;
}

export const DEFAULT_NAVBAR_SETTINGS: Required<NavbarSettings> = {
  collapseAt: 'medium',
  animation: 'default',
  animationDuration: 400,
  easing: 'ease',
  easing2: 'ease',
  docHeight: true,
  noScroll: true,
  dropdownMode: 'hover',
  dropdownDelay: 300,
};

// ============================================================================
// VIDEO SETTINGS
// ============================================================================

export interface VideoSettings {
  /** Auto-play video (default: true for background, false for embed) */
  autoplay?: boolean;
  /** Loop video (default: true) */
  loop?: boolean;
  /** Mute video - required for autoplay (default: true) */
  muted?: boolean;
  /** Show video controls (default: false for background) */
  controls?: boolean;
  /** Poster image URL */
  poster?: string;
}

export const DEFAULT_VIDEO_SETTINGS: Required<Omit<VideoSettings, 'poster'>> & Pick<VideoSettings, 'poster'> = {
  autoplay: true,
  loop: true,
  muted: true,
  controls: false,
  poster: undefined,
};

// ============================================================================
// FORM SETTINGS
// ============================================================================

export interface FormSettings {
  /** Success message text */
  successMessage?: string;
  /** Error message text */
  errorMessage?: string;
  /** Redirect URL after successful submit */
  redirectUrl?: string;
}

export const DEFAULT_FORM_SETTINGS: Required<Omit<FormSettings, 'redirectUrl'>> & Pick<FormSettings, 'redirectUrl'> = {
  successMessage: 'Thank you! Your submission has been received!',
  errorMessage: 'Oops! Something went wrong while submitting the form.',
  redirectUrl: undefined,
};

// ============================================================================
// LIGHTBOX SETTINGS
// ============================================================================

export interface LightboxSettings {
  /** Group name for gallery navigation - links multiple lightboxes together */
  group?: string;
  /** Media items in the lightbox gallery */
  items?: LightboxItem[];
  /** Exclude from site search results (default: false) */
  searchExclude?: boolean;
}

export const DEFAULT_LIGHTBOX_SETTINGS: LightboxSettings = {
  group: undefined,
  items: [],
  searchExclude: false,
};

// ============================================================================
// COMPONENT SETTINGS UNION
// ============================================================================

export type ComponentSettings =
  | { type: 'swiper'; config: SwiperSettings }
  | { type: 'dropdown'; config: DropdownSettings }
  | { type: 'tabs'; config: TabsSettings }
  | { type: 'navbar'; config: NavbarSettings }
  | { type: 'video'; config: VideoSettings }
  | { type: 'form'; config: FormSettings }
  | { type: 'lightbox'; config: LightboxSettings };

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/** Get swiper settings with defaults applied */
export function getSwiperSettings(settings?: SwiperSettings): SwiperSettings {
  return { ...DEFAULT_SWIPER_SETTINGS, ...settings };
}

/** Get dropdown settings with defaults applied */
export function getDropdownSettings(settings?: DropdownSettings): Required<DropdownSettings> {
  return { ...DEFAULT_DROPDOWN_SETTINGS, ...settings };
}

/** Get tabs settings with defaults applied */
export function getTabsSettings(settings?: TabsSettings): typeof DEFAULT_TABS_SETTINGS {
  return { ...DEFAULT_TABS_SETTINGS, ...settings };
}

/** Get navbar settings with defaults applied */
export function getNavbarSettings(settings?: NavbarSettings): Required<NavbarSettings> {
  return { ...DEFAULT_NAVBAR_SETTINGS, ...settings };
}

/** Get video settings with defaults applied */
export function getVideoSettings(settings?: VideoSettings): typeof DEFAULT_VIDEO_SETTINGS {
  return { ...DEFAULT_VIDEO_SETTINGS, ...settings };
}

/** Get form settings with defaults applied */
export function getFormSettings(settings?: FormSettings): typeof DEFAULT_FORM_SETTINGS {
  return { ...DEFAULT_FORM_SETTINGS, ...settings };
}

/** Get lightbox settings with defaults applied */
export function getLightboxSettings(settings?: LightboxSettings): typeof DEFAULT_LIGHTBOX_SETTINGS {
  return { ...DEFAULT_LIGHTBOX_SETTINGS, ...settings };
}
