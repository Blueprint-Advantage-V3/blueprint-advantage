import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getMemberContext } from "@/lib/subscription";
import { Icon } from "@/components/ui/Icon";
import { channelIcon } from "@/lib/icons";
import { ChannelHeader } from "@/components/hub/ChannelHeader";
import { ChatChannel } from "@/components/hub/ChatChannel";
import { VoiceRoom } from "@/components/hub/VoiceRoom";
import { VideoRoom } from "@/components/hub/VideoRoom";
import { ScheduleView } from "@/components/hub/ScheduleView";
import { LessonStatus } from "@/components/progress/LessonStatus";
import {
  IS_DEMO,
  demoChannel,
  demoSpaceBySlug,
  demoLessonsForSpace,
  demoMessagesForChannel,
  demoScheduleForSpace,
} from "@/lib/demo";
import type {
  Channel,
  ChannelMessage,
  Lesson,
  ScheduleSession,
  Space,
} from "@/lib/types";

/**
 * Channel view. Resolves the channel by space + slug, then renders the right
 * surface for its type: a lesson library, a text chat, or a voice/video room.
 */
export default async function ChannelPage({
  params,
}: {
  params: { spaceSlug: string; channelSlug: string };
}) {
  const { profile, user } = await getMemberContext();
  const currentUser = profile?.full_name ?? user?.email ?? "You";

  let space: Space;
  let channel: Channel;
  let lessons: Lesson[] = [];
  let messages: ChannelMessage[] = [];
  let schedule: ScheduleSession[] = [];

  if (IS_DEMO) {
    const s = demoSpaceBySlug(params.spaceSlug);
    const c = demoChannel(params.spaceSlug, params.channelSlug);
    if (!s || !c) notFound();
    space = s;
    channel = c;
    if (c.type === "lessons") lessons = demoLessonsForSpace(s.id);
    if (c.type === "text") messages = demoMessagesForChannel(c.id);
    if (c.type === "schedule") schedule = demoScheduleForSpace(s.id);
  } else {
    const supabase = createClient();
    const { data: s } = await supabase
      .from("spaces")
      .select("*")
      .eq("slug", params.spaceSlug)
      .maybeSingle();
    if (!s) notFound();
    space = s as Space;

    const { data: c } = await supabase
      .from("channels")
      .select("*")
      .eq("space_id", space.id)
      .eq("slug", params.channelSlug)
      .maybeSingle();
    if (!c) notFound();
    channel = c as Channel;

    if (channel.type === "lessons") {
      const { data } = await supabase
        .from("lessons")
        .select("*")
        .eq("space_id", space.id)
        .order("position", { ascending: true });
      lessons = (data ?? []) as Lesson[];
    }
    // Text-channel history is Phase 2 (Supabase Realtime over `messages`).
  }

  return (
    <div className="flex h-full flex-col">
      <ChannelHeader
        type={channel.type}
        name={channel.name}
        topic={channel.type === "lessons" ? space.description ?? undefined : undefined}
      />
      <div className="min-h-0 flex-1">
        {channel.type === "lessons" && (
          <LessonLibrary space={space} channelSlug={channel.slug} lessons={lessons} />
        )}
        {channel.type === "schedule" && (
          <ScheduleView sessions={schedule} spaceName={space.name} />
        )}
        {channel.type === "text" && (
          <ChatChannel
            channelName={channel.name}
            initialMessages={messages}
            currentUser={currentUser}
          />
        )}
        {channel.type === "voice" && (
          <VoiceRoom channelName={channel.name} currentUser={currentUser} />
        )}
        {channel.type === "video" && (
          <VideoRoom channelName={channel.name} currentUser={currentUser} />
        )}
      </div>
    </div>
  );
}

function LessonLibrary({
  space,
  channelSlug,
  lessons,
}: {
  space: Space;
  channelSlug: string;
  lessons: Lesson[];
}) {
  return (
    <div className="mx-auto h-full max-w-content_max_width overflow-y-auto px-gutter py-stack_lg">
      <h1 className="font-display text-headline-lg tracking-tight">Lessons</h1>
      <p className="mt-1 font-body-md text-body-md text-on-surface-variant">
        Prerecorded lessons from your professors. Work top to bottom.
      </p>

      <div className="mt-6 space-y-2">
        {lessons.length === 0 && (
          <p className="glass-panel rounded-xl px-5 py-8 text-center text-sm text-outline">
            No lessons in this space yet.
          </p>
        )}
        {lessons.map((lesson, i) => (
          <Link
            key={lesson.id}
            href={`/hub/${space.slug}/${channelSlug}/${lesson.slug}`}
            className="glass-panel group flex items-center gap-4 rounded-xl px-5 py-4 transition-all duration-300 hover:border-primary/30"
          >
            <span className="flex h-10 w-10 flex-none items-center justify-center rounded-lg bg-primary/20 text-primary">
              <Icon name={channelIcon("lessons")} />
            </span>
            <div className="min-w-0">
              <p className="truncate font-label-md font-bold text-on-surface transition-colors group-hover:text-primary">
                {lesson.title}
              </p>
              <p className="font-body-md text-xs text-outline">
                {lesson.instructor ? `${lesson.instructor} · ` : ""}
                {lesson.video_url ? "Video + notes" : "Notes"}
              </p>
            </div>
            <LessonStatus lessonId={lesson.id} />
          </Link>
        ))}
      </div>
    </div>
  );
}
