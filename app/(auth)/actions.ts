"use server";

import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { IS_DEMO } from "@/lib/demo";

/**
 * Email/password sign in. On success, send the user to the hub (or the
 * page they were trying to reach). The (member) layout then decides
 * whether they need to subscribe.
 */
export async function signIn(formData: FormData) {
  if (IS_DEMO) redirect("/hub");
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const redirectTo = String(formData.get("redirect") ?? "/hub");

  const supabase = createClient();
  const { error } = await supabase.auth.signInWithPassword({ email, password });

  if (error) {
    redirect(`/login?error=${encodeURIComponent(error.message)}`);
  }
  redirect(redirectTo || "/hub");
}

/**
 * Email/password sign up. If email confirmation is enabled in Supabase,
 * the user must confirm before logging in; otherwise they're signed in
 * immediately. Either way we route them toward subscribing.
 */
export async function signUp(formData: FormData) {
  if (IS_DEMO) redirect("/hub");
  const email = String(formData.get("email") ?? "").trim();
  const password = String(formData.get("password") ?? "");
  const fullName = String(formData.get("full_name") ?? "").trim();

  const supabase = createClient();
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: { full_name: fullName },
      emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
    },
  });

  if (error) {
    redirect(`/signup?error=${encodeURIComponent(error.message)}`);
  }

  // No session => email confirmation required.
  if (!data.session) {
    redirect("/login?notice=Check your email to confirm your account, then log in.");
  }

  redirect("/subscribe");
}

export async function signOut() {
  const supabase = createClient();
  await supabase.auth.signOut();
  redirect("/");
}
