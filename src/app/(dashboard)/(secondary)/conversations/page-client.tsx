"use client";

import { CanvasWidePage } from "@/components/canvas/canvas-page";
import {
  DashboardDataTable,
  type DashboardDataTableFormatters,
} from "@/components/table/table";
import { Badge } from "@/components/ui/badge";
import {
  CONVERSATIONS_PAGE_CONFIG,
  CONVERSATIONS_TABLE_COLUMNS,
} from "./conversations-config";
import { conversationRows } from "./conversations-data";
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

export function ConversationsPageClient() {
  return (
    <CanvasWidePage
      title={CONVERSATIONS_PAGE_CONFIG.title}
      description={CONVERSATIONS_PAGE_CONFIG.description}
    >
      <DashboardDataTable
        columns={CONVERSATIONS_TABLE_COLUMNS}
        rows={conversationRows}
        getRowId={(row) => row.id}
        formatters={CONVERSATION_CELL_FORMATTERS}
      />
    </CanvasWidePage>
  );
}
