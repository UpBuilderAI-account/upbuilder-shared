/**
 * Basic (Free) plan feature list
 */
export declare const BASIC_FEATURES: readonly ["1 design per project", "2 projects per month", "Community support"];
/**
 * Pro plan feature list
 */
export declare const PRO_FEATURES: readonly ["Up to 10 designs per project", "200 projects per month", "All platforms supported", "Priority support + early access"];
/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 * Basic: 1 design per project (was 10)
 * Pro: 10 designs per project (was 20)
 */
export declare const MAX_DESIGNS_PER_PROJECT: {
    readonly free: 1;
    readonly pro: 10;
};
/**
 * Trial configuration
 */
export declare const TRIAL_DAYS = 3;
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
        readonly features: readonly ["1 design per project", "2 projects per month", "Community support"];
        readonly exportsPerMonth: 2;
        readonly maxDesigns: 1;
        readonly trialDays: 0;
    };
    readonly pro: {
        readonly name: "Pro";
        readonly price: 9.99;
        readonly displayPrice: "9.99";
        readonly description: "For growing creators";
        readonly features: readonly ["Up to 10 designs per project", "200 projects per month", "All platforms supported", "Priority support + early access"];
        readonly exportsPerMonth: 200;
        readonly maxDesigns: 10;
        readonly popular: true;
        readonly trialDays: 3;
    };
};
//# sourceMappingURL=pricing.d.ts.map