"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Video channel room. Discord-style join screen → video grid with camera /
 * mic / leave controls.
 *
 * As a local touch, joining requests YOUR real camera (getUserMedia) for the
 * local tile, so the room feels genuinely live with no backend. Remote peers
 * are placeholders until Phase 2 connects a provider (LiveKit / Daily / 100ms)
 * to publish & subscribe to tracks.
 */
const PEERS = ["Dr. Lena Ortiz", "Maya", "Jordan"];

export function VideoRoom({ channelName, currentUser }: { channelName: string; currentUser: string }) {
  const [joined, setJoined] = useState(false);
  const [camOn, setCamOn] = useState(true);
  const [muted, setMuted] = useState(false);
  const [camError, setCamError] = useState(false);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const streamRef = useRef<MediaStream | null>(null);

  useEffect(() => {
    if (!joined) return;
    let cancelled = false;

    async function start() {
      if (!camOn) return;
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: false });
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop());
          return;
        }
        streamRef.current = stream;
        if (videoRef.current) videoRef.current.srcObject = stream;
        setCamError(false);
      } catch {
        setCamError(true);
      }
    }
    start();

    return () => {
      cancelled = true;
      streamRef.current?.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    };
  }, [joined, camOn]);

  function leave() {
    streamRef.current?.getTracks().forEach((t) => t.stop());
    streamRef.current = null;
    setJoined(false);
  }

  if (!joined) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-5 px-6 text-center">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-2 text-4xl">
          📹
        </div>
        <div>
          <h2 className="text-xl font-semibold">{channelName}</h2>
          <p className="mt-1 text-sm text-muted">Start or join the live class</p>
        </div>
        <button
          onClick={() => setJoined(true)}
          className="rounded-xl bg-brand px-6 py-3 font-semibold text-white transition hover:bg-brand-hover"
        >
          Join Video
        </button>
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 overflow-y-auto p-6">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {/* Your tile (real camera) */}
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-brand bg-black">
            {camOn && !camError ? (
              <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-brand text-3xl font-semibold text-white">
                {currentUser.charAt(0).toUpperCase()}
              </span>
            )}
            <span className="absolute bottom-2 left-3 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
              {currentUser} (you){camError ? " · camera blocked" : ""}
            </span>
          </div>

          {/* Remote peers (placeholders until a provider is wired) */}
          {PEERS.map((name) => (
            <div
              key={name}
              className="relative flex aspect-video items-center justify-center rounded-2xl border border-border bg-surface-2"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-zinc-700 text-3xl font-semibold text-white">
                {name.charAt(0).toUpperCase()}
              </span>
              <span className="absolute bottom-2 left-3 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                {name}
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
          onClick={() => setCamOn((c) => !c)}
          className={[
            "rounded-xl px-5 py-2.5 text-sm font-medium transition",
            camOn ? "bg-surface-2 text-zinc-200 hover:bg-surface" : "bg-red-600 text-white hover:bg-red-500",
          ].join(" ")}
        >
          {camOn ? "📷 Stop video" : "📷 Start video"}
        </button>
        <button
          onClick={leave}
          className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-red-500"
        >
          Leave
        </button>
      </div>
    </div>
  );
}
