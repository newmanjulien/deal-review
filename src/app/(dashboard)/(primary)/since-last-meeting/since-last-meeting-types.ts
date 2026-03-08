import type { DashboardDataTableColumn } from "@/components/table";
import type { DealSnapshot } from "@/types/deals";

export type SinceLastMeetingTableRow = DealSnapshot;

export type SinceLastMeetingTableColumn =
  DashboardDataTableColumn<SinceLastMeetingTableRow>;
