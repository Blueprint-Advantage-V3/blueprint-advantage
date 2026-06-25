"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/ui/Icon";

type Win = {
  id: string;
  author: string;
  initial: string;
  campus?: string;
  body: string;
  fire: number;
  reacted?: boolean;
};

const SEED: Win[] = [
  { id: "w1", author: "Maya R.", initial: "M", campus: "Road to University", body: "Just hit 1480 on my SAT practice test 🔥 up 120 points in 6 weeks!", fire: 47 },
  { id: "w2", author: "Sofia K.", initial: "S", campus: "Using AI", body: "Automated my whole weekly report with one prompt. Saved ~6 hours this week. 🤖", fire: 58 },
  { id: "w3", author: "Andre L.", initial: "A", campus: "Finance", body: "Opened my first brokerage account and made my first index-fund buy. Pay yourself first works.", fire: 31 },
  { id: "w4", author: "Jordan T.", initial: "J", campus: "Law", body: "Reviewed my apartment lease and caught a clause that would've cost me hundreds. This stuff is REAL.", fire: 22 },
];

/** Community Wins feed — post your wins, react with 🔥, persisted in the demo.
 *  `embedded` drops the page chrome so it can live inside the home dashboard. */
export function WinsFeed({ currentUser, embedded = false }: { currentUser: string; embedded?: boolean }) {
  const KEY = "ba_wins_v1";
  const [wins, setWins] = useState<Win[]>(SEED);
  const [draft, setDraft] = useState("");
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setWins(JSON.parse(raw));
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(KEY, JSON.stringify(wins));
      } catch {
        /* ignore */
      }
    }
  }, [wins, ready]);

  function post(e: React.FormEvent) {
    e.preventDefault();
    const body = draft.trim();
    if (!body) return;
    setWins((prev) => [
      { id: `w-${Date.now()}`, author: currentUser, initial: currentUser.charAt(0).toUpperCase(), body, fire: 0 },
      ...prev,
    ]);
    setDraft("");
  }

  function react(id: string) {
    setWins((prev) =>
      prev.map((w) =>
        w.id === id ? { ...w, fire: w.fire + (w.reacted ? -1 : 1), reacted: !w.reacted } : w
      )
    );
  }

  const body = (
    <>
      <form onSubmit={post} className="glass-panel mb-5 rounded-xl p-4">
        <textarea
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Share a win, big or small…"
          rows={2}
          className="w-full resize-none bg-transparent text-sm text-on-surface outline-none placeholder:text-outline"
        />
        <div className="mt-2 flex justify-end">
          <button
            type="submit"
            disabled={!draft.trim()}
            className="rounded-lg bg-primary-container px-5 py-2 text-sm font-bold text-on-primary-container transition active:scale-95 disabled:opacity-40"
          >
            Post win
          </button>
        </div>
      </form>

      <div className="space-y-3">
        {wins.map((w) => (
          <article key={w.id} className="glass-panel rounded-xl p-5">
            <div className="flex gap-3">
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary-container text-sm font-bold text-on-primary-container">
                {w.initial}
              </span>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="font-label-md text-sm font-bold text-on-surface">{w.author}</p>
                  {w.campus && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[10px] font-bold text-primary">
                      {w.campus}
                    </span>
                  )}
                </div>
                <p className="mt-1 font-body-md text-body-md text-on-surface-variant">{w.body}</p>
                <button
                  onClick={() => react(w.id)}
                  className={`mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold transition ${
                    w.reacted
                      ? "border-primary/40 bg-primary/10 text-primary"
                      : "border-outline-variant/20 text-on-surface-variant hover:text-on-surface"
                  }`}
                >
                  🔥 {w.fire}
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </>
  );

  if (embedded) return body;

  return (
    <div className="mx-auto h-full max-w-2xl overflow-y-auto px-gutter py-stack_lg">
      <div className="mb-6 flex items-center gap-3">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/15 text-primary">
          <Icon name="emoji_events" fill className="text-[26px]" />
        </span>
        <div>
          <h1 className="font-display text-headline-lg tracking-tight">Wins</h1>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Post your wins. Celebrate everyone else&apos;s. 🔥
          </p>
        </div>
      </div>
      {body}
    </div>
  );
}
