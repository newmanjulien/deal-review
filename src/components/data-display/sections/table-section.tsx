import {
  DashboardDataTable,
  type DashboardDataTableColumn,
} from "@/components/table/table";
import type { DataDisplayTableRow } from "@/components/data-display/data-display-types";

type TableSectionProps = {
  rows: DataDisplayTableRow[];
};

const TABLE_SECTION_COLUMNS: DashboardDataTableColumn<DataDisplayTableRow>[] =
  [
    {
      key: "account",
      label: "Account",
      cellClassName:
        "whitespace-nowrap px-4 py-3 text-xs font-medium tracking-wide text-zinc-900",
    },
    {
      key: "impacted",
      label: "Impacted",
      cellClassName:
        "whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-600",
    },
    {
      key: "share",
      label: "Share",
      cellClassName:
        "whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-500",
    },
  ];

export function TableSection({ rows }: TableSectionProps) {
  return (
    <div className="space-y-3 pt-1">
      <DashboardDataTable
        columns={TABLE_SECTION_COLUMNS}
        rows={rows}
        getRowId={(row) => row.id}
      />
    </div>
  );
}
