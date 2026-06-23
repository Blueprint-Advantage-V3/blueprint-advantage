import { Icon } from "@/components/ui/Icon";
import { channelIcon } from "@/lib/icons";
import type { ChannelType } from "@/lib/types";

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
    <div className="sticky top-0 z-40 flex h-16 flex-none items-center gap-2 border-b border-outline-variant/10 bg-surface/70 px-gutter backdrop-blur-xl">
      <Icon name={channelIcon(type)} className="text-on-surface-variant" />
      <span className="font-headline-md font-bold text-on-surface">{name}</span>
      {topic && (
        <>
          <span className="mx-2 h-4 w-px bg-outline-variant/30" />
          <span className="truncate font-body-md text-sm text-on-surface-variant">
            {topic}
          </span>
        </>
      )}
    </div>
  );
}
