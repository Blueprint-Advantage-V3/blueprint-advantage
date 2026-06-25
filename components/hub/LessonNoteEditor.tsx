"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui/Icon";

/**
 * Per-lesson note pad. Autosaves to localStorage and keeps an index so a
 * "My notes" view can list every lesson you've taken notes on.
 */
export function LessonNoteEditor({
  lessonId,
  lessonTitle,
  trackName,
  href,
}: {
  lessonId: string;
  lessonTitle: string;
  trackName: string;
  href: string;
}) {
  const KEY = `ba_note_${lessonId}`;
  const [note, setNote] = useState("");
  const [savedAt, setSavedAt] = useState<number | null>(null);
  const ready = useRef(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setNote(raw);
    } catch {
      /* ignore */
    }
    ready.current = true;
  }, [KEY]);

  useEffect(() => {
    if (!ready.current) return;
    const t = setTimeout(() => {
      try {
        localStorage.setItem(KEY, note);
        const raw = localStorage.getItem("ba_notes_index");
        const idx = raw ? JSON.parse(raw) : {};
        if (note.trim()) idx[lessonId] = { title: lessonTitle, track: trackName, href };
        else delete idx[lessonId];
        localStorage.setItem("ba_notes_index", JSON.stringify(idx));
        setSavedAt(Date.now());
      } catch {
        /* ignore */
      }
    }, 500);
    return () => clearTimeout(t);
  }, [note, KEY, lessonId, lessonTitle, trackName, href]);

  return (
    <div className="rounded-2xl border border-outline-variant/10 bg-surface p-5">
      <div className="mb-2.5 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-[15px] font-semibold text-on-surface">
          <Icon name="edit_note" className="text-[20px] text-primary" /> Your notes
        </h3>
        {savedAt && note.trim() ? (
          <span className="flex items-center gap-1 font-sans text-[11px] text-on-surface-variant">
            <Icon name="cloud_done" className="text-[14px]" /> Saved
          </span>
        ) : null}
      </div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        rows={7}
        placeholder="Jot down what matters from this lesson. It saves automatically and shows up in My notes."
        className="w-full resize-y rounded-lg border border-outline-variant/10 bg-surface-container-lowest p-3 font-sans text-sm leading-relaxed text-on-surface outline-none transition focus:border-primary/50 placeholder:text-outline"
      />
    </div>
  );
}
