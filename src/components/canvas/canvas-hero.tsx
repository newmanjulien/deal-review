import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export type CanvasHeroProps = {
  title?: string;
  description?: string;
  metaId?: string;
  metaIcon?: ReactNode;
};

export function CanvasHero({
  title,
  description,
  metaId,
  metaIcon,
}: CanvasHeroProps) {
  if (!title && !description && !metaId && !metaIcon) {
    return null;
  }

  const hasMeta = Boolean(metaId || metaIcon);
  const normalizedMetaId = metaId?.trim();
  const hasTitle = Boolean(title);

  return (
    <header className="mb-6 border-b border-zinc-100 pb-4">
      {hasMeta ? (
        <div className="space-y-2">
          {metaIcon ? (
            <div className="inline-flex size-8 items-center justify-center rounded-md bg-zinc-100 text-zinc-500">
              {metaIcon}
            </div>
          ) : null}
          {normalizedMetaId ? (
            <p className="text-xs tracking-wide text-zinc-400">#{normalizedMetaId}</p>
          ) : null}
        </div>
      ) : null}

      {hasTitle ? (
        <h1
          className={cn(
            "text-sm font-medium tracking-wide text-zinc-900",
            hasMeta && "mt-2",
          )}
        >
          {title}
        </h1>
      ) : null}

      {description ? (
        <p
          className={cn(
            "max-w-xl text-xs leading-relaxed tracking-wide text-zinc-500",
            hasTitle && "mt-1",
            !hasTitle && hasMeta && "mt-2",
          )}
        >
          {description}
        </p>
      ) : null}
    </header>
  );
}
