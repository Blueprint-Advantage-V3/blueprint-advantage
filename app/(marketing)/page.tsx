import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Logo, LogoMark } from "@/components/brand/Logo";
import { BRAND, PRICE_DISPLAY } from "@/lib/constants";

const TRACKS = [
  {
    icon: "school",
    name: "Road to University",
    tag: "SAT · essays · applications",
    points: ["SAT math & reading systems", "Standout personal essays", "Applications that get you in"],
  },
  {
    icon: "payments",
    name: "Finance",
    tag: "wealth · investing · leverage",
    points: ["Budgeting that actually sticks", "Investing from zero", "Build real, lasting leverage"],
  },
  {
    icon: "gavel",
    name: "Law",
    tag: "contracts · rights · reasoning",
    points: ["What makes a contract binding", "Know & protect your rights", "Sharp legal reasoning"],
  },
  {
    icon: "psychology",
    name: "Using AI",
    tag: "prompt · automate · build",
    points: ["Prompting that gets results", "Automate your busywork", "10x your everyday output"],
  },
];

const STEPS = [
  { n: "1", title: "Pick your track", body: "Onboarding drops you on the right starting track, then opens up everything else to explore." },
  { n: "2", title: "Learn & apply", body: "Watch lessons from real professors, take notes, and join the live voice & video rooms." },
  { n: "3", title: "Level up", body: "Earn XP, climb your levels, and ask your AI tutor anything. New content drops every week." },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-outline-variant/10 bg-canvas/85 backdrop-blur-md">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-gutter">
          <Logo href={null} size={30} wordmarkClass="text-[19px] font-medium" />
          <div className="hidden items-center gap-8 md:flex">
            {[
              ["Curriculum", "#tracks"],
              ["Network", "#network"],
              ["How it works", "#how"],
              ["Pricing", "#pricing"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="font-sans text-sm text-on-surface-variant transition-colors hover:text-on-surface">
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden rounded-lg px-4 py-2 font-sans text-sm text-on-surface transition-colors hover:bg-on-surface/[0.04] md:block">
              Log in
            </Link>
            <Link href="/signup" className="rounded-lg bg-primary-container px-5 py-2 font-sans text-sm font-medium text-on-primary-container transition hover:brightness-95 active:scale-95">
              Join now
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero — product-led, two-column */}
      <section className="px-gutter pb-16 pt-16 md:pt-24">
        <div className="mx-auto grid max-w-6xl items-center gap-12 lg:grid-cols-[1.05fr_1fr] lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-outline-variant/15 bg-surface px-3 py-1.5 font-sans text-[13px] text-on-surface-variant">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> The members-only hub for ambitious people
            </span>
            <h1 className="mt-6 font-display text-[40px] font-semibold leading-[1.05] tracking-tight text-on-surface md:text-[58px]">
              Front-run the world with <span className="text-primary">Blueprint Advantage</span>.
            </h1>
            <p className="mt-6 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
              Learn from people who&apos;ve actually built success — across finance, law, AI, the road
              to university, and more. Then get in the room with them: a private network of mentors and
              ambitious peers, live rooms, and connections you can&apos;t get on your own.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/signup" className="rounded-xl bg-primary-container px-7 py-3.5 text-center font-sans font-medium text-on-primary-container transition hover:brightness-95 active:scale-[0.98]">
                Join for {PRICE_DISPLAY.amount}{PRICE_DISPLAY.period}
              </Link>
              <a href="#how" className="rounded-xl border border-outline-variant/20 px-7 py-3.5 text-center font-sans font-medium text-on-surface transition hover:bg-on-surface/[0.04]">
                See how it works
              </a>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-2 font-sans text-[13px] text-on-surface-variant">
              {["Mentors who've done it", "A network you can leverage", "Live rooms + AI tutor"].map((f) => (
                <span key={f} className="inline-flex items-center gap-1.5">
                  <Icon name="check_circle" fill className="text-[16px] text-primary" /> {f}
                </span>
              ))}
            </div>
          </div>

          <div className="lg:pl-4">
            <HubPreview />
          </div>
        </div>
      </section>

      {/* Tracks */}
      <section id="tracks" className="mx-auto max-w-6xl px-gutter py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-[30px] font-semibold tracking-tight text-on-surface md:text-[38px]">
            Learn the things school skips.
          </h2>
          <p className="mt-3 font-body-lg text-body-lg text-on-surface-variant">
            Finance, law, AI, the road to university — and more added over time. Pick where you want to
            win first, then explore the rest. Every track is taught by people who&apos;ve actually done it.
          </p>
        </div>
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {TRACKS.map((t) => (
            <div
              key={t.name}
              className="flex flex-col rounded-2xl border border-outline-variant/15 bg-surface p-6 transition hover:border-outline-variant/30 hover:shadow-card"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 text-primary">
                <Icon name={t.icon} fill className="text-[24px]" />
              </span>
              <h3 className="mt-4 font-display text-[18px] font-semibold text-on-surface">{t.name}</h3>
              <p className="mt-1 font-sans text-[13px] text-on-surface-variant">{t.tag}</p>
              <ul className="mt-4 space-y-2.5 border-t border-outline-variant/10 pt-4">
                {t.points.map((p) => (
                  <li key={p} className="flex items-start gap-2 font-sans text-[13px] leading-snug text-on-surface-variant">
                    <Icon name="check" className="mt-px flex-none text-[16px] text-primary" /> {p}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="mt-5 flex flex-col items-start justify-between gap-4 rounded-2xl border border-dashed border-outline-variant/25 bg-surface-container-low px-6 py-5 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-surface text-on-surface-variant">
              <Icon name="add" className="text-[22px]" />
            </span>
            <div>
              <p className="font-display text-[15px] font-semibold text-on-surface">More on the way</p>
              <p className="font-sans text-[13px] text-on-surface-variant">
                These are just the start — new tracks get added over time.
              </p>
            </div>
          </div>
          <Link href="/signup" className="flex-none rounded-lg border border-outline-variant/20 px-4 py-2 font-sans text-sm text-on-surface transition hover:bg-on-surface/[0.04]">
            Join &amp; help shape what&apos;s next
          </Link>
        </div>
      </section>

      {/* The network */}
      <section id="network" className="mx-auto max-w-6xl px-gutter py-20">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <span className="inline-flex items-center gap-2 rounded-full border border-outline-variant/15 bg-surface px-3 py-1.5 font-sans text-[13px] text-on-surface-variant">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> The network
            </span>
            <h2 className="mt-6 font-display text-[30px] font-semibold leading-tight tracking-tight text-on-surface md:text-[38px]">
              It&apos;s not just what you learn. It&apos;s who you&apos;re in the room with.
            </h2>
            <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant">
              The lessons get you moving. The network is the real advantage — the people, mentors, and
              connections you can&apos;t build on your own.
            </p>
            <ul className="mt-8 space-y-6">
              {[
                { icon: "verified", t: "Learn from people who've done it", b: "Mentors who've actually built success in their field — not theory, not influencers." },
                { icon: "groups", t: "Network with ambitious peers", b: "A private community of driven members leveling up right alongside you — your future circle." },
                { icon: "handshake", t: "Leverage high-level connections", b: "Access, introductions, and rooms you simply can't get on the outside." },
              ].map((p) => (
                <li key={p.t} className="flex gap-4">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-primary/10 text-primary">
                    <Icon name={p.icon} fill className="text-[20px]" />
                  </span>
                  <div>
                    <h3 className="font-display text-[16px] font-semibold text-on-surface">{p.t}</h3>
                    <p className="mt-0.5 font-body-md text-body-md text-on-surface-variant">{p.b}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <NetworkPanel />
        </div>
      </section>

      {/* Why AI now — editorial pull-quote */}
      <section className="border-y border-outline-variant/15 bg-surface-container-low py-24">
        <div className="mx-auto max-w-4xl px-gutter text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-sans text-[13px] font-medium text-primary">
            <Icon name="bolt" className="text-[14px]" /> The skill of the decade
          </span>
          <blockquote className="mx-auto mt-7 max-w-3xl font-body-md text-[27px] font-medium leading-[1.3] text-on-surface md:text-[38px]">
            &ldquo;AI isn&apos;t going to replace humans — but it{" "}
            <span className="text-primary">will</span> replace humans who don&apos;t know how to take
            full advantage of AI.&rdquo;
          </blockquote>
          <p className="mx-auto mt-7 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            That&apos;s why learning to use AI right now isn&apos;t optional. It&apos;s rewriting every
            industry in real time — the people who wield it today are doing the work of ten. School
            isn&apos;t teaching it. <span className="text-primary">We are.</span>
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-gutter py-20">
        <div className="max-w-2xl">
          <h2 className="font-display text-[30px] font-semibold tracking-tight text-on-surface md:text-[38px]">
            Up and running in minutes.
          </h2>
          <p className="mt-3 font-body-lg text-body-lg text-on-surface-variant">
            Three steps from sign-up to your first lesson.
          </p>
        </div>
        <div className="mt-10 grid gap-px overflow-hidden rounded-2xl border border-outline-variant/15 bg-outline-variant/10 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-canvas p-7">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/10 font-sans text-sm font-semibold text-primary">
                {s.n}
              </span>
              <h3 className="mt-4 font-display text-[18px] font-semibold text-on-surface">{s.title}</h3>
              <p className="mt-2 font-body-md text-body-md text-on-surface-variant">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-outline-variant/15 bg-surface-container-low py-24">
        <div className="mx-auto max-w-md px-gutter text-center">
          <h2 className="font-display text-[30px] font-semibold tracking-tight text-on-surface md:text-[36px]">
            One membership. Everything in.
          </h2>
          <p className="mt-3 font-body-lg text-body-lg text-on-surface-variant">
            No tiers, no upsells — every track, every lesson, the whole community.
          </p>
          <div className="mt-8 rounded-2xl border border-outline-variant/15 bg-surface p-8 text-left shadow-card">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-[46px] font-semibold leading-none text-on-surface">{PRICE_DISPLAY.amount}</span>
              <span className="font-sans text-on-surface-variant">{PRICE_DISPLAY.period}</span>
            </div>
            <p className="mt-1.5 font-sans text-[13px] text-on-surface-variant">No contracts. Cancel anytime.</p>
            <ul className="mt-6 space-y-3 border-t border-outline-variant/10 pt-6">
              {[
                "Every track, every lesson",
                "Mentors who've actually done it",
                "A network of ambitious peers",
                "Live rooms + your own AI tutor",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3 font-sans text-sm text-on-surface">
                  <Icon name="check_circle" fill className="flex-none text-[18px] text-primary" /> {f}
                </li>
              ))}
            </ul>
            <Link
              href="/signup"
              className="mt-7 block w-full rounded-xl bg-primary-container py-4 text-center font-sans font-semibold text-on-primary-container transition hover:brightness-95 active:scale-[0.98]"
            >
              Claim your seat
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-gutter py-24 text-center">
        <h2 className="mx-auto max-w-2xl font-display text-[32px] font-semibold tracking-tight text-on-surface md:text-[44px]">
          Start building your advantage today.
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
          Join a network of ambitious people learning the skills school skips — and leveraging each
          other to pull ahead.
        </p>
        <div className="mt-8">
          <Link
            href="/signup"
            className="inline-block rounded-xl bg-primary-container px-8 py-4 font-sans font-semibold text-on-primary-container transition hover:brightness-95 active:scale-[0.98]"
          >
            Get started — {PRICE_DISPLAY.amount}{PRICE_DISPLAY.period}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-outline-variant/15 bg-surface-container-low py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-gutter md:flex-row">
          <div>
            <Logo href={null} size={26} wordmarkClass="text-[17px] font-medium" />
            <p className="mt-2 font-sans text-[13px] text-on-surface-variant">
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </p>
          </div>
          <div className="flex gap-8 font-sans text-sm">
            <Link href="/login" className="text-on-surface-variant transition-colors hover:text-primary">Log in</Link>
            <Link href="/signup" className="text-on-surface-variant transition-colors hover:text-primary">Get started</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

/* ── The network panel — mentors who've done it + a community of peers ── */
function NetworkPanel() {
  const mentors = [
    { initial: "M", name: "Marcus Webb", role: "Investor · Finance" },
    { initial: "L", name: "Dr. Lena Ortiz", role: "Admissions · University" },
    { initial: "A", name: "Prof. Aisha Bello", role: "Attorney · Law" },
    { initial: "S", name: "Sam Reyes", role: "AI builder · Using AI" },
  ];
  return (
    <div className="rounded-2xl border border-outline-variant/15 bg-surface p-6 shadow-[0_24px_70px_-28px_rgba(20,20,19,0.25)]">
      <div className="flex items-center justify-between">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-outline">Inside the network</p>
        <span className="inline-flex items-center gap-1.5 font-sans text-[12px] text-on-surface-variant">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> live now
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {mentors.map((m) => (
          <div key={m.name} className="flex items-center gap-3 rounded-xl border border-outline-variant/10 bg-surface px-3 py-2.5">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-primary-container font-sans text-[13px] font-semibold text-on-primary-container">
              {m.initial}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-sans text-[13px] font-semibold text-on-surface">{m.name}</p>
              <p className="truncate font-sans text-[11px] text-on-surface-variant">{m.role}</p>
            </div>
            <span className="flex-none rounded-md bg-primary/10 px-2 py-0.5 font-sans text-[11px] font-medium text-primary">Mentor</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 border-t border-outline-variant/10 pt-4">
        <div className="flex -space-x-2">
          {["bg-surface-container-high", "bg-surface-container-highest", "bg-surface-container-high", "bg-primary/20"].map((c, i) => (
            <span key={i} className={`h-8 w-8 rounded-full border-2 border-surface ${c}`} />
          ))}
        </div>
        <p className="font-sans text-[13px] text-on-surface-variant">
          <span className="font-semibold text-on-surface">+ a community</span> of ambitious members
        </p>
      </div>
    </div>
  );
}

/* ── A framed preview of the actual hub — makes the hero product-led ── */
function HubPreview() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-outline-variant/15 bg-surface shadow-[0_24px_70px_-24px_rgba(20,20,19,0.28)]">
        {/* window title bar */}
        <div className="flex items-center gap-2 border-b border-outline-variant/10 bg-surface-container-low px-4 py-2.5">
          <span className="h-2.5 w-2.5 rounded-full bg-outline-variant/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-outline-variant/25" />
          <span className="h-2.5 w-2.5 rounded-full bg-outline-variant/25" />
          <span className="ml-2 truncate font-sans text-[11px] text-on-surface-variant">Road to University · Lessons</span>
        </div>
        {/* window body */}
        <div className="flex h-[340px] text-left">
          {/* rail */}
          <div className="flex w-12 flex-none flex-col items-center gap-2.5 border-r border-outline-variant/10 bg-surface-container-low py-3">
            <LogoMark size={26} />
            <span className="mt-1 h-7 w-7 rounded-lg bg-primary-container" />
            <span className="h-7 w-7 rounded-full bg-surface-container-high" />
            <span className="h-7 w-7 rounded-full bg-surface-container-high" />
          </div>
          {/* channel sidebar */}
          <div className="hidden w-40 flex-none flex-col gap-3 border-r border-outline-variant/10 p-3 sm:flex">
            <p className="px-1 text-[9px] font-bold uppercase tracking-widest text-outline">Levels</p>
            <div className="space-y-1">
              <PreviewLevel state="done" label="Level 1" />
              <PreviewLevel state="current" label="Level 2" />
              <PreviewLevel state="locked" label="Level 3" />
            </div>
            <p className="px-1 pt-1 text-[9px] font-bold uppercase tracking-widest text-outline">Channels</p>
            <div className="space-y-0.5 font-sans text-[11px]">
              <p className="rounded-md bg-primary/10 px-2 py-1 font-medium text-primary">Lessons</p>
              <p className="px-2 py-1 text-on-surface-variant">Schedule</p>
              <p className="px-2 py-1 text-on-surface-variant">general</p>
            </div>
          </div>
          {/* main */}
          <div className="min-w-0 flex-1 p-4">
            <p className="font-display text-[15px] font-semibold text-on-surface">Lessons</p>
            <p className="mb-3 font-sans text-[11px] text-on-surface-variant">Prerecorded lessons from your professors.</p>
            <div className="space-y-2">
              <PreviewLesson title="SAT Math: The Foundations" by="Dr. Lena Ortiz" done />
              <PreviewLesson title="SAT Reading: The 3-pass strategy" by="Dr. Lena Ortiz" />
            </div>
          </div>
        </div>
      </div>
      {/* floating "earned" badge */}
      <div className="absolute -bottom-4 -left-3 hidden items-center gap-2.5 rounded-xl border border-outline-variant/15 bg-surface px-3 py-2 shadow-card sm:flex">
        <span className="grid h-7 w-7 place-items-center rounded-lg bg-earned/15 text-earned">
          <Icon name="military_tech" fill className="text-[16px]" />
        </span>
        <div className="leading-tight">
          <p className="font-sans text-[11px] font-semibold text-on-surface">Level 2 reached</p>
          <p className="font-sans text-[10px] text-on-surface-variant">+100 XP earned</p>
        </div>
      </div>
    </div>
  );
}

function PreviewLevel({ state, label }: { state: "done" | "current" | "locked"; label: string }) {
  return (
    <div
      className={[
        "flex items-center gap-2 rounded-md px-2 py-1 font-sans text-[11px]",
        state === "current"
          ? "bg-primary/10 font-medium text-primary"
          : state === "locked"
          ? "text-on-surface-variant opacity-40"
          : "text-on-surface-variant",
      ].join(" ")}
    >
      <Icon
        name={state === "locked" ? "lock" : "military_tech"}
        fill={state !== "locked"}
        className={`text-[14px] ${state === "done" ? "text-earned" : ""}`}
      />
      {label}
      {state === "done" && <Icon name="check_circle" fill className="ml-auto text-[12px] text-earned" />}
    </div>
  );
}

function PreviewLesson({ title, by, done }: { title: string; by: string; done?: boolean }) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-outline-variant/12 bg-surface px-3 py-2.5">
      <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-primary/10 text-primary">
        <Icon name="smart_display" fill className="text-[16px]" />
      </span>
      <div className="min-w-0 flex-1">
        <p className="truncate font-sans text-[12px] font-semibold text-on-surface">{title}</p>
        <p className="truncate font-sans text-[10px] text-on-surface-variant">{by} · Video + notes</p>
      </div>
      <Icon
        name={done ? "check_circle" : "play_circle"}
        fill
        className={`flex-none text-[16px] ${done ? "text-primary" : "text-outline"}`}
      />
    </div>
  );
}
