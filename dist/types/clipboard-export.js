"use strict";
// ============================================================================
// CLIPBOARD EXPORT TYPES
// Schema for JSON blob copied from plugin → pasted in frontend Code panel
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateClipboardExportData = validateClipboardExportData;
exports.validateSessionClipboardData = validateSessionClipboardData;
exports.detectClipboardFormat = detectClipboardFormat;
/**
 * Validates if an object is a valid ClipboardExportData.
 * Returns an error message if invalid, or null if valid.
 * @deprecated Use validateSessionClipboardData for new session-based exports
 */
function validateClipboardExportData(data) {
    if (!data || typeof data !== 'object') {
        return 'Invalid format. Please copy from Figma plugin.';
    }
    const obj = data;
    if (!obj.projectId || typeof obj.projectId !== 'string') {
        return 'Missing project ID. Please re-export from Figma plugin.';
    }
    if (!Array.isArray(obj.designs) || obj.designs.length === 0) {
        return 'No designs found in export.';
    }
    for (const design of obj.designs) {
        if (!design.designId || !design.designName) {
            return 'Invalid design data.';
        }
    }
    return null;
}
/**
 * Validates if an object is a valid SessionClipboardExportData.
 * Returns an error message if invalid, or null if valid.
 */
function validateSessionClipboardData(data) {
    if (!data || typeof data !== 'object') {
        return 'Invalid format. Please copy from Figma plugin.';
    }
    const obj = data;
    if (!obj.sessionId || typeof obj.sessionId !== 'string') {
        return 'Missing session ID. Please re-export from Figma plugin.';
    }
    if (!Array.isArray(obj.designs) || obj.designs.length === 0) {
        return 'No designs found in export.';
    }
    for (const design of obj.designs) {
        if (!design.tempDesignId || !design.designName) {
            return 'Invalid design data.';
        }
    }
    return null;
}
/**
 * Detects the clipboard format and validates accordingly.
 * Returns { type, error } where type is 'session' | 'legacy' | null.
 */
function detectClipboardFormat(data) {
    if (!data || typeof data !== 'object') {
        return { type: null, error: 'Invalid format. Please copy from Figma plugin.' };
    }
    const obj = data;
    // Check for session format (new)
    if (obj.sessionId && typeof obj.sessionId === 'string') {
        const error = validateSessionClipboardData(data);
        return { type: error ? null : 'session', error };
    }
    // Check for legacy format
    if (obj.projectId && typeof obj.projectId === 'string') {
        const error = validateClipboardExportData(data);
        return { type: error ? null : 'legacy', error };
    }
    return { type: null, error: 'Invalid format. Please copy from Figma plugin.' };
}
