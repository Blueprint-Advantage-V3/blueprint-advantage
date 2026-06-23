import Link from "next/link";
import { createClient } from "@/lib/supabase/server";

export const metadata = { title: "Admin" };

export default async function AdminDashboard() {
  const supabase = createClient();
  const [{ count: spaceCount }, { count: lessonCount }, { count: memberCount }] =
    await Promise.all([
      supabase.from("spaces").select("*", { count: "exact", head: true }),
      supabase.from("lessons").select("*", { count: "exact", head: true }),
      supabase
        .from("subscriptions")
        .select("*", { count: "exact", head: true })
        .in("status", ["active", "trialing"]),
    ]);

  const stats = [
    { label: "Spaces", value: spaceCount ?? 0 },
    { label: "Lessons", value: lessonCount ?? 0 },
    { label: "Active members", value: memberCount ?? 0 },
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
