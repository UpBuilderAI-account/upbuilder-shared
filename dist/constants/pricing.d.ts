/**
 * Design slots per project (tier-gated)
 */
export declare const MAX_DESIGNS_PER_PROJECT: {
    readonly basic: 2;
    readonly pro: 2;
    readonly max: 9;
};
/**
 * Pricing configuration
 * All tiers are currently free with unlimited exports
 */
export declare const PRICING_CONFIG: {
    readonly basic: {
        readonly name: "Free";
        readonly price: 0;
        readonly displayPrice: "Free";
        readonly description: "Full access to all features";
        readonly features: readonly string[];
        readonly maxDesigns: 2;
    };
    readonly pro: {
        readonly name: "Pro";
        readonly price: 0;
        readonly displayPrice: "Free";
        readonly description: "Full access to all features";
        readonly features: readonly string[];
        readonly maxDesigns: 2;
        readonly popular: true;
    };
    readonly max: {
        readonly name: "Max";
        readonly price: 0;
        readonly displayPrice: "Free";
        readonly description: "Full access to all features";
        readonly features: readonly string[];
        readonly maxDesigns: 9;
    };
};
//# sourceMappingURL=pricing.d.ts.map