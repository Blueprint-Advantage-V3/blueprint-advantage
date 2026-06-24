"use client";

import { useProgress } from "@/lib/progress";
import { Icon } from "@/components/ui/Icon";

/** Trailing indicator on a lesson row: a check once completed, else a play. */
export function LessonStatus({ lessonId }: { lessonId: string }) {
  const { isComplete } = useProgress();
  const done = isComplete(lessonId);
  return (
    <span
      className={`ml-auto flex h-8 w-8 flex-none items-center justify-center rounded-full transition-colors ${
        done ? "text-secondary" : "text-outline group-hover:text-primary"
      }`}
    >
      <Icon name={done ? "check_circle" : "play_arrow"} fill />
    </span>
  );
}
