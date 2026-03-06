"use client";

import { CanvasPageShell } from "@/components/canvas/canvas-page-shell";
import { QuestionsPanel } from "@/components/canvas/questions/questions-panel";
import { QuestionComposerBar } from "@/components/canvas/questions/question-composer-bar";
import { useQuestions } from "@/lib/use-questions";
import { type CanvasPageShellProps } from "@/types/canvas-types";

type CanvasPageShellWithQuestionsClientProps = Omit<
  CanvasPageShellProps,
  "mode" | "bottomBarSlot" | "sidePanelSlot"
>;

export function CanvasPageShellWithQuestionsClient({
  children,
  contentMaxWidthClassName,
  title,
  description,
}: CanvasPageShellWithQuestionsClientProps) {
  const {
    draftQuestions,
    handleQuestionAdd,
    handleQuestionChange,
    handleQuestionDelete,
    handleSendAll,
  } = useQuestions();

  return (
    <CanvasPageShell
      mode="full"
      contentMaxWidthClassName={contentMaxWidthClassName}
      title={title}
      description={description}
      bottomBarSlot={<QuestionComposerBar onAdd={handleQuestionAdd} />}
      sidePanelSlot={
        <QuestionsPanel
          draftQuestions={draftQuestions}
          onQuestionChange={handleQuestionChange}
          onQuestionDelete={handleQuestionDelete}
          onSendAll={handleSendAll}
        />
      }
    >
      {children}
    </CanvasPageShell>
  );
}
