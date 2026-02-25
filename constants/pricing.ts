// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
// ============================================================================
// Tiers: Free ($0), Pro ($9.99), Max ($19.99)
// All three tiers are displayed in both marketing and dashboard pricing
// ============================================================================

import type { SubscriptionTier } from '../types/core-domain';

// Re-export for convenience
export type { SubscriptionTier };

/**
 * Free plan feature list
 */
export const BASIC_FEATURES = [
  '1 export',
  '1 design per import',
] as const;

/**
 * Pro plan feature list (deprecated - kept for legacy users)
 */
export const PRO_FEATURES = [
  'Unlimited exports',
  '9 designs per import',
] as const;

/**
 * Max plan feature list
 */
export const MAX_FEATURES = [
  'Unlimited exports',
  '9 designs per import',
  '30 designs per project',
  'Import more designs to a project',
] as const;

/**
 * Design slots per tier
 * Controls how many frames users can select in the plugin
 */
export const MAX_DESIGNS_PER_PROJECT = {
  basic: 1,
  pro: 9, // Legacy pro users get max features
  max: 9,
} as const;

/**
 * Comprehensive tier limits for enforcement
 * Used by backend to validate exports and by frontend to show upgrade prompts
 *
 * Free: 1 export total, 1 design per import
 * Pro (deprecated): Same as Max for legacy users
 * Max: Unlimited exports, 9 designs per import
 */
export const TIER_LIMITS = {
  basic: {
    exportsPerMonth: 1,           // Free tier gets 1 export total
    maxDesignsPerExport: 1,       // Free tier gets 1 design per import
    aiExportsPerMonth: 1,
    // Legacy fields for backwards compatibility
    smartModel: true,
    smartModelUsesPerMonth: 1,
    aiImageDetection: true,
  },
  pro: {
    // Pro is deprecated - give them Max features
    exportsPerMonth: 999999,      // Unlimited
    maxDesignsPerExport: 9,
    aiExportsPerMonth: 999999,
    // Legacy fields for backwards compatibility
    smartModel: true,
    smartModelUsesPerMonth: 999999,
    aiImageDetection: true,
  },
  max: {
    exportsPerMonth: 999999,      // Unlimited
    maxDesignsPerExport: 9,
    aiExportsPerMonth: 999999,
    // Legacy fields for backwards compatibility
    smartModel: true,
    smartModelUsesPerMonth: 999999,
    aiImageDetection: true,
  },
} as const;

export type TierLimits = typeof TIER_LIMITS[SubscriptionTier];

/**
 * Pricing configuration for display
 * Note: priceId values should be injected from environment variables at runtime
 */
export const PRICING_CONFIG = {
  basic: {
    name: 'Free',
    price: 0,
    displayPrice: 'Free',
    description: 'Try it out',
    features: BASIC_FEATURES,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.basic,
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    displayPrice: '9.99',
    description: 'For individual makers',
    features: PRO_FEATURES,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.pro,
    popular: true,
  },
  max: {
    name: 'Max',
    price: 19.99,
    displayPrice: '19.99',
    description: 'For teams & agencies',
    features: MAX_FEATURES,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.max,
  },
} as const;
