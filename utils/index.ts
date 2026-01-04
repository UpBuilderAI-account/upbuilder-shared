// ============================================================================
// SHARED UTILITIES INDEX
// Central export for all utility functions
// ============================================================================

export * from './element-helpers';
export * from './bounds';
export * from './colors';
// Note: html-generator moved to backend-new/utils - not needed in plugin/frontend
export * from './paths';
export * from './export-eta';
// Note: validators not exported here - import directly from './validators' if needed
// This avoids bundling Zod into Figma plugin which doesn't support ES2020+ syntax
