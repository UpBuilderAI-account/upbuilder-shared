/**
 * COMPONENT SETTINGS
 * Configurable settings for interactive components (Slider, Dropdown, Tabs, Navbar, etc.)
 * These settings flow through: EditableNode → React Export → Webflow XSCP
 */
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
export declare const DEFAULT_SLIDER_SETTINGS: Required<SliderSettings>;
export interface DropdownSettings {
    /** Trigger mode: 'hover' for nav dropdowns, 'click' for accordions (default: 'click') */
    mode?: 'hover' | 'click';
    /** Delay before closing on mouse leave in ms (default: 200) */
    closeDelay?: number;
    /** Start in open state (default: false) */
    startOpen?: boolean;
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
    /** Group name for gallery navigation */
    group?: string;
}
export declare const DEFAULT_LIGHTBOX_SETTINGS: LightboxSettings;
export type ComponentSettings = {
    type: 'slider';
    config: SliderSettings;
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
/** Get slider settings with defaults applied */
export declare function getSliderSettings(settings?: SliderSettings): Required<SliderSettings>;
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
//# sourceMappingURL=component-settings.d.ts.map