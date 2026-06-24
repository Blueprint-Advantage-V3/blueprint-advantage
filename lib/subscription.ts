import { createClient } from "@/lib/supabase/server";
import { ACTIVE_STATUSES } from "@/lib/constants";
import { IS_DEMO, demoMemberContext } from "@/lib/demo";
import type { Profile, Subscription } from "@/lib/types";

/**
 * The Stripe paywall. OFF until Stripe is wired — while off, any authenticated
 * member gets full hub access (free). Flip NEXT_PUBLIC_SUBSCRIPTION_ENABLED to
 * "true" once Stripe is live to start enforcing active subscriptions.
 */
export const SUBSCRIPTION_ENABLED =
  process.env.NEXT_PUBLIC_SUBSCRIPTION_ENABLED === "true";

/**
 * Loads the current user's profile + subscription in one place.
 * Returns null user if not authenticated.
 */
export async function getMemberContext() {
  // Local demo mode: skip auth/DB entirely and act as an active admin.
  if (IS_DEMO) return demoMemberContext();

  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return { user: null, profile: null, subscription: null, hasAccess: false };
  }

  const [{ data: profile }, { data: subscription }] = await Promise.all([
    supabase.from("profiles").select("*").eq("id", user.id).single(),
    supabase
      .from("subscriptions")
      .select("*")
      .eq("user_id", user.id)
      .maybeSingle(),
  ]);

  // Free access while the paywall is off; otherwise require an active sub.
  const hasAccess =
    !SUBSCRIPTION_ENABLED || isActive(subscription as Subscription | null);

  return {
    user,
    profile: profile as Profile | null,
    subscription: subscription as Subscription | null,
    hasAccess,
  };
}

export function isActive(sub: Subscription | null): boolean {
  if (!sub || !sub.status) return false;
  return (ACTIVE_STATUSES as readonly string[]).includes(sub.status);
}

export function isAdmin(profile: Profile | null): boolean {
  return profile?.role === "admin";
}
