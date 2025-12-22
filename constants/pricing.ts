// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
// ============================================================================

/**
 * Basic (Free) plan feature list
 */
export const BASIC_FEATURES = [
  '4 designs per project',
  '2 sections per design',
  '2 exports per month',
  '3 active projects',
  'Community support',
] as const;

/**
 * Pro plan feature list
 * Note: Pro includes all premium features with unlimited sections
 */
export const PRO_FEATURES = [
  'Unlimited designs per project',
  'Unlimited sections per design',
  'Unlimited exports per month',
  'Unlimited active projects',
  'All platforms supported',
  'Priority support + early access',
] as const;

/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 * Note: Pro has unlimited (Infinity)
 */
export const MAX_DESIGNS_PER_PROJECT = {
  free: 4,
  pro: Infinity,
} as const;

/**
 * Section export limits per tier
 * Controls how many sections users can export per design
 * Note: Pro has unlimited (Infinity)
 */
export const MAX_SECTIONS_PER_EXPORT = {
  free: 2,
  pro: Infinity,
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
    projectLimit: 3,
    exportsPerMonth: 2,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.free,
    maxSectionsPerExport: MAX_SECTIONS_PER_EXPORT.free,
  },
  pro: {
    name: 'Pro',
    price: 14.99,
    displayPrice: '14.99',
    description: 'For professionals & teams',
    features: PRO_FEATURES,
    projectLimit: Infinity,
    exportsPerMonth: Infinity,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.pro,
    maxSectionsPerExport: MAX_SECTIONS_PER_EXPORT.pro,
    popular: true,
  },
} as const;

