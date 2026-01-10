"use strict";
/**
 * EDITABLE TREE TYPES
 * Safe format for frontend customizer - no Webflow internals exposed
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATE_DISPLAY_ORDER = exports.STATE_CONFIG = exports.BREAKPOINT_CASCADE_ORDER = exports.BREAKPOINT_CONFIG = void 0;
exports.getCompoundSelector = getCompoundSelector;
exports.parseCompoundSelector = parseCompoundSelector;
exports.isCompoundSelector = isCompoundSelector;
exports.migrateEditableClass = migrateEditableClass;
/**
 * All breakpoint configurations
 */
exports.BREAKPOINT_CONFIG = {
    xxl: {
        label: '1920px',
        query: '@media (min-width: 1920px)',
        width: 1920,
        cascadeDirection: 'up',
        cascadeSource: 'xl',
    },
    xl: {
        label: '1440px',
        query: '@media (min-width: 1440px)',
        width: 1440,
        cascadeDirection: 'up',
        cascadeSource: 'large',
    },
    large: {
        label: '1280px',
        query: '@media (min-width: 1280px)',
        width: 1280,
        cascadeDirection: 'up',
        cascadeSource: 'desktop',
    },
    desktop: {
        label: 'Desktop',
        query: null,
        width: null,
        cascadeDirection: 'none',
        cascadeSource: null,
    },
    tablet: {
        label: 'Tablet',
        query: '@media (max-width: 991px)',
        width: 991,
        cascadeDirection: 'down',
        cascadeSource: 'desktop',
    },
    mobileLandscape: {
        label: 'Landscape',
        query: '@media (max-width: 767px)',
        width: 767,
        cascadeDirection: 'down',
        cascadeSource: 'tablet',
    },
    mobile: {
        label: 'Mobile',
        query: '@media (max-width: 478px)',
        width: 478,
        cascadeDirection: 'down',
        cascadeSource: 'mobileLandscape',
    },
};
/**
 * Breakpoints in cascade order (larger to smaller)
 */
exports.BREAKPOINT_CASCADE_ORDER = [
    'xxl', 'xl', 'large', 'desktop', 'tablet', 'mobileLandscape', 'mobile'
];
/**
 * All state configurations
 */
exports.STATE_CONFIG = {
    none: {
        label: 'None',
        cssSelector: '',
        inheritsFrom: 'none',
        applicableTo: 'all',
    },
    hover: {
        label: 'Hover',
        cssSelector: ':hover',
        inheritsFrom: 'none',
        applicableTo: 'all',
    },
    pressed: {
        label: 'Pressed',
        cssSelector: ':active',
        inheritsFrom: 'hover', // KEY: Pressed inherits from Hover!
        applicableTo: 'all',
    },
    focused: {
        label: 'Focused',
        cssSelector: ':focus',
        inheritsFrom: 'none',
        applicableTo: 'all',
    },
    focusVisible: {
        label: 'Focus (keyboard)',
        cssSelector: ':focus-visible',
        inheritsFrom: 'none',
        applicableTo: 'all',
    },
    visited: {
        label: 'Visited',
        cssSelector: ':visited',
        inheritsFrom: 'none',
        applicableTo: 'links',
    },
    current: {
        label: 'Current',
        cssSelector: '.w--current',
        inheritsFrom: 'none',
        applicableTo: 'links',
    },
    placeholder: {
        label: 'Placeholder',
        cssSelector: '::placeholder',
        inheritsFrom: 'none',
        applicableTo: 'inputs',
    },
    checked: {
        label: 'Checked',
        cssSelector: ':checked',
        inheritsFrom: 'none',
        applicableTo: 'checkables',
    },
    disabled: {
        label: 'Disabled',
        cssSelector: ':disabled',
        inheritsFrom: 'none',
        applicableTo: 'inputs',
    },
};
/**
 * States in display order
 */
exports.STATE_DISPLAY_ORDER = [
    'none', 'hover', 'pressed', 'focused', 'focusVisible',
    'visited', 'current', 'placeholder', 'checked', 'disabled'
];
// ============================================================================
// COMPOUND SELECTOR UTILITIES
// ============================================================================
/**
 * Generate compound CSS selector from class stack
 * e.g., ['button', 'is-primary'] → '.button.is-primary'
 */
function getCompoundSelector(classStack) {
    if (!classStack || classStack.length === 0)
        return '';
    return '.' + classStack.join('.');
}
/**
 * Parse compound selector back to class stack
 * e.g., '.button.is-primary' → ['button', 'is-primary']
 */
function parseCompoundSelector(selector) {
    if (!selector)
        return [];
    // Remove leading dot and split
    return selector.replace(/^\./, '').split('.');
}
/**
 * Check if a selector is a compound (has multiple classes)
 */
function isCompoundSelector(selector) {
    const parts = parseCompoundSelector(selector);
    return parts.length > 1;
}
/**
 * Convert legacy class format to new format
 */
function migrateEditableClass(legacy) {
    var _a, _b, _c, _d, _e, _f, _g;
    const properties = {};
    // Desktop properties → desktop.none
    if (((_a = legacy.properties) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        properties.desktop = { none: legacy.properties };
    }
    // Variants → breakpoint.none
    if ((_c = (_b = legacy.variants) === null || _b === void 0 ? void 0 : _b.tablet) === null || _c === void 0 ? void 0 : _c.length) {
        properties.tablet = { none: legacy.variants.tablet };
    }
    if ((_e = (_d = legacy.variants) === null || _d === void 0 ? void 0 : _d.mobileLandscape) === null || _e === void 0 ? void 0 : _e.length) {
        properties.mobileLandscape = { none: legacy.variants.mobileLandscape };
    }
    if ((_g = (_f = legacy.variants) === null || _f === void 0 ? void 0 : _f.mobile) === null || _g === void 0 ? void 0 : _g.length) {
        properties.mobile = { none: legacy.variants.mobile };
    }
    return {
        id: legacy.id,
        name: legacy.name,
        isCombo: legacy.isCombo,
        baseClassName: legacy.baseClassName,
        properties,
        usageCount: legacy.usageCount,
    };
}
