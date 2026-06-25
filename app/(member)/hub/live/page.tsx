import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { IS_DEMO, demoSpaces, scheduleForSpaceSlug } from "@/lib/demo";
import { Icon } from "@/components/ui/Icon";
import type { ScheduleSession, Space } from "@/lib/types";

export const metadata = { title: "Live" };

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

const TYPE_META: Record<ScheduleSession["type"], { label: string; icon: string }> = {
  "live-class": { label: "Live class", icon: "live_tv" },
  "office-hours": { label: "Office hours", icon: "support_agent" },
  workshop: { label: "Workshop", icon: "construction" },
  qa: { label: "Q&A", icon: "forum" },
};

/** Live sessions enter a real room: voice for office hours, video otherwise. */
function roomSlug(type: ScheduleSession["type"]) {
  return type === "office-hours" ? "office-hours" : "live-class";
}

export default async function LivePage() {
  let spaces: Space[];
  if (IS_DEMO) {
    spaces = demoSpaces();
  } else {
    const supabase = createClient();
    const { data } = await supabase.from("spaces").select("*").order("position", { ascending: true });
    spaces = (data ?? []) as Space[];
  }

  const items = spaces
    .flatMap((s) => scheduleForSpaceSlug(s.slug).map((sess) => ({ sess, space: s })))
    .sort((a, b) => DAY_ORDER.indexOf(a.sess.day) - DAY_ORDER.indexOf(b.sess.day));

  return (
    <div className="mx-auto max-w-3xl px-gutter py-stack_lg">
      <header>
        <h1 className="font-serif text-[30px] font-medium tracking-tight text-on-surface md:text-[36px]">
          Live this week
        </h1>
        <p className="mt-2 font-body-lg text-body-lg text-on-surface-variant">
          Drop into live sessions with the people teaching each track. Show up, ask questions, meet
          the room.
        </p>
      </header>

      <div className="mt-8 space-y-3">
        {items.length === 0 && (
          <p className="rounded-2xl border border-outline-variant/12 bg-surface px-5 py-10 text-center font-sans text-sm text-on-surface-variant">
            No live sessions scheduled this week.
          </p>
        )}
        {items.map(({ sess, space }) => {
          const m = TYPE_META[sess.type];
          return (
            <Link
              key={sess.id}
              href={`/hub/${space.slug}/${roomSlug(sess.type)}`}
              className="group flex items-center gap-4 rounded-2xl border border-outline-variant/12 bg-surface px-5 py-4 transition hover:border-outline-variant/30 hover:shadow-card"
            >
              <div className="flex w-14 flex-none flex-col items-center rounded-xl bg-surface-container py-2">
                <span className="text-[10px] font-bold uppercase tracking-wider text-outline">
                  {sess.day.slice(0, 3)}
                </span>
                <Icon name={m.icon} fill className="text-[20px] text-primary" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="truncate font-display text-[15px] font-semibold text-on-surface transition-colors group-hover:text-primary">
                    {sess.title}
                  </p>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary">
                    {m.label}
                  </span>
                </div>
                <p className="mt-0.5 truncate font-sans text-[12px] text-on-surface-variant">
                  {sess.educator} · {space.name} · {sess.time}
                </p>
              </div>
              <span className="hidden flex-none items-center gap-1 rounded-lg bg-primary-container px-3 py-2 font-sans text-[12px] font-medium text-on-primary-container sm:inline-flex">
                Enter <Icon name="arrow_forward" className="text-[14px]" />
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
