import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { OptionalApp } from "./optional-apps-data";

type OptionalAppCardProps = {
  app: OptionalApp;
  icon: LucideIcon;
};

export function OptionalAppCard({ app, icon: AppIcon }: OptionalAppCardProps) {
  return (
    <article className="flex items-center gap-4 rounded-lg border border-zinc-200/70 bg-white px-4 py-3">
      <div className="flex size-14 shrink-0 items-center justify-center rounded-lg bg-zinc-100">
        <AppIcon className="size-5 text-zinc-500" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-xs font-medium tracking-wide text-zinc-900">{app.name}</h3>
        <p className="mt-1 text-xs leading-relaxed tracking-wide text-zinc-500">
          {app.description}
        </p>
      </div>

      <Button type="button" variant="outline" size="xs">
        Learn more
      </Button>
    </article>
  );
}
