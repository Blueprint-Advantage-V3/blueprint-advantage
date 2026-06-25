"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";

type Entry = { id: string; title: string; track: string; href: string; note: string };

/** Aggregates every lesson note (from the note index) into one place. */
export function MyNotes() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ba_notes_index");
      const idx = raw ? (JSON.parse(raw) as Record<string, { title: string; track: string; href: string }>) : {};
      const list: Entry[] = Object.entries(idx)
        .map(([id, meta]) => ({
          id,
          title: meta.title,
          track: meta.track,
          href: meta.href,
          note: localStorage.getItem(`ba_note_${id}`) ?? "",
        }))
        .filter((e) => e.note.trim());
      setEntries(list);
    } catch {
      /* ignore */
    }
    setReady(true);
  }, []);

  return (
    <div className="mx-auto max-w-3xl px-gutter py-stack_lg">
      <header>
        <h1 className="font-display text-[28px] font-semibold tracking-[-0.02em] text-on-surface md:text-[32px]">
          My notes
        </h1>
        <p className="mt-2 font-body-lg text-body-lg text-on-surface-variant">
          Everything you&apos;ve jotted down across your lessons, in one place.
        </p>
      </header>

      {ready && entries.length === 0 && (
        <div className="mt-8 rounded-2xl border border-outline-variant/10 bg-surface p-12 text-center">
          <Icon name="edit_note" className="text-[34px] text-outline" />
          <p className="mt-3 font-sans text-sm text-on-surface-variant">
            No notes yet. Open any lesson and start jotting, it&apos;ll show up here.
          </p>
        </div>
      )}

      <div className="mt-8 space-y-4">
        {entries.map((e) => (
          <div key={e.id} className="rounded-2xl border border-outline-variant/10 bg-surface p-5">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0">
                <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-outline">{e.track}</p>
                <h3 className="mt-0.5 truncate font-display text-[16px] font-semibold text-on-surface">{e.title}</h3>
              </div>
              <Link
                href={e.href}
                className="flex-none rounded-lg border border-outline-variant/15 px-3 py-1.5 font-sans text-[12px] text-on-surface-variant transition hover:bg-on-surface/[0.05] hover:text-on-surface"
              >
                Open lesson
              </Link>
            </div>
            <p className="mt-3 whitespace-pre-wrap border-t border-outline-variant/10 pt-3 font-sans text-sm leading-relaxed text-on-surface-variant">
              {e.note}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
