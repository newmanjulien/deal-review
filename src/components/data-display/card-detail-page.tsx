"use client";

import { useState } from "react";
import { CanvasPage } from "@/components/canvas/canvas-page";
import { CanvasHero } from "@/components/canvas/canvas-hero";
import { DataDisplayCardIcon } from "@/components/data-display/card-icon";
import { TableSection } from "@/components/data-display/sections/table-section";
import { TimelineSection } from "@/components/data-display/sections/timeline-section";
import type {
  DataDisplayCard,
  DataDisplayTableColumn,
  DataDisplayTableRow,
  DataDisplayTimelineItem,
} from "@/components/data-display/data-display-types";

type DetailSectionId = "timeline" | "table";

const DETAIL_SECTIONS: Array<{ id: DetailSectionId; label: string }> = [
  { id: "timeline", label: "Timeline" },
  { id: "table", label: "Table" },
];

type DataDisplayCardDetailPageProps = {
  card: DataDisplayCard;
  timelineItems: DataDisplayTimelineItem[];
  tableRows: DataDisplayTableRow[];
  tableColumns: DataDisplayTableColumn[];
  fallbackDescription?: string;
};

function getCardDescription(
  card: DataDisplayCard,
  fallbackDescription: string | undefined,
) {
  if (card.description && card.description.trim().length > 0) {
    return card.description;
  }

  if (fallbackDescription && fallbackDescription.trim().length > 0) {
    return fallbackDescription;
  }

  return "No additional context was attached to this card.";
}

export function DataDisplayCardDetailPage({
  card,
  timelineItems,
  tableRows,
  tableColumns,
  fallbackDescription,
}: DataDisplayCardDetailPageProps) {
  const [activeSectionId, setActiveSectionId] =
    useState<DetailSectionId>("timeline");

  const description = getCardDescription(card, fallbackDescription);

  return (
    <CanvasPage>
      <CanvasHero
        title={card.title}
        description={description}
        metaId={card.id}
        metaIcon={
          <DataDisplayCardIcon iconKey={card.iconKey} />
        }
      />

      <section className="space-y-4">
        <div className="flex items-center gap-6 border-b border-zinc-100">
          {DETAIL_SECTIONS.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setActiveSectionId(section.id)}
              className={`relative pb-3 text-xs leading-relaxed font-medium tracking-wide transition-colors ${
                activeSectionId === section.id ? "text-zinc-900" : "text-zinc-500"
              }`}
            >
              {section.label}
              {activeSectionId === section.id ? (
                <span className="absolute inset-x-0 bottom-[-1px] h-px bg-zinc-900" />
              ) : null}
            </button>
          ))}
        </div>

        {activeSectionId === "timeline" ? (
          <TimelineSection items={timelineItems} />
        ) : (
          <TableSection rows={tableRows} columns={tableColumns} />
        )}
      </section>
    </CanvasPage>
  );
}
