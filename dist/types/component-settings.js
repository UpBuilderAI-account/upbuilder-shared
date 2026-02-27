"use strict";
/**
 * COMPONENT SETTINGS
 * Configurable settings for interactive components (Swiper, Dropdown, Tabs, Navbar, etc.)
 * These settings flow through: EditableNode → React Export → Webflow XSCP
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_LIGHTBOX_SETTINGS = exports.DEFAULT_FORM_SETTINGS = exports.DEFAULT_VIDEO_SETTINGS = exports.DEFAULT_NAVBAR_SETTINGS = exports.DEFAULT_TABS_SETTINGS = exports.DEFAULT_DROPDOWN_SETTINGS = exports.DEFAULT_SWIPER_SETTINGS = void 0;
exports.getSwiperSettings = getSwiperSettings;
exports.getDropdownSettings = getDropdownSettings;
exports.getTabsSettings = getTabsSettings;
exports.getNavbarSettings = getNavbarSettings;
exports.getVideoSettings = getVideoSettings;
exports.getFormSettings = getFormSettings;
exports.getLightboxSettings = getLightboxSettings;
exports.DEFAULT_SWIPER_SETTINGS = {
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
exports.DEFAULT_DROPDOWN_SETTINGS = {
    mode: 'click',
    closeDelay: 200,
    startOpen: false,
    searchExclude: false,
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
    easing: 'ease',
    easing2: 'ease',
    docHeight: true,
    noScroll: true,
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
    items: [],
    searchExclude: false,
};
// ============================================================================
// HELPER FUNCTIONS
// ============================================================================
/** Get swiper settings with defaults applied */
function getSwiperSettings(settings) {
    return Object.assign(Object.assign({}, exports.DEFAULT_SWIPER_SETTINGS), settings);
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
/** Get lightbox settings with defaults applied */
function getLightboxSettings(settings) {
    return Object.assign(Object.assign({}, exports.DEFAULT_LIGHTBOX_SETTINGS), settings);
}
