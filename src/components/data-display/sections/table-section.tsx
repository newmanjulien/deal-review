import {
  DashboardDataTable,
} from "@/components/table/table";
import type {
  DataDisplayTableColumn,
  DataDisplayTableRow,
} from "@/components/data-display/data-display-types";

type TableSectionProps = {
  rows: DataDisplayTableRow[];
  columns: DataDisplayTableColumn[];
};

export function TableSection({ rows, columns }: TableSectionProps) {
  return (
    <div className="space-y-3 pt-1">
      <DashboardDataTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
      />
    </div>
  );
}
