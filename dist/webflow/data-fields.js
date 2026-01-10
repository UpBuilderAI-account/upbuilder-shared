"use strict";
// ============================================================================
// WEBFLOW DATA FIELDS
// Component-specific data field specifications
// Used for: generating correct XSCP node data, validation, prompts
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.DEFAULT_DATA_FIELDS = void 0;
exports.createLinkData = createLinkData;
exports.createFormInputData = createFormInputData;
exports.createFormTextareaData = createFormTextareaData;
exports.createEmbedData = createEmbedData;
// -----------------------------------------------------------------------------
// Default Data Field Values
// These are used when creating new nodes
// -----------------------------------------------------------------------------
exports.DEFAULT_DATA_FIELDS = {
    navbar: {
        wrapper: {
            type: 'wrapper',
            easing: 'ease',
            easing2: 'ease',
            duration: 400,
            docHeight: false,
            noScroll: false,
            animation: 'default',
            collapse: 'medium',
        },
        container: { type: 'container' },
        brand: { type: 'brand' },
        menu: { type: 'menu' },
        link: { type: 'link' },
        button: { type: 'button' },
    },
    dropdown: {
        wrapper: { type: 'wrapper' },
        toggle: { type: 'toggle' },
        list: { type: 'list' },
        link: { type: 'link' },
    },
    tabs: {
        wrapper: {
            type: 'wrapper',
            current: 'Tab 1',
            easing: 'ease',
            fadeIn: 300,
            fadeOut: 100,
        },
        menu: { type: 'menu' },
        content: { type: 'content' },
        link: { type: 'link' },
        pane: { type: 'pane' },
    },
    slider: {
        wrapper: {
            animation: 'slide',
            easing: 'ease',
            duration: 500,
            infinite: true,
            disableSwipe: false,
            autoplay: { active: false },
        },
        mask: { type: 'slides' },
        slide: { type: 'slide' },
        arrowLeft: { dir: 'left' },
        arrowRight: { dir: 'right' },
        nav: { type: 'nav' },
    },
    form: {
        wrapper: { type: 'wrapper' },
        form: { type: 'form', name: 'Form' },
        button: { type: 'button' },
        label: { type: 'label' },
        successMessage: { type: 'msg-done' },
        errorMessage: { type: 'msg-fail' },
        checkbox: { type: 'checkbox' },
        checkboxInput: { type: 'checkbox-input', name: 'Checkbox' },
        checkboxLabel: { type: 'checkbox-label' },
        radio: { type: 'radio' },
        radioInput: { type: 'radio-input', name: 'Radio', value: '' },
        radioLabel: { type: 'radio-label' },
    },
    link: {
        external: { mode: 'external', url: '#' },
        internal: { mode: 'internal' },
        section: { mode: 'section' },
        email: { mode: 'email' },
        phone: { mode: 'phone' },
    },
    list: {
        unordered: { type: 'list', unstyled: false },
        ordered: { type: 'list', unstyled: false },
        item: { type: 'item' },
    },
    grid: {
        section: { type: 'section' },
        row: { type: 'row', cols: { main: '6|6', medium: '', small: '', tiny: '' } },
        column: { type: 'col' },
    },
    icon: {
        dropdownToggle: { type: 'icon', icon: 'dropdown-toggle' },
        navbarMenu: { type: 'icon', icon: 'nav-menu' },
        sliderLeft: { type: 'icon', icon: 'slider-left' },
        sliderRight: { type: 'icon', icon: 'slider-right' },
    },
};
// -----------------------------------------------------------------------------
// Helpers
// -----------------------------------------------------------------------------
/** Create a link data object */
function createLinkData(url, options) {
    return {
        link: Object.assign({ mode: 'external', url }, options),
    };
}
/** Create form input data */
function createFormInputData(name, type = 'text') {
    return {
        form: {
            name,
            type: 'input',
            inputType: type,
            passwordPage: false,
        },
    };
}
/** Create form textarea data */
function createFormTextareaData(name) {
    return {
        form: {
            name,
            type: 'textarea',
        },
    };
}
/** Create embed data for SVG/HTML */
function createEmbedData(html) {
    return {
        embed: {
            meta: {
                html,
                div: true,
                script: false,
                compilable: false,
                iframe: false,
            },
        },
    };
}
