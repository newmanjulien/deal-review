export type LastMeetingTabId = "activity" | "accounts" | "opportunities";

export type LastMeetingTab = {
  id: LastMeetingTabId;
  label: string;
};

export type LastMeetingActivityItem = {
  id: string;
  title: string;
  time: string;
  body: string;
};

export type LastMeetingAccountBreakdownRow = {
  account: string;
  impacted: string;
  share: string;
};

export type LastMeetingOpportunity = {
  id: string;
  title: string;
  statusLabel: string;
  priorityLabel: string;
};
