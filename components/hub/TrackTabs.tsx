"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

/**
 * Per-track sub-navigation. Gives every track real depth (Lessons, Live,
 * Discussion) without a Discord channel list. Tabs map onto the existing
 * channel routes.
 */
const TABS = [
  { label: "Lessons", slug: "lessons", match: ["lessons"] },
  { label: "Live", slug: "schedule", match: ["schedule", "live-class", "office-hours", "study-hall"] },
  { label: "Discussion", slug: "general", match: ["general", "questions"] },
];

export function TrackTabs({ slug }: { slug: string }) {
  const pathname = usePathname();
  const seg = pathname.split("/").filter(Boolean); // ["hub", slug, channel, ...]
  const channel = seg[2] ?? "lessons";

  return (
    <nav className="-mb-px mt-4 flex gap-1">
      {TABS.map((t) => {
        const active = t.match.includes(channel);
        return (
          <Link
            key={t.slug}
            href={`/hub/${slug}/${t.slug}`}
            className={[
              "border-b-2 px-3 py-2.5 font-sans text-sm transition-colors",
              active
                ? "border-primary font-medium text-primary"
                : "border-transparent text-on-surface-variant hover:text-on-surface",
            ].join(" ")}
          >
            {t.label}
          </Link>
        );
      })}
    </nav>
  );
}
