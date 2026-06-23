import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { VideoEmbed } from "@/components/hub/VideoEmbed";
import { LessonNotes } from "@/components/hub/LessonNotes";
import { IS_DEMO, demoSpaceBySlug, demoLesson } from "@/lib/demo";
import type { Lesson, Space } from "@/lib/types";

/**
 * Lesson view — a professor's prerecorded video + written notes, opened from
 * a Lessons channel.
 *
 * Phase 2 hook: a comments/discussion thread mounts below the notes
 * (lesson_comments table already stubbed) — marked region below.
 */
export default async function LessonPage({
  params,
}: {
  params: { spaceSlug: string; channelSlug: string; lessonSlug: string };
}) {
  let s: Pick<Space, "slug" | "name" | "icon">;
  let l: Lesson;

  if (IS_DEMO) {
    const demoSpace = demoSpaceBySlug(params.spaceSlug);
    const demoL = demoLesson(params.spaceSlug, params.lessonSlug);
    if (!demoSpace || !demoL) notFound();
    s = demoSpace;
    l = demoL;
  } else {
    const supabase = createClient();
    const { data: space } = await supabase
      .from("spaces")
      .select("id, slug, name, icon")
      .eq("slug", params.spaceSlug)
      .maybeSingle();
    if (!space) notFound();
    s = space as Space;

    const { data: lesson } = await supabase
      .from("lessons")
      .select("*")
      .eq("space_id", (space as Space).id)
      .eq("slug", params.lessonSlug)
      .maybeSingle();
    if (!lesson) notFound();
    l = lesson as Lesson;
  }

  const channelBase = `/hub/${params.spaceSlug}/${params.channelSlug}`;

  return (
    <div className="mx-auto h-full max-w-3xl overflow-y-auto px-8 py-10">
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500">
        <Link href={channelBase} className="transition hover:text-zinc-300">
          🎓 Lessons
        </Link>
        <span>/</span>
        <span className="text-zinc-400">{l.title}</span>
      </nav>

      <h1 className="text-3xl font-semibold tracking-tight">{l.title}</h1>
      {l.instructor && (
        <p className="mt-2 flex items-center gap-2 text-sm text-muted">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-xs font-semibold text-white">
            {l.instructor.charAt(0).toUpperCase()}
          </span>
          {l.instructor}
        </p>
      )}

      {l.video_url && (
        <div className="mt-6">
          <VideoEmbed url={l.video_url} title={l.title} />
        </div>
      )}

      {l.content && (
        <div className="mt-8">
          <LessonNotes content={l.content} />
        </div>
      )}

      {/* ── Phase 2 drop-in: lesson discussion thread goes here ──
          <LessonComments lessonId={l.id} />
      */}
    </div>
  );
}
