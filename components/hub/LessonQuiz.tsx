"use client";

import { useState } from "react";
import { Icon } from "@/components/ui/Icon";
import { useProgress } from "@/lib/progress";

export type QuizQuestion = { q: string; options: string[]; answer: number };

/**
 * Knowledge check: a few MCQs after a lesson. Passing (all correct) marks the
 * lesson complete and awards XP via the progress store.
 */
export function LessonQuiz({
  campus,
  lessonId,
  questions,
}: {
  campus: string;
  lessonId: string;
  questions: QuizQuestion[];
}) {
  const { isComplete, completeLesson } = useProgress();
  const alreadyPassed = isComplete(lessonId);

  const [picks, setPicks] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);

  const correct = questions.filter((q, i) => picks[i] === q.answer).length;
  const passed = correct === questions.length;
  const answeredAll = Object.keys(picks).length === questions.length;

  function submit() {
    setSubmitted(true);
    if (questions.every((q, i) => picks[i] === q.answer)) {
      completeLesson(campus, lessonId);
    }
  }

  function retry() {
    setPicks({});
    setSubmitted(false);
  }

  return (
    <div className="rounded-2xl border border-outline-variant/10 bg-surface p-6">
      <div className="mb-1 flex items-center justify-between">
        <h3 className="flex items-center gap-2 font-display text-[16px] font-semibold text-on-surface">
          <Icon name="quiz" fill className="text-[20px] text-primary" /> Knowledge check
        </h3>
        {(alreadyPassed || (submitted && passed)) && (
          <span className="inline-flex items-center gap-1 rounded-full bg-earned/12 px-2.5 py-1 font-sans text-[12px] font-medium text-earned">
            <Icon name="verified" fill className="text-[14px]" /> Passed
          </span>
        )}
      </div>
      <p className="mb-5 font-sans text-[13px] text-on-surface-variant">
        Answer all {questions.length} correctly to pass and earn XP.
      </p>

      <div className="space-y-6">
        {questions.map((q, qi) => {
          const picked = picks[qi];
          return (
            <div key={qi}>
              <p className="mb-2.5 font-sans text-[14px] font-medium text-on-surface">
                {qi + 1}. {q.q}
              </p>
              <div className="space-y-2">
                {q.options.map((opt, oi) => {
                  const isPicked = picked === oi;
                  const isAnswer = q.answer === oi;
                  let tone =
                    "border-outline-variant/12 text-on-surface-variant hover:border-outline-variant/25";
                  if (submitted) {
                    if (isAnswer) tone = "border-green-500/50 bg-green-500/10 text-on-surface";
                    else if (isPicked) tone = "border-error/50 bg-error/10 text-on-surface";
                    else tone = "border-outline-variant/12 text-on-surface-variant opacity-60";
                  } else if (isPicked) {
                    tone = "border-primary/60 bg-primary/10 text-on-surface";
                  }
                  return (
                    <button
                      key={oi}
                      type="button"
                      disabled={submitted}
                      onClick={() => setPicks((p) => ({ ...p, [qi]: oi }))}
                      className={`flex w-full items-center gap-3 rounded-lg border px-3.5 py-2.5 text-left font-sans text-[13px] transition ${tone}`}
                    >
                      <span
                        className={`grid h-5 w-5 flex-none place-items-center rounded-full border text-[11px] ${
                          isPicked || (submitted && isAnswer) ? "border-current" : "border-outline-variant/30"
                        }`}
                      >
                        {String.fromCharCode(65 + oi)}
                      </span>
                      <span className="flex-1">{opt}</span>
                      {submitted && isAnswer && <Icon name="check" className="text-[16px] text-green-500" />}
                      {submitted && isPicked && !isAnswer && <Icon name="close" className="text-[16px] text-error" />}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex items-center gap-3">
        {!submitted ? (
          <button
            type="button"
            onClick={submit}
            disabled={!answeredAll}
            className="rounded-xl bg-primary-container px-6 py-3 font-sans text-sm font-medium text-on-primary-container transition active:scale-[0.98] disabled:opacity-40"
          >
            Submit answers
          </button>
        ) : passed ? (
          <p className="font-sans text-sm font-medium text-green-400">
            🎉 Perfect score. Lesson complete, XP earned.
          </p>
        ) : (
          <>
            <button
              type="button"
              onClick={retry}
              className="rounded-xl border border-outline-variant/20 px-6 py-3 font-sans text-sm font-medium text-on-surface transition hover:bg-on-surface/[0.05]"
            >
              Try again
            </button>
            <p className="font-sans text-sm text-on-surface-variant">
              {correct}/{questions.length} correct. Review and retake.
            </p>
          </>
        )}
      </div>
    </div>
  );
}
