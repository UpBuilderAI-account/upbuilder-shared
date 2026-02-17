"use strict";
// ============================================================================
// VALIDATION UTILITIES
// Lightweight validators that work in all environments (plugin, frontend, backend)
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.isValidUUID = isValidUUID;
exports.filterValidUUIDs = filterValidUUIDs;
exports.validateUUIDs = validateUUIDs;
/**
 * UUID v4 regex pattern
 * Matches standard UUID format: xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx
 */
const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
/**
 * Check if a string is a valid UUID v4
 * @param value - String to validate
 * @returns true if valid UUID v4, false otherwise
 */
function isValidUUID(value) {
    if (typeof value !== 'string')
        return false;
    return UUID_REGEX.test(value);
}
/**
 * Filter an array to only valid UUIDs
 * @param values - Array of potential UUIDs
 * @returns Array containing only valid UUIDs
 */
function filterValidUUIDs(values) {
    if (!Array.isArray(values))
        return [];
    return values.filter(isValidUUID);
}
/**
 * Validate that all values in an array are valid UUIDs
 * @param values - Array of potential UUIDs
 * @returns Object with valid flag and invalid indices
 */
function validateUUIDs(values) {
    if (!Array.isArray(values)) {
        return { valid: false, invalidIndices: [], validUUIDs: [] };
    }
    const invalidIndices = [];
    const validUUIDs = [];
    values.forEach((value, index) => {
        if (isValidUUID(value)) {
            validUUIDs.push(value);
        }
        else {
            invalidIndices.push(index);
        }
    });
    return {
        valid: invalidIndices.length === 0,
        invalidIndices,
        validUUIDs,
    };
}
