/**
 * Design slots per project (tier-gated)
 */
export declare const MAX_DESIGNS_PER_PROJECT: {
    readonly basic: 2;
    readonly pro: 2;
    readonly max: 9;
};
/**
 * Pricing configuration (kept for backward compat, all unlimited)
 */
export declare const PRICING_CONFIG: {
    readonly basic: {
        readonly name: "Free";
        readonly price: 0;
        readonly displayPrice: "Free";
        readonly description: "Unlimited access";
        readonly features: readonly string[];
        readonly exportsPerMonth: 999999;
        readonly maxDesigns: 2;
    };
    readonly pro: {
        readonly name: "Pro";
        readonly price: 0;
        readonly displayPrice: "Free";
        readonly description: "Unlimited access";
        readonly features: readonly string[];
        readonly exportsPerMonth: 999999;
        readonly maxDesigns: 2;
        readonly popular: true;
    };
    readonly max: {
        readonly name: "Max";
        readonly price: 0;
        readonly displayPrice: "Free";
        readonly description: "Unlimited access";
        readonly features: readonly string[];
        readonly exportsPerMonth: 999999;
        readonly maxDesigns: 9;
    };
};
//# sourceMappingURL=pricing.d.ts.map