import type { SubscriptionTier } from '../types/core-domain';
export type { SubscriptionTier };
/**
 * Free plan feature list
 */
export declare const BASIC_FEATURES: readonly ["1 export", "1 design per import"];
/**
 * Pro plan feature list (deprecated - kept for legacy users)
 */
export declare const PRO_FEATURES: readonly ["Unlimited exports", "9 designs per import"];
/**
 * Max plan feature list
 */
export declare const MAX_FEATURES: readonly ["Unlimited exports", "9 designs per import", "30 designs per project", "Import more designs to a project"];
/**
 * Design slots per tier
 * Controls how many frames users can select in the plugin
 */
export declare const MAX_DESIGNS_PER_PROJECT: {
    readonly basic: 1;
    readonly pro: 9;
    readonly max: 9;
};
/**
 * Comprehensive tier limits for enforcement
 * Used by backend to validate exports and by frontend to show upgrade prompts
 *
 * Free: 1 export total, 1 design per import
 * Pro (deprecated): Same as Max for legacy users
 * Max: Unlimited exports, 9 designs per import
 */
export declare const TIER_LIMITS: {
    readonly basic: {
        readonly exportsPerMonth: 1;
        readonly maxDesignsPerExport: 1;
        readonly aiExportsPerMonth: 1;
        readonly smartModel: true;
        readonly smartModelUsesPerMonth: 1;
        readonly aiImageDetection: true;
    };
    readonly pro: {
        readonly exportsPerMonth: 999999;
        readonly maxDesignsPerExport: 9;
        readonly aiExportsPerMonth: 999999;
        readonly smartModel: true;
        readonly smartModelUsesPerMonth: 999999;
        readonly aiImageDetection: true;
    };
    readonly max: {
        readonly exportsPerMonth: 999999;
        readonly maxDesignsPerExport: 9;
        readonly aiExportsPerMonth: 999999;
        readonly smartModel: true;
        readonly smartModelUsesPerMonth: 999999;
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
        readonly features: readonly ["1 export", "1 design per import"];
        readonly maxDesigns: 1;
    };
    readonly pro: {
        readonly name: "Pro";
        readonly price: 9.99;
        readonly displayPrice: "9.99";
        readonly description: "For individual makers";
        readonly features: readonly ["Unlimited exports", "9 designs per import"];
        readonly maxDesigns: 9;
        readonly popular: true;
    };
    readonly max: {
        readonly name: "Max";
        readonly price: 19.99;
        readonly displayPrice: "19.99";
        readonly description: "For teams & agencies";
        readonly features: readonly ["Unlimited exports", "9 designs per import", "30 designs per project", "Import more designs to a project"];
        readonly maxDesigns: 9;
    };
};
//# sourceMappingURL=pricing.d.ts.map