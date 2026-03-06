"use client";

import * as React from "react";
import {
  Table,
  TableBody,
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

export {
  DashboardTable,
  DashboardTableBody,
  DashboardTableHead,
  DashboardTableHeader,
  DashboardTableRow,
};
