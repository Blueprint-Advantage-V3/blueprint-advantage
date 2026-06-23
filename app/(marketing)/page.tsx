import Link from "next/link";
import { BRAND, PRICE_DISPLAY } from "@/lib/constants";

const CATEGORIES = [
  { icon: "📈", name: "SAT Prep", blurb: "Proven strategies to lift your score fast." },
  { icon: "💰", name: "Finance", blurb: "Build wealth and master your money." },
  { icon: "⚖️", name: "Law", blurb: "Understand the law and protect yourself." },
  { icon: "🤖", name: "Using AI", blurb: "Leverage AI to 10x your output." },
];

const BENEFITS = [
  { title: "Video lessons", body: "Sharp, no-fluff lessons you can watch on any device, anytime." },
  { title: "Written playbooks", body: "Every lesson backed by notes and action steps you can apply today." },
  { title: "One serious hub", body: "All your growth in one members-only space — not scattered across ten apps." },
  { title: "New drops weekly", body: "Fresh content across every space so you keep compounding." },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* Nav */}
      <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <span className="text-lg font-semibold tracking-tight">{BRAND.name}</span>
        <nav className="flex items-center gap-3 text-sm">
          <Link href="/login" className="text-muted transition hover:text-white">
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-lg bg-brand px-4 py-2 font-medium text-white transition hover:bg-brand-hover"
          >
            Join now
          </Link>
        </nav>
      </header>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-6 pb-20 pt-16 text-center sm:pt-24">
        <span className="inline-block rounded-full border border-border bg-surface px-4 py-1.5 text-xs font-medium text-muted">
          A members-only hub for ambitious people
        </span>
        <h1 className="mt-6 text-4xl font-bold leading-[1.1] tracking-tight sm:text-6xl">
          Stop staying average.
          <br />
          <span className="text-brand">Build your advantage.</span>
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted">
          {BRAND.promise} One membership, one hub, everything you need to get
          ahead — SAT, finance, law, and AI.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/signup"
            className="rounded-xl bg-brand px-7 py-3.5 text-base font-semibold text-white shadow-glow transition hover:bg-brand-hover"
          >
            Join for {PRICE_DISPLAY.amount}{PRICE_DISPLAY.period}
          </Link>
          <Link
            href="/login"
            className="rounded-xl border border-border px-7 py-3.5 text-base font-medium text-zinc-200 transition hover:border-zinc-600"
          >
            I'm already a member
          </Link>
        </div>
        <p className="mt-4 text-sm text-zinc-500">Cancel anytime. Card required.</p>
      </section>

      {/* Categories / spaces */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="text-center text-2xl font-semibold tracking-tight sm:text-3xl">
          Everything lives in your hub
        </h2>
        <p className="mx-auto mt-3 max-w-xl text-center text-muted">
          Log in and pick a space. Lessons load instantly — no hopping between
          courses.
        </p>
        <div className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
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

      {/* Benefits */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          {BENEFITS.map((b) => (
            <div key={b.title} className="flex gap-4">
              <div className="mt-1 h-6 w-6 flex-none rounded-full bg-brand-soft text-center text-sm leading-6 text-brand">
                ✓
              </div>
              <div>
                <h3 className="font-semibold">{b.title}</h3>
                <p className="mt-1 text-sm text-muted">{b.body}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section className="mx-auto max-w-2xl px-6 py-16">
        <div className="rounded-3xl border border-border bg-gradient-to-b from-surface to-canvas p-10 text-center shadow-glow">
          <h2 className="text-2xl font-semibold tracking-tight">Membership</h2>
          <div className="mt-6 flex items-end justify-center">
            <span className="text-6xl font-bold">{PRICE_DISPLAY.amount}</span>
            <span className="mb-2 ml-1 text-xl text-muted">{PRICE_DISPLAY.period}</span>
          </div>
          <ul className="mx-auto mt-8 max-w-xs space-y-3 text-left text-sm text-zinc-300">
            {[
              "Every space, every lesson",
              "Video + written playbooks",
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
            Join {BRAND.name}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="mx-auto max-w-6xl px-6 py-12 text-center text-sm text-zinc-600">
        © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
      </footer>
    </main>
  );
}
