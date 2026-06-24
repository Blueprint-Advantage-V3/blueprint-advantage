import { Icon } from "@/components/ui/Icon";
import type { ScheduleSession } from "@/lib/types";

const TYPE_META: Record<
  ScheduleSession["type"],
  { label: string; icon: string; accent: string; chip: string }
> = {
  "live-class": { label: "Live Class", icon: "videocam", accent: "text-primary", chip: "bg-primary/15 text-primary" },
  "office-hours": { label: "Office Hours", icon: "support_agent", accent: "text-secondary", chip: "bg-secondary/15 text-secondary" },
  qa: { label: "Q&A", icon: "quiz", accent: "text-tertiary", chip: "bg-tertiary/15 text-tertiary" },
  workshop: { label: "Workshop", icon: "construction", accent: "text-primary", chip: "bg-primary/15 text-primary" },
};

const DAY_ORDER = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

/**
 * Educator schedule — each professor's recurring live sessions for the week.
 * (Admin CRUD for educators to edit their own schedule is a later wave; this
 * renders the schedule members see.)
 */
export function ScheduleView({
  sessions,
  spaceName,
}: {
  sessions: ScheduleSession[];
  spaceName: string;
}) {
  const educators = Array.from(new Set(sessions.map((s) => s.educator)));
  const sorted = [...sessions].sort(
    (a, b) => DAY_ORDER.indexOf(a.day) - DAY_ORDER.indexOf(b.day)
  );

  return (
    <div className="mx-auto h-full max-w-3xl overflow-y-auto px-gutter py-stack_lg">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Icon name="calendar_month" fill className="text-[26px]" />
        </span>
        <div>
          <h1 className="font-display text-headline-lg tracking-tight">Schedule</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Live sessions for {spaceName}
            {educators.length === 1 ? ` with ${educators[0]}` : ""}.
          </p>
        </div>
      </div>

      {sorted.length === 0 ? (
        <p className="glass-panel rounded-xl px-5 py-8 text-center text-sm text-outline">
          No sessions scheduled yet.
        </p>
      ) : (
        <div className="space-y-3">
          {sorted.map((s) => {
            const m = TYPE_META[s.type];
            return (
              <div
                key={s.id}
                className="glass-panel flex items-center gap-4 rounded-xl px-5 py-4 transition-all hover:border-primary/30"
              >
                {/* Day pill */}
                <div className="flex w-16 flex-none flex-col items-center justify-center rounded-lg bg-surface-container py-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-outline">
                    {s.day.slice(0, 3)}
                  </span>
                  <Icon name={m.icon} fill className={`text-[20px] ${m.accent}`} />
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="truncate font-label-md font-bold text-on-surface">{s.title}</p>
                    <span className={`rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider ${m.chip}`}>
                      {m.label}
                    </span>
                  </div>
                  <p className="mt-0.5 flex items-center gap-2 font-body-md text-xs text-outline">
                    <Icon name="schedule" className="text-[14px]" />
                    {s.day}, {s.time}
                    {educators.length > 1 && <span>· {s.educator}</span>}
                  </p>
                </div>

                <button className="flex flex-none items-center gap-1.5 rounded-lg border border-outline-variant/20 px-3 py-2 text-xs font-bold text-on-surface-variant transition hover:border-primary/40 hover:text-on-surface">
                  <Icon name="notifications" className="text-[16px]" />
                  Remind me
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
