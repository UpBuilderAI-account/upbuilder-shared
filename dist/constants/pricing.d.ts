/**
 * Free plan feature list
 */
export declare const BASIC_FEATURES: readonly ["2 exports/month", "Preview only (no Webflow export)", "Basic support"];
/**
 * Pro plan feature list
 */
export declare const PRO_FEATURES: readonly ["Unlimited exports", "Up to 2 frames per export", "Full Webflow export", "Priority support"];
/**
 * Max plan feature list
 * Uses "Everything in Pro, plus:" framing on pricing cards
 */
export declare const MAX_FEATURES: readonly ["Up to 9 frames per export", "Build on past exports", "Early access to new features"];
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
        readonly features: readonly ["2 exports/month", "Preview only (no Webflow export)", "Basic support"];
        readonly exportsPerMonth: 2;
        readonly maxDesigns: 2;
    };
    readonly pro: {
        readonly name: "Pro";
        readonly price: 9.99;
        readonly displayPrice: "9.99";
        readonly description: "For individual makers";
        readonly features: readonly ["Unlimited exports", "Up to 2 frames per export", "Full Webflow export", "Priority support"];
        readonly exportsPerMonth: 999999;
        readonly maxDesigns: 2;
        readonly popular: true;
    };
    readonly max: {
        readonly name: "Max";
        readonly price: 19.99;
        readonly displayPrice: "19.99";
        readonly description: "For teams & agencies";
        readonly features: readonly ["Up to 9 frames per export", "Build on past exports", "Early access to new features"];
        readonly exportsPerMonth: 999999;
        readonly maxDesigns: 9;
    };
};
//# sourceMappingURL=pricing.d.ts.map