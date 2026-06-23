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
        className="glow-button w-full rounded-2xl bg-primary-container py-6 font-headline-md text-headline-md font-black text-on-primary-container transition-transform active:scale-95 disabled:opacity-60"
      >
        {loading ? "Redirecting…" : "Subscribe & enter the hub"}
      </button>
      {error && <p className="mt-3 font-body-md text-body-md text-error">{error}</p>}
    </div>
  );
}
