"use client";

import { QuestionsPanel } from "./questions-panel";
import { useQuestions } from "./use-questions";

export function QuestionsPanelConnected() {
  const {
    state: { draftQuestions },
    actions: {
      handleQuestionChange,
      handleQuestionDelete,
      handleSendAll,
    },
  } = useQuestions();

  return (
    <QuestionsPanel
      draftQuestions={draftQuestions}
      onQuestionChange={handleQuestionChange}
      onQuestionDelete={handleQuestionDelete}
      onSendAll={handleSendAll}
    />
  );
}
