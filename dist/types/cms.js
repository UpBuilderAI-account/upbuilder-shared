"use strict";
// ============================================================================
// CMS TYPES
// Shared CMS types for schema, bindings, and XSCP integration
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.normalizeCmsSchema = normalizeCmsSchema;
// ============================================================================
// NORMALIZATION — ensures sampleItems always use { fields: {...} } shape
// ============================================================================
/**
 * Normalize a single sample item to always have { fields: {...} } shape.
 * The AI sometimes generates flat objects like { "Title": "value" } instead of
 * the expected { fields: { "Title": "value" } }.
 */
function normalizeSampleItem(item) {
    if (!item || typeof item !== 'object')
        return { fields: {} };
    const obj = item;
    // Already wrapped correctly
    if (obj.fields && typeof obj.fields === 'object' && !Array.isArray(obj.fields)) {
        return { fields: obj.fields };
    }
    // Flat format — the object itself contains the field values
    const fields = {};
    for (const [key, value] of Object.entries(obj)) {
        if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
            fields[key] = value;
        }
    }
    return { fields };
}
/**
 * Normalize a full CMS schema so every sampleItem is in { fields: {...} } shape.
 * Safe to call on already-normalized schemas (idempotent).
 */
function normalizeCmsSchema(schema) {
    return Object.assign(Object.assign({}, schema), { collections: schema.collections.map(collection => (Object.assign(Object.assign({}, collection), { sampleItems: (collection.sampleItems || []).map(normalizeSampleItem) }))) });
}
