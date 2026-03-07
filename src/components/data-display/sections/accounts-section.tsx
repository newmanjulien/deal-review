import {
  DashboardDataTable,
  type DashboardDataTableColumn,
} from "@/components/table/table";
import type { DataDisplayAccountBreakdownRow } from "@/components/data-display/data-display-types";

type AccountsSectionProps = {
  rows: DataDisplayAccountBreakdownRow[];
};

const ACCOUNTS_TABLE_COLUMNS: DashboardDataTableColumn<DataDisplayAccountBreakdownRow>[] =
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

export function AccountsSection({ rows }: AccountsSectionProps) {
  return (
    <div className="space-y-3 pt-1">
      <DashboardDataTable
        columns={ACCOUNTS_TABLE_COLUMNS}
        rows={rows}
        getRowId={(row) => row.id}
      />
    </div>
  );
}
