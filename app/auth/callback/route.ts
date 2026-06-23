import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

/**
 * Email confirmation / OAuth callback. Supabase redirects here with a
 * `code` to exchange for a session, then we send the user to subscribe.
 */
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/subscribe";

  if (code) {
    const supabase = createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  return NextResponse.redirect(`${origin}/login?error=Could not sign you in`);
}
