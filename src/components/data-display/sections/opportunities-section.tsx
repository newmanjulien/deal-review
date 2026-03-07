import Image from "next/image";
import { Building, Lightbulb } from "lucide-react";
import {
  PriorityGridIcon,
  type PriorityGridVariant,
} from "./priority-grid-icon";
import type {
  DataDisplayOpportunity,
  DataDisplayOpportunityPriority,
} from "../data-display-types";

const PRIORITY_ICON_VARIANT: Record<
  DataDisplayOpportunityPriority,
  PriorityGridVariant
> = {
  high: "full-grid",
  medium: "half-grid",
  low: "quarter-grid",
};

type OpportunitiesSectionProps = {
  opportunities: DataDisplayOpportunity[];
};

export function OpportunitiesSection({
  opportunities,
}: OpportunitiesSectionProps) {
  return (
    <ol className="space-y-2.5 pt-1">
      {opportunities.map((opportunity) => (
        <li
          key={opportunity.id}
          className="rounded-lg border border-zinc-100 px-3 py-3 shadow-[0_1px_1px_rgba(24,24,27,0.04)]"
        >
          <div className="flex items-start justify-between gap-3">
            <p className="text-[10px] tracking-wide text-zinc-500">
              #{opportunity.id}
            </p>
            {opportunity.avatars.length === 2 ? (
              <div className="relative h-[26px] w-7 shrink-0">
                {opportunity.avatars.map((avatar, index) => (
                  <span
                    key={`${opportunity.id}-${avatar}-${index}`}
                    className={`absolute inline-flex size-5 shrink-0 overflow-hidden rounded-full border border-white bg-zinc-50 ${
                      index === 0 ? "left-0 top-0 z-10" : "left-[8px] top-[7px]"
                    }`}
                  >
                    <Image
                      src={avatar}
                      alt={`Opportunity ${opportunity.id} avatar ${index + 1}`}
                      width={20}
                      height={20}
                      className="h-full w-full object-cover"
                    />
                  </span>
                ))}
              </div>
            ) : (
              <div className="flex items-center -space-x-1">
                {opportunity.avatars.map((avatar, index) => (
                  <span
                    key={`${opportunity.id}-${avatar}-${index}`}
                    className="inline-flex size-5 shrink-0 overflow-hidden rounded-full border border-white bg-zinc-50"
                  >
                    <Image
                      src={avatar}
                      alt={`Opportunity ${opportunity.id} avatar ${index + 1}`}
                      width={20}
                      height={20}
                      className="h-full w-full object-cover"
                    />
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="mt-2 flex items-center gap-1.5">
            <Lightbulb className="size-3 text-zinc-500" />
            <h2 className="text-xs leading-snug tracking-wide text-zinc-800">
              {opportunity.title}
            </h2>
          </div>

          <div className="mt-3.5 space-y-1.5">
            <div className="h-2 rounded-[3px] bg-zinc-200/90" />
            <div className="h-2 rounded-[3px] bg-zinc-200/90" />
            <div className="h-2 w-1/3 rounded-[3px] bg-zinc-200/90" />
          </div>

          <div className="mt-4 flex flex-wrap items-center gap-1.5">
            <span className="inline-flex items-center gap-1 rounded-md border border-zinc-100 px-2 py-0.5 text-[11px] tracking-wide text-zinc-800">
              <Building className="size-2.5 text-zinc-400" />
              {opportunity.dealLabel}
            </span>
            <span className="inline-flex items-center gap-1 rounded-md border border-zinc-100 px-2 py-0.5 text-[11px] tracking-wide text-zinc-800">
              <PriorityGridIcon
                variant={PRIORITY_ICON_VARIANT[opportunity.priority]}
                className="size-2.5 text-zinc-400"
              />
              {opportunity.priorityLabel}
            </span>
          </div>
        </li>
      ))}
    </ol>
  );
}
