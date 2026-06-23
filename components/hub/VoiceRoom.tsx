"use client";

import { useState } from "react";

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
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-2 text-4xl">
          🔊
        </div>
        <div>
          <h2 className="text-xl font-semibold">{channelName}</h2>
          <p className="mt-1 text-sm text-muted">
            {PEERS.length} people are in this voice channel
          </p>
        </div>
        <button
          onClick={() => setJoined(true)}
          className="rounded-xl bg-green-600 px-6 py-3 font-semibold text-white transition hover:bg-green-500"
        >
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
                "flex aspect-square flex-col items-center justify-center gap-3 rounded-2xl border bg-surface-2 transition",
                p.speaking ? "border-green-500 shadow-[0_0_0_2px_rgba(34,197,94,0.4)]" : "border-border",
              ].join(" ")}
            >
              <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand text-2xl font-semibold text-white">
                {p.name.charAt(0).toUpperCase()}
              </span>
              <span className="text-sm font-medium text-zinc-200">
                {p.name}{i === 0 ? " (you)" : ""}
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-none items-center justify-center gap-3 border-t border-border py-4">
        <button
          onClick={() => setMuted((m) => !m)}
          className={[
            "rounded-xl px-5 py-2.5 text-sm font-medium transition",
            muted ? "bg-red-600 text-white hover:bg-red-500" : "bg-surface-2 text-zinc-200 hover:bg-surface",
          ].join(" ")}
        >
          {muted ? "🔇 Unmute" : "🎙️ Mute"}
        </button>
        <button
          onClick={() => setJoined(false)}
          className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
        >
          Leave
        </button>
      </div>
    </div>
  );
}
