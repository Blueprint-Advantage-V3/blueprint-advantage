import Link from "next/link";
import { redirect } from "next/navigation";
import { getMemberContext, isAdmin } from "@/lib/subscription";
import { BRAND } from "@/lib/constants";
import { Icon } from "@/components/ui/Icon";
import { AdminNav } from "@/components/admin/AdminNav";

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
    <div className="min-h-screen bg-canvas text-on-surface lg:flex">
      {/* Side navigation */}
      <aside className="z-50 flex flex-col border-b border-outline-variant/10 bg-surface-container-low py-stack_md lg:fixed lg:inset-y-0 lg:left-0 lg:w-sidebar_width lg:border-b-0 lg:border-r">
        <div className="mb-stack_lg px-gutter">
          <Link href="/admin" className="block">
            <h1 className="font-headline-md text-headline-md font-bold text-primary">
              {BRAND.shortName} Admin
            </h1>
            <p className="font-label-md text-label-md text-on-surface-variant opacity-70">
              {BRAND.name}
            </p>
          </Link>
        </div>

        <nav className="flex-1 space-y-1">
          <div className="px-4 pb-2 pt-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-outline">
              Administration
            </p>
          </div>
          <AdminNav />
        </nav>

        <div className="mt-auto space-y-1 px-4">
          <div className="mb-4 rounded-xl bg-surface-container-high p-stack_sm">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary-container">
                <Icon name="admin_panel_settings" className="text-[18px]" />
              </div>
              <div>
                <p className="text-xs font-bold">Admin Portal</p>
                <p className="text-[10px] text-outline">Verified Access</p>
              </div>
            </div>
          </div>
          <Link
            href="/hub"
            className="flex items-center gap-stack_sm rounded-r-lg px-4 py-2 text-on-surface-variant transition-colors hover:bg-white/5 hover:text-on-surface"
          >
            <Icon name="arrow_back" />
            <span className="font-label-md text-label-md">Back to hub</span>
          </Link>
        </div>
      </aside>

      {/* Main content area */}
      <main className="flex min-h-screen flex-1 flex-col lg:ml-sidebar_width">
        {/* Sticky top bar */}
        <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-outline-variant/10 bg-surface/70 px-gutter backdrop-blur-xl">
          <div className="flex items-center gap-4">
            <h2 className="font-headline-md text-headline-md font-black text-primary">
              {BRAND.shortName} Admin
            </h2>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-tighter text-primary">
              Admin Only
            </span>
          </div>
          <Link
            href="/hub"
            className="flex items-center gap-1 text-sm text-on-surface-variant transition hover:text-on-surface"
          >
            <Icon name="arrow_back" className="text-base" /> Back to hub
          </Link>
        </header>

        {/* Content canvas */}
        <section className="relative flex-1 overflow-hidden">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-primary/5 blur-[120px]"
          />
          <div className="relative mx-auto max-w-5xl px-gutter py-stack_lg">
            {children}
          </div>
        </section>
      </main>
    </div>
  );
}
