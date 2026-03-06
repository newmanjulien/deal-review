"use client";

import { CanvasPageShellWithQuestionsClient } from "@/components/canvas/canvas-page-questions-client";
import { CanvasPageShell as CanvasPageLayoutShell } from "@/components/canvas/canvas-page-shell";
import {
  type CanvasPageContentProps,
  type CanvasPageShellProps,
  type CanvasPageShellMode,
} from "@/components/canvas/canvas-types";

function renderCanvasPageShell({
  children,
  mode = "full",
  contentMaxWidthClassName,
  title,
  description,
  bottomBarSlot,
  sidePanelSlot,
}: CanvasPageShellProps) {
  const hasCustomSlots = Boolean(bottomBarSlot) || Boolean(sidePanelSlot);

  if (mode === "full" && !hasCustomSlots) {
    return (
      <CanvasPageShellWithQuestionsClient
        contentMaxWidthClassName={contentMaxWidthClassName}
        title={title}
        description={description}
      >
        {children}
      </CanvasPageShellWithQuestionsClient>
    );
  }

  return (
    <CanvasPageLayoutShell
      mode={mode}
      contentMaxWidthClassName={contentMaxWidthClassName}
      title={title}
      description={description}
      bottomBarSlot={bottomBarSlot}
      sidePanelSlot={sidePanelSlot}
    >
      {children}
    </CanvasPageLayoutShell>
  );
}

export function CanvasPage({
  children,
  title,
  description,
}: CanvasPageContentProps) {
  return renderCanvasPageShell({ children, mode: "full", title, description });
}

export function CanvasOnlyPage({
  children,
  title,
  description,
}: CanvasPageContentProps) {
  return renderCanvasPageShell({
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
  return renderCanvasPageShell({
    children,
    mode: "canvas-only",
    contentMaxWidthClassName: "max-w-8xl",
    title,
    description,
  });
}

export const CanvasPageShellWithNotes = CanvasPage;
export const CanvasOnlyPageShell = CanvasOnlyPage;
export const CanvasWidePageShell = CanvasWidePage;

export function CanvasPageShell(props: CanvasPageShellProps) {
  return renderCanvasPageShell(props);
}

export type { CanvasPageShellMode, CanvasPageShellProps };
