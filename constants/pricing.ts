// ============================================================================
// PRICING CONSTANTS
// Export limits removed - unlimited exports for all users
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
 * Pricing configuration (kept for backward compat, all unlimited)
 */
export const PRICING_CONFIG = {
  basic: {
    name: 'Free',
    price: 0,
    displayPrice: 'Free',
    description: 'Unlimited access',
    features: [] as readonly string[],
    exportsPerMonth: 999999,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.basic,
  },
  pro: {
    name: 'Pro',
    price: 0,
    displayPrice: 'Free',
    description: 'Unlimited access',
    features: [] as readonly string[],
    exportsPerMonth: 999999,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.pro,
  },
  max: {
    name: 'Max',
    price: 0,
    displayPrice: 'Free',
    description: 'Unlimited access',
    features: [] as readonly string[],
    exportsPerMonth: 999999,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.max,
  },
} as const;
