import {
  DashboardDataTable,
} from "@/components/table/table";
import type {
  DataDisplayTableColumn,
  DataDisplayTableRow,
} from "@/app/(dashboard)/(primary)/_shared/data-display-types";

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
