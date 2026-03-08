import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type CanvasHeaderFrameProps = {
  leading: ReactNode;
  trailing?: ReactNode;
  className?: string;
};

export function CanvasHeaderFrame({
  leading,
  trailing,
  className,
}: CanvasHeaderFrameProps) {
  return (
    <header
      className={cn(
        "hidden items-center border-b border-zinc-100 p-1.5 md:flex",
        className,
      )}
    >
      <div className="min-w-0 flex items-center">{leading}</div>
      {trailing ? <div className="ml-auto flex items-center">{trailing}</div> : null}
    </header>
  );
}
