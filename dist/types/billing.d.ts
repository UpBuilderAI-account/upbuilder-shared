import type { SubscriptionTier } from './core-domain';
export type { SubscriptionTier };
/**
 * Subscription status
 */
export type SubscriptionStatus = 'active' | 'canceled' | 'past_due';
/**
 * Subscription entity
 * Represents user subscription data in database and Stripe
 */
export interface Subscription {
    id: string;
    userId: string;
    plan: SubscriptionTier;
    status: SubscriptionStatus;
    stripeCustomerId: string | null;
    stripeSubscriptionId: string | null;
    currentPeriodStart: string | null;
    currentPeriodEnd: string | null;
    createdAt: string;
    updatedAt: string;
}
/**
 * Plan features configuration
 */
export interface PlanFeatures {
    projectLimit: number | 'unlimited';
    exportsPerMonth: number | 'unlimited';
    features: string[];
}
/**
 * Pricing plan configuration
 * Used for pricing page and plan selection UI
 */
export interface PricingPlan {
    tier: SubscriptionTier;
    name: string;
    price: number;
    priceId: string | null;
    description: string;
    features: PlanFeatures;
    popular?: boolean;
}
//# sourceMappingURL=billing.d.ts.map