"use client";

import { useMemo, useState, type ReactElement } from "react";
import { CanvasPage } from "@/components/canvas/canvas-page";
import type {
  DataDisplayAccountBreakdownRow,
  DataDisplayActivityItem,
  DataDisplayCard,
  DataDisplayTabId,
} from "@/components/data-display/data-display-types";
import { AccountsSection } from "@/components/data-display/sections/accounts-section";
import { ActivitySection } from "@/components/data-display/sections/activity-section";
import { CardsSection } from "@/components/data-display/sections/cards-section";

const DEFAULT_TAB_ID: DataDisplayTabId = "activity";

type DataDisplaySectionData = {
  activityItems: DataDisplayActivityItem[];
  accountsBreakdown: DataDisplayAccountBreakdownRow[];
  cards: DataDisplayCard[];
};

type DataDisplaySectionPropsById = {
  activity: { items: DataDisplayActivityItem[] };
  accounts: { rows: DataDisplayAccountBreakdownRow[] };
  cards: { cards: DataDisplayCard[] };
};

type DataDisplaySectionConfig<K extends DataDisplayTabId> = {
  label: string;
  component: (props: DataDisplaySectionPropsById[K]) => ReactElement;
  dataSelector: (data: DataDisplaySectionData) => DataDisplaySectionPropsById[K];
};

type DataDisplaySectionRegistry = {
  [K in DataDisplayTabId]: DataDisplaySectionConfig<K>;
};

const DATA_DISPLAY_SECTION_REGISTRY: DataDisplaySectionRegistry = {
  activity: {
    label: "Activity",
    component: ActivitySection,
    dataSelector: (data) => ({ items: data.activityItems }),
  },
  accounts: {
    label: "Accounts",
    component: AccountsSection,
    dataSelector: (data) => ({ rows: data.accountsBreakdown }),
  },
  cards: {
    label: "Cards",
    component: CardsSection,
    dataSelector: (data) => ({ cards: data.cards }),
  },
};

const ALL_SECTIONS = Object.keys(
  DATA_DISPLAY_SECTION_REGISTRY,
) as DataDisplayTabId[];

function renderSection<K extends DataDisplayTabId>(
  sectionId: K,
  sectionData: DataDisplaySectionData,
) {
  const section = DATA_DISPLAY_SECTION_REGISTRY[sectionId];
  const SectionComponent = section.component;
  return <SectionComponent {...section.dataSelector(sectionData)} />;
}

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
  cards?: DataDisplayCard[];
  defaultTabId?: DataDisplayTabId;
};

export function DataDisplay({
  title,
  description,
  sections,
  activityItems,
  accountsBreakdown,
  cards,
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

  const sectionData: DataDisplaySectionData = {
    activityItems: activityItems ?? [],
    accountsBreakdown: accountsBreakdown ?? [],
    cards: cards ?? [],
  };

  return (
    <CanvasPage title={title} description={description}>
      <section className="space-y-4">
        <div className="flex items-center gap-6 border-b border-zinc-100">
          {enabledSections.map((sectionId) => (
            <button
              key={sectionId}
              type="button"
              onClick={() => setRequestedTab(sectionId)}
              className={`relative pb-3 text-xs leading-relaxed font-medium tracking-wide transition-colors ${
                activeTab === sectionId ? "text-zinc-900" : "text-zinc-500"
              }`}
            >
              {DATA_DISPLAY_SECTION_REGISTRY[sectionId].label}
              {activeTab === sectionId ? (
                <span className="absolute inset-x-0 bottom-[-1px] h-px bg-zinc-900" />
              ) : null}
            </button>
          ))}
        </div>

        {renderSection(activeTab, sectionData)}
      </section>
    </CanvasPage>
  );
}
