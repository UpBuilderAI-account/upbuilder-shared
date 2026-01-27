// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
// ============================================================================
// Tiers: Basic (free), Pro ($9.99), Max ($19.99)
// NOTE: Max tier exists for future use but is hidden from UI pricing cards
// ============================================================================

/**
 * Basic (Free) plan feature list
 */
export const BASIC_FEATURES = [
  '2 designs/month',
  'Preview Webflow Export',
  'Basic support',
] as const;

/**
 * Pro plan feature list
 * NOTE: GitHub sync feature removed
 */
export const PRO_FEATURES = [
  '200 designs/month',
  'Export to Webflow',
  'Priority support',
] as const;

/**
 * Max plan feature list
 */
export const MAX_FEATURES = [
  'Unlimited designs/month',
  'Export to Webflow',
  'Priority support',
  'Early access to new features',
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
    exportsPerMonth: 200,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.pro,
    popular: true,
  },
  max: {
    name: 'Max',
    price: 19.99,
    displayPrice: '19.99',
    description: 'For teams and agencies',
    features: MAX_FEATURES,
    exportsPerMonth: 999999, // Unlimited
    maxDesigns: MAX_DESIGNS_PER_PROJECT.pro,
  },
} as const;

