import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type DesktopChromeHeaderShellProps = {
  leading: ReactNode;
  trailing?: ReactNode;
  className?: string;
};

export function DesktopChromeHeaderShell({
  leading,
  trailing,
  className,
}: DesktopChromeHeaderShellProps) {
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

type MobileChromeHeaderShellProps = {
  left: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
  className?: string;
  centerClassName?: string;
};

export function MobileChromeHeaderShell({
  left,
  center,
  right,
  className,
  centerClassName,
}: MobileChromeHeaderShellProps) {
  return (
    <header
      className={cn(
        "relative flex h-11 items-center border-b border-zinc-100 bg-white px-[var(--shell-gutter-mobile)] md:hidden",
        className,
      )}
    >
      {left}
      {right ? <div className="ml-auto">{right}</div> : null}
      {center ? (
        <div
          className={cn(
            "pointer-events-none absolute inset-0 flex items-center justify-center px-14",
            centerClassName,
          )}
        >
          <div className="pointer-events-auto">{center}</div>
        </div>
      ) : null}
    </header>
  );
}
