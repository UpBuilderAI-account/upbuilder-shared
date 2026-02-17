import type { SubscriptionTier } from '../types/core-domain';
export type { SubscriptionTier };
/**
 * Free plan feature list
 */
export declare const BASIC_FEATURES: readonly ["Up to 2 designs per export"];
/**
 * Pro plan feature list
 */
export declare const PRO_FEATURES: readonly ["Quality mode", "Up to 2 designs per export"];
/**
 * Max plan feature list
 */
export declare const MAX_FEATURES: readonly ["Quality mode", "Up to 9 designs per export", "Expand with more designs"];
/**
 * Design slots per tier
 * Controls how many frames users can select in the plugin
 */
export declare const MAX_DESIGNS_PER_PROJECT: {
    readonly basic: 2;
    readonly pro: 2;
    readonly max: 9;
};
/**
 * Comprehensive tier limits for enforcement
 * Used by backend to validate exports and by frontend to show upgrade prompts
 */
export declare const TIER_LIMITS: {
    readonly basic: {
        readonly exportsPerMonth: 9;
        readonly maxDesignsPerExport: 2;
        readonly qualityMode: false;
        readonly aiImageDetection: false;
    };
    readonly pro: {
        readonly exportsPerMonth: 30;
        readonly maxDesignsPerExport: 2;
        readonly qualityMode: true;
        readonly aiImageDetection: true;
    };
    readonly max: {
        readonly exportsPerMonth: 100;
        readonly maxDesignsPerExport: 9;
        readonly qualityMode: true;
        readonly aiImageDetection: true;
    };
};
export type TierLimits = typeof TIER_LIMITS[SubscriptionTier];
/**
 * Pricing configuration for display
 * Note: priceId values should be injected from environment variables at runtime
 */
export declare const PRICING_CONFIG: {
    readonly basic: {
        readonly name: "Free";
        readonly price: 0;
        readonly displayPrice: "Free";
        readonly description: "Try it out";
        readonly features: readonly ["Up to 2 designs per export"];
        readonly maxDesigns: 2;
    };
    readonly pro: {
        readonly name: "Pro";
        readonly price: 9.99;
        readonly displayPrice: "9.99";
        readonly description: "For individual makers";
        readonly features: readonly ["Quality mode", "Up to 2 designs per export"];
        readonly maxDesigns: 2;
        readonly popular: true;
    };
    readonly max: {
        readonly name: "Max";
        readonly price: 19.99;
        readonly displayPrice: "19.99";
        readonly description: "For teams & agencies";
        readonly features: readonly ["Quality mode", "Up to 9 designs per export", "Expand with more designs"];
        readonly maxDesigns: 9;
    };
};
//# sourceMappingURL=pricing.d.ts.map