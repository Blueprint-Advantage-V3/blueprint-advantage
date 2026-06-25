import { Icon } from "@/components/ui/Icon";

export const metadata = { title: "Members" };

const MENTORS = [
  { name: "Marcus Webb", role: "Investor · Finance", initial: "M" },
  { name: "Dr. Lena Ortiz", role: "Admissions · University", initial: "L" },
  { name: "Prof. Aisha Bello", role: "Attorney · Law", initial: "A" },
  { name: "Sam Reyes", role: "AI builder · Using AI", initial: "S" },
];

const MEMBERS = ["Maya R.", "Jordan T.", "Sofia K.", "Priya N.", "Andre L.", "Leo M.", "Tariq H.", "Bea L."];

export default function MembersPage() {
  return (
    <div className="mx-auto max-w-4xl px-gutter py-stack_lg">
      <header>
        <h1 className="font-serif text-[30px] font-medium tracking-tight text-on-surface md:text-[36px]">
          Members
        </h1>
        <p className="mt-2 font-body-lg text-body-lg text-on-surface-variant">
          The people you&apos;re in the room with. Learn from the mentors, build with the members.
        </p>
      </header>

      <h2 className="mb-3 mt-9 font-display text-[13px] font-semibold uppercase tracking-widest text-outline">
        Mentors
      </h2>
      <div className="grid gap-3 sm:grid-cols-2">
        {MENTORS.map((m) => (
          <div key={m.name} className="flex items-center gap-3 rounded-2xl border border-outline-variant/12 bg-surface p-4">
            <span className="grid h-11 w-11 flex-none place-items-center rounded-full bg-primary-container font-display text-sm font-semibold text-on-primary-container">
              {m.initial}
            </span>
            <div className="min-w-0">
              <p className="font-display text-[15px] font-semibold text-on-surface">{m.name}</p>
              <p className="font-sans text-[12px] text-on-surface-variant">{m.role}</p>
            </div>
            <span className="ml-auto flex-none rounded-md bg-clay/10 px-2 py-0.5 font-sans text-[11px] font-medium text-clay">
              Mentor
            </span>
          </div>
        ))}
      </div>

      <h2 className="mb-3 mt-10 font-display text-[13px] font-semibold uppercase tracking-widest text-outline">
        Members
      </h2>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
        {MEMBERS.map((n) => (
          <div key={n} className="flex flex-col items-center gap-2 rounded-2xl border border-outline-variant/12 bg-surface p-4 text-center">
            <span className="grid h-12 w-12 place-items-center rounded-full bg-surface-container-high font-display text-base font-semibold text-on-surface-variant">
              {n.charAt(0)}
            </span>
            <p className="truncate font-sans text-[13px] font-medium text-on-surface">{n}</p>
          </div>
        ))}
      </div>

      <p className="mt-8 flex items-center justify-center gap-2 font-sans text-[13px] text-on-surface-variant">
        <Icon name="lock" className="text-[16px]" /> Member profiles unlock once you join.
      </p>
    </div>
  );
}
