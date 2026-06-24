"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";

const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

/**
 * Opens the Stripe billing portal (update card / cancel). In demo mode there's
 * no Stripe customer, so it shows a clear note instead of erroring.
 */
export function ManageSubscription() {
  const [loading, setLoading] = useState(false);
  const [note, setNote] = useState<string | null>(null);

  async function open() {
    if (IS_DEMO) {
      setNote(
        "In demo mode there's no real subscription. Once Stripe is connected, this opens the billing portal to update your card or cancel."
      );
      return;
    }
    setLoading(true);
    setNote(null);
    try {
      const res = await fetch("/api/stripe/portal", { method: "POST" });
      const data = await res.json();
      if (data.url) window.location.href = data.url;
      else setNote(data.error || "Couldn't open billing right now. Try again.");
    } catch {
      setNote("Couldn't reach billing. Try again in a moment.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={open}
        disabled={loading}
        className="glow-button inline-flex items-center gap-2 rounded-lg bg-primary-container px-6 py-3 font-label-md text-label-md font-bold text-on-primary-container transition-all active:scale-95 disabled:opacity-60"
      >
        <Icon name="credit_card" className="text-[18px]" />
        {loading ? "Opening…" : "Manage Subscription"}
      </button>
      {note && (
        <p className="mt-3 max-w-md text-sm text-on-surface-variant">{note}</p>
      )}
    </div>
  );
}
