"use strict";
// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
// ============================================================================
// Tiers: Basic (free), Pro ($9.99), Max ($19.99)
// NOTE: Max tier exists for future use but is hidden from UI pricing cards
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRICING_CONFIG = exports.MAX_DESIGNS_PER_PROJECT = exports.MAX_FEATURES = exports.PRO_FEATURES = exports.BASIC_FEATURES = void 0;
/**
 * Basic (Free) plan feature list
 */
exports.BASIC_FEATURES = [
    '2 designs/month',
    'Preview Webflow Export',
    'Basic support',
];
/**
 * Pro plan feature list
 * NOTE: GitHub sync feature removed
 */
exports.PRO_FEATURES = [
    '200 designs/month',
    'Export to Webflow',
    'Priority support',
];
/**
 * Max plan feature list
 */
exports.MAX_FEATURES = [
    'Unlimited designs/month',
    'Export to Webflow',
    'Priority support',
    'Expand from existing projects',
    'Early access to new features',
];
/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 */
exports.MAX_DESIGNS_PER_PROJECT = {
    basic: 2,
    pro: 2,
    max: 9,
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
        exportsPerMonth: 2,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.basic,
    },
    pro: {
        name: 'Pro',
        price: 9.99,
        displayPrice: '9.99',
        description: 'For power users',
        features: exports.PRO_FEATURES,
        exportsPerMonth: 200,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.pro,
        popular: true,
    },
    max: {
        name: 'Max',
        price: 19.99,
        displayPrice: '19.99',
        description: 'For teams and agencies',
        features: exports.MAX_FEATURES,
        exportsPerMonth: 999999, // Unlimited
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.max,
    },
};
