import { redirect } from "next/navigation";
import { getMemberContext, isAdmin } from "@/lib/subscription";
import { createClient } from "@/lib/supabase/server";
import { Sidebar } from "@/components/layout/Sidebar";
import { TopBar } from "@/components/layout/TopBar";
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
  const supabase = createClient();
  const { data: spaces } = await supabase
    .from("spaces")
    .select("*")
    .order("position", { ascending: true });

  return (
    <div className="flex h-screen overflow-hidden bg-canvas">
      <Sidebar spaces={(spaces ?? []) as Space[]} isAdmin={isAdmin(profile)} />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar
          fullName={profile?.full_name ?? user.email ?? "Member"}
          email={user.email ?? ""}
        />
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
