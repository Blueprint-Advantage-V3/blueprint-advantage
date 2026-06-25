"use client";

import { useProgress, XP_PER_LESSON } from "@/lib/progress";
import { Icon } from "@/components/ui/Icon";

/**
 * "Mark as Complete" — awards XP toward the campus rank and fires confetti
 * on rank-up (handled inside the progress store).
 */
export function LessonComplete({
  campus,
  lessonId,
}: {
  campus: string;
  lessonId: string;
}) {
  const { isComplete, completeLesson } = useProgress();
  const done = isComplete(lessonId);

  return (
    <button
      type="button"
      onClick={() => !done && completeLesson(campus, lessonId)}
      disabled={done}
      className={
        done
          ? "flex items-center gap-3 rounded-xl bg-earned/15 px-8 py-4 font-headline-md text-headline-md text-earned"
          : "flex items-center gap-3 rounded-xl bg-primary-container px-8 py-4 font-headline-md text-headline-md text-on-primary-container transition-all hover:opacity-90 active:scale-95"
      }
    >
      <Icon name={done ? "task_alt" : "check_circle"} fill />
      {done ? "Completed" : `Mark as Complete  ·  +${XP_PER_LESSON} XP`}
    </button>
  );
}
