import type { ChannelType } from "@/lib/types";

const ICON: Record<ChannelType, string> = {
  lessons: "🎓",
  text: "#",
  voice: "🔊",
  video: "📹",
};

/** Discord-style channel header bar at the top of the main content area. */
export function ChannelHeader({
  type,
  name,
  topic,
}: {
  type: ChannelType;
  name: string;
  topic?: string;
}) {
  return (
    <div className="flex h-12 flex-none items-center gap-2 border-b border-border px-5">
      <span className="text-zinc-500">{ICON[type]}</span>
      <span className="font-semibold">{name}</span>
      {topic && (
        <>
          <span className="mx-1 h-4 w-px bg-border" />
          <span className="truncate text-sm text-zinc-500">{topic}</span>
        </>
      )}
    </div>
  );
}
