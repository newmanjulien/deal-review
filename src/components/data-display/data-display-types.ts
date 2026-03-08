import type {
  DashboardDataTableColumn,
  DashboardDataTableFormatters,
} from "@/components/table";
import type { AppPath } from "@/types/domain/app-path";
import type { IsoDateString } from "@/types/domain/date-time";

export type DataDisplaySectionKind = "timeline" | "table" | "cards";

export type DataDisplayTimelineItem = {
  id: string;
  title: string;
  occurredOnIso: IsoDateString;
  body: string;
};

export type DataDisplayTableRow<
  Fields extends Record<string, unknown> = Record<string, unknown>,
> = {
  id: string;
} & Fields;

export type DataDisplayAnyTableRow = DataDisplayTableRow;

export type DataDisplayTableColumn<
  Row extends DataDisplayAnyTableRow = DataDisplayAnyTableRow,
> = DashboardDataTableColumn<Row>;

export type DataDisplayTableSectionFormatters<
  Row extends DataDisplayAnyTableRow = DataDisplayAnyTableRow,
> = DashboardDataTableFormatters<Row>;

export type DataDisplayCardPriority = "high" | "medium" | "low";
type DataDisplayCardAvatars = [string] | [string, string];
export type DataDisplayCardIconKey =
  | "missing"
  | "timing"
  | "opportunity"
  | "risk";

export type DataDisplayCard = {
  id: string;
  title: string;
  description?: string;
  iconKey: DataDisplayCardIconKey;
  dealLabel: string;
  avatars: DataDisplayCardAvatars;
  priority: DataDisplayCardPriority;
  priorityLabel: string;
  href?: AppPath;
};

type DataDisplaySectionInstanceBase = {
  id: string;
  label: string;
};

type DataDisplayTimelineSectionInstance =
  DataDisplaySectionInstanceBase & {
    kind: "timeline";
    items: DataDisplayTimelineItem[];
  };

type DataDisplayTableSectionInstance<
  Row extends DataDisplayAnyTableRow = DataDisplayAnyTableRow,
> = DataDisplaySectionInstanceBase & {
  kind: "table";
  rows: Row[];
  columns: DataDisplayTableColumn<Row>[];
  formatters?: DataDisplayTableSectionFormatters<Row>;
};

type DataDisplayCardsSectionInstance = DataDisplaySectionInstanceBase & {
  kind: "cards";
  cards: DataDisplayCard[];
};

export type DataDisplaySectionInstance<
  Row extends DataDisplayAnyTableRow = DataDisplayAnyTableRow,
> =
  | DataDisplayTimelineSectionInstance
  | DataDisplayTableSectionInstance<Row>
  | DataDisplayCardsSectionInstance;
