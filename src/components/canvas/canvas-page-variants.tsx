"use client";

import { CanvasPageShellWithQuestionsClient } from "@/components/canvas/canvas-page-questions-client";
import { CanvasPageShell as CanvasPageLayoutShell } from "@/components/canvas/canvas-page-shell";
import {
  type CanvasPageContentProps,
  type CanvasPageShellProps,
  type CanvasPageShellMode,
  type CanvasPageVariantProps,
} from "@/components/canvas/canvas-types";

function CanvasPageShellByMode({
  children,
  mode = "full",
  contentMaxWidthClassName,
  title,
  description,
  bottomBarSlot,
  sidePanelSlot,
}: CanvasPageShellProps) {
  const hasCustomSlots = Boolean(bottomBarSlot) || Boolean(sidePanelSlot);

  if (mode === "canvas-only" || hasCustomSlots) {
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

function CanvasPageVariant({
  children,
  title,
  description,
  mode,
  contentMaxWidthClassName,
}: CanvasPageVariantProps) {
  return (
    <CanvasPageShellByMode
      mode={mode}
      contentMaxWidthClassName={contentMaxWidthClassName}
      title={title}
      description={description}
    >
      {children}
    </CanvasPageShellByMode>
  );
}

export function CanvasPage({
  children,
  title,
  description,
}: CanvasPageContentProps) {
  return (
    <CanvasPageVariant mode="full" title={title} description={description}>
      {children}
    </CanvasPageVariant>
  );
}

export function CanvasOnlyPage({
  children,
  title,
  description,
}: CanvasPageContentProps) {
  return (
    <CanvasPageVariant mode="canvas-only" title={title} description={description}>
      {children}
    </CanvasPageVariant>
  );
}

export function CanvasWidePage({
  children,
  title,
  description,
}: CanvasPageContentProps) {
  return (
    <CanvasPageVariant
      mode="canvas-only"
      contentMaxWidthClassName="max-w-6xl"
      title={title}
      description={description}
    >
      {children}
    </CanvasPageVariant>
  );
}

export function CanvasPageShellWithNotes({
  children,
  title,
  description,
}: CanvasPageContentProps) {
  return (
    <CanvasPage title={title} description={description}>
      {children}
    </CanvasPage>
  );
}

export function CanvasOnlyPageShell({
  children,
  title,
  description,
}: CanvasPageContentProps) {
  return (
    <CanvasOnlyPage title={title} description={description}>
      {children}
    </CanvasOnlyPage>
  );
}

export function CanvasWidePageShell({
  children,
  title,
  description,
}: CanvasPageContentProps) {
  return (
    <CanvasWidePage title={title} description={description}>
      {children}
    </CanvasWidePage>
  );
}

export function CanvasPageShell(props: CanvasPageShellProps) {
  return <CanvasPageShellByMode {...props} />;
}

export type { CanvasPageShellMode, CanvasPageShellProps };
