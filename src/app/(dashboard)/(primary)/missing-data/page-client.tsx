"use client";

import { DataDisplay } from "@/components/data-display/data-display";
import type { DataDisplaySectionInstance } from "@/components/data-display/data-display-types";
import { MISSING_DATA_PAGE_CONFIG } from "./missing-data-config";
import {
  missingDataCards,
  missingDataTimelineCards,
} from "./missing-data-data";

const MISSING_DATA_SECTIONS: DataDisplaySectionInstance[] = [
  {
    id: "missing-data-cards",
    label: "Missing data",
    kind: "cards",
    cards: missingDataCards,
  },
  {
    id: "timelines-cards",
    label: "Timelines",
    kind: "cards",
    cards: missingDataTimelineCards,
  },
];

export function MissingDataPageClient() {
  return (
    <DataDisplay
      title={MISSING_DATA_PAGE_CONFIG.title}
      description={MISSING_DATA_PAGE_CONFIG.description}
      sections={MISSING_DATA_SECTIONS}
    />
  );
}
