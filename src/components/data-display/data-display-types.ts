import type { ComponentType } from "react";

export type DataDisplaySectionKind = "timeline" | "table" | "cards";

export type DataDisplayTimelineItem = {
  id: string;
  title: string;
  date: string;
  body: string;
};

export type DataDisplayTableRow = {
  id: string;
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

export type DataDisplayCardsSectionIcon = ComponentType<{ className?: string }>;

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
};

export type DataDisplayCardsSectionInstance = DataDisplaySectionInstanceBase & {
  kind: "cards";
  cards: DataDisplayCard[];
  icon: DataDisplayCardsSectionIcon;
};

export type DataDisplaySectionInstance =
  | DataDisplayTimelineSectionInstance
  | DataDisplayTableSectionInstance
  | DataDisplayCardsSectionInstance;
