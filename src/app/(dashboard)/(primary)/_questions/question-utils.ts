import type { DraftQuestion } from "./questions-types";

export function normalizeQuestionText(text: string): string {
  return text.trim();
}

export function isQuestionSendable(text: string): boolean {
  return normalizeQuestionText(text).length > 0;
}

export function countSendableQuestions(questions: DraftQuestion[]): number {
  return questions.filter((question) => isQuestionSendable(question.text))
    .length;
}
