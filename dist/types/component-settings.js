"use strict";
/**
 * COMPONENT SETTINGS
 * Configurable settings for interactive components (Slider, Dropdown, Tabs, Navbar, etc.)
 * These settings flow through: EditableNode → React Export → Webflow XSCP
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LIGHTBOX_SETTINGS = exports.DEFAULT_FORM_SETTINGS = exports.DEFAULT_VIDEO_SETTINGS = exports.DEFAULT_NAVBAR_SETTINGS = exports.DEFAULT_TABS_SETTINGS = exports.DEFAULT_DROPDOWN_SETTINGS = exports.DEFAULT_SLIDER_SETTINGS = void 0;
exports.getSliderSettings = getSliderSettings;
exports.getDropdownSettings = getDropdownSettings;
exports.getTabsSettings = getTabsSettings;
exports.getNavbarSettings = getNavbarSettings;
exports.getVideoSettings = getVideoSettings;
exports.getFormSettings = getFormSettings;
exports.DEFAULT_SLIDER_SETTINGS = {
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
exports.DEFAULT_DROPDOWN_SETTINGS = {
    mode: 'click',
    closeDelay: 200,
    startOpen: false,
};
exports.DEFAULT_TABS_SETTINGS = {
    defaultTab: undefined, // Will use first tab
    fadeIn: 300,
    fadeOut: 100,
    easing: 'ease',
};
exports.DEFAULT_NAVBAR_SETTINGS = {
    collapseAt: 'medium',
    animation: 'default',
    animationDuration: 400,
    dropdownMode: 'hover',
    dropdownDelay: 300,
};
exports.DEFAULT_VIDEO_SETTINGS = {
    autoplay: true,
    loop: true,
    muted: true,
    controls: false,
    poster: undefined,
};
exports.DEFAULT_FORM_SETTINGS = {
    successMessage: 'Thank you! Your submission has been received!',
    errorMessage: 'Oops! Something went wrong while submitting the form.',
    redirectUrl: undefined,
};
exports.DEFAULT_LIGHTBOX_SETTINGS = {
    group: undefined,
};
// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
/** Get slider settings with defaults applied */
function getSliderSettings(settings) {
    return Object.assign(Object.assign({}, exports.DEFAULT_SLIDER_SETTINGS), settings);
}
/** Get dropdown settings with defaults applied */
function getDropdownSettings(settings) {
    return Object.assign(Object.assign({}, exports.DEFAULT_DROPDOWN_SETTINGS), settings);
}
/** Get tabs settings with defaults applied */
function getTabsSettings(settings) {
    return Object.assign(Object.assign({}, exports.DEFAULT_TABS_SETTINGS), settings);
}
/** Get navbar settings with defaults applied */
function getNavbarSettings(settings) {
    return Object.assign(Object.assign({}, exports.DEFAULT_NAVBAR_SETTINGS), settings);
}
/** Get video settings with defaults applied */
function getVideoSettings(settings) {
    return Object.assign(Object.assign({}, exports.DEFAULT_VIDEO_SETTINGS), settings);
}
/** Get form settings with defaults applied */
function getFormSettings(settings) {
    return Object.assign(Object.assign({}, exports.DEFAULT_FORM_SETTINGS), settings);
}
