import type { ReactNode } from "react";
import { PrimaryHeaderSlot } from "./_header";
import {
  QuestionComposerConnected,
  QuestionsPanelConnected,
  QuestionsProvider,
} from "./_questions";

export default function PrimaryLayout({ children }: { children: ReactNode }) {
  return (
    <QuestionsProvider>
      <div className="grid min-h-0 flex-1 grid-cols-1 overflow-hidden lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section className="grid min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden lg:grid-rows-[auto_minmax(0,1fr)_auto]">
          <PrimaryHeaderSlot />
          <div className="min-h-0 min-w-0 overflow-hidden">
            {children}
          </div>
          <QuestionComposerConnected />
        </section>
        <div className="hidden h-full min-h-0 overflow-hidden lg:block">
          <QuestionsPanelConnected />
        </div>
      </div>
    </QuestionsProvider>
  );
}
