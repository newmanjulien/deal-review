"use client";

import { useState } from "react";
import { CanvasPage } from "@/components/canvas/canvas-page";
import { CanvasHero } from "@/components/canvas/canvas-hero";
import { assertValidDataDisplaySections } from "@/components/data-display/data-display-guards";
import type {
  DataDisplayDetailHero,
  DataDisplayDetailSectionInstance,
  DataDisplayPageHero,
  DataDisplaySectionInstance,
  DataDisplayTableRow,
} from "@/components/data-display/data-display-types";
import { TableSection } from "@/components/data-display/sections/table-section";
import { TileListSection } from "@/components/data-display/sections/tile-list-section";
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
    case "tiles":
      return <TileListSection tiles={section.tiles} />;
  }
}

type DataDisplayBaseProps = {
  defaultSectionId?: string;
};

type DataDisplayPageProps<Row extends DataDisplayTableRow> = DataDisplayBaseProps & {
  mode?: "page";
  hero: DataDisplayPageHero;
  sections: DataDisplaySectionInstance<Row>[];
};

type DataDisplayDetailProps<Row extends DataDisplayTableRow> = DataDisplayBaseProps & {
  mode: "detail";
  hero: DataDisplayDetailHero;
  sections: DataDisplayDetailSectionInstance<Row>[];
};

export type DataDisplayProps<Row extends DataDisplayTableRow = DataDisplayTableRow> =
  | DataDisplayPageProps<Row>
  | DataDisplayDetailProps<Row>;

export function DataDisplay<Row extends DataDisplayTableRow = DataDisplayTableRow>(
  props: DataDisplayProps<Row>,
) {
  const mode = props.mode ?? "page";
  const { defaultSectionId } = props;
  const sections = props.sections as DataDisplaySectionInstance<Row>[];

  assertValidDataDisplaySections(mode, sections);

  const visibleSections = sections.slice(0, MAX_SECTION_COUNT);

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

  const heroElement =
    props.mode === "detail" ? (
      <CanvasHero
        title={props.hero.title}
        description={props.hero.description}
        metaId={props.hero.id}
        metaIcon={<props.hero.icon className="size-5.5 text-current" />}
      />
    ) : (
      <CanvasHero title={props.hero.title} description={props.hero.description} />
    );

  return (
    <CanvasPage>
      {heroElement}

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
