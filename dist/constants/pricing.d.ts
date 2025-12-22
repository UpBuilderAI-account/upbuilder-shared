/**
 * Basic (Free) plan feature list
 */
export declare const BASIC_FEATURES: readonly ["4 designs per project", "2 sections per design", "2 exports per month", "3 active projects", "Community support"];
/**
 * Pro plan feature list
 * Note: Pro includes all premium features with unlimited sections
 */
export declare const PRO_FEATURES: readonly ["Unlimited designs per project", "Unlimited sections per design", "Unlimited exports per month", "Unlimited active projects", "All platforms supported", "Priority support + early access"];
/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 * Note: Pro has unlimited (Infinity)
 */
export declare const MAX_DESIGNS_PER_PROJECT: {
    readonly free: 4;
    readonly pro: number;
};
/**
 * Section export limits per tier
 * Controls how many sections users can export per design
 * Note: Pro has unlimited (Infinity)
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
        readonly features: readonly ["4 designs per project", "2 sections per design", "2 exports per month", "3 active projects", "Community support"];
        readonly projectLimit: 3;
        readonly exportsPerMonth: 2;
        readonly maxDesigns: 4;
        readonly maxSectionsPerExport: 2;
    };
    readonly pro: {
        readonly name: "Pro";
        readonly price: 14.99;
        readonly displayPrice: "14.99";
        readonly description: "For professionals & teams";
        readonly features: readonly ["Unlimited designs per project", "Unlimited sections per design", "Unlimited exports per month", "Unlimited active projects", "All platforms supported", "Priority support + early access"];
        readonly projectLimit: number;
        readonly exportsPerMonth: number;
        readonly maxDesigns: number;
        readonly maxSectionsPerExport: number;
        readonly popular: true;
    };
};
//# sourceMappingURL=pricing.d.ts.map