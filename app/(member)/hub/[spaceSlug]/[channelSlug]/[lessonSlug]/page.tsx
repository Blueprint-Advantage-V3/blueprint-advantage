import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { VideoEmbed } from "@/components/hub/VideoEmbed";
import { LessonNotes } from "@/components/hub/LessonNotes";
import { LessonComplete } from "@/components/progress/LessonComplete";
import { Icon } from "@/components/ui/Icon";
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
    <div className="h-full overflow-y-auto px-margin_mobile py-10 md:px-stack_lg">
      <div className="mx-auto max-w-[1200px]">
        {/* Breadcrumb */}
        <nav className="mb-stack_md flex items-center gap-2 font-label-md text-label-md text-on-surface-variant opacity-70">
          <Link
            href={channelBase}
            className="flex items-center gap-2 transition-colors hover:text-primary"
          >
            <Icon name="school" className="text-[16px]" />
            <span>{s.name}</span>
          </Link>
          <Icon name="chevron_right" className="text-[14px]" />
          <span className="text-primary">{l.title}</span>
        </nav>

        {/* Video Player Area */}
        {l.video_url && (
          <VideoEmbed url={l.video_url} title={l.title} />
        )}

        {/* Lesson Detail Layout */}
        <div className="mt-stack_lg grid grid-cols-1 gap-stack_lg lg:grid-cols-12">
          {/* Reading Column */}
          <div className="lg:col-span-8">
            <div className="max-w-content_max_width">
              <div className="mb-4 flex items-start justify-between gap-4">
                <h1 className="font-headline-lg text-headline-lg tracking-tight text-on-surface">
                  {l.title}
                </h1>
              </div>

              {l.instructor && (
                <p className="mb-6 flex items-center gap-2 font-body-md text-body-md text-on-surface-variant">
                  <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary-container text-xs font-bold text-on-primary-container">
                    {l.instructor.charAt(0).toUpperCase()}
                  </span>
                  {l.instructor}
                </p>
              )}

              {l.content && <LessonNotes content={l.content} />}

              {/* Lesson actions */}
              <div className="mt-12 flex flex-wrap items-center gap-4 border-t border-outline-variant/10 py-8">
                <LessonComplete campus={params.spaceSlug} lessonId={l.id} />
                <button
                  type="button"
                  className="rounded-xl border border-outline-variant/30 px-6 py-4 font-label-md text-label-md text-on-surface-variant transition-all hover:bg-on-surface/[0.04]"
                >
                  Take Notes
                </button>
              </div>

              {/* ── Phase 2 drop-in: lesson discussion thread goes here ──
                  <LessonComments lessonId={l.id} />
              */}
            </div>
          </div>

          {/* Sticky Aside */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 space-y-stack_lg">
              {/* Up Next (presentational chrome) */}
              <div className="glass-card rounded-2xl p-6">
                <p className="mb-2 font-label-md text-label-md uppercase tracking-widest text-outline">
                  Up Next
                </p>
                <h4 className="mb-3 font-headline-md text-headline-md text-on-surface">
                  Continue the curriculum
                </h4>
                <Link
                  href={channelBase}
                  className="group flex items-center justify-between rounded-lg p-3 transition-all hover:bg-on-surface/[0.04]"
                >
                  <span className="flex items-center gap-3 font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface">
                    <Icon name="play_arrow" className="text-primary" />
                    Back to {s.name}
                  </span>
                  <Icon
                    name="arrow_forward"
                    className="text-sm opacity-40 transition-transform group-hover:translate-x-1"
                  />
                </Link>
              </div>

              {/* Resources (presentational chrome) */}
              <div className="glass-panel rounded-2xl p-6">
                <h4 className="mb-4 font-headline-md text-headline-md text-on-surface">
                  Resources
                </h4>
                <ul className="space-y-3">
                  <li className="group flex cursor-pointer items-center justify-between rounded-lg p-3 transition-all hover:bg-on-surface/[0.04]">
                    <div className="flex items-center gap-3">
                      <Icon name="description" className="text-secondary" />
                      <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface">
                        Lesson Worksheet.pdf
                      </span>
                    </div>
                    <Icon name="download" className="text-sm opacity-40" />
                  </li>
                  <li className="group flex cursor-pointer items-center justify-between rounded-lg p-3 transition-all hover:bg-on-surface/[0.04]">
                    <div className="flex items-center gap-3">
                      <Icon name="link" className="text-secondary" />
                      <span className="font-label-md text-label-md text-on-surface-variant group-hover:text-on-surface">
                        Supplementary Reading
                      </span>
                    </div>
                    <Icon name="open_in_new" className="text-sm opacity-40" />
                  </li>
                </ul>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
