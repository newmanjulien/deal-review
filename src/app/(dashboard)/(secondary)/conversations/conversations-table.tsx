import {
  DashboardDataTable,
  type DashboardDataTableFormatters,
} from "@/components/table/table";
import { Badge } from "@/components/ui/badge";
import { CONVERSATIONS_TABLE_COLUMNS } from "./conversations-config";
import type { ConversationRow } from "./conversations-types";

const CONVERSATION_CELL_FORMATTERS: DashboardDataTableFormatters<ConversationRow> =
  {
    stage: (stage) => (
      <Badge
        variant="outline"
        className="rounded-sm border-zinc-200 bg-zinc-50 px-2 py-0.5 text-xs font-medium tracking-wide text-zinc-600"
      >
        {stage}
      </Badge>
    ),
  };

type ConversationsTableProps = {
  rows: ConversationRow[];
};

export function ConversationsTable({ rows }: ConversationsTableProps) {
  return (
    <DashboardDataTable
      columns={CONVERSATIONS_TABLE_COLUMNS}
      rows={rows}
      getRowId={(row) => row.id}
      formatters={CONVERSATION_CELL_FORMATTERS}
    />
  );
}
