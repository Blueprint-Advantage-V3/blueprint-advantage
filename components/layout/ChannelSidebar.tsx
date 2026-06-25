"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserPanel } from "./UserPanel";
import { Icon } from "@/components/ui/Icon";
import { Wordmark } from "@/components/brand/Logo";
import { channelIcon, spaceIcon } from "@/lib/icons";
import { useProgress, rankProgress, TOTAL_RANKS } from "@/lib/progress";
import type { Channel, ChannelType, Space } from "@/lib/types";

const TYPE_ORDER: { type: ChannelType; heading: string }[] = [
  { type: "lessons", heading: "Lessons" },
  { type: "schedule", heading: "Schedule" },
  { type: "voice", heading: "Voice" },
  { type: "video", heading: "Video" },
  { type: "text", heading: "Chat" },
];

const NAV_INACTIVE =
  "flex items-center gap-2.5 rounded-lg px-3 py-2 text-on-surface-variant transition-colors hover:bg-on-surface/[0.05] hover:text-on-surface";
const NAV_ACTIVE =
  "flex items-center gap-2.5 rounded-lg bg-primary/12 px-3 py-2 font-medium text-primary";
const SECTION = "px-3 pb-1 pt-4 text-[11px] font-semibold uppercase tracking-widest text-outline";

/**
 * Middle column: brand/space header, then either a home panel or the active
 * space's progress + channels. Modern filled-pill nav, no heavy borders.
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
  const segments = pathname.split("/").filter(Boolean);
  const activeSpaceSlug = segments[1];
  const activeChannelSlug = segments[2];
  const activeSpace = spaces.find((s) => s.slug === activeSpaceSlug) ?? null;

  return (
    <div className="flex h-full w-60 flex-none flex-col border-r border-outline-variant/10 bg-surface-container-low">
      {/* Header */}
      <div className="flex-none px-5 py-5">
        {activeSpace ? (
          <div className="flex items-center gap-2.5">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-xl bg-surface-container-high text-lg">
              {activeSpace.icon ?? <Icon name={spaceIcon(activeSpace.slug)} fill className="text-[20px] text-primary" />}
            </span>
            <div className="min-w-0">
              <h1 className="truncate font-display text-[15px] font-semibold text-on-surface">{activeSpace.name}</h1>
              <Link href="/hub" className="font-sans text-[11px] text-on-surface-variant transition-colors hover:text-on-surface">
                ← All of Blueprint
              </Link>
            </div>
          </div>
        ) : (
          <>
            <Wordmark className="text-[19px] font-medium" />
            <p className="mt-1 font-sans text-[12px] text-on-surface-variant">Your hub</p>
          </>
        )}
      </div>

      {/* Body */}
      <div className="custom-scrollbar flex-1 overflow-y-auto px-2.5 pb-3">
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
  const { campusRank } = useProgress();
  const onHome = pathname === "/hub";
  const onMembers = pathname.startsWith("/hub/members");
  const onSettings = pathname.startsWith("/settings");

  return (
    <div className="space-y-0.5">
      <Link href="/hub" className={onHome ? NAV_ACTIVE : NAV_INACTIVE}>
        <Icon name="home" fill={onHome} className="text-[20px]" />
        <span className="font-sans text-sm">Home</span>
      </Link>
      <Link href="/hub/members" className={onMembers ? NAV_ACTIVE : NAV_INACTIVE}>
        <Icon name="group" fill={onMembers} className="text-[20px]" />
        <span className="font-sans text-sm">Members</span>
      </Link>
      <Link href="/settings" className={onSettings ? NAV_ACTIVE : NAV_INACTIVE}>
        <Icon name="settings" fill={onSettings} className="text-[20px]" />
        <span className="font-sans text-sm">Settings</span>
      </Link>

      <p className={SECTION}>Your tracks</p>
      {spaces.map((s) => (
        <Link key={s.id} href={`/hub/${s.slug}`} className={NAV_INACTIVE}>
          <span className="w-6 flex-none text-center text-lg">{s.icon ?? "📘"}</span>
          <span className="min-w-0 flex-1 truncate font-sans text-sm">{s.name}</span>
          <span className="ml-auto flex-none rounded-md bg-earned/12 px-1.5 py-0.5 font-sans text-[10px] font-medium text-earned">
            L{campusRank(s.slug)}
          </span>
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
  const { campusRank, campusXp } = useProgress();

  return (
    <div className="space-y-3">
      <RankLadder currentRank={campusRank(space.slug)} xp={campusXp(space.slug)} />
      {TYPE_ORDER.map(({ type, heading }) => {
        const group = channels
          .filter((c) => c.type === type)
          .sort((a, b) => a.position - b.position);
        if (group.length === 0) return null;
        return (
          <div key={type}>
            <p className={SECTION}>{heading}</p>
            <div className="space-y-0.5">
              {group.map((c) => {
                const active = c.slug === activeChannelSlug;
                return (
                  <Link
                    key={c.id}
                    href={`/hub/${space.slug}/${c.slug}`}
                    className={active ? NAV_ACTIVE : NAV_INACTIVE}
                  >
                    <Icon name={channelIcon(c.type)} fill={active} className="flex-none text-[19px]" />
                    <span className="truncate font-sans text-sm">{c.name}</span>
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

/** Level 1–5 ladder + live XP bar, shown at the top of every track. */
function RankLadder({ currentRank, xp }: { currentRank: number; xp: number }) {
  const p = rankProgress(xp);
  return (
    <div className="rounded-xl border border-outline-variant/10 bg-surface p-2.5">
      <div className="mb-2 flex items-center justify-between px-1">
        <span className="font-sans text-[11px] font-semibold uppercase tracking-widest text-outline">Level {currentRank}</span>
        <span className="font-sans text-[10px] text-on-surface-variant">{xp} XP</span>
      </div>
      <div className="flex items-center gap-1">
        {Array.from({ length: TOTAL_RANKS }, (_, i) => i + 1).map((r) => {
          const done = r < currentRank;
          const current = r === currentRank;
          return (
            <span
              key={r}
              className={[
                "h-1.5 flex-1 rounded-full",
                done ? "bg-earned" : current ? "bg-primary" : "bg-surface-container-highest",
              ].join(" ")}
            />
          );
        })}
      </div>
      <p className="mt-2 px-1 font-sans text-[10px] text-on-surface-variant">
        {p.atMax ? "Max level reached" : `${p.into}/${p.need} XP to Level ${p.rank + 1}`}
      </p>
    </div>
  );
}
