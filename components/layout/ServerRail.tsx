"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Space } from "@/lib/types";

/**
 * Far-left icon rail — the Discord "servers" column. A Home button up top,
 * then one rounded icon per space. Active space gets the pill indicator.
 */
export function ServerRail({ spaces }: { spaces: Space[] }) {
  const pathname = usePathname();
  const onHome = pathname === "/hub";

  return (
    <nav className="flex h-full w-[72px] flex-none flex-col items-center gap-2 border-r border-border bg-black/40 py-3">
      <RailButton href="/hub" active={onHome} label="Home">
        <span className="text-lg">🏠</span>
      </RailButton>

      <div className="my-1 h-px w-8 bg-border" />

      {spaces.map((s) => {
        const active = pathname.startsWith(`/hub/${s.slug}`);
        return (
          <RailButton
            key={s.id}
            href={`/hub/${s.slug}`}
            active={active}
            label={s.name}
          >
            <span className="text-xl">{s.icon ?? "#"}</span>
          </RailButton>
        );
      })}
    </nav>
  );
}

function RailButton({
  href,
  active,
  label,
  children,
}: {
  href: string;
  active: boolean;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative flex w-full items-center justify-center">
      {/* active/hover pill on the left edge */}
      <span
        className={[
          "absolute left-0 w-1 rounded-r-full bg-white transition-all",
          active ? "h-8" : "h-0 group-hover:h-4",
        ].join(" ")}
      />
      <Link
        href={href}
        title={label}
        className={[
          "flex h-12 w-12 items-center justify-center transition-all",
          active
            ? "rounded-2xl bg-brand text-white"
            : "rounded-3xl bg-surface-2 text-zinc-200 hover:rounded-2xl hover:bg-brand hover:text-white",
        ].join(" ")}
      >
        {children}
      </Link>
    </div>
  );
}
