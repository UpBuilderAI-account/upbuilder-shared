/**
 * Pro plan feature list
 * Single source of truth for all UIs (PricingTable, UpgradeModal, etc.)
 */
export declare const PRO_FEATURES: readonly ["Unlimited design sizes", "All platforms (Webflow, Elementor, Bricks)", "Advanced component detection", "Priority processing queue", "Priority email support"];
/**
 * Basic (Free) plan feature list
 */
export declare const BASIC_FEATURES: readonly ["Support for small designs", "1 design per project", "Limited platform exports", "Basic component detection", "Community support"];
/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 */
export declare const MAX_DESIGNS_PER_PROJECT: {
    readonly free: 2;
    readonly pro: 4;
};
/**
 * Section export limits per tier
 * Controls how many sections free users can export per design
 */
export declare const MAX_SECTIONS_PER_EXPORT: {
    readonly free: 2;
    readonly pro: number;
};
/**
 * Pricing configuration for display
 * Note: priceId values should be injected from environment variables at runtime
 */
export declare const PRICING_CONFIG: {
    readonly basic: {
        readonly name: "Basic";
        readonly price: 0;
        readonly displayPrice: "Free";
        readonly description: "Try UpBuilder for free";
        readonly features: readonly ["Support for small designs", "1 design per project", "Limited platform exports", "Basic component detection", "Community support"];
        readonly projectLimit: 3;
        readonly exportsPerMonth: 2;
        readonly maxDesigns: 2;
        readonly maxSectionsPerExport: 2;
    };
    readonly pro: {
        readonly name: "Pro";
        readonly price: 9.99;
        readonly originalPrice: 14.99;
        readonly displayPrice: "9.99";
        readonly description: "For professionals & teams";
        readonly features: readonly ["Unlimited design sizes", "All platforms (Webflow, Elementor, Bricks)", "Advanced component detection", "Priority processing queue", "Priority email support"];
        readonly projectLimit: "unlimited";
        readonly exportsPerMonth: "unlimited";
        readonly maxDesigns: 4;
        readonly maxSectionsPerExport: number;
        readonly popular: true;
    };
};
//# sourceMappingURL=pricing.d.ts.map