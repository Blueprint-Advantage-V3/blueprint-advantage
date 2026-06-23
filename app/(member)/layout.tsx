import { redirect } from "next/navigation";
import { getMemberContext, isAdmin } from "@/lib/subscription";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
import { IS_DEMO, demoSpaces } from "@/lib/demo";
import type { Space } from "@/lib/types";

/**
 * THE HUB SHELL. Rendered once and persists across navigation between
 * spaces/lessons — the sidebar and top bar never reload; only the main
 * content swaps (App Router nested routing). This is what gives the
 * app-like, Discord feel.
 *
 * Gate: must be authenticated (enforced by middleware) AND have an active
 * subscription (enforced here). Non-subscribers are sent to the paywall.
 */
export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, hasAccess } = await getMemberContext();

  if (!user) redirect("/login?redirect=/hub");
  if (!hasAccess) redirect("/subscribe");

  // Load the spaces for the sidebar. Admins see unpublished ones too
  // (RLS already enforces this; the order is by position).
  let spaces: Space[];
  if (IS_DEMO) {
    spaces = demoSpaces();
  } else {
    const supabase = createClient();
    const { data } = await supabase
      .from("spaces")
      .select("*")
      .order("position", { ascending: true });
    spaces = (data ?? []) as Space[];
  }

  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      <Sidebar spaces={spaces} isAdmin={isAdmin(profile)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        {IS_DEMO && (
          <div className="flex-none bg-amber-500/15 px-6 py-1.5 text-center text-xs text-amber-300">
            🔍 Demo mode — sample content, no login required. Connect Supabase +
            Stripe to go live.
          </div>
        )}
        <TopBar
          fullName={profile?.full_name ?? user.email ?? "Member"}
          email={user.email ?? ""}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
