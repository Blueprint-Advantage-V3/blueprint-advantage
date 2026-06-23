import { createClient } from "@/lib/supabase/server";
import { ACTIVE_STATUSES } from "@/lib/constants";
import type { Profile, Subscription } from "@/lib/types";

/**
 * Loads the current user's profile + subscription in one place.
 * Returns null user if not authenticated.
 */
export async function getMemberContext() {
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

  const hasAccess = isActive(subscription as Subscription | null);

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
