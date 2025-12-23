"use strict";
// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRICING_CONFIG = exports.TRIAL_DAYS = exports.MAX_SECTIONS_PER_EXPORT = exports.MAX_DESIGNS_PER_PROJECT = exports.PRO_FEATURES = exports.BASIC_FEATURES = void 0;
/**
 * Basic (Free) plan feature list
 */
exports.BASIC_FEATURES = [
    '2 sections per design',
    '2 exports per month',
    'Community support',
];
/**
 * Pro plan feature list
 * Note: Pro has unlimited sections per design
 */
exports.PRO_FEATURES = [
    'Unlimited sections per design',
    '100 exports per month',
    'All platforms supported',
    'Priority support + early access',
];
/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 */
exports.MAX_DESIGNS_PER_PROJECT = {
    free: 4,
    pro: 8,
};
/**
 * Section export limits per tier
 * Controls how many sections users can export per design
 * Note: Pro has unlimited sections (Infinity)
 */
exports.MAX_SECTIONS_PER_EXPORT = {
    free: 2,
    pro: Infinity,
};
/**
 * Trial configuration
 */
exports.TRIAL_DAYS = 3;
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
        exportsPerMonth: 2,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.free,
        maxSectionsPerExport: exports.MAX_SECTIONS_PER_EXPORT.free,
        trialDays: 0,
    },
    pro: {
        name: 'Pro',
        price: 9.99,
        displayPrice: '9.99',
        description: 'For growing creators',
        features: exports.PRO_FEATURES,
        exportsPerMonth: 100,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.pro,
        maxSectionsPerExport: exports.MAX_SECTIONS_PER_EXPORT.pro,
        popular: true,
        trialDays: exports.TRIAL_DAYS,
    },
};
