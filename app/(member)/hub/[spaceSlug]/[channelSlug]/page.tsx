import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getMemberContext } from "@/lib/subscription";
import { ChannelHeader } from "@/components/hub/ChannelHeader";
import { ChatChannel } from "@/components/hub/ChatChannel";
import { VoiceRoom } from "@/components/hub/VoiceRoom";
import { VideoRoom } from "@/components/hub/VideoRoom";
import {
  IS_DEMO,
  demoChannel,
  demoSpaceBySlug,
  demoLessonsForSpace,
  demoMessagesForChannel,
} from "@/lib/demo";
import type { Channel, ChannelMessage, Lesson, Space } from "@/lib/types";

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

  if (IS_DEMO) {
    const s = demoSpaceBySlug(params.spaceSlug);
    const c = demoChannel(params.spaceSlug, params.channelSlug);
    if (!s || !c) notFound();
    space = s;
    channel = c;
    if (c.type === "lessons") lessons = demoLessonsForSpace(s.id);
    if (c.type === "text") messages = demoMessagesForChannel(c.id);
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
    <div className="mx-auto h-full max-w-4xl overflow-y-auto px-8 py-8">
      <h1 className="text-2xl font-semibold tracking-tight">Lessons</h1>
      <p className="mt-1 text-muted">
        Prerecorded lessons from your professors. Work top to bottom.
      </p>

      <div className="mt-6 space-y-2">
        {lessons.length === 0 && (
          <p className="rounded-xl border border-border bg-surface px-5 py-8 text-center text-sm text-zinc-500">
            No lessons in this space yet.
          </p>
        )}
        {lessons.map((lesson, i) => (
          <Link
            key={lesson.id}
            href={`/hub/${space.slug}/${channelSlug}/${lesson.slug}`}
            className="flex items-center gap-4 rounded-xl border border-border bg-surface px-5 py-4 transition hover:border-zinc-700 hover:bg-surface-2"
          >
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand-soft text-sm font-semibold text-brand">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="truncate font-medium text-zinc-100">{lesson.title}</p>
              <p className="text-xs text-zinc-500">
                {lesson.instructor ? `${lesson.instructor} · ` : ""}
                {lesson.video_url ? "Video + notes" : "Notes"}
              </p>
            </div>
            <span className="ml-auto text-zinc-600">▶</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
