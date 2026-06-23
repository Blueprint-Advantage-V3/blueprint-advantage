import type { ChannelType } from "@/lib/types";

/**
 * Maps known space slugs to Material Symbols icon names (matching the
 * Apex Academy / Ascendant Core design). Falls back to a generic icon.
 */
const SPACE_ICONS: Record<string, string> = {
  "start-here": "campaign",
  sat: "school",
  finance: "payments",
  law: "gavel",
  ai: "psychology",
};

export function spaceIcon(slug: string): string {
  return SPACE_ICONS[slug] ?? "workspaces";
}

/** Material Symbols icon for each Discord-style channel type. */
const CHANNEL_ICONS: Record<ChannelType, string> = {
  lessons: "play_lesson",
  text: "tag",
  voice: "graphic_eq",
  video: "videocam",
};

export function channelIcon(type: ChannelType): string {
  return CHANNEL_ICONS[type] ?? "tag";
}
