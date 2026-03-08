import type { DashboardDataTableColumn } from "@/components/table/table";

export type DataDisplaySectionKind = "timeline" | "table" | "cards";

export type DataDisplayTimelineItem = {
  id: string;
  title: string;
  date: string;
  body: string;
};

export type DataDisplayTableRow = {
  id: string;
} & Record<string, string>;

export type DataDisplayTableColumn = DashboardDataTableColumn<DataDisplayTableRow>;

export type DataDisplayCardPriority = "high" | "medium" | "low";
export type DataDisplayCardAvatars = [string] | [string, string];
export type DataDisplayCardIconKey =
  | "circle-off"
  | "clock-3"
  | "key-round"
  | "lightbulb"
  | "triangle-alert";

export type DataDisplayCard = {
  id: string;
  title: string;
  description?: string;
  iconKey: DataDisplayCardIconKey;
  dealLabel: string;
  avatars: DataDisplayCardAvatars;
  priority: DataDisplayCardPriority;
  priorityLabel: string;
  href?: `/${string}`;
};

type DataDisplaySectionInstanceBase = {
  id: string;
  label: string;
};

export type DataDisplayTimelineSectionInstance =
  DataDisplaySectionInstanceBase & {
    kind: "timeline";
    items: DataDisplayTimelineItem[];
  };

export type DataDisplayTableSectionInstance = DataDisplaySectionInstanceBase & {
  kind: "table";
  rows: DataDisplayTableRow[];
  columns: DataDisplayTableColumn[];
};

export type DataDisplayCardsSectionInstance = DataDisplaySectionInstanceBase & {
  kind: "cards";
  cards: DataDisplayCard[];
};

export type DataDisplaySectionInstance =
  | DataDisplayTimelineSectionInstance
  | DataDisplayTableSectionInstance
  | DataDisplayCardsSectionInstance;
