import type { DashboardDataTableColumn } from "@/components/table";
import type { ConversationRow } from "./conversations-types";

export const CONVERSATIONS_PAGE_CONFIG = {
  headerTitle: "All conversations",
  title: "All conversations",
  description: "See all the conversations from the past 30 days",
} as const;

export const CONVERSATIONS_TABLE_COLUMNS: DashboardDataTableColumn<ConversationRow>[] =
  [
    {
      key: "deal",
      label: "Deal",
      cellClassName:
        "px-4 py-3 text-xs font-medium tracking-wide text-zinc-600",
    },
    {
      key: "probability",
      label: "Probability",
      cellClassName:
        "whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-900",
    },
    {
      key: "contact",
      label: "Contact",
      cellClassName:
        "whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-600",
    },
    {
      key: "owner",
      label: "Owner",
      cellClassName:
        "whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-600",
    },
    {
      key: "stage",
      label: "Stage",
      cellClassName: "whitespace-nowrap px-4 py-3 text-xs",
    },
    {
      key: "lastUpdate",
      label: "Last update",
      cellClassName:
        "whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-500",
    },
  ];
