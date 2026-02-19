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
  '5 exports',
  '2 designs per import',
] as const;

/**
 * Pro plan feature list
 */
export const PRO_FEATURES = [
  '75 exports/month',
  '2 designs per import',
] as const;

/**
 * Max plan feature list
 */
export const MAX_FEATURES = [
  '200 exports/month',
  '9 designs per import',
  '30 designs per project',
  'Import more designs to a project',
] as const;

/**
 * Design slots per tier
 * Controls how many frames users can select in the plugin
 */
export const MAX_DESIGNS_PER_PROJECT = {
  basic: 2,
  pro: 2,
  max: 9,
} as const;

/**
 * Comprehensive tier limits for enforcement
 * Used by backend to validate exports and by frontend to show upgrade prompts
 */
export const TIER_LIMITS = {
  basic: {
    exportsPerMonth: 5,
    maxDesignsPerExport: 2,
    aiExportsPerMonth: 5,
    // Legacy fields for backwards compatibility
    smartModel: true,
    smartModelUsesPerMonth: 5,
    aiImageDetection: true,
  },
  pro: {
    exportsPerMonth: 75,
    maxDesignsPerExport: 2,
    aiExportsPerMonth: 75,
    // Legacy fields for backwards compatibility
    smartModel: true,
    smartModelUsesPerMonth: 75,
    aiImageDetection: true,
  },
  max: {
    exportsPerMonth: 200,
    maxDesignsPerExport: 9,
    aiExportsPerMonth: 200,
    // Legacy fields for backwards compatibility
    smartModel: true,
    smartModelUsesPerMonth: 200,
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
