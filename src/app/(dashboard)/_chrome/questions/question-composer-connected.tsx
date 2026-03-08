"use client";

import { QuestionComposerBar } from "./question-composer-bar";
import { useQuestions } from "./use-questions";

export function QuestionComposerConnected() {
  const { addQuestion } = useQuestions();

  return <QuestionComposerBar onAdd={addQuestion} />;
}
