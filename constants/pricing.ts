// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
// ============================================================================

/**
 * Basic (Free) plan feature list
 */
export const BASIC_FEATURES = [
  '2 sections per design',
  '10 projects per month',
  'Community support',
] as const;

/**
 * Pro plan feature list
 * Note: Pro has unlimited sections per design
 */
export const PRO_FEATURES = [
  'Unlimited sections per design',
  '200 projects per month',
  'All platforms supported',
  'Priority support + early access',
] as const;

/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 */
export const MAX_DESIGNS_PER_PROJECT = {
  free: 10,
  pro: 20,
} as const;

/**
 * Section export limits per tier
 * Controls how many sections users can export per design
 * Note: Pro has unlimited sections (Infinity)
 */
export const MAX_SECTIONS_PER_EXPORT = {
  free: 2,
  pro: Infinity,
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
    exportsPerMonth: 10,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.free,
    maxSectionsPerExport: MAX_SECTIONS_PER_EXPORT.free,
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
    maxSectionsPerExport: MAX_SECTIONS_PER_EXPORT.pro,
    popular: true,
    trialDays: TRIAL_DAYS,
  },
} as const;

