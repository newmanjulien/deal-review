"use client";

import { Lightbulb, TriangleAlert } from "lucide-react";
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
    icon: Lightbulb,
  },
  {
    id: "risks-cards",
    label: "Risks",
    kind: "cards",
    cards: risksCards,
    icon: TriangleAlert,
  },
];

export function OpportunitiesPageClient() {
  return (
    <DataDisplay
      title={OPPORTUNITIES_PAGE_CONFIG.title}
      description={OPPORTUNITIES_PAGE_CONFIG.description}
      sections={OPPORTUNITIES_SECTIONS}
    />
  );
}
