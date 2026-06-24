"use client";

import { useProgress } from "@/lib/progress";
import { Icon } from "@/components/ui/Icon";

/** Live XP / lessons / streak cards on the hub home. */
export function ProgressStats() {
  const { totalXp, lessonsCompleted, streak } = useProgress();
  const stats = [
    { label: "Total XP", value: totalXp.toLocaleString(), icon: "bolt", color: "text-primary" },
    { label: "Lessons done", value: String(lessonsCompleted), icon: "task_alt", color: "text-secondary" },
    { label: "Day streak", value: String(streak), icon: "local_fire_department", color: "text-tertiary" },
  ];
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {stats.map((s) => (
        <div key={s.label} className="glass-panel rounded-xl p-stack_md">
          <p className="mb-1 text-[10px] font-bold uppercase text-on-surface-variant">
            {s.label}
          </p>
          <div className="flex items-end justify-between">
            <span className={`text-3xl font-bold ${s.color}`}>{s.value}</span>
            <Icon name={s.icon} fill className={`${s.color} opacity-50`} />
          </div>
        </div>
      ))}
    </div>
  );
}
