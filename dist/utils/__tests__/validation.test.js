"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vitest_1 = require("vitest");
const validation_1 = require("../validation");
(0, vitest_1.describe)('isValidUUID', () => {
    (0, vitest_1.it)('should return true for valid UUID v4', () => {
        (0, vitest_1.expect)((0, validation_1.isValidUUID)('550e8400-e29b-41d4-a716-446655440000')).toBe(true);
        (0, vitest_1.expect)((0, validation_1.isValidUUID)('f47ac10b-58cc-4372-a567-0e02b2c3d479')).toBe(true);
        (0, vitest_1.expect)((0, validation_1.isValidUUID)('6ba7b810-9dad-41d1-80b4-00c04fd430c8')).toBe(true);
    });
    (0, vitest_1.it)('should return true for uppercase UUIDs', () => {
        (0, vitest_1.expect)((0, validation_1.isValidUUID)('550E8400-E29B-41D4-A716-446655440000')).toBe(true);
        (0, vitest_1.expect)((0, validation_1.isValidUUID)('F47AC10B-58CC-4372-A567-0E02B2C3D479')).toBe(true);
    });
    (0, vitest_1.it)('should return false for invalid UUIDs', () => {
        // Wrong format
        (0, vitest_1.expect)((0, validation_1.isValidUUID)('not-a-uuid')).toBe(false);
        (0, vitest_1.expect)((0, validation_1.isValidUUID)('')).toBe(false);
        (0, vitest_1.expect)((0, validation_1.isValidUUID)('12345')).toBe(false);
        // Missing hyphens
        (0, vitest_1.expect)((0, validation_1.isValidUUID)('550e8400e29b41d4a716446655440000')).toBe(false);
        // Wrong version number (should be 4)
        (0, vitest_1.expect)((0, validation_1.isValidUUID)('550e8400-e29b-11d4-a716-446655440000')).toBe(false);
        (0, vitest_1.expect)((0, validation_1.isValidUUID)('550e8400-e29b-21d4-a716-446655440000')).toBe(false);
        // Wrong variant (should be 8, 9, a, or b)
        (0, vitest_1.expect)((0, validation_1.isValidUUID)('550e8400-e29b-41d4-c716-446655440000')).toBe(false);
        (0, vitest_1.expect)((0, validation_1.isValidUUID)('550e8400-e29b-41d4-0716-446655440000')).toBe(false);
        // Wrong length
        (0, vitest_1.expect)((0, validation_1.isValidUUID)('550e8400-e29b-41d4-a716-44665544000')).toBe(false);
        (0, vitest_1.expect)((0, validation_1.isValidUUID)('550e8400-e29b-41d4-a716-4466554400000')).toBe(false);
    });
    (0, vitest_1.it)('should return false for non-string values', () => {
        (0, vitest_1.expect)((0, validation_1.isValidUUID)(null)).toBe(false);
        (0, vitest_1.expect)((0, validation_1.isValidUUID)(undefined)).toBe(false);
        (0, vitest_1.expect)((0, validation_1.isValidUUID)(123)).toBe(false);
        (0, vitest_1.expect)((0, validation_1.isValidUUID)({})).toBe(false);
        (0, vitest_1.expect)((0, validation_1.isValidUUID)([])).toBe(false);
    });
});
(0, vitest_1.describe)('filterValidUUIDs', () => {
    (0, vitest_1.it)('should filter out invalid UUIDs', () => {
        const input = [
            '550e8400-e29b-41d4-a716-446655440000',
            'invalid',
            'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            '',
            123,
        ];
        const result = (0, validation_1.filterValidUUIDs)(input);
        (0, vitest_1.expect)(result).toEqual([
            '550e8400-e29b-41d4-a716-446655440000',
            'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        ]);
    });
    (0, vitest_1.it)('should return empty array for invalid input', () => {
        (0, vitest_1.expect)((0, validation_1.filterValidUUIDs)(null)).toEqual([]);
        (0, vitest_1.expect)((0, validation_1.filterValidUUIDs)(undefined)).toEqual([]);
        (0, vitest_1.expect)((0, validation_1.filterValidUUIDs)('not-array')).toEqual([]);
    });
    (0, vitest_1.it)('should return empty array when no valid UUIDs', () => {
        (0, vitest_1.expect)((0, validation_1.filterValidUUIDs)(['invalid', 'also-invalid', ''])).toEqual([]);
    });
});
(0, vitest_1.describe)('validateUUIDs', () => {
    (0, vitest_1.it)('should validate all UUIDs and return result', () => {
        const input = [
            '550e8400-e29b-41d4-a716-446655440000',
            'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        ];
        const result = (0, validation_1.validateUUIDs)(input);
        (0, vitest_1.expect)(result.valid).toBe(true);
        (0, vitest_1.expect)(result.invalidIndices).toEqual([]);
        (0, vitest_1.expect)(result.validUUIDs).toEqual(input);
    });
    (0, vitest_1.it)('should identify invalid UUIDs with their indices', () => {
        const input = [
            '550e8400-e29b-41d4-a716-446655440000',
            'invalid',
            'f47ac10b-58cc-4372-a567-0e02b2c3d479',
            'also-invalid',
        ];
        const result = (0, validation_1.validateUUIDs)(input);
        (0, vitest_1.expect)(result.valid).toBe(false);
        (0, vitest_1.expect)(result.invalidIndices).toEqual([1, 3]);
        (0, vitest_1.expect)(result.validUUIDs).toEqual([
            '550e8400-e29b-41d4-a716-446655440000',
            'f47ac10b-58cc-4372-a567-0e02b2c3d479',
        ]);
    });
    (0, vitest_1.it)('should handle empty array', () => {
        const result = (0, validation_1.validateUUIDs)([]);
        (0, vitest_1.expect)(result.valid).toBe(true);
        (0, vitest_1.expect)(result.invalidIndices).toEqual([]);
        (0, vitest_1.expect)(result.validUUIDs).toEqual([]);
    });
    (0, vitest_1.it)('should handle non-array input', () => {
        const result = (0, validation_1.validateUUIDs)(null);
        (0, vitest_1.expect)(result.valid).toBe(false);
        (0, vitest_1.expect)(result.invalidIndices).toEqual([]);
        (0, vitest_1.expect)(result.validUUIDs).toEqual([]);
    });
});
