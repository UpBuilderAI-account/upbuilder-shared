// ============================================================================
// PRICING CONSTANTS
// Centralized pricing plan and feature definitions
// ============================================================================

/**
 * Basic (Free) plan feature list
 */
export const BASIC_FEATURES = [
  '2 exports per month',
  '3 projects',
  '2 sections per export',
  'Basic component detection',
  'Community support',
] as const;

/**
 * Pro plan feature list
 */
export const PRO_FEATURES = [
  '20 exports per month',
  '100 projects',
  '6 sections per export',
  'All platforms (Webflow, Elementor, Bricks)',
  'Priority email support',
] as const;

/**
 * Max plan feature list
 */
export const MAX_FEATURES = [
  '100 exports per month',
  '500 projects',
  '20 sections per export',
  'All platforms (Webflow, Elementor, Bricks)',
  'Priority support + early access',
] as const;

/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 */
export const MAX_DESIGNS_PER_PROJECT = {
  free: 2,
  pro: 4,
  max: 8,
} as const;

/**
 * Section export limits per tier
 * Controls how many sections users can export per design
 */
export const MAX_SECTIONS_PER_EXPORT = {
  free: 2,
  pro: 6,
  max: 20,
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
    price: 9.99,
    displayPrice: '9.99',
    description: 'For growing creators',
    features: PRO_FEATURES,
    projectLimit: 100,
    exportsPerMonth: 20,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.pro,
    maxSectionsPerExport: MAX_SECTIONS_PER_EXPORT.pro,
    popular: true,
  },
  max: {
    name: 'Max',
    price: 29.99,
    displayPrice: '29.99',
    description: 'For professionals & teams',
    features: MAX_FEATURES,
    projectLimit: 500,
    exportsPerMonth: 100,
    maxDesigns: MAX_DESIGNS_PER_PROJECT.max,
    maxSectionsPerExport: MAX_SECTIONS_PER_EXPORT.max,
  },
} as const;

