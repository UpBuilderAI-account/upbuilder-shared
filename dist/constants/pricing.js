"use strict";
// ============================================================================
// PRICING CONSTANTS
// Export limits removed - unlimited exports for all users
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
 * Pricing configuration (kept for backward compat, all unlimited)
 */
exports.PRICING_CONFIG = {
    basic: {
        name: 'Free',
        price: 0,
        displayPrice: 'Free',
        description: 'Unlimited access',
        features: [],
        exportsPerMonth: 999999,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.basic,
    },
    pro: {
        name: 'Pro',
        price: 0,
        displayPrice: 'Free',
        description: 'Unlimited access',
        features: [],
        exportsPerMonth: 999999,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.pro,
        popular: true,
    },
    max: {
        name: 'Max',
        price: 0,
        displayPrice: 'Free',
        description: 'Unlimited access',
        features: [],
        exportsPerMonth: 999999,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.max,
    },
};
