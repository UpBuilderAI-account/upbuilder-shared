"use strict";
// ============================================================================
// ELEMENT UTILITY HELPERS
// Generic utilities for working with Element across all packages
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.hasTexts = hasTexts;
exports.hasImages = hasImages;
exports.hasBgColor = hasBgColor;
exports.hasBorder = hasBorder;
exports.hasBgsOrBorders = hasBgsOrBorders;
exports.isValidElement = isValidElement;
exports.removeDecimals = removeDecimals;
/**
 * Check if element has text content
 */
function hasTexts(element) {
    return !!(element.texts && Array.isArray(element.texts) && element.texts.length > 0);
}
/**
 * Check if element has images
 */
function hasImages(element) {
    var _a;
    return (_a = element.hasImages) !== null && _a !== void 0 ? _a : false;
}
/**
 * Check if element has background color
 */
function hasBgColor(element) {
    return !!(element.backgroundColors && element.backgroundColors.length > 0);
}
/**
 * Check if element has borders
 */
function hasBorder(element) {
    var _a;
    if ((_a = element.borders) === null || _a === void 0 ? void 0 : _a.widths) {
        return Object.values(element.borders.widths).some((w) => w > 0.2);
    }
    return false;
}
/**
 * Check if element has backgrounds or borders
 */
function hasBgsOrBorders(element) {
    return hasBgColor(element) || hasBorder(element);
}
/**
 * Check if element is valid (has id, bounds, and content)
 * NOTE: This checks for visual content. For structural validation only,
 * check bounds.width > 0 && bounds.height > 0 directly.
 */
function isValidElement(element) {
    return !!(element &&
        (element.id || element.figmaNodeId) &&
        element.bounds &&
        (hasTexts(element) || hasImages(element) || hasBgsOrBorders(element)));
}
/**
 * Remove decimals from a number (truncates, doesn't round)
 */
function removeDecimals(value) {
    if (value != null && value !== '') {
        const [whole] = value.toString().split('.');
        return Number(whole);
    }
    return 0;
}
