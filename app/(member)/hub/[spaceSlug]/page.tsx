import { notFound, redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { IS_DEMO, demoChannelsForSpace, demoSpaceBySlug } from "@/lib/demo";
import type { Channel } from "@/lib/types";

/**
 * Entering a space drops you on its first channel (the Lessons channel sits
 * at position 0), Discord-style.
 */
export default async function SpaceIndex({
  params,
}: {
  params: { spaceSlug: string };
}) {
  let firstChannel: Pick<Channel, "slug"> | null = null;

  if (IS_DEMO) {
    const space = demoSpaceBySlug(params.spaceSlug);
    if (!space) notFound();
    firstChannel = demoChannelsForSpace(space.id)[0] ?? null;
  } else {
    const supabase = createClient();
    const { data: space } = await supabase
      .from("spaces")
      .select("id")
      .eq("slug", params.spaceSlug)
      .maybeSingle();
    if (!space) notFound();
    const { data } = await supabase
      .from("channels")
      .select("slug")
      .eq("space_id", space.id)
      .order("position", { ascending: true })
      .limit(1)
      .maybeSingle();
    firstChannel = data;
  }

  if (firstChannel?.slug) {
    redirect(`/hub/${params.spaceSlug}/${firstChannel.slug}`);
  }

  return (
    <div className="flex h-full items-center justify-center p-10 text-center text-muted">
      This space has no channels yet.
    </div>
  );
}
