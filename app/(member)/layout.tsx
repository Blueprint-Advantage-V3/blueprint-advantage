import { redirect } from "next/navigation";
import { getMemberContext } from "@/lib/subscription";
import { createClient } from "@/lib/supabase/server";
import { ServerRail } from "@/components/layout/ServerRail";
import { ChannelSidebar } from "@/components/layout/ChannelSidebar";
import { StudyBuddy } from "@/components/hub/StudyBuddy";
import { ProgressProvider } from "@/lib/progress";
import { IS_DEMO, demoSpaces, demoChannels } from "@/lib/demo";
import type { Channel, Space } from "@/lib/types";

/**
 * THE HUB SHELL — community-style three-column app frame, rendered once and
 * persisted across navigation:
 *   1. ServerRail    — icon column to switch spaces
 *   2. ChannelSidebar — channels for the active space (+ user panel)
 *   3. main          — the active channel / lesson / home
 *
 * Gate: authenticated (middleware) AND active subscription (here).
 */
export default async function MemberLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile, hasAccess } = await getMemberContext();

  if (!user) redirect("/login?redirect=/hub");
  if (!hasAccess) redirect("/subscribe");

  let spaces: Space[];
  let channels: Channel[];
  if (IS_DEMO) {
    spaces = demoSpaces();
    channels = demoChannels();
  } else {
    const supabase = createClient();
    const [spacesRes, channelsRes] = await Promise.all([
      supabase.from("spaces").select("*").order("position", { ascending: true }),
      supabase.from("channels").select("*").order("position", { ascending: true }),
    ]);
    spaces = (spacesRes.data ?? []) as Space[];
    channels = (channelsRes.data ?? []) as Channel[];
  }

  return (
    <ProgressProvider>
    <div className="flex h-screen overflow-hidden bg-canvas">
      <ServerRail spaces={spaces} />
      <ChannelSidebar
        spaces={spaces}
        channels={channels}
        fullName={profile?.full_name ?? user.email ?? "Member"}
        email={user.email ?? ""}
      />
      <div className="flex flex-1 flex-col overflow-hidden">
        {IS_DEMO && (
          <div className="flex-none border-b border-amber-500/20 bg-amber-500/15 px-gutter py-1.5 text-center text-xs font-label-md text-amber-300">
            🔍 Demo mode — sample content, no login required. Connect Supabase +
            Stripe to go live.
          </div>
        )}
        <main className="draft-grid flex-1 overflow-y-auto">{children}</main>
      </div>
      <StudyBuddy />
    </div>
    </ProgressProvider>
  );
}
