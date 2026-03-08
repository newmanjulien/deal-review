"use client";

import { useState } from "react";
import { CanvasPage } from "@/components/canvas/canvas-page";
import type {
  DataDisplaySectionInstance,
  DataDisplayTableRow,
} from "@/components/data-display/data-display-types";
import { CardsSection } from "@/components/data-display/sections/cards-section";
import { TableSection } from "@/components/data-display/sections/table-section";
import { TimelineSection } from "@/components/data-display/sections/timeline-section";
import { SectionTabs } from "@/components/ui/section-tabs";

const MAX_SECTION_COUNT = 3;

function renderSection<Row extends DataDisplayTableRow>(
  section: DataDisplaySectionInstance<Row>,
) {
  switch (section.kind) {
    case "timeline":
      return <TimelineSection items={section.items} />;
    case "table":
      return (
        <TableSection
          rows={section.rows}
          columns={section.columns}
          formatters={section.formatters}
        />
      );
    case "cards":
      return <CardsSection cards={section.cards} />;
  }
}

type DataDisplayProps<Row extends DataDisplayTableRow> = {
  title: string;
  description: string;
  sections: DataDisplaySectionInstance<Row>[];
  defaultSectionId?: string;
};

export function DataDisplay<Row extends DataDisplayTableRow = DataDisplayTableRow>({
  title,
  description,
  sections,
  defaultSectionId,
}: DataDisplayProps<Row>) {
  const visibleSections = sections.slice(0, MAX_SECTION_COUNT);
  if (visibleSections.length === 0) {
    throw new Error("DataDisplay requires at least one section instance.");
  }

  const [activeSectionId, setActiveSectionId] = useState(
    defaultSectionId ?? visibleSections[0].id,
  );
  const activeSection =
    visibleSections.find((section) => section.id === activeSectionId) ??
    visibleSections.find((section) => section.id === defaultSectionId) ??
    visibleSections[0];
  const sectionTabs = visibleSections.map((section) => ({
    id: section.id,
    label: section.label,
  }));

  return (
    <CanvasPage title={title} description={description}>
      <section className="space-y-4">
        <div className="flex items-center gap-6 border-b border-zinc-100">
          <SectionTabs
            tabs={sectionTabs}
            activeTabId={activeSectionId}
            onTabChange={setActiveSectionId}
          />
        </div>

        {renderSection(activeSection)}
      </section>
    </CanvasPage>
  );
}
