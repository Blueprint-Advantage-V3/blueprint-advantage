import Link from "next/link";
import { redirect } from "next/navigation";
import { getMemberContext, isAdmin } from "@/lib/subscription";
import { BRAND } from "@/lib/constants";

/**
 * Admin shell — owner only. Gated on profiles.role = 'admin'.
 * (Auth is enforced by middleware; the role check happens here.)
 */
export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, profile } = await getMemberContext();

  if (!user) redirect("/login?redirect=/admin");
  if (!isAdmin(profile)) redirect("/hub");

  return (
    <div className="min-h-screen bg-canvas">
      <header className="flex h-16 items-center justify-between border-b border-border bg-surface px-6">
        <div className="flex items-center gap-3">
          <Link href="/admin" className="font-semibold tracking-tight">
            {BRAND.shortName} Admin
          </Link>
          <span className="rounded bg-brand-soft px-2 py-0.5 text-xs text-brand">
            Owner
          </span>
        </div>
        <Link href="/hub" className="text-sm text-muted transition hover:text-white">
          ← Back to hub
        </Link>
      </header>
      <div className="mx-auto max-w-5xl px-6 py-10">{children}</div>
    </div>
  );
}
