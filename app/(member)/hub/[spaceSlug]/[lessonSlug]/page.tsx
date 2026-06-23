import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { VideoEmbed } from "@/components/hub/VideoEmbed";
import { LessonNotes } from "@/components/hub/LessonNotes";
import { IS_DEMO, demoSpaceBySlug, demoLesson } from "@/lib/demo";
import type { Lesson, Space } from "@/lib/types";

/**
 * Lesson view — video embed + written notes, in the main content area.
 *
 * Phase 2 hook: a comments/discussion thread would mount below the notes
 * (lesson_comments table already stubbed). Marked with a placeholder
 * region so it's an obvious, isolated drop-in later.
 */
export default async function LessonPage({
  params,
}: {
  params: { spaceSlug: string; lessonSlug: string };
}) {
  let s: Pick<Space, "id" | "slug" | "name" | "icon">;
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
    s = space as Pick<Space, "id" | "slug" | "name" | "icon">;

    const { data: lesson } = await supabase
      .from("lessons")
      .select("*")
      .eq("space_id", s.id)
      .eq("slug", params.lessonSlug)
      .maybeSingle();

    if (!lesson) notFound();
    l = lesson as Lesson;
  }

  return (
    <div className="mx-auto max-w-3xl px-8 py-10">
      <nav className="mb-6 flex items-center gap-1.5 text-sm text-zinc-500">
        <Link href={`/hub/${s.slug}`} className="transition hover:text-zinc-300">
          {s.icon} {s.name}
        </Link>
        <span>/</span>
        <span className="text-zinc-400">{l.title}</span>
      </nav>

      <h1 className="text-3xl font-semibold tracking-tight">{l.title}</h1>

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
