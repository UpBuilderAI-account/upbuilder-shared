"use strict";
// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
// ============================================================================
// Tiers: Free ($0), Pro ($9.99), Max ($19.99)
// All three tiers are displayed in both marketing and dashboard pricing
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRICING_CONFIG = exports.TIER_LIMITS = exports.MAX_DESIGNS_PER_PROJECT = exports.MAX_FEATURES = exports.PRO_FEATURES = exports.BASIC_FEATURES = void 0;
/**
 * Free plan feature list
 */
exports.BASIC_FEATURES = [
    'Up to 2 designs per export',
];
/**
 * Pro plan feature list
 */
exports.PRO_FEATURES = [
    'Quality mode',
    'Up to 2 designs per export',
];
/**
 * Max plan feature list
 */
exports.MAX_FEATURES = [
    'Quality mode',
    'Up to 9 designs per export',
    'Expand with more designs',
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
 * Comprehensive tier limits for enforcement
 * Used by backend to validate exports and by frontend to show upgrade prompts
 */
exports.TIER_LIMITS = {
    basic: {
        exportsPerMonth: 9,
        maxDesignsPerExport: 2,
        qualityMode: false,
        aiImageDetection: false,
    },
    pro: {
        exportsPerMonth: 30,
        maxDesignsPerExport: 2,
        qualityMode: true,
        aiImageDetection: true,
    },
    max: {
        exportsPerMonth: 100,
        maxDesignsPerExport: 9,
        qualityMode: true,
        aiImageDetection: true,
    },
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
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.basic,
    },
    pro: {
        name: 'Pro',
        price: 9.99,
        displayPrice: '9.99',
        description: 'For individual makers',
        features: exports.PRO_FEATURES,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.pro,
        popular: true,
    },
    max: {
        name: 'Max',
        price: 19.99,
        displayPrice: '19.99',
        description: 'For teams & agencies',
        features: exports.MAX_FEATURES,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.max,
    },
};
