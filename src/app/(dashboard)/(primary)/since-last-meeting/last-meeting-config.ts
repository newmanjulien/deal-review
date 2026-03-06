import type { LastMeetingTab, LastMeetingTabId } from "./last-meeting-types";

export const LAST_MEETING_PAGE_CONFIG = {
  title: "Since your last meeting with Juan",
  description:
    "A spike in users clicking on reset links but not completing the reset flow was detected. Error rates surged within ten minutes of the latest deployment.",
} as const;

export const LAST_MEETING_TABS: LastMeetingTab[] = [
  { id: "activity", label: "Activity" },
  { id: "accounts", label: "Accounts" },
  { id: "opportunities", label: "Opportunities" },
];

export const LAST_MEETING_DEFAULT_TAB_ID: LastMeetingTabId = "activity";
