"use client";

import { useState } from "react";
import { useProgress } from "@/lib/progress";
import { Icon } from "@/components/ui/Icon";

type Row = { name: string; xp: number; you?: boolean };

const ALLTIME: Row[] = [
  { name: "Sofia K.", xp: 1320 },
  { name: "Maya R.", xp: 1180 },
  { name: "Jordan T.", xp: 940 },
  { name: "Priya N.", xp: 720 },
  { name: "Andre L.", xp: 540 },
  { name: "Leo M.", xp: 360 },
];

const WEEK: Row[] = [
  { name: "Maya R.", xp: 240 },
  { name: "Jordan T.", xp: 180 },
  { name: "Sofia K.", xp: 150 },
  { name: "Priya N.", xp: 90 },
  { name: "Andre L.", xp: 60 },
  { name: "Leo M.", xp: 30 },
];

/** Leaderboard with a weekly race + all-time view. */
export function Leaderboard() {
  const { totalXp } = useProgress();
  const [view, setView] = useState<"week" | "all">("week");

  const peers = view === "week" ? WEEK : ALLTIME;
  const rows: Row[] = [...peers, { name: "You", xp: totalXp, you: true }].sort((a, b) => b.xp - a.xp);

  return (
    <div className="rounded-2xl border border-outline-variant/10 bg-surface p-5">
      <div className="mb-3 flex items-center justify-between gap-2">
        <h3 className="flex items-center gap-2 font-display text-[15px] font-semibold text-on-surface">
          <Icon name="leaderboard" fill className="text-[18px] text-primary" /> Leaderboard
        </h3>
        <div className="flex flex-none gap-0.5 rounded-lg border border-outline-variant/12 p-0.5">
          {(["week", "all"] as const).map((v) => (
            <button
              key={v}
              type="button"
              onClick={() => setView(v)}
              className={`rounded-md px-2 py-1 font-sans text-[11px] font-medium transition ${
                view === v ? "bg-primary/12 text-primary" : "text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {v === "week" ? "This week" : "All time"}
            </button>
          ))}
        </div>
      </div>
      <div className="space-y-1">
        {rows.map((r, i) => (
          <div
            key={r.name}
            className={`flex items-center gap-3 rounded-lg px-2.5 py-2 ${
              r.you ? "bg-primary/10 ring-1 ring-primary/25" : ""
            }`}
          >
            <span className={`w-5 text-center font-sans text-sm font-semibold ${i < 3 ? "text-earned" : "text-outline"}`}>
              {i + 1}
            </span>
            <span className="grid h-8 w-8 flex-none place-items-center rounded-full bg-primary-container font-sans text-xs font-semibold text-on-primary-container">
              {r.name.charAt(0)}
            </span>
            <span className={`flex-1 truncate font-sans text-sm ${r.you ? "font-semibold text-primary" : "text-on-surface"}`}>
              {r.name}
              {r.you ? " (you)" : ""}
            </span>
            <span className="font-sans text-sm font-semibold text-on-surface-variant">{r.xp.toLocaleString()} XP</span>
          </div>
        ))}
      </div>
    </div>
  );
}
