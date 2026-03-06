import type { ReactElement, ReactNode } from "react";

export type CanvasPageShellMode = "full" | "canvas-only";

export type CanvasPageShellProps = {
  children?: ReactNode;
  mode?: CanvasPageShellMode;
  contentMaxWidthClassName?: string;
  title?: string;
  description?: string;
};

export type CanvasPageContentProps = Pick<
  CanvasPageShellProps,
  "children" | "title" | "description"
>;

export type CanvasSectionTitleProps = {
  title?: string;
  description?: string;
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
