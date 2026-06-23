import Link from "next/link";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { updateLesson, deleteLesson } from "../../actions";
import { TextField, TextArea, Toggle } from "@/components/admin/Field";
import { IS_DEMO, demoLessonById } from "@/lib/demo";
import { Icon } from "@/components/ui/Icon";
import type { Lesson } from "@/lib/types";

export default async function EditLessonPage({
  params,
}: {
  params: { lessonId: string };
}) {
  let l: Lesson;

  if (IS_DEMO) {
    const demo = demoLessonById(params.lessonId);
    if (!demo) notFound();
    l = demo;
  } else {
    const supabase = createClient();
    const { data: lesson } = await supabase
      .from("lessons")
      .select("*")
      .eq("id", params.lessonId)
      .maybeSingle();

    if (!lesson) notFound();
    l = lesson as Lesson;
  }

  return (
    <div className="space-y-stack_lg">
      <div>
        <Link
          href={`/admin/spaces/${l.space_id}`}
          className="inline-flex items-center gap-1 text-sm text-on-surface-variant transition hover:text-on-surface"
        >
          <Icon name="arrow_back" className="text-base" /> Back to space
        </Link>
        <h1 className="mt-2 font-display text-3xl font-black tracking-tight bg-gradient-to-b from-on-surface to-on-surface-variant bg-clip-text text-transparent">
          Edit lesson
        </h1>
      </div>

      <section className="glass-panel rounded-xl p-6">
        <form action={updateLesson} className="space-y-stack_md">
          <input type="hidden" name="id" value={l.id} />
          <input type="hidden" name="space_id" value={l.space_id} />
          <div className="grid grid-cols-1 gap-stack_md sm:grid-cols-2">
            <TextField label="Title" name="title" defaultValue={l.title} required />
            <TextField label="Slug" name="slug" defaultValue={l.slug} required />
          </div>
          <TextField label="Instructor / professor" name="instructor" defaultValue={l.instructor} />
          <TextField label="Video URL" name="video_url" defaultValue={l.video_url} />
          <TextArea label="Written notes" name="content" defaultValue={l.content} rows={12} />
          <div className="grid grid-cols-1 gap-stack_md sm:grid-cols-2">
            <TextField label="Position" name="position" type="number" defaultValue={l.position} />
            <div className="flex items-end">
              <Toggle label="Published" name="is_published" defaultChecked={l.is_published} />
            </div>
          </div>
          <button className="glow-button rounded-lg bg-primary-container px-6 py-2 font-label-md font-bold text-on-primary-container transition-all active:scale-95">
            Save changes
          </button>
        </form>

        <form action={deleteLesson} className="mt-4 border-t border-outline-variant/10 pt-4">
          <input type="hidden" name="id" value={l.id} />
          <input type="hidden" name="space_id" value={l.space_id} />
          <button className="inline-flex items-center gap-1.5 text-sm text-error transition hover:opacity-80">
            <Icon name="delete" className="text-base" />
            Delete this lesson
          </button>
        </form>
      </section>
    </div>
  );
}
