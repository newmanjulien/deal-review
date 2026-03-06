"use client";

import { Trash2 } from "lucide-react";
import {
  type DraftQuestion,
  type QuestionsPanelProps,
} from "@/components/canvas/canvas-types";
import { Button } from "@/components/ui/button";
import { countSendableQuestions } from "./question-utils";
import { QUESTIONS_PANEL_CONFIG } from "./questions-config";

export type { DraftQuestion };

export function QuestionsPanel({
  draftQuestions,
  onQuestionChange,
  onQuestionDelete,
  onSendAll,
}: QuestionsPanelProps) {
  const sendableCount = countSendableQuestions(draftQuestions);
  const canSend = sendableCount > 0;

  return (
    <aside className="flex h-full min-h-0 w-full flex-col overflow-hidden border-l border-zinc-100 bg-white">
      <div className="flex min-h-0 flex-1 flex-col">
        <div className="min-h-0 flex-1 overflow-y-auto px-6 py-6">
          <header className="mb-5 space-y-1.5">
            <h2 className="text-sm text-zinc-900">{QUESTIONS_PANEL_CONFIG.title}</h2>
            <p className="text-xs leading-relaxed tracking-wide text-zinc-500">
              {QUESTIONS_PANEL_CONFIG.description}
            </p>
          </header>

          <section className="space-y-5">
            {draftQuestions.map((question) => (
              <article
                key={question.id}
                className="rounded-md border border-zinc-200/50 bg-white px-3 py-2.5 transition-colors hover:border-zinc-300"
              >
                <div className="mb-1 flex justify-end">
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon-xs"
                    aria-label="aria"
                    className="text-zinc-400 hover:bg-zinc-100 hover:text-zinc-700"
                    onClick={() => onQuestionDelete(question.id)}
                  >
                    <Trash2 className="size-3" />
                  </Button>
                </div>
                <textarea
                  value={question.text}
                  onChange={(event) =>
                    onQuestionChange(question.id, event.target.value)
                  }
                  rows={3}
                  placeholder={QUESTIONS_PANEL_CONFIG.questionPlaceholder}
                  className="w-full resize-y rounded-md border border-zinc-200/50 bg-zinc-50/40 px-2.5 py-2 text-xs leading-relaxed text-zinc-700 placeholder:text-zinc-400 focus-visible:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-zinc-300"
                />
                <div className="mt-2 px-1.5">
                  <p className="text-xs leading-relaxed text-zinc-400/70">
                    {QUESTIONS_PANEL_CONFIG.answerHint}
                  </p>
                </div>
              </article>
            ))}
          </section>
        </div>

        <div className="border-t border-zinc-100 px-4 py-3">
          <Button
            type="button"
            variant="secondary"
            className="h-8 w-full rounded-md border border-zinc-200 bg-zinc-100/70 text-xs font-medium leading-relaxed text-zinc-700 hover:bg-zinc-100 disabled:border-zinc-200 disabled:bg-zinc-50 disabled:text-zinc-400"
            onClick={onSendAll}
            disabled={!canSend}
          >
            {QUESTIONS_PANEL_CONFIG.sendButtonLabel}{" "}
            {canSend ? `(${sendableCount})` : ""}
          </Button>
        </div>
      </div>
    </aside>
  );
}
