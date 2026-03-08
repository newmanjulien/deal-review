"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import type { DraftQuestion } from "./questions-types";
import {
  isQuestionSendable,
  normalizeQuestionText,
} from "./question-utils";

function createDraftQuestion(text: string): DraftQuestion {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
  };
}

type QuestionsContextValue = {
  state: {
    draftQuestions: DraftQuestion[];
  };
  actions: {
    handleQuestionAdd: (text: string) => void;
    handleQuestionChange: (id: string, text: string) => void;
    handleQuestionDelete: (id: string) => void;
    handleSendAll: () => void;
  };
};

const QuestionsContext = createContext<QuestionsContextValue | null>(null);

function useCreateQuestionsContextValue(): QuestionsContextValue {
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
    state: {
      draftQuestions,
    },
    actions: {
      handleQuestionAdd,
      handleQuestionChange,
      handleQuestionDelete,
      handleSendAll,
    },
  };
}

export function QuestionsProvider({ children }: { children: ReactNode }) {
  const value = useCreateQuestionsContextValue();
  return <QuestionsContext.Provider value={value}>{children}</QuestionsContext.Provider>;
}

export function useQuestions() {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error("useQuestions must be used within a QuestionsProvider");
  }
  return context;
}
