"use client";

import { CanvasPageShell } from "@/components/canvas/canvas-page-shell";
import {
  type CanvasPageContentProps,
  type CanvasPageShellMode,
  type CanvasPageShellProps,
} from "@/components/canvas/canvas-types";

function renderCanvasPage({
  children,
  mode = "full",
  contentMaxWidthClassName,
  title,
  description,
}: CanvasPageShellProps) {
  return (
    <CanvasPageShell
      mode={mode}
      contentMaxWidthClassName={contentMaxWidthClassName}
      title={title}
      description={description}
    >
      {children}
    </CanvasPageShell>
  );
}

export function CanvasPage({
  children,
  title,
  description,
}: CanvasPageContentProps) {
  return renderCanvasPage({ children, mode: "full", title, description });
}

export function CanvasOnlyPage({
  children,
  title,
  description,
}: CanvasPageContentProps) {
  return renderCanvasPage({
    children,
    mode: "canvas-only",
    title,
    description,
  });
}

export function CanvasWidePage({
  children,
  title,
  description,
}: CanvasPageContentProps) {
  return renderCanvasPage({
    children,
    mode: "canvas-only",
    contentMaxWidthClassName: "max-w-8xl",
    title,
    description,
  });
}

export type { CanvasPageShellMode, CanvasPageShellProps };
