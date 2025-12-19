/**
 * Basic (Free) plan feature list
 */
export declare const BASIC_FEATURES: readonly ["2 designs per project", "2 sections per design", "2 exports per month", "3 active projects", "Community support"];
/**
 * Pro plan feature list
 */
export declare const PRO_FEATURES: readonly ["4 designs per project", "6 sections per design", "20 exports per month", "100 active projects", "All platforms supported", "Priority email support"];
/**
 * Max plan feature list
 */
export declare const MAX_FEATURES: readonly ["8 designs per project", "20 sections per design", "100 exports per month", "500 active projects", "All platforms supported", "Priority support + early access"];
/**
 * Design slots per tier
 * Controls how many frames/designs users can select in the plugin
 */
export declare const MAX_DESIGNS_PER_PROJECT: {
    readonly free: 2;
    readonly pro: 4;
    readonly max: 8;
};
/**
 * Section export limits per tier
 * Controls how many sections users can export per design
 */
export declare const MAX_SECTIONS_PER_EXPORT: {
    readonly free: 2;
    readonly pro: 6;
    readonly max: 20;
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
        readonly features: readonly ["2 designs per project", "2 sections per design", "2 exports per month", "3 active projects", "Community support"];
        readonly projectLimit: 3;
        readonly exportsPerMonth: 2;
        readonly maxDesigns: 2;
        readonly maxSectionsPerExport: 2;
    };
    readonly pro: {
        readonly name: "Pro";
        readonly price: 9.99;
        readonly displayPrice: "9.99";
        readonly description: "For growing creators";
        readonly features: readonly ["4 designs per project", "6 sections per design", "20 exports per month", "100 active projects", "All platforms supported", "Priority email support"];
        readonly projectLimit: 100;
        readonly exportsPerMonth: 20;
        readonly maxDesigns: 4;
        readonly maxSectionsPerExport: 6;
        readonly popular: true;
    };
    readonly max: {
        readonly name: "Max";
        readonly price: 29.99;
        readonly displayPrice: "29.99";
        readonly description: "For professionals & teams";
        readonly features: readonly ["8 designs per project", "20 sections per design", "100 exports per month", "500 active projects", "All platforms supported", "Priority support + early access"];
        readonly projectLimit: 500;
        readonly exportsPerMonth: 100;
        readonly maxDesigns: 8;
        readonly maxSectionsPerExport: 20;
    };
};
//# sourceMappingURL=pricing.d.ts.map