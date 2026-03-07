"use client";

import { useMemo, useState, type ReactElement } from "react";
import { CanvasPage } from "@/components/canvas/canvas-page";
import type {
  DataDisplayCard,
  DataDisplaySectionInstance,
  DataDisplaySectionKind,
  DataDisplayTableRow,
  DataDisplayTimelineItem,
} from "@/components/data-display/data-display-types";
import { TableSection } from "@/components/data-display/sections/table-section";
import { TimelineSection } from "@/components/data-display/sections/timeline-section";
import { CardsSection } from "@/components/data-display/sections/cards-section";

const MAX_SECTION_COUNT = 3;

type DataDisplaySectionPropsByKind = {
  timeline: { items: DataDisplayTimelineItem[] };
  table: { rows: DataDisplayTableRow[] };
  cards: { cards: DataDisplayCard[] };
};

type DataDisplaySectionComponentRegistry = {
  [K in DataDisplaySectionKind]: (
    props: DataDisplaySectionPropsByKind[K],
  ) => ReactElement;
};

const DATA_DISPLAY_SECTION_COMPONENTS: DataDisplaySectionComponentRegistry = {
  timeline: TimelineSection,
  table: TableSection,
  cards: CardsSection,
};

function hasSectionId(
  sections: DataDisplaySectionInstance[],
  candidate: string | undefined,
): candidate is string {
  return (
    typeof candidate === "string" &&
    sections.some((section) => section.id === candidate)
  );
}

function normalizeSections(sections: DataDisplaySectionInstance[]) {
  if (sections.length === 0) {
    throw new Error("DataDisplay requires at least one section instance.");
  }

  const seenIds = new Set<string>();

  for (const section of sections) {
    if (seenIds.has(section.id)) {
      throw new Error(`DataDisplay received duplicate section id "${section.id}".`);
    }

    seenIds.add(section.id);
  }

  return sections.slice(0, MAX_SECTION_COUNT);
}

function renderSection(section: DataDisplaySectionInstance) {
  switch (section.kind) {
    case "timeline": {
      const TimelineComponent = DATA_DISPLAY_SECTION_COMPONENTS.timeline;
      return <TimelineComponent items={section.items} />;
    }
    case "table": {
      const TableComponent = DATA_DISPLAY_SECTION_COMPONENTS.table;
      return <TableComponent rows={section.rows} />;
    }
    case "cards": {
      const CardsComponent = DATA_DISPLAY_SECTION_COMPONENTS.cards;
      return <CardsComponent cards={section.cards} />;
    }
  }
}

type DataDisplayProps = {
  title: string;
  description: string;
  sections: DataDisplaySectionInstance[];
  defaultSectionId?: string;
};

export function DataDisplay({
  title,
  description,
  sections,
  defaultSectionId,
}: DataDisplayProps) {
  const normalizedSections = useMemo(() => normalizeSections(sections), [sections]);
  const [requestedSectionId, setRequestedSectionId] = useState<string>(() =>
    hasSectionId(normalizedSections, defaultSectionId)
      ? defaultSectionId
      : normalizedSections[0].id,
  );

  const activeSectionId = hasSectionId(normalizedSections, requestedSectionId)
    ? requestedSectionId
    : hasSectionId(normalizedSections, defaultSectionId)
      ? defaultSectionId
      : normalizedSections[0].id;

  const activeSection =
    normalizedSections.find((section) => section.id === activeSectionId) ??
    normalizedSections[0];

  return (
    <CanvasPage title={title} description={description}>
      <section className="space-y-4">
        <div className="flex items-center gap-6 border-b border-zinc-100">
          {normalizedSections.map((section) => (
            <button
              key={section.id}
              type="button"
              onClick={() => setRequestedSectionId(section.id)}
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

        {renderSection(activeSection)}
      </section>
    </CanvasPage>
  );
}
