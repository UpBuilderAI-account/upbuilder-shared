/**
 * COMPONENT SETTINGS
 * Configurable settings for interactive components (Slider, Dropdown, Tabs, Navbar, etc.)
 * These settings flow through: EditableNode → React Export → Webflow XSCP
 */

// ============================================================================
// SLIDER SETTINGS
// ============================================================================

export interface SliderSettings {
  /** Enable auto-advance slides (default: false) */
  autoplay?: boolean;
  /** Milliseconds between auto-advance (default: 4000) */
  autoplayDelay?: number;
  /** Animation type (default: 'slide') */
  animation?: 'slide' | 'fade' | 'cross' | 'over';
  /** Animation duration in ms (default: 500) */
  duration?: number;
  /** CSS easing function (default: 'ease') */
  easing?: string;
  /** Loop back to start after last slide (default: true) */
  infinite?: boolean;
  /** Pause autoplay on hover (default: true) */
  pauseOnHover?: boolean;
  /** Hide arrow buttons (default: false) */
  hideArrows?: boolean;
  /** Show navigation dots (default: true) */
  showNav?: boolean;
  /** Enable touch/swipe gestures (default: true) */
  swipe?: boolean;
}

export const DEFAULT_SLIDER_SETTINGS: Required<SliderSettings> = {
  autoplay: false,
  autoplayDelay: 4000,
  animation: 'slide',
  duration: 500,
  easing: 'ease',
  infinite: true,
  pauseOnHover: true,
  hideArrows: false,
  showNav: true,
  swipe: true,
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
}

export const DEFAULT_DROPDOWN_SETTINGS: Required<DropdownSettings> = {
  mode: 'click',
  closeDelay: 200,
  startOpen: false,
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
  /** Breakpoint to collapse menu: 'medium' (991px), 'small' (767px), 'none' (default: 'medium') */
  collapseAt?: 'medium' | 'small' | 'none';
  /** Mobile menu animation style (default: 'default') */
  animation?: 'default' | 'over-left' | 'over-right';
  /** Animation duration in ms (default: 400) */
  animationDuration?: number;
  /** Dropdown trigger in desktop: 'hover' or 'click' (default: 'hover') */
  dropdownMode?: 'hover' | 'click';
  /** Dropdown close delay in ms (default: 300) */
  dropdownDelay?: number;
}

export const DEFAULT_NAVBAR_SETTINGS: Required<NavbarSettings> = {
  collapseAt: 'medium',
  animation: 'default',
  animationDuration: 400,
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
  /** Group name for gallery navigation */
  group?: string;
}

export const DEFAULT_LIGHTBOX_SETTINGS: LightboxSettings = {
  group: undefined,
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
