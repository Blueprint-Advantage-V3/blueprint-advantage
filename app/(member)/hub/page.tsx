import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { IS_DEMO, demoSpaces } from "@/lib/demo";

/**
 * Hub entry point. Sends the member to the first space (Start Here sits
 * at position 0, so they always land there first).
 */
export default async function HubIndex() {
  if (IS_DEMO) {
    const first = demoSpaces()[0];
    if (first) redirect(`/hub/${first.slug}`);
  }

  const supabase = createClient();
  const { data: firstSpace } = await supabase
    .from("spaces")
    .select("slug")
    .order("position", { ascending: true })
    .limit(1)
    .maybeSingle();

  if (firstSpace?.slug) {
    redirect(`/hub/${firstSpace.slug}`);
  }

  return (
    <div className="flex h-full items-center justify-center p-10 text-center">
      <div>
        <h1 className="text-xl font-semibold">Your hub is being set up</h1>
        <p className="mt-2 text-muted">
          No spaces have been published yet. Check back shortly.
        </p>
      </div>
    </div>
  );
}
