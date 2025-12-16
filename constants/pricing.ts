// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
// ============================================================================

/**
 * Pro plan feature list
 * Single source of truth for all UIs (PricingTable, UpgradeModal, etc.)
 */
export const PRO_FEATURES = [
  'Unlimited design sizes',
  'All platforms (Webflow, Elementor, Bricks)',
  'Advanced component detection',
  'Priority processing queue',
  'Priority email support',
] as const;

/**
 * Basic (Free) plan feature list
 */
export const BASIC_FEATURES = [
  'Support for small designs',
  '1 design per project',
  'Limited platform exports',
  'Basic component detection',
  'Community support',
] as const;

/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 */
export const MAX_DESIGNS_PER_PROJECT = {
  free: 2,
  pro: 4,
} as const;

/**
 * Section export limits per tier
 * Controls how many sections free users can export per design
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
    exportsPerMonth: 1,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.free,
    maxSectionsPerExport: MAX_SECTIONS_PER_EXPORT.free,
  },
  pro: {
    name: 'Pro',
    price: 9.99,
    originalPrice: 14.99,
    displayPrice: '9.99',
    description: 'For professionals & teams',
    features: PRO_FEATURES,
    projectLimit: 'unlimited' as const,
    exportsPerMonth: 'unlimited' as const,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.pro,
    maxSectionsPerExport: MAX_SECTIONS_PER_EXPORT.pro,
    popular: true,
    trialDays: 14,
  },
} as const;

