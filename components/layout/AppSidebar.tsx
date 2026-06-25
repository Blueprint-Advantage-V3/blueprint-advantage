"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserPanel } from "./UserPanel";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "@/components/brand/Logo";
import { BRAND } from "@/lib/constants";
import type { Space } from "@/lib/types";

/**
 * The single, content-first app sidebar. Replaces the old Discord-style
 * server rail + channel list with one clean column: product sections on top,
 * the member's tracks below, profile at the bottom.
 */
const NAV = [
  { href: "/hub", label: "Home", icon: "home", exact: true },
  { href: "/hub/live", label: "Live", icon: "live_tv" },
  { href: "/hub/community", label: "Community", icon: "forum" },
  { href: "/hub/wins", label: "Wins", icon: "emoji_events" },
  { href: "/hub/members", label: "Members", icon: "group" },
];

const SECTION_SLUGS = ["live", "community", "wins", "members"];

function rowClass(active: boolean) {
  return [
    "flex items-center gap-3 rounded-lg px-3 py-2 transition-colors active:scale-[0.99]",
    active
      ? "bg-primary/10 font-medium text-primary"
      : "text-on-surface-variant hover:bg-on-surface/[0.04] hover:text-on-surface",
  ].join(" ");
}

export function AppSidebar({
  spaces,
  fullName,
  email,
}: {
  spaces: Space[];
  fullName: string;
  email: string;
}) {
  const pathname = usePathname();
  const seg = pathname.split("/").filter(Boolean); // ["hub", slug, ...]
  const activeTrack =
    seg[0] === "hub" && seg[1] && !SECTION_SLUGS.includes(seg[1]) ? seg[1] : null;

  const isActive = (href: string, exact?: boolean) =>
    exact ? pathname === href : pathname === href || pathname.startsWith(`${href}/`);

  return (
    <div className="flex h-full w-64 flex-none flex-col border-r border-outline-variant/10 bg-surface-container-low">
      {/* Brand */}
      <div className="flex-none px-5 py-5">
        <Link href="/hub" className="inline-flex flex-col">
          <Wordmark className="text-[19px] font-medium" />
          <span className="mt-1 font-sans text-[12px] text-on-surface-variant opacity-70">
            {BRAND.tagline}
          </span>
        </Link>
      </div>

      {/* Nav */}
      <div className="custom-scrollbar flex-1 overflow-y-auto px-3 pb-3">
        <nav className="space-y-0.5">
          {NAV.map((n) => (
            <Link key={n.href} href={n.href} className={rowClass(isActive(n.href, n.exact))}>
              <Icon name={n.icon} fill={isActive(n.href, n.exact)} className="flex-none text-[20px]" />
              <span className="font-sans text-sm">{n.label}</span>
            </Link>
          ))}
        </nav>

        <p className="px-3 pb-1 pt-5 text-[11px] font-bold uppercase tracking-widest text-outline">
          Your tracks
        </p>
        <nav className="space-y-0.5">
          {spaces.map((s) => (
            <Link
              key={s.id}
              href={`/hub/${s.slug}/lessons`}
              className={rowClass(activeTrack === s.slug)}
            >
              <span className="w-5 flex-none text-center text-lg">{s.icon}</span>
              <span className="truncate font-sans text-sm">{s.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      <UserPanel fullName={fullName} email={email} />
    </div>
  );
}
