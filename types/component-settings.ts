/**
 * COMPONENT SETTINGS
 * Configurable settings for interactive components (Slider, Dropdown, Tabs, Navbar, etc.)
 * These settings flow through: EditableNode → React Export → Webflow XSCP
 */

import type { EasingType, SliderAnimation, LightboxItem } from './component-props';

// ============================================================================
// SLIDER SETTINGS
// ============================================================================

export interface SliderSettings {
  /** Animation type: slide, cross, outin, fade, over (default: 'slide') */
  animation?: SliderAnimation;
  /** Animation easing (default: 'ease') */
  easing?: EasingType;
  /** Animation duration in ms (default: 500) */
  duration?: number;
  /** Infinite repeat slides (default: true) */
  infinite?: boolean;
  /** Disable swipe gestures (default: false) */
  disableSwipe?: boolean;
  /** Auto-play slides (default: false) */
  autoplay?: boolean;
  /** Timer delay in ms (default: 4000) */
  delay?: number;
  /** Stop after X slides, 0 = never (default: 0) */
  autoMax?: number;
  /** Hide arrows at each end (default: false) */
  hideArrows?: boolean;
  /** Use icon arrows (default: true) */
  iconArrows?: boolean;
  /** Rounded nav dots (default: true) */
  navRound?: boolean;
  /** Number labels on nav (default: false) */
  navNumbers?: boolean;
  /** Shadow on nav (default: false) */
  navShadow?: boolean;
  /** Invert nav colors (default: false) */
  navInvert?: boolean;
  /** Nav dot spacing in px (default: 3) */
  navSpacing?: number;
}

export const DEFAULT_SLIDER_SETTINGS: Required<SliderSettings> = {
  animation: 'slide',
  easing: 'ease',
  duration: 500,
  infinite: true,
  disableSwipe: false,
  autoplay: false,
  delay: 4000,
  autoMax: 0,
  hideArrows: false,
  iconArrows: false,
  navRound: false,
  navNumbers: false,
  navShadow: false,
  navInvert: false,
  navSpacing: 3,
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
  | { type: 'slider'; config: SliderSettings }
  | { type: 'dropdown'; config: DropdownSettings }
  | { type: 'tabs'; config: TabsSettings }
  | { type: 'navbar'; config: NavbarSettings }
  | { type: 'video'; config: VideoSettings }
  | { type: 'form'; config: FormSettings }
  | { type: 'lightbox'; config: LightboxSettings };

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

/** Get slider settings with defaults applied */
export function getSliderSettings(settings?: SliderSettings): Required<SliderSettings> {
  return { ...DEFAULT_SLIDER_SETTINGS, ...settings };
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
