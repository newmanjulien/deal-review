import {
  DashboardTable,
  DashboardTableBody,
  DashboardTableHead,
  DashboardTableHeader,
  DashboardTableRow,
} from "@/components/dashboard-table";
import { TableCell } from "@/components/ui/table";
import { accountsBreakdown } from "../dummy-data";

export function AccountsSection() {
  return (
    <div className="space-y-3 pt-1">
      <DashboardTable>
        <DashboardTableHeader>
          <DashboardTableRow>
            <DashboardTableHead>Account</DashboardTableHead>
            <DashboardTableHead>Impacted</DashboardTableHead>
            <DashboardTableHead>Share</DashboardTableHead>
          </DashboardTableRow>
        </DashboardTableHeader>

        <DashboardTableBody>
          {accountsBreakdown.map((row) => (
            <DashboardTableRow key={row.account}>
              <TableCell className="whitespace-nowrap px-4 py-3 text-xs font-medium tracking-wide text-zinc-900">
                {row.account}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-600">
                {row.impacted}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-500">
                {row.share}
              </TableCell>
            </DashboardTableRow>
          ))}
        </DashboardTableBody>
      </DashboardTable>
    </div>
  );
}
