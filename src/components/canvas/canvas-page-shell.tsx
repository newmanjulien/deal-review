import type { ReactNode } from "react";
import { CanvasHero } from "@/components/canvas/canvas-hero";
import { cn } from "@/lib/utils";

export type CanvasPageShellProps = {
  children?: ReactNode;
  contentMaxWidthClassName?: string;
  title?: string;
  description?: string;
};

const CANVAS_CONTENT_PADDING_TOP_CLASS_NAME = "pt-10";
export const DEFAULT_CANVAS_CONTENT_MAX_WIDTH_CLASS_NAME = "max-w-3xl";

export function CanvasPageShell({
  children,
  contentMaxWidthClassName = DEFAULT_CANVAS_CONTENT_MAX_WIDTH_CLASS_NAME,
  title,
  description,
}: CanvasPageShellProps) {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <section className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div className={cn("relative mx-auto w-full", contentMaxWidthClassName)}>
          <div
            className={cn(
              // Keep width constraints separate from overflow so the scrollbar stays on the canvas pane edge.
              "min-h-full px-4 sm:px-6 lg:px-8",
              CANVAS_CONTENT_PADDING_TOP_CLASS_NAME,
            )}
            style={{ paddingBottom: "1.5rem" }}
          >
            <CanvasHero title={title} description={description} />
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}
