"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { spaceIcon } from "@/lib/icons";
import type { Space } from "@/lib/types";

/**
 * Far-left icon rail — the Discord "servers" column. A Home button up top,
 * then one rounded icon per space. Active space gets the pill indicator.
 */
export function ServerRail({ spaces }: { spaces: Space[] }) {
  const pathname = usePathname();
  const onHome = pathname === "/hub";

  return (
    <nav className="flex h-full w-[72px] flex-none flex-col items-center gap-2 border-r border-outline-variant/10 bg-surface-container-lowest py-3">
      <RailButton href="/hub" active={onHome} label="Home">
        <Icon name="home" fill={onHome} className="text-[22px]" />
      </RailButton>

      <div className="my-1 h-px w-8 bg-outline-variant/20" />

      {spaces.map((s) => {
        const active = pathname.startsWith(`/hub/${s.slug}`);
        return (
          <RailButton
            key={s.id}
            href={`/hub/${s.slug}`}
            active={active}
            label={s.name}
          >
            {s.icon ? (
              <span className="text-xl">{s.icon}</span>
            ) : (
              <Icon name={spaceIcon(s.slug)} fill={active} className="text-[22px]" />
            )}
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
          "absolute left-0 w-1 rounded-r-full bg-primary transition-all",
          active ? "h-8" : "h-0 group-hover:h-4",
        ].join(" ")}
      />
      <Link
        href={href}
        title={label}
        className={[
          "flex h-12 w-12 items-center justify-center transition-all active:scale-95",
          active
            ? "rounded-2xl bg-primary-container text-on-primary-container shadow-[0_0_18px_rgba(124,58,237,0.5)]"
            : "rounded-3xl bg-surface-container-high text-on-surface-variant hover:rounded-2xl hover:bg-primary-container hover:text-on-primary-container hover:shadow-[0_0_18px_rgba(124,58,237,0.4)]",
        ].join(" ")}
      >
        {children}
      </Link>
    </div>
  );
}
