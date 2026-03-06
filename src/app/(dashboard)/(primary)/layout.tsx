"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { PrimaryHeader } from "./_header";
import { QuestionComposerBar, QuestionsPanel, useQuestions } from "./_questions";

export default function PrimaryLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const {
    state: { draftQuestions },
    actions: {
      handleQuestionAdd,
      handleQuestionChange,
      handleQuestionDelete,
      handleSendAll,
    },
  } = useQuestions();

  return (
    <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,1fr)_22rem]">
      <section className="flex min-h-0 min-w-0 flex-col overflow-hidden">
        <PrimaryHeader key={pathname} />
        <div className="relative min-h-0 min-w-0 flex-1 overflow-hidden [--canvas-content-bottom-inset:0rem] lg:[--canvas-content-bottom-inset:4.5rem]">
          {children}
          <QuestionComposerBar onAdd={handleQuestionAdd} />
        </div>
      </section>
      <div className="hidden h-full min-h-0 overflow-hidden lg:block">
        <QuestionsPanel
          draftQuestions={draftQuestions}
          onQuestionChange={handleQuestionChange}
          onQuestionDelete={handleQuestionDelete}
          onSendAll={handleSendAll}
        />
      </div>
    </div>
  );
}
