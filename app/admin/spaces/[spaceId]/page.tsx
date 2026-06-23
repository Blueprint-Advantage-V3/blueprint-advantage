import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateSpace, deleteSpace, createLesson } from "../../actions";
import { TextField, TextArea, Toggle } from "@/components/admin/Field";
import { IS_DEMO, demoSpaceById, demoLessonsForSpace } from "@/lib/demo";
import { Icon } from "@/components/ui/Icon";
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
    <div className="space-y-stack_lg">
      <div>
        <Link
          href="/admin/spaces"
          className="inline-flex items-center gap-1 text-sm text-on-surface-variant transition hover:text-on-surface"
        >
          <Icon name="arrow_back" className="text-base" /> All spaces
        </Link>
        <h1 className="mt-2 font-display text-3xl font-black tracking-tight">
          <span className="mr-1">{s.icon}</span>
          <span className="bg-gradient-to-b from-on-surface to-on-surface-variant bg-clip-text text-transparent">
            {s.name}
          </span>
        </h1>
      </div>

      {/* Edit space */}
      <section className="glass-panel rounded-xl p-6">
        <h2 className="font-headline-md text-lg">Space settings</h2>
        <form action={updateSpace} className="mt-4 grid grid-cols-1 gap-stack_md sm:grid-cols-2">
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
            <button className="glow-button rounded-lg bg-primary-container px-6 py-2 font-label-md font-bold text-on-primary-container transition-all active:scale-95">
              Save changes
            </button>
          </div>
        </form>
        <form action={deleteSpace} className="mt-4 border-t border-outline-variant/10 pt-4">
          <input type="hidden" name="id" value={s.id} />
          <button className="inline-flex items-center gap-1.5 text-sm text-error transition hover:opacity-80">
            <Icon name="delete" className="text-base" />
            Delete this space (and all its lessons)
          </button>
        </form>
      </section>

      {/* Lessons in this space */}
      <section>
        <h2 className="font-headline-md text-lg">Lessons</h2>
        <div className="mt-4 glass-panel overflow-hidden rounded-xl border border-outline-variant/10">
          {list.length === 0 && (
            <p className="px-gutter py-6 text-center text-sm text-outline">
              No lessons yet.
            </p>
          )}
          <div className="divide-y divide-outline-variant/10">
            {list.map((l, i) => (
              <Link
                key={l.id}
                href={`/admin/lessons/${l.id}`}
                className="group flex items-center gap-4 px-gutter py-4 transition-colors hover:bg-white/5"
              >
                <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-primary/10 text-sm font-bold text-primary">
                  {i + 1}
                </span>
                <span className="min-w-0 truncate text-sm font-bold text-on-surface">
                  {l.title}
                </span>
                <div className="ml-auto flex items-center gap-2">
                  <div
                    className={`h-1.5 w-1.5 rounded-full ${
                      l.is_published ? "bg-green-500" : "bg-yellow-500"
                    }`}
                  />
                  <span className="text-xs text-on-surface">
                    {l.is_published ? "Published" : "Draft"}
                  </span>
                </div>
                <Icon
                  name="edit"
                  className="text-xl text-outline transition-colors group-hover:text-primary"
                />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Add a lesson */}
      <section className="glass-panel rounded-xl p-6">
        <h2 className="font-headline-md text-lg">Add a lesson</h2>
        <form action={createLesson} className="mt-4 space-y-stack_md">
          <input type="hidden" name="space_id" value={s.id} />
          <div className="grid grid-cols-1 gap-stack_md sm:grid-cols-2">
            <TextField label="Title" name="title" placeholder="SAT Math: The Foundations" required />
            <TextField label="Slug (optional)" name="slug" placeholder="sat-math-foundations" />
          </div>
          <TextField label="Instructor / professor" name="instructor" placeholder="Dr. Lena Ortiz" />
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
          <button className="glow-button inline-flex items-center gap-2 rounded-lg bg-primary-container px-6 py-2 font-label-md font-bold text-on-primary-container transition-all active:scale-95">
            <Icon name="add" className="text-base" />
            Add New Lesson
          </button>
        </form>
      </section>
    </div>
  );
}
