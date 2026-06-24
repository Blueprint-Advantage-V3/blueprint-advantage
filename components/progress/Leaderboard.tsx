"use client";

import { useProgress } from "@/lib/progress";
import { Icon } from "@/components/ui/Icon";

type Row = { name: string; xp: number; you?: boolean };

const PEERS: Row[] = [
  { name: "Sofia K.", xp: 1320 },
  { name: "Maya R.", xp: 1180 },
  { name: "Jordan T.", xp: 940 },
  { name: "Priya N.", xp: 720 },
  { name: "Andre L.", xp: 540 },
  { name: "Leo M.", xp: 360 },
];

/** Global leaderboard — demo members + the live member, ranked by XP. */
export function Leaderboard() {
  const { totalXp } = useProgress();
  const rows: Row[] = [...PEERS, { name: "You", xp: totalXp, you: true }].sort(
    (a, b) => b.xp - a.xp
  );

  return (
    <div className="glass-panel rounded-xl p-stack_md">
      <h3 className="mb-4 flex items-center gap-2 font-headline-md text-headline-md">
        <Icon name="leaderboard" fill className="text-primary" />
        Leaderboard
      </h3>
      <div className="space-y-1">
        {rows.map((r, i) => (
          <div
            key={r.name}
            className={`flex items-center gap-3 rounded-lg px-3 py-2 ${
              r.you ? "bg-primary/10 ring-1 ring-primary/30" : ""
            }`}
          >
            <span
              className={`w-5 text-center text-sm font-bold ${
                i < 3 ? "text-primary" : "text-outline"
              }`}
            >
              {i + 1}
            </span>
            <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary-container">
              {r.name.charAt(0)}
            </span>
            <span
              className={`flex-1 truncate text-sm ${
                r.you ? "font-bold text-primary" : "text-on-surface"
              }`}
            >
              {r.name}
              {r.you ? " (you)" : ""}
            </span>
            <span className="text-sm font-bold text-on-surface-variant">
              {r.xp.toLocaleString()} XP
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
