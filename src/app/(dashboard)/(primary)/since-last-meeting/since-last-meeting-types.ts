import type { DashboardDataTableColumn } from "@/components/table";
import type { DealSnapshot } from "@/types/domain/deals";

export type SinceLastMeetingTableRow = DealSnapshot;

export type SinceLastMeetingTableColumn =
  DashboardDataTableColumn<SinceLastMeetingTableRow>;
