/**
 * COMPONENT SETTINGS
 * Configurable settings for interactive components (Swiper, Dropdown, Tabs, Navbar, etc.)
 * These settings flow through: EditableNode → React Export → Webflow XSCP
 */
import type { EasingType, LightboxItem, SwiperEffect, SwiperAutoplayConfig, SwiperPaginationConfig, SwiperScrollbarConfig, SwiperBreakpointConfig } from './component-props';
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
export declare const DEFAULT_SWIPER_SETTINGS: SwiperSettings;
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
export declare const DEFAULT_DROPDOWN_SETTINGS: Required<DropdownSettings>;
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
export declare const DEFAULT_TABS_SETTINGS: Required<Omit<TabsSettings, 'defaultTab'>> & Pick<TabsSettings, 'defaultTab'>;
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
export declare const DEFAULT_NAVBAR_SETTINGS: Required<NavbarSettings>;
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
export declare const DEFAULT_VIDEO_SETTINGS: Required<Omit<VideoSettings, 'poster'>> & Pick<VideoSettings, 'poster'>;
export interface FormSettings {
    /** Success message text */
    successMessage?: string;
    /** Error message text */
    errorMessage?: string;
    /** Redirect URL after successful submit */
    redirectUrl?: string;
}
export declare const DEFAULT_FORM_SETTINGS: Required<Omit<FormSettings, 'redirectUrl'>> & Pick<FormSettings, 'redirectUrl'>;
export interface LightboxSettings {
    /** Group name for gallery navigation - links multiple lightboxes together */
    group?: string;
    /** Media items in the lightbox gallery */
    items?: LightboxItem[];
    /** Exclude from site search results (default: false) */
    searchExclude?: boolean;
}
export declare const DEFAULT_LIGHTBOX_SETTINGS: LightboxSettings;
export type ComponentSettings = {
    type: 'swiper';
    config: SwiperSettings;
} | {
    type: 'dropdown';
    config: DropdownSettings;
} | {
    type: 'tabs';
    config: TabsSettings;
} | {
    type: 'navbar';
    config: NavbarSettings;
} | {
    type: 'video';
    config: VideoSettings;
} | {
    type: 'form';
    config: FormSettings;
} | {
    type: 'lightbox';
    config: LightboxSettings;
};
/** Get swiper settings with defaults applied */
export declare function getSwiperSettings(settings?: SwiperSettings): SwiperSettings;
/** Get dropdown settings with defaults applied */
export declare function getDropdownSettings(settings?: DropdownSettings): Required<DropdownSettings>;
/** Get tabs settings with defaults applied */
export declare function getTabsSettings(settings?: TabsSettings): typeof DEFAULT_TABS_SETTINGS;
/** Get navbar settings with defaults applied */
export declare function getNavbarSettings(settings?: NavbarSettings): Required<NavbarSettings>;
/** Get video settings with defaults applied */
export declare function getVideoSettings(settings?: VideoSettings): typeof DEFAULT_VIDEO_SETTINGS;
/** Get form settings with defaults applied */
export declare function getFormSettings(settings?: FormSettings): typeof DEFAULT_FORM_SETTINGS;
/** Get lightbox settings with defaults applied */
export declare function getLightboxSettings(settings?: LightboxSettings): typeof DEFAULT_LIGHTBOX_SETTINGS;
//# sourceMappingURL=component-settings.d.ts.map