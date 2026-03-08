import type {
  DataDisplayTableRow,
  DataDisplayTimelineItem,
} from "@/components/data-display/data-display-types";
import type { HeaderPerson } from "@/components/canvas/canvas-types";

export const lastMeetingSharedPeople: HeaderPerson[] = [
  {
    name: "Julien Newman",
    avatar: "/avatars/aditya.jpg",
  },
  {
    name: "Yash Patel",
    avatar: "/avatars/yash.webp",
  },
];

export const lastMeetingTimelineItems: DataDisplayTimelineItem[] = [
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

export const lastMeetingTableRows: DataDisplayTableRow[] = [
  { id: "mobile-web", account: "Mobile web", impacted: "7,214", share: "56%" },
  {
    id: "desktop-web",
    account: "Desktop web",
    impacted: "4,790",
    share: "37%",
  },
  { id: "api-clients", account: "API clients", impacted: "877", share: "7%" },
] as const;
