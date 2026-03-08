const QUESTIONS_RECIPIENT = "Julien";

export const QUESTION_COMPOSER_CONFIG = {
  maxHeightPx: 160,
  placeholder: "Type a potential question",
  addButtonLabel: "Add",
} as const;

export const QUESTIONS_PANEL_CONFIG = {
  title: `Questions for ${QUESTIONS_RECIPIENT}`,
  description: `We can send your questions as meeting notes so ${QUESTIONS_RECIPIENT} can start preparing answers ahead of your meeting`,
  questionPlaceholder: "Ask a clear, specific question",
  answerHint: `${QUESTIONS_RECIPIENT} may add a preliminary answer`,
  sendButtonLabel: `Send to ${QUESTIONS_RECIPIENT}`,
} as const;
