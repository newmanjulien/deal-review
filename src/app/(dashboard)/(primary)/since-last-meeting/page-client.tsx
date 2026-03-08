"use client";

import { DataDisplay } from "@/components/data-display/data-display";
import type { DataDisplaySectionInstance } from "@/components/data-display/data-display-types";
import { SINCE_LAST_MEETING_PAGE_CONFIG } from "./since-last-meeting-config";
import type { SinceLastMeetingTableRow } from "./since-last-meeting-types";
import {
  sinceLastMeetingTableColumns,
  sinceLastMeetingTableFormatters,
  sinceLastMeetingTableRows,
  sinceLastMeetingTimelineItems,
} from "./since-last-meeting-data";

const SINCE_LAST_MEETING_SECTIONS: DataDisplaySectionInstance<SinceLastMeetingTableRow>[] =
  [
  {
    id: "timeline",
    label: "Timeline",
    kind: "timeline",
    items: sinceLastMeetingTimelineItems,
  },
  {
    id: "deals",
    label: "Deals",
    kind: "table",
    rows: sinceLastMeetingTableRows,
    columns: sinceLastMeetingTableColumns,
    formatters: sinceLastMeetingTableFormatters,
  },
];

export function SinceLastMeetingPageClient() {
  return (
    <DataDisplay
      title={SINCE_LAST_MEETING_PAGE_CONFIG.title}
      description={SINCE_LAST_MEETING_PAGE_CONFIG.description}
      sections={SINCE_LAST_MEETING_SECTIONS}
    />
  );
}
