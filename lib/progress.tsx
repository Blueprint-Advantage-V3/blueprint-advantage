"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { fireConfetti } from "@/lib/confetti";

/**
 * Client-side gamification store (XP, ranks, completed lessons, streak),
 * persisted to localStorage so progress survives reloads in the demo.
 * When the real backend lands (Wave 4) this moves to Supabase; the hook API
 * stays the same.
 */

export const TOTAL_RANKS = 5;
export const XP_PER_LESSON = 100;
// XP needed to be AT each rank (index 0 = Rank 1).
export const RANK_THRESHOLDS = [0, 100, 250, 500, 900];

export function rankForXp(xp: number): number {
  let rank = 1;
  for (let i = 0; i < RANK_THRESHOLDS.length; i++) {
    if (xp >= RANK_THRESHOLDS[i]) rank = i + 1;
  }
  return rank;
}

export function rankProgress(xp: number): {
  rank: number;
  into: number;
  need: number;
  pct: number;
  atMax: boolean;
} {
  const rank = rankForXp(xp);
  const curr = RANK_THRESHOLDS[rank - 1];
  if (rank >= TOTAL_RANKS) {
    return { rank, into: xp - curr, need: 0, pct: 100, atMax: true };
  }
  const next = RANK_THRESHOLDS[rank];
  const into = xp - curr;
  const need = next - curr;
  return { rank, into, need, pct: Math.min(100, Math.round((into / need) * 100)), atMax: false };
}

type State = {
  campusXp: Record<string, number>;
  completed: string[];
  streak: number;
  lastActive: string; // YYYY-MM-DD
};

const EMPTY: State = { campusXp: {}, completed: [], streak: 0, lastActive: "" };
const KEY = "ba_progress_v1";

type Ctx = {
  ready: boolean;
  totalXp: number;
  lessonsCompleted: number;
  streak: number;
  campusXp: (slug: string) => number;
  campusRank: (slug: string) => number;
  isComplete: (lessonId: string) => boolean;
  completeLesson: (campus: string, lessonId: string) => void;
};

const ProgressContext = createContext<Ctx | null>(null);

function ymd(d: Date) {
  return d.toISOString().slice(0, 10);
}

export function ProgressProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<State>(EMPTY);
  const [ready, setReady] = useState(false);

  // Load + tick the daily streak on mount.
  useEffect(() => {
    let s: State = EMPTY;
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) s = { ...EMPTY, ...JSON.parse(raw) };
    } catch {
      /* ignore */
    }
    const today = ymd(new Date());
    if (s.lastActive !== today) {
      const y = new Date();
      y.setDate(y.getDate() - 1);
      const yesterday = ymd(y);
      s = {
        ...s,
        streak: s.lastActive === yesterday ? s.streak + 1 : 1,
        lastActive: today,
      };
    }
    setState(s);
    setReady(true);
  }, []);

  // Persist.
  useEffect(() => {
    if (ready) {
      try {
        localStorage.setItem(KEY, JSON.stringify(state));
      } catch {
        /* ignore */
      }
    }
  }, [state, ready]);

  const completeLesson = useCallback((campus: string, lessonId: string) => {
    setState((prev) => {
      if (prev.completed.includes(lessonId)) return prev;
      const before = rankForXp(prev.campusXp[campus] ?? 0);
      const xp = (prev.campusXp[campus] ?? 0) + XP_PER_LESSON;
      if (rankForXp(xp) > before) {
        setTimeout(() => fireConfetti(), 0);
      }
      return {
        ...prev,
        completed: [...prev.completed, lessonId],
        campusXp: { ...prev.campusXp, [campus]: xp },
      };
    });
  }, []);

  const value: Ctx = {
    ready,
    totalXp: Object.values(state.campusXp).reduce((a, b) => a + b, 0),
    lessonsCompleted: state.completed.length,
    streak: state.streak,
    campusXp: (slug) => state.campusXp[slug] ?? 0,
    campusRank: (slug) => rankForXp(state.campusXp[slug] ?? 0),
    isComplete: (lessonId) => state.completed.includes(lessonId),
    completeLesson,
  };

  return <ProgressContext.Provider value={value}>{children}</ProgressContext.Provider>;
}

export function useProgress(): Ctx {
  const ctx = useContext(ProgressContext);
  if (!ctx) {
    // Safe no-op fallback if used outside the provider.
    return {
      ready: false,
      totalXp: 0,
      lessonsCompleted: 0,
      streak: 0,
      campusXp: () => 0,
      campusRank: () => 1,
      isComplete: () => false,
      completeLesson: () => {},
    };
  }
  return ctx;
}
