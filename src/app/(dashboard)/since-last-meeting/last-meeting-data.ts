import type {
  LastMeetingAccountBreakdownRow,
  LastMeetingActivityItem,
  LastMeetingOpportunity,
} from "./last-meeting-types";

export const lastMeetingActivityItems: LastMeetingActivityItem[] = [
  {
    id: "new-issue",
    title: "New issue detected",
    time: "36 min ago",
    body: "Interfere flagged the incident after observing a surge in failed password reset attempts. Metrics showed a spike in users clicking on reset links but not completing the reset flow. Error rates crossed the anomaly threshold within ten minutes of deployment.",
  },
  {
    id: "session-analysis",
    title: "Session analysis",
    time: "35 min ago",
    body: 'Password reset links were clicked successfully, but users never reached the final "Password updated" confirmation screen.',
  },
] as const;

export const lastMeetingAccountsBreakdown: LastMeetingAccountBreakdownRow[] = [
  { account: "Mobile web", impacted: "7,214", share: "56%" },
  { account: "Desktop web", impacted: "4,790", share: "37%" },
  { account: "API clients", impacted: "877", share: "7%" },
] as const;

export const lastMeetingOpportunities: LastMeetingOpportunity[] = [
  {
    id: "112",
    title: "Reset password flow issue",
    statusLabel: "Investigating...",
    priorityLabel: "Medium priority",
  },
  {
    id: "118",
    title: "Checkout confirmation email delay",
    statusLabel: "Triaging...",
    priorityLabel: "High priority",
  },
  {
    id: "124",
    title: "Duplicate invoice PDF generation",
    statusLabel: "Monitoring...",
    priorityLabel: "Low priority",
  },
] as const;
