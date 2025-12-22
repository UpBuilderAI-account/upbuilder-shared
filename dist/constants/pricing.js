"use strict";
// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRICING_CONFIG = exports.MAX_SECTIONS_PER_EXPORT = exports.MAX_DESIGNS_PER_PROJECT = exports.MAX_FEATURES = exports.PRO_FEATURES = exports.BASIC_FEATURES = void 0;
/**
 * Basic (Free) plan feature list
 */
exports.BASIC_FEATURES = [
    '4 designs per project',
    '2 sections per design',
    '2 exports per month',
    '3 active projects',
    'Community support',
];
/**
 * Pro plan feature list
 */
exports.PRO_FEATURES = [
    '4 designs per project',
    '6 sections per design',
    '20 exports per month',
    '100 active projects',
    'All platforms supported',
    'Priority email support',
];
/**
 * Max plan feature list
 */
exports.MAX_FEATURES = [
    '8 designs per project',
    '20 sections per design',
    '100 exports per month',
    '500 active projects',
    'All platforms supported',
    'Priority support + early access',
];
/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 * Note: All users get 4 design slots
 */
exports.MAX_DESIGNS_PER_PROJECT = {
    free: 4,
    pro: 4,
    max: 4,
};
/**
 * Section export limits per tier
 * Controls how many sections users can export per design
 */
exports.MAX_SECTIONS_PER_EXPORT = {
    free: 2,
    pro: 6,
    max: 20,
};
/**
 * Pricing configuration for display
 * Note: priceId values should be injected from environment variables at runtime
 */
exports.PRICING_CONFIG = {
    basic: {
        name: 'Basic',
        price: 0,
        displayPrice: 'Free',
        description: 'Try UpBuilder for free',
        features: exports.BASIC_FEATURES,
        projectLimit: 3,
        exportsPerMonth: 2,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.free,
        maxSectionsPerExport: exports.MAX_SECTIONS_PER_EXPORT.free,
    },
    pro: {
        name: 'Pro',
        price: 9.99,
        displayPrice: '9.99',
        description: 'For growing creators',
        features: exports.PRO_FEATURES,
        projectLimit: 100,
        exportsPerMonth: 20,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.pro,
        maxSectionsPerExport: exports.MAX_SECTIONS_PER_EXPORT.pro,
        popular: true,
    },
    max: {
        name: 'Max',
        price: 14.99,
        displayPrice: '14.99',
        description: 'For professionals & teams',
        features: exports.MAX_FEATURES,
        projectLimit: 500,
        exportsPerMonth: 100,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.max,
        maxSectionsPerExport: exports.MAX_SECTIONS_PER_EXPORT.max,
    },
};
