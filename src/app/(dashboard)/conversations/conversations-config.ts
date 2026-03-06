import type { ConversationColumn } from "./conversations-types";

export const CONVERSATIONS_PAGE_CONFIG = {
  title: "All conversations",
  description:
    "See the latest account conversations, owners, and deal stage at a glance",
} as const;

export const CONVERSATIONS_TABLE_COLUMNS: ConversationColumn[] = [
  { key: "company", label: "Company" },
  { key: "contact", label: "Contact" },
  { key: "topic", label: "Topic" },
  { key: "owner", label: "Owner" },
  { key: "stage", label: "Stage" },
  { key: "lastUpdate", label: "Last update" },
];
