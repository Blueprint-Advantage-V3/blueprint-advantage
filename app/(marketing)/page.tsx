import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { BRAND, PRICE_DISPLAY } from "@/lib/constants";

const FEATURES = [
  {
    icon: "school",
    accent: "text-primary",
    title: "SAT Mastery",
    body: "Proprietary strategies for the 1600 club, taught by top-percentile scorers. Lift your score fast.",
    cta: "Explore curriculum",
    ctaIcon: "arrow_forward",
    span: "md:col-span-3",
    blob: "absolute top-0 right-0 w-32 h-32 bg-primary/20 blur-[80px] group-hover:bg-primary/40 transition-all",
  },
  {
    icon: "payments",
    accent: "text-secondary",
    title: "High Finance",
    body: "From the fundamentals to personal wealth-building systems. Master your money and build real leverage.",
    cta: "Capital mastery",
    ctaIcon: "trending_up",
    span: "md:col-span-3",
    blob: "absolute bottom-0 right-0 w-48 h-24 bg-secondary/10 blur-[60px]",
  },
  {
    icon: "psychology",
    accent: "text-primary",
    title: "Using AI",
    body: "Leverage AI to 10x your output and stay ahead of the curve.",
    span: "md:col-span-2",
    featured: true,
  },
  {
    icon: "gavel",
    accent: "text-tertiary",
    title: "Law & Logic",
    body: "Understand the law, sharpen your reasoning, and protect yourself.",
    span: "md:col-span-2",
  },
  {
    icon: "campaign",
    accent: "text-on-surface",
    title: "The Community",
    body: "Discord-style spaces, live voice & video rooms, and a network that pushes you forward.",
    span: "md:col-span-2",
    bgClass: "bg-surface-container-high",
  },
];

const STEPS = [
  { n: "1", title: "Join", body: `Create your account and start your membership for ${PRICE_DISPLAY.amount}${PRICE_DISPLAY.period}.` },
  { n: "2", title: "Pick your spaces", body: "SAT, Finance, Law, AI — open the sidebar and dive into whatever moves your life forward." },
  { n: "3", title: "Start leveling up", body: "Watch, take notes, join the rooms, and apply it. New content drops every week." },
];

export default function LandingPage() {
  return (
    <main className="relative min-h-screen overflow-x-hidden bg-canvas">
      {/* Fixed blurred header */}
      <header className="fixed top-0 z-50 w-full border-b border-outline-variant/10 bg-surface/70 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-gutter">
          <span className="font-display text-headline-md font-black uppercase tracking-tighter text-primary">
            {BRAND.name}
          </span>
          <div className="hidden items-center gap-stack_lg md:flex">
            <a href="#features" className="font-label-md text-label-md text-on-surface-variant transition-all hover:text-on-surface">
              Curriculum
            </a>
            <a href="#how" className="font-label-md text-label-md text-on-surface-variant transition-all hover:text-on-surface">
              How it works
            </a>
            <a href="#pricing" className="font-label-md text-label-md text-on-surface-variant transition-all hover:text-on-surface">
              Pricing
            </a>
          </div>
          <div className="flex items-center gap-4">
            <Link
              href="/login"
              className="hidden rounded-lg border border-outline-variant/30 px-4 py-2 font-label-md text-label-md text-on-surface transition-all hover:bg-white/5 md:flex"
            >
              Log in
            </Link>
            <Link
              href="/signup"
              className="glow-button rounded-lg bg-primary-container px-6 py-2 font-label-md text-label-md font-bold text-on-primary-container transition-all active:scale-95"
            >
              Join Now
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-margin_mobile pt-24">
        <div className="pointer-events-none absolute left-1/2 top-1/3 -z-10 h-[700px] w-[700px] -translate-x-1/2 rounded-full bg-primary/5 blur-[120px]" />
        <div className="relative z-10 mx-auto max-w-content_max_width text-center">
          <div className="mb-stack_lg inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-label-md text-label-md text-primary">
            <Icon name="stars" className="text-[14px]" />
            A members-only hub for ambitious people
          </div>
          <h1 className="mb-stack_md bg-gradient-to-b from-on-surface to-on-surface-variant bg-clip-text font-display text-[48px] font-black leading-[1] tracking-tighter text-transparent md:text-[80px]">
            Stop staying average.
            <br />
            Build your advantage.
          </h1>
          <p className="mx-auto mb-stack_lg max-w-2xl font-body-lg text-body-lg text-on-surface-variant/80">
            {BRAND.promise} Video lessons from real professors, a Discord-style
            community, and live voice & video rooms. One subscription. Infinite leverage.
          </p>
          <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
            <Link
              href="/signup"
              className="glow-button w-full rounded-xl bg-primary-container px-10 py-5 font-headline-md text-headline-md font-bold text-on-primary-container transition-transform hover:scale-[1.02] md:w-auto"
            >
              Join for {PRICE_DISPLAY.amount}{PRICE_DISPLAY.period}
            </Link>
            <a
              href="#how"
              className="w-full rounded-xl border border-outline-variant/30 px-10 py-5 font-headline-md text-headline-md font-medium text-on-surface transition-all hover:bg-white/5 md:w-auto"
            >
              See how it works
            </a>
          </div>
          <div className="mt-stack_lg flex items-center justify-center gap-stack_md font-label-md text-label-md text-on-surface-variant/60">
            <div className="flex -space-x-2">
              <div className="h-8 w-8 rounded-full border-2 border-background bg-surface-container-high" />
              <div className="h-8 w-8 rounded-full border-2 border-background bg-surface-container-highest" />
              <div className="h-8 w-8 rounded-full border-2 border-background bg-surface-container-high" />
            </div>
            <span>Joined by ambitious members leveling up</span>
          </div>
        </div>
        {/* Scroll indicator */}
        <div className="absolute bottom-10 left-1/2 flex -translate-x-1/2 animate-bounce flex-col items-center gap-2 opacity-40">
          <span className="font-label-md text-label-md uppercase tracking-widest">Explore</span>
          <Icon name="expand_more" />
        </div>
      </section>

      {/* Bento feature grid */}
      <section id="features" className="mx-auto mb-20 max-w-7xl px-gutter py-stack_lg">
        <div className="mb-stack_lg">
          <h2 className="mb-2 font-headline-lg text-headline-lg">Architecting Success</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            One hub. Every pillar of the {BRAND.shortName} ecosystem.
          </p>
        </div>
        <div className="grid h-auto grid-cols-1 gap-4 md:h-[600px] md:grid-cols-6 md:grid-rows-2">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`group glass-card relative flex flex-col justify-between overflow-hidden rounded-2xl p-stack_lg ${f.span} ${
                f.featured ? "primary-gradient-border" : ""
              } ${f.bgClass ?? ""}`}
            >
              {f.blob && <div className={f.blob} />}
              <div>
                <Icon name={f.icon} className={`mb-4 text-[32px] ${f.accent}`} />
                <h3 className="mb-2 font-headline-md text-headline-md">{f.title}</h3>
                <p className="font-body-md text-body-md text-on-surface-variant/80">{f.body}</p>
              </div>
              {f.cta && (
                <div className={`mt-4 flex items-center gap-2 font-label-md ${f.accent}`}>
                  <span>{f.cta}</span>
                  <Icon name={f.ctaIcon ?? "arrow_forward"} className="text-[16px]" />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-7xl px-gutter py-stack_lg">
        <div className="mb-stack_lg text-center">
          <h2 className="mb-2 font-headline-lg text-headline-lg">Up and running in minutes</h2>
          <p className="font-body-md text-body-md text-on-surface-variant">
            Three steps from sign-up to leveling up.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="glass-panel rounded-2xl p-stack_lg">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-container font-headline-md font-bold text-on-primary-container">
                {s.n}
              </div>
              <h3 className="mt-4 font-headline-md text-headline-md">{s.title}</h3>
              <p className="mt-2 font-body-md text-body-md text-on-surface-variant">{s.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Pricing */}
      <section id="pricing" className="relative overflow-hidden bg-surface-container-lowest py-24">
        <div className="relative z-10 mx-auto flex max-w-7xl flex-col items-center gap-stack_lg px-gutter md:flex-row">
          <div className="flex-1 text-center md:text-left">
            <h2 className="mb-stack_md font-display text-display text-on-primary-container">
              Infinite Leverage.
              <br />
              One Membership.
            </h2>
            <p className="mb-8 max-w-lg font-body-lg text-body-lg text-on-surface-variant/80">
              {BRAND.name} is not a course. It is an ecosystem of knowledge designed
              for those who refuse to be average.
            </p>
            <ul className="inline-block space-y-4 text-left md:block">
              {[
                "Every space, every lesson",
                "Lessons from real professors",
                "Private community networking",
                "Weekly live voice & video rooms",
              ].map((f) => (
                <li key={f} className="flex items-center gap-3">
                  <Icon name="check_circle" fill className="text-[20px] text-primary" />
                  <span className="font-body-md text-body-md">{f}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="glass-card w-full max-w-md rounded-[2rem] border-2 border-primary/20 p-stack_lg shadow-2xl shadow-primary/10">
            <div className="mb-8 text-center">
              <span className="font-label-md text-label-md font-bold uppercase tracking-widest text-primary">
                Standard Access
              </span>
              <div className="mt-4 flex items-baseline justify-center gap-1">
                <span className="font-display text-[64px] leading-none">{PRICE_DISPLAY.amount}</span>
                <span className="font-headline-md text-on-surface-variant/60">{PRICE_DISPLAY.period}</span>
              </div>
              <p className="mt-2 font-body-md text-body-md text-on-surface-variant">
                No contracts. Cancel anytime.
              </p>
            </div>
            <Link
              href="/signup"
              className="glow-button block w-full rounded-2xl bg-primary-container py-6 text-center font-headline-md text-headline-md font-black text-on-primary-container transition-transform active:scale-95"
            >
              Claim Your Seat
            </Link>
            <p className="mt-6 px-4 text-center font-label-md text-label-md text-on-surface-variant/40">
              Runs in your browser on any device. Everything included, one price.
            </p>
          </div>
        </div>
        <div className="absolute left-1/2 top-1/2 -z-10 h-[800px] w-[800px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary/5 blur-[120px]" />
      </section>

      {/* Scarcity / final CTA */}
      <section className="relative px-gutter py-24 text-center">
        <h2 className="mb-stack_md font-display text-headline-lg md:text-display">Doors closing soon.</h2>
        <p className="mx-auto mb-stack_lg max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
          We limit membership to keep the network sharp. Secure your position in {BRAND.name} today.
        </p>
        <div className="flex flex-col items-center justify-center gap-6 md:flex-row">
          <div className="flex flex-col items-center">
            <span className="font-display text-headline-md">158</span>
            <span className="font-label-md text-label-md uppercase text-on-surface-variant">Spots Left</span>
          </div>
          <div className="hidden h-10 w-px bg-outline-variant/30 md:block" />
          <div className="flex flex-col items-center">
            <span className="font-display text-headline-md">24/7</span>
            <span className="font-label-md text-label-md uppercase text-on-surface-variant">Community</span>
          </div>
          <div className="hidden h-10 w-px bg-outline-variant/30 md:block" />
          <div className="flex flex-col items-center">
            <span className="font-display text-headline-md">Weekly</span>
            <span className="font-label-md text-label-md uppercase text-on-surface-variant">New Drops</span>
          </div>
        </div>
        <div className="mt-stack_lg">
          <Link
            href="/signup"
            className="glow-button inline-block rounded-xl bg-primary-container px-10 py-5 font-headline-md text-headline-md font-bold text-on-primary-container transition-transform hover:scale-[1.02]"
          >
            Get started — {PRICE_DISPLAY.amount}{PRICE_DISPLAY.period}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-outline-variant/10 bg-surface-container-lowest py-stack_lg">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-stack_md px-gutter md:flex-row">
          <div>
            <span className="font-headline-md text-headline-md font-bold uppercase tracking-tighter text-primary">
              {BRAND.name}
            </span>
            <p className="mt-1 font-label-md text-label-md text-on-surface-variant/60">
              © {new Date().getFullYear()} {BRAND.name}. All rights reserved.
            </p>
          </div>
          <div className="flex gap-stack_lg font-label-md text-label-md">
            <Link href="/login" className="text-on-surface-variant transition-colors hover:text-primary">
              Log in
            </Link>
            <Link href="/signup" className="text-on-surface-variant transition-colors hover:text-primary">
              Get started
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}
