"use client";

import { useState } from "react";
import { signOut } from "@/app/(auth)/actions";

/**
 * Top bar — brand context on the left (rendered by the page), member
 * account + subscription status on the right. The account menu opens the
 * Stripe billing portal or signs out.
 */
export function TopBar({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);

  async function openPortal() {
    setLoadingPortal(true);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
    } finally {
      setLoadingPortal(false);
    }
  }

  const initial = (fullName || email || "M").charAt(0).toUpperCase();

  return (
    <header className="flex h-16 flex-none items-center justify-between border-b border-border bg-surface/60 px-6 backdrop-blur">
      <div className="flex items-center gap-2">
        <span className="rounded-full bg-green-500/15 px-2.5 py-1 text-xs font-medium text-green-400">
          ● Active member
        </span>
      </div>

      <div className="relative">
        <button
          onClick={() => setOpen((v) => !v)}
          className="flex items-center gap-2.5 rounded-lg px-2 py-1.5 transition hover:bg-surface-2"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
            {initial}
          </span>
          <span className="hidden text-sm text-zinc-200 sm:block">{fullName}</span>
        </button>

        {open && (
          <>
            <div
              className="fixed inset-0 z-10"
              onClick={() => setOpen(false)}
              aria-hidden
            />
            <div className="absolute right-0 z-20 mt-2 w-56 rounded-xl border border-border bg-surface-2 p-1.5 shadow-xl">
              <div className="px-3 py-2">
                <p className="truncate text-sm font-medium text-zinc-100">{fullName}</p>
                <p className="truncate text-xs text-zinc-500">{email}</p>
              </div>
              <div className="my-1 h-px bg-border" />
              <button
                onClick={openPortal}
                disabled={loadingPortal}
                className="block w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-surface disabled:opacity-60"
              >
                {loadingPortal ? "Opening…" : "Manage subscription"}
              </button>
              <form action={signOut}>
                <button className="block w-full rounded-lg px-3 py-2 text-left text-sm text-zinc-300 transition hover:bg-surface">
                  Sign out
                </button>
              </form>
            </div>
          </>
        )}
      </div>
    </header>
  );
}
