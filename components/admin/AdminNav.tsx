"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Icon } from "@/components/ui/Icon";

const ITEMS = [
  { href: "/admin", icon: "dashboard", label: "Dashboard", exact: true },
  { href: "/admin/spaces", icon: "grid_view", label: "Manage Spaces", exact: false },
];

/**
 * Admin sidebar nav links with the violet active-item indicator.
 * Client-only so it can derive the active route from the URL; the
 * surrounding shell (auth/role gating) stays a server component.
 */
export function AdminNav() {
  const pathname = usePathname();

  return (
    <>
      {ITEMS.map((item) => {
        const active = item.exact
          ? pathname === item.href
          : pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <Link
            key={item.href}
            href={item.href}
            className={
              active
                ? "sidebar-indicator flex items-center gap-stack_sm rounded-r-lg border-l-4 border-primary bg-primary/10 px-4 py-2 font-bold text-primary transition-colors"
                : "flex items-center gap-stack_sm rounded-r-lg px-4 py-2 text-on-surface-variant transition-colors hover:bg-white/5 hover:text-on-surface"
            }
          >
            <Icon name={item.icon} />
            <span className="font-label-md text-label-md">{item.label}</span>
          </Link>
        );
      })}
    </>
  );
}
