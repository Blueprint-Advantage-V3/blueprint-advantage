"use client";

import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Leaderboard } from "@/components/progress/Leaderboard";
import { WinsFeed } from "@/components/community/WinsFeed";
import { useProgress, rankProgress } from "@/lib/progress";
import type { ScheduleSession, Space } from "@/lib/types";

type LiteLesson = { id: string; slug: string; title: string };

/**
 * Hub home dashboard. Layout: a "continue learning" hero card, then a wide
 * two-column grid (your tracks on the left, live + leaderboard on the right).
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
  const { totalXp, lessonsCompleted, streak, campusXp, isComplete } = useProgress();
  const firstName = userName.split(" ")[0] || "there";

  const stats = [
    { label: "Total XP", value: totalXp.toLocaleString(), icon: "bolt" },
    { label: "Lessons done", value: String(lessonsCompleted), icon: "task_alt" },
    { label: "Day streak", value: String(streak), icon: "local_fire_department" },
  ];

  // Pick the track to "continue": most XP among tracks that still have a next lesson.
  const continueOptions = spaces
    .map((s) => {
      const lessons = lessonsBySlug[s.slug] ?? [];
      const next = lessons.find((l) => !isComplete(l.id)) ?? null;
      const done = lessons.filter((l) => isComplete(l.id)).length;
      return { space: s, lessons, next, done, xp: campusXp(s.slug) };
    })
    .filter((t) => t.next);
  const current = continueOptions.sort((a, b) => b.xp - a.xp)[0] ?? null;

  return (
    <div className="mx-auto max-w-5xl px-gutter py-stack_lg">
      {/* Greeting + stat strip */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="font-sans text-sm text-on-surface-variant">Welcome back</p>
          <h1 className="mt-1 font-display text-[26px] font-semibold tracking-[-0.02em] text-on-surface md:text-[32px]">
            {firstName} 👋
          </h1>
        </div>
        <div className="flex gap-2.5">
          {stats.map((s) => (
            <div
              key={s.label}
              className="flex items-center gap-2.5 rounded-xl border border-outline-variant/10 bg-surface px-3.5 py-2.5"
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

      {/* Continue learning */}
      {current && (
        <Link
          href={`/hub/${current.space.slug}/lessons/${current.next!.slug}`}
          className="group mt-6 block rounded-2xl border border-primary/25 bg-surface p-5 transition hover:border-primary/45"
        >
          <div className="flex items-center gap-4">
            <span className="grid h-14 w-14 flex-none place-items-center rounded-xl bg-primary/12 text-primary">
              <Icon name="play_arrow" fill className="text-[30px]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-primary">
                Continue learning
              </p>
              <p className="mt-0.5 truncate font-display text-[18px] font-semibold text-on-surface">
                {current.next!.title}
              </p>
              <p className="mt-0.5 truncate font-sans text-[13px] text-on-surface-variant">
                {current.space.icon} {current.space.name} · {current.done}/{current.lessons.length} lessons done
              </p>
            </div>
            <span className="hidden flex-none items-center gap-1.5 rounded-xl bg-primary-container px-4 py-2.5 font-sans text-sm font-medium text-on-primary-container sm:inline-flex">
              Resume <Icon name="arrow_forward" className="text-[16px]" />
            </span>
          </div>
        </Link>
      )}

      {/* Two-column: tracks + right rail */}
      <div className="mt-8 grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h2 className="mb-4 font-display text-[17px] font-semibold tracking-[-0.01em] text-on-surface">
            Your tracks
          </h2>
          <div className="grid gap-4 sm:grid-cols-2">
            {spaces.map((s) => (
              <TrackCard key={s.id} space={s} lessons={lessonsBySlug[s.slug] ?? []} />
            ))}
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-2xl border border-outline-variant/10 bg-surface p-5">
            <h3 className="mb-3 flex items-center gap-2 font-display text-[15px] font-semibold text-on-surface">
              <Icon name="event" className="text-[18px] text-primary" /> Live this week
            </h3>
            <div className="space-y-0.5">
              {schedule.slice(0, 4).map((s) => (
                <Link
                  key={s.id}
                  href={`/hub/${s.space_id.replace("space-", "")}/schedule`}
                  className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-on-surface/[0.04]"
                >
                  <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-primary/12 text-primary">
                    <Icon name={sessionIcon(s.type)} fill className="text-[16px]" />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-sans text-[13px] font-medium text-on-surface">{s.title}</p>
                    <p className="truncate font-sans text-[11px] text-on-surface-variant">{s.day} · {s.time}</p>
                  </div>
                </Link>
              ))}
              {schedule.length === 0 && (
                <p className="px-2 py-2 font-sans text-sm text-on-surface-variant">Nothing scheduled.</p>
              )}
            </div>
          </div>
          <Leaderboard />
        </div>
      </div>

      {/* Community wins */}
      <div className="mt-10">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="flex items-center gap-2 font-display text-[17px] font-semibold text-on-surface">
            <Icon name="emoji_events" fill className="text-[18px] text-earned" /> Community wins
          </h2>
          <p className="font-sans text-[13px] text-on-surface-variant">Post yours. Celebrate everyone&apos;s. 🔥</p>
        </div>
        <WinsFeed currentUser={userName} embedded />
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
      href={`/hub/${space.slug}/lessons`}
      className="group block rounded-2xl border border-outline-variant/10 bg-surface p-5 transition hover:border-outline-variant/20"
    >
      <div className="flex items-start justify-between gap-2">
        <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-surface-container text-2xl">
          {space.icon}
        </span>
        <span className="inline-flex flex-none items-center gap-1 rounded-lg bg-earned/12 px-2 py-1 font-sans text-[11px] font-medium text-earned">
          <Icon name="military_tech" fill className="text-[13px]" /> Level {level}
        </span>
      </div>
      <h3 className="mt-3 truncate font-display text-[16px] font-semibold text-on-surface transition-colors group-hover:text-primary">
        {space.name}
      </h3>
      <p className="font-sans text-[12px] text-on-surface-variant">{done}/{lessons.length} lessons</p>
      <div className="mt-4 h-1.5 w-full overflow-hidden rounded-full bg-surface-container-high">
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
