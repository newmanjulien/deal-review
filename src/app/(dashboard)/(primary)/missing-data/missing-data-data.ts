import type {
  DataDisplayTableRow,
  DataDisplayTimelineItem,
  DataDisplayCard,
} from "@/app/(dashboard)/(primary)/_shared/data-display-types";
import type { HeaderPerson } from "@/components/canvas/canvas-types";

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

export const missingDataCards: DataDisplayCard[] = [
  {
    id: "118",
    title: "Checkout confirmation email delay",
    dealLabel: "Honeywell",
    avatars: [missingDataSharedPeople[1].avatar],
    priority: "high",
    priorityLabel: "High priority",
  },
  {
    id: "120",
    title: "Missing attribution source on lead records",
    dealLabel: "Data hygiene",
    avatars: [
      missingDataSharedPeople[0].avatar,
      missingDataSharedPeople[1].avatar,
    ],
    priority: "medium",
    priorityLabel: "Medium priority",
  },
] as const;

export const missingDataTimelineCards: DataDisplayCard[] = [
  {
    id: "119",
    title: "Password reset timeline anomaly",
    dealLabel: "Timeline review",
    avatars: [
      missingDataSharedPeople[0].avatar,
      missingDataSharedPeople[1].avatar,
    ],
    priority: "medium",
    priorityLabel: "Medium priority",
  },
] as const;
