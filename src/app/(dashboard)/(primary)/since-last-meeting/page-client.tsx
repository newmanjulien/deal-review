"use client";

import { DataDisplay } from "@/components/data-display/data-display";
import { LAST_MEETING_PAGE_CONFIG } from "./last-meeting-config";
import {
  lastMeetingAccountsBreakdown,
  lastMeetingActivityItems,
} from "./last-meeting-data";

export function SinceLastMeetingPageClient() {
  return (
    <DataDisplay
      title={LAST_MEETING_PAGE_CONFIG.title}
      description={LAST_MEETING_PAGE_CONFIG.description}
      sections={["activity", "accounts"]}
      activityItems={lastMeetingActivityItems}
      accountsBreakdown={lastMeetingAccountsBreakdown}
    />
  );
}
