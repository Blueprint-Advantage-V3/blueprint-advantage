/**
 * LOCAL DEMO MODE — lets you click through the full member hub + admin
 * locally without Supabase or Stripe configured.
 *
 * Enabled only when NEXT_PUBLIC_DEMO_MODE === "true" (set in .env.local,
 * which is gitignored). OFF by default, so production is never affected:
 * every gate and query falls back to the real Supabase/RLS path.
 *
 * In demo mode the data below is served in place of the database, and the
 * member is treated as an active admin so every screen is reachable.
 */
import type { Lesson, Profile, Space, Subscription } from "@/lib/types";

export const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

const NOW = "2026-06-23T00:00:00.000Z";

function space(
  slug: string,
  name: string,
  icon: string,
  description: string,
  position: number
): Space {
  return {
    id: `space-${slug}`,
    slug,
    name,
    icon,
    description,
    position,
    is_published: true,
    created_at: NOW,
  };
}

function lesson(
  spaceSlug: string,
  slug: string,
  title: string,
  video_url: string | null,
  content: string,
  position: number
): Lesson {
  return {
    id: `lesson-${spaceSlug}-${slug}`,
    space_id: `space-${spaceSlug}`,
    slug,
    title,
    video_url,
    content,
    position,
    is_published: true,
    created_at: NOW,
    updated_at: NOW,
  };
}

export const DEMO_SPACES: Space[] = [
  space("start-here", "Start Here", "👋", "New here? Read this first.", 0),
  space("sat", "SAT Prep", "📈", "Crush the SAT with proven strategies.", 1),
  space("finance", "Finance", "💰", "Build wealth and master your money.", 2),
  space("law", "Law", "⚖️", "Understand the law and protect yourself.", 3),
  space("ai", "Using AI", "🤖", "Leverage AI to 10x your output.", 4),
];

export const DEMO_LESSONS: Lesson[] = [
  lesson(
    "start-here",
    "welcome",
    "Welcome to Blueprint Advantage",
    "https://www.youtube.com/embed/aircAruvnKk",
    "# Welcome 👋\n\nYou're in. Here's how to get the most out of your membership:\n\n- Pick a space in the sidebar and start the first lesson.\n- New content drops weekly — check back often.\n- Take notes. Apply what you learn the same day.\n\nLet's build your advantage.",
    0
  ),
  lesson(
    "start-here",
    "how-it-works",
    "How the hub works",
    null,
    "## How the hub works\n\nEvery topic lives in its own space on the left.\n\n1. Click a space to load its lessons.\n2. Open a lesson for the video + written notes.\n3. Work top to bottom — lessons are ordered.\n\nThat's it. Simple on purpose.",
    1
  ),
  lesson(
    "sat",
    "sat-math-foundations",
    "SAT Math: The Foundations",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "## SAT Math Foundations\n\nThe core concepts that show up on every test:\n\n1. Linear equations\n2. Systems of equations\n3. Ratios & percentages\n\nWork the practice set after watching. Aim for 10 problems a day.",
    0
  ),
  lesson(
    "sat",
    "reading-strategy",
    "SAT Reading: The 3-pass strategy",
    "https://www.youtube.com/embed/aircAruvnKk",
    "## The 3-pass reading strategy\n\n- **Pass 1:** skim the passage for structure, not detail.\n- **Pass 2:** read the questions, then hunt for evidence.\n- **Pass 3:** eliminate two wrong answers before choosing.\n\nSpeed comes from trusting the process.",
    1
  ),
  lesson(
    "finance",
    "budgeting-101",
    "Budgeting 101: Pay yourself first",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "## Pay yourself first\n\nBefore you spend a dollar, move a fixed % into savings/investing.\n\n- Start at 10% if you can.\n- Automate it on payday so you never see it.\n- Treat it like a bill, not an afterthought.\n\nThe habit matters more than the amount.",
    0
  ),
  lesson(
    "finance",
    "intro-to-investing",
    "Intro to investing",
    "https://www.youtube.com/embed/aircAruvnKk",
    "## Intro to investing\n\nThe boring truth: low-cost index funds beat most active strategies.\n\n1. Open a brokerage account.\n2. Buy a broad market index fund.\n3. Contribute every month. Don't touch it.\n\nTime in the market beats timing the market.",
    1
  ),
  lesson(
    "law",
    "contracts-basics",
    "Contracts: what actually makes one binding",
    null,
    "## What makes a contract binding\n\nFour ingredients:\n\n1. **Offer**\n2. **Acceptance**\n3. **Consideration** (something of value each way)\n4. **Intent** to be legally bound\n\nGet it in writing. A handshake is a story; a signature is a record.",
    0
  ),
  lesson(
    "ai",
    "prompting-fundamentals",
    "Prompting fundamentals",
    "https://www.youtube.com/embed/aircAruvnKk",
    "## Prompting fundamentals\n\nGreat prompts share three traits:\n\n- **Context** — who you are, what you're doing.\n- **Specificity** — exactly what you want back.\n- **Format** — the shape of the answer (list, table, steps).\n\nIterate. Your second prompt is always better than your first.",
    0
  ),
];

export function demoSpaces(): Space[] {
  return [...DEMO_SPACES].sort((a, b) => a.position - b.position);
}

export function demoSpaceBySlug(slug: string): Space | null {
  return DEMO_SPACES.find((s) => s.slug === slug) ?? null;
}

export function demoSpaceById(id: string): Space | null {
  return DEMO_SPACES.find((s) => s.id === id) ?? null;
}

export function demoLessonsForSpace(spaceId: string): Lesson[] {
  return DEMO_LESSONS.filter((l) => l.space_id === spaceId).sort(
    (a, b) => a.position - b.position
  );
}

export function demoLesson(spaceSlug: string, lessonSlug: string): Lesson | null {
  return (
    DEMO_LESSONS.find(
      (l) => l.space_id === `space-${spaceSlug}` && l.slug === lessonSlug
    ) ?? null
  );
}

export function demoLessonById(id: string): Lesson | null {
  return DEMO_LESSONS.find((l) => l.id === id) ?? null;
}

/** Fake "active admin" context so every gated screen is reachable. */
export function demoMemberContext(): {
  user: { id: string; email: string };
  profile: Profile;
  subscription: Subscription | null;
  hasAccess: boolean;
} {
  const user = { id: "demo-user", email: "demo@blueprintadvantage.com" };
  const profile: Profile = {
    id: "demo-user",
    email: user.email,
    full_name: "Demo Member",
    role: "admin",
    created_at: NOW,
  };
  return { user, profile, subscription: null, hasAccess: true };
}
