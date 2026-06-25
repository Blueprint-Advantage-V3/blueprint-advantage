"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { demoLesson } from "@/lib/demo";

type Msg = { role: "user" | "assistant"; content: string };

const CAMPUS_LABEL: Record<string, string> = {
  sat: "Road to University",
  finance: "Finance",
  law: "Law",
  ai: "Using AI",
};

/**
 * AI Study Buddy — a floating, campus-aware tutor available across the hub.
 * Talks to /api/tutor (OpenAI-compatible; falls back to a demo coach with no key).
 */
export function StudyBuddy() {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // [hub, campus, channel, lesson]
  const campus = segments[1];
  const lessonSlug = segments[3];
  const lesson = campus && lessonSlug ? demoLesson(campus, lessonSlug) : null;
  const lessonTitle = lesson?.title ?? null;
  const campusLabel = (campus && CAMPUS_LABEL[campus]) || null;

  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, loading]);

  async function send(text: string) {
    const q = text.trim();
    if (!q || loading) return;
    const next = [...messages, { role: "user" as const, content: q }];
    setMessages(next);
    setInput("");
    setLoading(true);
    try {
      const res = await fetch("/api/tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: next, campus, lessonTitle }),
      });
      const data = await res.json();
      setMessages((m) => [...m, { role: "assistant", content: data.reply ?? "…" }]);
    } catch {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "I hit a snag reaching the tutor. Try again in a sec." },
      ]);
    } finally {
      setLoading(false);
    }
  }

  const starters = lessonTitle
    ? ["Summarize this lesson", "Quiz me on this", "Explain it simpler"]
    : campusLabel
    ? [`Quiz me on ${campusLabel}`, "Give me a 7-day plan", "Explain this simply"]
    : ["What should I learn first?", "Quiz me", "Make me a study plan"];

  return (
    <>
      {/* Floating launcher — fixed lives on the wrapper so the button's
          position:relative can't override it (that caused a full-height blob). */}
      {!open && (
        <div className="fixed bottom-6 right-6 z-40">
          <button
            onClick={() => setOpen(true)}
            className="flex h-11 items-center gap-1.5 rounded-full bg-primary-container px-4 text-sm font-bold text-on-primary-container shadow-card transition-transform hover:scale-105 active:scale-95"
          >
            <Icon name="auto_awesome" fill className="text-[18px]" />
            Ask AI
          </button>
        </div>
      )}

      {/* Slide-over panel */}
      {open && (
        <div className="fixed bottom-6 right-6 z-40 flex h-[560px] max-h-[80vh] w-[380px] max-w-[calc(100vw-2rem)] flex-col overflow-hidden rounded-2xl border border-outline-variant/20 bg-surface-container-low shadow-2xl">
          {/* Header */}
          <div className="flex flex-none items-center justify-between border-b border-outline-variant/10 bg-surface-container px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary/15 text-primary">
                <Icon name="auto_awesome" fill className="text-[18px]" />
              </span>
              <div>
                <p className="font-label-md text-label-md font-bold text-on-surface">AI Study Buddy</p>
                <p className="max-w-[210px] truncate text-[11px] text-outline">
                  {lessonTitle ? `On: ${lessonTitle}` : campusLabel ? `${campusLabel} tutor` : "Pick a campus for tailored help"}
                </p>
              </div>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-on-surface-variant transition hover:bg-on-surface/[0.04] hover:text-on-surface"
            >
              <Icon name="close" />
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} className="custom-scrollbar flex-1 space-y-3 overflow-y-auto p-4">
            {messages.length === 0 && (
              <div className="rounded-xl border border-outline-variant/10 bg-surface-container/40 p-4">
                <p className="font-body-md text-body-md text-on-surface-variant">
                  Hey 👋 I&apos;m your AI study buddy{lessonTitle ? `, right here on “${lessonTitle}”` : campusLabel ? ` for ${campusLabel}` : ""}.
                  Ask me anything. I&apos;ll explain it, quiz you, or build you a plan.
                </p>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                <div
                  className={[
                    "max-w-[85%] whitespace-pre-wrap rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed",
                    m.role === "user"
                      ? "bg-primary-container text-on-primary-container"
                      : "bg-surface-container text-on-surface",
                  ].join(" ")}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {loading && (
              <div className="flex justify-start">
                <div className="flex items-center gap-1 rounded-2xl bg-surface-container px-4 py-3">
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-on-surface-variant [animation-delay:-0.2s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-on-surface-variant [animation-delay:-0.1s]" />
                  <span className="h-1.5 w-1.5 animate-bounce rounded-full bg-on-surface-variant" />
                </div>
              </div>
            )}
          </div>

          {/* Starters */}
          {messages.length === 0 && (
            <div className="flex flex-none flex-wrap gap-2 px-4 pb-2">
              {starters.map((s) => (
                <button
                  key={s}
                  onClick={() => send(s)}
                  className="rounded-full border border-outline-variant/20 px-3 py-1 text-xs text-on-surface-variant transition hover:border-primary/40 hover:text-on-surface"
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Composer */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              send(input);
            }}
            className="flex-none border-t border-outline-variant/10 p-3"
          >
            <div className="flex items-center gap-2 rounded-xl border border-outline-variant/20 bg-surface-container-lowest px-3 py-2 focus-within:border-primary focus-within:ring-1 focus-within:ring-primary/30">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask your study buddy…"
                className="flex-1 bg-transparent text-sm text-on-surface outline-none placeholder:text-outline/60"
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-primary-container text-on-primary-container transition disabled:opacity-40"
              >
                <Icon name="arrow_upward" className="text-[18px]" />
              </button>
            </div>
          </form>
        </div>
      )}
    </>
  );
}
