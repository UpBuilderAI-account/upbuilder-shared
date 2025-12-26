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
 * Plus plan feature list
 */
export const PLUS_FEATURES = [
  'Up to 5 designs per project',
  '20 projects per month',
  'All platforms supported',
  'Email support',
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
  plus: 5,
  pro: 10,
} as const;

/**
 * Trial configuration
 * Only Pro tier has a trial
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
  plus: {
    name: 'Plus',
    price: 4.99,
    displayPrice: '4.99',
    description: 'For active creators',
    features: PLUS_FEATURES,
    exportsPerMonth: 20,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.plus,
    trialDays: 0,
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
    trialDays: TRIAL_DAYS,
  },
} as const;

