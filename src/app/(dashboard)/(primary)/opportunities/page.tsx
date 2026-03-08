"use client";

import { DataDisplay } from "@/components/data-display/data-display";
import type { DataDisplaySectionInstance } from "@/components/data-display/data-display-types";
import { OPPORTUNITIES_PAGE_CONFIG } from "./opportunities-config";
import { risksCards, opportunitiesCards } from "./opportunities-data";

const OPPORTUNITIES_SECTIONS: DataDisplaySectionInstance[] = [
  {
    id: "opportunities-cards",
    label: "Opportunities",
    kind: "cards",
    cards: opportunitiesCards,
  },
  {
    id: "risks-cards",
    label: "Risks",
    kind: "cards",
    cards: risksCards,
  },
];

export default function OpportunitiesPage() {
  return (
    <DataDisplay
      title={OPPORTUNITIES_PAGE_CONFIG.title}
      description={OPPORTUNITIES_PAGE_CONFIG.description}
      sections={OPPORTUNITIES_SECTIONS}
    />
  );
}
