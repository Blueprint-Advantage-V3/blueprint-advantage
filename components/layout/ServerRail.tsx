"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";
import { LogoMark } from "@/components/brand/Logo";
import { spaceIcon } from "@/lib/icons";
import type { Space } from "@/lib/types";

/**
 * Far-left rail: brand, global nav (Home, Wins), then a tile per space. Clean
 * rounded tiles with a crisp active state + edge indicator.
 */
export function ServerRail({ spaces }: { spaces: Space[] }) {
  const pathname = usePathname();
  const onHome = pathname === "/hub";
  const onWins = pathname.startsWith("/hub/wins");

  return (
    <nav className="flex h-full w-[68px] flex-none flex-col items-center gap-1.5 border-r border-outline-variant/10 bg-surface-container-lowest py-3">
      <Link
        href="/hub"
        title="Blueprint Advantage"
        className="mb-1 transition-transform active:scale-95"
      >
        <LogoMark size={38} />
      </Link>

      <RailTile href="/hub" active={onHome} label="Home" icon="home" />
      <RailTile href="/hub/wins" active={onWins} label="Wins" icon="emoji_events" />

      <div className="my-1.5 h-px w-7 bg-outline-variant/15" />

      {spaces.map((s) => (
        <RailTile
          key={s.id}
          href={`/hub/${s.slug}`}
          active={pathname.startsWith(`/hub/${s.slug}`)}
          label={s.name}
          icon={spaceIcon(s.slug)}
          emoji={s.icon}
        />
      ))}
    </nav>
  );
}

function RailTile({
  href,
  active,
  label,
  icon,
  emoji,
}: {
  href: string;
  active: boolean;
  label: string;
  icon: string;
  emoji?: string | null;
}) {
  return (
    <div className="group relative flex w-full items-center justify-center">
      <span
        className={[
          "absolute left-0 w-[3px] rounded-r-full bg-primary transition-all",
          active ? "h-7" : "h-0 group-hover:h-3.5",
        ].join(" ")}
      />
      <Link
        href={href}
        title={label}
        className={[
          "flex h-11 w-11 items-center justify-center rounded-2xl transition-all active:scale-95",
          active
            ? "bg-primary-container text-on-primary-container shadow-[0_0_0_1px_rgba(122,162,255,0.45)]"
            : "bg-surface-container-high text-on-surface-variant hover:bg-surface-bright hover:text-on-surface",
        ].join(" ")}
      >
        {emoji ? (
          <span className="text-lg">{emoji}</span>
        ) : (
          <Icon name={icon} fill={active} className="text-[21px]" />
        )}
      </Link>
    </div>
  );
}
