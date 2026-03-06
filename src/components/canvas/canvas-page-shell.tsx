"use client";

import { Header } from "@/components/canvas/header/header";
import {
  type CanvasPageShellMode,
  type CanvasPageShellProps,
  type CanvasSectionTitleProps,
} from "@/components/canvas/canvas-types";
import { cn } from "@/lib/utils";

export type { CanvasPageShellMode, CanvasPageShellProps };

const CANVAS_CONTENT_PADDING_TOP_CLASS_NAME = "pt-10";

function CanvasSectionTitle({ title, description }: CanvasSectionTitleProps) {
  if (!title && !description) return null;

  return (
    <header className="mb-6 border-b border-zinc-100 pb-4">
      {title ? (
        <h1 className="text-sm font-medium tracking-wide text-zinc-900">
          {title}
        </h1>
      ) : null}
      {description ? (
        <p
          className={cn(
            "max-w-xl text-xs leading-relaxed tracking-wide text-zinc-500",
            title && "mt-1",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}

export function CanvasPageShell({
  children,
  mode = "full",
  contentMaxWidthClassName = "max-w-3xl",
  title,
  description,
  bottomBarSlot,
  sidePanelSlot,
}: CanvasPageShellProps) {
  const showTwoColumnLayout = mode === "full";
  const showHeader = mode !== "canvas-only";
  const showBottomBar = mode === "full" && Boolean(bottomBarSlot);
  const showSidePanel = mode === "full" && Boolean(sidePanelSlot);

  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      {showHeader ? <Header /> : null}
      <div
        className={cn(
          "grid min-h-0 flex-1 grid-cols-1 overflow-hidden",
          showTwoColumnLayout && "lg:grid-cols-[minmax(0,1fr)_24rem]",
        )}
      >
        <section className="min-h-0 min-w-0 overflow-hidden">
          <div
            className={cn(
              "relative mx-auto h-full w-full",
              contentMaxWidthClassName,
            )}
          >
            <div
              className={cn(
                "min-h-0 h-full overflow-x-hidden px-4 pb-6 sm:px-6 lg:px-8",
                CANVAS_CONTENT_PADDING_TOP_CLASS_NAME,
                showBottomBar && "lg:pb-24",
              )}
            >
              <CanvasSectionTitle title={title} description={description} />
              {children}
            </div>
            {showBottomBar ? bottomBarSlot : null}
          </div>
        </section>
        {showSidePanel ? (
          <div className="hidden h-full min-h-0 overflow-hidden lg:block">
            {sidePanelSlot}
          </div>
        ) : null}
      </div>
    </div>
  );
}
