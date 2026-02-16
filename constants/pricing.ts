// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
// ============================================================================
// Tiers: Free ($0), Pro ($9.99), Max ($19.99)
// All three tiers are displayed in both marketing and dashboard pricing
// ============================================================================

/**
 * Free plan feature list
 */
export const BASIC_FEATURES = [
  'Up to 2 designs per export',
] as const;

/**
 * Pro plan feature list
 */
export const PRO_FEATURES = [
  'Quality mode',
  'Up to 2 designs per export',
] as const;

/**
 * Max plan feature list
 */
export const MAX_FEATURES = [
  'Quality mode',
  'Up to 9 designs per export',
  'Expand with more designs',
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
