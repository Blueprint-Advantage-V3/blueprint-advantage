"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserPanel } from "./UserPanel";
import { Icon } from "@/components/ui/Icon";
import { channelIcon, spaceIcon } from "@/lib/icons";
import { BRAND } from "@/lib/constants";
import type { Channel, ChannelType, Space } from "@/lib/types";

const TYPE_ORDER: { type: ChannelType; heading: string }[] = [
  { type: "lessons", heading: "Lessons" },
  { type: "text", heading: "Text Channels" },
  { type: "voice", heading: "Voice Channels" },
  { type: "video", heading: "Video Channels" },
];

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
    <div className="flex h-full w-60 flex-none flex-col border-r border-outline-variant/10 bg-surface-container-low">
      {/* Header */}
      <div className="flex-none px-6 py-6">
        {activeSpace ? (
          <>
            <h1 className="flex items-center gap-2 font-headline-md text-headline-md font-bold text-primary">
              {activeSpace.icon ? (
                <span className="text-xl">{activeSpace.icon}</span>
              ) : (
                <Icon name={spaceIcon(activeSpace.slug)} fill className="text-[22px]" />
              )}
              <span className="truncate">{activeSpace.name}</span>
            </h1>
            <p className="font-label-md text-label-md text-on-surface-variant opacity-70">
              {BRAND.name}
            </p>
          </>
        ) : (
          <>
            <h1 className="truncate font-headline-md text-headline-md font-bold text-primary">
              {BRAND.name}
            </h1>
            <p className="font-label-md text-label-md text-on-surface-variant opacity-70">
              Elite Membership
            </p>
          </>
        )}
      </div>

      {/* Body */}
      <div className="custom-scrollbar flex-1 overflow-y-auto px-3 pb-3">
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

const NAV_INACTIVE =
  "flex items-center gap-stack_sm rounded-r-lg px-4 py-2 text-on-surface-variant transition-colors duration-200 hover:bg-white/5 hover:text-on-surface active:scale-95";
const NAV_ACTIVE =
  "flex items-center gap-stack_sm rounded-r-lg border-l-4 border-primary bg-primary/10 px-4 py-2 font-bold text-primary sidebar-indicator active:scale-95";

function HomePanel({ spaces }: { spaces: Space[] }) {
  const pathname = usePathname();
  const onHome = pathname === "/hub";
  return (
    <div className="space-y-1">
      <Link href="/hub" className={onHome ? NAV_ACTIVE : NAV_INACTIVE}>
        <Icon name="home" fill={onHome} className="text-[20px]" />
        <span className="font-label-md text-label-md">Home</span>
      </Link>

      <p className="px-4 pb-1 pt-4 text-[11px] font-bold uppercase tracking-widest text-outline">
        Your spaces
      </p>
      {spaces.map((s) => (
        <Link key={s.id} href={`/hub/${s.slug}`} className={NAV_INACTIVE}>
          {s.icon ? (
            <span className="w-5 text-center text-lg">{s.icon}</span>
          ) : (
            <Icon name={spaceIcon(s.slug)} className="text-[20px]" />
          )}
          <span className="truncate font-label-md text-label-md">{s.name}</span>
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
    <div className="space-y-stack_md">
      {TYPE_ORDER.map(({ type, heading }) => {
        const group = channels
          .filter((c) => c.type === type)
          .sort((a, b) => a.position - b.position);
        if (group.length === 0) return null;
        return (
          <div key={type}>
            <p className="px-4 pb-1 text-[11px] font-bold uppercase tracking-widest text-outline">
              {heading}
            </p>
            <div className="space-y-0.5">
              {group.map((c) => {
                const active = c.slug === activeChannelSlug;
                return (
                  <Link
                    key={c.id}
                    href={`/hub/${space.slug}/${c.slug}`}
                    className={active ? NAV_ACTIVE : NAV_INACTIVE}
                  >
                    <Icon
                      name={channelIcon(c.type)}
                      fill={active}
                      className="flex-none text-[20px]"
                    />
                    <span className="truncate font-label-md text-label-md">
                      {c.name}
                    </span>
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
