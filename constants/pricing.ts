// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
// ============================================================================
// NOTE: Plus tier has been removed - only Basic (free) and Pro tiers exist
// ============================================================================

/**
 * Basic (Free) plan feature list
 */
export const BASIC_FEATURES = [
  '1 design per project',
  '2 projects per month',
  'Community support',
] as const;

/**
 * Pro plan feature list
 */
export const PRO_FEATURES = [
  'Up to 10 designs per project',
  '50 projects per month',
  'All platforms supported',
  'GitHub sync',
  'Priority support + early access',
] as const;

/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 */
export const MAX_DESIGNS_PER_PROJECT = {
  free: 1,
  pro: 10,
} as const;

/**
 * Pricing configuration for display
 * Note: priceId values should be injected from environment variables at runtime
 */
export const PRICING_CONFIG = {
  basic: {
    name: 'Basic',
    price: 0,
    displayPrice: 'Free',
    description: 'Try UpBuilder for free',
    features: BASIC_FEATURES,
    exportsPerMonth: 2,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.free,
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    displayPrice: '9.99',
    description: 'For power users',
    features: PRO_FEATURES,
    exportsPerMonth: 50,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.pro,
    popular: true,
  },
} as const;

