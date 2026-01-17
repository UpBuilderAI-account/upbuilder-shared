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
exports.getChainSignature = getChainSignature;
exports.parseChainSignature = parseChainSignature;
exports.buildSelectorFromChain = buildSelectorFromChain;
exports.parseStyleLess = parseStyleLess;
exports.toStyleLess = toStyleLess;
exports.styleLessToProperties = styleLessToProperties;
exports.propertiesToStyleLess = propertiesToStyleLess;
/**
 * All breakpoint configurations
 */
exports.BREAKPOINT_CONFIG = {
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
    mobile: {
        label: 'Mobile',
        query: '@media (max-width: 478px)',
        width: 478,
        cascadeDirection: 'down',
        cascadeSource: 'tablet',
    },
};
/**
 * Breakpoints in cascade order (larger to smaller)
 */
exports.BREAKPOINT_CASCADE_ORDER = [
    'desktop', 'tablet', 'mobile'
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
    var _a, _b, _c, _d, _e;
    const properties = {};
    // Desktop properties → desktop.none
    if (((_a = legacy.properties) === null || _a === void 0 ? void 0 : _a.length) > 0) {
        properties.desktop = { none: legacy.properties };
    }
    // Variants → breakpoint.none
    if ((_c = (_b = legacy.variants) === null || _b === void 0 ? void 0 : _b.tablet) === null || _c === void 0 ? void 0 : _c.length) {
        properties.tablet = { none: legacy.variants.tablet };
    }
    if ((_e = (_d = legacy.variants) === null || _d === void 0 ? void 0 : _d.mobile) === null || _e === void 0 ? void 0 : _e.length) {
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
/**
 * Get chain signature from class stack
 * Uses + delimiter to avoid confusion with CSS selectors (which use .)
 */
function getChainSignature(classStack) {
    return classStack.join('+');
}
/**
 * Parse chain signature back to class stack
 */
function parseChainSignature(signature) {
    return signature.split('+').filter(Boolean);
}
/**
 * Build CSS selector from chain context
 * ['button', 'is-primary'] → '.button.is-primary'
 */
function buildSelectorFromChain(chainContext) {
    if (!chainContext || chainContext.length === 0)
        return '';
    return '.' + chainContext.join('.');
}
/**
 * Parse CSS string to property map
 * "padding: 20px; color: #fff;" → Map { 'padding' => '20px', 'color' => '#fff' }
 */
function parseStyleLess(styleLess) {
    const map = new Map();
    if (!styleLess)
        return map;
    styleLess.split(';').forEach(decl => {
        const colonIndex = decl.indexOf(':');
        if (colonIndex === -1)
            return;
        const prop = decl.slice(0, colonIndex).trim();
        const val = decl.slice(colonIndex + 1).trim();
        if (prop && val) {
            map.set(prop, val);
        }
    });
    return map;
}
/**
 * Convert property map to CSS string
 * Map { 'padding' => '20px', 'color' => '#fff' } → "padding: 20px; color: #fff"
 */
function toStyleLess(props) {
    return Array.from(props.entries())
        .map(([prop, val]) => `${prop}: ${val}`)
        .join('; ');
}
/**
 * Convert WebflowStyleObject's styleLess to EditableProperty array
 * For compatibility with existing UI components
 */
function styleLessToProperties(styleLess, categorizer) {
    const props = parseStyleLess(styleLess);
    const defaultCategory = 'other';
    return Array.from(props.entries()).map(([name, value]) => ({
        name,
        value,
        category: categorizer ? categorizer(name) : defaultCategory,
    }));
}
/**
 * Convert EditableProperty array to styleLess string
 * For compatibility with existing data
 */
function propertiesToStyleLess(properties) {
    if (!properties || properties.length === 0)
        return '';
    return properties.map(p => `${p.name}: ${p.value}`).join('; ');
}
