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
  draftQuestions: DraftQuestion[];
  addQuestion: (text: string) => void;
  updateQuestion: (id: string, text: string) => void;
  deleteQuestion: (id: string) => void;
  sendAllQuestions: () => void;
};

const QuestionsContext = createContext<QuestionsContextValue | null>(null);

export function QuestionsProvider({ children }: { children: ReactNode }) {
  const [draftQuestions, setDraftQuestions] = useState<DraftQuestion[]>([]);

  const addQuestion = (text: string) => {
    const normalizedText = normalizeQuestionText(text);
    if (!normalizedText) return;

    setDraftQuestions((current) => [
      ...current,
      createDraftQuestion(normalizedText),
    ]);
  };

  const updateQuestion = (id: string, text: string) => {
    setDraftQuestions((current) =>
      current.map((question) =>
        question.id === id ? { ...question, text } : question,
      ),
    );
  };

  const deleteQuestion = (id: string) => {
    setDraftQuestions((current) =>
      current.filter((question) => question.id !== id),
    );
  };

  const sendAllQuestions = () => {
    setDraftQuestions((current) =>
      current.filter((question) => !isQuestionSendable(question.text)),
    );
  };

  return (
    <QuestionsContext.Provider
      value={{
        draftQuestions,
        addQuestion,
        updateQuestion,
        deleteQuestion,
        sendAllQuestions,
      }}
    >
      {children}
    </QuestionsContext.Provider>
  );
}

export function useQuestions() {
  const context = useContext(QuestionsContext);
  if (!context) {
    throw new Error("useQuestions must be used within a QuestionsProvider");
  }
  return context;
}
