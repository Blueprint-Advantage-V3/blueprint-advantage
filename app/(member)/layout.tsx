import { redirect } from "next/navigation";
import { getMemberContext } from "@/lib/subscription";
import { createClient } from "@/lib/supabase/server";
import { AppSidebar } from "@/components/layout/AppSidebar";
import { StudyBuddy } from "@/components/hub/StudyBuddy";
import { ProgressProvider } from "@/lib/progress";
import { IS_DEMO, demoSpaces } from "@/lib/demo";
import type { Space } from "@/lib/types";

/**
 * THE APP SHELL — a single content-first sidebar + main area (rendered once,
 * persisted across navigation). Not a chat server: sections are Home, Live,
 * Community, Wins, Members, plus the member's tracks.
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
    <ProgressProvider>
      <div className="flex h-screen overflow-hidden bg-canvas">
        <AppSidebar
          spaces={spaces}
          fullName={profile?.full_name ?? user.email ?? "Member"}
          email={user.email ?? ""}
        />
        <div className="flex flex-1 flex-col overflow-hidden">
          {IS_DEMO && (
            <div className="flex-none border-b border-amber-200 bg-amber-100 px-gutter py-1.5 text-center text-xs font-label-md text-amber-800">
              🔍 Demo mode · sample content, no login required. Connect Supabase +
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
