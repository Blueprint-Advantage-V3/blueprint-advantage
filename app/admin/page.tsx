import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { IS_DEMO, DEMO_SPACES, DEMO_LESSONS } from "@/lib/demo";
import { Icon } from "@/components/ui/Icon";

export const metadata = { title: "Admin" };

export default async function AdminDashboard() {
  let spaceCount = 0;
  let lessonCount = 0;
  let memberCount = 0;

  if (IS_DEMO) {
    spaceCount = DEMO_SPACES.length;
    lessonCount = DEMO_LESSONS.length;
    memberCount = 1;
  } else {
    const supabase = createClient();
    const [spaces, lessons, members] = await Promise.all([
      supabase.from("spaces").select("*", { count: "exact", head: true }),
      supabase.from("lessons").select("*", { count: "exact", head: true }),
      supabase
        .from("subscriptions")
        .select("*", { count: "exact", head: true })
        .in("status", ["active", "trialing"]),
    ]);
    spaceCount = spaces.count ?? 0;
    lessonCount = lessons.count ?? 0;
    memberCount = members.count ?? 0;
  }

  const stats = [
    { label: "Spaces", value: spaceCount, tone: "text-primary" },
    { label: "Lessons", value: lessonCount, tone: "text-secondary" },
    { label: "Active members", value: memberCount, tone: "text-tertiary" },
  ];

  return (
    <div className="space-y-stack_lg">
      <div>
        <h1 className="font-display text-3xl font-black tracking-tight text-on-surface">
          Dashboard
        </h1>
        <p className="mt-1 text-on-surface-variant">
          Manage your spaces, lessons, and content.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-stack_md sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="glass-panel rounded-xl p-stack_md">
            <p className="mb-1 text-xs font-bold uppercase tracking-widest text-outline">
              {s.label}
            </p>
            <p className={`text-3xl font-headline-md ${s.tone}`}>{s.value}</p>
            <div className="mt-3 h-1 w-full overflow-hidden rounded-full bg-surface-container">
              <div className="h-full w-3/4 bg-gradient-to-r from-secondary to-primary" />
            </div>
          </div>
        ))}
      </div>

      <div>
        <Link
          href="/admin/spaces"
          className="glow-button inline-flex items-center gap-2 rounded-lg bg-primary-container px-6 py-2 font-label-md font-bold text-on-primary-container transition-all active:scale-95"
        >
          Manage spaces &amp; lessons
          <Icon name="arrow_forward" className="text-base" />
        </Link>
      </div>
    </div>
  );
}
