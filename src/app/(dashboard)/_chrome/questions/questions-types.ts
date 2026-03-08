export type DraftQuestion = {
  id: string;
  text: string;
};

export type QuestionsPanelProps = {
  draftQuestions: DraftQuestion[];
  onQuestionChange: (id: string, text: string) => void;
  onQuestionDelete: (id: string) => void;
  onSendAll: () => void;
};

export type QuestionComposerBarProps = {
  onAdd: (text: string) => void;
};
