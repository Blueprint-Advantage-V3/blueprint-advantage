import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createSpace } from "../actions";
import { TextField, TextArea, Toggle } from "@/components/admin/Field";
import type { Space } from "@/lib/types";

export const metadata = { title: "Spaces" };

export default async function AdminSpacesPage() {
  const supabase = createClient();
  const { data: spaces } = await supabase
    .from("spaces")
    .select("*")
    .order("position", { ascending: true });

  const list = (spaces ?? []) as Space[];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Spaces</h1>
      <p className="mt-1 text-muted">Categories that appear in the hub sidebar.</p>

      {/* Existing spaces */}
      <div className="mt-8 space-y-2">
        {list.map((s) => (
          <Link
            key={s.id}
            href={`/admin/spaces/${s.id}`}
            className="flex items-center gap-4 rounded-xl border border-border bg-surface px-5 py-4 transition hover:border-zinc-700"
          >
            <span className="text-2xl">{s.icon ?? "#"}</span>
            <div>
              <p className="font-medium">{s.name}</p>
              <p className="text-xs text-zinc-500">/hub/{s.slug}</p>
            </div>
            {!s.is_published && (
              <span className="ml-auto rounded bg-surface-2 px-2 py-0.5 text-xs text-zinc-500">
                Draft
              </span>
            )}
          </Link>
        ))}
      </div>

      {/* Create new space */}
      <div className="mt-10 rounded-2xl border border-border bg-surface p-6">
        <h2 className="text-lg font-semibold">Add a space</h2>
        <form action={createSpace} className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <TextField label="Name" name="name" placeholder="Finance" required />
          <TextField label="Icon (emoji)" name="icon" placeholder="💰" />
          <div className="sm:col-span-2">
            <TextField label="Slug (optional)" name="slug" placeholder="finance" />
          </div>
          <div className="sm:col-span-2">
            <TextArea
              label="Description"
              name="description"
              rows={2}
              placeholder="Build wealth and master your money."
            />
          </div>
          <Toggle label="Published" name="is_published" />
          <div className="sm:col-span-2">
            <button className="rounded-xl bg-brand px-5 py-2.5 font-semibold text-white transition hover:bg-brand-hover">
              Create space
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
