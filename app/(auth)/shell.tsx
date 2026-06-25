import Link from "next/link";
import { Logo } from "@/components/brand/Logo";

/**
 * Shared visual frame for the auth pages — centered card on the warm canvas.
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
      <div className="w-full max-w-md">
        <div className="mb-8 flex justify-center">
          <Logo href="/" size={32} wordmarkClass="text-[20px] font-medium" />
        </div>
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
