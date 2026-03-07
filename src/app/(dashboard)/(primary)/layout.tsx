"use client";

import type { ReactNode } from "react";
import { usePathname } from "next/navigation";
import { getPrimaryPageHeader, PrimaryHeader } from "./_header";
import { QuestionComposerBar, QuestionsPanel, useQuestions } from "./_questions";

export default function PrimaryLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const headerData = getPrimaryPageHeader(pathname);
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
      <section className="grid min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden lg:grid-rows-[auto_minmax(0,1fr)_auto]">
        <PrimaryHeader
          key={pathname}
          breadcrumbLabel={headerData.breadcrumbLabel}
          sharedPeople={headerData.sharedPeople}
        />
        <div className="min-h-0 min-w-0 overflow-hidden">
          {children}
        </div>
        <QuestionComposerBar onAdd={handleQuestionAdd} />
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
