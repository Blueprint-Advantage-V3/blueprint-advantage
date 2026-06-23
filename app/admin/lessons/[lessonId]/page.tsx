import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateLesson, deleteLesson } from "../../actions";
import { TextField, TextArea, Toggle } from "@/components/admin/Field";
import type { Lesson } from "@/lib/types";

export default async function EditLessonPage({
  params,
}: {
  params: { lessonId: string };
}) {
  const supabase = createClient();
  const { data: lesson } = await supabase
    .from("lessons")
    .select("*")
    .eq("id", params.lessonId)
    .maybeSingle();

  if (!lesson) notFound();
  const l = lesson as Lesson;

  return (
    <div className="space-y-8">
      <div>
        <Link
          href={`/admin/spaces/${l.space_id}`}
          className="text-sm text-muted hover:text-white"
        >
          ← Back to space
        </Link>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight">Edit lesson</h1>
      </div>

      <section className="rounded-2xl border border-border bg-surface p-6">
        <form action={updateLesson} className="space-y-4">
          <input type="hidden" name="id" value={l.id} />
          <input type="hidden" name="space_id" value={l.space_id} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Title" name="title" defaultValue={l.title} required />
            <TextField label="Slug" name="slug" defaultValue={l.slug} required />
          </div>
          <TextField label="Video URL" name="video_url" defaultValue={l.video_url} />
          <TextArea label="Written notes" name="content" defaultValue={l.content} rows={12} />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <TextField label="Position" name="position" type="number" defaultValue={l.position} />
            <div className="flex items-end">
              <Toggle label="Published" name="is_published" defaultChecked={l.is_published} />
            </div>
          </div>
          <button className="rounded-xl bg-brand px-5 py-2.5 font-semibold text-white transition hover:bg-brand-hover">
            Save changes
          </button>
        </form>

        <form action={deleteLesson} className="mt-4 border-t border-border pt-4">
          <input type="hidden" name="id" value={l.id} />
          <input type="hidden" name="space_id" value={l.space_id} />
          <button className="text-sm text-red-400 transition hover:text-red-300">
            Delete this lesson
          </button>
        </form>
      </section>
    </div>
  );
}
