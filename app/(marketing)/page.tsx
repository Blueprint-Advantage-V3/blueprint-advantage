import Link from "next/link";
import { BRAND, PRICE_DISPLAY } from "@/lib/constants";

const CATEGORIES = [
  { icon: "📈", name: "SAT Prep", blurb: "Proven strategies to lift your score fast." },
  { icon: "💰", name: "Finance", blurb: "Build wealth and master your money." },
  { icon: "⚖️", name: "Law", blurb: "Understand the law and protect yourself." },
  { icon: "🤖", name: "Using AI", blurb: "Leverage AI to 10x your output." },
];

const FEATURES = [
  {
    icon: "🏛️",
    title: "A hub, not a course catalog",
    body: "Log into one members-only space with a Discord-style sidebar. Switch between topics, jump into lessons, talk to the community — all in one place.",
  },
  {
    icon: "🎓",
    title: "Learn from real professors",
    body: "Every lesson is a prerecorded video from an expert, backed by written playbooks and action steps you can apply the same day.",
  },
  {
    icon: "🔊",
    title: "Voice & video rooms",
    body: "Drop into study halls, office hours, and live classes. Ask questions, get unstuck, and learn alongside other ambitious people.",
  },
  {
    icon: "💬",
    title: "A community that pushes you",
    body: "Text channels in every space keep the momentum going between lessons. Surround yourself with people leveling up.",
  },
];

const STEPS = [
  { n: "1", title: "Join", body: `Create your account and start your membership for ${PRICE_DISPLAY.amount}/month.` },
  { n: "2", title: "Pick your spaces", body: "SAT, Finance, Law, AI — open the sidebar and dive into whatever moves your life forward." },
  { n: "3", title: "Start leveling up", body: "Watch, take notes, join the rooms, and apply it. New content drops every week." },
];

const FAQ = [
  { q: "What do I get for my membership?", a: "Full access to every space and lesson, the community text channels, and the voice & video rooms. One price, everything included." },
  { q: "Can I cancel anytime?", a: "Yes. Manage or cancel your subscription in two clicks from inside the hub. No contracts, no hassle." },
  { q: "Who is this for?", a: "Ambitious people who refuse to stay average — students prepping for the SAT, anyone serious about money, and people who want to master AI and the law." },
  { q: "Do I need anything to install it?", a: "Nothing. It runs in your browser on any device — just sign up and log in. It works best on a computer but is fully usable on mobile." },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* Nav */}
      <header className="sticky top-0 z-40 border-b border-border/60 bg-canvas/80 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <span className="text-lg font-semibold tracking-tight">{BRAND.name}</span>
          <nav className="flex items-center gap-3 text-sm">
            <Link href="/login" className="hidden text-muted transition hover:text-white sm:block">
              Log in
            </Link>
            <Link
              href="/signup"
              className="rounded-lg bg-brand px-4 py-2 font-medium text-white transition hover:bg-brand-hover"
            >
              Get started
            </Link>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-6xl px-6 pb-12 pt-16 sm:pt-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <span className="inline-block rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
              A members-only hub for ambitious people
            </span>
            <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
              Stop staying average.
              <br />
              <span className="text-brand">Build your advantage.</span>
            </h1>
            <p className="mt-6 max-w-xl text-lg text-muted">
              {BRAND.promise} Video lessons from real professors, a Discord-style
              community, and live voice & video rooms — all in one place.
            </p>
            <div className="mt-9 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/signup"
                className="rounded-xl bg-brand px-7 py-3.5 text-center text-base font-semibold text-white shadow-glow transition hover:bg-brand-hover"
              >
                Get started — {PRICE_DISPLAY.amount}{PRICE_DISPLAY.period}
              </Link>
              <a
                href="#how"
                className="rounded-xl border border-border px-7 py-3.5 text-center text-base font-medium text-zinc-200 transition hover:border-zinc-600"
              >
                See how it works
              </a>
            </div>
            <p className="mt-4 text-sm text-zinc-500">
              Runs in your browser on any device. Cancel anytime.
            </p>
          </div>

          {/* Product mockup */}
          <HubMockup />
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border/60 bg-surface/40">
        <div className="mx-auto grid max-w-4xl grid-cols-3 gap-6 px-6 py-8 text-center">
          {[
            { k: "4 spaces", v: "SAT · Finance · Law · AI" },
            { k: "Weekly", v: "New lessons every week" },
            { k: "1 price", v: "Everything included" },
          ].map((s) => (
            <div key={s.k}>
              <p className="text-xl font-bold">{s.k}</p>
              <p className="mt-1 text-sm text-muted">{s.v}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Not another course site
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted">
          It feels like a serious members-only hub you log into — because it is.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-5 sm:grid-cols-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="rounded-2xl border border-border bg-surface p-7 transition hover:border-zinc-700"
            >
              <div className="text-3xl">{f.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-muted">{f.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-6xl px-6 py-12">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Your spaces
        </h2>
        <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {CATEGORIES.map((c) => (
            <div
              key={c.name}
              className="rounded-2xl border border-border bg-surface p-6 transition hover:border-zinc-700"
            >
              <div className="text-3xl">{c.icon}</div>
              <h3 className="mt-4 text-lg font-semibold">{c.name}</h3>
              <p className="mt-1.5 text-sm text-muted">{c.blurb}</p>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-6 py-20">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Up and running in minutes
        </h2>
        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="rounded-2xl border border-border bg-surface p-7">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-brand text-lg font-bold text-white">
                {s.n}
              </div>
              <h3 className="mt-4 text-lg font-semibold">{s.title}</h3>
              <p className="mt-2 text-sm text-muted">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-2xl px-6 py-12">
        <div className="rounded-3xl border border-border bg-gradient-to-b from-surface to-canvas p-10 text-center shadow-glow">
          <h2 className="text-2xl font-semibold tracking-tight">One membership. Everything.</h2>
          <div className="mt-6 flex items-end justify-center">
            <span className="text-6xl font-bold">{PRICE_DISPLAY.amount}</span>
            <span className="mb-2 ml-1 text-xl text-muted">{PRICE_DISPLAY.period}</span>
          </div>
          <ul className="mx-auto mt-8 max-w-xs space-y-3 text-left text-sm text-zinc-300">
            {[
              "Every space, every lesson",
              "Lessons from real professors",
              "Community text channels",
              "Voice & video rooms",
              "New content every week",
              "Cancel anytime",
            ].map((f) => (
              <li key={f} className="flex items-center gap-3">
                <span className="text-brand">✓</span>
                {f}
              </li>
            ))}
          </ul>
          <Link
            href="/signup"
            className="mt-9 block rounded-xl bg-brand px-7 py-3.5 text-base font-semibold text-white transition hover:bg-brand-hover"
          >
            Get started
          </Link>
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-3xl px-6 py-16">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Questions
        </h2>
        <div className="mt-10 space-y-3">
          {FAQ.map((item) => (
            <details
              key={item.q}
              className="group rounded-2xl border border-border bg-surface p-5"
            >
              <summary className="flex cursor-pointer list-none items-center justify-between font-medium">
                {item.q}
                <span className="text-muted transition group-open:rotate-45">+</span>
              </summary>
              <p className="mt-3 text-sm text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>

      {/* Final CTA */}
      <section className="mx-auto max-w-5xl px-6 py-16">
        <div className="rounded-3xl border border-border bg-brand-soft p-12 text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Your advantage starts today.
          </h2>
          <p className="mx-auto mt-3 max-w-md text-muted">
            Join {BRAND.name} and get instant access to every space, lesson, and room.
          </p>
          <Link
            href="/signup"
            className="mt-8 inline-block rounded-xl bg-brand px-8 py-3.5 text-base font-semibold text-white shadow-glow transition hover:bg-brand-hover"
          >
            Get started — {PRICE_DISPLAY.amount}{PRICE_DISPLAY.period}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/60">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-3 px-6 py-10 text-sm text-zinc-600 sm:flex-row">
          <span>© {new Date().getFullYear()} {BRAND.name}. All rights reserved.</span>
          <div className="flex gap-5">
            <Link href="/login" className="transition hover:text-zinc-300">Log in</Link>
            <Link href="/signup" className="transition hover:text-zinc-300">Get started</Link>
          </div>
        </div>
      </footer>
    </main>
  );
}

/** A stylized, Discord-style mockup of the hub for the hero. */
function HubMockup() {
  return (
    <div className="relative">
      <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-2xl">
        {/* window bar */}
        <div className="flex items-center gap-1.5 border-b border-border bg-black/30 px-4 py-2.5">
          <span className="h-3 w-3 rounded-full bg-red-500/70" />
          <span className="h-3 w-3 rounded-full bg-amber-500/70" />
          <span className="h-3 w-3 rounded-full bg-green-500/70" />
        </div>
        <div className="flex h-[320px]">
          {/* server rail */}
          <div className="flex w-12 flex-none flex-col items-center gap-2 bg-black/30 py-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-2xl bg-brand text-sm">🏠</span>
            {["📈", "💰", "⚖️", "🤖"].map((i) => (
              <span key={i} className="flex h-8 w-8 items-center justify-center rounded-2xl bg-surface-2 text-sm">
                {i}
              </span>
            ))}
          </div>
          {/* channel list */}
          <div className="w-32 flex-none border-r border-border bg-surface px-2 py-3 text-[11px]">
            <p className="px-1 pb-1 font-semibold text-zinc-100">📈 SAT Prep</p>
            <p className="px-1 pt-2 text-[9px] uppercase tracking-wider text-zinc-500">Lessons</p>
            <p className="rounded bg-brand-soft px-1.5 py-1 text-white">🎓 Lessons</p>
            <p className="px-1 pt-2 text-[9px] uppercase tracking-wider text-zinc-500">Text</p>
            <p className="px-1.5 py-1 text-zinc-400"># general</p>
            <p className="px-1 pt-2 text-[9px] uppercase tracking-wider text-zinc-500">Voice</p>
            <p className="px-1.5 py-1 text-zinc-400">🔊 Study Hall</p>
          </div>
          {/* main */}
          <div className="flex-1 p-4">
            <div className="aspect-video w-full rounded-lg bg-gradient-to-br from-brand/30 to-surface-2 ring-1 ring-border">
              <div className="flex h-full items-center justify-center">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-white/90 text-brand">▶</span>
              </div>
            </div>
            <p className="mt-3 text-sm font-semibold text-zinc-100">SAT Math: The Foundations</p>
            <p className="text-xs text-zinc-500">Dr. Lena Ortiz · Video + notes</p>
          </div>
        </div>
      </div>
      <div className="pointer-events-none absolute -inset-4 -z-10 rounded-3xl bg-brand/20 blur-3xl" />
    </div>
  );
}
