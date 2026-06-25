import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getMemberContext } from "@/lib/subscription";
import { Icon } from "@/components/ui/Icon";
import { ChannelHeader } from "@/components/hub/ChannelHeader";
import { ChatChannel } from "@/components/hub/ChatChannel";
import { VoiceRoom } from "@/components/hub/VoiceRoom";
import { VideoRoom } from "@/components/hub/VideoRoom";
import { ScheduleView } from "@/components/hub/ScheduleView";
import { MemberList } from "@/components/community/MemberList";
import { LessonStatus } from "@/components/progress/LessonStatus";
import { TrackCertificate } from "@/components/progress/TrackCertificate";
import {
  IS_DEMO,
  demoChannel,
  demoSpaceBySlug,
  demoLessonsForSpace,
  demoMessagesForChannel,
  scheduleForSpaceSlug,
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

  // Schedule is served from a constant (works in both demo and real mode).
  if (channel.type === "schedule") {
    schedule = scheduleForSpaceSlug(params.spaceSlug);
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
          <LessonLibrary space={space} channelSlug={channel.slug} lessons={lessons} userName={currentUser} />
        )}
        {channel.type === "schedule" && (
          <ScheduleView sessions={schedule} spaceName={space.name} />
        )}
        {channel.type === "text" && (
          <div className="flex h-full">
            <div className="min-w-0 flex-1">
              <ChatChannel
                channelName={channel.name}
                initialMessages={messages}
                currentUser={currentUser}
                storageKey={`${space.slug}/${channel.slug}`}
              />
            </div>
            <MemberList currentUser={currentUser} />
          </div>
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
  userName,
}: {
  space: Space;
  channelSlug: string;
  lessons: Lesson[];
  userName: string;
}) {
  return (
    <div className="mx-auto h-full max-w-content_max_width overflow-y-auto px-gutter py-stack_lg">
      <TrackCertificate trackName={space.name} lessonIds={lessons.map((l) => l.id)} userName={userName} />
      <div className="flex items-center gap-3">
        <span className="grid h-12 w-12 flex-none place-items-center rounded-xl bg-primary/10 text-2xl">
          {space.icon ?? <Icon name="menu_book" className="text-primary" />}
        </span>
        <div className="min-w-0">
          <h1 className="font-display text-[26px] font-semibold tracking-tight text-on-surface">
            {space.name}
          </h1>
          <p className="font-sans text-sm text-on-surface-variant">
            {lessons.length} {lessons.length === 1 ? "lesson" : "lessons"} · taught by your professors
          </p>
        </div>
      </div>

      <div className="mt-7 space-y-2.5">
        {lessons.length === 0 && (
          <p className="rounded-2xl border border-outline-variant/12 bg-surface px-5 py-10 text-center font-sans text-sm text-on-surface-variant">
            No lessons in this track yet.
          </p>
        )}
        {lessons.map((lesson, i) => (
          <Link
            key={lesson.id}
            href={`/hub/${space.slug}/${channelSlug}/${lesson.slug}`}
            className="group flex items-center gap-4 rounded-2xl border border-outline-variant/12 bg-surface px-5 py-4 transition hover:border-outline-variant/30 hover:shadow-card"
          >
            <span className="grid h-7 w-7 flex-none place-items-center rounded-full bg-surface-container font-sans text-[12px] font-semibold text-on-surface-variant">
              {i + 1}
            </span>
            <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-primary/10 text-primary">
              <Icon name="smart_display" fill className="text-[20px]" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-display text-[15px] font-semibold text-on-surface transition-colors group-hover:text-primary">
                {lesson.title}
              </p>
              <p className="truncate font-sans text-[12px] text-on-surface-variant">
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
