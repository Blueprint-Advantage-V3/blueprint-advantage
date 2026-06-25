/**
 * Brand + product constants. Swap BRAND here to rename the whole app.
 */
export const BRAND = {
  name: "Blueprint Advantage",
  shortName: "Blueprint",
  tagline: "Build the skills school skips.",
  // Marketing one-liners reused across the landing page.
  promise: "Get into university, master your money, the law, and AI, all in one members-only hub.",
};

export const PRICE_DISPLAY = {
  amount: "$100",
  period: "/month",
  cents: 10000,
};

/**
 * Subscription statuses that grant access to the member hub.
 * Stripe statuses outside this set (canceled, past_due, unpaid, incomplete…)
 * are treated as no-access.
 */
export const ACTIVE_STATUSES = ["active", "trialing"] as const;

export type AccessStatus = (typeof ACTIVE_STATUSES)[number];
