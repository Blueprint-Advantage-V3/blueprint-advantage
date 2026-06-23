import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateSpace, deleteSpace, createLesson } from "../../actions";
import { TextField, TextArea, Toggle } from "@/components/admin/Field";
import { IS_DEMO, demoSpaceById, demoLessonsForSpace } from "@/lib/demo";
import type { Lesson, Space } from "@/lib/types";

export default async function EditSpacePage({
  params,
}: {
  params: { spaceId: string };
}) {
  let s: Space;
  let list: Lesson[];

  if (IS_DEMO) {
    const demo = demoSpaceById(params.spaceId);
    if (!demo) notFound();
    s = demo;
    list = demoLessonsForSpace(demo.id);
  } else {
    const supabase = createClient();
    const { data: space } = await supabase
      .from("spaces")
      .select("*")
      .eq("id", params.spaceId)
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
    <div className="space-y-10">
      <div>
        <Link href="/admin/spaces" className="text-sm text-muted hover:text-white">
          ← All spaces
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">
          {s.icon} {s.name}
        </h1>
      </div>

      {/* Edit space */}
      <section className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold">Space settings</h2>
        <form action={updateSpace} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <input type="hidden" name="id" value={s.id} />
          <TextField label="Name" name="name" defaultValue={s.name} required />
          <TextField label="Icon" name="icon" defaultValue={s.icon} />
          <TextField label="Slug" name="slug" defaultValue={s.slug} required />
          <TextField label="Position" name="position" type="number" defaultValue={s.position} />
          <div className="sm:col-span-2">
            <TextArea label="Description" name="description" rows={2} defaultValue={s.description} />
          </div>
          <Toggle label="Published" name="is_published" defaultChecked={s.is_published} />
          <div className="flex items-center gap-3 sm:col-span-2">
            <button className="rounded-xl bg-brand px-5 py-2.5 font-semibold text-white transition hover:bg-brand-hover">
              Save changes
            </button>
          </div>
        </form>
        <form action={deleteSpace} className="mt-4 border-t border-border pt-4">
          <input type="hidden" name="id" value={s.id} />
          <button className="text-sm text-red-400 transition hover:text-red-300">
            Delete this space (and all its lessons)
          </button>
        </form>
      </section>

      {/* Lessons in this space */}
      <section>
        <h2 className="text-lg font-semibold">Lessons</h2>
        <div className="mt-4 space-y-2">
          {list.length === 0 && (
            <p className="rounded-xl border border-border bg-surface px-5 py-6 text-center text-sm text-zinc-500">
              No lessons yet.
            </p>
          )}
          {list.map((l, i) => (
            <Link
              key={l.id}
              href={`/admin/lessons/${l.id}`}
              className="flex items-center gap-4 rounded-xl border border-border bg-surface px-5 py-3.5 transition hover:border-zinc-700"
            >
              <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-brand-soft text-sm font-semibold text-brand">
                {i + 1}
              </span>
              <span className="font-medium">{l.title}</span>
              {!l.is_published && (
                <span className="ml-auto rounded bg-surface-2 px-2 py-0.5 text-xs text-zinc-500">
                  Draft
                </span>
              )}
            </Link>
          ))}
        </div>
      </section>

      {/* Add a lesson */}
      <section className="rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold">Add a lesson</h2>
        <form action={createLesson} className="mt-4 space-y-4">
          <input type="hidden" name="space_id" value={s.id} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Title" name="title" placeholder="SAT Math: The Foundations" required />
            <TextField label="Slug (optional)" name="slug" placeholder="sat-math-foundations" />
          </div>
          <TextField
            label="Video URL (YouTube / Vimeo)"
            name="video_url"
            placeholder="https://www.youtube.com/watch?v=…"
          />
          <TextArea
            label="Written notes"
            name="content"
            placeholder="Lesson notes, action steps, links…"
          />
          <Toggle label="Published" name="is_published" />
          <button className="rounded-xl bg-brand px-5 py-2.5 font-semibold text-white transition hover:bg-brand-hover">
            Add lesson
          </button>
        </form>
      </section>
    </div>
  );
}
