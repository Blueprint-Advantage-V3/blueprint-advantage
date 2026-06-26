import Link from "next/link";
import { Icon } from "@/components/ui/Icon";
import { Logo, LogoMark } from "@/components/brand/Logo";
import { BRAND, PRICE_DISPLAY } from "@/lib/constants";
import { AnimatedGroup } from "@/components/motion/animated-group";
import { TextEffect } from "@/components/motion/text-effect";
import { InView } from "@/components/motion/in-view";

const FEATURES = [
  { icon: "smart_display", title: "Lessons that move the needle", body: "On-demand video and notes from people who've actually built success in their field. Not theory, not influencers.", span: "lg:col-span-3" },
  { icon: "videocam", title: "Live rooms, every week", body: "Voice and video sessions where you learn in real time and get your questions answered by people who've done it.", span: "lg:col-span-3" },
  { icon: "groups", title: "A real network", body: "Mentors who've done it, plus ambitious peers you'll actually build with.", span: "lg:col-span-2" },
  { icon: "auto_awesome", title: "Your own AI tutor", body: "Stuck at midnight? Ask anything. It explains, quizzes you, and builds a plan.", span: "lg:col-span-2" },
  { icon: "military_tech", title: "Level up as you go", body: "Earn XP, climb levels, keep your streak. Progress you can feel.", span: "lg:col-span-2" },
];

const TRACKS = [
  { icon: "school", name: "Road to University", tag: "SAT · essays · applications" },
  { icon: "payments", name: "Finance", tag: "wealth · investing · leverage" },
  { icon: "gavel", name: "Law", tag: "contracts · rights · reasoning" },
  { icon: "psychology", name: "Using AI", tag: "prompt · automate · build" },
];

const STEPS = [
  { n: "1", title: "Pick your track", body: "Onboarding sets you down on the right starting track, then opens the whole library and the network." },
  { n: "2", title: "Learn and connect", body: "Watch lessons from proven mentors, then jump into the live rooms where members actually talk." },
  { n: "3", title: "Level up", body: "Earn XP, ask your AI tutor anything, and build the relationships that put you ahead." },
];

const FOUNDERS = [
  {
    name: "Wallace Chen",
    role: "Founder",
    // Drop a real photo at public/founders/wallace.jpg, then set this to "/founders/wallace.jpg".
    photo: "",
    initials: "WC",
    bio: "Add a short line about yourself.",
    credentials: ["Add a credential", "Add a credential", "Add a credential"],
    // Add real links only. Each renders a working button; leave empty and nothing renders.
    // Example: { icon: "captive_portal", label: "LinkedIn", url: "https://linkedin.com/in/your-handle" }
    socials: [] as { icon: string; label: string; url: string }[],
  },
  {
    name: "Your co-founder",
    role: "Co-founder",
    // Drop a real photo at public/founders/cofounder.jpg, then set this to "/founders/cofounder.jpg".
    photo: "",
    initials: "BA",
    bio: "Add a short line about yourself.",
    credentials: ["Add a credential", "Add a credential", "Add a credential"],
    socials: [] as { icon: string; label: string; url: string }[],
  },
];

export default function LandingPage() {
  return (
    <main className="min-h-screen bg-canvas">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-outline-variant/10 bg-canvas/80 backdrop-blur-xl">
        <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-gutter">
          <Logo href={null} wordmarkClass="text-[19px] font-medium" />
          <div className="hidden items-center gap-8 md:flex">
            {[
              ["Features", "#features"],
              ["Tracks", "#tracks"],
              ["Network", "#network"],
              ["Founders", "#founders"],
              ["Pricing", "#pricing"],
            ].map(([label, href]) => (
              <a key={href} href={href} className="font-sans text-sm text-on-surface-variant transition-colors hover:text-on-surface">
                {label}
              </a>
            ))}
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login" className="hidden rounded-lg px-4 py-2 font-sans text-sm text-on-surface transition-colors hover:bg-on-surface/[0.05] md:block">
              Log in
            </Link>
            <Link href="/signup" className="glow-button rounded-lg bg-primary-container px-5 py-2 font-sans text-sm font-medium text-on-primary-container transition active:scale-95">
              Join now
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero — centered, product shown big below */}
      <section className="relative overflow-hidden px-gutter pb-16 pt-20 text-center md:pt-28">
        {/* Haikei SVG backdrop (swap with your own export at /public/haikei-hero.svg) */}
        <img
          src="/haikei-hero.svg"
          alt=""
          aria-hidden="true"
          className="pointer-events-none absolute inset-x-0 top-0 z-0 h-[760px] w-full object-cover"
        />

        <div className="relative z-10 mx-auto flex max-w-4xl flex-col items-center">
          <AnimatedGroup preset="blur-slide" className="flex flex-col items-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-outline-variant/12 bg-surface/80 px-3.5 py-1.5 font-sans text-[13px] text-on-surface-variant backdrop-blur">
              <span className="h-1.5 w-1.5 rounded-full bg-primary" /> The members-only hub for ambitious people
            </span>
          </AnimatedGroup>

          <TextEffect
            as="h1"
            per="word"
            preset="blur"
            delay={0.15}
            className="mx-auto mt-7 max-w-4xl font-display text-[44px] font-semibold leading-[1.02] tracking-[-0.035em] text-on-surface md:text-[68px]"
          >
            Front-run the world with Blueprint Advantage.
          </TextEffect>

          <AnimatedGroup
            preset="blur-slide"
            className="flex w-full flex-col items-center"
            variants={{
              container: { hidden: {}, visible: { transition: { staggerChildren: 0.12, delayChildren: 0.5 } } },
            }}
          >
            <p className="mx-auto mt-6 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
              Learn from people who&apos;ve actually built it, then get in the room with them. A private
              network of proven mentors and driven peers, with live rooms, real lessons, and an AI tutor
              in your corner.
            </p>
            <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link href="/signup" className="glow-button w-full rounded-xl bg-primary-container px-7 py-3.5 text-center font-sans font-medium text-on-primary-container transition active:scale-[0.98] sm:w-auto">
                Join for {PRICE_DISPLAY.amount}{PRICE_DISPLAY.period}
              </Link>
              <a href="#features" className="w-full rounded-xl border border-outline-variant/15 bg-surface/60 px-7 py-3.5 text-center font-sans font-medium text-on-surface backdrop-blur transition hover:bg-on-surface/[0.05] sm:w-auto">
                See what&apos;s inside
              </a>
            </div>

            {/* Big product shot */}
            <div className="relative mx-auto mt-16 w-full max-w-4xl">
              <div className="pointer-events-none absolute -inset-x-8 -top-8 -z-10 h-full rounded-[40px] bg-primary/12 blur-[110px]" />
              <HubPreview />
            </div>
          </AnimatedGroup>
        </div>
      </section>

      {/* Features */}
      <section id="features" className="mx-auto max-w-6xl px-gutter py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[32px] font-semibold tracking-[-0.025em] text-on-surface md:text-[44px]">
            Everything you need to pull ahead.
          </h2>
          <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant">
            One membership. Lessons, live rooms, a real network, and an AI tutor, all in one place.
          </p>
        </div>
        <InView className="mt-12 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className={`${f.span} flex flex-col rounded-2xl border border-outline-variant/10 bg-surface p-6 transition hover:border-outline-variant/20`}
            >
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-primary/12 text-primary">
                <Icon name={f.icon} fill className="text-[22px]" />
              </span>
              <h3 className="mt-4 font-display text-[17px] font-semibold tracking-[-0.01em] text-on-surface">{f.title}</h3>
              <p className="mt-1.5 font-sans text-[14px] leading-relaxed text-on-surface-variant">{f.body}</p>
            </div>
          ))}
        </InView>
      </section>

      {/* Tracks */}
      <section id="tracks" className="border-t border-outline-variant/10 bg-surface-dim/40 py-24">
        <div className="mx-auto max-w-6xl px-gutter">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="font-display text-[32px] font-semibold tracking-[-0.025em] text-on-surface md:text-[44px]">
              Learn the things <span className="text-primary">school skips.</span>
            </h2>
            <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant">
              Finance, law, AI, and the road to a top university, taught by people who&apos;ve done it
              for real.
            </p>
          </div>
          <InView className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {TRACKS.map((t) => (
              <Link
                key={t.name}
                href="/signup"
                className="group flex flex-col items-start rounded-2xl border border-outline-variant/10 bg-surface p-6 transition hover:border-primary/30"
              >
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary/12 text-primary">
                  <Icon name={t.icon} fill className="text-[24px]" />
                </span>
                <h3 className="mt-4 font-display text-[17px] font-semibold text-on-surface transition-colors group-hover:text-primary">{t.name}</h3>
                <p className="mt-1 font-sans text-[13px] text-on-surface-variant">{t.tag}</p>
              </Link>
            ))}
          </InView>
        </div>
      </section>

      {/* Network */}
      <section id="network" className="mx-auto max-w-6xl px-gutter py-24">
        <InView className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <h2 className="font-display text-[30px] font-semibold leading-[1.12] tracking-[-0.025em] text-on-surface md:text-[40px]">
              It&apos;s not just what you learn. <span className="text-primary">It&apos;s who you&apos;re in the room with.</span>
            </h2>
            <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant">
              The lessons get you moving. The network is the real edge: the mentors, peers, and
              high-level connections you can&apos;t assemble on your own.
            </p>
            <ul className="mt-8 space-y-6">
              {[
                { icon: "verified", t: "Learn from people who've done it", b: "Real operators with real results, not theory and not influencers." },
                { icon: "groups", t: "Network with ambitious peers", b: "A private circle of driven members. Your future partners, hires, and friends." },
                { icon: "handshake", t: "Leverage high-level connections", b: "Introductions, access, and rooms you'd never reach from the outside." },
              ].map((p) => (
                <li key={p.t} className="flex gap-4">
                  <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-primary/12 text-primary">
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
        </InView>
      </section>

      {/* Founders — editorial rows, alternating sides */}
      <section id="founders" className="border-t border-outline-variant/10 bg-surface-dim/40 py-24">
        <div className="mx-auto max-w-6xl px-gutter">
          <div className="mx-auto max-w-2xl text-center">
            <span className="inline-flex items-center gap-2 rounded-full border border-outline-variant/12 bg-surface/80 px-3.5 py-1.5 font-sans text-[13px] text-on-surface-variant backdrop-blur">
              <Icon name="diversity_3" fill className="text-[15px] text-primary" /> Founders
            </span>
            <h2 className="mt-6 font-display text-[32px] font-semibold tracking-[-0.025em] text-on-surface md:text-[44px]">
              Meet the <span className="text-primary">founders.</span>
            </h2>
            <p className="mt-4 font-body-lg text-body-lg text-on-surface-variant">
              We built the room we wished we&apos;d had at your age. Here&apos;s who&apos;s in your corner.
            </p>
          </div>
          <InView className="mt-16 space-y-16 md:space-y-20">
            {FOUNDERS.map((f, i) => (
              <FounderRow key={f.role} founder={f} flip={i % 2 === 1} />
            ))}
          </InView>
        </div>
      </section>

      {/* AI quote */}
      <section className="border-y border-outline-variant/10 bg-surface-dim/40 py-24">
        <div className="mx-auto max-w-4xl px-gutter text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-3 py-1 font-sans text-[13px] font-medium text-primary">
            <Icon name="bolt" className="text-[14px]" /> The skill of the decade
          </span>
          <blockquote className="mx-auto mt-7 max-w-3xl font-display text-[28px] font-semibold leading-[1.2] tracking-[-0.02em] text-on-surface md:text-[38px]">
            &ldquo;AI isn&apos;t going to replace humans, but it{" "}
            <span className="text-primary">will</span> replace humans who don&apos;t know how to take
            full advantage of AI.&rdquo;
          </blockquote>
          <p className="mx-auto mt-7 max-w-2xl font-body-lg text-body-lg text-on-surface-variant">
            That&apos;s why learning to use AI right now isn&apos;t optional. School isn&apos;t teaching
            it. <span className="text-primary">We are.</span>
          </p>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="mx-auto max-w-6xl px-gutter py-24">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[30px] font-semibold tracking-[-0.025em] text-on-surface md:text-[40px]">
            Up and running in minutes.
          </h2>
        </div>
        <InView className="mt-12 grid gap-px overflow-hidden rounded-2xl border border-outline-variant/10 bg-outline-variant/10 md:grid-cols-3">
          {STEPS.map((s) => (
            <div key={s.n} className="bg-canvas p-7">
              <span className="grid h-9 w-9 place-items-center rounded-full bg-primary/12 font-sans text-sm font-semibold text-primary">
                {s.n}
              </span>
              <h3 className="mt-4 font-display text-[17px] font-semibold text-on-surface">{s.title}</h3>
              <p className="mt-2 font-body-md text-body-md text-on-surface-variant">{s.body}</p>
            </div>
          ))}
        </InView>
      </section>

      {/* Pricing */}
      <section id="pricing" className="border-t border-outline-variant/10 bg-surface-dim/40 py-24">
        <div className="mx-auto max-w-md px-gutter text-center">
          <h2 className="font-display text-[30px] font-semibold tracking-[-0.025em] text-on-surface md:text-[38px]">
            One membership. Everything in.
          </h2>
          <p className="mt-3 font-body-lg text-body-lg text-on-surface-variant">
            No tiers, no upsells. Every track, every mentor, the whole network.
          </p>
          <InView className="glow-button mt-8 rounded-2xl border border-primary/25 bg-surface p-8 text-left">
            <div className="flex items-baseline gap-1.5">
              <span className="font-display text-[48px] font-semibold leading-none tracking-tight text-on-surface">{PRICE_DISPLAY.amount}</span>
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
              className="mt-7 block w-full rounded-xl bg-primary-container py-4 text-center font-sans font-semibold text-on-primary-container transition active:scale-[0.98]"
            >
              Claim your seat
            </Link>
          </InView>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-gutter py-24 text-center">
        <h2 className="mx-auto max-w-2xl font-display text-[32px] font-semibold leading-[1.08] tracking-[-0.025em] text-on-surface md:text-[46px]">
          Start building your <span className="text-primary">advantage today.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
          Get inside a private network of ambitious people learning the skills school skips. Your seat
          is one click away.
        </p>
        <div className="mt-9">
          <Link
            href="/signup"
            className="glow-button inline-block rounded-xl bg-primary-container px-8 py-4 font-sans font-semibold text-on-primary-container transition active:scale-[0.98]"
          >
            Get started for {PRICE_DISPLAY.amount}{PRICE_DISPLAY.period}
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-outline-variant/10 py-12">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 px-gutter md:flex-row">
          <div>
            <Logo href={null} wordmarkClass="text-[17px] font-medium" />
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

/* ── The network panel — mentors + a community of peers ── */
function NetworkPanel() {
  const mentors = [
    { initial: "M", name: "Marcus Webb", role: "Investor · Finance" },
    { initial: "L", name: "Dr. Lena Ortiz", role: "Admissions · University" },
    { initial: "A", name: "Prof. Aisha Bello", role: "Attorney · Law" },
    { initial: "S", name: "Sam Reyes", role: "AI builder · Using AI" },
  ];
  return (
    <div className="rounded-2xl border border-outline-variant/10 bg-surface p-6">
      <div className="flex items-center justify-between">
        <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-outline">Inside the network</p>
        <span className="inline-flex items-center gap-1.5 font-sans text-[12px] text-on-surface-variant">
          <span className="h-1.5 w-1.5 rounded-full bg-green-500" /> live now
        </span>
      </div>
      <div className="mt-4 space-y-2">
        {mentors.map((m) => (
          <div key={m.name} className="flex items-center gap-3 rounded-xl border border-outline-variant/10 bg-surface-container px-3 py-2.5">
            <span className="grid h-9 w-9 flex-none place-items-center rounded-full bg-primary-container font-sans text-[13px] font-semibold text-on-primary-container">
              {m.initial}
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate font-sans text-[13px] font-semibold text-on-surface">{m.name}</p>
              <p className="truncate font-sans text-[11px] text-on-surface-variant">{m.role}</p>
            </div>
            <span className="flex-none rounded-md bg-primary/12 px-2 py-0.5 font-sans text-[11px] font-medium text-primary">Mentor</span>
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center gap-3 border-t border-outline-variant/10 pt-4">
        <div className="flex -space-x-2">
          {["bg-surface-container-high", "bg-surface-container-highest", "bg-surface-container-high", "bg-primary/25"].map((c, i) => (
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

/* ── One editorial founder row: portrait + story, sides alternate ── */
function FounderRow({
  founder,
  flip,
}: {
  founder: (typeof FOUNDERS)[number];
  flip: boolean;
}) {
  return (
    <div
      className={`grid items-center gap-8 md:grid-cols-[minmax(0,360px)_1fr] md:gap-14 ${
        flip ? "md:[&>*:first-child]:order-2" : ""
      }`}
    >
      {/* Portrait: real photo if provided, otherwise a clean initials tile */}
      <div className="relative mx-auto w-full max-w-[360px]">
        <div className="pointer-events-none absolute -inset-3 -z-10 rounded-[28px] bg-primary/10 blur-2xl" />
        <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-outline-variant/10 bg-surface">
          {founder.photo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={founder.photo}
              alt={`${founder.name}, ${founder.role} of ${BRAND.name}`}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="grid h-full w-full place-items-center bg-primary-container">
              <span className="font-display text-[64px] font-semibold leading-none text-on-primary-container">
                {founder.initials}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Story column */}
      <div>
        <p className="font-sans text-[11px] font-semibold uppercase tracking-widest text-primary">
          {founder.role}
        </p>
        <h3 className="mt-2 font-display text-[26px] font-semibold tracking-[-0.02em] text-on-surface md:text-[34px]">
          {founder.name}
        </h3>
        <p className="mt-4 max-w-xl font-body-lg text-body-lg text-on-surface-variant">
          {founder.bio}
        </p>
        <ul className="mt-7 space-y-3">
          {founder.credentials.map((c, ci) => (
            <li key={ci} className="flex items-center gap-3 font-sans text-sm text-on-surface">
              <Icon name="check_circle" fill className="flex-none text-[18px] text-primary" />
              {c}
            </li>
          ))}
        </ul>
        {founder.socials.length > 0 && (
          <div className="mt-7 flex flex-wrap gap-2">
            {founder.socials.map((s) => (
              <a
                key={s.url}
                href={s.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-lg border border-outline-variant/12 bg-surface px-3.5 py-2 font-sans text-[13px] font-medium text-on-surface transition hover:border-primary/30 hover:text-primary"
              >
                <Icon name={s.icon} fill className="text-[16px]" />
                {s.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── A framed preview of the actual hub ── */
function HubPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-outline-variant/12 bg-surface shadow-[0_40px_120px_-40px_rgba(29, 78, 216,0.45)]">
      <div className="flex items-center gap-2 border-b border-outline-variant/10 bg-surface-container-low px-4 py-2.5">
        <span className="h-2.5 w-2.5 rounded-full bg-outline-variant/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-outline-variant/15" />
        <span className="h-2.5 w-2.5 rounded-full bg-outline-variant/15" />
        <span className="ml-2 truncate font-sans text-[11px] text-on-surface-variant">Road to University · Lessons</span>
      </div>
      <div className="flex h-[360px] text-left">
        <div className="flex w-12 flex-none flex-col items-center gap-2.5 border-r border-outline-variant/10 bg-surface-container-low py-3">
          <LogoMark size={26} />
          <span className="mt-1 h-7 w-7 rounded-lg bg-primary-container" />
          <span className="h-7 w-7 rounded-full bg-surface-container-high" />
          <span className="h-7 w-7 rounded-full bg-surface-container-high" />
        </div>
        <div className="hidden w-44 flex-none flex-col gap-3 border-r border-outline-variant/10 p-3 sm:flex">
          <p className="px-1 text-[9px] font-bold uppercase tracking-widest text-outline">Levels</p>
          <div className="space-y-1">
            <PreviewLevel state="done" label="Level 1" />
            <PreviewLevel state="current" label="Level 2" />
            <PreviewLevel state="locked" label="Level 3" />
          </div>
          <p className="px-1 pt-1 text-[9px] font-bold uppercase tracking-widest text-outline">Channels</p>
          <div className="space-y-0.5 font-sans text-[11px]">
            <p className="rounded-md bg-primary/12 px-2 py-1 font-medium text-primary">Lessons</p>
            <p className="px-2 py-1 text-on-surface-variant">Schedule</p>
            <p className="px-2 py-1 text-on-surface-variant">general</p>
          </div>
        </div>
        <div className="min-w-0 flex-1 p-5">
          <p className="font-display text-[15px] font-semibold text-on-surface">Lessons</p>
          <p className="mb-3 font-sans text-[11px] text-on-surface-variant">On-demand lessons from your mentors.</p>
          <div className="space-y-2">
            <PreviewLesson title="SAT Math: The Foundations" by="Dr. Lena Ortiz" done />
            <PreviewLesson title="SAT Reading: The 3-pass strategy" by="Dr. Lena Ortiz" />
          </div>
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
          ? "bg-primary/12 font-medium text-primary"
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
    <div className="flex items-center gap-3 rounded-xl border border-outline-variant/10 bg-surface-container px-3 py-2.5">
      <span className="grid h-8 w-8 flex-none place-items-center rounded-lg bg-primary/12 text-primary">
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
