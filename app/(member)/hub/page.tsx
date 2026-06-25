import { createClient } from "@/lib/supabase/server";
import { getMemberContext } from "@/lib/subscription";
import {
  IS_DEMO,
  demoSpaces,
  demoLessonsForSpace,
  scheduleForSpaceSlug,
} from "@/lib/demo";
import { HubDashboard } from "@/components/hub/HubDashboard";
import type { Lesson, ScheduleSession, Space } from "@/lib/types";

export const metadata = { title: "Home" };

type LiteLesson = { id: string; slug: string; title: string };

/**
 * Hub home — a real dashboard (greeting + live stats + your tracks with
 * per-track progress + what's live this week + leaderboard).
 */
export default async function HubHome() {
  const { profile, user } = await getMemberContext();
  const userName = profile?.full_name ?? user?.email?.split("@")[0] ?? "there";

  let spaces: Space[];
  const lessonsBySlug: Record<string, LiteLesson[]> = {};
  const schedule: ScheduleSession[] = [];

  if (IS_DEMO) {
    spaces = demoSpaces();
    for (const s of spaces) {
      lessonsBySlug[s.slug] = demoLessonsForSpace(s.id).map((l) => ({
        id: l.id,
        slug: l.slug,
        title: l.title,
      }));
      schedule.push(...scheduleForSpaceSlug(s.slug));
    }
  } else {
    const supabase = createClient();
    const [{ data: sp }, { data: ls }] = await Promise.all([
      supabase.from("spaces").select("*").order("position", { ascending: true }),
      supabase.from("lessons").select("*").order("position", { ascending: true }),
    ]);
    spaces = (sp ?? []) as Space[];
    const lessons = (ls ?? []) as Lesson[];
    for (const s of spaces) {
      lessonsBySlug[s.slug] = lessons
        .filter((l) => l.space_id === s.id)
        .map((l) => ({ id: l.id, slug: l.slug, title: l.title }));
      schedule.push(...scheduleForSpaceSlug(s.slug));
    }
  }

  return (
    <HubDashboard
      userName={userName}
      spaces={spaces}
      lessonsBySlug={lessonsBySlug}
      schedule={schedule}
    />
  );
}
