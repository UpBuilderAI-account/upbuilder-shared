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
export declare const SHARED_VERSION = "2.1.418";
/**
 * Minimum supported version (optional - for backwards compatibility)
 * If set, versions >= MIN_SUPPORTED_VERSION are accepted
 * If not set, only exact version match is required
 */
export declare const MIN_SUPPORTED_VERSION: string | null;
/**
 * Compare two semantic versions
 * Returns: -1 if a < b, 0 if a === b, 1 if a > b
 */
export declare function compareVersions(a: string, b: string): -1 | 0 | 1;
/**
 * Check if a plugin version is compatible with the current backend version
 * @param pluginVersion - Version string from the plugin
 * @returns true if compatible, false if outdated
 */
export declare function isVersionCompatible(pluginVersion: string): boolean;
/**
 * Get a user-friendly message for version mismatch
 */
export declare function getVersionMismatchMessage(pluginVersion: string): string;
//# sourceMappingURL=version.d.ts.map