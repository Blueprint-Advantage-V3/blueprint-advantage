import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { BRAND } from "@/lib/constants";
import { IS_DEMO, demoSpaces } from "@/lib/demo";
import { Icon } from "@/components/ui/Icon";
import type { Space } from "@/lib/types";

export const metadata = { title: "Home" };

/**
 * Platform home — the landing screen you see when you first arrive in the
 * hub (before picking a space). Welcome + jump back into your spaces +
 * announcements.
 */
export default async function HubHome() {
  let spaces: Space[];
  if (IS_DEMO) {
    spaces = demoSpaces();
  } else {
    const supabase = createClient();
    const { data } = await supabase
      .from("spaces")
      .select("*")
      .order("position", { ascending: true });
    spaces = (data ?? []) as Space[];
  }

  return (
    <div className="mx-auto max-w-content_max_width px-gutter py-stack_lg">
      {/* WELCOME BANNER */}
      <section className="relative mb-stack_lg overflow-hidden rounded-xl p-8 premium-border">
        <div className="relative z-10">
          <div className="mb-2 flex items-center gap-2">
            <span className="rounded bg-secondary/10 px-2 py-0.5 text-[10px] font-bold uppercase tracking-widest text-secondary">
              Active Status
            </span>
          </div>
          <h1 className="mb-2 font-display text-display">
            Welcome back to {BRAND.name}.
          </h1>
          <p className="max-w-lg font-body-lg text-body-lg text-on-surface-variant">
            Pick a space to jump into lessons, chat with the community, or hop in
            a voice or video room. New lessons drop every week.
          </p>
        </div>
      </section>

      {/* JUMP BACK IN */}
      <h2 className="mb-4 flex items-center gap-2 font-headline-md text-headline-md">
        <Icon name="bolt" className="text-primary" />
        Jump back in
      </h2>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {spaces.map((s) => (
          <Link
            key={s.id}
            href={`/hub/${s.slug}`}
            className="glass-card group flex items-start gap-4 rounded-2xl p-5 transition-all duration-300 hover:border-primary/30"
          >
            <span className="flex h-12 w-12 flex-none items-center justify-center rounded-lg bg-primary/20 text-2xl">
              {s.icon}
            </span>
            <div className="min-w-0">
              <p className="font-headline-md font-bold transition-colors group-hover:text-primary">
                {s.name}
              </p>
              <p className="mt-0.5 font-body-md text-body-md text-on-surface-variant">
                {s.description}
              </p>
            </div>
          </Link>
        ))}
      </div>

      {/* ANNOUNCEMENTS FEED */}
      <div className="mt-stack_lg space-y-stack_md">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="flex items-center gap-2 font-headline-md text-headline-md">
            <Icon name="campaign" className="text-primary" />
            Announcements
          </h3>
          <div className="flex gap-2">
            <span className="rounded-full border border-outline-variant/20 bg-surface-container-high px-3 py-1 font-label-md text-xs text-on-surface-variant">
              All Topics
            </span>
            <span className="rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-label-md text-xs text-primary">
              Crucial Updates
            </span>
          </div>
        </div>

        <Announcement
          icon="school"
          accent="primary"
          age="THIS WEEK"
          title="New SAT lessons every Monday"
          body="Dr. Lena Ortiz is dropping a fresh module each week. Start with The Foundations."
        />
        <Announcement
          icon="graphic_eq"
          accent="tertiary"
          age="ONGOING"
          title="Office hours are live"
          body="Hop into the Office Hours voice channel in any space to ask the professor directly."
        />
      </div>

      {/* QUICK STATS */}
      <div className="mt-stack_lg grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="glass-panel rounded-xl p-stack_md">
          <p className="mb-1 text-[10px] font-bold uppercase text-on-surface-variant">
            XP Points
          </p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-primary">12,450</span>
            <div className="h-1 w-24 overflow-hidden rounded-full bg-surface-container">
              <div className="h-full w-[65%] bg-gradient-to-r from-secondary to-primary" />
            </div>
          </div>
        </div>
        <div className="glass-panel rounded-xl p-stack_md">
          <p className="mb-1 text-[10px] font-bold uppercase text-on-surface-variant">
            Rank
          </p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-secondary">Elite V</span>
            <Icon name="military_tech" className="text-secondary opacity-50" />
          </div>
        </div>
        <div className="glass-panel rounded-xl p-stack_md">
          <p className="mb-1 text-[10px] font-bold uppercase text-on-surface-variant">
            Streak
          </p>
          <div className="flex items-end justify-between">
            <span className="text-3xl font-bold text-tertiary">14 Days</span>
            <Icon name="local_fire_department" className="text-tertiary opacity-50" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Announcement({
  icon,
  accent,
  age,
  title,
  body,
}: {
  icon: string;
  accent: "primary" | "tertiary";
  age: string;
  title: string;
  body: string;
}) {
  const accentMap = {
    primary: {
      border: "border-l-primary",
      bubble: "bg-primary/20 text-primary",
      hoverText: "group-hover:text-primary",
    },
    tertiary: {
      border: "border-l-tertiary",
      bubble: "bg-tertiary/20 text-tertiary",
      hoverText: "group-hover:text-tertiary",
    },
  }[accent];

  return (
    <article
      className={`glass-panel group relative cursor-pointer rounded-xl border-l-4 p-6 transition-all duration-300 ${accentMap.border}`}
    >
      <div className="absolute right-0 top-0 p-4">
        <span className="text-[10px] font-bold text-on-surface-variant/50">
          {age}
        </span>
      </div>
      <div className="flex gap-4">
        <div
          className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-lg ${accentMap.bubble}`}
        >
          <Icon name={icon} className="text-3xl" />
        </div>
        <div className="min-w-0">
          <h4
            className={`mb-1 font-headline-md text-headline-md transition-colors ${accentMap.hoverText}`}
          >
            {title}
          </h4>
          <p className="font-body-md text-body-md leading-relaxed text-on-surface-variant">
            {body}
          </p>
        </div>
      </div>
    </article>
  );
}
