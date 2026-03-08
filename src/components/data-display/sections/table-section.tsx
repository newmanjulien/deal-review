import { DashboardDataTable } from "@/components/table";
import type {
  DataDisplayAnyTableRow,
  DataDisplayTableSectionFormatters,
  DataDisplayTableColumn,
} from "@/components/data-display/data-display-types";

type GenericTableSectionProps<Row extends DataDisplayAnyTableRow> = {
  rows: Row[];
  columns: DataDisplayTableColumn<Row>[];
  formatters?: DataDisplayTableSectionFormatters<Row>;
};

export function TableSection<Row extends DataDisplayAnyTableRow>({
  rows,
  columns,
  formatters,
}: GenericTableSectionProps<Row>) {
  return (
    <div className="space-y-3 pt-1">
      <DashboardDataTable
        columns={columns}
        rows={rows}
        getRowId={(row) => row.id}
        formatters={formatters}
      />
    </div>
  );
}
