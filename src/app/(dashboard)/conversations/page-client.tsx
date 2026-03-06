import { CanvasWidePageShell } from "@/components/canvas/canvas-page";
import {
  DashboardTable,
  DashboardTableBody,
  DashboardTableHead,
  DashboardTableHeader,
  DashboardTableRow,
} from "@/components/dashboard-table";
import { Badge } from "@/components/ui/badge";
import { TableCell } from "@/components/ui/table";
import {
  CONVERSATIONS_PAGE_CONFIG,
  CONVERSATIONS_TABLE_COLUMNS,
} from "./conversations-config";
import { conversationRows } from "./conversations-data";

export function ConversationsPageClient() {
  return (
    <CanvasWidePageShell
      title={CONVERSATIONS_PAGE_CONFIG.title}
      description={CONVERSATIONS_PAGE_CONFIG.description}
    >
      <DashboardTable>
        <DashboardTableHeader>
          <DashboardTableRow>
            {CONVERSATIONS_TABLE_COLUMNS.map((column) => (
              <DashboardTableHead key={column.key}>
                {column.label}
              </DashboardTableHead>
            ))}
          </DashboardTableRow>
        </DashboardTableHeader>

        <DashboardTableBody>
          {conversationRows.map((row) => (
            <DashboardTableRow key={`${row.company}-${row.contact}`}>
              <TableCell className="whitespace-nowrap px-4 py-3 text-xs font-medium tracking-wide text-zinc-900">
                {row.company}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-600">
                {row.contact}
              </TableCell>
              <TableCell className="min-w-60 px-4 py-3 text-xs tracking-wide text-zinc-600">
                {row.topic}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-600">
                {row.owner}
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-3 text-xs">
                <Badge
                  variant="outline"
                  className="rounded-sm border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs font-medium tracking-wide text-zinc-600"
                >
                  {row.stage}
                </Badge>
              </TableCell>
              <TableCell className="whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-500">
                {row.lastUpdate}
              </TableCell>
            </DashboardTableRow>
          ))}
        </DashboardTableBody>
      </DashboardTable>
    </CanvasWidePageShell>
  );
}
