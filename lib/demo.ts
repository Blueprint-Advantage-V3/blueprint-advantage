/**
 * LOCAL DEMO MODE — click through the full Discord-style hub locally
 * without Supabase or Stripe configured.
 *
 * Enabled only when NEXT_PUBLIC_DEMO_MODE === "true" (set in .env.local,
 * which is gitignored). OFF by default, so production is never affected:
 * every gate and query falls back to the real Supabase/RLS path.
 */
import type {
  Channel,
  ChannelMessage,
  Lesson,
  Profile,
  Space,
  Subscription,
} from "@/lib/types";

export const IS_DEMO = process.env.NEXT_PUBLIC_DEMO_MODE === "true";

const NOW = "2026-06-23T00:00:00.000Z";

// ── Spaces (Discord "servers") ───────────────────────────────────
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

export const DEMO_SPACES: Space[] = [
  space("sat", "Road to University", "🎓", "Your roadmap into a top university — SAT, essays & applications.", 0),
  space("finance", "Finance", "💰", "Build wealth and master your money.", 1),
  space("law", "Law", "⚖️", "Understand the law and protect yourself.", 2),
  space("ai", "Using AI", "🤖", "Leverage AI to 10x your output.", 3),
];

// ── Channels (every space gets the same Discord-style set) ───────
function channelsFor(spaceSlug: string): Channel[] {
  const make = (
    slug: string,
    name: string,
    type: Channel["type"],
    position: number
  ): Channel => ({
    id: `chan-${spaceSlug}-${slug}`,
    space_id: `space-${spaceSlug}`,
    slug,
    name,
    type,
    position,
  });
  return [
    make("lessons", "Lessons", "lessons", 0),
    make("general", "general", "text", 1),
    make("questions", "questions", "text", 2),
    make("study-hall", "Study Hall", "voice", 3),
    make("office-hours", "Office Hours", "voice", 4),
    make("live-class", "Live Class", "video", 5),
  ];
}

export const DEMO_CHANNELS: Channel[] = DEMO_SPACES.flatMap((s) =>
  channelsFor(s.slug)
);

// ── Lessons (prerecorded, attributed to a professor) ─────────────
function lesson(
  spaceSlug: string,
  slug: string,
  title: string,
  instructor: string,
  video_url: string | null,
  content: string,
  position: number
): Lesson {
  return {
    id: `lesson-${spaceSlug}-${slug}`,
    space_id: `space-${spaceSlug}`,
    slug,
    title,
    instructor,
    video_url,
    content,
    position,
    is_published: true,
    created_at: NOW,
    updated_at: NOW,
  };
}

export const DEMO_LESSONS: Lesson[] = [
  lesson(
    "sat",
    "math-foundations",
    "SAT Math: The Foundations",
    "Dr. Lena Ortiz",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "## SAT Math Foundations\n\nThe core concepts that show up on every test:\n\n1. Linear equations\n2. Systems of equations\n3. Ratios & percentages\n\nWork the practice set after watching. Aim for 10 problems a day.",
    0
  ),
  lesson(
    "sat",
    "reading-strategy",
    "SAT Reading: The 3-pass strategy",
    "Dr. Lena Ortiz",
    "https://www.youtube.com/embed/aircAruvnKk",
    "## The 3-pass reading strategy\n\n- **Pass 1:** skim the passage for structure, not detail.\n- **Pass 2:** read the questions, then hunt for evidence.\n- **Pass 3:** eliminate two wrong answers before choosing.\n\nSpeed comes from trusting the process.",
    1
  ),
  lesson(
    "finance",
    "budgeting-101",
    "Budgeting 101: Pay yourself first",
    "Marcus Webb",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "## Pay yourself first\n\nBefore you spend a dollar, move a fixed % into savings/investing.\n\n- Start at 10% if you can.\n- Automate it on payday so you never see it.\n- Treat it like a bill, not an afterthought.\n\nThe habit matters more than the amount.",
    0
  ),
  lesson(
    "finance",
    "intro-to-investing",
    "Intro to investing",
    "Marcus Webb",
    "https://www.youtube.com/embed/aircAruvnKk",
    "## Intro to investing\n\nThe boring truth: low-cost index funds beat most active strategies.\n\n1. Open a brokerage account.\n2. Buy a broad market index fund.\n3. Contribute every month. Don't touch it.\n\nTime in the market beats timing the market.",
    1
  ),
  lesson(
    "law",
    "contracts-basics",
    "Contracts: what makes one binding",
    "Prof. Aisha Bello",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "## What makes a contract binding\n\nFour ingredients:\n\n1. **Offer**\n2. **Acceptance**\n3. **Consideration** (something of value each way)\n4. **Intent** to be legally bound\n\nGet it in writing. A handshake is a story; a signature is a record.",
    0
  ),
  lesson(
    "ai",
    "prompting-fundamentals",
    "Prompting fundamentals",
    "Sam Reyes",
    "https://www.youtube.com/embed/aircAruvnKk",
    "## Prompting fundamentals\n\nGreat prompts share three traits:\n\n- **Context** — who you are, what you're doing.\n- **Specificity** — exactly what you want back.\n- **Format** — the shape of the answer (list, table, steps).\n\nIterate. Your second prompt is always better than your first.",
    0
  ),
  lesson(
    "ai",
    "automate-with-ai",
    "Automating busywork with AI",
    "Sam Reyes",
    "https://www.youtube.com/embed/dQw4w9WgXcQ",
    "## Automate the busywork\n\nFind the task you do every week that you hate. Then:\n\n1. Write out the steps you take by hand.\n2. Hand those steps to an AI as a repeatable prompt.\n3. Save it. Reuse it. Refine it.\n\nLeverage compounds.",
    1
  ),
];

// ── Demo chat messages (text channels) ───────────────────────────
function msg(
  channelId: string,
  name: string,
  body: string,
  order: number
): ChannelMessage {
  return {
    id: `${channelId}-m${order}`,
    channel_id: channelId,
    author_name: name,
    author_initial: name.charAt(0).toUpperCase(),
    body,
    created_at: NOW,
  };
}

export const DEMO_MESSAGES: ChannelMessage[] = [
  msg("chan-sat-general", "Dr. Lena Ortiz", "Welcome to Road to University! New lesson drops every Monday. 🎓", 0),
  msg("chan-sat-general", "Maya", "Just hit a 1480 on my practice test 🔥 thank you!", 1),
  msg("chan-sat-general", "Dr. Lena Ortiz", "Incredible Maya — let's push for 1500+ next.", 2),
  msg("chan-sat-questions", "Jordan", "On the math no-calc section, how do you handle systems fast?", 0),
  msg("chan-sat-questions", "Dr. Lena Ortiz", "Substitution when one variable is isolated, elimination otherwise. The Foundations lesson covers it.", 1),
  msg("chan-finance-general", "Marcus Webb", "Reminder: pay yourself first. Automate it today. 💰", 0),
  msg("chan-ai-general", "Sam Reyes", "Drop your best prompt of the week below 👇", 0),
];

// ── Helpers ──────────────────────────────────────────────────────
export function demoSpaces(): Space[] {
  return [...DEMO_SPACES].sort((a, b) => a.position - b.position);
}
export function demoSpaceBySlug(slug: string): Space | null {
  return DEMO_SPACES.find((s) => s.slug === slug) ?? null;
}
export function demoSpaceById(id: string): Space | null {
  return DEMO_SPACES.find((s) => s.id === id) ?? null;
}
export function demoChannels(): Channel[] {
  return DEMO_CHANNELS;
}
export function demoChannelsForSpace(spaceId: string): Channel[] {
  return DEMO_CHANNELS.filter((c) => c.space_id === spaceId).sort(
    (a, b) => a.position - b.position
  );
}
export function demoChannel(
  spaceSlug: string,
  channelSlug: string
): Channel | null {
  return (
    DEMO_CHANNELS.find(
      (c) => c.space_id === `space-${spaceSlug}` && c.slug === channelSlug
    ) ?? null
  );
}
export function demoMessagesForChannel(channelId: string): ChannelMessage[] {
  return DEMO_MESSAGES.filter((m) => m.channel_id === channelId);
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
