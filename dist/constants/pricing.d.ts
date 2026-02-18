import type { SubscriptionTier } from '../types/core-domain';
export type { SubscriptionTier };
/**
 * Free plan feature list
 */
export declare const BASIC_FEATURES: readonly ["Fast model", "2 designs per import"];
/**
 * Pro plan feature list
 */
export declare const PRO_FEATURES: readonly ["Fast + Smart model", "2 designs per import"];
/**
 * Max plan feature list
 */
export declare const MAX_FEATURES: readonly ["Fast + Smart model", "9 designs per import", "30 designs per project", "Import more designs to a project"];
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
        readonly smartModel: false;
        readonly smartModelUsesPerMonth: 0;
        readonly aiImageDetection: false;
    };
    readonly pro: {
        readonly exportsPerMonth: 30;
        readonly maxDesignsPerExport: 2;
        readonly smartModel: true;
        readonly smartModelUsesPerMonth: 30;
        readonly aiImageDetection: true;
    };
    readonly max: {
        readonly exportsPerMonth: 100;
        readonly maxDesignsPerExport: 9;
        readonly smartModel: true;
        readonly smartModelUsesPerMonth: 100;
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
        readonly features: readonly ["Fast model", "2 designs per import"];
        readonly maxDesigns: 2;
    };
    readonly pro: {
        readonly name: "Pro";
        readonly price: 9.99;
        readonly displayPrice: "9.99";
        readonly description: "For individual makers";
        readonly features: readonly ["Fast + Smart model", "2 designs per import"];
        readonly maxDesigns: 2;
        readonly popular: true;
    };
    readonly max: {
        readonly name: "Max";
        readonly price: 19.99;
        readonly displayPrice: "19.99";
        readonly description: "For teams & agencies";
        readonly features: readonly ["Fast + Smart model", "9 designs per import", "30 designs per project", "Import more designs to a project"];
        readonly maxDesigns: 9;
    };
};
//# sourceMappingURL=pricing.d.ts.map