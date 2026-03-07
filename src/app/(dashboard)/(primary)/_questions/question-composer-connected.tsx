"use client";

import { QuestionComposerBar } from "./question-composer-bar";
import { useQuestions } from "./use-questions";

export function QuestionComposerConnected() {
  const {
    actions: { handleQuestionAdd },
  } = useQuestions();

  return <QuestionComposerBar onAdd={handleQuestionAdd} />;
}
