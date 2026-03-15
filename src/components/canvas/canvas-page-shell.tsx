import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CanvasPageShellProps = {
  children?: ReactNode;
  hero?: ReactNode;
  contentMaxWidthClassName?: string;
  fillHeight?: boolean;
};

const CANVAS_CONTENT_PADDING_TOP_CLASS_NAME = "pt-8";
export const DEFAULT_CANVAS_CONTENT_MAX_WIDTH_CLASS_NAME = "max-w-3xl";

export function CanvasPageShell({
  children,
  hero,
  contentMaxWidthClassName = DEFAULT_CANVAS_CONTENT_MAX_WIDTH_CLASS_NAME,
  fillHeight = false,
}: CanvasPageShellProps) {
  return (
    <div className="flex h-full min-h-0 flex-1 flex-col overflow-hidden">
      <section className="min-h-0 min-w-0 flex-1 overflow-x-hidden overflow-y-auto">
        <div
          className={cn(
            "relative mx-auto w-full",
            fillHeight && "h-full min-h-0",
            contentMaxWidthClassName,
          )}
        >
          <div
            className={cn(
              // Keep width constraints separate from overflow so the scrollbar stays on the canvas pane edge.
              "min-h-full px-4 sm:px-6 lg:px-8",
              CANVAS_CONTENT_PADDING_TOP_CLASS_NAME,
              fillHeight && "flex h-full min-h-full flex-col",
            )}
            style={{ paddingBottom: "1.5rem" }}
          >
            {hero}
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}
