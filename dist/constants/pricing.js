"use strict";
// ============================================================================
// PRICING CONSTANTS
// All users have unlimited access - no export limits
// Frame-per-project limits remain tier-gated
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRICING_CONFIG = exports.MAX_DESIGNS_PER_PROJECT = void 0;
/**
 * Design slots per project (tier-gated)
 */
exports.MAX_DESIGNS_PER_PROJECT = {
    basic: 2,
    pro: 2,
    max: 9,
};
/**
 * Pricing configuration
 * All tiers are currently free with unlimited exports
 */
exports.PRICING_CONFIG = {
    basic: {
        name: 'Free',
        price: 0,
        displayPrice: 'Free',
        description: 'Full access to all features',
        features: [
            'Figma to Webflow conversion',
            'Unlimited exports',
            'Up to 2 frames per export',
        ],
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.basic,
    },
    pro: {
        name: 'Pro',
        price: 0,
        displayPrice: 'Free',
        description: 'Full access to all features',
        features: [
            'Figma to Webflow conversion',
            'Unlimited exports',
            'Up to 2 frames per export',
        ],
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.pro,
        popular: true,
    },
    max: {
        name: 'Max',
        price: 0,
        displayPrice: 'Free',
        description: 'Full access to all features',
        features: [
            'Figma to Webflow conversion',
            'Unlimited exports',
            'Up to 9 frames per export',
            'Build on past exports',
            'Early access features',
        ],
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.max,
    },
};
