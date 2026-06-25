"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { DEMO_SPACES, DEMO_LESSONS } from "@/lib/demo";

type Item = { label: string; sub: string; href: string; icon: string };

function buildIndex(): Item[] {
  const items: Item[] = [
    { label: "Home", sub: "Dashboard", href: "/hub", icon: "home" },
    { label: "Members", sub: "Directory", href: "/hub/members", icon: "group" },
    { label: "My notes", sub: "Your notes", href: "/hub/notes", icon: "edit_note" },
    { label: "Settings", sub: "Account", href: "/settings", icon: "settings" },
  ];
  DEMO_SPACES.forEach((s) =>
    items.push({ label: s.name, sub: "Track", href: `/hub/${s.slug}/lessons`, icon: "school" })
  );
  DEMO_LESSONS.forEach((l) => {
    const slug = l.space_id.replace("space-", "");
    const space = DEMO_SPACES.find((s) => s.id === l.space_id);
    items.push({
      label: l.title,
      sub: `Lesson · ${space?.name ?? ""}`,
      href: `/hub/${slug}/lessons/${l.slug}`,
      icon: "smart_display",
    });
  });
  return items;
}

/** ⌘K command palette. Opens on ⌘K/Ctrl+K or an "open-search" window event. */
export function SearchPalette() {
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const index = useMemo(buildIndex, []);

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((o) => !o);
      }
      if (e.key === "Escape") setOpen(false);
    }
    function onOpen() {
      setOpen(true);
    }
    window.addEventListener("keydown", onKey);
    window.addEventListener("open-search", onOpen);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("open-search", onOpen);
    };
  }, []);

  const results = q.trim()
    ? index.filter((i) => `${i.label} ${i.sub}`.toLowerCase().includes(q.toLowerCase())).slice(0, 8)
    : index.filter((i) => !i.sub.startsWith("Lesson")).slice(0, 6);

  function go(href: string) {
    setOpen(false);
    setQ("");
    router.push(href);
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] flex items-start justify-center p-4 pt-[12vh]" onClick={() => setOpen(false)}>
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-2xl border border-outline-variant/15 bg-surface-container-low shadow-2xl"
      >
        <div className="flex items-center gap-3 border-b border-outline-variant/10 px-4">
          <Icon name="search" className="text-[20px] text-outline" />
          <input
            autoFocus
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search lessons, tracks, people…"
            className="flex-1 bg-transparent py-3.5 font-sans text-sm text-on-surface outline-none placeholder:text-outline"
          />
          <kbd className="rounded border border-outline-variant/20 px-1.5 py-0.5 font-sans text-[10px] text-outline">esc</kbd>
        </div>
        <div className="max-h-[50vh] overflow-y-auto p-2">
          {results.length === 0 && (
            <p className="px-3 py-6 text-center font-sans text-sm text-on-surface-variant">No results for “{q}”.</p>
          )}
          {results.map((r) => (
            <button
              key={r.href + r.label}
              onClick={() => go(r.href)}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-left transition hover:bg-on-surface/[0.05]"
            >
              <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-surface-container-high text-on-surface-variant">
                <Icon name={r.icon} className="text-[18px]" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block truncate font-sans text-sm text-on-surface">{r.label}</span>
                <span className="block truncate font-sans text-[12px] text-on-surface-variant">{r.sub}</span>
              </span>
              <Icon name="arrow_forward" className="text-[16px] text-outline" />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
