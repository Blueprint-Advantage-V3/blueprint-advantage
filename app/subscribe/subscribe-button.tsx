"use client";

import { useState } from "react";

/**
 * Kicks off Stripe Checkout. POSTs to our API route, which returns the
 * hosted Checkout URL, then redirects the browser there.
 */
export function SubscribeButton() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function startCheckout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", { method: "POST" });
      const data = await res.json();
      if (!res.ok || !data.url) {
        throw new Error(data.error ?? "Could not start checkout");
      }
      window.location.href = data.url;
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong");
      setLoading(false);
    }
  }

  return (
    <div>
      <button
        onClick={startCheckout}
        disabled={loading}
        className="w-full rounded-xl bg-brand px-5 py-3.5 font-semibold text-white transition hover:bg-brand-hover disabled:opacity-60"
      >
        {loading ? "Redirecting…" : "Subscribe & enter the hub"}
      </button>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
    </div>
  );
}
