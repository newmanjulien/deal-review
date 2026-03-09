import type { LucideIcon } from "lucide-react";
import type {
  DashboardDataTableColumn,
  DashboardDataTableFormatters,
} from "@/components/table";
import type { AppPath } from "@/types/domain/app-path";
import type { IsoDateString } from "@/types/domain/date-time";

export type DataDisplaySectionKind = "timeline" | "table" | "tiles" | "upload";

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

export type DataDisplayTableColumn<
  Row extends DataDisplayTableRow = DataDisplayTableRow,
> = DashboardDataTableColumn<Row>;

export type DataDisplayTableFormatters<
  Row extends DataDisplayTableRow = DataDisplayTableRow,
> = DashboardDataTableFormatters<Row>;

export type DataDisplayTilePriority = "high" | "medium" | "low";
type DataDisplayTileAvatars = [string] | [string, string];

export type DataDisplayTileDetail<
  Row extends DataDisplayTableRow = DataDisplayTableRow,
> = {
  timelineItems: DataDisplayTimelineItem[];
  tableRows: Row[];
};

export type DataDisplayTile<
  Row extends DataDisplayTableRow = DataDisplayTableRow,
> = {
  id: string;
  title: string;
  description?: string;
  icon: LucideIcon;
  dealLabel: string;
  avatars: DataDisplayTileAvatars;
  priority: DataDisplayTilePriority;
  priorityLabel: string;
  href?: AppPath;
  detail?: DataDisplayTileDetail<Row>;
};

export type DataDisplayTileWithDetail<
  Row extends DataDisplayTableRow = DataDisplayTableRow,
> = DataDisplayTile<Row> & {
  description: string;
  detail: DataDisplayTileDetail<Row>;
};

export type DataDisplayPageHero = {
  title: string;
  description: string;
};

export type DataDisplayDetailHero = {
  id: string;
  icon: LucideIcon;
  title: string;
  description: string;
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
  Row extends DataDisplayTableRow = DataDisplayTableRow,
> = DataDisplaySectionInstanceBase & {
  kind: "table";
  rows: Row[];
  columns: DataDisplayTableColumn<Row>[];
  formatters?: DataDisplayTableFormatters<Row>;
};

type DataDisplayTilesSectionInstance = DataDisplaySectionInstanceBase & {
  kind: "tiles";
  tiles: DataDisplayTile<DataDisplayTableRow>[];
};

type DataDisplayUploadSectionInstance = DataDisplaySectionInstanceBase & {
  kind: "upload";
  uploadLabel?: string;
  uploadDescription?: string;
  acceptedFileTypes?: string;
  allowMultipleFiles?: boolean;
};

export type DataDisplaySectionInstance<
  Row extends DataDisplayTableRow = DataDisplayTableRow,
> =
  | DataDisplayTimelineSectionInstance
  | DataDisplayTableSectionInstance<Row>
  | DataDisplayTilesSectionInstance
  | DataDisplayUploadSectionInstance;

export type DataDisplayDetailSectionInstance<
  Row extends DataDisplayTableRow = DataDisplayTableRow,
> = Exclude<DataDisplaySectionInstance<Row>, { kind: "tiles" }>;
