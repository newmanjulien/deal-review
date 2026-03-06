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

export type LastMeetingOpportunityPriority = "high" | "medium" | "low";

export type LastMeetingOpportunity = {
  id: string;
  title: string;
  dealLabel: string;
  priority: LastMeetingOpportunityPriority;
  priorityLabel: string;
};
