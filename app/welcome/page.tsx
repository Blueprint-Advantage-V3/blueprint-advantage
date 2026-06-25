"use client";

import { useState } from "react";
import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Logo } from "@/components/brand/Logo";
import { BRAND } from "@/lib/constants";

/**
 * Onboarding — a short flow that places a new member in the right campus.
 * Reached right after sign-up (see auth actions + middleware gate). Picking a
 * goal drops the student straight into the matching campus; they can always
 * explore the others from the hub afterward.
 */
const CAMPUSES = [
  {
    slug: "sat",
    name: "Road to University",
    icon: "school",
    goal: "Get into a top university",
    blurb: "SAT mastery, standout essays, and applications that get you in.",
  },
  {
    slug: "finance",
    name: "Finance",
    icon: "payments",
    goal: "Build wealth & master money",
    blurb: "From budgeting to investing to real, lasting financial leverage.",
  },
  {
    slug: "law",
    name: "Law",
    icon: "gavel",
    goal: "Understand the law & protect myself",
    blurb: "Contracts, rights, and sharp legal reasoning — in plain English.",
  },
  {
    slug: "ai",
    name: "Using AI",
    icon: "psychology",
    goal: "Master AI & 10x my output",
    blurb: "Prompt, automate, and build with AI to pull ahead of everyone.",
  },
];

export default function WelcomePage() {
  const [selected, setSelected] = useState<(typeof CAMPUSES)[number] | null>(null);

  return (
    <main className="draft-grid relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-canvas px-margin_mobile py-16">
      <div className="absolute left-6 top-6 z-10">
        <Logo size={28} wordmarkClass="text-[16px] font-medium" />
      </div>
      <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[600px] w-[600px] -translate-x-1/2 rounded-full bg-primary/10 blur-[120px]" />

      {!selected ? (
        <div className="w-full max-w-3xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-label-md text-label-md text-primary">
            <Icon name="waving_hand" className="text-[14px]" /> Welcome to {BRAND.name}
          </span>
          <h1 className="mt-5 font-display text-[36px] font-black leading-[1.1] tracking-tighter md:text-[52px]">
            Let&apos;s get you on the
            <br />
            right track.
          </h1>
          <p className="mx-auto mt-4 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
            What do you want to win at first? Pick your main goal — we&apos;ll drop you
            straight in. You can explore the rest anytime.
          </p>

          <div className="mt-10 grid grid-cols-1 gap-4 text-left sm:grid-cols-2">
            {CAMPUSES.map((c) => (
              <button
                key={c.slug}
                onClick={() => setSelected(c)}
                className="glass-card group flex items-start gap-4 rounded-2xl p-6 text-left transition-all hover:scale-[1.02] hover:border-primary/40"
              >
                <span className="flex h-12 w-12 flex-none items-center justify-center rounded-xl bg-primary/15 text-primary">
                  <Icon name={c.icon} fill className="text-[26px]" />
                </span>
                <div>
                  <p className="font-label-md text-label-md font-bold uppercase tracking-wider text-primary">
                    {c.goal}
                  </p>
                  <h3 className="mt-1 font-headline-md text-headline-md">{c.name}</h3>
                  <p className="mt-1 font-body-md text-body-md text-on-surface-variant/80">
                    {c.blurb}
                  </p>
                </div>
              </button>
            ))}
          </div>

          <Link
            href="/hub"
            className="mt-8 inline-block font-label-md text-label-md text-on-surface-variant transition hover:text-on-surface"
          >
            Not sure yet? Explore every track →
          </Link>
        </div>
      ) : (
        <div className="w-full max-w-xl text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-label-md text-label-md text-primary">
            <Icon name="check_circle" fill className="text-[14px]" /> Track matched
          </span>
          <div className="glass-card mt-6 rounded-[2rem] p-stack_lg">
            <span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/15 text-primary">
              <Icon name={selected.icon} fill className="text-[36px]" />
            </span>
            <h1 className="mt-5 font-display text-[32px] font-black tracking-tight">
              You&apos;re headed to
              <br />
              {selected.name}.
            </h1>
            <p className="mx-auto mt-3 max-w-md font-body-md text-body-md text-on-surface-variant">
              {selected.blurb} Lessons, live rooms, the community, and your level
              ladder are all waiting inside.
            </p>
            <Link
              href={`/hub/${selected.slug}`}
              className="glow-button mt-8 inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary-container px-8 py-4 font-headline-md text-headline-md font-bold text-on-primary-container transition-transform hover:scale-[1.02]"
            >
              Enter {selected.name} <Icon name="arrow_forward" />
            </Link>
            <button
              onClick={() => setSelected(null)}
              className="mt-4 font-label-md text-label-md text-on-surface-variant transition hover:text-on-surface"
            >
              ← Pick a different track
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
