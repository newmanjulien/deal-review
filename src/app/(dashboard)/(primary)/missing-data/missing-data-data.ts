import type {
  DataDisplayTableRow,
  DataDisplayTableColumn,
  DataDisplayTimelineItem,
  DataDisplayCard,
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

export const missingDataTimelineItems: DataDisplayTimelineItem[] = [
  {
    id: "new-issue",
    title: "New issue detected",
    date: "Jan 25",
    body: "Interfere flagged the incident after observing a surge in failed password reset attempts. Metrics showed a spike in users clicking on reset links but not completing the reset flow. Error rates crossed the anomaly threshold within ten minutes of deployment.",
  },
  {
    id: "session-analysis",
    title: "Session analysis",
    date: "Jan 26",
    body: 'Password reset links were clicked successfully, but users never reached the final "Password updated" confirmation screen.',
  },
] as const;

export const missingDataTableRows: DataDisplayTableRow[] = [
  { id: "mobile-web", account: "Mobile web", impacted: "7,214", share: "56%" },
  {
    id: "desktop-web",
    account: "Desktop web",
    impacted: "4,790",
    share: "37%",
  },
  { id: "api-clients", account: "API clients", impacted: "877", share: "7%" },
] as const;

export const missingDataTableColumns: DataDisplayTableColumn[] = [
  {
    key: "account",
    label: "Account",
    cellClassName:
      "whitespace-nowrap px-4 py-3 text-xs font-medium tracking-wide text-zinc-900",
  },
  {
    key: "impacted",
    label: "Impacted users",
    cellClassName:
      "whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-600",
  },
  {
    key: "share",
    label: "Share",
    cellClassName:
      "whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-500",
  },
] as const;

export const missingDataCards: DataDisplayCard[] = [
  {
    id: "118",
    title: "Checkout confirmation email delay",
    iconKey: "circle-off",
    dealLabel: "Honeywell",
    avatars: [missingDataSharedPeople[1].avatar],
    priority: "high",
    priorityLabel: "High priority",
  },
  {
    id: "120",
    title: "Broken Password Reset Link",
    description:
      "A spike in users clicking on reset links but not completing the reset flow were detected. Error rates surged within ten minutes of the latest deployment.",
    iconKey: "key-round",
    dealLabel: "Auth flow",
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
    title: "Password reset timeline anomaly",
    iconKey: "clock-3",
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
