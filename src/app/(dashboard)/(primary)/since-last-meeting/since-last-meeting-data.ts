import type { DataDisplayTimelineItem } from "@/components/data-display/data-display-types";
import type { HeaderPerson } from "@/app/(dashboard)/_chrome/chrome-types";
import type { DashboardDataTableFormatters } from "@/components/table";
import type {
  SinceLastMeetingTableColumn,
  SinceLastMeetingTableRow,
} from "./since-last-meeting-types";

export const sinceLastMeetingSharedPeople: HeaderPerson[] = [
  {
    name: "Julien Newman",
    avatar: "/avatars/aditya.jpg",
  },
  {
    name: "Yash Patel",
    avatar: "/avatars/yash.webp",
  },
];

export const sinceLastMeetingTimelineItems: DataDisplayTimelineItem[] = [
  {
    id: "tyson",
    title: "2nd meeting with Tyson Foods",
    occurredOnIso: "2026-01-13",
    body: "Julien coordinated the 2nd meeting, aligned stakeholders on a refreshed proposal, and walked Tyson through pricing, implementation, and timeline. They captured objections live and left the call with clear next steps and owners.",
  },
  {
    id: "whirlpool",
    title: "1:1 with Whirlpool's CFO",
    occurredOnIso: "2026-01-25",
    body: "Julien completed a dedicated 1:1 with the CFO, presented the ROI case and risk mitigation plan, and addressed budget/timing questions. They confirmed approval criteria and the internal path to a decision.",
  },
  {
    id: "3m",
    title: "Legal signoff from 3M",
    occurredOnIso: "2026-01-26",
    body: "Julien drove the contract through legal by coordinating redlines, resolving liability and security terms, and keeping both counsels moving on deadlines. Legal signoff was secured, clearing the deal to proceed.",
  },
] as const;

export const sinceLastMeetingTableColumns: SinceLastMeetingTableColumn[] = [
  {
    key: "deal",
    label: "Deal",
    cellClassName:
      "whitespace-nowrap px-4 py-3 text-xs font-medium tracking-wide text-zinc-900",
  },
  {
    key: "probability",
    label: "Probability",
    cellClassName:
      "whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-600",
  },
  {
    key: "stage",
    label: "Stage",
    cellClassName:
      "whitespace-nowrap px-4 py-3 text-xs tracking-wide text-zinc-500",
  },
] as const;

export const sinceLastMeetingTableRows: SinceLastMeetingTableRow[] = [
  {
    id: "whirlpool",
    deal: "Whirlpool deal",
    probability: 25,
    stage: "Discovery",
  },
  {
    id: "tyson",
    deal: "Tyson Foods deal",
    probability: 85,
    stage: "Proposal",
  },
  {
    id: "3m",
    deal: "3M deal",
    probability: 85,
    stage: "Proposal",
  },
] as const;

export const sinceLastMeetingTableFormatters: DashboardDataTableFormatters<SinceLastMeetingTableRow> =
  {
    probability: (probability) => `${probability}% likely to close`,
    stage: (stage) => `${stage} stage`,
  };
