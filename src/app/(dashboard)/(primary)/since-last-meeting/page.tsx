"use client";

import { DataDisplay } from "@/components/data-display/data-display";
import type { DataDisplaySectionInstance } from "@/components/data-display/data-display-types";
import { SINCE_LAST_MEETING_PAGE_CONFIG } from "./since-last-meeting-config";
import type { SinceLastMeetingTableRow } from "./since-last-meeting-types";
import { sinceLastMeetingData } from "./since-last-meeting-data";

const SINCE_LAST_MEETING_SECTIONS: DataDisplaySectionInstance<SinceLastMeetingTableRow>[] = [
  {
    id: "timeline",
    label: "Timeline",
    kind: "timeline",
    items: sinceLastMeetingData.views.timelineItems,
  },
  {
    id: "deals",
    label: "Deals",
    kind: "table",
    rows: sinceLastMeetingData.views.table.rows,
    columns: sinceLastMeetingData.views.table.columns,
    formatters: sinceLastMeetingData.views.table.formatters,
  },
  {
    id: "update",
    label: "Update",
    kind: "upload",
    uploadLabel: "Upload files",
    uploadDescription:
      "Upload screenshots or any docs with the information we're missing",
  },
];

export default function SinceLastMeetingPage() {
  return (
    <DataDisplay
      hero={{
        title: SINCE_LAST_MEETING_PAGE_CONFIG.title,
        description: SINCE_LAST_MEETING_PAGE_CONFIG.description,
      }}
      sections={SINCE_LAST_MEETING_SECTIONS}
    />
  );
}
