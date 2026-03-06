"use client";

import { useState } from "react";
import type { DraftQuestion } from "@/types/canvas-types";
import { isQuestionSendable, normalizeQuestionText } from "@/lib/question-utils";

function createDraftQuestion(text: string): DraftQuestion {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
  };
}

export function useQuestions() {
  const [draftQuestions, setDraftQuestions] = useState<DraftQuestion[]>([]);

  const handleQuestionAdd = (text: string) => {
    const normalizedText = normalizeQuestionText(text);
    if (!normalizedText) return;

    setDraftQuestions((current) => [
      ...current,
      createDraftQuestion(normalizedText),
    ]);
  };

  const handleQuestionChange = (id: string, text: string) => {
    setDraftQuestions((current) =>
      current.map((question) =>
        question.id === id ? { ...question, text } : question,
      ),
    );
  };

  const handleQuestionDelete = (id: string) => {
    setDraftQuestions((current) =>
      current.filter((question) => question.id !== id),
    );
  };

  const handleSendAll = () => {
    setDraftQuestions((current) => {
      const remainingQuestions = current.filter(
        (question) => !isQuestionSendable(question.text),
      );

      return remainingQuestions.length === current.length
        ? current
        : remainingQuestions;
    });
  };

  return {
    draftQuestions,
    handleQuestionAdd,
    handleQuestionChange,
    handleQuestionDelete,
    handleSendAll,
  };
}
