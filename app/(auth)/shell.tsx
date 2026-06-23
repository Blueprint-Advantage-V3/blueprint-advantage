import Link from "next/link";
import { BRAND } from "@/lib/constants";

/**
 * Shared visual frame for the auth pages — centered card on the dark canvas.
 */
export function AuthShell({
  title,
  subtitle,
  children,
  footer,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer: React.ReactNode;
}) {
  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-canvas px-6 py-12">
      <div className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      <div className="w-full max-w-md">
        <Link
          href="/"
          className="mb-8 block text-center font-display text-headline-md font-black uppercase tracking-tighter text-primary"
        >
          {BRAND.name}
        </Link>
        <div className="glass-panel rounded-2xl p-8">
          <h1 className="font-headline-md text-headline-md font-bold tracking-tight">{title}</h1>
          <p className="mt-1.5 font-body-md text-body-md text-on-surface-variant">{subtitle}</p>
          <div className="mt-6">{children}</div>
        </div>
        <p className="mt-6 text-center font-body-md text-body-md text-on-surface-variant">{footer}</p>
      </div>
    </main>
  );
}
