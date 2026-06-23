"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserPanel } from "./UserPanel";
import type { Channel, ChannelType, Space } from "@/lib/types";

const TYPE_ORDER: { type: ChannelType; heading: string }[] = [
  { type: "lessons", heading: "Lessons" },
  { type: "text", heading: "Text Channels" },
  { type: "voice", heading: "Voice Channels" },
  { type: "video", heading: "Video Channels" },
];

const TYPE_ICON: Record<ChannelType, string> = {
  lessons: "🎓",
  text: "#",
  voice: "🔊",
  video: "📹",
};

/**
 * The middle column — Discord's channel list. Shows the active space's
 * channels grouped by type, or a Home panel when on the platform landing.
 * The active space is derived from the URL.
 */
export function ChannelSidebar({
  spaces,
  channels,
  fullName,
  email,
}: {
  spaces: Space[];
  channels: Channel[];
  fullName: string;
  email: string;
}) {
  const pathname = usePathname();
  const segments = pathname.split("/").filter(Boolean); // ["hub", spaceSlug, channelSlug]
  const activeSpaceSlug = segments[1];
  const activeChannelSlug = segments[2];
  const activeSpace = spaces.find((s) => s.slug === activeSpaceSlug) ?? null;

  return (
    <div className="flex h-full w-60 flex-none flex-col border-r border-border bg-surface">
      {/* Header */}
      <div className="flex h-12 flex-none items-center border-b border-border px-4 shadow-sm">
        <span className="truncate text-sm font-semibold tracking-tight">
          {activeSpace ? (
            <>
              {activeSpace.icon} {activeSpace.name}
            </>
          ) : (
            "Blueprint Advantage"
          )}
        </span>
      </div>

      {/* Body */}
      <div className="flex-1 overflow-y-auto px-2 py-3">
        {!activeSpace ? (
          <HomePanel spaces={spaces} />
        ) : (
          <SpaceChannels
            space={activeSpace}
            channels={channels.filter((c) => c.space_id === activeSpace.id)}
            activeChannelSlug={activeChannelSlug}
          />
        )}
      </div>

      <UserPanel fullName={fullName} email={email} />
    </div>
  );
}

function HomePanel({ spaces }: { spaces: Space[] }) {
  const pathname = usePathname();
  return (
    <div>
      <Link
        href="/hub"
        className={[
          "mb-3 flex items-center gap-2 rounded-lg px-2.5 py-2 text-sm transition",
          pathname === "/hub"
            ? "bg-brand-soft text-white"
            : "text-zinc-300 hover:bg-surface-2",
        ].join(" ")}
      >
        <span>🏠</span> Home
      </Link>
      <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
        Your spaces
      </p>
      {spaces.map((s) => (
        <Link
          key={s.id}
          href={`/hub/${s.slug}`}
          className="flex items-center gap-2.5 rounded-lg px-2.5 py-2 text-sm text-zinc-400 transition hover:bg-surface-2 hover:text-zinc-100"
        >
          <span className="w-5 text-center">{s.icon}</span>
          <span className="truncate">{s.name}</span>
        </Link>
      ))}
    </div>
  );
}

function SpaceChannels({
  space,
  channels,
  activeChannelSlug,
}: {
  space: Space;
  channels: Channel[];
  activeChannelSlug?: string;
}) {
  return (
    <div className="space-y-4">
      {TYPE_ORDER.map(({ type, heading }) => {
        const group = channels
          .filter((c) => c.type === type)
          .sort((a, b) => a.position - b.position);
        if (group.length === 0) return null;
        return (
          <div key={type}>
            <p className="px-2 pb-1 text-xs font-semibold uppercase tracking-wider text-zinc-500">
              {heading}
            </p>
            <div className="space-y-0.5">
              {group.map((c) => {
                const active = c.slug === activeChannelSlug;
                return (
                  <Link
                    key={c.id}
                    href={`/hub/${space.slug}/${c.slug}`}
                    className={[
                      "flex items-center gap-2 rounded-md px-2.5 py-1.5 text-sm transition",
                      active
                        ? "bg-brand-soft text-white"
                        : "text-zinc-400 hover:bg-surface-2 hover:text-zinc-100",
                    ].join(" ")}
                  >
                    <span className="w-4 flex-none text-center text-zinc-500">
                      {TYPE_ICON[c.type]}
                    </span>
                    <span className="truncate">{c.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
