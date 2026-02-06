"use strict";
// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
// ============================================================================
// Tiers: Free ($0), Pro ($9.99), Max ($19.99)
// All three tiers are displayed in both marketing and dashboard pricing
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRICING_CONFIG = exports.MAX_DESIGNS_PER_PROJECT = exports.MAX_FEATURES = exports.PRO_FEATURES = exports.BASIC_FEATURES = void 0;
/**
 * Free plan feature list
 */
exports.BASIC_FEATURES = [
    '2 exports/month',
    'Preview only (no Webflow export)',
    'Basic support',
];
/**
 * Pro plan feature list
 */
exports.PRO_FEATURES = [
    'Unlimited exports',
    'Up to 2 frames per export',
    'Full Webflow export',
    'Priority support',
];
/**
 * Max plan feature list
 * Uses "Everything in Pro, plus:" framing on pricing cards
 */
exports.MAX_FEATURES = [
    'Up to 9 frames per export',
    'Build on past exports',
    'Early access to new features',
];
/**
 * Design slots per tier
 * Controls how many frames users can select in the plugin
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
        name: 'Free',
        price: 0,
        displayPrice: 'Free',
        description: 'Try it out',
        features: exports.BASIC_FEATURES,
        exportsPerMonth: 2,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.basic,
    },
    pro: {
        name: 'Pro',
        price: 9.99,
        displayPrice: '9.99',
        description: 'For individual makers',
        features: exports.PRO_FEATURES,
        exportsPerMonth: 999999, // Unlimited
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.pro,
        popular: true,
    },
    max: {
        name: 'Max',
        price: 19.99,
        displayPrice: '19.99',
        description: 'For teams & agencies',
        features: exports.MAX_FEATURES,
        exportsPerMonth: 999999, // Unlimited
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.max,
    },
};
