"use strict";
// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRICING_CONFIG = exports.MAX_DESIGNS_PER_PROJECT = exports.PRO_FEATURES = exports.PLUS_FEATURES = exports.BASIC_FEATURES = void 0;
/**
 * Basic (Free) plan feature list
 */
exports.BASIC_FEATURES = [
    '1 design per project',
    '2 projects per month',
    'Community support',
];
/**
 * Plus plan feature list
 */
exports.PLUS_FEATURES = [
    'Up to 5 designs per project',
    '20 projects per month',
    'All platforms supported',
    'Email support',
];
/**
 * Pro plan feature list
 */
exports.PRO_FEATURES = [
    'Up to 10 designs per project',
    '50 projects per month',
    'All platforms supported',
    'GitHub sync',
    'Priority support + early access',
];
/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 */
exports.MAX_DESIGNS_PER_PROJECT = {
    free: 1,
    plus: 5,
    pro: 10,
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
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.free,
    },
    plus: {
        name: 'Plus',
        price: 4.99,
        displayPrice: '4.99',
        description: 'For active creators',
        features: exports.PLUS_FEATURES,
        exportsPerMonth: 20,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.plus,
    },
    pro: {
        name: 'Pro',
        price: 9.99,
        displayPrice: '9.99',
        description: 'For power users',
        features: exports.PRO_FEATURES,
        exportsPerMonth: 50,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.pro,
        popular: true,
    },
};
