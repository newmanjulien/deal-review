import type {
  DataDisplayCard,
  DataDisplayTableColumn,
  DataDisplayTableRow,
  DataDisplayTimelineItem,
} from "@/components/data-display/data-display-types";
import type { HeaderPerson } from "@/app/(dashboard)/_chrome/chrome-types";

export const missingDataSharedPeople: HeaderPerson[] = [
  {
    name: "Julien Newman",
    avatar: "/avatars/aditya.jpg",
  },
  {
    name: "Yash Patel",
    avatar: "/avatars/yash.webp",
  },
];

export const missingDataCards: DataDisplayCard[] = [
  {
    id: "118",
    title: "Not sure who is the economic buyer",
    iconKey: "missing",
    dealLabel: "Honeywell",
    avatars: [missingDataSharedPeople[1].avatar],
    priority: "high",
    priorityLabel: "High priority",
  },
  {
    id: "120",
    title: "Deadline for 3M's RFP is unknown",
    description:
      "A spike in users clicking on reset links but not completing the reset flow were detected. Error rates surged within ten minutes of the latest deployment.",
    iconKey: "missing",
    dealLabel: "3M",
    avatars: [
      missingDataSharedPeople[0].avatar,
      missingDataSharedPeople[1].avatar,
    ],
    priority: "medium",
    priorityLabel: "Medium priority",
    href: "/missing-data/cards/120",
  },
] as const;

export const missingDataTimelineCards: DataDisplayCard[] = [
  {
    id: "119",
    title: "Director of Finance was supposed to revert last week",
    iconKey: "timing",
    dealLabel: "Timeline review",
    avatars: [
      missingDataSharedPeople[0].avatar,
      missingDataSharedPeople[1].avatar,
    ],
    priority: "medium",
    priorityLabel: "Medium priority",
  },
] as const;

const allMissingDataCards = [
  ...missingDataCards,
  ...missingDataTimelineCards,
] as const;

export function getMissingDataCardById(cardId: string) {
  return allMissingDataCards.find((card) => card.id === cardId) ?? null;
}

type MissingDataTableRow = DataDisplayTableRow<{
  signal: string;
  status: string;
}>;

export const missingDataTimelineItems: DataDisplayTimelineItem[] = [
  {
    id: "120-stage-change",
    title: "RFP owner changed and timeline slipped",
    occurredOnIso: "2026-02-24",
    body: "The original owner left the project and the new owner has not confirmed a revised date. Last two calls closed without next-step commitments.",
  },
  {
    id: "120-procurement-update",
    title: "Procurement requested updated checklist",
    occurredOnIso: "2026-02-28",
    body: "Procurement asked for a revised requirements checklist and security mapping before sharing an updated RFP deadline.",
  },
];

export const missingDataTableColumns: DataDisplayTableColumn<MissingDataTableRow>[] =
  [
    {
      key: "signal",
      label: "Signal",
      cellClassName:
        "whitespace-nowrap px-4 py-3 text-xs font-medium tracking-wide text-zinc-900",
    },
    {
      key: "status",
      label: "Status",
      cellClassName:
        "whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-600",
    },
  ];

export const missingDataTableRows: MissingDataTableRow[] = [
  {
    id: "120-owner",
    signal: "Economic buyer is not confirmed",
    status: "Missing",
  },
  {
    id: "120-date",
    signal: "RFP close date",
    status: "Unknown",
  },
  {
    id: "120-procurement",
    signal: "Procurement checkpoint",
    status: "Pending",
  },
];
