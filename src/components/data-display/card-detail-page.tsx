"use client";

import { useState } from "react";
import { CanvasPage } from "@/components/canvas/canvas-page";
import { CanvasHero } from "@/components/canvas/canvas-hero";
import { DataDisplayCardIcon } from "@/components/data-display/card-icon";
import { TableSection } from "@/components/data-display/sections/table-section";
import { TimelineSection } from "@/components/data-display/sections/timeline-section";
import { SectionTabs } from "@/components/ui/section-tabs";
import type {
  DataDisplayCard,
  DataDisplayTableFormatters,
  DataDisplayTableColumn,
  DataDisplayTableRow,
  DataDisplayTimelineItem,
} from "@/components/data-display/data-display-types";

type DetailSectionId = "timeline" | "table";

const DETAIL_SECTIONS: Array<{ id: DetailSectionId; label: string }> = [
  { id: "timeline", label: "Timeline" },
  { id: "table", label: "Table" },
];

type DataDisplayCardDetailPageProps<Row extends DataDisplayTableRow> = {
  card: DataDisplayCard;
  timelineItems: DataDisplayTimelineItem[];
  tableRows: Row[];
  tableColumns: DataDisplayTableColumn<Row>[];
  tableFormatters?: DataDisplayTableFormatters<Row>;
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

export function DataDisplayCardDetailPage<
  Row extends DataDisplayTableRow = DataDisplayTableRow,
>({
  card,
  timelineItems,
  tableRows,
  tableColumns,
  tableFormatters,
  fallbackDescription,
}: DataDisplayCardDetailPageProps<Row>) {
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
          <SectionTabs
            tabs={DETAIL_SECTIONS}
            activeTabId={activeSectionId}
            onTabChange={setActiveSectionId}
          />
        </div>

        {activeSectionId === "timeline" ? (
          <TimelineSection items={timelineItems} />
        ) : (
          <TableSection
            rows={tableRows}
            columns={tableColumns}
            formatters={tableFormatters}
          />
        )}
      </section>
    </CanvasPage>
  );
}
