"use client";

import { useState } from "react";
import { signOut } from "@/app/(auth)/actions";

/**
 * Bottom-left user panel — Discord-style. Shows the member's avatar/name
 * + "Active member" status, with a menu for billing and sign out.
 */
export function UserPanel({
  fullName,
  email,
}: {
  fullName: string;
  email: string;
}) {
  const [open, setOpen] = useState(false);
  const [loadingPortal, setLoadingPortal] = useState(false);
  const initial = (fullName || email || "M").charAt(0).toUpperCase();

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

  return (
    <div className="relative flex-none border-t border-border bg-black/20 p-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 rounded-lg px-2 py-1.5 transition hover:bg-surface-2"
      >
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-brand text-sm font-semibold text-white">
          {initial}
        </span>
        <span className="min-w-0 text-left">
          <span className="block truncate text-sm font-medium text-zinc-100">
            {fullName}
          </span>
          <span className="block text-xs text-green-400">● Active member</span>
        </span>
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute bottom-16 left-2 z-20 w-56 rounded-xl border border-border bg-surface-2 p-1.5 shadow-xl">
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
  );
}
