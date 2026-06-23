import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { createSpace } from "../actions";
import { TextField, TextArea, Toggle } from "@/components/admin/Field";
import { IS_DEMO, demoSpaces } from "@/lib/demo";
import { Icon } from "@/components/ui/Icon";
import type { Space } from "@/lib/types";

export const metadata = { title: "Spaces" };

export default async function AdminSpacesPage() {
  let list: Space[];
  if (IS_DEMO) {
    list = demoSpaces();
  } else {
    const supabase = createClient();
    const { data: spaces } = await supabase
      .from("spaces")
      .select("*")
      .order("position", { ascending: true });
    list = (spaces ?? []) as Space[];
  }

  return (
    <div className="space-y-stack_lg">
      <div>
        <h1 className="font-display text-3xl font-black tracking-tight bg-gradient-to-b from-on-surface to-on-surface-variant bg-clip-text text-transparent">
          Spaces
        </h1>
        <p className="mt-1 text-on-surface-variant">
          Categories that appear in the hub sidebar.
        </p>
      </div>

      {/* Existing spaces */}
      <div className="glass-panel overflow-hidden rounded-xl border border-outline-variant/10">
        <div className="flex items-center justify-between border-b border-outline-variant/10 bg-surface-container-low/50 px-gutter py-4">
          <h3 className="font-headline-md text-lg">All spaces</h3>
          <span className="text-xs text-outline">{list.length} total</span>
        </div>
        <div className="divide-y divide-outline-variant/10">
          {list.map((s) => (
            <Link
              key={s.id}
              href={`/admin/spaces/${s.id}`}
              className="group flex items-center gap-4 px-gutter py-4 transition-colors hover:bg-white/5"
            >
              <span className="flex h-10 w-10 flex-none items-center justify-center rounded bg-surface-container-high text-xl">
                {s.icon ?? "#"}
              </span>
              <div className="min-w-0">
                <p className="text-sm font-bold text-on-surface">{s.name}</p>
                <p className="text-[10px] text-outline">/hub/{s.slug}</p>
              </div>
              <div className="ml-auto flex items-center gap-2">
                <div
                  className={`h-1.5 w-1.5 rounded-full ${
                    s.is_published ? "bg-green-500" : "bg-yellow-500"
                  }`}
                />
                <span className="text-xs text-on-surface">
                  {s.is_published ? "Published" : "Draft"}
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

      {/* Create new space */}
      <div className="glass-panel rounded-xl p-6">
        <h2 className="font-headline-md text-lg">Add a space</h2>
        <form action={createSpace} className="mt-4 grid grid-cols-1 gap-stack_md sm:grid-cols-2">
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
            <button className="glow-button inline-flex items-center gap-2 rounded-lg bg-primary-container px-6 py-2 font-label-md font-bold text-on-primary-container transition-all active:scale-95">
              <Icon name="add" className="text-base" />
              Add New Space
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
