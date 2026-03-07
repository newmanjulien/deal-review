"use client";

import { useMemo, useState } from "react";
import { CanvasPage } from "@/components/canvas/canvas-page";
import type {
  DataDisplayAccountBreakdownRow,
  DataDisplayActivityItem,
  DataDisplayOpportunity,
  DataDisplayTab,
  DataDisplayTabId,
} from "@/components/data-display/data-display-types";
import { AccountsSection } from "@/components/data-display/sections/accounts-section";
import { ActivitySection } from "@/components/data-display/sections/activity-section";
import { OpportunitiesSection } from "@/components/data-display/sections/opportunities-section";

const ALL_SECTIONS: DataDisplayTabId[] = [
  "activity",
  "accounts",
  "opportunities",
];

const DATA_DISPLAY_TABS: DataDisplayTab[] = [
  { id: "activity", label: "Activity" },
  { id: "accounts", label: "Accounts" },
  { id: "opportunities", label: "Opportunities" },
];

const DEFAULT_TAB_ID: DataDisplayTabId = "activity";

function normalizeSections(sections: DataDisplayTabId[] | undefined) {
  if (!sections) return ALL_SECTIONS;

  const uniqueSections = Array.from(new Set(sections)).filter((sectionId) =>
    ALL_SECTIONS.includes(sectionId),
  );

  if (uniqueSections.length === 0) return ALL_SECTIONS;
  return uniqueSections.slice(0, 3);
}

type DataDisplayProps = {
  title: string;
  description: string;
  sections?: DataDisplayTabId[];
  activityItems?: DataDisplayActivityItem[];
  accountsBreakdown?: DataDisplayAccountBreakdownRow[];
  opportunities?: DataDisplayOpportunity[];
  defaultTabId?: DataDisplayTabId;
};

export function DataDisplay({
  title,
  description,
  sections,
  activityItems,
  accountsBreakdown,
  opportunities,
  defaultTabId = DEFAULT_TAB_ID,
}: DataDisplayProps) {
  const enabledSections = useMemo(() => normalizeSections(sections), [sections]);
  const [requestedTab, setRequestedTab] = useState<DataDisplayTabId>(() =>
    enabledSections.includes(defaultTabId) ? defaultTabId : enabledSections[0],
  );

  const activeTab = enabledSections.includes(requestedTab)
    ? requestedTab
    : enabledSections.includes(defaultTabId)
      ? defaultTabId
      : enabledSections[0];

  const safeActivityItems = activityItems ?? [];
  const safeAccountsBreakdown = accountsBreakdown ?? [];
  const safeOpportunities = opportunities ?? [];

  return (
    <CanvasPage title={title} description={description}>
      <section className="space-y-4">
        <div className="flex items-center gap-6 border-b border-zinc-100">
          {DATA_DISPLAY_TABS.filter((tab) =>
            enabledSections.includes(tab.id),
          ).map((tab) => (
            <button
              key={tab.id}
              type="button"
              onClick={() => setRequestedTab(tab.id)}
              className={`relative pb-3 text-xs leading-relaxed font-medium tracking-wide transition-colors ${
                activeTab === tab.id ? "text-zinc-900" : "text-zinc-500"
              }`}
            >
              {tab.label}
              {activeTab === tab.id ? (
                <span className="absolute inset-x-0 bottom-[-1px] h-px bg-zinc-900" />
              ) : null}
            </button>
          ))}
        </div>

        {activeTab === "activity" ? (
          <ActivitySection items={safeActivityItems} />
        ) : null}
        {activeTab === "accounts" ? (
          <AccountsSection rows={safeAccountsBreakdown} />
        ) : null}
        {activeTab === "opportunities" ? (
          <OpportunitiesSection opportunities={safeOpportunities} />
        ) : null}
      </section>
    </CanvasPage>
  );
}
