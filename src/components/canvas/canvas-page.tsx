import type { ComponentProps, ReactNode } from "react";
import { CanvasPageShell } from "@/components/canvas/canvas-page-shell";

type CanvasPageContentProps = Pick<
  ComponentProps<typeof CanvasPageShell>,
  "children" | "fillHeight"
>;

type CanvasPageProps = CanvasPageContentProps & {
  hero?: ReactNode;
};

export function CanvasPage({
  children,
  fillHeight,
  hero,
}: CanvasPageProps) {
  return (
    <CanvasPageShell hero={hero} fillHeight={fillHeight}>
      {children}
    </CanvasPageShell>
  );
}

export function CanvasOnlyPage(props: CanvasPageProps) {
  return <CanvasPage {...props} />;
}

export function CanvasWidePage({
  children,
  fillHeight,
  hero,
}: CanvasPageProps) {
  return (
    <CanvasPageShell
      contentMaxWidthClassName="max-w-8xl"
      hero={hero}
      fillHeight={fillHeight}
    >
      {children}
    </CanvasPageShell>
  );
}

export type { CanvasPageShellProps } from "@/components/canvas/canvas-page-shell";
