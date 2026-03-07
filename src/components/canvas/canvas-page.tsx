import { CanvasPageShell } from "@/components/canvas/canvas-page-shell";
import { type CanvasPageContentProps } from "@/components/canvas/canvas-types";

export function CanvasPage({
  children,
  title,
  description,
}: CanvasPageContentProps) {
  return (
    <CanvasPageShell title={title} description={description}>
      {children}
    </CanvasPageShell>
  );
}

export function CanvasOnlyPage(props: CanvasPageContentProps) {
  return <CanvasPage {...props} />;
}

export function CanvasWidePage({
  children,
  title,
  description,
}: CanvasPageContentProps) {
  return (
    <CanvasPageShell
      contentMaxWidthClassName="max-w-8xl"
      title={title}
      description={description}
    >
      {children}
    </CanvasPageShell>
  );
}

export type { CanvasPageShellProps } from "@/components/canvas/canvas-types";
