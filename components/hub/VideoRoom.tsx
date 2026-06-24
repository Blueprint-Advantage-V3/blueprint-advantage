"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Video channel room. community-style join screen → video grid with camera /
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
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/20 text-primary">
          <Icon name="videocam" className="text-4xl" />
        </div>
        <div>
          <h2 className="font-headline-md text-headline-md font-bold">{channelName}</h2>
          <p className="mt-1 font-body-md text-sm text-on-surface-variant">
            Start or join the live class
          </p>
        </div>
        <button
          onClick={() => setJoined(true)}
          className="glow-button flex items-center gap-2 rounded-lg bg-primary-container px-6 py-2 font-label-md font-bold text-on-primary-container transition-all active:scale-95"
        >
          <Icon name="videocam" fill className="text-[20px]" />
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
          <div className="relative flex aspect-video items-center justify-center overflow-hidden rounded-2xl border border-secondary bg-black shadow-[0_0_0_2px_rgba(137,206,255,0.4)]">
            {camOn && !camError ? (
              <video ref={videoRef} autoPlay playsInline muted className="h-full w-full object-cover" />
            ) : (
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-primary-container text-3xl font-bold text-on-primary-container">
                {currentUser.charAt(0).toUpperCase()}
              </span>
            )}
            <span className="absolute bottom-2 left-3 flex items-center gap-1 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
              {currentUser} (you){camError ? " · camera blocked" : ""}
              {muted && <Icon name="mic_off" className="text-[14px] text-error" />}
            </span>
          </div>

          {/* Remote peers (placeholders until a provider is wired) */}
          {PEERS.map((name) => (
            <div
              key={name}
              className="glass-panel relative flex aspect-video items-center justify-center rounded-2xl"
            >
              <span className="flex h-20 w-20 items-center justify-center rounded-full bg-surface-container-highest text-3xl font-bold text-on-surface">
                {name.charAt(0).toUpperCase()}
              </span>
              <span className="absolute bottom-2 left-3 rounded bg-black/60 px-2 py-0.5 text-xs text-white">
                {name}
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
          onClick={() => setCamOn((c) => !c)}
          className={[
            "flex h-12 w-12 items-center justify-center rounded-full transition-all active:scale-95",
            camOn
              ? "bg-surface-container-high text-on-surface hover:bg-surface-container-highest"
              : "bg-error text-on-error hover:opacity-90",
          ].join(" ")}
          aria-label={camOn ? "Stop video" : "Start video"}
        >
          <Icon name={camOn ? "videocam" : "videocam_off"} fill />
        </button>
        <button
          onClick={leave}
          className="flex h-12 items-center gap-2 rounded-full bg-error px-6 font-label-md font-bold text-on-error transition-all hover:opacity-90 active:scale-95"
        >
          <Icon name="call_end" fill />
          Leave
        </button>
      </div>
    </div>
  );
}
