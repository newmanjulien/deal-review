"use client";

import { useState, type ReactNode } from "react";
import { Header } from "@/components/header";
import { NotesPanel, type DraftQuestion } from "@/components/notes-panel";
import { QuestionComposerBar } from "@/components/question-composer-bar";

function createDraftQuestion(text: string): DraftQuestion {
  return {
    id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    text,
  };
}

export type CanvasPageShellMode = "full" | "canvas-only";

type CanvasPageShellProps = {
  children?: ReactNode;
  mode?: CanvasPageShellMode;
};

export function CanvasPageShell({
  children,
  mode = "full",
}: CanvasPageShellProps) {
  const showNotesExperience = mode === "full";
  const showHeader = mode !== "canvas-only";
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

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      {showHeader ? <Header /> : null}
      <div
        className={`grid min-h-0 flex-1 grid-cols-1 overflow-hidden ${
          showNotesExperience ? "lg:grid-cols-[minmax(0,1fr)_24rem]" : ""
        }`}
      >
        <section className="min-h-0 min-w-0 overflow-hidden">
          <div className="relative mx-auto h-full w-full max-w-3xl">
            <div
              className={`min-h-0 h-full overflow-x-hidden px-4 sm:px-6 lg:px-8 ${
                showNotesExperience ? "lg:pb-24" : ""
              }`}
            >
              {children}
            </div>
            {showNotesExperience ? (
              <QuestionComposerBar onAdd={handleQuestionAdd} />
            ) : null}
          </div>
        </section>
        {showNotesExperience ? (
          <div className="hidden h-full min-h-0 overflow-hidden lg:block">
            <NotesPanel
              draftQuestions={draftQuestions}
              onQuestionChange={handleQuestionChange}
              onQuestionDelete={handleQuestionDelete}
              onSendAll={handleSendAll}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export function CanvasPageShellWithNotes({
  children,
}: {
  children?: ReactNode;
}) {
  return <CanvasPageShell mode="full">{children}</CanvasPageShell>;
}

export function CanvasOnlyPageShell({ children }: { children?: ReactNode }) {
  return <CanvasPageShell mode="canvas-only">{children}</CanvasPageShell>;
}
