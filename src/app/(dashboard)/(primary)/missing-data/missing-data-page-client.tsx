"use client";

import { DataDisplay } from "@/components/data-display/data-display";
import type {
  DataDisplaySectionInstance,
  DataDisplayTableRow,
} from "@/components/data-display/data-display-types";
import { MISSING_DATA_PAGE_CONFIG } from "./missing-data-config";
import { missingDataData } from "./missing-data-data";

const MISSING_DATA_SECTIONS: DataDisplaySectionInstance<DataDisplayTableRow>[] = [
  {
    id: "missing-data-tiles",
    label: "Missing data",
    kind: "tiles",
    tiles: missingDataData.views.sections.missingDataTiles,
  },
  {
    id: "timelines-tiles",
    label: "Timelines",
    kind: "tiles",
    tiles: missingDataData.views.sections.timelineTiles,
  },
];

export function MissingDataPageClient() {
  return (
    <DataDisplay
      hero={{
        title: MISSING_DATA_PAGE_CONFIG.title,
        description: MISSING_DATA_PAGE_CONFIG.description,
      }}
      sections={MISSING_DATA_SECTIONS}
    />
  );
}
