import {
  type CanvasPageShellProps,
  type CanvasSectionTitleProps,
} from "@/components/canvas/canvas-types";
import { cn } from "@/lib/utils";

export type { CanvasPageShellProps };

const CANVAS_CONTENT_PADDING_TOP_CLASS_NAME = "pt-10";
export const DEFAULT_CANVAS_CONTENT_MAX_WIDTH_CLASS_NAME = "max-w-3xl";

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
            <CanvasSectionTitle title={title} description={description} />
            {children}
          </div>
        </div>
      </section>
    </div>
  );
}
