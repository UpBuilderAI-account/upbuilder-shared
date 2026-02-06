// ============================================================================
// PRICING CONSTANTS
// All users have unlimited access - no export limits
// Frame-per-project limits remain tier-gated
// ============================================================================

/**
 * Design slots per project (tier-gated)
 */
export const MAX_DESIGNS_PER_PROJECT = {
  basic: 2,
  pro: 2,
  max: 9,
} as const;

/**
 * Pricing configuration
 * All tiers are currently free with unlimited exports
 */
export const PRICING_CONFIG = {
  basic: {
    name: 'Free',
    price: 0,
    displayPrice: 'Free',
    description: 'Full access to all features',
    features: [
      'Figma to Webflow conversion',
      'Unlimited exports',
      'Up to 2 frames per export',
    ] as readonly string[],
    maxDesigns: MAX_DESIGNS_PER_PROJECT.basic,
  },
  pro: {
    name: 'Pro',
    price: 0,
    displayPrice: 'Free',
    description: 'Full access to all features',
    features: [
      'Figma to Webflow conversion',
      'Unlimited exports',
      'Up to 2 frames per export',
    ] as readonly string[],
    maxDesigns: MAX_DESIGNS_PER_PROJECT.pro,
    popular: true,
  },
  max: {
    name: 'Max',
    price: 0,
    displayPrice: 'Free',
    description: 'Full access to all features',
    features: [
      'Figma to Webflow conversion',
      'Unlimited exports',
      'Up to 9 frames per export',
      'Build on past exports',
      'Early access features',
    ] as readonly string[],
    maxDesigns: MAX_DESIGNS_PER_PROJECT.max,
  },
} as const;
