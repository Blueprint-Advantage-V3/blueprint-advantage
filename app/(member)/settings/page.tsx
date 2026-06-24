import { getMemberContext } from "@/lib/subscription";
import { signOut } from "@/app/(auth)/actions";
import { Icon } from "@/components/ui/Icon";
import { ManageSubscription } from "@/components/settings/ManageSubscription";
import { PRICE_DISPLAY } from "@/lib/constants";

export const metadata = { title: "Settings" };

/**
 * Account settings — profile, subscription management, and sign out.
 * Reached from the user menu (bottom-left of the hub).
 */
export default async function SettingsPage() {
  const { user, profile } = await getMemberContext();
  const fullName = profile?.full_name ?? user?.email ?? "Member";
  const email = user?.email ?? "";

  return (
    <div className="mx-auto h-full max-w-2xl overflow-y-auto px-gutter py-stack_lg">
      <h1 className="font-display text-headline-lg tracking-tight">Settings</h1>
      <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
        Manage your account and membership.
      </p>

      {/* Account */}
      <section className="glass-panel mt-6 rounded-xl p-6">
        <h2 className="mb-4 font-headline-md text-headline-md">Account</h2>
        <div className="flex items-center gap-4">
          <span className="flex h-12 w-12 flex-none items-center justify-center rounded-full bg-primary-container text-lg font-bold text-on-primary-container">
            {fullName.charAt(0).toUpperCase()}
          </span>
          <div className="min-w-0">
            <p className="truncate font-bold text-on-surface">{fullName}</p>
            <p className="truncate text-sm text-outline">{email}</p>
          </div>
          <span className="ml-auto flex flex-none items-center gap-1.5 rounded-full bg-secondary/10 px-3 py-1 text-xs font-bold text-secondary">
            <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            Active member
          </span>
        </div>
      </section>

      {/* Subscription */}
      <section className="glass-panel mt-4 rounded-xl p-6">
        <h2 className="mb-1 font-headline-md text-headline-md">Subscription</h2>
        <p className="mb-4 font-body-md text-body-md text-on-surface-variant">
          {PRICE_DISPLAY.amount}
          {PRICE_DISPLAY.period} · renews monthly. Update your card or cancel anytime.
        </p>
        <ManageSubscription />
      </section>

      {/* Sign out */}
      <section className="mt-4">
        <form action={signOut}>
          <button className="flex items-center gap-2 rounded-lg border border-outline-variant/20 px-5 py-3 text-sm font-bold text-on-surface-variant transition hover:border-error/40 hover:text-error">
            <Icon name="logout" className="text-[18px]" />
            Sign out
          </button>
        </form>
      </section>
    </div>
  );
}
