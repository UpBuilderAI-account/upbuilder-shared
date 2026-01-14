/**
 * Basic (Free) plan feature list
 */
export declare const BASIC_FEATURES: readonly ["2 designs/month", "Preview Webflow Export", "Basic support"];
/**
 * Pro plan feature list
 * NOTE: GitHub sync feature removed
 */
export declare const PRO_FEATURES: readonly ["200 designs/month", "Export to Webflow", "Priority support"];
/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 */
export declare const MAX_DESIGNS_PER_PROJECT: {
    readonly free: 1;
    readonly pro: 10;
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
        readonly features: readonly ["2 designs/month", "Preview Webflow Export", "Basic support"];
        readonly exportsPerMonth: 2;
        readonly maxDesigns: 1;
    };
    readonly pro: {
        readonly name: "Pro";
        readonly price: 9.99;
        readonly displayPrice: "9.99";
        readonly description: "For power users";
        readonly features: readonly ["200 designs/month", "Export to Webflow", "Priority support"];
        readonly exportsPerMonth: 200;
        readonly maxDesigns: 10;
        readonly popular: true;
    };
};
//# sourceMappingURL=pricing.d.ts.map