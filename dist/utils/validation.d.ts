/**
 * Check if a string is a valid UUID v4
 * @param value - String to validate
 * @returns true if valid UUID v4, false otherwise
 */
export declare function isValidUUID(value: unknown): value is string;
/**
 * Filter an array to only valid UUIDs
 * @param values - Array of potential UUIDs
 * @returns Array containing only valid UUIDs
 */
export declare function filterValidUUIDs(values: unknown[]): string[];
/**
 * Validate that all values in an array are valid UUIDs
 * @param values - Array of potential UUIDs
 * @returns Object with valid flag and invalid indices
 */
export declare function validateUUIDs(values: unknown[]): {
    valid: boolean;
    invalidIndices: number[];
    validUUIDs: string[];
};
//# sourceMappingURL=validation.d.ts.map