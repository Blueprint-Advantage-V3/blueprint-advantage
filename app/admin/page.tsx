import Link from "next/link";
import { createClient } from "@/lib/supabase/server";
import { IS_DEMO, DEMO_SPACES, DEMO_LESSONS } from "@/lib/demo";

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
    { label: "Spaces", value: spaceCount },
    { label: "Lessons", value: lessonCount },
    { label: "Active members", value: memberCount },
  ];

  return (
    <div>
      <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
      <p className="mt-1 text-muted">Manage your spaces, lessons, and content.</p>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="rounded-2xl border border-border bg-surface p-6">
            <p className="text-sm text-muted">{s.label}</p>
            <p className="mt-1 text-3xl font-bold">{s.value}</p>
          </div>
        ))}
      </div>

      <div className="mt-8">
        <Link
          href="/admin/spaces"
          className="inline-block rounded-xl bg-brand px-5 py-3 font-semibold text-white transition hover:bg-brand-hover"
        >
          Manage spaces & lessons →
        </Link>
      </div>
    </div>
  );
}
