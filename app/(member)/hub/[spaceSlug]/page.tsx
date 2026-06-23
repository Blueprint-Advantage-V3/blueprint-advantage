import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { IS_DEMO, demoSpaceBySlug, demoLessonsForSpace } from "@/lib/demo";
import type { Lesson, Space } from "@/lib/types";

/**
 * Space view = the list of lessons in the selected category, shown in the
 * main content area. Clicking a lesson opens it without reloading the shell.
 */
export default async function SpacePage({
  params,
}: {
  params: { spaceSlug: string };
}) {
  let s: Space;
  let list: Lesson[];

  if (IS_DEMO) {
    const demo = demoSpaceBySlug(params.spaceSlug);
    if (!demo) notFound();
    s = demo;
    list = demoLessonsForSpace(demo.id);
  } else {
    const supabase = createClient();
    const { data: space } = await supabase
      .from("spaces")
      .select("*")
      .eq("slug", params.spaceSlug)
      .maybeSingle();

    if (!space) notFound();
    s = space as Space;

    const { data: lessons } = await supabase
      .from("lessons")
      .select("*")
      .eq("space_id", s.id)
      .order("position", { ascending: true });

    list = (lessons ?? []) as Lesson[];
  }

  return (
    <div className="mx-auto max-w-4xl px-8 py-10">
      <div className="flex items-center gap-3">
        <span className="text-3xl">{s.icon ?? "#"}</span>
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">{s.name}</h1>
          {s.description && <p className="mt-0.5 text-muted">{s.description}</p>}
        </div>
      </div>

      <div className="mt-8 space-y-2">
        {list.length === 0 && (
          <p className="rounded-xl border border-border bg-surface px-5 py-8 text-center text-sm text-zinc-500">
            No lessons in this space yet.
          </p>
        )}
        {list.map((lesson, i) => (
          <Link
            key={lesson.id}
            href={`/hub/${s.slug}/${lesson.slug}`}
            className="flex items-center gap-4 rounded-xl border border-border bg-surface px-5 py-4 transition hover:border-zinc-700 hover:bg-surface-2"
          >
            <span className="flex h-9 w-9 flex-none items-center justify-center rounded-lg bg-brand-soft text-sm font-semibold text-brand">
              {i + 1}
            </span>
            <div className="min-w-0">
              <p className="truncate font-medium text-zinc-100">{lesson.title}</p>
              <p className="text-xs text-zinc-500">
                {lesson.video_url ? "Video + notes" : "Notes"}
                {!lesson.is_published && " · Draft"}
              </p>
            </div>
            <span className="ml-auto text-zinc-600">→</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
