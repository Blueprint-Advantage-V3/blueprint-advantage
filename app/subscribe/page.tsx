import { redirect } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
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
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-6 py-12">
      <div className="w-full max-w-md text-center">
        <span className="font-label-md text-label-md font-bold uppercase tracking-widest text-primary">
          One step left
        </span>
        <h1 className="mt-3 font-display text-display tracking-tight text-on-surface">
          Claim Your Seat
        </h1>
        <p className="mt-3 font-body-md text-body-md text-on-surface-variant">
          Activate your {BRAND.name} membership to unlock every space and lesson.
        </p>

        {searchParams.canceled && (
          <p className="mt-5 rounded-lg border border-outline-variant/20 bg-surface-container px-4 py-3 font-body-md text-body-md text-on-surface-variant">
            Checkout canceled. No worries, you can join whenever you're ready.
          </p>
        )}

        <div className="glass-card mt-8 rounded-[2rem] border-2 border-primary/20 p-stack_lg shadow-card">
          <div className="flex items-baseline justify-center gap-1">
            <span className="font-display text-[64px] leading-none">{PRICE_DISPLAY.amount}</span>
            <span className="font-headline-md text-on-surface-variant">{PRICE_DISPLAY.period}</span>
          </div>
          <ul className="mx-auto mt-6 max-w-xs space-y-3 text-left">
            {[
              "Every space, every lesson",
              "Video + written playbooks",
              "New content weekly",
              "Cancel anytime",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <Icon name="check_circle" fill className="text-[20px] text-primary" />
                <span className="font-body-md text-body-md">{f}</span>
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <SubscribeButton />
          </div>
          <p className="mt-3 font-label-md text-label-md text-on-surface-variant">
            Secure checkout via Stripe. Card required.
          </p>
        </div>

        <form action={signOut} className="mt-6">
          <button className="font-label-md text-label-md text-on-surface-variant transition hover:text-on-surface">
            Sign out
          </button>
        </form>
      </div>
    </main>
  );
}
