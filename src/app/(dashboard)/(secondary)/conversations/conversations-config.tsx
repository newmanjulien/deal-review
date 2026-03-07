import type { DashboardDataTableColumn } from "@/components/table/table";
import type { ConversationRow } from "./conversations-types";

export const CONVERSATIONS_PAGE_CONFIG = {
  title: "All conversations",
  description:
    "See the latest account conversations, owners, and deal stage at a glance",
} as const;

export const CONVERSATIONS_TABLE_COLUMNS: DashboardDataTableColumn<ConversationRow>[] =
  [
  {
    key: "company",
    label: "Company",
    cellClassName:
      "whitespace-nowrap px-4 py-3 text-xs font-medium tracking-wide text-zinc-900",
  },
  {
    key: "contact",
    label: "Contact",
    cellClassName:
      "whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-600",
  },
  {
    key: "topic",
    label: "Topic",
    cellClassName: "min-w-60 px-4 py-3 text-xs tracking-wide text-zinc-600",
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
