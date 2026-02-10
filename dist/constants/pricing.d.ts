/**
 * Free plan feature list
 */
export declare const BASIC_FEATURES: readonly ["Preview export", "Up to 2 frames", "Client-First CSS", "CSS Variables", "CMS schema"];
/**
 * Pro plan feature list
 */
export declare const PRO_FEATURES: readonly ["Full Webflow export", "Up to 2 frames", "CSS Variables", "CMS Collections", "Global Components", "Priority support"];
/**
 * Max plan feature list
 */
export declare const MAX_FEATURES: readonly ["Full Webflow export", "Up to 9 frames", "CSS Variables", "CMS Collections", "Global Components", "Priority support", "Build on past exports"];
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
 * Pricing configuration for display
 * Note: priceId values should be injected from environment variables at runtime
 */
export declare const PRICING_CONFIG: {
    readonly basic: {
        readonly name: "Free";
        readonly price: 0;
        readonly displayPrice: "Free";
        readonly description: "Try it out";
        readonly features: readonly ["Preview export", "Up to 2 frames", "Client-First CSS", "CSS Variables", "CMS schema"];
        readonly maxDesigns: 2;
    };
    readonly pro: {
        readonly name: "Pro";
        readonly price: 9.99;
        readonly displayPrice: "9.99";
        readonly description: "For individual makers";
        readonly features: readonly ["Full Webflow export", "Up to 2 frames", "CSS Variables", "CMS Collections", "Global Components", "Priority support"];
        readonly maxDesigns: 2;
        readonly popular: true;
    };
    readonly max: {
        readonly name: "Max";
        readonly price: 19.99;
        readonly displayPrice: "19.99";
        readonly description: "For teams & agencies";
        readonly features: readonly ["Full Webflow export", "Up to 9 frames", "CSS Variables", "CMS Collections", "Global Components", "Priority support", "Build on past exports"];
        readonly maxDesigns: 9;
    };
};
//# sourceMappingURL=pricing.d.ts.map