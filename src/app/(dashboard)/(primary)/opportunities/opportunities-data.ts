import type {
  DataDisplayAccountBreakdownRow,
  DataDisplayActivityItem,
  DataDisplayCard,
} from "@/components/data-display/data-display-types";
import type { HeaderPerson } from "@/components/canvas/canvas-types";

export const opportunitiesSharedPeople: HeaderPerson[] = [
  {
    name: "Aditya Newman",
    avatar: "/avatars/aditya.jpg",
  },
  {
    name: "Yash Patel",
    avatar: "/avatars/yash.webp",
  },
];

export const opportunitiesActivityItems: DataDisplayActivityItem[] = [
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

export const opportunitiesAccountsBreakdown: DataDisplayAccountBreakdownRow[] = [
  { id: "mobile-web", account: "Mobile web", impacted: "7,214", share: "56%" },
  { id: "desktop-web", account: "Desktop web", impacted: "4,790", share: "37%" },
  { id: "api-clients", account: "API clients", impacted: "877", share: "7%" },
] as const;

export const opportunitiesCards: DataDisplayCard[] = [
  {
    id: "118",
    title: "Checkout confirmation email delay",
    dealLabel: "Honeywell",
    avatars: [
      opportunitiesSharedPeople[1].avatar,
      opportunitiesSharedPeople[0].avatar,
    ],
    priority: "high",
    priorityLabel: "High priority",
  },
] as const;
