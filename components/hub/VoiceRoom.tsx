"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Voice channel room. Discord-style join screen → in-call participant grid
 * with mic/leave controls.
 *
 * The UI + interactions are real; live audio transport is wired in Phase 2
 * via a provider (LiveKit / Daily / 100ms) — `joined` is the hook point
 * where you'd connect to the room and publish the mic track.
 */
const PEERS = [
  { name: "Dr. Lena Ortiz", speaking: true },
  { name: "Maya", speaking: false },
  { name: "Jordan", speaking: false },
];

export function VoiceRoom({ channelName, currentUser }: { channelName: string; currentUser: string }) {
  const [joined, setJoined] = useState(false);
  const [muted, setMuted] = useState(false);

  if (!joined) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary">
          <Icon name="graphic_eq" className="text-4xl" />
        </div>
        <div>
          <h2 className="font-headline-md text-headline-md font-bold">{channelName}</h2>
          <p className="mt-1 font-body-md text-sm text-on-surface-variant">
            {PEERS.length} people are in this voice channel
          </p>
        </div>
        <button
          onClick={() => setJoined(true)}
          className="glow-button flex items-center gap-2 rounded-lg bg-primary-container px-6 py-2 font-label-md font-bold text-on-primary-container transition-all active:scale-95"
        >
          <Icon name="graphic_eq" fill className="text-[20px]" />
          Join Voice
        </button>
      </div>
    );
  }

  const tiles = [{ name: currentUser, speaking: !muted }, ...PEERS];

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
          {tiles.map((p, i) => (
            <div
              key={i}
              className={[
                "glass-panel flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl transition-all",
                p.speaking ? "border-secondary shadow-[0_0_0_2px_rgba(137,206,255,0.5)]" : "",
              ].join(" ")}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-container text-2xl font-bold text-on-primary-container">
                {p.name.charAt(0).toUpperCase()}
              </span>
              <span className="flex items-center gap-1 font-label-md text-sm font-medium text-on-surface">
                {p.name}{i === 0 ? " (you)" : ""}
                {i === 0 && muted && (
                  <Icon name="mic_off" className="text-[16px] text-error" />
                )}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-none items-center justify-center gap-3 border-t border-outline-variant/10 py-4">
        <button
          onClick={() => setMuted((m) => !m)}
          className={[
            "flex h-12 w-12 items-center justify-center rounded-full transition-all active:scale-95",
            muted
              ? "bg-error text-on-error hover:opacity-90"
              : "bg-surface-container-high text-on-surface hover:bg-surface-container-highest",
          ].join(" ")}
          aria-label={muted ? "Unmute" : "Mute"}
        >
          <Icon name={muted ? "mic_off" : "mic"} fill />
        </button>
        <button
          onClick={() => setJoined(false)}
          className="flex h-12 items-center gap-2 rounded-full bg-error px-6 font-label-md font-bold text-on-error transition-all hover:opacity-90 active:scale-95"
        >
          <Icon name="call_end" fill />
          Leave
        </button>
      </div>
    </div>
  );
}
