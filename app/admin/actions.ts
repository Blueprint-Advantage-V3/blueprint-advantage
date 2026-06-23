"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getMemberContext, isAdmin } from "@/lib/subscription";
import { IS_DEMO } from "@/lib/demo";

/**
 * In demo mode, writes are a no-op (there's no database) — bounce back so
 * the forms don't error. Returns true if the caller should stop here.
 */
function blockedInDemo(redirectTo: string): boolean {
  if (IS_DEMO) {
    redirect(redirectTo);
  }
  return false;
}

/** Throws (via redirect) if the caller isn't an admin. */
async function assertAdmin() {
  const { profile } = await getMemberContext();
  if (!isAdmin(profile)) redirect("/hub");
}

function slugify(input: string): string {
  return input
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

// ── Spaces ───────────────────────────────────────────────────────

export async function createSpace(formData: FormData) {
  blockedInDemo("/admin/spaces");
  await assertAdmin();
  const name = String(formData.get("name") ?? "").trim();
  if (!name) return;

  const supabase = createClient();
  const { data: last } = await supabase
    .from("spaces")
    .select("position")
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("spaces").insert({
    name,
    slug: slugify(String(formData.get("slug") || name)),
    description: String(formData.get("description") ?? "") || null,
    icon: String(formData.get("icon") ?? "") || null,
    position: (last?.position ?? -1) + 1,
    is_published: formData.get("is_published") === "on",
  });

  revalidatePath("/admin/spaces");
  revalidatePath("/hub", "layout");
}

export async function updateSpace(formData: FormData) {
  blockedInDemo("/admin/spaces");
  await assertAdmin();
  const id = String(formData.get("id"));
  const supabase = createClient();

  await supabase
    .from("spaces")
    .update({
      name: String(formData.get("name") ?? "").trim(),
      slug: slugify(String(formData.get("slug") ?? "")),
      description: String(formData.get("description") ?? "") || null,
      icon: String(formData.get("icon") ?? "") || null,
      position: Number(formData.get("position") ?? 0),
      is_published: formData.get("is_published") === "on",
    })
    .eq("id", id);

  revalidatePath("/admin/spaces");
  revalidatePath("/hub", "layout");
  redirect("/admin/spaces");
}

export async function deleteSpace(formData: FormData) {
  blockedInDemo("/admin/spaces");
  await assertAdmin();
  const id = String(formData.get("id"));
  const supabase = createClient();
  await supabase.from("spaces").delete().eq("id", id);
  revalidatePath("/admin/spaces");
  revalidatePath("/hub", "layout");
  redirect("/admin/spaces");
}

// ── Lessons ──────────────────────────────────────────────────────

export async function createLesson(formData: FormData) {
  blockedInDemo(`/admin/spaces/${String(formData.get("space_id"))}`);
  await assertAdmin();
  const spaceId = String(formData.get("space_id"));
  const title = String(formData.get("title") ?? "").trim();
  if (!spaceId || !title) return;

  const supabase = createClient();
  const { data: last } = await supabase
    .from("lessons")
    .select("position")
    .eq("space_id", spaceId)
    .order("position", { ascending: false })
    .limit(1)
    .maybeSingle();

  await supabase.from("lessons").insert({
    space_id: spaceId,
    title,
    slug: slugify(String(formData.get("slug") || title)),
    video_url: String(formData.get("video_url") ?? "") || null,
    content: String(formData.get("content") ?? "") || null,
    position: (last?.position ?? -1) + 1,
    is_published: formData.get("is_published") === "on",
  });

  revalidatePath(`/admin/spaces/${spaceId}`);
}

export async function updateLesson(formData: FormData) {
  blockedInDemo(`/admin/spaces/${String(formData.get("space_id"))}`);
  await assertAdmin();
  const id = String(formData.get("id"));
  const spaceId = String(formData.get("space_id"));
  const supabase = createClient();

  await supabase
    .from("lessons")
    .update({
      title: String(formData.get("title") ?? "").trim(),
      slug: slugify(String(formData.get("slug") ?? "")),
      video_url: String(formData.get("video_url") ?? "") || null,
      content: String(formData.get("content") ?? "") || null,
      position: Number(formData.get("position") ?? 0),
      is_published: formData.get("is_published") === "on",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  revalidatePath(`/admin/spaces/${spaceId}`);
  redirect(`/admin/spaces/${spaceId}`);
}

export async function deleteLesson(formData: FormData) {
  blockedInDemo(`/admin/spaces/${String(formData.get("space_id"))}`);
  await assertAdmin();
  const id = String(formData.get("id"));
  const spaceId = String(formData.get("space_id"));
  const supabase = createClient();
  await supabase.from("lessons").delete().eq("id", id);
  revalidatePath(`/admin/spaces/${spaceId}`);
  redirect(`/admin/spaces/${spaceId}`);
}
