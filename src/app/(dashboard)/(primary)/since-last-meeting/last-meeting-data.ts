import type {
  DataDisplayAccountBreakdownRow,
  DataDisplayActivityItem,
  DataDisplayOpportunity,
} from "@/components/data-display/data-display-types";
import { HEADER_PEOPLE } from "../_header";

export const lastMeetingActivityItems: DataDisplayActivityItem[] = [
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

export const lastMeetingAccountsBreakdown: DataDisplayAccountBreakdownRow[] = [
  { account: "Mobile web", impacted: "7,214", share: "56%" },
  { account: "Desktop web", impacted: "4,790", share: "37%" },
  { account: "API clients", impacted: "877", share: "7%" },
] as const;

export const lastMeetingOpportunities: DataDisplayOpportunity[] = [
  {
    id: "118",
    title: "Checkout confirmation email delay",
    dealLabel: "Honeywell",
    avatars: [HEADER_PEOPLE[1].avatar, HEADER_PEOPLE[0].avatar],
    priority: "high",
    priorityLabel: "High priority",
  },
] as const;
