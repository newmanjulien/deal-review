"use client";

import { useState } from "react";
import type { DraftQuestion } from "@/types/canvas-types";

function createDraftQuestion(text: string): DraftQuestion {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
  };
}

export function useQuestions() {
  const [draftQuestions, setDraftQuestions] = useState<DraftQuestion[]>([]);

  const handleQuestionAdd = (text: string) => {
    setDraftQuestions((current) => [...current, createDraftQuestion(text)]);
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
    const hasSendableQuestion = draftQuestions.some(
      (question) => question.text.trim().length > 0,
    );
    if (!hasSendableQuestion) return;
  };

  return {
    draftQuestions,
    handleQuestionAdd,
    handleQuestionChange,
    handleQuestionDelete,
    handleSendAll,
  };
}
