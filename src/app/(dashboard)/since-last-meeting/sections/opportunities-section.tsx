import { Grid3x3, KeyRound, LoaderCircle, UserRound } from "lucide-react";
import { opportunities } from "../last-meeting-data";

export function OpportunitiesSection() {
  return (
    <ol className="space-y-2.5 pt-1">
      {opportunities.map((opportunity) => (
        <li
          key={opportunity.id}
          className="rounded-lg border border-zinc-200 bg-zinc-100/80 px-3 py-3 shadow-[0_1px_1px_rgba(24,24,27,0.04)]"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-[11px] font-medium tracking-wide text-zinc-500">
              #{opportunity.id}
            </p>
            <span className="inline-flex size-5 items-center justify-center rounded-full border border-zinc-200 bg-zinc-50 text-zinc-400">
              <UserRound className="size-2.5" />
            </span>
          </div>

          <div className="mt-2 flex items-center gap-1.5">
            <KeyRound className="size-3 text-zinc-500" />
            <h2 className="text-sm leading-snug font-medium tracking-wide text-zinc-800">
              {opportunity.title}
            </h2>
          </div>

          <div className="mt-3.5 space-y-1.5">
            <div className="h-2 rounded-[3px] bg-zinc-200/90" />
            <div className="h-2 rounded-[3px] bg-zinc-200/90" />
            <div className="h-2 w-1/3 rounded-[3px] bg-zinc-200/90" />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium tracking-wide text-zinc-800">
              <LoaderCircle className="size-2.5 text-zinc-400" />
              {opportunity.statusLabel}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-zinc-200 bg-zinc-50 px-2 py-0.5 text-[11px] font-medium tracking-wide text-zinc-800">
              <Grid3x3 className="size-2.5 text-zinc-400" />
              {opportunity.priorityLabel}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
