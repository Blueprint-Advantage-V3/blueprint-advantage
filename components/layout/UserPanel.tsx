"use client";

import { useState } from "react";
import { signOut } from "@/app/(auth)/actions";
import { Icon } from "@/components/ui/Icon";

/**
 * Bottom-left user panel — community-style. Shows the member's avatar/name
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
    <div className="relative flex-none space-y-stack_sm border-t border-outline-variant/10 bg-surface-container-low p-3">
      {/* Manage Subscription — primary-container button above the user row */}
      <button
        onClick={openPortal}
        disabled={loadingPortal}
        className="w-full rounded-lg bg-primary-container py-3 font-label-md text-label-md font-bold text-on-primary-container transition-all hover:opacity-90 active:scale-95 disabled:opacity-60"
      >
        {loadingPortal ? "Opening…" : "Manage Subscription"}
      </button>

      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-stack_sm rounded-lg px-2 py-1.5 transition-colors hover:bg-white/5"
      >
        <span className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary-container text-sm font-bold text-on-primary-container">
          {initial}
        </span>
        <span className="min-w-0 text-left">
          <span className="block truncate font-label-md text-label-md text-on-surface">
            {fullName}
          </span>
          <span className="flex items-center gap-1 text-xs text-secondary">
            <span className="h-1.5 w-1.5 flex-none rounded-full bg-green-500" />
            Active member
          </span>
        </span>
        <Icon name="expand_less" className="ml-auto text-[20px] text-on-surface-variant" />
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} aria-hidden />
          <div className="absolute bottom-20 left-3 right-3 z-20 rounded-xl border border-outline-variant/20 bg-surface-container p-1.5 shadow-2xl">
            <div className="px-3 py-2">
              <p className="truncate font-label-md text-label-md text-on-surface">{fullName}</p>
              <p className="truncate text-xs text-outline">{email}</p>
            </div>
            <div className="my-1 h-px bg-outline-variant/20" />
            <button
              onClick={openPortal}
              disabled={loadingPortal}
              className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-on-surface-variant transition-colors hover:bg-white/5 disabled:opacity-60"
            >
              <Icon name="payments" className="text-[18px]" />
              {loadingPortal ? "Opening…" : "Manage subscription"}
            </button>
            <form action={signOut}>
              <button className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-left text-sm text-on-surface-variant transition-colors hover:bg-white/5">
                <Icon name="logout" className="text-[18px]" />
                Sign out
              </button>
            </form>
          </div>
        </>
      )}
    </div>
  );
}
