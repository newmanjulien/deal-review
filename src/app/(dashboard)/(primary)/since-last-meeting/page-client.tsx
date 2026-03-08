"use client";

import { DataDisplay } from "@/components/data-display/data-display";
import type { DataDisplaySectionInstance } from "@/components/data-display/data-display-types";
import { LAST_MEETING_PAGE_CONFIG } from "./last-meeting-config";
import {
  lastMeetingTableColumns,
  lastMeetingTableRows,
  lastMeetingTimelineItems,
} from "./last-meeting-data";

const LAST_MEETING_SECTIONS: DataDisplaySectionInstance[] = [
  {
    id: "timeline",
    label: "Timeline",
    kind: "timeline",
    items: lastMeetingTimelineItems,
  },
  {
    id: "deals",
    label: "Deals",
    kind: "table",
    rows: lastMeetingTableRows,
    columns: lastMeetingTableColumns,
  },
];

export function SinceLastMeetingPageClient() {
  return (
    <DataDisplay
      title={LAST_MEETING_PAGE_CONFIG.title}
      description={LAST_MEETING_PAGE_CONFIG.description}
      sections={LAST_MEETING_SECTIONS}
    />
  );
}
