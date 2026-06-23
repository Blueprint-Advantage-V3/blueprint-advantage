"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { BRAND } from "@/lib/constants";
import type { Space } from "@/lib/types";

/**
 * Persistent left sidebar — the "spaces" rail, Discord-style.
 * Highlights the active space based on the current path.
 *
 * Phase 2 hook: each space could show an unread/online indicator and,
 * inside a space, a sub-list of #channels (chat). Left structurally open.
 */
export function Sidebar({
  spaces,
  isAdmin,
}: {
  spaces: Space[];
  isAdmin: boolean;
}) {
  const pathname = usePathname();

  return (
    <aside className="flex h-full w-64 flex-none flex-col border-r border-border bg-surface">
      {/* Brand */}
      <div className="flex h-16 flex-none items-center border-b border-border px-5">
        <Link href="/hub" className="text-base font-semibold tracking-tight">
          {BRAND.name}
        </Link>
      </div>

      {/* Spaces list */}
      <nav className="flex-1 space-y-0.5 overflow-y-auto px-3 py-4">
        <p className="px-2 pb-2 text-xs font-semibold uppercase tracking-wider text-zinc-500">
          Spaces
        </p>
        {spaces.length === 0 && (
          <p className="px-2 text-sm text-zinc-500">No spaces yet.</p>
        )}
        {spaces.map((space) => {
          const href = `/hub/${space.slug}`;
          const active = pathname.startsWith(href);
          return (
            <Link
              key={space.id}
              href={href}
              className={[
                "group flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm transition",
                active
                  ? "bg-brand-soft text-white"
                  : "text-zinc-400 hover:bg-surface-2 hover:text-zinc-100",
              ].join(" ")}
            >
              <span className="w-5 flex-none text-center text-base">
                {space.icon ?? "#"}
              </span>
              <span className="truncate">{space.name}</span>
              {!space.is_published && (
                <span className="ml-auto rounded bg-surface-2 px-1.5 py-0.5 text-[10px] uppercase text-zinc-500">
                  Draft
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* Admin link (owner only) */}
      {isAdmin && (
        <div className="flex-none border-t border-border p-3">
          <Link
            href="/admin"
            className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-zinc-400 transition hover:bg-surface-2 hover:text-zinc-100"
          >
            <span className="w-5 flex-none text-center">⚙️</span>
            Admin
          </Link>
        </div>
      )}
    </aside>
  );
}
