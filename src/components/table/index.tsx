import * as React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

type DashboardTableProps = React.ComponentProps<typeof Table> & {
  containerClassName?: string;
};

function DashboardTable({
  className,
  containerClassName,
  ...props
}: DashboardTableProps) {
  return (
    <div
      className={cn(
        "overflow-x-auto overflow-y-hidden rounded-sm border border-zinc-100 bg-white",
        containerClassName
      )}
    >
      <Table className={cn("min-w-full border-collapse", className)} {...props} />
    </div>
  );
}

function DashboardTableHeader({
  className,
  ...props
}: React.ComponentProps<typeof TableHeader>) {
  return <TableHeader className={cn("bg-zinc-50/80", className)} {...props} />;
}

function DashboardTableHead({
  className,
  ...props
}: React.ComponentProps<typeof TableHead>) {
  return (
    <TableHead
      className={cn(
        "px-4 py-3 text-left text-xs font-medium tracking-wide text-zinc-500",
        className
      )}
      {...props}
    />
  );
}

function DashboardTableBody({
  className,
  ...props
}: React.ComponentProps<typeof TableBody>) {
  return <TableBody className={cn("divide-y divide-zinc-100", className)} {...props} />;
}

function DashboardTableRow({
  className,
  ...props
}: React.ComponentProps<typeof TableRow>) {
  return (
    <TableRow
      className={cn("transition-colors hover:bg-zinc-50/80", className)}
      {...props}
    />
  );
}

export type DashboardDataTableColumn<Row> = {
  key: Extract<keyof Row, string>;
  label: string;
  headClassName?: string;
  cellClassName?: string;
};

export type DashboardDataTableFormatters<Row> = Partial<{
  [K in Extract<keyof Row, string>]: (
    value: Row[K],
    row: Row,
  ) => React.ReactNode;
}>;

function renderCellValue<Row, K extends Extract<keyof Row, string>>(
  row: Row,
  key: K,
  formatters?: DashboardDataTableFormatters<Row>,
) {
  const rawValue = row[key];
  const formatter = formatters?.[key] as
    | ((value: Row[K], currentRow: Row) => React.ReactNode)
    | undefined;
  if (formatter) {
    return formatter(rawValue, row);
  }

  return rawValue as React.ReactNode;
}

type DashboardDataTableProps<Row> = {
  columns: readonly DashboardDataTableColumn<Row>[];
  rows: readonly Row[];
  getRowId: (row: Row) => string;
  formatters?: DashboardDataTableFormatters<Row>;
  containerClassName?: string;
  tableClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  rowClassName?: string;
  emptyState?: React.ReactNode;
};

function DashboardDataTable<Row>({
  columns,
  rows,
  getRowId,
  formatters,
  containerClassName,
  tableClassName,
  headerClassName,
  bodyClassName,
  rowClassName,
  emptyState,
}: DashboardDataTableProps<Row>) {
  return (
    <DashboardTable className={tableClassName} containerClassName={containerClassName}>
      <DashboardTableHeader className={headerClassName}>
        <DashboardTableRow>
          {columns.map((column) => (
            <DashboardTableHead key={column.key} className={column.headClassName}>
              {column.label}
            </DashboardTableHead>
          ))}
        </DashboardTableRow>
      </DashboardTableHeader>

      <DashboardTableBody className={bodyClassName}>
        {rows.length > 0
          ? rows.map((row) => (
              <DashboardTableRow key={getRowId(row)} className={rowClassName}>
                {columns.map((column) => (
                  <TableCell key={column.key} className={column.cellClassName}>
                    {renderCellValue(row, column.key, formatters)}
                  </TableCell>
                ))}
              </DashboardTableRow>
            ))
          : emptyState && (
              <DashboardTableRow className={rowClassName}>
                <TableCell
                  colSpan={columns.length}
                  className="px-4 py-8 text-center text-xs tracking-wide text-zinc-500"
                >
                  {emptyState}
                </TableCell>
              </DashboardTableRow>
            )}
      </DashboardTableBody>
    </DashboardTable>
  );
}

export {
  DashboardDataTable,
};
