// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
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
  '200 projects per month',
  'All platforms supported',
  'Priority support + early access',
] as const;

/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 * Basic: 1 design per project (was 10)
 * Pro: 10 designs per project (was 20)
 */
export const MAX_DESIGNS_PER_PROJECT = {
  free: 1,
  pro: 10,
} as const;

/**
 * Trial configuration
 */
export const TRIAL_DAYS = 3;

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
    trialDays: 0,
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    displayPrice: '9.99',
    description: 'For growing creators',
    features: PRO_FEATURES,
    exportsPerMonth: 200,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.pro,
    popular: true,
    trialDays: TRIAL_DAYS,
  },
} as const;

