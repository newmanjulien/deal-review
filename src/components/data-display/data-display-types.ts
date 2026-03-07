export type DataDisplayTabId = "activity" | "accounts" | "opportunities";

export type DataDisplayTab = {
  id: DataDisplayTabId;
  label: string;
};

export type DataDisplayActivityItem = {
  id: string;
  title: string;
  date: string;
  body: string;
};

export type DataDisplayAccountBreakdownRow = {
  account: string;
  impacted: string;
  share: string;
};

export type DataDisplayOpportunityPriority = "high" | "medium" | "low";
export type DataDisplayOpportunityAvatars = [string] | [string, string];

export type DataDisplayOpportunity = {
  id: string;
  title: string;
  dealLabel: string;
  avatars: DataDisplayOpportunityAvatars;
  priority: DataDisplayOpportunityPriority;
  priorityLabel: string;
};

