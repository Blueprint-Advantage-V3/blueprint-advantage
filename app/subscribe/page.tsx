import { redirect } from "next/navigation";
import { getMemberContext } from "@/lib/subscription";
import { BRAND, PRICE_DISPLAY } from "@/lib/constants";
import { signOut } from "../(auth)/actions";
import { SubscribeButton } from "./subscribe-button";

export const metadata = { title: "Join" };

/**
 * Paywall. Reached by logged-in users who don't yet have an active sub.
 * Active subscribers are bounced straight into the hub.
 */
export default async function SubscribePage({
  searchParams,
}: {
  searchParams: { canceled?: string };
}) {
  const { user, hasAccess } = await getMemberContext();

  if (!user) redirect("/login?redirect=/subscribe");
  if (hasAccess) redirect("/hub");

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-12">
      <div className="w-full max-w-md text-center">
        <h1 className="text-3xl font-bold tracking-tight">One step left</h1>
        <p className="mt-3 text-muted">
          Activate your {BRAND.name} membership to unlock every space and lesson.
        </p>

        {searchParams.canceled && (
          <p className="mt-5 rounded-lg border border-border bg-surface px-4 py-3 text-sm text-zinc-300">
            Checkout canceled — no worries, you can join whenever you're ready.
          </p>
        )}

        <div className="mt-8 rounded-3xl border border-border bg-surface p-8 shadow-glow">
          <div className="flex items-end justify-center">
            <span className="text-5xl font-bold">{PRICE_DISPLAY.amount}</span>
            <span className="mb-1.5 ml-1 text-lg text-muted">{PRICE_DISPLAY.period}</span>
          </div>
          <ul className="mx-auto mt-6 max-w-xs space-y-2.5 text-left text-sm text-zinc-300">
            {[
              "Every space, every lesson",
              "Video + written playbooks",
              "New content weekly",
              "Cancel anytime",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="text-brand">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <SubscribeButton />
          </div>
          <p className="mt-3 text-xs text-zinc-500">
            Secure checkout via Stripe. Card required.
          </p>
        </div>

        <form action={signOut} className="mt-6">
          <button className="text-sm text-muted transition hover:text-white">
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
