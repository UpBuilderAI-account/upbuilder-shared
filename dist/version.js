"use strict";
// ============================================================================
// SHARED VERSION
// Auto-incremented on each build. Used for plugin-backend version validation.
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.MIN_SUPPORTED_VERSION = exports.SHARED_VERSION = void 0;
exports.compareVersions = compareVersions;
exports.isVersionCompatible = isVersionCompatible;
exports.getVersionMismatchMessage = getVersionMismatchMessage;
/**
 * Current shared package version
 * Format: major.minor.patch (e.g., 2.1.0, 2.1.1, 2.1.2)
 *
 * This version is automatically incremented when running `npm run build`
 * The plugin sends this version to the backend, which validates it matches
 *
 * If versions don't match, the backend rejects the connection with a
 * VERSION_OUTDATED error, prompting the user to close and reopen Figma
 */
exports.SHARED_VERSION = '2.1.162';
/**
 * Minimum supported version (optional - for backwards compatibility)
 * If set, versions >= MIN_SUPPORTED_VERSION are accepted
 * If not set, only exact version match is required
 */
exports.MIN_SUPPORTED_VERSION = null;
/**
 * Compare two semantic versions
 * Returns: -1 if a < b, 0 if a === b, 1 if a > b
 */
function compareVersions(a, b) {
    const partsA = a.split('.').map(Number);
    const partsB = b.split('.').map(Number);
    for (let i = 0; i < Math.max(partsA.length, partsB.length); i++) {
        const numA = partsA[i] || 0;
        const numB = partsB[i] || 0;
        if (numA < numB)
            return -1;
        if (numA > numB)
            return 1;
    }
    return 0;
}
/**
 * Check if a plugin version is compatible with the current backend version
 * @param pluginVersion - Version string from the plugin
 * @returns true if compatible, false if outdated
 */
function isVersionCompatible(pluginVersion) {
    if (exports.MIN_SUPPORTED_VERSION) {
        return compareVersions(pluginVersion, exports.MIN_SUPPORTED_VERSION) >= 0;
    }
    return pluginVersion === exports.SHARED_VERSION;
}
/**
 * Get a user-friendly message for version mismatch
 */
function getVersionMismatchMessage(pluginVersion) {
    return `Plugin version (${pluginVersion}) is outdated. Current version is ${exports.SHARED_VERSION}. Please close this Figma tab and open a new one to update the plugin.`;
}
