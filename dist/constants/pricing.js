"use strict";
// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
// ============================================================================
Object.defineProperty(exports, "__esModule", { value: true });
exports.PRICING_CONFIG = exports.TRIAL_DAYS = exports.MAX_DESIGNS_PER_PROJECT = exports.PRO_FEATURES = exports.BASIC_FEATURES = void 0;
/**
 * Basic (Free) plan feature list
 */
exports.BASIC_FEATURES = [
    '1 design per project',
    '2 projects per month',
    'Community support',
];
/**
 * Pro plan feature list
 */
exports.PRO_FEATURES = [
    'Up to 10 designs per project',
    '200 projects per month',
    'All platforms supported',
    'Priority support + early access',
];
/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 * Basic: 1 design per project (was 10)
 * Pro: 10 designs per project (was 20)
 */
exports.MAX_DESIGNS_PER_PROJECT = {
    free: 1,
    pro: 10,
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
        trialDays: 0,
    },
    pro: {
        name: 'Pro',
        price: 9.99,
        displayPrice: '9.99',
        description: 'For growing creators',
        features: exports.PRO_FEATURES,
        exportsPerMonth: 200,
        maxDesigns: exports.MAX_DESIGNS_PER_PROJECT.pro,
        popular: true,
        trialDays: exports.TRIAL_DAYS,
    },
};
