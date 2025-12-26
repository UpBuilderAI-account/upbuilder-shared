/**
 * Basic (Free) plan feature list
 */
export declare const BASIC_FEATURES: readonly ["1 design per project", "2 projects per month", "Community support"];
/**
 * Plus plan feature list
 */
export declare const PLUS_FEATURES: readonly ["Up to 5 designs per project", "20 projects per month", "All platforms supported", "Email support"];
/**
 * Pro plan feature list
 */
export declare const PRO_FEATURES: readonly ["Up to 10 designs per project", "50 projects per month", "All platforms supported", "GitHub sync", "Priority support + early access"];
/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 */
export declare const MAX_DESIGNS_PER_PROJECT: {
    readonly free: 1;
    readonly plus: 5;
    readonly pro: 10;
};
/**
 * Trial configuration
 * Only Pro tier has a trial
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
    readonly plus: {
        readonly name: "Plus";
        readonly price: 4.99;
        readonly displayPrice: "4.99";
        readonly description: "For active creators";
        readonly features: readonly ["Up to 5 designs per project", "20 projects per month", "All platforms supported", "Email support"];
        readonly exportsPerMonth: 20;
        readonly maxDesigns: 5;
        readonly trialDays: 0;
    };
    readonly pro: {
        readonly name: "Pro";
        readonly price: 9.99;
        readonly displayPrice: "9.99";
        readonly description: "For power users";
        readonly features: readonly ["Up to 10 designs per project", "50 projects per month", "All platforms supported", "GitHub sync", "Priority support + early access"];
        readonly exportsPerMonth: 50;
        readonly maxDesigns: 10;
        readonly popular: true;
        readonly trialDays: 3;
    };
};
//# sourceMappingURL=pricing.d.ts.map