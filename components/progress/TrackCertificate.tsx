"use client";

import { useState } from "react";
import { useProgress } from "@/lib/progress";
import { Icon } from "@/components/ui/Icon";

/**
 * Earned when every lesson in a track is complete. A clean, shareable
 * certificate card. Renders nothing until the track is finished.
 */
export function TrackCertificate({
  trackName,
  lessonIds,
  userName,
}: {
  trackName: string;
  lessonIds: string[];
  userName: string;
}) {
  const { isComplete } = useProgress();
  const [copied, setCopied] = useState(false);

  if (lessonIds.length === 0 || !lessonIds.every((id) => isComplete(id))) return null;

  const date = new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" });

  function share() {
    const text = `I just completed the ${trackName} track on Blueprint Advantage 🎓`;
    try {
      navigator.clipboard?.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      /* ignore */
    }
  }

  return (
    <div className="mb-6 overflow-hidden rounded-2xl border border-earned/30 bg-surface">
      <div className="bg-earned/[0.06] px-6 py-6">
        <div className="flex items-center justify-between">
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-earned/15 text-earned">
            <Icon name="workspace_premium" fill className="text-[28px]" />
          </span>
          <span className="font-sans text-[11px] font-semibold uppercase tracking-[0.18em] text-earned">
            Certificate of completion
          </span>
        </div>
        <p className="mt-4 font-sans text-[12px] text-on-surface-variant">This certifies that</p>
        <p className="mt-0.5 font-display text-[26px] font-semibold tracking-tight text-on-surface">{userName}</p>
        <p className="mt-1 font-sans text-[13px] text-on-surface-variant">
          has completed every lesson in <span className="font-medium text-on-surface">{trackName}</span> · {date}
        </p>
        <div className="mt-5 flex items-center gap-3">
          <button
            type="button"
            onClick={share}
            className="inline-flex items-center gap-2 rounded-lg bg-primary-container px-4 py-2 font-sans text-[13px] font-medium text-on-primary-container transition active:scale-[0.98]"
          >
            <Icon name={copied ? "check" : "share"} className="text-[16px]" /> {copied ? "Copied!" : "Share"}
          </button>
          <span className="font-sans text-[12px] text-on-surface-variant">Blueprint Advantage</span>
        </div>
      </div>
    </div>
  );
}
