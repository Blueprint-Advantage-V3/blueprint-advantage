import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { IS_DEMO, demoSpaceBySlug } from "@/lib/demo";
import { TrackTabs } from "@/components/hub/TrackTabs";
import type { Space } from "@/lib/types";

/**
 * Track shell — every track is its own space with Lessons, Live, and
 * Discussion. A header + tabs sit above the active tab's content.
 */
export default async function TrackLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { spaceSlug: string };
}) {
  let space: Space | null;
  if (IS_DEMO) {
    space = demoSpaceBySlug(params.spaceSlug);
  } else {
    const supabase = createClient();
    const { data } = await supabase
      .from("spaces")
      .select("*")
      .eq("slug", params.spaceSlug)
      .maybeSingle();
    space = (data as Space) ?? null;
  }
  if (!space) notFound();

  return (
    <div className="flex h-full flex-col">
      <div className="flex-none border-b border-outline-variant/10 bg-canvas px-gutter pt-6">
        <div className="mx-auto w-full max-w-content_max_width">
          <div className="flex items-center gap-3">
            <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-primary/10 text-xl">
              {space.icon}
            </span>
            <div className="min-w-0">
              <h1 className="font-display text-[20px] font-semibold tracking-tight text-on-surface">
                {space.name}
              </h1>
              <p className="truncate font-sans text-[12px] text-on-surface-variant">
                {space.description}
              </p>
            </div>
          </div>
          <TrackTabs slug={space.slug} />
        </div>
      </div>
      <div className="min-h-0 flex-1">{children}</div>
    </div>
  );
}
