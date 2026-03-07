"use client";

import { DataDisplay } from "@/components/data-display/data-display";
import { OPPORTUNITIES_PAGE_CONFIG } from "./opportunities-config";
import {
  opportunitiesAccountsBreakdown,
  opportunitiesActivityItems,
  opportunitiesCards,
} from "./opportunities-data";

export function OpportunitiesPageClient() {
  return (
    <DataDisplay
      title={OPPORTUNITIES_PAGE_CONFIG.title}
      description={OPPORTUNITIES_PAGE_CONFIG.description}
      sections={["activity", "accounts", "cards"]}
      activityItems={opportunitiesActivityItems}
      accountsBreakdown={opportunitiesAccountsBreakdown}
      cards={opportunitiesCards}
    />
  );
}
