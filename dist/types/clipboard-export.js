"use strict";
// ============================================================================
// CLIPBOARD EXPORT TYPES
// Schema for JSON blob copied from plugin → pasted in frontend Code panel
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateClipboardExportData = validateClipboardExportData;
/**
 * Validates if an object is a valid ClipboardExportData.
 * Returns an error message if invalid, or null if valid.
 */
function validateClipboardExportData(data) {
    if (!data || typeof data !== 'object') {
        return 'Invalid format. Please copy from Figma plugin.';
    }
    const obj = data;
    if (obj.version !== 1) {
        return 'Unsupported version. Please update your Figma plugin.';
    }
    if (!obj.projectId || typeof obj.projectId !== 'string') {
        return 'Missing project ID. Please re-export from Figma plugin.';
    }
    if (!obj.projectName || typeof obj.projectName !== 'string') {
        return 'Missing project name.';
    }
    if (!Array.isArray(obj.designs) || obj.designs.length === 0) {
        return 'No designs found in export.';
    }
    for (const design of obj.designs) {
        if (!design.designId || !design.designName) {
            return 'Invalid design data.';
        }
    }
    if (obj.platform !== 'webflow' && obj.platform !== 'react') {
        return 'Invalid platform. Must be "webflow" or "react".';
    }
    return null;
}
