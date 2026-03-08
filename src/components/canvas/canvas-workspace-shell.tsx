import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CanvasWorkspaceShellProps = {
  header: ReactNode;
  children: ReactNode;
  rightPanel?: ReactNode;
  showRightPanel?: boolean;
  bottomBar?: ReactNode;
  className?: string;
};

export function CanvasWorkspaceShell({
  header,
  children,
  rightPanel,
  showRightPanel = Boolean(rightPanel),
  bottomBar,
  className,
}: CanvasWorkspaceShellProps) {
  const hasBottomBar = Boolean(bottomBar);
  const hasRightPanel = showRightPanel && Boolean(rightPanel);

  return (
    <div
      className={cn(
        "grid min-h-0 flex-1 grid-cols-1 overflow-hidden",
        hasRightPanel && "lg:grid-cols-[minmax(0,1fr)_22rem]",
        className,
      )}
    >
      <section
        className={cn(
          "grid min-h-0 min-w-0 grid-rows-[auto_minmax(0,1fr)] overflow-hidden",
          hasBottomBar && "lg:grid-rows-[auto_minmax(0,1fr)_auto]",
        )}
      >
        {header}
        <div className="min-h-0 min-w-0 overflow-hidden">
          {children}
        </div>
        {bottomBar ?? null}
      </section>
      {hasRightPanel ? (
        <aside className="hidden h-full min-h-0 overflow-hidden lg:block">
          {rightPanel}
        </aside>
      ) : null}
    </div>
  );
}
