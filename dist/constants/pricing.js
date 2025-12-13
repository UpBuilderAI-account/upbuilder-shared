"use strict";
// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRICING_CONFIG = exports.MAX_DESIGNS_PER_PROJECT = exports.BASIC_FEATURES = exports.PRO_FEATURES = void 0;
/**
 * Pro plan feature list
 * Single source of truth for all UIs (PricingTable, UpgradeModal, etc.)
 */
exports.PRO_FEATURES = [
    'Unlimited design sizes',
    'All platforms (Webflow, Elementor, Bricks)',
    'Advanced component detection',
    'Priority processing queue',
    'Priority email support',
];
/**
 * Basic (Free) plan feature list
 */
exports.BASIC_FEATURES = [
    'Support for small designs',
    '1 design per project',
    'Limited platform exports',
    'Basic component detection',
    'Community support',
];
/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 */
exports.MAX_DESIGNS_PER_PROJECT = {
    free: 2,
    pro: 4,
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
        exportsPerMonth: 1,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.free,
    },
    pro: {
        name: 'Pro',
        price: 9.99,
        originalPrice: 14.99,
        displayPrice: '9.99',
        description: 'For professionals & teams',
        features: exports.PRO_FEATURES,
        projectLimit: 'unlimited',
        exportsPerMonth: 'unlimited',
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.pro,
        popular: true,
        trialDays: 14,
    },
};
