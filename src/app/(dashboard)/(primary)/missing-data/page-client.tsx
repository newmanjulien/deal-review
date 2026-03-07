"use client";

import { DataDisplay } from "@/components/data-display/data-display";
import { MISSING_DATA_PAGE_CONFIG } from "./missing-data-config";
import {
  missingDataAccountsBreakdown,
  missingDataActivityItems,
  missingDataCards,
} from "./missing-data-data";

export function MissingDataPageClient() {
  return (
    <DataDisplay
      title={MISSING_DATA_PAGE_CONFIG.title}
      description={MISSING_DATA_PAGE_CONFIG.description}
      sections={["activity", "accounts", "cards"]}
      activityItems={missingDataActivityItems}
      accountsBreakdown={missingDataAccountsBreakdown}
      cards={missingDataCards}
    />
  );
}
