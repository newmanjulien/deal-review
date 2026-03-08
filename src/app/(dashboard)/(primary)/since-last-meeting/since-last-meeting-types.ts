import type { DashboardDataTableColumn } from "@/components/table";

export type SinceLastMeetingTableRow = {
  id: string;
  deal: string;
  probability: string;
  stage: string;
};

export type SinceLastMeetingTableColumn =
  DashboardDataTableColumn<SinceLastMeetingTableRow>;
