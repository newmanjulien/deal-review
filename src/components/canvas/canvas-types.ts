import type { ReactNode } from "react";

export type CanvasPageShellProps = {
  children?: ReactNode;
  contentMaxWidthClassName?: string;
  title?: string;
  description?: string;
};

export type CanvasPageContentProps = Pick<
  CanvasPageShellProps,
  "children" | "title" | "description"
>;
