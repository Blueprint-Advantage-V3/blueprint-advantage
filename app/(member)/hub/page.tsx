import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BRAND } from "@/lib/constants";
import { IS_DEMO, demoSpaces } from "@/lib/demo";
import type { Space } from "@/lib/types";

export const metadata = { title: "Home" };

/**
 * Platform home — the landing screen you see when you first arrive in the
 * hub (before picking a space). Welcome + jump back into your spaces +
 * announcements.
 */
export default async function HubHome() {
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
    <div className="mx-auto max-w-4xl px-8 py-10">
      <div className="rounded-3xl border border-border bg-gradient-to-b from-surface to-canvas p-8">
        <p className="text-sm font-medium text-brand">Welcome back 👋</p>
        <h1 className="mt-2 text-3xl font-bold tracking-tight">
          {BRAND.name}
        </h1>
        <p className="mt-2 max-w-xl text-muted">
          Pick a space to jump into lessons, chat with the community, or hop in
          a voice or video room. New lessons drop every week.
        </p>
      </div>

      <h2 className="mt-10 text-lg font-semibold">Jump back in</h2>
      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {spaces.map((s) => (
          <Link
            key={s.id}
            href={`/hub/${s.slug}`}
            className="flex items-start gap-4 rounded-2xl border border-border bg-surface p-5 transition hover:border-zinc-700 hover:bg-surface-2"
          >
            <span className="text-3xl">{s.icon}</span>
            <div>
              <p className="font-semibold">{s.name}</p>
              <p className="mt-0.5 text-sm text-muted">{s.description}</p>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="mt-10 text-lg font-semibold">📣 Announcements</h2>
      <div className="mt-4 space-y-3">
        <Announcement
          title="New SAT lessons every Monday"
          body="Dr. Lena Ortiz is dropping a fresh module each week. Start with The Foundations."
        />
        <Announcement
          title="Office hours are live"
          body="Hop into the Office Hours voice channel in any space to ask the professor directly."
        />
      </div>
    </div>
  );
}

function Announcement({ title, body }: { title: string; body: string }) {
  return (
    <div className="rounded-2xl border border-border bg-surface p-5">
      <p className="font-medium text-zinc-100">{title}</p>
      <p className="mt-1 text-sm text-muted">{body}</p>
    </div>
  );
}
