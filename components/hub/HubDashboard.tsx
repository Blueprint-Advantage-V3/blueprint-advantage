"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Leaderboard } from "@/components/progress/Leaderboard";
import { useProgress, rankProgress } from "@/lib/progress";
import type { ScheduleSession, Space } from "@/lib/types";

type LiteLesson = { id: string; slug: string; title: string };

/**
 * The hub home — a real dashboard: a greeting + live stat strip, your tracks
 * with per-track level/progress + next-up lesson, what's live this week, and
 * the leaderboard. Client component so it can read the live progress store.
 */
export function HubDashboard({
  userName,
  spaces,
  lessonsBySlug,
  schedule,
}: {
  userName: string;
  spaces: Space[];
  lessonsBySlug: Record<string, LiteLesson[]>;
  schedule: ScheduleSession[];
}) {
  const { totalXp, lessonsCompleted, streak } = useProgress();
  const firstName = userName.split(" ")[0] || "there";

  const stats = [
    { label: "Total XP", value: totalXp.toLocaleString(), icon: "bolt" },
    { label: "Lessons done", value: String(lessonsCompleted), icon: "task_alt" },
    { label: "Day streak", value: String(streak), icon: "local_fire_department" },
  ];

  return (
    <div className="mx-auto max-w-content_max_width px-gutter py-stack_lg">
      {/* Header + stat strip */}
      <div className="flex flex-col gap-5 border-b border-outline-variant/12 pb-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="font-sans text-sm text-on-surface-variant">Welcome back</p>
          <h1 className="mt-1 font-display text-[28px] font-semibold tracking-tight text-on-surface md:text-[34px]">
            {firstName} 👋
          </h1>
        </div>
        <div className="flex gap-2.5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2.5 rounded-xl border border-outline-variant/12 bg-surface px-3.5 py-2.5"
            >
              <Icon name={s.icon} fill className="text-[18px] text-primary" />
              <div className="leading-tight">
                <p className="font-display text-[17px] font-semibold text-on-surface">{s.value}</p>
                <p className="font-sans text-[11px] text-on-surface-variant">{s.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Your tracks */}
      <h2 className="mb-4 mt-8 font-display text-[19px] font-semibold tracking-tight text-on-surface">
        Your tracks
      </h2>
      <div className="grid gap-4 sm:grid-cols-2">
        {spaces.map((s) => (
          <TrackCard key={s.id} space={s} lessons={lessonsBySlug[s.slug] ?? []} />
        ))}
      </div>

      {/* Live this week + leaderboard */}
      <div className="mt-8 grid gap-5 lg:grid-cols-2">
        <div className="rounded-2xl border border-outline-variant/12 bg-surface p-5">
          <h3 className="mb-3 flex items-center gap-2 font-display text-[17px] font-semibold text-on-surface">
            <Icon name="event" className="text-[20px] text-primary" /> Live this week
          </h3>
          <div className="space-y-0.5">
            {schedule.slice(0, 5).map((s) => (
              <div
                key={s.id}
                className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-on-surface/[0.03]"
              >
                <span className="grid h-9 w-9 flex-none place-items-center rounded-lg bg-primary/10 text-primary">
                  <Icon name={sessionIcon(s.type)} fill className="text-[18px]" />
                </span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-sans text-sm font-medium text-on-surface">{s.title}</p>
                  <p className="truncate font-sans text-[12px] text-on-surface-variant">{s.educator}</p>
                </div>
                <div className="flex-none text-right">
                  <p className="font-sans text-[12px] font-medium text-on-surface">{s.day}</p>
                  <p className="font-sans text-[11px] text-on-surface-variant">{s.time}</p>
                </div>
              </div>
            ))}
            {schedule.length === 0 && (
              <p className="px-2 py-2 font-sans text-sm text-on-surface-variant">
                No sessions scheduled yet.
              </p>
            )}
          </div>
        </div>
        <Leaderboard />
      </div>
    </div>
  );
}

function TrackCard({ space, lessons }: { space: Space; lessons: LiteLesson[] }) {
  const { campusXp, campusRank, isComplete } = useProgress();
  const xp = campusXp(space.slug);
  const level = campusRank(space.slug);
  const p = rankProgress(xp);
  const done = lessons.filter((l) => isComplete(l.id)).length;
  const next = lessons.find((l) => !isComplete(l.id)) ?? null;

  return (
    <Link
      href={`/hub/${space.slug}`}
      className="group block rounded-2xl border border-outline-variant/15 bg-surface p-5 transition hover:border-outline-variant/30 hover:shadow-card"
    >
      <div className="flex items-center gap-3">
        <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-primary/10 text-2xl">
          {space.icon}
        </span>
        <div className="min-w-0 flex-1">
          <p className="truncate font-display text-[16px] font-semibold text-on-surface transition-colors group-hover:text-primary">
            {space.name}
          </p>
          <p className="font-sans text-[12px] text-on-surface-variant">
            {done}/{lessons.length} lessons
          </p>
        </div>
        <span className="inline-flex flex-none items-center gap-1 rounded-lg bg-earned/12 px-2 py-1 font-sans text-[11px] font-medium text-earned">
          <Icon name="military_tech" fill className="text-[13px]" /> Level {level}
        </span>
      </div>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-container">
        <div className="h-full rounded-full bg-primary transition-all" style={{ width: `${p.pct}%` }} />
      </div>
      <p className="mt-3 flex items-center gap-1.5 font-sans text-[13px] text-on-surface-variant">
        {next ? (
          <>
            <Icon name="play_circle" fill className="flex-none text-[16px] text-primary" />
            <span className="truncate">Next: {next.title}</span>
          </>
        ) : lessons.length > 0 ? (
          <>
            <Icon name="check_circle" fill className="flex-none text-[16px] text-earned" /> Track complete
          </>
        ) : (
          <>
            <Icon name="schedule" className="flex-none text-[16px]" /> Lessons coming soon
          </>
        )}
      </p>
    </Link>
  );
}

function sessionIcon(type: ScheduleSession["type"]): string {
  switch (type) {
    case "live-class":
      return "live_tv";
    case "office-hours":
      return "support_agent";
    case "workshop":
      return "build";
    case "qa":
      return "forum";
    default:
      return "event";
  }
}
