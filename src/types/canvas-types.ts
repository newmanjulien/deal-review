import type { ReactElement, ReactNode } from "react";

export type CanvasPageShellMode = "full" | "canvas-only";

export type CanvasPageShellProps = {
  children?: ReactNode;
  mode?: CanvasPageShellMode;
  contentMaxWidthClassName?: string;
  title?: string;
  description?: string;
  bottomBarSlot?: ReactNode;
  sidePanelSlot?: ReactNode;
};

export type CanvasPageContentProps = Pick<
  CanvasPageShellProps,
  "children" | "title" | "description"
>;

export type CanvasPageVariantProps = CanvasPageContentProps &
  Pick<CanvasPageShellProps, "mode" | "contentMaxWidthClassName">;

export type CanvasSectionTitleProps = {
  title?: string;
  description?: string;
};

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

export type HeaderPerson = {
  name: string;
  avatar: string;
};

export type HeaderMenuAlign = "start" | "center" | "end";

export type HeaderMenuProps = {
  trigger: ReactElement;
  children: ReactNode;
  id?: string;
  align?: HeaderMenuAlign;
  sideOffset?: number;
  className?: string;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  modal?: boolean;
};
