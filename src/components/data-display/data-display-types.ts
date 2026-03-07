export type DataDisplayTabId = "activity" | "accounts" | "cards";

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

export type DataDisplayCardPriority = "high" | "medium" | "low";
export type DataDisplayCardAvatars = [string] | [string, string];

export type DataDisplayCard = {
  id: string;
  title: string;
  dealLabel: string;
  avatars: DataDisplayCardAvatars;
  priority: DataDisplayCardPriority;
  priorityLabel: string;
};
