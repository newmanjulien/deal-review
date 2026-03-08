import { DashboardDataTable } from "@/components/table";
import type {
  DataDisplayTableFormatters,
  DataDisplayTableColumn,
  DataDisplayTableRow,
} from "@/components/data-display/data-display-types";

type GenericTableSectionProps<Row extends DataDisplayTableRow> = {
  rows: Row[];
  columns: DataDisplayTableColumn<Row>[];
  formatters?: DataDisplayTableFormatters<Row>;
};

export function TableSection<Row extends DataDisplayTableRow>({
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
