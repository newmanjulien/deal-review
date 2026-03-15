"use client";

import { DataDisplay } from "@/components/data-display/data-display";
import type {
  DataDisplaySectionInstance,
  DataDisplayTableRow,
} from "@/components/data-display/data-display-types";
import { OPPORTUNITIES_PAGE_CONFIG } from "./opportunities-config";
import { opportunitiesData } from "./opportunities-data";

const OPPORTUNITIES_SECTIONS: DataDisplaySectionInstance<DataDisplayTableRow>[] = [
  {
    id: "opportunities-tiles",
    label: "Opportunities",
    kind: "tiles",
    tiles: opportunitiesData.views.sections.opportunitiesTiles,
  },
  {
    id: "risks-tiles",
    label: "Risks",
    kind: "tiles",
    tiles: opportunitiesData.views.sections.risksTiles,
  },
];

export function OpportunitiesPageClient() {
  return (
    <DataDisplay
      hero={{
        title: OPPORTUNITIES_PAGE_CONFIG.title,
        description: OPPORTUNITIES_PAGE_CONFIG.description,
      }}
      sections={OPPORTUNITIES_SECTIONS}
    />
  );
}
